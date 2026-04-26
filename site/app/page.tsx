import Nav from '@/components/Nav'
import AIInterviewRoom from '@/components/AIInterviewRoom'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Nav />
      <AIInterviewRoom />
      <footer
        className="py-5 text-center text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--tx-3)' }}
      >
        © 2026 강유진 · AI 서비스 기획자 포트폴리오
      </footer>
    </main>
  )
}
