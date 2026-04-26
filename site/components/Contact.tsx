export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-14 overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 text-violet-400 text-xs font-bold uppercase tracking-widest mb-5">
                <span className="w-5 h-0.5 bg-violet-400" />
                Contact
                <span className="w-5 h-0.5 bg-violet-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                함께 만들어갈 다음 프로젝트가 있으신가요?
              </h2>
              <p className="text-white/50 text-[0.95rem] leading-relaxed mb-8">
                사용자 데이터에서 출발해 실제 서비스로 만드는 기획자를 찾고 계신다면,
                <br />언제든 연락 주세요.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="mailto:yujinkang1008@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(124,92,252,0.45)] transition-all"
                >
                  yujinkang1008@gmail.com
                </a>
                <a
                  href="https://ai-trend-lab.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 hover:border-violet-400 hover:text-violet-300 transition-all"
                >
                  AI Trend Lab ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
