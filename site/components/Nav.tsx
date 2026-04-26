'use client'

import { useState, useEffect } from 'react'

const links = [
  { href: 'mailto:yujinkang1008@gmail.com', label: '메일' },
  { href: 'https://ai-trend-lab.vercel.app/', label: 'AI Trend Lab' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  function toggle() {
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('portfolio_theme', next)
    setDark(!dark)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="테마 전환"
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 glass"
      style={{ color: 'var(--tx-3)' }}
    >
      {dark ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          라이트
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          다크
        </>
      )}
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goHome() {
    window.location.href = '/'
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      {/* Full-width, no max-width constraint — logo at far left */}
      <div className="w-full px-6 flex items-center justify-between">

        {/* Logo — 클릭 시 메인(랜딩)으로 이동 */}
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2 transition-opacity hover:opacity-75"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            YJ
          </div>
          <span className="font-bold text-sm" style={{ color: 'var(--tx)' }}>강유진</span>
          <span className="font-normal text-sm hidden sm:inline" style={{ color: 'var(--tx-3)' }}>
            · AI 서비스 기획자
          </span>
        </button>

        {/* Right links */}
        <div className="flex items-center gap-5">
          <ul className="hidden md:flex gap-5 list-none">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith('https://') ? '_blank' : undefined}
                  rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                  className="text-[0.82rem] font-medium transition-opacity hover:opacity-75"
                  style={{ color: 'var(--tx-3)' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
