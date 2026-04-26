// Figma API 프록시 라우트
// Figma personal access token을 서버에서만 사용합니다.
// 사용법: GET /api/figma-image?fileKey=xxx&nodeId=1-234

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const fileKey = searchParams.get('fileKey')
  const nodeId = searchParams.get('nodeId')

  if (!fileKey || !nodeId) {
    return Response.json({ error: 'fileKey and nodeId are required' }, { status: 400 })
  }

  const token = process.env.FIGMA_TOKEN
  if (!token) {
    return Response.json({ error: 'FIGMA_TOKEN not configured' }, { status: 500 })
  }

  try {
    // nodeId는 "1-234" 형식으로 받아서 Figma API는 "1:234" 형식 사용
    const figmaNodeId = nodeId.replace('-', ':')

    const res = await fetch(
      `https://api.figma.com/v1/images/${fileKey}?ids=${figmaNodeId}&format=png&scale=2`,
      {
        headers: { 'X-Figma-Token': token },
        next: { revalidate: 3600 }, // 1시간 캐시
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return Response.json(
        { error: `Figma API error: ${res.status}`, detail: text },
        { status: res.status }
      )
    }

    const data = await res.json()
    const imageUrl = data.images?.[figmaNodeId]

    if (!imageUrl) {
      return Response.json({ error: 'Node not found in Figma file' }, { status: 404 })
    }

    return Response.json({ url: imageUrl })
  } catch (err) {
    console.error('Figma API error:', err)
    return Response.json({ error: 'Failed to fetch from Figma' }, { status: 500 })
  }
}
