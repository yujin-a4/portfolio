export type InterviewTopicId =
  | 'overview'
  | 'builder'
  | 'research'
  | 'results'
  | 'projects'
  | 'fit'

export interface EvidenceCard {
  id: string
  title: string
  metric: string
  body: string
  tags: string[]
  href?: string
}

export interface InterviewTopic {
  id: InterviewTopicId
  label: string
  prompt: string
  intent: string
  evidenceIds: string[]
  keywords: string[]
}

export interface InterviewPersona {
  id: string
  label: string
  role: string
  tone: string
  opening: string
}

export const interviewPersonas: InterviewPersona[] = [
  {
    id: 'hr',
    label: 'HR 면접관',
    role: '채용 적합도, 커리어 흐름, 협업 태도를 중점적으로 검증하는 HR 면접관',
    tone: '성과를 쉽게 이해할 수 있도록 맥락, 역할, 결과를 균형 있게 설명합니다.',
    opening: 'HR 관점으로 경력 흐름과 조직 적합도를 중심으로 답변하겠습니다.',
  },
  {
    id: 'product-lead',
    label: '서비스 기획 리드',
    role: '문제 정의, 사용자 리서치, 화면 기획, 지표 설계를 깊게 보는 서비스 기획 리드',
    tone: '문제, 판단, 실행, 결과의 순서로 답하고 기획 의사결정을 구체적으로 설명합니다.',
    opening: '서비스 기획 리드 관점에서 문제 정의와 실행 과정을 중심으로 답변하겠습니다.',
  },
  {
    id: 'ai-lead',
    label: 'AI/AX 담당자',
    role: 'AI API, PoC, 업무 자동화, 조직 내 AI 전환 가능성을 보는 AI/AX 담당자',
    tone: 'AI 기술을 어떻게 이해하고 실제 업무에 적용했는지 중심으로 답합니다.',
    opening: 'AI/AX 관점에서 기술 이해도와 실무 적용 사례를 중심으로 답변하겠습니다.',
  },
  {
    id: 'collaborator',
    label: '개발 협업자',
    role: '기획서의 구현 가능성, 개발사 커뮤니케이션, 기술 제약 대응을 보는 개발 협업자',
    tone: '개발자가 실행할 수 있는 수준으로 기획을 구체화한 사례를 강조합니다.',
    opening: '개발 협업 관점에서 구현 가능성과 커뮤니케이션 방식을 중심으로 답변하겠습니다.',
  },
]

export const evidenceCards: EvidenceCard[] = [
  {
    id: 'classcanvas-growth',
    title: '클래스캔버스 개편 성과',
    metric: '87.32%',
    body: 'YBM 교과서 연계 자료와 수업 흐름을 결합해 신학기 최고 참여율을 만들었습니다.',
    tags: ['GA 분석', '서비스 개편', '에듀테크'],
  },
  {
    id: 'classcanvas-assets',
    title: '교과서 연계 자료 구축',
    metric: '1,976건',
    body: '영어에만 집중하지 않고 수학, 음악, 체육 등 다과목 동시 구축 전략을 설계했습니다.',
    tags: ['콘텐츠 전략', '편집팀 교육', '유저 플로우'],
  },
  {
    id: 'fgi-scale',
    title: '교사 FGI 설계·분석',
    metric: '229명',
    body: '전국 교사 대상 FGI를 설계하고, 정량/정성 결과를 개선 제안서로 변환했습니다.',
    tags: ['사용자 리서치', 'FGI', '개선안'],
  },
  {
    id: 'aidt-review',
    title: 'AI 디지털교과서 검정',
    metric: '30+',
    body: '자체기술검증결과서와 품질관리 체계를 정리해 교육부 검정 심사 통과에 기여했습니다.',
    tags: ['품질관리', '검정 심사', '개발사 협업'],
  },
  {
    id: 'trend-lab',
    title: 'AI Trend Lab',
    metric: '1인 개발',
    body: '구글 시트 기반 수기 아카이브를 Next.js, Firebase, Gemini API 기반 서비스로 전환했습니다.',
    tags: ['Next.js', 'Firebase', 'Gemini API'],
    href: 'https://ai-trend-lab.vercel.app/',
  },
  {
    id: 'official-project',
    title: '자발 프로젝트의 공식화',
    metric: '팀 정식',
    body: 'AI Trend Lab은 개인 문제의식에서 출발해 AI Lab 팀원 약 30명이 쓰는 정식 프로젝트가 되었습니다.',
    tags: ['문제 발견', '제품화', 'AX'],
  },
  {
    id: 'tts-poc',
    title: 'AI TTS PoC',
    metric: '20+',
    body: 'YBM 실제 콘텐츠 기준으로 발음, 끊어읽기, 비용 구조를 평가해 도입 검토 근거를 만들었습니다.',
    tags: ['PoC', 'TTS', '기술 검증'],
  },
  {
    id: 'handwriting-poc',
    title: '필기인식 기술 비교',
    metric: '7개사',
    body: '셀바스AI, MyScript, Google, Mathpix 등 한국어·영어·수식 인식 성능을 비교했습니다.',
    tags: ['벤치마킹', '오류율 분석', 'AI 기술 조사'],
  },
]

export const interviewTopics: InterviewTopic[] = [
  {
    id: 'overview',
    label: '프로필 요약',
    prompt: '강유진님을 1분 안에 소개해 주세요.',
    intent: 'AI 기술 문해력, 서비스 기획, 직접 구현 경험을 압축해서 설명합니다.',
    evidenceIds: ['classcanvas-growth', 'fgi-scale', 'trend-lab'],
    keywords: ['소개', '누구', '요약', '1분', '프로필', '강유진'],
  },
  {
    id: 'builder',
    label: '직접 빌드하는 기획자',
    prompt: '기획자인데 왜 직접 개발하나요?',
    intent: '기획자가 코드를 직접 다루는 이유와 제품 판단에 주는 장점을 설명합니다.',
    evidenceIds: ['trend-lab', 'official-project', 'handwriting-poc'],
    keywords: ['개발', '코딩', '구현', '빌드', '바이브코딩', 'next', 'firebase', 'gemini'],
  },
  {
    id: 'research',
    label: '리서치와 설계안',
    prompt: '사용자 리서치에서 가장 중요하게 보는 건 뭔가요?',
    intent: '질문 설계, 데이터 해석, 개발사가 실행할 수 있는 개선안으로 변환하는 방식을 설명합니다.',
    evidenceIds: ['fgi-scale', 'aidt-review', 'classcanvas-assets'],
    keywords: ['리서치', 'fgi', '사용자', '교사', '설문', '인터뷰', '질문', '개선'],
  },
  {
    id: 'results',
    label: '숫자로 증명한 성과',
    prompt: '성과를 숫자로 설명해 주세요.',
    intent: '성과 지표와 그 지표가 만들어진 과정을 함께 설명합니다.',
    evidenceIds: ['classcanvas-growth', 'classcanvas-assets', 'fgi-scale', 'aidt-review'],
    keywords: ['성과', '숫자', '지표', 'kpi', '결과', 'ga', '참여율', '성장'],
  },
  {
    id: 'projects',
    label: '대표 프로젝트',
    prompt: '가장 강하게 보여주고 싶은 프로젝트는 무엇인가요?',
    intent: '클래스캔버스, AI 디지털교과서, AI Trend Lab을 비교해 강점을 설명합니다.',
    evidenceIds: ['classcanvas-growth', 'trend-lab', 'official-project', 'tts-poc'],
    keywords: ['프로젝트', '대표', '자랑', '포트폴리오', '트렌드랩', '클래스캔버스', '교과서'],
  },
  {
    id: 'fit',
    label: '채용 적합도',
    prompt: '왜 강유진님을 뽑아야 하나요?',
    intent: 'AI 서비스 기획자로서의 차별점과 조직에서 만들 수 있는 가치를 설명합니다.',
    evidenceIds: ['trend-lab', 'fgi-scale', 'classcanvas-growth', 'aidt-review'],
    keywords: ['뽑아', '채용', '핏', '강점', '차별점', '왜', '합류', '역량'],
  },
]

export function getEvidenceCards(ids: string[]) {
  return ids
    .map((id) => evidenceCards.find((card) => card.id === id))
    .filter((card): card is EvidenceCard => Boolean(card))
}

export function getTopicById(id?: string | null) {
  return interviewTopics.find((topic) => topic.id === id) ?? interviewTopics[0]
}

export function getPersonaById(id?: string | null) {
  return interviewPersonas.find((persona) => persona.id === id) ?? interviewPersonas[0]
}

export function resolveInterviewTopic(input: string) {
  const normalized = input.toLowerCase()

  const scored = interviewTopics.map((topic) => ({
    topic,
    score: topic.keywords.reduce(
      (sum, keyword) => sum + (normalized.includes(keyword.toLowerCase()) ? 1 : 0),
      0
    ),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored[0]?.score > 0 ? scored[0].topic : interviewTopics[0]
}
