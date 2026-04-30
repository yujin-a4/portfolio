// 프로젝트별 상세 섹션 데이터 (portfolio_projects.md 기반)
// ImagePlaceholder의 id는 data-image-slot에 사용됨

export interface TableData {
  headers: string[]
  rows: string[][]
}

export interface FeatureCardData {
  badge: string
  title: string
  bullets?: string[]
  src?: string
}

export interface ProjectSection {
  id: string
  title?: string
  content?: string
  highlight?: string
  bullets?: string[]
  entries?: { label: string; content: string }[]
  table?: TableData
  imageSlot?: { id: string; description: string; aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'; src?: string; badge?: string; collapsible?: boolean }
  images?: { id: string; description: string; aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'; src?: string; badge?: string }[]
  featureCards?: FeatureCardData[]
  sideLayout?: boolean
  subsections?: ProjectSection[]
}

export interface RichProjectData {
  projectId: string
  tagline: string
  subtitle?: string
  description?: string
  overview: TableData
  sections: ProjectSection[]
}

export const richProjects: RichProjectData[] = [
  // ─────────────────────────────────────────
  // PROJECT 01: 클래스캔버스
  // ─────────────────────────────────────────
  {
    projectId: 'project-classcanvas',
    tagline: '교과서 연계 쌍방향 수업 자료 **1,976건**을 직접 설계해 **플랫폼 활용률**을 끌어올리다',
    overview: {
      headers: ['항목', '내용'],
      rows: [
        ['기간', '2025.01 ~ 2025.09 (1차 오픈 4월 / 개편 오픈 9월)'],
        ['소속', 'YBM AI Lab'],
        ['역할', '메인 기획 담당 — 화면 기획서, 유저 플로우, 자료 구성 가이드, 편집팀 교육, 외부 개발사(블루가) 협업'],
        ['URL', 'https://www.ybmcloud.com/classcanvas.html'],
      ],
    },
    sections: [
      {
        id: 'cc-problem',
        title: 'Problem — 기능은 있었다. 콘텐츠가 없었다.',
        content:
          '클래스캔버스의 기반인 Aspen Class는 퀴즈 제작, 쌍방향 수업, QR 공유 등 교사가 원하는 기능을 이미 갖추고 있었다. 그러나 2025년 4월 1차 오픈 당시에는 YBM 교과서와 직접 연결된 수업 자료가 없었다. 교사는 빈 도구만 받은 셈이었다.',
        subsections: [
          {
            id: 'cc-data',
            title: 'Y클라우드 사용 행태 데이터 분석 (활성 사용자 16,278명)',
            table: {
              headers: ['지표', '수치', '의미'],
              rows: [
                ['교과서 자료 조회 중 영어 비중', '78%', '영어 편중 → 다과목 자료 확장 전략 수립 근거'],
                ['초등 영어 교사 사용률', '87.4%', '교과서 연계 자료의 실제 수요 확인'],
                ['고등 영어 교사 사용률', '89.4%', '교과서 연계 자료의 실제 수요 확인'],
              ],
            },
          },
          {
            id: 'cc-fgi-insight',
            title: '2024.09 Y클라우드 사용자 FGI (약 70명) 핵심 발견',
            bullets: [
              '참여 교사 대다수가 쌍방향 수업 기능의 존재 자체를 모르고 있었음',
              '알게 된 순간 "바로 쓰겠다"는 반응',
              '"수업 준비할 시간이 없어서 처음부터 자료를 만드는 건 불가능하다"는 의견 반복',
            ],
          },
        ],
      },
      {
        id: 'cc-role',
        title: 'My Role — 무엇을 기획했는가',
        subsections: [
          {
            id: 'cc-role-1',
            title: '① "YBM 자료 가져오기" 유저 플로우 설계',
            bullets: [
              '탐색 동선: 학교급 → 과목 → 대단원/중단원 순 필터링 (교사의 실제 수업 준비 순서 반영)',
              '기술 제약 반영: 과목 수가 DB 업데이트에 따라 유동적 → 고정 탭 대신 스와이프·이동 버튼으로 대응',
              '완료 토스트 알럿 → 섬네일 크기 조정 불가 확인 후 스크롤 영역·반응형 재설계 (w1920~w1024)',
            ],
          },
          {
            id: 'cc-role-2',
            title: '② 자료 품질 설계 — "수업 도구"로 만들기',
            content:
              '교과서 내용을 PPT로 옮기는 것이 아닌, 교사 혼자서는 만들기 어려운 쌍방향 수업 자료를 제공해야 했다. Aspen Class의 퀴즈 기능과 Ally Class의 쌍방향 활동이 결합된 형태로 자료가 제작되도록 가이드를 설계하고, 편집팀을 직접 교육했다.',
            table: {
              headers: ['과목', '자료 수'],
              rows: [
                ['수학 (초등 3~6학년)', '942건'],
                ['음악 (초·중·고)', '371건'],
                ['체육 (초·중·고)', '311건'],
                ['영어 (초·중·고)', '195건'],
                ['실과·한문·보건', '157건'],
                ['합계', '1,976건'],
              ],
            },
          },
          {
            id: 'cc-role-3',
            title: '③ 편집창 UX 개선 & 폴더 시스템 도입',
            bullets: [
              '편집창 메뉴 재설계: 퀴즈 템플릿·YBM 자료·갤러리 접근성 향상, 저장 버튼·QR 공유 추가',
              '폴더 생성·이동·삭제 기능 설계 (최대 12개 폴더, 반응형 팝업 w1920~w1024)',
            ],
          },
          {
            id: 'cc-spec-images',
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
          },
          {
            id: 'cc-role-4',
            title: '④ 외부 개발사(블루가) 협업',
            content:
              '화면 기획서 버전 관리 v1.0 → v2.3. 기술 제약이 확인될 때마다 기획을 수정해 재전달하는 반복 사이클을 거쳤다.',
          },
        ],
      },
      {
        id: 'cc-result',
        title: 'Result — GA 지표 (2025.10 ~ 2026.03, 개편 후 6개월)',
        table: {
          headers: ['지표', '수치', '맥락'],
          rows: [
            ['신학기 최고 참여율', '87.32% (3월)', 'Google Analytics 양호 기준 63% 대비 우수'],
            ['활성 사용자 증가', '+74% (10월→3월)', '별도 마케팅 없이 서비스 가치만으로 달성'],
            ['6개월 연속 참여율', '78%+ 유지', '일회성 유입이 아닌 반복 사용 구조가 작동함을 증명'],
          ],
        },
        bullets: [
          '6개월 연속 참여율 78% 이상 — Google Analytics 양호 기준(63%)을 단 한 달도 밑돌지 않음. 일회성 유입이 아닌 반복 사용 구조가 작동함을 증명.',
          '방학(1월) 딥유즈 확인 — 활성 사용자가 137명으로 줄었지만 평균 참여 시간 6분 47초로 연중 최고치. 수업 준비를 미리 하는 코어 유저층이 존재한다는 검증.',
          '신학기(3월) 최고치 달성 — 별도 마케팅 없이 서비스 가치만으로 참여율 87.32%, 활성 사용자 296명(10월 대비 +74%).',
        ],
      },
      {
        id: 'cc-takeaway',
        title: 'Takeaway',
        content:
          '"도구를 주는 것"과 "도구 + 콘텐츠를 주는 것"의 차이를 수치로 확인한 프로젝트다. 기능이 아무리 좋아도, 사용자가 즉시 가치를 체감할 수 있는 자료가 없으면 활용되지 않는다. 기술 제약을 기획에 반영하는 반복 사이클을 v2.3까지 오며 직접 체득했다.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // PROJECT 02: AI 디지털교과서
  // ─────────────────────────────────────────
  {
    projectId: 'project-aidt',
    tagline: '**229명** 교사의 목소리를 데이터로 정리하고, **설계안**으로 만들어 개발사에 전달하다',
    overview: {
      headers: ['항목', '내용'],
      rows: [
        ['기간', '2024.05 ~ 현재'],
        ['소속', 'YBM AI Lab'],
        ['역할', 'FGI 설계·수행·분석, 품질관리 체계 설계, 개선안 기획 및 개발사 커뮤니케이션'],
        ['제품', 'AI 디지털교과서 — LKT 기반 학습진단, AI 보조교사, AI 튜터, 음성인식 탑재 클라우드 교육 플랫폼'],
        ['규모', '초·중·고 영어·수학 전 과목 / 보조출원사 다수 / 검정 심사 30개+ 항목'],
      ],
    },
    sections: [
      {
        id: 'aidt-problem',
        title: 'Problem',
        bullets: [
          '30개 이상의 교육부 검정 심사 항목 통과 필요',
          '실제 교사가 수업 현장에서 서비스를 어떻게 받아들이는지 사전 파악 및 제품 반영 필요',
          'LKT 학습진단·AI 보조교사·AI 튜터·음성인식 등 다수 AI 기능이 탑재된 복잡한 플랫폼',
        ],
      },
      {
        id: 'aidt-role',
        title: 'My Role — 4가지 업무 축',
        imageSlot: {
          id: 'aidt-overview',
          description: '4개 업무 축 인포그래픽 — FGI / 품질관리 / 접근성 / 자체기술검증',
          aspectRatio: '16/9',
        },
        subsections: [
          {
            id: 'aidt-fgi-1',
            title: '① 1차 FGI (2024.05 / 검정 심사 전)',
            content: '전국 6개 지역 현직 초등교사 157명 (영어 77명 / 수학 80명) 대상 소그룹 면접. 5개 영역 × 내용/기능 2개 측면으로 설문 설계.',
            table: {
              headers: ['발견', '긍정응답률', '원인 분석'],
              rows: [
                ['수업 화면 적절성', '59.9% (영어 42%)', '태블릿PC 비율 33.8%인데 최적화 미흡'],
                ['모니터링 기능 인지', '32.4% (최하위)', '기능이 다른 탭에 숨어있어 존재 자체를 모름'],
                ['학생 간 상호작용', '29.4% (수학 23.8%)', '영어는 협업 활동 존재, 수학은 전무'],
              ],
            },
            imageSlot: {
              id: 'aidt-fgi1-doc',
              description: 'FGI 체크리스트 실제 문서 — 영역 구조 보이는 페이지',
              aspectRatio: '4/3',
            },
          },
          {
            id: 'aidt-fgi-improve',
            title: '분석 → 개선 제안서 → 개발사 전달',
            bullets: [
              '수업안 재구성 기능 발견성: "기능이 있는지조차 모른다" 발견 → 아이콘을 [수업안 만들기] 텍스트 버튼으로 변경, 저장 조건·복사·검색·공유 기능 3종 추가 설계',
              '수학 학생-학생 상호작용 부재: 긍정응답률 23.8%, 디지털교과서 가이드라인 필수 요소 미충족 → 곱셈 빙고·분수 국기 활동 등 모둠 활동 6종의 규칙·진행 방식·디지털 구현 형태까지 직접 설계',
              '모든 제안 항목에 우선순위 분류: [요청] 제출 전 반영 / [검토] 제출 후 수정',
            ],
            imageSlot: {
              id: 'aidt-improvement-doc',
              description: '개선 제안서 실제 문서 캡처 — 메뉴명 변경 또는 수업안 재구성 개선안 페이지',
              aspectRatio: '4/3',
            },
          },
          {
            id: 'aidt-fgi-2',
            title: '② 2차 FGI (2025.05 / 운영 단계)',
            content: '초·중학교 교사 72명 대상 소그룹 간담회. 1차와 의도적으로 다르게 설계.',
            table: {
              headers: ['변경 사항', '이유'],
              rows: [
                ['평가 영역 5개 → 6개 + 총 50개+ 문항 확대', '1차에서 "수업 이후 과정"과 "학생 관점" 데이터 부족'],
                ['"자유 의견" 중 "기능 제안" 항목을 별도 컬럼으로 분리', '1차에서 정성 의견이 미분류 상태로 섞여 분석 시 재분류에 과도한 시간 소요'],
              ],
            },
            bullets: [
              '초등 영어: AI 보조교사 모니터링 긍정응답 63%, 학생 개별 응답 실시간 확인 여전히 어려움',
              '중등 영어: 추가 활동 탐색 효율성 65%, 문항 수·소요시간·난이도 표시 요청',
              '공통: "교사 판서가 학생 화면에 실시간 공유되지 않아 종이를 준비해야 하는 아이러니"',
            ],
          },
          {
            id: 'aidt-quality',
            title: '③ 서비스 품질관리 체계 직접 설계 (10-3장)',
            content: '검정 심사 30개 항목 중 품질관리 영역을 처음부터 직접 작성. 핵심 판단: 시스템 품질관리와 콘텐츠 품질관리를 구분.',
            table: {
              headers: ['품질 영역', '지표', '기준'],
              rows: [
                ['시스템', '가용률', '99.5% 이상'],
                ['시스템', '평균 응답속도', '3초 이내'],
                ['콘텐츠', '오류율', '0.1% 이하'],
                ['운영', '사용자 피드백 반영률', '80% 이상'],
              ],
            },
          },
          {
            id: 'aidt-verify',
            title: '④ 자체기술검증결과서 & 접근성 테스트',
            bullets: [
              '복수 개발사(A사 그래프, B사 텍스트) 초안을 전 항목 검토·수정·보완, 서술 구조와 증빙 형식 통일',
              '시각·청각·운동·인지 장애 유형별 테스트 항목 설계·수행, KWCAG 2.1 기준 대체텍스트 기준 수립',
            ],
          },
        ],
      },
      {
        id: 'aidt-result',
        title: 'Result',
        bullets: [
          'AI 디지털교과서 교육부 검정 심사 통과 기여 — FGI 157명(1차) + 72명(2차) = 229명 데이터 기반',
          '품질관리 체계(10-3장) 처음부터 직접 설계 → 운영 가능 수준 구축',
          '모든 개선 제안서에 우선순위 분류([요청]/[검토])를 붙여 개발사 커뮤니케이션 효율화',
        ],
      },
      {
        id: 'aidt-takeaway',
        title: 'Takeaway',
        content:
          '"사용자 리서치는 질문 설계가 전부다." 1차 FGI에서 내용/기능을 분리하지 않았다면, "모니터링 기능이 다른 탭에 숨어있어 존재 자체를 모른다"는 발견은 나오지 않았을 것이다. 개선 제안은 "고쳐주세요"가 아니라 "이렇게, 이 이유로"여야 개발사가 움직인다.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // PROJECT 03: AI Trend Lab
  // ─────────────────────────────────────────
  {
    projectId: 'project-ai-trend-lab',
    tagline: '구글 시트 한계를 발견하고, 직접 **서비스로 만들어** 팀 **정식 프로젝트**로 승격시키다',
    overview: {
      headers: ['항목', '내용'],
      rows: [
        ['기간', '2025.11 ~ 현재 (운영 및 고도화 중)'],
        ['소속', 'YBM AI Lab'],
        ['역할', '기획 + 개발 (1인 프로젝트)'],
        ['기술 스택', 'Next.js · React · Firebase · Vercel / 바이브코딩 (Cursor + Claude + Gemini)'],
        ['URL', 'https://ai-trend-lab.vercel.app/'],
      ],
    },
    sections: [
      {
        id: 'atl-hero',
        imageSlot: {
          id: 'ai-trend-lab-main',
          description: 'AI Trend Lab 메인 화면 — 대시보드 또는 뉴스 아카이브 화면',
          aspectRatio: '16/9',
        },
      },
      {
        id: 'atl-problem',
        title: 'Problem — 구글 시트의 3가지 한계',
        bullets: [
          '탐색·검색의 한계: 행이 늘어날수록 원하는 정보를 찾기 어려움. 한 달 전 논문 뉴스를 찾으려면 스크롤 무한 반복',
          '트렌드 파악 불가: "지난 3개월간 LLM 분야에서 어떤 모델이 올라오고 내려갔는지"를 한눈에 볼 수 없었음',
          'AI 리터러시 편차: 팀원마다 관심 분야와 지식 수준이 달라, 전체가 AI 기술 흐름을 공유할 구조가 없었음',
        ],
      },
      {
        id: 'atl-solution',
        title: 'Solution — 주요 기능 4가지',
        imageSlot: {
          id: 'ai-trend-lab-features',
          description: 'AI Trend Lab 기능별 화면 — 대시보드 / 뉴스 아카이브 / 순위 리포트',
          aspectRatio: '16/9',
        },
        subsections: [
          {
            id: 'atl-f1',
            title: '① 대시보드',
            content:
              '분야별(LLM, 이미지, 영상, 오디오, STT, 코딩 등) 주목할 만한 AI 서비스를 한눈에 조망하는 메인 화면.',
          },
          {
            id: 'atl-f2',
            title: '② AI 뉴스 아카이브 (현재 약 150건 축적)',
            content:
              'URL을 입력하면 Gemini API가 자동으로 제목·날짜·한줄 요약·핵심 내용 3가지·인사이트로 구조화. 현재 Claude 확장 프로그램을 활용해 뉴스 추가 자동화 파이프라인도 구현 중이다. 유의어 처리 설계로 "지피티" 검색 시 "GPT" 결과도 함께 노출.',
            bullets: [
              '뉴스를 아는 사용자: URL 입력란에 바로 붙여넣기',
              '뉴스 출처를 모르는 사용자: 하단 분류별 뉴스 사이트 목록 탐색',
            ],
          },
          {
            id: 'atl-f3',
            title: '③ 순위 리포트 — 평가 기준 설계 + 보고서 자동화',
            content:
              '관련 논문과 벤치마크 사이트를 리서치해 LLM·영상 생성 등 영역별 평가 기준을 직접 수립. 관리자 페이지에서 벤치마크 데이터를 붙여넣으면 AI가 정해진 양식으로 보고서 자동 생성. 보고서가 쌓일수록 모델별 순위 변화를 선 그래프로 추적 가능.',
            imageSlot: {
              id: 'ai-trend-lab-chart',
              description: '순위 리포트 화면 — 선 그래프로 모델별 순위 변화 추적',
              aspectRatio: '16/9',
            },
          },
          {
            id: 'atl-f4',
            title: '④ 뉴스 리포트',
            content: '주간/월간 단위 AI 뉴스 분석 리포트 정기 발행.',
          },
        ],
      },
      {
        id: 'atl-decisions',
        title: '기획 과정의 핵심 판단들',
        table: {
          headers: ['상황', '선택', '이유'],
          rows: [
            ['뉴스 자동 크롤링 시도 → 사이트 차단', '수동 URL 입력 + 크롤링 참고용 제공의 절충안', '"사람이 판단하고 AI가 구조화"하는 분업이 품질 측면에서 적합'],
            ['월별 보고서가 독립적으로 존재', '누적 시 선 그래프로 순위 변화 자동 추적', '개별 스냅샷이 아닌 시계열 트렌드가 실제 의사결정에 유용'],
            ['단순 키워드 검색', '유의어 처리 설계', 'AI 분야는 동일 기술에 한글명·영어명·약어 등 복수 명칭 공존'],
          ],
        },
      },
      {
        id: 'atl-result',
        title: 'Result',
        bullets: [
          '1인 기획·개발·배포 — Next.js + Firebase + Vercel 풀스택 서비스를 혼자 완성',
          '150건+ AI 뉴스 아카이브 축적, AI Lab 팀원 30명 대상 안정적 운영',
          '자발적 사이드 프로젝트 → 팀 정식 프로젝트 승격 → 전사 확대 배포 준비 중',
        ],
      },
      {
        id: 'atl-dev',
        title: '개발 과정에서 배운 것',
        content:
          '바이브코딩(Cursor + Claude + Gemini)으로 Next.js, React, Firebase, Vercel 기반의 풀스택 서비스를 기획부터 배포까지 1인으로 완성했다. DB 설계, API 연동, 배포 파이프라인까지 전 과정을 직접 다루며, 기술적 실현 가능성을 기획 단계에서 함께 판단할 수 있는 시야를 갖게 됐다.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // ACTIVITY: Dakon 긴급 인수인계 해커톤
  // ─────────────────────────────────────────
  {
    projectId: 'activity-dakon-hackathon',
    tagline: '기획자가 **바이브코딩**으로 실제 서비스를 구현해 **2위를 수상**하다',
    subtitle: '해커톤 참가부터 협업·제출까지 이어지는 올인원 워크스페이스, MAXER',
    description:
      'Dakon의 "긴급 인수인계 해커톤 — 문서만 남기고 사라졌다"는 미완성 웹페이지를 제공된 자료를 바탕으로 완성하고, 팀만의 아이디어로 기능과 UX를 확장해 더 나은 서비스 경험을 제안하는 대회였다. 초보 개발자가 어디서부터 구현해야 할지 막막한 상황을 전제로, 바이브코딩을 활용해 자료를 해석하고 실제 웹페이지 형태의 서비스를 완성해야 했다.',
    overview: {
      headers: ['항목', '내용'],
      rows: [
        ['주최', 'Dakon'],
        ['팀명 · 팀원', 'M.I.O · 강유진, 조정연 (2인)'],
        ['역할', '서비스 기획 전 과정 · 바이브코딩으로 실제 페이지 구현 · 뒷단 로직 설계'],
        ['기술 스택', 'Next.js 15 (App Router) · Zustand · Tailwind CSS · Vercel'],
        ['결과', '2위 수상'],
        ['개발 노트', 'https://www.notion.so/Daker-744b1f4f640a8390b54301c81dd7b885'],
      ],
    },
    sections: [
      {
        id: 'hackathon-problem',
        title: 'Step 1. 문제 정의 — "해커톤 경험이 깨지는 순간은 어디인가"',
        content:
          '해커톤 참가자가 실제로 겪는 문제는 아이디어 부족이 아니라 탐색, 팀 구성, 협업, 제출, 사후 정리가 서로 다른 도구로 흩어져 있다는 점이었다. 참가자가 아이디어와 구현에 집중할 수 있도록 페르소나 2명과 UX 여정 지도를 기준으로 끊기는 지점을 먼저 정리했다.',
        imageSlot: {
          id: 'maxer-ux-journey',
          description: 'UX 여정 지도 — 4단계 감정곡선과 고통 지점',
          aspectRatio: '4/3',
          src: '/images/activity/maxer-p6.png',
          badge: 'UX Journey Map',
          collapsible: true,
        },
        subsections: [
          {
            id: 'hackathon-pain-points',
            table: {
              headers: ['단계', 'Pain Point', '원인', '기획 방향'],
              rows: [
                ['탐색', '내 수준에 맞는 대회 판단 어려움', '대회 정보가 파편화되고 추천 기준이 없음', '프로필 기반 맞춤 추천'],
                ['팀 구성', '매칭 실패 & 팀 구성 불안', '외부 오픈채팅 이탈, 스킬 검증 수단 부재', '점수 기반 팀·팀원 매칭'],
                ['대회 진행', '진행 상황 공유와 제출 관리 부담', '카카오톡·노션·구글독스 분산 사용', '올인원 베이스캠프'],
                ['결과·성장', '참가 이력 소멸', '수상하지 않으면 경험이 이어지지 않음', '포인트·랭킹·성장 네트워킹 루프'],
              ],
            },
          },
        ],
      },
      {
        id: 'hackathon-solution',
        title: 'Step 2. 솔루션 설계 — MAXER 서비스 기능 상세 설계',
        featureCards: [
          {
            badge: '핵심 기능 01',
            title: '프로필 기반 스코어링 매칭 엔진',
            bullets: [
              '데이터 소스: 마이페이지 프로필 입력 (주 역할·관심 분야·기술 스택·협업 강점)',
              '해커톤 추천: 분야 적합성 45pt, 직무 일치 25pt, 기술 스택 20pt — 20점 미만 노출 제외',
              '팀 매칭: 포지션 직결 50pt, 인접 포지션 28pt, 기술 시너지 30pt',
              '결과 표시: 매칭 점수, 추천 사유 태그, 팀장용 즉시 초대 기능',
            ],
            src: '/images/activity/maxer-p7.png',
          },
          {
            badge: '핵심 기능 02',
            title: '올인원 베이스캠프',
            bullets: [
              '정보 탭: 팀 현황, 타임라인, 팀장 전용 관리 센터',
              '작전실 탭: 진행 상황 추적기, 제출 허브, D-day 카운트다운, 팀 공유 메모',
              '게시판: 칸반형 아이디어 보드 (아이디어·리소스·할 일)',
              '최소한의 허브 기능으로 플랫폼 내 핵심 활동 완수 지원',
            ],
            src: '/images/activity/maxer-p9.png',
          },
          {
            badge: '핵심 기능 03',
            title: '성장 네트워킹 루프',
            bullets: [
              '포인트 적립: 팀 만들기·참여 +30pt, 단계별 과제 제출 +100pt, 투표 +5pt',
              '랭킹 = (참가 횟수 × 50) + (제출 횟수 × 100) + 누적 행동 포인트 + 순위 가점',
              '설계 의도: 10번 참가 3번 제출한 사람 > 1번 우승한 사람',
              '루프: 행동 → 포인트 즉시 적립 → 실시간 랭킹 상승 → 새로운 팀 초대 → 재참가',
            ],
            src: '/images/activity/maxer-p11.png',
          },
        ],
      },
      {
        id: 'hackathon-result',
        title: 'Step 3. 결과 & 회고',
        highlight: '최종 2위 수상',
        subsections: [
          {
            id: 'hackathon-retro-entries',
            entries: [
              {
                label: '배운 점',
                content:
                  '뒷단 로직을 직접 설계하고 구현하는 과정이 서비스 기획자로서 시스템 전체를 입체적으로 이해하는 계기가 됐다. 같은 기능도 사용자의 상태(비로그인, 프로필 미설정, 팀원, 팀장, 대회 Phase)에 따라 화면과 권한이 달라져야 하고, 그 경우의 수를 모두 정의해야 서비스가 끊기지 않는다는 것을 직접 구현하며 체득했다.',
              },
              {
                label: '한계점',
                content:
                  '실제 사용자가 어느 지점에서 이탈하는지, 추천 기능이 팀 구성에 도움이 되는지, 베이스캠프가 외부 도구를 대체하는지는 소수의 실사용자라도 직접 테스트해야 나오는 데이터다. 제품의 가치는 기획과 구현이 아니라 실제 사용자의 행동에서 검증된다는 것을 이번 프로젝트가 다시 확인시켜줬다.',
              },
            ],
          },
          {
            id: 'hackathon-next-step',
            title: '다음 고도화 계획',
            table: {
              headers: ['단계', '계획'],
              rows: [
                ['Step 1', '결과물 제출·현황 관리, 마이페이지 자동 반영, Phase-Aware 리더보드'],
                ['Step 2', 'AI 일정 어시스턴트, 스마트 리소스 핀, match-ai.ts(Genkit) 활성화로 추천 고도화'],
                ['Step 3', '팀원 간 상호 리뷰·협업 온도 시스템, 개인별 포트폴리오 공개 URL, 서버 연동'],
              ],
            },
          },
        ],
      },
    ],
  },
]

export function getRichProject(projectId: string): RichProjectData | undefined {
  return richProjects.find((p) => p.projectId === projectId)
}
