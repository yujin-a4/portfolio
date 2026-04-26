import { resume } from '@/data/resume'

const skillCategories = [
  {
    icon: '🎯',
    title: '서비스 기획',
    color: 'violet',
    items: ['화면 기획서', '유저 플로우', 'PRD', '서비스 개선 제안서', '품질관리 체계', 'KPI 설계', '제작 가이드'],
  },
  {
    icon: '🔍',
    title: '사용자 리서치',
    color: 'cyan',
    items: ['FGI 설계·수행', '설문 설계', '정량/정성 분석', '분석 보고서', 'GA 분석'],
  },
  {
    icon: '🤖',
    title: 'AI / 프롬프트',
    color: 'violet',
    items: ['프롬프트 엔지니어링', 'Conversation Flow', 'GPTs 설계', 'AI API 기획', 'PoC 설계·수행'],
  },
  {
    icon: '💻',
    title: '개발 (바이브코딩)',
    color: 'cyan',
    items: ['Next.js', 'React', 'Firebase', 'Vercel', 'Gemini API', 'Claude API'],
  },
  {
    icon: '🤝',
    title: '협업',
    color: 'violet',
    items: ['외부 개발사 협업', '기획서 버전 관리', '편집팀 교육', '크로스펑셔널 리딩'],
  },
  {
    icon: '🛠',
    title: '도구',
    color: 'cyan',
    items: ['Figma', 'Notion', 'Google Analytics', 'Cursor', 'GitHub', 'Adobe XD'],
  },
]

const colorMap = {
  violet: {
    icon: 'bg-violet-500/15',
    badge: 'bg-white/[0.05] border-white/[0.08] text-white/55',
  },
  cyan: {
    icon: 'bg-cyan-500/10',
    badge: 'bg-white/[0.05] border-white/[0.08] text-white/55',
  },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-5 h-0.5 bg-violet-400" />
            Skills & Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">역량과 도구</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {skillCategories.map((cat) => {
            const c = colorMap[cat.color as keyof typeof colorMap]
            return (
              <div
                key={cat.title}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${c.icon}`}>
                    {cat.icon}
                  </div>
                  <span className="font-semibold text-sm text-white/85">{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className={`text-[0.72rem] px-2.5 py-1 rounded-full border ${c.badge}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Key Numbers */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-5 h-0.5 bg-violet-400" />
            Key Numbers
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {resume.keyStats.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-center"
            >
              <p className="text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent leading-none mb-1.5">
                {s.value}
              </p>
              <p className="text-[0.67rem] text-white/35 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
