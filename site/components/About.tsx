import { resume } from '@/data/resume'

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-5 h-0.5 bg-violet-400" />
            Profile & Resume
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">이력 및 소개</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left: career + edu */}
          <div className="md:col-span-3 space-y-10">
            {/* Career */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                경력
              </h3>
              {resume.career.map((c) => (
                <div
                  key={c.company}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-bold text-white text-[0.95rem]">{c.company}</p>
                      <p className="text-sm text-white/50">{c.role}</p>
                    </div>
                    <span className="text-xs text-white/35 whitespace-nowrap bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {c.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{c.desc}</p>
                  <ul className="space-y-2">
                    {c.achievements.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-white/60 leading-relaxed">
                        <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                학력
              </h3>
              <div className="space-y-3">
                {resume.education.map((e) => (
                  <div
                    key={e.school}
                    className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 flex gap-4"
                  >
                    <div className="w-1 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm text-white">{e.school}</p>
                        <span className="text-xs text-white/35">{e.period}</span>
                      </div>
                      <p className="text-sm text-white/50 mt-0.5">{e.major}</p>
                      <p className="text-xs text-violet-400 mt-0.5">GPA {e.gpa}</p>
                      {e.note && (
                        <p className="text-xs text-white/35 mt-1.5">{e.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                교육 · 활동
              </h3>
              <div className="space-y-2">
                {resume.activities.map((a) => (
                  <div
                    key={a.title}
                    className="flex gap-4 py-3 border-b border-white/[0.06] last:border-0"
                  >
                    <span className="text-xs text-white/30 whitespace-nowrap pt-0.5 min-w-[90px]">
                      {a.date}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white/80">{a.title}</p>
                      {a.desc && (
                        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{a.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: competencies + certs + key numbers */}
          <div className="md:col-span-2 space-y-8">
            {/* Core competencies */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                핵심 역량
              </h3>
              <div className="space-y-3">
                {resume.coreCompetencies.map((c) => (
                  <div
                    key={c.title}
                    className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex gap-3"
                  >
                    <span className="text-lg">{c.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.title}</p>
                      <p className="text-xs text-white/45 leading-relaxed mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                자격 · 어학
              </h3>
              <div className="space-y-2">
                {resume.certifications.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0"
                  >
                    <span className="text-sm text-white/70">{c.name}</span>
                    <span className="text-xs text-white/30">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key stats */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                Key Numbers
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {resume.keyStats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center"
                  >
                    <p className="text-lg font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent leading-none mb-1">
                      {s.value}
                    </p>
                    <p className="text-[0.68rem] text-white/35 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
