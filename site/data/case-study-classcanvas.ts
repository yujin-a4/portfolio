// 클래스캔버스 서비스 개편 — 케이스스터디 데이터
import type { CaseStudy } from './case-studies'

export const caseStudyClasscanvas: CaseStudy = {
  slug: 'classcanvas',
  projectId: 'project-classcanvas',
  title: '클래스캔버스 서비스 개편',
  coverQuestion: '기능은 다 있는데 아무도 쓰지 않는 플랫폼, **무엇이 빠져 있었을까?**',
  tags: ['서비스 개편', 'GA 분석', '외부 개발사 협업'],
  meta: [
    { label: '수행 기간', value: '2025.01 ~ 2025.09 (1차 오픈 4월 / 개편 오픈 9월)' },
    { label: '소속', value: 'YBM AI Lab' },
    { label: '역할', value: '메인 기획 — 화면 기획서 v1.0~v2.3, 유저 플로우, 자료 구성 가이드, 편집팀 교육, 외부 개발사 협업' },
    { label: '제품', value: '클래스캔버스 — YBM 교과서 연계 쌍방향 수업 자료 플랫폼' },
  ],
  heroImage: {
    id: 'classcanvas-hero',
    description: '클래스캔버스 메인 화면 — YBM 자료 가져오기 또는 수업 자료 목록',
  },
  link: { label: '서비스 보기', href: 'https://www.ybmcloud.com/classcanvas.html' },

  steps: [
    {
      id: 'cc-problem',
      step: '01',
      eyebrow: 'PROBLEM',
      title: '문제 정의',
      lead: '기능은 있었다. **콘텐츠가 없었다** — 교사는 빈 도구만 받은 셈이었다',
      bullets: [
        '기반 플랫폼(Aspen Class)은 퀴즈 제작·쌍방향 수업·QR 공유 등 교사가 원하는 기능을 이미 보유',
        '그러나 2025년 4월 1차 오픈 당시 YBM 교과서와 직접 연결된 수업 자료가 0건',
        '"수업 준비할 시간이 없어서 처음부터 자료를 만드는 건 불가능하다"는 의견이 FGI에서 반복',
      ],
      callout: {
        label: 'Impact',
        text: '좋은 기능도 즉시 체감할 콘텐츠가 없으면 활용되지 않는다 — 플랫폼 활용률 정체의 근본 원인',
      },
    },
    {
      id: 'cc-research',
      step: '02',
      eyebrow: 'RESEARCH',
      title: '데이터 분석 & 사용자 리서치',
      lead: '활성 사용자 **16,278명의 행태 데이터**와 **교사 70명 FGI**로 수요를 검증했다',
      table: {
        headers: ['지표', '수치', '의미'],
        rows: [
          ['교과서 자료 조회 중 영어 비중', '78%', '영어 편중 → 다과목 자료 확장 전략 수립 근거'],
          ['초등 영어 교사 사용률', '87.4%', '교과서 연계 자료의 실제 수요 확인'],
          ['고등 영어 교사 사용률', '89.4%', '교과서 연계 자료의 실제 수요 확인'],
        ],
      },
      bullets: [
        '2024.09 Y클라우드 사용자 FGI (약 70명): 참여 교사 대다수가 쌍방향 수업 기능의 존재 자체를 모르고 있었음',
        '기능을 알게 된 순간 "바로 쓰겠다"는 반응 — 기능이 아니라 발견성과 콘텐츠가 병목',
      ],
      callout: {
        label: 'Insight',
        text: '교과서 연계 자료의 수요는 검증됨 — 남은 건 "교사 혼자서는 만들기 어려운 자료"를 대신 만들어 주는 것',
      },
    },
    {
      id: 'cc-solution',
      step: '03',
      eyebrow: 'SOLUTION',
      title: '솔루션',
      lead: '탐색 동선부터 자료 품질, 편집 UX까지 — **수업 준비 흐름 전체**를 다시 설계했다',
      images: [
        {
          id: 'classcanvas-flow',
          description: 'YBM 자료 가져오기 유저 플로우',
          aspectRatio: '4/3',
          src: '/images/classcanvas/classcanvas1.png',
          badge: '화면 기획서',
        },
        {
          id: 'classcanvas-editor',
          description: '편집창 UX 및 폴더 시스템',
          aspectRatio: '4/3',
          src: '/images/classcanvas/classcanvas2.png',
          badge: '화면 기획서',
        },
      ],
      cards: [
        {
          title: '① "YBM 자료 가져오기" 유저 플로우',
          bullets: [
            '학교급 → 과목 → 대단원/중단원 순 필터링 — 교사의 실제 수업 준비 순서 반영',
            '과목 수가 DB에 따라 유동적 → 고정 탭 대신 스와이프·이동 버튼으로 대응',
            '섬네일 크기 조정 불가 확인 후 스크롤 영역·반응형(w1920~w1024) 재설계',
          ],
        },
        {
          title: '② 자료 품질 설계 — 총 1,976건 구축',
          bullets: [
            '교과서를 PPT로 옮기는 게 아니라, 퀴즈+쌍방향 활동이 결합된 "수업 도구"로 제작되도록 가이드 설계',
            '영어 편중을 피해 수학 942건·음악 371건·체육 311건 등 다과목 동시 구축',
            '편집팀 직접 교육으로 자료 품질 기준 정착',
          ],
        },
        {
          title: '③ 편집창 UX & 폴더 시스템 + 개발사 협업',
          bullets: [
            '편집창 메뉴 재설계 — 퀴즈 템플릿·YBM 자료·갤러리 접근성 향상, 저장·QR 공유 추가',
            '폴더 생성·이동·삭제 설계 (최대 12개, 반응형 팝업)',
            '외부 개발사(블루가)와 화면 기획서 v1.0 → v2.3 — 기술 제약 확인 시마다 기획 수정·재전달 반복',
          ],
        },
      ],
    },
    {
      id: 'cc-impact',
      step: '04',
      eyebrow: 'IMPACT',
      title: '성과',
      lead: '별도 마케팅 없이 신학기 참여율 **87.32%**, 활성 사용자 **+74%**',
      statTiles: [
        { label: '신학기 최고 참여율', value: '87.32%', note: 'GA 양호 기준 63% 대비 우수 (2026.03)' },
        { label: '활성 사용자 증가', value: '+74%', note: '2025.10 → 2026.03, 마케팅 없이 달성' },
        { label: '6개월 연속 참여율', value: '78%+', note: '단 한 달도 양호 기준을 밑돌지 않음' },
        { label: '구축한 수업 자료', value: '1,976건', note: '수학·음악·체육 등 다과목' },
      ],
      bullets: [
        '6개월 연속 참여율 78% 이상 — 일회성 유입이 아닌 반복 사용 구조가 작동함을 증명',
        '방학(1월) 딥유즈 확인 — 활성 사용자 137명으로 줄었지만 평균 참여 시간 6분 47초로 연중 최고치. 수업을 미리 준비하는 코어 유저층 검증',
        '신학기(3월) 최고치 — 참여율 87.32%, 활성 사용자 296명',
      ],
    },
    {
      id: 'cc-retro',
      step: '05',
      eyebrow: 'RETROSPECTIVE',
      title: '회고',
      lead: '"도구를 주는 것"과 "도구 + 콘텐츠를 주는 것"의 차이를 **수치로 확인**했다',
      entries: [
        {
          label: '핵심 교훈',
          content:
            '기능이 아무리 좋아도 사용자가 즉시 가치를 체감할 콘텐츠가 없으면 활용되지 않는다. 개편의 본질은 신기능이 아니라 "첫 화면에서 바로 쓸 수 있는 자료"였다.',
        },
        {
          label: '협업 방식',
          content:
            '기술 제약을 기획에 반영하는 반복 사이클을 화면 기획서 v2.3까지 오며 체득 — 제약이 확인될 때마다 대안을 설계해 재전달하는 것이 기획자의 몫이었다.',
        },
      ],
    },
  ],
}
