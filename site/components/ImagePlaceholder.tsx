'use client'

interface ImagePlaceholderProps {
  id: string
  description: string
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'
  className?: string
}

const ratioMap = {
  '16/9': 'pb-[56.25%]',
  '4/3':  'pb-[75%]',
  '3/2':  'pb-[66.67%]',
  '1/1':  'pb-[100%]',
}

export default function ImagePlaceholder({
  id,
  description,
  aspectRatio = '16/9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${ratioMap[aspectRatio]} ${className}`}
      style={{
        background: 'var(--surface-2)',
        border: '2px dashed var(--border-2)',
      }}
      data-image-slot={id}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        {/* Camera icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--accent-dim)' }}
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>

        {/* Description */}
        <div>
          <p
            className="text-[0.72rem] font-bold uppercase tracking-wider mb-1"
            style={{ color: 'var(--accent)' }}
          >
            이미지 슬롯
          </p>
          <p
            className="text-xs leading-relaxed max-w-[200px]"
            style={{ color: 'var(--tx-3)' }}
          >
            {description}
          </p>
        </div>

        {/* Figma badge */}
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold"
          style={{ background: 'var(--surface-3)', color: 'var(--tx-3)', border: '1px solid var(--border)' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent)">
            <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/>
            <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/>
            <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/>
            <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/>
            <circle cx="16" cy="12" r="4"/>
          </svg>
          Figma로 교체 예정
        </div>
      </div>
    </div>
  )
}
