import { GoogleGenAI } from '@google/genai'
import {
  AI_YUJIN_SYSTEM_PROMPT,
  buildPersonaContext,
  buildPortfolioItemContext,
  buildTopicContext,
} from '@/lib/ai-context'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

function toGeminiContents(messages: ChatMessage[]) {
  let hasUserMessage = false

  return messages
    .filter((message) => message.content?.trim())
    .flatMap((message) => {
      if (message.role === 'assistant' && !hasUserMessage) {
        return []
      }

      if (message.role === 'user') {
        hasUserMessage = true
      }

      return [
        {
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        },
      ]
    })
}

export async function POST(req: Request) {
  try {
    const { messages, topicId, personaId, activeItemId } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request', { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return new Response('GEMINI_API_KEY is not configured', { status: 500 })
    }

    const contents = toGeminiContents(messages)

    if (!contents.some((content) => content.role === 'user')) {
      return new Response('At least one user message is required', { status: 400 })
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const systemInstruction = [
      AI_YUJIN_SYSTEM_PROMPT,
      buildPersonaContext(personaId),
      buildTopicContext(topicId),
      buildPortfolioItemContext(activeItemId),
    ].join('\n\n')

    const stream = await ai.models.generateContentStream({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2400,
      },
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of stream) {
          if (chunk.text) {
            controller.enqueue(encoder.encode(chunk.text))
          }
        }
        controller.close()
      },
    })

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response('서버 오류가 발생했습니다.', { status: 500 })
  }
}
