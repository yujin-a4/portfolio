import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '강유진 | AI 인터뷰형 포트폴리오',
  description:
    'AI 서비스 기획자 강유진의 경력, 교육, 프로젝트, 활동, 자격을 메뉴와 대화로 탐색하는 인터뷰형 포트폴리오입니다.',
  openGraph: {
    title: '강유진 | AI 인터뷰형 포트폴리오',
    description: '경력 · 교육 · 프로젝트 · 활동 · 자격증을 대화형 콘솔로 탐색',
    type: 'website',
  },
}

// 테마 초기화: 무조건 light 모드 기본 적용 (이전 캐시 무시)
const themeScript = `
(function(){
  localStorage.setItem('portfolio_theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
