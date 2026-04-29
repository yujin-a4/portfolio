'use client'

import { useState } from 'react'
import { portfolioCategories, type PortfolioCategoryId } from '@/data/portfolio-menu'

const CATEGORY_META: Record<PortfolioCategoryId, { icon: string; desc: string; featured?: boolean }> = {
  career:     { icon: '💼', desc: 'YBM AI Lab 재직 중. AI 서비스 기획부터 직접 개발까지.' },
  education:  { icon: '🎓', desc: '연세대 교육대학원 석사 · 독일 교환학생.' },
  projects:   { icon: '🚀', desc: '클래스캔버스 · AI 디지털교과서 · AI Trend Lab.', featured: true },
  activities: { icon: '⚡', desc: 'KISA 웹테크, 해커톤 2위, AI 강의 등 다채로운 활동.' },
  certs:      { icon: '🏆', desc: 'AI POT · TOEIC Speaking · 한국어교원 2급.' },
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
    <section className="hub-rise relative min-h-screen px-5 py-20 md:py-28" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-4xl space-y-8">

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

        {/* ── Section heading ── */}
        <div className="text-center pt-2">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Portfolio
          </p>
          <h3 className="text-lg font-black" style={{ color: 'var(--tx)' }}>
            탐색할 영역을 선택해 주세요
          </h3>
        </div>

        {/* ── Category cards ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
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
                className="card-pop group relative flex flex-col items-start gap-3 rounded-2xl p-5 text-left transition-all duration-200"
                style={{
                  animationDelay: `${i * 70}ms`,
                  background: 'var(--surface)',
                  border: `1px solid ${isHovered ? 'rgba(37,99,235,0.35)' : 'var(--border)'}`,
                  boxShadow: isHovered ? '0 8px 32px rgba(37,99,235,0.1), var(--shadow-sm)' : 'var(--shadow-sm)',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                }}
              >
                {meta.featured && (
                  <div
                    className="absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[0.55rem] font-black uppercase tracking-wider"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    MAIN
                  </div>
                )}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-colors duration-200"
                  style={{ background: isHovered ? 'rgba(37,99,235,0.1)' : 'var(--surface-2)' }}
                >
                  {meta.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black mb-1.5 transition-colors duration-200"
                    style={{ color: isHovered ? 'var(--accent)' : 'var(--tx)' }}>
                    {cat.label}
                  </p>
                  <p className="text-[0.68rem] leading-relaxed" style={{ color: 'var(--tx-3)' }}>
                    {meta.desc}
                  </p>
                </div>
                <p className="text-[0.68rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: 'var(--accent)' }}>
                  자세히 보기 →
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
