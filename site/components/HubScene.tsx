'use client'

import { useState } from 'react'
import { portfolioCategories, type PortfolioCategoryId } from '@/data/portfolio-menu'

const CATEGORY_META: Record<PortfolioCategoryId, { icon: string; color: string; glow: string; desc: string; featured?: boolean }> = {
  career:     { icon: '💼', color: 'var(--accent)',   glow: 'rgba(59,130,246,0.25)',  desc: 'YBM AI Lab 재직 중. AI 서비스 기획부터 직접 개발까지.' },
  education:  { icon: '🎓', color: 'var(--cyan)',     glow: 'rgba(56,189,248,0.22)',  desc: '연세대 교육대학원 석사 · 독일 교환학생.' },
  projects:   { icon: '🚀', color: 'var(--accent)',   glow: 'rgba(59,130,246,0.30)', desc: '클래스캔버스 · AI 디지털교과서 · AI Trend Lab.', featured: true },
  activities: { icon: '⚡', color: 'var(--amber)',    glow: 'rgba(252,211,77,0.22)',   desc: 'KISA 웹테크, 인턴십, AI 강의 등 다채로운 활동.' },
  certs:      { icon: '🏆', color: 'var(--emerald)',  glow: 'rgba(52,211,153,0.22)',  desc: 'AI POT · TOEIC Speaking · 한국어교원 2급.' },
}

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

export default function HubScene({ onSelectCategory }: { onSelectCategory: (id: PortfolioCategoryId) => void }) {
  const [hovered, setHovered] = useState<PortfolioCategoryId | null>(null)

  return (
    <section className="hub-rise relative min-h-screen px-5 py-24 md:py-32 z-10">
      <div className="mx-auto max-w-5xl space-y-10">

        {/* ── Profile Card ── */}
        <div
          className="glass rounded-3xl p-6 md:p-8"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.08)' }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div
                className="relative w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(59,130,246,0.12)', border: '2px dashed rgba(59,130,246,0.30)' }}
                data-image-slot="profile-avatar"
              >
                <div className="text-center">
                  <div className="text-3xl font-black" style={{ color: 'var(--accent)' }}>YJ</div>
                  <div className="text-[0.55rem] font-bold uppercase tracking-wider mt-0.5" style={{ color: 'var(--tx-3)' }}>Photo</div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-2xl font-black" style={{ color: 'var(--tx)' }}>{PROFILE.name}</h2>
                <span className="text-sm font-medium" style={{ color: 'var(--tx-3)' }}>{PROFILE.nameEn}</span>
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>{PROFILE.role}</p>
              <p className="text-xs mb-3" style={{ color: 'var(--tx-3)' }}>
                {PROFILE.company} · {PROFILE.location}
              </p>
              <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: 'var(--tx-2)' }}>
                {PROFILE.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {PROFILE.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-2.5 py-1 text-[0.68rem] font-semibold"
                    style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(59,130,246,0.20)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80"
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
                  className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: 'var(--cyan)' }}
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

        {/* ── Section heading ── */}
        <div className="text-center">
          <p className="text-[0.72rem] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-3)' }}>
            무엇이 궁금하신가요?
          </p>
          <h3 className="text-xl font-black" style={{ color: 'var(--tx)' }}>
            탐색할 영역을 선택해 주세요
          </h3>
        </div>

        {/* ── Category cards ── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {portfolioCategories.map((cat, i) => {
            const meta = CATEGORY_META[cat.id]
            const isHovered = hovered === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="card-pop group relative flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all duration-300"
                style={{
                  animationDelay: `${i * 80}ms`,
                  background: isHovered ? 'rgba(255,255,255,0.09)' : 'var(--surface)',
                  border: `1px solid ${isHovered ? meta.color : 'var(--border)'}`,
                  boxShadow: isHovered ? `0 0 32px ${meta.glow}` : 'none',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {meta.featured && (
                  <div
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[0.58rem] font-black uppercase tracking-wider"
                    style={{ background: meta.color, color: '#fff' }}
                  >
                    MAIN
                  </div>
                )}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300"
                  style={{
                    background: isHovered ? `${meta.glow}` : 'rgba(255,255,255,0.05)',
                    transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                  }}
                >
                  {meta.icon}
                </div>
                <div>
                  <p className="text-sm font-black mb-1.5" style={{ color: isHovered ? meta.color : 'var(--tx)' }}>
                    {cat.label}
                  </p>
                  <p className="text-[0.68rem] leading-relaxed" style={{ color: 'var(--tx-3)' }}>
                    {meta.desc}
                  </p>
                </div>
                <div
                  className="mt-auto text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: meta.color }}
                >
                  자세히 보기 →
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
