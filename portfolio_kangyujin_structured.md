# PORTFOLIO DATA SOURCE — 강유진 (Yujin Kang)
# AI 서비스 기획자 · AI/AX 전략 · 직접 구현까지 하는 기획자
#
# [AI USAGE INSTRUCTIONS]
# 이 파일은 포트폴리오 웹사이트 바이브코딩용 데이터 소스입니다.
# 각 섹션은 YAML-style 주석으로 데이터 타입을 명시합니다.
# 프로젝트는 [현황 분석 → 문제 정의 → 전략 수립 → 실행 → 비즈니스 가치 증명] 프레임으로 구성되어 있습니다.
# IMAGE 플레이스홀더([IMAGE: ...])는 실제 이미지 파일 경로로 대체하세요.

---

## [SECTION: HERO]
# type: hero_profile
# purpose: 첫 화면 핵심 메시지. 직무 포지셔닝과 핵심 차별점 1문장.

name: 강유진 (Yujin Kang)
tagline: "AI 기술을 직접 검증하고, 서비스로 기획하고, 코드로 구현하는 AI 서비스 기획자"
contact:
  email: yujinkang1008@gmail.com
  location: 서울
  portfolio_url: https://ai-trend-lab.vercel.app/

positioning_statement: |
  단순히 AI 트렌드를 따라가는 기획자가 아닙니다.
  TTS·필기인식·LLM을 직접 PoC로 검증하고,
  229명 교사 FGI로 사용자 문제를 데이터로 정의하며,
  Next.js·Firebase로 사내 플랫폼을 1인 개발·배포한 기획자입니다.

core_differentiators:
  - label: "AI 기술 검증"
    description: "추상적 도입 검토가 아니라, 20개+ 평가 항목 기반 정량 PoC 수행"
  - label: "데이터 기반 기획"
    description: "229명 FGI 설계·분석 → 개선 제안서 → 개발사 전달까지 직접 수행"
  - label: "직접 구현"
    description: "바이브코딩(Claude Code · Cursor)으로 풀스택 서비스 1인 개발·운영"

---

## [SECTION: COMPETENCY_MAP]
# type: skills_matrix
# purpose: 역량과 프로젝트를 연결하는 매핑. 웹에서 인터랙티브 필터 구현 가능.

skill_areas:
  - name: "AI/AX 전략 기획"
    tags: [PoC 설계, 기술 검증, 벤치마킹, 도입 판단, 프롬프트 엔지니어링]
    evidence_projects: [AI_PoC, AI_Trend_Lab]

  - name: "사용자 리서치 & 데이터 기반 의사결정"
    tags: [FGI 설계·수행, 정량/정성 분석, KPI 설계, GA 분석]
    evidence_projects: [ClassCanvas, AIDT]

  - name: "서비스 기획 & UX 설계"
    tags: [화면 기획서, 유저 플로우, PRD, 스토리보드, 개발사 협업]
    evidence_projects: [ClassCanvas, AIDT, AI_Trend_Lab]

  - name: "직접 구현 (바이브코딩)"
    tags: [Next.js, React, Firebase, Vercel, Gemini API, Claude API, Cursor]
    evidence_projects: [AI_Trend_Lab]

tools:
  planning: [Figma, Notion, Google Analytics]
  development: [Next.js, React, Firebase, Vercel, Cursor, GitHub]
  ai_tools: [Claude, Gemini API, GPT, Claude Code]
  research: [FGI, 체크리스트 설문, 정량/정성 분석]

---

## [SECTION: PROJECTS]
# type: project_list
# structure: 각 프로젝트는 5단계 프레임으로 구성
#   1. context     — 현황 분석 (왜 이 문제가 중요한가)
#   2. problem     — 문제 정의 (데이터로 특정된 핵심 문제)
#   3. strategy    — 전략 수립 (어떤 접근을 선택했고 왜인가)
#   4. execution   — 실행 (구체적으로 무엇을 만들었는가)
#   5. impact      — 비즈니스 가치 증명 (숫자로 증명되는 결과)

---

### [PROJECT: ClassCanvas]
# project_id: ClassCanvas
# priority: 1 (메인 프로젝트)
# type: 서비스 기획 / UX 설계 / 데이터 기반 전략

title: "클래스캔버스 서비스 개편 기획"
subtitle: "교과서 연계 쌍방향 수업 자료 1,976건을 설계해 플랫폼 활용률을 끌어올리다"
period: "2025.01 ~ 2025.09 (1차 오픈 4월 / 개편 오픈 9월)"
org: "YBM AI Lab"
role: "메인 기획 담당 — 화면 기획서, 유저 플로우, 자료 구성 가이드, 편집팀 교육, 외부 개발사(블루가) 협업"
url: "https://www.ybmcloud.com/classcanvas.html"
image_hero: "[IMAGE: 클래스캔버스 서비스 화면 — 내 보관함 + YBM 자료 가져오기 모달]"

#### 1. Context — 현황 분석
context: |
  에듀테크 플랫폼 클래스캔버스(기반: Aspen Class)는 퀴즈 제작·쌍방향 수업·QR 공유 등
  교사가 원하는 기능을 이미 보유하고 있었다. 문제는 기능이 아니었다.

  **사용 행태 데이터 분석 결과** (활성 사용자 16,278명):
  - Y클라우드 교과서 자료 전체 조회의 78%가 영어 과목 집중
  - 초등 영어 교사 교과서 자료 사용률 87.4% / 중등 80.2% / 고등 89.4%
  - 수학·음악·체육·보건 등 비영어 과목도 수천 건 조회 → 클래스캔버스 연계 자료 전무

  **2024년 9월 Y클라우드 사용자 FGI (약 70명)**:
  - 쌍방향 수업 기능 존재 자체를 모르는 교사 다수
  - "수업 준비할 시간이 없어 처음부터 자료를 만드는 건 불가능하다" 반복

image_data_chart: "[IMAGE: Y클라우드 과목별 교과서 자료 조회 비교 차트]"

#### 2. Problem — 문제 정의
problem:
  core: "기능은 있었다. 콘텐츠가 없었다."
  specifics:
    - "교사는 빈 도구만 받은 상태 → 수업 자료를 처음부터 직접 만들어야 하는 진입 장벽"
    - "영어에만 집중된 자료 구성 → 수학·음악 교사는 플랫폼 이탈"
    - "쌍방향 기능 발견성(Discoverability) 제로 → 기능 활용률 사실상 0"

#### 3. Strategy — 전략 수립
strategy:
  decision: "콘텐츠를 먼저 채운다. 영어만이 아닌 다과목 동시 구축."
  rationale: |
    사용 행태 데이터는 수학(조회량 2위, 중등 기준 78.1회/인)과 음악(비영어 과목 최고 사용률)에도
    무시할 수 없는 수요가 있음을 보여줬다.
    영어만 구축할 경우 수학·음악 교사의 이탈을 막을 유인이 없다는 판단 아래
    다과목 동시 구축을 채택했다.
  alternatives_rejected:
    - "영어 집중 전략 → 수학·음악 교사 이탈 위험 높음"
    - "기능 개선만 → 콘텐츠 없으면 재방문 유인 없음"

#### 4. Execution — 실행
execution:
  deliverables:
    - name: "'YBM 자료 가져오기' 유저 플로우 설계"
      detail: |
        탐색 동선: 학교급 → 과목 → 대단원/중단원 순 필터링
        (교사의 실제 수업 준비 사고 순서 반영)
        기술 제약 반영: 과목 수 유동적 → 고정 탭 불가 → 개발사(블루가)와 협의해
        스와이프/이동 버튼 방식 채택
        선택 → 카운팅 안내 → 보관함 추가 → 완료 토스트 알럿 전체 플로우 설계
        반응형 레이아웃: 최대 w1920 ~ 최소 w1024 기준

    - name: "자료 품질 기준 설계 + 편집팀 교육"
      detail: |
        단순 PPT가 아닌 쌍방향 수업 자료로 제작되도록 품질 가이드 수립
        초·중·고 전 학교급, 영어·수학·음악·체육·실과·보건·한문 다과목 커버
        편집팀 직접 교육 수행

    - name: "편집창 UX 개선"
      detail: "퀴즈 템플릿·YBM 자료·갤러리 접근성 개선, 저장 버튼 UI 추가, OX 퀴즈 가독성 개선, QR 공유 기능 추가"

    - name: "폴더 시스템 도입"
      detail: "폴더 생성·이동·삭제 기능, 최대 12개 폴더, 반응형 팝업창 설계"

    - name: "외부 개발사 협업 (기획서 버전 관리)"
      detail: "v1.0 → v1.2 → v2.0 → v2.1 → v2.2 → v2.3 (기술 제약 확인 → 기획 수정 → 재전달 반복)"

  content_built:
    # type: table_data
    - subject: "수학 (초등 3~6학년)"
      count: 942
    - subject: "음악 (초·중·고)"
      count: 371
    - subject: "체육 (초·중·고)"
      count: 311
    - subject: "영어 (초·중·고)"
      count: 195
    - subject: "실과·한문·보건"
      count: 157
    - subject: "합계"
      count: 1976

image_spec: "[IMAGE: 화면 기획서 버전 목차 캡처]"
image_folder: "[IMAGE: 폴더 시스템 또는 편집창 메뉴 개선 기획서]"

#### 5. Impact — 비즈니스 가치 증명
impact:
  summary: "별도 마케팅 없이 서비스 가치만으로 신학기 최고치 달성"
  metrics:
    # type: highlight_cards (3개 핵심 수치만 노출 / 상세 데이터는 raw_data 참조)
    - metric: "참여율 87.32%"
      context: "신학기 3월 최고치. Google Analytics 양호 기준(63%) 대비 +24%p"
      significance: "별도 마케팅 없이 서비스 가치만으로 달성"

    - metric: "6개월 연속 78%+ 유지"
      context: "개편 직후(2025.10)부터 2026.03까지 단 한 달도 기준 이하로 떨어지지 않음"
      significance: "일회성 유입이 아닌 반복 사용 구조가 작동함을 증명"

    - metric: "방학(1월) 평균 참여 시간 6분 47초 — 연중 최고"
      context: "활성 사용자 수는 방학 중 감소했으나 1인당 사용 밀도는 최고치"
      significance: "코어 유저층이 형성되어 있음을 검증하는 지표"

  benchmark: "Google Analytics 기준 양호 참여율: 63% / 달성: 6개월 연속 78%+"

  # raw_data: 웹에서 '상세 데이터 보기' 토글 또는 모달로 월별 수치 노출 가능
  raw_data_monthly:
    - month: "2025.10 (개편 직후)" | active_users: 170 | engagement_rate: "80.39%" | avg_engagement_time: "4분 17초"
    - month: "2025.11"             | active_users: 132 | engagement_rate: "80.08%" | avg_engagement_time: "1분 49초"
    - month: "2025.12"             | active_users: 190 | engagement_rate: "78.24%" | avg_engagement_time: "3분 13초"
    - month: "2026.01 (방학)"      | active_users: 137 | engagement_rate: "78.21%" | avg_engagement_time: "6분 47초"
    - month: "2026.02"             | active_users: 175 | engagement_rate: "81.83%" | avg_engagement_time: "5분 59초"
    - month: "2026.03 (신학기)"    | active_users: 296 | engagement_rate: "87.32%" | avg_engagement_time: "2분 27초"

image_ga_chart: "[IMAGE: GA 참여율 추이 그래프 — 6개월 라인 차트]"

takeaway: |
  콘텐츠 공백이 플랫폼 이탈의 원인이었고, 콘텐츠 구축이 그 해결책이었음을 수치로 검증했다.
  기술 제약 확인 → 기획 수정 → 재전달의 반복 사이클(v1.0 → v2.3)을 통해
  기획서가 개발 과정에서 지속적으로 갱신되어야 하는 문서임을 실무로 체득했다.

---

### [PROJECT: AIDT]
# project_id: AIDT
# priority: 2 (메인 프로젝트)
# type: 대규모 사용자 리서치 / 품질관리 체계 설계 / 멀티 스테이크홀더 협업

title: "AI 디지털교과서 — 사용자 리서치 기반 서비스 개선 기획"
subtitle: "229명 교사의 목소리를 데이터로 정리하고, 설계안으로 만들어 개발사에 전달하다"
period: "2024.05 ~ 현재"
org: "YBM AI Lab"
role: "FGI 설계·수행·분석, 품질관리 체계 설계, 개선안 기획 및 개발사 커뮤니케이션"
product_description: |
  LKT 기반 학습진단, AI 보조교사(실시간 수업 모니터링), AI 튜터(자기주도 학습),
  음성인식 기반 말하기 연습 탑재 클라우드 기반 교육 플랫폼
  대상: 초·중·고 영어·수학 전 과목 / 검정 심사 30개+ 항목

#### 1. Context — 현황 분석
context: |
  YBM이 교육부 검정 심사에 AI 디지털교과서를 출원했다.
  두 가지 과제가 동시에 존재했다:
  (1) 30개 이상 검정 심사 항목 통과
  (2) 실제 교사가 수업 현장에서 어떻게 받아들이는지 사전 파악 후 제품 반영

#### 2. Problem — 문제 정의
problem:
  core: "개발사는 기술 스펙을 충족했지만, 교사가 현장에서 실제로 쓸 수 있는지는 검증되지 않았다."
  specifics:
    - "단순 만족도 조사로는 '문제가 콘텐츠에 있는지, 인터페이스에 있는지' 구별 불가"
    - "복수 개발사가 각자 다른 방식으로 문서 작성 → 심사 기준 불일치"
    - "품질관리 체계 부재 → 장기 운영 가능성 불투명"

#### 3. Strategy — 전략 수립
strategy:
  decision: "내용(콘텐츠)과 기능(인터페이스)을 분리한 FGI 설계로 문제 원인을 특정한다."
  rationale: |
    같은 모니터링 기능에 대해서도
    "제공되는 정보가 수업 준비에 도움이 되는가"(내용)와
    "데이터 표시 형태가 이해하기 쉬운가"(기능)를 따로 물어야
    원인을 특정하고 개선안을 구체화할 수 있다.
  framework: "평가 영역: 내용적 측면 / 기능적 측면 × 만족도 / 필요성 2×2 구조"

#### 4. Execution — 실행
execution:

  fgi_1:
    label: "1차 FGI (2024.05 / 검정 심사 전)"
    target: "전국 6개 지역 현직 초등교사 157명 (영어 77명 / 수학 80명)"
    method: "지역별 소그룹 면접 (전국 순회)"
    structure: "5개 영역 × 내용/기능 2개 측면"
    key_findings:
      - finding: "수업 화면 적절성 최하위"
        data: "긍정응답률 59.9% (영어 42%)"
        root_cause: "태블릿PC 비율 33.8%인데 최적화 미흡"
      - finding: "모니터링 기능 인지 실패"
        data: "사용 편의성 긍정응답률 32.4% (전체 최하위)"
        root_cause: "기능이 다른 탭에 숨어있어 존재 자체를 모름"
      - finding: "학생 간 상호작용 부재"
        data: "긍정응답률 29.4% (수학 23.8%)"
        root_cause: "영어는 협업 활동 존재, 수학은 전무"
      - finding: "수업 중 학생 활동 모니터링 기능 필요"
        data: "157명 중 150명 필요하다고 응답"
        root_cause: "핵심 개선 우선순위 근거로 활용"
    output: |
      FGI 데이터 기반 "초등 AIDT 개선 제안서" 작성 → 개발사(에누마) 전달
      예시 1: 수업안 재구성 기능 → 아이콘을 [수업안 만들기] 텍스트 버튼으로 변경, 저장 조건 설계, 복사·검색·공유 3종 추가 설계
      예시 2: 수학 학생-학생 상호작용 → 곱셈 빙고·분수 국기 활동 등 모둠 활동 6종 규칙·진행방식·디지털 구현 형태까지 직접 설계
      우선순위 분류: [요청] 제출 전 반영 / [검토] 제출 후 수정

  fgi_2:
    label: "2차 FGI (2025.05 / 운영 단계)"
    target: "초·중학교 교사 72명 (초등 영어·수학 / 중학 영어·수학)"
    method: "소그룹 간담회"
    improvements_from_fgi_1:
      - change: "평가 영역 5개 → 6개, 총 50개+ 문항으로 확대"
        reason: "1차에서 '수업 이후 과정'과 '학생 관점' 데이터가 부족했음"
      - change: "'자유 의견' 중 '기능 제안' 항목을 별도 컬럼으로 분리"
        reason: "1차에서 정성 의견이 미분류 상태로 섞여 재분류에 과도한 시간 소요"
    key_findings:
      - "초등 영어: AI 보조교사 모니터링 긍정응답률 63%, 학생 개별 응답 실시간 확인 여전히 어려움"
      - "중등 영어: 추가 활동 탐색 효율성 긍정응답률 65%, 문항 수·소요시간·난이도 표시 요청"
      - "공통: 교사 판서가 학생 화면에 실시간 공유되지 않아 종이를 준비해야 하는 아이러니"

  quality_management:
    label: "서비스 품질관리 체계 직접 설계 (10-3장)"
    detail: |
      검정 심사 30개 항목 중 '품질관리' 영역(10-3장)을 처음부터 직접 작성.
      핵심 판단: 시스템 품질관리(플랫폼)와 콘텐츠 품질관리(교과서)를 분리
      정의한 품질 지표:
        - 시스템 가용률 99.5% 이상
        - 평균 응답속도 3초 이내
        - 콘텐츠 오류율 0.1% 이하
        - 사용자 피드백 반영률 80% 이상
      이슈 등급(Critical/Major/Minor), 조직·역할 분장, 피드백 수렴 체계까지 포함

  verification_management:
    label: "자체기술검증결과서 전체 관리 (30개+ 항목)"
    detail: |
      복수 개발사 초안 전 항목 검토·수정·보완
      A사는 그래프로만, B사는 텍스트로만 서술 → 서술 구조와 증빙 형식 통일
      심사위원이 일관된 기준으로 평가할 수 있도록 표준화

  accessibility:
    label: "접근성 테스트 기획·수행"
    detail: |
      시각·청각·운동·인지 장애 유형별 테스트 항목 설계·수행
      KWCAG 2.1 기준 대체텍스트 작성 기준 수립 → 실제 콘텐츠 적용
      결과를 각 개발사에 전달해 제품 개선 반영

image_fgi_doc: "[IMAGE: FGI 체크리스트 실제 문서 — 영역 구조 보이는 페이지]"
image_proposal: "[IMAGE: 개선 제안서 실제 문서 캡처 — 메뉴명 변경 또는 수업안 재구성 개선안]"

#### 5. Impact — 비즈니스 가치 증명
impact:
  - "AI 디지털교과서 교육부 검정 심사 통과에 기여"
  - "총 229명 교사 FGI 기획·수행·분석 완료 (1차 157명 + 2차 72명)"
  - "30개+ 심사 항목 자체기술검증결과서 품질 일관성 확보"
  - "품질관리 체계 처음부터 설계 → 운영 가능 수준 구축"
  - "데이터 기반 개선 제안서 작성 및 개발사 전달"

takeaway: |
  사용자 리서치의 품질은 질문 설계에서 결정된다.
  내용/기능 축을 분리한 구조 덕분에 "모니터링 기능이 다른 탭에 숨어 있어
  존재 자체를 인지하지 못한다"는 근본 원인을 특정할 수 있었다.
  개선 제안은 "고쳐주세요"가 아니라 "이렇게, 이 이유로"의 형식이어야
  개발사가 설계를 변경한다. 데이터 → 인사이트 → 구체적 설계안 → 개발사 전달의
  기획 사이클을 반복 실행으로 확립했다.

---

### [PROJECT: AI_Trend_Lab]
# project_id: AI_Trend_Lab
# priority: 3 (메인 프로젝트)
# type: 자발적 기획 + 1인 풀스택 개발 / 사내 AX 전환

title: "AI Trend Lab — 사내 AI 트렌드 아카이브 플랫폼"
subtitle: "구글 시트 한계를 발견하고, 직접 서비스로 만들어 팀 정식 프로젝트로 승격시키다"
period: "2025.11 ~ 현재 (운영 및 고도화 중)"
org: "YBM AI Lab"
role: "기획 + 개발 (1인 프로젝트)"
tech_stack:
  framework: "Next.js, React"
  backend: "Firebase"
  deployment: "Vercel"
  ai_api: "Gemini API, Claude API (Anthropic)"
  dev_method: "바이브코딩 (Cursor + Claude + Gemini)"
url: "https://ai-trend-lab.vercel.app/"

#### 1. Context — 현황 분석
context: |
  팀에서 매일 아침 구글 시트에 AI 뉴스 링크와 설명을 수기로 기록하며 트렌드를 조사.
  데이터가 쌓일수록 세 가지 문제가 선명해졌다:
  (1) 탐색·검색 한계: 행이 늘어날수록 원하는 정보 찾기 불가 (한 달 전 논문 찾으려면 무한 스크롤)
  (2) 트렌드 파악 불가: 개별 뉴스는 기록되지만 "지난 3개월간 LLM 분야 흐름" 파악 불가
  (3) AI 리터러시 편차: 팀원마다 관심 분야·지식 수준 달라 전체 공유 구조 없음

#### 2. Problem — 문제 정의
problem:
  core: "팀의 AI 지식 자산이 구글 시트에 갇혀 검색도 분석도 공유도 안 된다."
  specifics:
    - "스크롤 탐색 구조 → 과거 정보 재활용 불가"
    - "스냅샷 기록 → 시계열 트렌드 파악 불가"
    - "개인 북마크 수준 → 팀 공유 인프라 없음"

#### 3. Strategy — 전략 수립
strategy:
  decision: "구글 시트를 대체할 사내 플랫폼을 직접 기획·개발한다."
  rationale: |
    외부 도구 도입도 검토했으나, 사내 AI 뉴스 특성에 맞는
    평가 기준 설계·보고서 자동화·트렌드 추적 기능을 갖춘 기성 도구가 없었다.
    직접 구축하는 방식이 요구 사항 충족과 속도 양면에서 최적 경로라고 판단했다.
  key_design_decisions:
    - situation: "뉴스 자동 크롤링 시도 → 사이트 차단으로 실패"
      choice: "수동 URL 입력 + AI 자동 구조화의 절충안"
      reason: "완전 자동화보다 '사람이 판단하고 AI가 구조화'하는 분업이 품질 측면에서 적합"
    - situation: "월별 보고서가 독립적으로 존재"
      choice: "누적 시 선 그래프로 순위 변화 자동 추적"
      reason: "개별 스냅샷이 아닌 시계열 트렌드가 실제 의사결정에 유용"
    - situation: "단순 키워드 검색"
      choice: "유의어 처리 설계"
      reason: "AI 분야는 동일 기술에 한글명·영어명·약어 등 복수 명칭 공존 ('지피티' → 'GPT')"

#### 4. Execution — 실행
execution:
  features:
    - name: "대시보드"
      detail: "분야별(LLM·이미지·영상·오디오·STT·코딩 등) 주목할 AI 서비스 한눈에 조망하는 메인 화면"

    - name: "AI 뉴스 아카이브 (현재 약 150건 축적)"
      detail: |
        URL 입력 → Gemini API가 자동으로 제목·날짜·한줄 요약·핵심 내용 3가지·인사이트 구조화
        → 사용자가 편집 후 게시
        유저 플로우 2분기:
          (1) 뉴스를 이미 아는 사용자 → URL 입력란 바로 입력
          (2) 어디서 뉴스를 찾을지 모르는 사용자 → 분류별 뉴스 사이트 목록 제공
        유의어 처리: '지피티' 검색 시 'GPT' 결과도 노출
        Claude 확장 프로그램 활용 뉴스 추가 자동화 파이프라인 구현 중

    - name: "순위 리포트 — 평가 기준 설계 + 보고서 자동화"
      detail: |
        평가 기준 설계: 관련 논문·벤치마크 사이트 리서치 후 영역별 기준 직접 수립
          - LLM: 지시이행, 코딩, 수학적 능력, 어려운 프롬프트 처리 등
          - 영상 생성: 역동성, 개체 유지력 등
        보고서 자동화: 관리자 페이지에서 벤치마크 데이터 붙여넣기 → AI가 정해진 양식으로 자동 생성
        트렌드 추적: 보고서 누적 시 모델별 순위 변화를 선 그래프로 자동 시각화
        (단발성 보고서 → 살아있는 트렌드 데이터로 확장)

    - name: "뉴스 리포트"
      detail: "주간/월간 단위 AI 뉴스 분석 리포트 정기 발행"

image_dashboard: "[IMAGE: AI Trend Lab 메인 화면 — 대시보드 또는 뉴스 아카이브 화면]"
image_rank_chart: "[IMAGE: 순위 리포트 화면 — 선 그래프로 모델별 순위 변화 추적]"

#### 5. Impact — 비즈니스 가치 증명
impact:
  - "자발적으로 기획·개발한 프로젝트 → 팀 정식 프로젝트 승격"
  - "AI Lab 팀원 약 30명 대상 서비스 안정적 운영 중"
  - "뉴스 아카이브 약 150건 축적 / 뉴스·순위 리포트 정기 발행"
  - "전사 확대 배포 준비 중 (오류 수정 및 안정화 단계)"

technical_growth: |
  바이브코딩(Cursor + Claude + Gemini)으로 Next.js·React·Firebase·Vercel 기반
  풀스택 서비스를 기획부터 배포까지 1인 완성했다.
  DB 설계, API 연동, 배포 파이프라인 전 과정을 직접 수행한 경험은
  기술적 실현 가능성을 기획 단계에서 함께 판단할 수 있는 시야를 확보하는 기반이 됐다.
  클래스캔버스 기획에서 개발사 기술 제약 회신이 왔을 때
  레이아웃을 즉시 재설계할 수 있었던 것도 같은 맥락이다.

takeaway: |
  기획자가 직접 구현한 서비스가 팀 정식 프로젝트로 승격된 사례다.
  기술 제약을 이해하는 기획자는 "왜 안 되냐"가 아니라
  "어디까지 가능하고 어디서 절충할지"를 설계 단계에서 판단한다.

---

### [PROJECT: AI_PoC]
# project_id: AI_PoC
# priority: 4 (서포팅 프로젝트 / JD에 따라 메인으로 활용 가능)
# type: AI 기술 검증 / 도입 의사결정 지원 / 사내 AX 전환

title: "AI 기술 조사 & PoC — 사내 AI 도입 의사결정 지원"
subtitle: "단순 조사가 아닌 정량 벤치마킹으로 AI 기술 도입 판단 근거를 만들다"
period: "2024.05 ~ 현재 (상시)"
org: "YBM AI Lab"
role: "AI 기술 리서치, PoC 설계·수행, 정량/정성 분석, 보고서 작성"
methodology: "단순 조사 ✕ → 테스트 설계 → PoC 수행 → 정량/정성 분석 → 업무 적용 판단 → 보고"

poc_cases:

  - title: "AI TTS PoC"
    subject: "ElevenLabs, Gemini TTS 2.5, Supertone, Typecast, 클로바더빙 비교"
    method: |
      YBM 실제 콘텐츠(초등 ELT, 중등·고등 독해/듣기)에 직접 적용
      자체 평가 항목 20개+ 수립 (자모 발음, 숫자/기호 읽기, 끊어읽기, 감정 구현 등)
      API 요금 체계 분석 포함 종합 보고서 작성
    key_judgment: |
      일반적 TTS 성능이 아니라
      "초등 영어 교과서 지문을 읽었을 때 교육적으로 허용 가능한 수준인가"라는
      도메인 특화 기준으로 평가해야 의미 있는 결론이 나온다.
    outcome: "사내 콘텐츠 제작 프로세스에 AI TTS 도입 검토 근거 마련 → YCC(내부 AX 플랫폼) 기획으로 연결"

  - title: "AI 필기인식 기술 분석"
    subject: "셀바스AI, MyScript, 아이텍솔루션, Google, Mathpix 등 7개 업체"
    method: |
      한국어·영어·베트남어·일본어·수식 인식 성능 비교
      GPT를 활용해 고난이도 테스트 문장 설계 (겹받침, 유사 철자, 성조, 혼합 언어)
      정자체 / 보통 / 날림체 3단계 수행
      오류율 비교 분석기를 Claude 아티팩트로 직접 구현 → 테스트 데이터 시각화
    outcome: "디지털교과서 필기 기능 업체 선정 기초 자료 제공"

  - title: "생성형 AI 도구 종합 분석"
    subject: |
      LLM(ChatGPT, Gemini, Claude),
      이미지 생성(NanoBanana, Firefly, DALL-E 등),
      영상 생성(Veo3, Sora, Runway 등),
      AI 에이전트 빌더(Copilot Studio, Make, OpenAI Agent Builder) 등 전 카테고리
    method: "동일 프롬프트 기반 비교 평가"
    outcome: "사내 AI 리터러시 향상 가이드 및 YCC 이미지 생성 프로세스 기획으로 연결"

impact:
  - "에듀테크 도메인 특화 AI 기술 평가 기준 자체 수립"
  - "PoC → 도입 판단 → 실제 서비스 기획으로 연결되는 end-to-end 검증 사이클 확립"
  - "Claude 아티팩트로 분석 도구 직접 구현 → 팀 내 분석 효율 향상"

---

## [SECTION: KEY_METRICS]
# type: highlight_numbers
# purpose: 페이지 어디서든 재사용 가능한 핵심 수치 카드

metrics:
  - value: "229명"
    label: "FGI 참여 교사 수"
    detail: "2회 기획·수행 (1차 157명 / 2차 72명)"
    project: ClassCanvas, AIDT

  - value: "1,976건"
    label: "교과서 연계 수업 자료 구축"
    detail: "수학·음악·체육·영어·실과·보건·한문 다과목"
    project: ClassCanvas

  - value: "87.32%"
    label: "플랫폼 참여율 최고치"
    detail: "6개월 연속 78%+ 유지 (Google 기준 양호: 63%)"
    project: ClassCanvas

  - value: "30개+"
    label: "AIDT 검정 심사 항목 관리"
    detail: "교육부 검정 심사 통과 기여"
    project: AIDT

  - value: "20개+"
    label: "AI TTS 자체 평가 항목"
    detail: "도메인 특화 정량 벤치마킹 기준 수립"
    project: AI_PoC

  - value: "7개 업체"
    label: "필기인식 기술 비교 분석"
    detail: "정자체/보통/날림체 3단계, 5개 언어"
    project: AI_PoC

  - value: "v2.3"
    label: "화면 기획서 최종 버전"
    detail: "v1.0 → v2.3 반복 사이클로 기술 제약 반영"
    project: ClassCanvas

---

## [SECTION: ABOUT_POSITIONING]
# type: about_text
# purpose: "About Me" 섹션 또는 Hero 서브텍스트용. JD 타입에 따라 강조점 변환 가능.

default_positioning: |
  AI 서비스 기획자입니다.
  TTS·LLM·필기인식을 직접 PoC로 검증하고,
  229명 교사 FGI로 사용자 문제를 데이터로 정의하며,
  Next.js·Firebase로 사내 플랫폼을 1인 개발·배포했습니다.
  "기획자가 왜 이게 안 되냐"고 묻는 사람이 아니라,
  기술 제약을 이해하고 그 안에서 최선의 설계안을 찾는 기획자입니다.

# 아래는 JD 타입에 따라 강조점 변환 가이드 (AI에게 컨텍스트로 줄 것)
positioning_variants:
  - target: "컨설팅 펌 / AI 전략"
    emphasis: "PoC 설계, 정량 벤치마킹, 도입 판단 근거 수립, 데이터→전략→실행 사이클"
  - target: "에듀테크 / AI 서비스 기획"
    emphasis: "229명 FGI, 1,976건 콘텐츠 기획, 교육부 검정 심사, 플랫폼 참여율 87%"
  - target: "스타트업 / 빌더형 기획자"
    emphasis: "1인 풀스택 개발, 바이브코딩, 자발적 프로젝트 → 정식 프로젝트 승격"

---
# END OF FILE
# [AI USAGE NOTE]
# 이 파일을 포트폴리오 웹사이트 바이브코딩 컨텍스트로 사용할 때:
# 1. [IMAGE: ...] 플레이스홀더를 실제 이미지 경로로 교체하세요.
# 2. SECTION 주석은 컴포넌트 분리 기준입니다.
# 3. project_id는 라우팅 및 필터링에 활용하세요.
# 4. positioning_variants를 활용해 JD별 강조점을 동적으로 변환할 수 있습니다.
