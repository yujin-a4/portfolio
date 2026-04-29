'use client'

import { useEffect, useState } from 'react'

const KEYWORDS = [
  { icon: '💡', title: 'AI/AX 기획', desc: '사내 AI 전환 주도 · 프롬프트 설계' },
  { icon: '🔬', title: '대규모 리서치', desc: '전국 229명 교사 FGI 기획·분석' },
  { icon: '⚡', title: '바이브코딩', desc: '1인 풀스택 개발 · 사내 정식 프로젝트' },
]
const QUESTION = '왜 강유진을 뽑아야 하는가?'

function useTypingEffect(text: string, start: boolean, speed = 42) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!start) return
    setDisplayed(''); setDone(false)
    let i = 0
    const iv = setInterval(() => {
      i++; setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, speed)
    return () => clearInterval(iv)
  }, [text, start, speed])
  return { displayed, done }
}

export default function LandingScene({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0)
  const { displayed, done: typingDone } = useTypingEffect(QUESTION, step >= 4)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 400),
      setTimeout(() => setStep(3), 1050),
      setTimeout(() => setStep(4), 1600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!typingDone) return
    const t1 = setTimeout(() => setStep(6), 500)
    const t2 = setTimeout(() => setStep(7), 750)
    const t3 = setTimeout(() => setStep(8), 1000)
    const t4 = setTimeout(() => setStep(9), 1700)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [typingDone])

  function handleEnter() {
    setStep(10)
    setTimeout(onEnter, 600)
  }

  return (
    <section
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 z-10 ${step === 10 ? 'slide-out-up' : ''}`}
      style={{
        background: 'var(--landing-bg)',
        backgroundImage: 'linear-gradient(var(--landing-grid) 1px, transparent 1px), linear-gradient(90deg, var(--landing-grid) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }}
    >
      {/* Glow blobs */}
      <div className="absolute -top-40 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'rgba(37,99,235,0.10)', filter: 'blur(140px)' }} />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(2,132,199,0.07)', filter: 'blur(120px)' }} />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, #0284C7, transparent)' }} />

      <div className="relative w-full max-w-3xl text-center">
        {/* Label */}
        <p
          className={`mb-6 text-[0.72rem] font-bold uppercase tracking-widest transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ color: '#2563EB' }}
        >
          Interactive AI Portfolio
        </p>

        {/* Line 1 — 작은 수식어 */}
        <p
          className={`text-sm font-medium leading-relaxed mb-2 transition-all duration-700 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ color: 'var(--landing-tx-3)' }}
        >
          AI 기술 문해력을 바탕으로
        </p>

        {/* Line 2 — 중간 크기 직책 */}
        <p
          className={`whitespace-nowrap text-[clamp(1rem,2.6vw,1.65rem)] font-bold leading-snug mb-4 transition-all duration-700 delay-75 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ color: 'var(--landing-tx)' }}
        >
          직접 빌드하고 증명하는 서비스 기획자
        </p>

        {/* Line 3 — 이름, 강유진만 파란색 */}
        <h1
          className={`whitespace-nowrap text-[clamp(3rem,7vw,6rem)] font-black leading-[1.1] mb-8 transition-all duration-700 delay-150 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          <span style={{ color: '#2563EB', textShadow: '0 0 48px rgba(37,99,235,0.50)' }}>강유진</span>
          <span style={{ color: 'var(--landing-tx)' }}>입니다.</span>
        </h1>

        {/* Chat container */}
        {step >= 4 && (
          <div className="chat-bubble-in mx-auto w-full text-left">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}
              >
                <div className="flex gap-1.5">
                  {['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)'].map((c, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-[0.65rem] font-bold uppercase tracking-wider" style={{ color: '#2563EB' }}>
                  AI Interview
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* User question */}
                <div className="flex justify-end">
                  <div
                    className="max-w-[85%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-medium"
                    style={{ background: '#2563EB', color: '#fff' }}
                  >
                    {displayed}
                    {step === 4 && !typingDone && (
                      <span className="inline-block w-px h-[1em] ml-0.5 align-middle animate-pulse" style={{ background: '#fff' }} />
                    )}
                  </div>
                </div>

                {/* Keyword cards */}
                {step >= 6 && (
                  <div className="space-y-2 pt-1">
                    {KEYWORDS.map((kw, i) => (
                      !hidden(step, i) && (
                        <div
                          key={kw.title}
                          className="keyword-pop flex items-center gap-3 rounded-xl px-3.5 py-3"
                          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', animationDelay: '0ms' }}
                        >
                          <span className="text-xl shrink-0">{kw.icon}</span>
                          <div>
                            <p className="text-sm font-bold leading-tight" style={{ color: 'var(--landing-tx)' }}>{kw.title}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--landing-tx-3)' }}>{kw.desc}</p>
                          </div>
                          <div className="ml-auto w-2 h-2 rounded-full shrink-0" style={{ background: '#2563EB' }} />
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            {step >= 9 && (
              <div className="keyword-pop mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={handleEnter}
                  className="btn-accent group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold"
                >
                  강유진 더 알아보기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={handleEnter}
        className="absolute bottom-6 right-6 rounded-xl px-3 py-2 text-xs font-semibold transition-all hover:scale-105"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--tx-3)' }}
      >
        바로 입장
      </button>
    </section>
  )
}

function hidden(step: number, keywordIndex: number) {
  return step < 6 + keywordIndex
}
