'use client'

import { getCategoryById } from '@/data/portfolio-menu'

const CERT_STYLES: Record<string, { accent: string; bg: string }> = {
  'cert-ai-pot':         { accent: 'var(--accent)',   bg: 'var(--accent-dim)' },
  'cert-toeic-speaking': { accent: 'var(--cyan)',     bg: 'var(--cyan-dim)'   },
  'cert-korean-teacher': { accent: 'var(--amber)',    bg: 'var(--amber-dim)'  },
  'cert-computer':       { accent: 'var(--emerald)',  bg: 'var(--emerald-dim)' },
}
const DEFAULT_STYLE = { accent: 'var(--tx-3)', bg: 'var(--surface-2)' }

export default function CertificateGrid() {
  const certs = getCategoryById('certs').items

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-[0.68rem] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--tx-3)' }}>
          Certifications & Language
        </p>
        <h2 className="text-2xl font-black" style={{ color: 'var(--tx)' }}>자격 · 어학</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--tx-3)' }}>
          AI, 언어, 교육, 업무 도구 역량의 공식 기록입니다.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {certs.map((cert, i) => {
          const style = CERT_STYLES[cert.id] ?? DEFAULT_STYLE
          return (
            <div
              key={cert.id}
              className="console-enter rounded-2xl p-5 transition-all hover:scale-[1.02]"
              style={{
                background: 'var(--surface)',
                border: `1.5px solid var(--border)`,
                boxShadow: 'var(--shadow-sm)',
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: style.bg }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: style.accent }} />
                </div>
                <span
                  className="text-[0.65rem] font-bold uppercase tracking-wider rounded-full px-2.5 py-1"
                  style={{ background: style.bg, color: style.accent }}
                >
                  {cert.period}
                </span>
              </div>

              <p
                className="text-[0.65rem] font-bold uppercase tracking-wide mb-1"
                style={{ color: 'var(--tx-3)' }}
              >
                {cert.eyebrow}
              </p>
              <h3 className="text-base font-black leading-tight mb-2" style={{ color: 'var(--tx)' }}>
                {cert.title}
              </h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--tx-2)' }}>
                {cert.summary}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {cert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg px-2 py-1 text-[0.65rem] font-semibold"
                    style={{ background: style.bg, color: style.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
