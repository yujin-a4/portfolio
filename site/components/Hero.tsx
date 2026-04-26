'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: 229, suffix: '명', label: 'FGI 참여\n교사 수' },
  { value: 1976, suffix: '건', label: '교과서 연계\n자료 구축' },
  { value: null, raw: '87.32%', label: '신학기\n최고 참여율' },
  { value: null, raw: '30+', label: 'AIDT 검정\n심사 항목' },
]

function useCounter(target: number | null, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (target === null || !ref.current) return
    const el = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const tick = () => {
            const p = Math.min((Date.now() - start) / duration, 1)
            const ep = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(ep * target).toLocaleString()
            if (p < 1) requestAnimationFrame(tick)
          }
          tick()
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return ref
}

function StatBox({ value, suffix, raw, label }: (typeof stats)[0]) {
  const ref = useCounter(value)
  return (
    <div className="p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-center">
      <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent leading-none mb-2">
        {value !== null ? (
          <>
            <span ref={ref}>0</span>
            {suffix}
          </>
        ) : (
          raw
        )}
      </div>
      <div className="text-[0.7rem] text-white/40 leading-snug whitespace-pre-line">
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-10 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-[0.76rem] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              YBM AI Lab · 2024~현재
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.08] mb-4">
              AI 기술 문해력으로
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                직접 빌드하고
              </span>
              <br />
              증명하는 기획자
            </h1>

            <p className="text-white/50 text-base mb-4">AI 서비스 기획자 / Product Manager</p>

            <p className="text-white/55 text-[0.94rem] leading-relaxed mb-9 pl-4 border-l-2 border-violet-500">
              사용자 리서치 데이터를 설계안으로 만들고, 개발사에 전달하고,
              직접 코드로 구현하는 경험을 모두 갖춘 서비스 기획자입니다.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(124,92,252,0.45)] transition-all"
              >
                프로젝트 보기 →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 hover:border-violet-400 hover:text-violet-300 transition-all"
              >
                연락하기
              </a>
            </div>
          </div>

          {/* Right — stats card */}
          <div>
            <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500" />
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <StatBox key={s.label} {...s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
