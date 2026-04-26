// ────────────────────────────────────────────────────────────────────
// Figma 이미지 슬롯 설정
//
// [연동 방법]
// 1. Figma에서 이미지를 넣을 프레임/컴포넌트를 우클릭 → "Copy link"
// 2. URL에서 node-id 파라미터 값을 복사 (예: node-id=1%3A234 → "1-234")
// 3. fileKey: Figma URL의 /design/ 뒤 또는 /file/ 뒤 문자열
// 4. .env.local에 FIGMA_TOKEN 설정 필요 (Figma → Settings → Personal access tokens)
//
// [자동 반영]
// - Figma에서 수정 후 Vercel 대시보드에서 Redeploy
// - 또는 Figma Webhook → Vercel Deploy Hook으로 자동화 (DEPLOY.md 참조)
// ────────────────────────────────────────────────────────────────────

export const FIGMA_FILE_KEY = process.env.NEXT_PUBLIC_FIGMA_FILE_KEY || ''

export type FigmaSlotId =
  | 'cc-main'
  | 'cc-wireframe'
  | 'cc-ga'
  | 'aidt-overview'
  | 'aidt-fgi'
  | 'aidt-proposal'
  | 'atl-main'
  | 'atl-archive'
  | 'atl-ranking'

export interface FigmaSlot {
  id: FigmaSlotId
  nodeId: string        // Figma node-id (하이픈 형식: "1-234")
  label: string         // 이미지 설명
  fallbackIcon: string  // 이미지 없을 때 아이콘
  aspect?: string       // Tailwind aspect-ratio class
}

// nodeId를 비워두면 placeholder로 표시됩니다.
// Figma에서 node-id를 복사해서 채워넣으세요.
export const figmaSlots: FigmaSlot[] = [
  {
    id: 'cc-main',
    nodeId: '',
    label: '클래스캔버스 서비스 화면 — 내 보관함 + YBM 자료 가져오기 모달',
    fallbackIcon: '🖼',
  },
  {
    id: 'cc-wireframe',
    nodeId: '',
    label: '화면 기획서 — 학교급/과목/단원 필터링 구조',
    fallbackIcon: '📐',
  },
  {
    id: 'cc-ga',
    nodeId: '',
    label: 'GA 참여율 추이 그래프 — 6개월 라인 차트',
    fallbackIcon: '📊',
    aspect: 'aspect-video',
  },
  {
    id: 'aidt-overview',
    nodeId: '',
    label: '4개 업무 축 인포그래픽 — FGI / 품질관리 / 접근성 / 자체기술검증',
    fallbackIcon: '🗂',
  },
  {
    id: 'aidt-fgi',
    nodeId: '',
    label: 'FGI 체크리스트 실제 문서 — 영역 구조',
    fallbackIcon: '📋',
  },
  {
    id: 'aidt-proposal',
    nodeId: '',
    label: '개선 제안서 실제 문서 캡처',
    fallbackIcon: '📄',
  },
  {
    id: 'atl-main',
    nodeId: '',
    label: 'AI Trend Lab 메인 화면 — 대시보드',
    fallbackIcon: '🤖',
  },
  {
    id: 'atl-archive',
    nodeId: '',
    label: '뉴스 아카이브 화면',
    fallbackIcon: '📰',
  },
  {
    id: 'atl-ranking',
    nodeId: '',
    label: '순위 리포트 — 모델별 순위 변화 선 그래프',
    fallbackIcon: '📈',
  },
]
