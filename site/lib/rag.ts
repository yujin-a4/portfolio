import { GoogleGenAI } from '@google/genai'

interface Chunk {
  id: string
  title: string
  content: string
  embedding: number[]
}

interface EmbeddingsData {
  generated_at: string
  model: string
  chunks: Chunk[]
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

let cachedData: EmbeddingsData | null = null

function loadEmbeddings(): EmbeddingsData {
  if (cachedData) return cachedData
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  cachedData = require('@/data/embeddings.json') as EmbeddingsData
  return cachedData
}

export async function retrieveRelevant(query: string, topK = 4): Promise<string> {
  const data = loadEmbeddings()
  if (!data.chunks?.length) return ''

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
  const result = await ai.models.embedContent({
    model: 'text-embedding-004',
    contents: query,
  })

  const queryVec = (result.embeddings?.[0]?.values ?? []) as number[]
  if (!queryVec.length) return ''

  const scored = data.chunks
    .map((chunk) => ({ chunk, score: cosineSimilarity(queryVec, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  return scored.map(({ chunk }) => `[${chunk.title}]\n${chunk.content}`).join('\n\n---\n\n')
}
