// MAXER (긴급 인수인계 해커톤 2위) — 케이스스터디 데이터
import type { CaseStudy } from './case-studies'

export const caseStudyMaxer: CaseStudy = {
  slug: 'maxer',
  projectId: 'activity-dakon-hackathon',
  title: 'MAXER — 해커톤 올인원 워크스페이스',
  coverQuestion: '흩어진 해커톤 경험을 어떻게 **하나의 워크스페이스**로 모을 수 있을까?',
  tags: ['해커톤 2위', '서비스 기획', '바이브코딩'],
  meta: [
    { label: '수행 기간', value: '2026.03 ~ 2026.04 (Dakon "긴급 인수인계 해커톤")' },
    { label: '팀 구성', value: 'M.I.O — 강유진, 조정연 (2인) / 기획 전 과정 단독 주도' },
    { label: '역할', value: '서비스 기획 전 과정 · 바이브코딩으로 실제 페이지 구현 · 뒷단 로직 설계' },
    { label: '스택', value: 'Next.js 15 (App Router) · Zustand · Tailwind CSS · Vercel' },
  ],
  heroImage: {
    id: 'maxer-hero',
    description: 'MAXER 메인 화면',
    src: '/images/activity/maxer-main.png',
  },
  link: { label: '사이트 보기', href: 'https://daker-hackathon-tau.vercel.app/' },

  steps: [
    {
      id: 'mx-problem',
      step: '01',
      eyebrow: 'PROBLEM',
      title: '문제 정의',
      lead: '참가자의 진짜 문제는 아이디어가 아니라 **도구의 파편화**였다',
      bullets: [
        '탐색·팀 구성·협업·제출·사후 정리가 서로 다른 도구(오픈채팅·노션·구글독스)로 흩어져 있음',
        '해커톤 전용 워크스페이스가 없어 참가자가 아이디어와 구현에 집중하지 못함',
        '수상하지 않으면 참가 경험 자체가 소멸 — 이력이 이어지지 않음',
      ],
      callout: {
        label: 'Impact',
        text: '경험이 깨질 때마다 참가자가 이탈 → 대회 생태계 전체의 재참가율 저하로 이어지는 구조적 문제',
      },
    },
    {
      id: 'mx-research',
      step: '02',
      eyebrow: 'RESEARCH',
      title: 'UX 여정 분석',
      lead: '페르소나 2명과 **UX 여정 지도**로 경험이 끊기는 4개 지점을 특정했다',
      images: [
        {
          id: 'maxer-ux-journey',
          description: 'UX 여정 지도 — 4단계 감정곡선과 고통 지점',
          aspectRatio: '4/3',
          src: '/images/activity/maxer-p6.png',
          badge: 'UX Journey Map',
        },
      ],
      table: {
        headers: ['단계', 'Pain Point', '원인', '기획 방향'],
        rows: [
          ['탐색', '내 수준에 맞는 대회 판단 어려움', '대회 정보 파편화, 추천 기준 부재', '프로필 기반 맞춤 추천'],
          ['팀 구성', '매칭 실패 & 팀 구성 불안', '외부 오픈채팅 이탈, 스킬 검증 수단 부재', '점수 기반 팀·팀원 매칭'],
          ['대회 진행', '진행 공유·제출 관리 부담', '카카오톡·노션·구글독스 분산 사용', '올인원 베이스캠프'],
          ['결과·성장', '참가 이력 소멸', '수상 못 하면 경험이 이어지지 않음', '포인트·랭킹·성장 루프'],
        ],
      },
      callout: {
        label: 'Insight',
        text: '"팀 매칭 실패"와 "제출 전 혼선"이 감정곡선이 가장 깊게 꺾이는 핵심 고통 지점',
      },
    },
    {
      id: 'mx-solution',
      step: '03',
      eyebrow: 'SOLUTION',
      title: '솔루션 — 3개 핵심 기능',
      lead: '고통 지점마다 대응하는 기능을 설계하고 **바이브코딩으로 직접 구현**했다',
      cards: [
        {
          title: '① 프로필 기반 스코어링 매칭 엔진',
          bullets: [
            '마이페이지 프로필(역할·분야·기술 스택) 기반 해커톤·팀원 추천',
            '항목별 가중치를 반영한 스코어링 알고리즘 직접 설계',
            '매칭 결과에 추천 태그 + 즉시 초대 기능 제공',
          ],
          image: {
            id: 'maxer-matching',
            description: '매칭 엔진 화면',
            src: '/images/activity/maxer-p7.png',
            aspectRatio: '4/3',
          },
        },
        {
          title: '② 올인원 베이스캠프',
          bullets: [
            '팀 정보·타임라인·팀장 관리 센터를 하나의 정보 탭으로 통합',
            '진행 상황 추적기·제출 허브·D-day 카운트다운 내재화',
            '칸반형 아이디어 보드로 아이디어·리소스·할 일 관리',
          ],
          image: {
            id: 'maxer-basecamp',
            description: '베이스캠프 화면',
            src: '/images/activity/maxer-p9.png',
            aspectRatio: '4/3',
          },
        },
        {
          title: '③ 성장 네트워킹 루프',
          bullets: [
            '참가·제출·투표 등 행동에 포인트 즉시 적립',
            '우승 횟수보다 참가 빈도 중심의 랭킹 산정 기준 정의',
            '행동 → 포인트 → 랭킹 → 팀 초대 → 재참가로 이어지는 루프 설계',
          ],
          image: {
            id: 'maxer-loop',
            description: '성장 루프 화면',
            src: '/images/activity/maxer-p11.png',
            aspectRatio: '4/3',
          },
        },
      ],
    },
    {
      id: 'mx-impact',
      step: '04',
      eyebrow: 'IMPACT',
      title: '성과',
      lead: '비개발자 단독 기획으로 **2위 수상** — "기획 자체가 제품"임을 증명했다',
      statTiles: [
        { label: '최종 결과', value: '2위 수상', note: 'Dakon 긴급 인수인계 해커톤' },
        { label: '팀 구성', value: '2인', note: '기획 전 과정 단독 주도' },
        { label: '핵심 기능', value: '3종', note: '매칭 엔진 · 베이스캠프 · 성장 루프' },
        { label: '사용자 상태 정의', value: '5가지', note: '비로그인~팀장, Phase별 화면·권한 설계' },
      ],
      bullets: [
        '미완성 웹페이지를 자료 해석부터 기능·UX 확장까지 실제 서비스 형태로 완성',
        '같은 기능도 사용자 상태(비로그인·프로필 미설정·팀원·팀장·대회 Phase)에 따라 화면과 권한이 달라지는 경우의 수를 전부 정의',
        '뒷단 로직을 직접 설계·구현하며 시스템 전체를 입체적으로 이해',
      ],
    },
    {
      id: 'mx-retro',
      step: '05',
      eyebrow: 'RETROSPECTIVE',
      title: '회고',
      lead: '제품의 가치는 기획과 구현이 아니라 **실제 사용자의 행동**에서 검증된다',
      entries: [
        {
          label: '배운 점',
          content:
            '뒷단 로직을 직접 설계하고 구현하는 과정이 시스템 전체를 입체적으로 이해하는 계기가 됐다. 경우의 수를 모두 정의해야 서비스가 끊기지 않는다는 것을 직접 구현하며 체득했다.',
        },
        {
          label: '한계점',
          content:
            '실제 사용자가 어디서 이탈하는지, 추천이 팀 구성에 도움이 되는지는 소수라도 실사용 테스트가 필요한 데이터다. 다음 고도화(제출·현황 관리 → AI 어시스턴트 → 상호 리뷰·서버 연동)에서 검증할 계획.',
        },
      ],
    },
  ],
}
