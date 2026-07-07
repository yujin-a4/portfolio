'use client'

// 허브(첫 화면) — 프로젝트 우선 비대칭 구조.
// 케이스스터디 4개를 커버 질문 + 핵심 숫자로 직접 노출하고,
// 경력·교육·활동·자격증은 하단 보조 줄로 내린다.

import { useState } from 'react'
import { portfolioCategories, type PortfolioCategoryId } from '@/data/portfolio-menu'
import { caseStudies } from '@/data/case-studies'

const SUB_CATEGORIES: { id: PortfolioCategoryId; icon: string; label: string }[] = [
  { id: 'career', icon: '💼', label: '경력' },
  { id: 'education', icon: '🎓', label: '교육' },
  { id: 'activities', icon: '⚡', label: '활동' },
  { id: 'certs', icon: '🏆', label: '자격증' },
]

const PROFILE = {
  name: '강유진',
  nameEn: 'Yujin Kang',
  role: 'AI 서비스 기획자 · Product Manager',
  company: 'YBM AI Lab',
  location: '서울 노원구',
  email: 'yujinkang1008@gmail.com',
  siteLabel: 'AI Trend Lab',
  siteUrl: 'https://ai-trend-lab.vercel.app/',
  bio: 'AI 기술 문해력을 바탕으로 직접 빌드하고 증명하는 서비스 기획자. 사내 최초 AI 서비스를 기획하고, 1인 풀스택으로 사내 정식 프로젝트까지 완성했습니다.',
  skills: ['PM', 'AI/AX 기획', '프롬프트 엔지니어링', 'UX 기획', 'Next.js', 'Figma'],
}

/* 형광펜 하이라이트 — 케이스스터디와 동일한 문법 */
function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? (
        <mark
          key={i}
          style={{
            background: 'linear-gradient(transparent 62%, var(--accent-glow) 62%)',
            color: 'inherit',
            fontWeight: 800,
            padding: '0 0.08em',
          }}
        >
          {part}
        </mark>
      )
      : <span key={i}>{part}</span>
  )
}

export default function HubScene({
  onSelectCategory,
  onSelectProject,
}: {
  onSelectCategory: (id: PortfolioCategoryId) => void
  onSelectProject: (projectId: string) => void
}) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="hub-rise relative min-h-screen px-5 py-20 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-4xl space-y-10">

        {/* ── Profile Card ── */}
        <div className="rounded-3xl p-7 md:p-8" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <img
                  src="/images/yj.png"
                  alt="강유진 프로필 사진"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 12%' }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h2 className="text-2xl font-black" style={{ color: 'var(--tx)' }}>{PROFILE.name}</h2>
                <span className="text-sm font-medium" style={{ color: 'var(--tx-3)' }}>{PROFILE.nameEn}</span>
              </div>
              <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--accent)' }}>{PROFILE.role}</p>
              <p className="text-xs mb-4" style={{ color: 'var(--tx-3)' }}>
                {PROFILE.company} · {PROFILE.location}
              </p>
              <p className="text-sm leading-relaxed mb-5 max-w-xl" style={{ color: 'var(--tx-2)' }}>
                {PROFILE.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {PROFILE.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-[0.7rem] font-semibold"
                    style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(37,99,235,0.15)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--tx-3)' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  {PROFILE.email}
                </a>
                <a
                  href={PROFILE.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--accent)' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  {PROFILE.siteLabel} ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Projects — 메인 ── */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
              Projects
            </p>
            <span className="flex-1 h-px" style={{ background: 'var(--border-2)' }} />
            <p className="text-[0.68rem] font-semibold" style={{ color: 'var(--tx-3)' }}>
              케이스스터디 {caseStudies.length}편
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {caseStudies.map((cs, i) => {
              const stat = cs.steps.find((s) => s.eyebrow === 'IMPACT')?.statTiles?.[0]
              const isHovered = hovered === cs.slug
              return (
                <button
                  key={cs.slug}
                  type="button"
                  onClick={() => onSelectProject(cs.projectId)}
                  onMouseEnter={() => setHovered(cs.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="card-pop group flex flex-col gap-4 rounded-2xl p-6 text-left transition-all duration-200"
                  style={{
                    animationDelay: `${i * 70}ms`,
                    background: 'var(--surface)',
                    border: `1px solid ${isHovered ? 'rgba(37,99,235,0.35)' : 'var(--border)'}`,
                    boxShadow: isHovered ? '0 8px 32px rgba(37,99,235,0.1), var(--shadow-sm)' : 'var(--shadow-sm)',
                    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                >
                  <div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest mb-2.5"
                      style={{ color: isHovered ? 'var(--accent)' : 'var(--tx-3)' }}>
                      {String(i + 1).padStart(2, '0')} — {cs.title}
                    </p>
                    <p
                      className="text-base font-black leading-snug"
                      style={{ color: 'var(--tx)', wordBreak: 'keep-all' }}
                    >
                      {renderHighlight(cs.coverQuestion)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    {stat && (
                      <div>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--tx-3)' }}>
                          {stat.label}
                        </p>
                        <p className="text-lg font-black leading-tight tracking-tight" style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
                          {stat.value}
                        </p>
                      </div>
                    )}
                    <p className="text-[0.68rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                      style={{ color: 'var(--accent)' }}>
                      케이스스터디 →
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 보조 카테고리 ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--tx-3)' }}>
              More
            </p>
            <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {SUB_CATEGORIES.map((sub) => {
              const cat = portfolioCategories.find((c) => c.id === sub.id)
              const isHovered = hovered === sub.id
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => onSelectCategory(sub.id)}
                  onMouseEnter={() => setHovered(sub.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200"
                  style={{
                    background: 'var(--surface)',
                    border: `1px solid ${isHovered ? 'rgba(37,99,235,0.3)' : 'var(--border)'}`,
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  <span className="text-base">{sub.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-bold" style={{ color: isHovered ? 'var(--accent)' : 'var(--tx)' }}>
                      {sub.label}
                    </span>
                    <span className="block text-[0.65rem]" style={{ color: 'var(--tx-3)' }}>
                      {cat?.items.length ?? 0}개 항목
                    </span>
                  </span>
                  <span className="text-xs" style={{ color: isHovered ? 'var(--accent)' : 'var(--tx-3)' }}>→</span>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
