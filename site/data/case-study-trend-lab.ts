// AI Trend Lab — 케이스스터디 데이터
import type { CaseStudy } from './case-studies'

export const caseStudyTrendLab: CaseStudy = {
  slug: 'trend-lab',
  projectId: 'project-ai-trend-lab',
  title: 'AI Trend Lab',
  coverQuestion: '흩어진 AI 정보를 어떻게 하면 **쌓을수록 가치가 커지는 자산**으로 만들 수 있을까?',
  tags: ['1인 빌드', '생성형 AI', '0→1'],
  meta: [
    { label: '수행 기간', value: '2025.11 ~ 현재 (운영·고도화 중)' },
    { label: '팀 구성', value: '단독 (기획 1, 개발 1 = 본인)' },
    { label: '역할', value: '문제 발견 → 기획 → 개발(바이브코딩) → 배포 → 운영 단독 수행' },
    { label: '스택', value: 'Next.js · React · Firebase · Vercel · Gemini API' },
  ],
  heroImage: {
    id: 'ai-trend-lab-main',
    description: 'AI Trend Lab 메인 화면 — 대시보드 또는 뉴스 아카이브',
  },
  link: { label: '라이브 서비스 보기', href: 'https://ai-trend-lab.vercel.app/' },

  steps: [
    {
      id: 'cs-problem',
      step: '01',
      eyebrow: 'PROBLEM',
      title: '문제 정의',
      lead: 'AI 신규 서비스를 기획할 때마다 반복되는 **3가지 병목**이 있었다',
      table: {
        headers: ['구분', '기존 방식 (As-Is)', '문제'],
        rows: [
          ['정보 축적', '구글 시트에 행 단위 누적', '검색·필터 불가 → 쌓이기만 하고 활용 0'],
          ['외부 소스', '범용 AI 뉴스레터 구독', '에듀테크·출판 맥락과 불일치'],
          ['시장조사', '매번 처음부터 리서치', '팀원 간 AI 이해 수준 차이로 논의 출발점 맞추기에 시간 소모'],
        ],
      },
      callout: {
        label: 'Impact',
        text: '비즈니스 임팩트: 시장조사 비효율 → 신규 아이템 기획 속도 저하, 의사결정 근거 부재',
      },
    },
    {
      id: 'cs-research',
      step: '02',
      eyebrow: 'RESEARCH',
      title: '원인 분석 & 설계 판단',
      lead: '가설: 정보를 "모으는 것"보다 **나중에 실제로 쓸 수 있는 구조**가 핵심이다',
      table: {
        headers: ['설계 판단', '검증 / 근거', '결정'],
        rows: [
          ['수집 방식', '완전 자동 크롤링 시도 → 품질 저하 발생', '사람이 선별 + AI가 구조화'],
          ['요약 구조', '단순 요약은 의사결정에 무용', '"교육 출판사에 어떤 의미인가"를 Gemini가 자동 생성'],
          ['벤치마크 신뢰성', 'AI에 수치 계산 위임 시 환각 발생', '출력 필드 명세 + enum + 헤더 기반 파싱으로 안정화'],
        ],
      },
      callout: {
        label: 'Insight',
        text: '데이터가 쌓일수록 서비스 가치가 커지는 구조여야 팀이 지속적으로 사용한다',
      },
    },
    {
      id: 'cs-solution',
      step: '03',
      eyebrow: 'SOLUTION',
      title: '솔루션',
      lead: '3개 핵심 기능으로 **"활용 가능한 아카이브"**를 구현했다',
      beforeAfter: [
        {
          title: '① 뉴스 아카이브 — AI가 구조화하고 사람이 선별',
          before: '구글 시트에 링크만 쌓임. 검색 불가, 한 달 전 뉴스를 찾으려면 무한 스크롤',
          after: 'URL 입력 → Gemini가 제목·출처·요약 3종·비즈니스 인사이트·카테고리 태그 자동 생성. 검색·필터·북마크·타임라인 제공 (150건+ 축적)',
        },
        {
          title: '② 주간/월간 트렌드 리포트 — 요약이 아닌 의사결정 도구',
          before: '"이번 주 AI에 무슨 일이 있었나"를 5분 안에 파악할 방법이 없음',
          after: 'Gemini에 "교육 출판사 AI 애널리스트" 역할 부여 → 헤드라인·핵심 트렌드·기업 동향·전망 구조로 자동 발행 (관리자 최종 검수)',
        },
        {
          title: '③ AI 벤치마크 순위 — 평가 기준 설계부터 시계열 추적까지',
          before: '모델 비교 기준이 사람마다 다름. 개별 스냅샷만 존재',
          after: 'LiveBench·LMArena 등 공신력 지표 기반 정량+정성 분리 평가. 월별 제조사 Line 차트로 경쟁 구도 변화 추적',
        },
      ],
    },
    {
      id: 'cs-impact',
      step: '04',
      eyebrow: 'IMPACT',
      title: '성과',
      lead: '시장조사 **2명 × 1주 → 2일**, 사이드 프로젝트에서 **사내 정식 프로젝트**로',
      statTiles: [
        { label: 'AI 시장조사 소요', value: '2명×1주 → 2일', note: '기획 착수 리드타임 단축' },
        { label: '주 1회 이상 사용자', value: '87%', note: 'AI Lab 팀원 약 30명 기준' },
        { label: '팀 내부 만족도', value: '3.8 / 5', note: 'AI Lab 15명 설문' },
        { label: '뉴스 아카이브', value: '150건+', note: '검색·필터 가능한 구조로 축적' },
      ],
      bullets: [
        '사내 최초의 자체 구축 AI 지식 플랫폼',
        '사이드 프로젝트 → 사내 정식 프로젝트 승격, 약 30명 운영',
        '신규 서비스 기획 시 시장 기초 자료 + 매주 회의 자료로 정착',
        '기획 → 개발 → 배포 → 운영 전 사이클 단독 경험',
      ],
    },
    {
      id: 'cs-retro',
      step: '05',
      eyebrow: 'RETROSPECTIVE',
      title: '회고',
      lead: '자동화 범위를 줄이는 대신 **품질과 사용률**을 얻었다',
      entries: [
        {
          label: '트레이드오프',
          content:
            '초기에 완전 자동 크롤링을 포기하고 "사람 선별"을 택했다. 자동화 범위는 줄었지만 아카이브 품질을 확보해, 결과적으로 팀이 실제로 쓰는 서비스가 됐다.',
        },
        {
          label: '다시 한다면',
          content:
            '설문(15명, 만족도 3.8)을 출시 전에 했다면 기능 우선순위를 더 빨리 잡았을 것. 뉴스 등록률 데이터를 더 일찍 봤다면 "관리자 등록 + 확장 프로그램" 자동화를 앞당겼을 것.',
        },
        {
          label: '배운 점',
          content:
            '생성형 AI 기능은 "환각을 어떻게 통제하는가"가 기획의 핵심 — 출력 필드 명세·enum·역할 부여가 품질을 좌우한다.',
        },
      ],
    },
  ],
}
