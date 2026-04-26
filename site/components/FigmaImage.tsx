'use client'

import { useState, useEffect } from 'react'
import { FIGMA_FILE_KEY } from '@/data/figma-config'

interface FigmaImageProps {
  nodeId: string          // Figma node ID (하이픈 형식: "1-234")
  label: string           // 이미지 설명 (alt + placeholder 텍스트)
  fallbackIcon?: string   // placeholder 아이콘
  className?: string
}

export default function FigmaImage({
  nodeId,
  label,
  fallbackIcon = '🖼',
  className = '',
}: FigmaImageProps) {
  const [state, setState] = useState<{
    imageUrl: string | null
    status: 'idle' | 'loading' | 'error'
  }>({ imageUrl: null, status: 'idle' })

  const hasConfig = Boolean(FIGMA_FILE_KEY && nodeId)

  useEffect(() => {
    let cancelled = false

    async function loadImage() {
      await Promise.resolve()

      if (cancelled) return

      if (!hasConfig) {
        setState({ imageUrl: null, status: 'idle' })
        return
      }

      setState({ imageUrl: null, status: 'loading' })

      try {
        const response = await fetch(`/api/figma-image?fileKey=${FIGMA_FILE_KEY}&nodeId=${nodeId}`)
        const data = await response.json()

        if (cancelled) return

        setState(
          data.url
            ? { imageUrl: data.url, status: 'idle' }
            : { imageUrl: null, status: 'error' }
        )
      } catch {
        if (!cancelled) {
          setState({ imageUrl: null, status: 'error' })
        }
      }
    }

    loadImage()

    return () => {
      cancelled = true
    }
  }, [nodeId, hasConfig])

  const baseClass =
    'relative flex items-center justify-center rounded-xl overflow-hidden bg-white/5 border border-white/10 min-h-[200px] ' +
    className

  if (state.imageUrl) {
    return (
      <div className={baseClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={state.imageUrl} alt={label} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div className={baseClass + ' border-dashed'}>
      <div className="flex flex-col items-center gap-3 p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
          {state.status === 'loading' ? '⏳' : state.status === 'error' ? '⚠️' : fallbackIcon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-white/60">{label}</p>
          {!hasConfig && (
            <p className="text-xs text-white/30">
              figma-config.ts에 nodeId를 설정하면 자동으로 불러옵니다
            </p>
          )}
          {state.status === 'error' && (
            <p className="text-xs text-red-400">Figma 이미지를 불러올 수 없습니다</p>
          )}
        </div>
      </div>
    </div>
  )
}
