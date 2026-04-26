export type PortfolioCategoryId = 'career' | 'education' | 'projects' | 'activities' | 'certs'

export interface PortfolioMenuItem {
  id: string
  categoryId: PortfolioCategoryId
  title: string
  eyebrow: string
  period: string
  summary: string
  highlights: string[]
  stats?: { value: string; label: string }[]
  tags: string[]
  link?: { label: string; href: string }
  prompt: string
}

export interface PortfolioCategory {
  id: PortfolioCategoryId
  label: string
  shortLabel: string
  description: string
  items: PortfolioMenuItem[]
}

const careerItems: PortfolioMenuItem[] = [
  {
    id: 'career-ybm-ai-lab',
    categoryId: 'career',
    title: 'YBM AI Lab',
    eyebrow: 'Current Role',
    period: '2024.05 ~ 재직중',
    summary:
      'AI 서비스 기획, 에듀테크 플랫폼 개선, 전사 AI 전환(AX), Tech PM 역할을 함께 수행하고 있습니다.',
    highlights: [
      '클래스캔버스 개편 기획으로 신학기 최고 참여율 87.32% 달성',
      'AI 디지털교과서 FGI, 품질관리, 자체기술검증결과서 관리로 교육부 검정 심사 통과에 기여',
      'AI Trend Lab을 1인 기획/개발해 팀 정식 프로젝트로 승격',
      'AI TTS, 필기인식, 생성형 AI 도구 등 사내 PoC와 기술 검증 수행',
    ],
    stats: [
      { value: '87.32%', label: '클래스캔버스 최고 참여율' },
      { value: '229명', label: 'FGI 참여 교사' },
      { value: '1인', label: 'AI Trend Lab 기획/개발' },
    ],
    tags: ['AI 서비스 기획', '에듀테크', 'AX', 'Tech PM'],
    prompt: 'YBM AI Lab에서 맡은 역할과 성과를 면접 답변처럼 설명해 주세요.',
  },
]

const educationItems: PortfolioMenuItem[] = [
  {
    id: 'edu-yonsei',
    categoryId: 'education',
    title: '연세대학교 대학원 석사',
    eyebrow: 'Graduate School',
    period: '2021.03 ~ 2023.08',
    summary:
      '국어국문학과 석사 과정에서 한국어 학습자의 음성 인지 연구를 수행했습니다.',
    highlights: [
      '전공: 국어국문학과',
      'GPA 4.21 / 4.3',
      '석사 논문: 한국어 학습자의 비음과 파열음 인지 연구',
      '사용자 언어 데이터를 관찰하고 해석하는 연구 기반 형성',
    ],
    stats: [{ value: '4.21/4.3', label: '석사 GPA' }],
    tags: ['언어 데이터', '연구 설계', '한국어 교육'],
    prompt: '연세대학교 대학원 연구 경험이 서비스 기획에 어떤 강점이 되는지 설명해 주세요.',
  },
  {
    id: 'edu-duksung',
    categoryId: 'education',
    title: '덕성여자대학교 학사',
    eyebrow: 'Bachelor',
    period: '2015.03 ~ 2021.02',
    summary:
      '국어국문학을 전공하고 독어독문학을 부전공하며 언어와 문화 기반의 분석력을 쌓았습니다.',
    highlights: [
      '전공: 국어국문학과',
      '부전공: 독어독문학과',
      'GPA 3.96 / 4.5',
    ],
    stats: [{ value: '3.96/4.5', label: '학사 GPA' }],
    tags: ['국어국문학', '독어독문학', '언어 분석'],
    prompt: '학부 전공이 현재 AI 서비스 기획자로서 어떤 기반이 됐는지 설명해 주세요.',
  },
  {
    id: 'edu-bonn',
    categoryId: 'education',
    title: '독일 본(Bonn) 대학 교환학생',
    eyebrow: 'Exchange',
    period: '2018.09 ~ 2019.07',
    summary:
      '독일 본 대학 교환학생 경험을 통해 다른 문화권의 학습 환경과 커뮤니케이션 방식을 경험했습니다.',
    highlights: [
      '독일 본 대학 교환학생',
      '다른 문화권의 학습자 관점 경험',
      '언어와 커뮤니케이션에 대한 관심 확장',
    ],
    tags: ['교환학생', '독일', '커뮤니케이션'],
    prompt: '독일 교환학생 경험이 사용자 이해나 커뮤니케이션에 어떤 영향을 줬는지 설명해 주세요.',
  },
]

const projectItems: PortfolioMenuItem[] = [
  {
    id: 'project-classcanvas',
    categoryId: 'projects',
    title: '클래스캔버스 서비스 개편',
    eyebrow: 'Main Project 01',
    period: '2025.01 ~ 2025.09',
    summary:
      'YBM 교과서 연계 쌍방향 수업 자료와 수업 준비 흐름을 결합해 플랫폼 활용률을 끌어올린 프로젝트입니다.',
    highlights: [
      '학교급, 과목, 단원 순 필터링으로 교사의 수업 준비 흐름 반영',
      '영어 편중을 피하고 수학, 음악, 체육 등 다과목 동시 자료 구축 전략 수립',
      '편집팀 교육, 자료 품질 가이드, 화면 기획서 v1.0~v2.3 관리',
      '외부 개발사와 기술 제약을 조율하며 폴더 시스템과 편집창 UX 개선',
    ],
    stats: [
      { value: '1,976건', label: '교과서 연계 자료 구축' },
      { value: '87.32%', label: '신학기 최고 참여율' },
      { value: '+74%', label: '3월 활성 사용자 증가' },
    ],
    tags: ['서비스 개편', 'GA 분석', '외부 개발사 협업'],
    prompt: '클래스캔버스 개편 프로젝트를 문제, 역할, 결과 중심으로 설명해 주세요.',
  },
  {
    id: 'project-aidt',
    categoryId: 'projects',
    title: 'AI 디지털교과서 서비스 개선',
    eyebrow: 'Main Project 02',
    period: '2024.05 ~ 현재',
    summary:
      '전국 교사 FGI와 품질관리 체계를 기반으로 AI 디지털교과서의 현장 사용성과 검정 심사 대응력을 높였습니다.',
    highlights: [
      '2회 총 229명 교사 대상 FGI 설계, 수행, 분석',
      '수업화면 적절성, 모니터링 기능 인지 실패, 학생 상호작용 부족 등 핵심 문제 발견',
      '아이콘을 텍스트 버튼으로 변경, 수학 모둠 활동 6종 설계 등 구체적 개선안 제안',
      '시스템 가용률, 응답속도, 콘텐츠 오류율 등 품질관리 지표 정의',
    ],
    stats: [
      { value: '229명', label: 'FGI 참여 교사' },
      { value: '30+', label: '검정 심사 항목' },
      { value: '통과', label: '교육부 검정 심사 기여' },
    ],
    tags: ['FGI', '품질관리', 'AI 디지털교과서'],
    prompt: 'AI 디지털교과서 프로젝트에서 사용자 리서치와 개선안 설계 과정을 설명해 주세요.',
  },
  {
    id: 'project-ai-trend-lab',
    categoryId: 'projects',
    title: 'AI Trend Lab',
    eyebrow: 'Main Project 03',
    period: '2025.11 ~ 현재',
    summary:
      '구글 시트 기반 AI 뉴스 기록의 한계를 발견하고, Next.js와 Firebase, Gemini API로 직접 만든 사내 AI 트렌드 아카이브입니다.',
    highlights: [
      'URL 입력 후 Gemini API로 제목, 요약, 핵심 내용, 인사이트 자동 구조화',
      '한글명, 영어명, 약어가 공존하는 AI 분야 특성을 반영한 유의어 검색 설계',
      '월별 보고서를 누적해 모델별 순위 변화를 선 그래프로 추적',
      '개인 문제의식에서 출발해 팀 정식 프로젝트로 승격',
    ],
    stats: [
      { value: '1인', label: '기획/개발/배포' },
      { value: '150건+', label: 'AI 뉴스 아카이브' },
      { value: '30명', label: 'AI Lab 팀원 대상 운영' },
    ],
    tags: ['Next.js', 'Firebase', 'Gemini API', '바이브코딩'],
    link: { label: '서비스 보기', href: 'https://ai-trend-lab.vercel.app/' },
    prompt: 'AI Trend Lab을 왜 만들었고 어떻게 정식 프로젝트로 발전시켰는지 설명해 주세요.',
  },
  {
    id: 'project-ai-poc',
    categoryId: 'projects',
    title: 'AI 기술 조사와 PoC',
    eyebrow: 'Bonus Project',
    period: '2024.05 ~ 현재',
    summary:
      'TTS, 필기인식, 생성형 AI 도구를 실제 업무 기준으로 테스트하고 도입 판단 근거를 만들었습니다.',
    highlights: [
      'ElevenLabs, Gemini TTS 2.5, Supertone, Typecast, 클로바더빙 비교',
      '자모 발음, 끊어읽기 등 20개 이상 자체 평가 항목 수립',
      '셀바스AI, MyScript, Google, Mathpix 등 7개 필기인식 업체 성능 비교',
      'LLM, 이미지, 영상, 에이전트 빌더를 동일 프롬프트로 비교 평가',
    ],
    stats: [
      { value: '20+', label: 'TTS 평가 항목' },
      { value: '7개사', label: '필기인식 기술 비교' },
    ],
    tags: ['AI PoC', '기술 검증', '벤치마킹'],
    prompt: 'AI 기술 조사와 PoC를 단순 리서치가 아니라 기획 근거로 만든 방식을 설명해 주세요.',
  },
]

const activityItems: PortfolioMenuItem[] = [
  {
    id: 'activity-time-education',
    categoryId: 'activities',
    title: '타임교육 C&P 인턴',
    eyebrow: 'Internship',
    period: '2023.08 ~ 2023.09',
    summary:
      'AI 챗봇 빌더를 활용한 언어교육 연구를 수행하고, 에듀테크 코리아 페어에서 발표해 우수 인턴으로 수상했습니다.',
    highlights: [
      'AI 챗봇 빌더 기반 언어교육 활용 가능성 조사 및 연구',
      '에듀테크 코리아 페어 발표 참여',
      '우수 인턴 수상',
    ],
    tags: ['언어교육', 'AI 챗봇', '에듀테크', '인턴'],
    prompt: '타임교육 인턴 경험이 AI 서비스 기획 역량에 어떻게 연결됐는지 설명해 주세요.',
  },
  {
    id: 'activity-siwonschool',
    categoryId: 'activities',
    title: '시원스쿨 인턴',
    eyebrow: 'Internship',
    period: '2023.10 ~ 2024.01',
    summary:
      'SNS 교육 콘텐츠 기획과 한국어 교재 기획출간에 참여하며 교육 콘텐츠 기획 경험을 넓혔습니다.',
    highlights: [
      'SNS 교육 콘텐츠 기획',
      '한국어 교재 3종 기획출간 참여',
      '교육 콘텐츠 사용자 관점과 제작 흐름 이해',
    ],
    tags: ['교육 콘텐츠', 'SNS 기획', '한국어 교육', '인턴'],
    prompt: '시원스쿨 인턴 경험에서 배운 교육 콘텐츠 기획 역량을 설명해 주세요.',
  },
  {
    id: 'activity-kisa',
    categoryId: 'activities',
    title: 'KISA 웹테크 밋업데이',
    eyebrow: 'Learning',
    period: '2025.08',
    summary:
      'Cursor AI 바이브코딩 실습과 AI API, MCP 활용 서비스 구현을 경험했습니다.',
    highlights: [
      'Cursor AI 기반 서비스 구현 실습',
      'AI API와 MCP 활용 방식 학습',
      'AI Trend Lab 등 직접 구현 프로젝트의 기술 기반 확장',
    ],
    tags: ['Cursor', 'AI API', 'MCP'],
    prompt: 'KISA 웹테크 밋업데이 경험이 직접 구현 역량에 어떻게 연결됐는지 설명해 주세요.',
  },
  {
    id: 'activity-boostcourse',
    categoryId: 'activities',
    title: '부스트코스 Connect On',
    eyebrow: 'Learning',
    period: '2025.09 ~ 2025.12',
    summary:
      'AI 기반 업무 자동화와 생성형 AI 기획서 작성 흐름을 학습했습니다.',
    highlights: [
      'AI 기반 업무 자동화 학습',
      '생성형 AI를 활용한 기획서 작성 방식 정리',
      '업무 생산성과 문서 품질 개선 관점 확장',
    ],
    tags: ['업무 자동화', '생성형 AI', '기획서'],
    prompt: '부스트코스 Connect On에서 배운 내용을 실무에 어떻게 적용할 수 있는지 설명해 주세요.',
  },
  {
    id: 'activity-ybm-instructor',
    categoryId: 'activities',
    title: 'YBM 사내 AI 툴 강사',
    eyebrow: 'Internal Lecture',
    period: '2025.07',
    summary:
      'AI 툴 활용 PPT 제작 방법 강의의 사내 강사로 공식 선정되어 실무 적용법을 공유했습니다.',
    highlights: [
      'YBM 사내 공식 강사 선정',
      'AI 툴을 활용한 PPT 제작 방법 강의',
      'AI 리터러시를 팀과 조직에 전파하는 경험',
    ],
    tags: ['사내 강의', 'AI 리터러시', 'PPT 제작'],
    prompt: 'YBM 사내 강사 경험을 통해 AI 리터러시 확산 역량을 설명해 주세요.',
  },
  {
    id: 'activity-nikl',
    categoryId: 'activities',
    title: '국립국어원 학습자 말뭉치 구축',
    eyebrow: 'Research',
    period: '2021 ~ 2022',
    summary:
      '한국어 학습자 음성 DB 구축 연구원으로 참여하며 언어 데이터 구축과 품질 관리를 경험했습니다.',
    highlights: [
      '한국어 학습자 음성 DB 구축 참여',
      '언어 데이터 수집과 정제 경험',
      '이후 음성인식, TTS, 언어교육 AI 관심으로 연결',
    ],
    tags: ['말뭉치', '음성 데이터', '한국어 교육'],
    prompt: '국립국어원 말뭉치 구축 경험이 AI/언어 데이터 이해에 어떤 기반이 됐는지 설명해 주세요.',
  },
]

const certItems: PortfolioMenuItem[] = [
  {
    id: 'cert-ai-pot',
    categoryId: 'certs',
    title: 'AI POT 1급',
    eyebrow: 'Certification',
    period: '2026.02',
    summary:
      'AI 프롬프트 활용능력 1급 자격을 취득해 생성형 AI 활용 역량을 공식적으로 증명했습니다.',
    highlights: [
      'AI 프롬프트활용능력 1급',
      '실무형 프롬프트 설계와 생성형 AI 활용 역량 보유',
    ],
    tags: ['AI', '프롬프트', '자격증'],
    prompt: 'AI POT 1급이 실무 역량과 어떻게 연결되는지 설명해 주세요.',
  },
  {
    id: 'cert-toeic-speaking',
    categoryId: 'certs',
    title: 'TOEIC Speaking',
    eyebrow: 'Language',
    period: '2026.01',
    summary: 'TOEIC Speaking 160점, Advanced Low 등급을 보유하고 있습니다.',
    highlights: [
      'TOEIC Speaking 160점',
      'Advanced Low',
      '글로벌 AI 서비스와 기술 자료를 읽고 커뮤니케이션하는 기반',
    ],
    tags: ['영어', '커뮤니케이션', '어학'],
    prompt: '영어 역량이 AI 서비스 기획 업무에 어떤 도움이 되는지 설명해 주세요.',
  },
  {
    id: 'cert-korean-teacher',
    categoryId: 'certs',
    title: '한국어교원자격증 2급',
    eyebrow: 'Certification',
    period: '2023.10',
    summary:
      '한국어교원자격증 2급을 보유하고 있으며, 언어교육과 학습자 관점 이해의 기반이 됩니다.',
    highlights: [
      '한국어교원자격증 2급',
      '언어교육, 학습자 이해, 교육 콘텐츠 기획 기반',
    ],
    tags: ['한국어 교육', '학습자 이해', '교육'],
    prompt: '한국어교원자격증이 에듀테크 서비스 기획에 어떤 강점이 되는지 설명해 주세요.',
  },
  {
    id: 'cert-computer',
    categoryId: 'certs',
    title: '컴퓨터활용능력 2급',
    eyebrow: 'Certification',
    period: '2021.02',
    summary: '데이터 정리와 업무 문서 처리의 기본 역량을 갖추고 있습니다.',
    highlights: [
      '컴퓨터활용능력 2급',
      '스프레드시트 기반 데이터 정리와 업무 자동화의 기초',
    ],
    tags: ['업무 도구', '데이터 정리', '문서화'],
    prompt: '컴퓨터활용능력과 데이터 정리 역량이 실무에 어떻게 쓰였는지 설명해 주세요.',
  },
]

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'career',
    label: '경력',
    shortLabel: 'Career',
    description: '실무 역할과 조직 안에서 만든 성과를 봅니다.',
    items: careerItems,
  },
  {
    id: 'education',
    label: '교육',
    shortLabel: 'Education',
    description: '언어, 연구, 학습자 이해의 기반을 봅니다.',
    items: educationItems,
  },
  {
    id: 'projects',
    label: '프로젝트',
    shortLabel: 'Projects',
    description: '문제 정의에서 구현과 성과까지 이어진 대표 사례입니다.',
    items: projectItems,
  },
  {
    id: 'activities',
    label: '활동',
    shortLabel: 'Activities',
    description: 'AI 리터러시 확장과 실무 밖 학습/공유 경험입니다.',
    items: activityItems,
  },
  {
    id: 'certs',
    label: '자격증',
    shortLabel: 'Certs',
    description: 'AI, 언어, 교육, 업무 도구 역량의 공식 기록입니다.',
    items: certItems,
  },
]

export const allPortfolioItems = portfolioCategories.flatMap((category) => category.items)

export function getCategoryById(id: PortfolioCategoryId) {
  return portfolioCategories.find((category) => category.id === id) ?? portfolioCategories[0]
}

export function getPortfolioItemById(id?: string | null) {
  return allPortfolioItems.find((item) => item.id === id) ?? portfolioCategories[0].items[0]
}
