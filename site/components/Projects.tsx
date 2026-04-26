/* eslint-disable react/no-unescaped-entities */
import FigmaImage from './FigmaImage'

const Tag = ({
  children,
  color = 'violet',
}: {
  children: React.ReactNode
  color?: 'violet' | 'cyan' | 'rose' | 'emerald'
}) => {
  const colors = {
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  }
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold border ${colors[color]}`}
    >
      {children}
    </span>
  )
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 text-violet-400 text-[0.73rem] font-bold uppercase tracking-widest mb-3.5">
    {children}
    <span className="flex-1 h-px bg-white/[0.08]" />
  </div>
)

const HQ = ({ children }: { children: React.ReactNode }) => (
  <div className="pl-4 border-l-2 border-violet-500 py-1 my-4 bg-violet-500/5 rounded-r-lg pr-4">
    <p className="text-sm text-white/75 leading-relaxed">{children}</p>
  </div>
)

const DataTable = ({
  headers,
  rows,
  highlightLast,
}: {
  headers: string[]
  rows: string[][]
  highlightLast?: boolean
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="text-left py-2 px-3 bg-white/[0.04] text-white/40 text-[0.72rem] uppercase tracking-wide font-semibold border-b border-white/[0.08] first:rounded-tl-lg last:rounded-tr-lg"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className={
              highlightLast && i === rows.length - 1
                ? 'bg-violet-500/10 text-violet-300 font-semibold'
                : 'hover:bg-white/[0.02]'
            }
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className="py-2.5 px-3 border-b border-white/[0.06] last-of-type:border-b-0 text-white/70 leading-snug"
                dangerouslySetInnerHTML={{ __html: cell }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ResultCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500" />
    {children}
  </div>
)

const Takeaway = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gradient-to-r from-violet-500/8 to-cyan-500/5 border border-violet-500/20 rounded-xl p-6 mt-6">
    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">Takeaway</p>
    <p className="text-sm text-white/75 leading-relaxed">{children}</p>
  </div>
)

// ── PROJECT 01 ──────────────────────────────────────────────────────
function Project01() {
  return (
    <div id="project-1" className="py-16 border-b border-white/[0.06]">
      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-violet-400 mb-2">
        MAIN PROJECT 01
      </p>
      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
        클래스캔버스 서비스 개편 기획
      </h3>
      <p className="text-white/45 italic mb-6 text-[0.93rem]">
        "교과서 연계 쌍방향 수업 자료 1,976건을 직접 설계해 플랫폼 활용률을 끌어올리다"
      </p>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-sm">
        {[
          ['기간', '2025.01 ~ 2025.09'],
          ['소속', 'YBM AI Lab'],
          ['역할', '메인 기획 담당'],
          ['URL', '<a href="https://www.ybmcloud.com/classcanvas.html" target="_blank" class="text-cyan-400 hover:opacity-70">ybmcloud.com ↗</a>'],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5">
            <span className="text-[0.68rem] uppercase tracking-wide text-white/25 font-bold">{k}</span>
            <span className="text-white/70" dangerouslySetInnerHTML={{ __html: v }} />
          </div>
        ))}
      </div>

      {/* Problem */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="md:col-span-3">
          <SectionLabel>Problem</SectionLabel>
          <p className="text-sm text-white/60 leading-relaxed mb-3">
            <strong className="text-white/80">기능은 있었다. 콘텐츠가 없었다.</strong> Aspen Class는 퀴즈 제작, 쌍방향 수업, QR 공유 등 교사가 원하는 기능을 이미 갖추고 있었다. 그러나 2025년 4월 1차 오픈 당시에는 YBM 교과서와 직접 연결된 수업 자료가 없었다.
          </p>
          <HQ>
            데이터가 가리키는 방향은 하나였다.
            <br />
            <strong>자료를 먼저 채워야 한다. 그리고 영어에만 집중하면 안 된다.</strong>
          </HQ>
          <p className="text-xs text-white/40 leading-relaxed">
            Y클라우드 활성 사용자 16,278명 분석: 영어 과목 조회 78% / 초등 영어 교사 사용률 87.4% / 2024.09 FGI(약 70명) — 대다수 교사가 쌍방향 기능 존재 자체를 모름
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Tag>데이터 기반 의사결정</Tag>
            <Tag color="cyan">FGI 분석</Tag>
            <Tag color="rose">에듀테크</Tag>
          </div>
        </div>
        <div className="md:col-span-2">
          <FigmaImage
            nodeId=""
            label="클래스캔버스 메인 화면 — 내 보관함 + YBM 자료 가져오기 모달"
            fallbackIcon="🖼"
            className="h-full min-h-[180px]"
          />
        </div>
      </div>

      {/* My Role */}
      <div className="mb-6">
        <SectionLabel>My Role</SectionLabel>
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <div>
              <p className="font-semibold text-white/85 mb-1">1. "YBM 자료 가져오기" 유저 플로우 설계</p>
              <p>학교급→과목→단원 순 필터링. 교사가 수업 준비 시 생각하는 순서를 그대로 반영. DB 업데이트에 따른 유동적 과목 수 대응을 위해 스와이프 UX 채택.</p>
            </div>
            <div>
              <p className="font-semibold text-white/85 mb-1">2. 자료 품질 설계 — "수업 도구"로 만들기</p>
              <p>교사 혼자 만들기 어려운 쌍방향 수업 자료 제공. 초·중·고 전 학교급, 7개 과목 편집팀 직접 교육.</p>
            </div>
            <div>
              <p className="font-semibold text-white/85 mb-1">3. 편집창 UX + 폴더 시스템</p>
              <p>퀴즈 템플릿·YBM 자료·갤러리 접근성 향상. 최대 12개 폴더, 반응형 팝업(w1920~w1024) 설계.</p>
            </div>
            <div>
              <p className="font-semibold text-white/85 mb-1">4. 외부 개발사 협업</p>
              <p>화면 기획서 v1.0→v2.3 버전 관리. 기술 제약 확인 시 기획 수정·재전달 반복 사이클.</p>
            </div>
          </div>
          <FigmaImage
            nodeId=""
            label="화면 기획서 — 학교급/과목/단원 필터링 구조"
            fallbackIcon="📐"
            className="min-h-[220px]"
          />
        </div>

        {/* 자료 현황 표 */}
        <DataTable
          headers={['과목', '자료 수']}
          rows={[
            ['수학 (초등 3~6학년)', '942건'],
            ['음악 (초·중·고)', '371건'],
            ['체육 (초·중·고)', '311건'],
            ['영어 (초·중·고)', '195건'],
            ['실과·한문·보건', '157건'],
            ['<strong>합계</strong>', '<strong>1,976건</strong>'],
          ]}
          highlightLast
        />
      </div>

      {/* Result */}
      <ResultCard>
        <SectionLabel>Result — GA 지표 (개편 후 6개월)</SectionLabel>
        <DataTable
          headers={['월', '활성 사용자', '참여율', '평균 참여 시간']}
          rows={[
            ['10월 (개편 직후)', '170명', '80.39%', '4분 17초'],
            ['11월', '132명', '80.08%', '1분 49초'],
            ['12월', '190명', '78.24%', '3분 13초'],
            ['1월 (방학)', '137명', '78.21%', '<strong>6분 47초 ↑</strong>'],
            ['2월', '175명', '81.83%', '5분 59초'],
            ['<strong>3월 (신학기)</strong>', '<strong>296명 (+74%)</strong>', '<strong>87.32%</strong>', '2분 27초'],
          ]}
          highlightLast
        />
        <div className="mt-4">
          <FigmaImage
            nodeId=""
            label="GA 참여율 추이 그래프 — 6개월 라인 차트"
            fallbackIcon="📊"
            className="min-h-[160px]"
          />
        </div>
      </ResultCard>

      <Takeaway>
        "도구를 주는 것"과 "도구+콘텐츠를 주는 것"의 차이를 수치로 확인한 프로젝트. 기술 제약을 기획에 반영하는 반복 사이클이 실무에서 어떻게 돌아가는지 직접 체득했다. 기획서는 v2.3까지 오며 살아있는 문서임을 몸으로 익혔다.
      </Takeaway>

      <div className="flex flex-wrap gap-2 mt-4">
        <Tag>화면 기획서 v2.3</Tag><Tag>유저 플로우</Tag>
        <Tag color="cyan">GA 분석</Tag><Tag color="cyan">외부 개발사 협업</Tag>
        <Tag color="rose">에듀테크</Tag><Tag color="emerald">1,976건 자료 구축</Tag>
      </div>
    </div>
  )
}

// ── PROJECT 02 ──────────────────────────────────────────────────────
function Project02() {
  return (
    <div id="project-2" className="py-16 border-b border-white/[0.06]">
      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-violet-400 mb-2">
        MAIN PROJECT 02
      </p>
      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
        AI 디지털교과서 — 사용자 리서치 기반 서비스 개선
      </h3>
      <p className="text-white/45 italic mb-6 text-[0.93rem]">
        "229명 교사의 목소리를 데이터로 정리하고, 설계안으로 만들어 개발사에 전달하다"
      </p>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-sm">
        {[
          ['기간', '2024.05 ~ 현재'],
          ['소속', 'YBM AI Lab'],
          ['역할', 'FGI 설계·수행·분석 / 품질관리 체계 설계 / 개선안 기획'],
          ['규모', '초·중·고 영어·수학 전 과목 / 검정 심사 30개+ 항목'],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5">
            <span className="text-[0.68rem] uppercase tracking-wide text-white/25 font-bold">{k}</span>
            <span className="text-white/70">{v}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="md:col-span-3">
          <SectionLabel>Problem</SectionLabel>
          <p className="text-sm text-white/60 leading-relaxed mb-3">
            YBM이 교육부 검정 심사에 AI 디지털교과서를 출원했다. LKT 기반 학습진단, AI 보조교사, AI 튜터, 음성인식 말하기 연습 등 탑재된 클라우드 기반 교육 플랫폼.
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            두 가지 과제가 동시에 있었다. ① 30개 이상 검정 심사 항목 통과 ② 실제 교사가 현장에서 이 서비스를 어떻게 받아들이는지 사전 파악 후 제품에 반영.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Tag>FGI 설계·수행</Tag><Tag color="cyan">품질관리 체계</Tag><Tag color="rose">교육부 검정</Tag>
          </div>
        </div>
        <div className="md:col-span-2">
          <FigmaImage nodeId="" label="4개 업무 축 인포그래픽" fallbackIcon="🗂" className="min-h-[180px]" />
        </div>
      </div>

      {/* FGI 결과 */}
      <div className="mb-6">
        <SectionLabel>1차 FGI (2024.05 — 초등교사 157명)</SectionLabel>
        <p className="text-xs text-white/40 leading-relaxed mb-4">
          전국 6개 지역 소그룹 면접 전국 순회. 질문지를 <strong className="text-white/60">내용 측면 / 기능 측면</strong>으로 분리 설계.
        </p>
        <DataTable
          headers={['발견', '데이터', '원인 분석']}
          rows={[
            ['수업 화면 적절성 최하위', '긍정응답률 59.9% (영어 42%)', '태블릿PC 비율 33.8%인데 최적화 미흡'],
            ['모니터링 기능 인지 실패', '사용 편의성 긍정응답률 32.4% (전체 최하위)', '기능이 다른 탭에 숨어있어 존재 자체를 모름'],
            ['학생 간 상호작용 부재', '긍정응답률 29.4% (수학 23.8%)', '영어는 협업 활동 존재, 수학은 전무'],
          ]}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <FigmaImage nodeId="" label="FGI 체크리스트 문서 — 내용/기능 영역 분리" fallbackIcon="📋" className="min-h-[180px]" />
          <FigmaImage nodeId="" label="개선 제안서 — 수업안 재구성 개선안" fallbackIcon="📄" className="min-h-[180px]" />
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>데이터 → 설계안 → 개발사 전달</SectionLabel>
        <div className="grid md:grid-cols-2 gap-5 text-sm text-white/60 leading-relaxed">
          <div>
            <p className="font-semibold text-white/80 mb-1.5">예시 1 — 수업안 재구성 기능 발견성</p>
            <p>아이콘을 [수업안 만들기] 텍스트 버튼으로 변경, 저장 조건 설계, 복사·검색·공유 기능 3종 추가 설계까지 전달.</p>
          </div>
          <div>
            <p className="font-semibold text-white/80 mb-1.5">예시 2 — 수학 학생-학생 상호작용 부재</p>
            <p>곱셈 빙고, 분수 국기 활동 등 모둠 활동 6종의 규칙·진행 방식·디지털 구현 형태까지 직접 설계해 전달.</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>2차 FGI (2025.05) + 품질관리 체계 설계</SectionLabel>
        <DataTable
          headers={['변경 사항', '이유']}
          rows={[
            ['평가 영역 5→6개, 50개+ 문항 확대', '1차에서 "수업 이후 과정"·"학생 관점" 데이터 부족'],
            ['"기능 제안" 항목을 별도 컬럼 분리', '1차 정성 의견 미분류로 재분류에 과도한 시간 소요'],
          ]}
        />
        <p className="text-xs text-white/40 leading-relaxed mt-4">
          <strong className="text-white/55">품질관리 체계(10-3장) 직접 설계:</strong> 시스템 가용률 99.5% 이상, 응답속도 3초 이내, 콘텐츠 오류율 0.1% 이하, 피드백 반영률 80% 이상. 이슈 등급 분류(Critical/Major/Minor), 조직·역할 분장까지.
        </p>
      </div>

      <ResultCard>
        <SectionLabel>Result</SectionLabel>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[['229명', '총 FGI 참여 교사'], ['30+', '검정 심사 항목 관리'], ['통과', '교육부 검정 심사']].map(([v, l]) => (
            <div key={l} className="text-center py-3 bg-white/[0.04] rounded-lg">
              <p className="text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{v}</p>
              <p className="text-[0.7rem] text-white/35 mt-1 leading-snug">{l}</p>
            </div>
          ))}
        </div>
      </ResultCard>

      <Takeaway>
        "사용자 리서치는 질문 설계가 전부다." 1차 FGI에서 내용/기능을 분리하지 않았다면, "모니터링 기능이 다른 탭에 숨어있어 존재 자체를 모른다"는 발견은 나오지 않았을 것이다. 개선 제안은 "고쳐주세요"가 아니라 "이렇게, 이 이유로"여야 개발사가 움직인다. 데이터→인사이트→구체적 설계안→개발사 전달의 기획 사이클을 체득했다.
      </Takeaway>

      <div className="flex flex-wrap gap-2 mt-4">
        <Tag>FGI 설계·수행</Tag><Tag>정량/정성 분석</Tag>
        <Tag color="cyan">품질관리 체계</Tag><Tag color="cyan">개발사 커뮤니케이션</Tag>
        <Tag color="rose">교육부 검정</Tag><Tag color="emerald">AI 디지털교과서</Tag>
      </div>
    </div>
  )
}

// ── PROJECT 03 ──────────────────────────────────────────────────────
function Project03() {
  return (
    <div id="project-3" className="py-16">
      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-violet-400 mb-2">
        MAIN PROJECT 03
      </p>
      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
        AI Trend Lab — 사내 AI 트렌드 아카이브 플랫폼
      </h3>
      <p className="text-white/45 italic mb-6 text-[0.93rem]">
        "구글 시트 한계를 발견하고, 직접 서비스로 만들어 팀 정식 프로젝트로 승격시키다"
      </p>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-sm">
        {[
          ['기간', '2025.11 ~ 현재'],
          ['역할', '기획 + 개발 (1인 프로젝트)'],
          ['스택', 'Next.js · React · Firebase · Vercel'],
          ['URL', '<a href="https://ai-trend-lab.vercel.app/" target="_blank" class="text-cyan-400 hover:opacity-70">ai-trend-lab.vercel.app ↗</a>'],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5">
            <span className="text-[0.68rem] uppercase tracking-wide text-white/25 font-bold">{k}</span>
            <span className="text-white/70" dangerouslySetInnerHTML={{ __html: v }} />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="md:col-span-2">
          <FigmaImage nodeId="" label="AI Trend Lab 메인 화면" fallbackIcon="🤖" className="h-full min-h-[200px]" />
        </div>
        <div className="md:col-span-3">
          <SectionLabel>Problem</SectionLabel>
          <p className="text-sm text-white/60 leading-relaxed mb-3">
            팀에서 매일 구글 시트에 AI 뉴스를 수기 기록. 세 가지 문제가 선명해졌다.
          </p>
          <div className="space-y-2 text-sm text-white/60">
            <p>① <strong className="text-white/80">탐색 한계</strong> — 행이 늘어날수록 원하는 정보 찾기 어려움</p>
            <p>② <strong className="text-white/80">트렌드 파악 불가</strong> — 흐름을 한눈에 볼 수 없음</p>
            <p>③ <strong className="text-white/80">AI 리터러시 편차</strong> — 팀 전체가 기술 흐름을 공유할 구조 없음</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Tag>바이브코딩</Tag><Tag color="cyan">Next.js · Firebase</Tag><Tag color="rose">1인 기획+개발</Tag>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>Solution — 주요 기능 4가지</SectionLabel>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          {[
            ['1. 대시보드', '분야별(LLM, 이미지, 영상, 오디오, STT, 코딩 등) 주목할 만한 AI 서비스를 한눈에 조망.'],
            ['2. AI 뉴스 아카이브 (~150건)', 'URL 입력 → Gemini API 자동 구조화 (제목·날짜·한줄 요약·핵심 내용 3가지·인사이트). 유의어 처리: "지피티" 검색 시 "GPT" 결과도 노출.'],
            ['3. 순위 리포트', '평가 기준 직접 수립 + 보고서 자동화. 보고서가 쌓일수록 모델별 순위 변화를 선 그래프로 추적 — 단발성 보고서를 살아있는 트렌드 데이터로 확장.'],
            ['4. 뉴스 리포트', '주간/월간 단위 AI 뉴스 분석 리포트 정기 발행. Claude 확장 프로그램으로 뉴스 추가 자동화 파이프라인 구현 중.'],
          ].map(([title, desc]) => (
            <div key={title as string} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <p className="text-sm font-semibold text-white/85 mb-1.5">{title}</p>
              <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FigmaImage nodeId="" label="뉴스 아카이브 화면 — URL → AI 자동 구조화" fallbackIcon="📰" className="min-h-[180px]" />
          <FigmaImage nodeId="" label="순위 리포트 — 모델별 순위 변화 선 그래프" fallbackIcon="📈" className="min-h-[180px]" />
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel>핵심 기획 판단들</SectionLabel>
        <DataTable
          headers={['상황', '선택', '이유']}
          rows={[
            ['자동 크롤링 → 사이트 차단으로 실패', '수동 URL 입력 + AI 자동 구조화', '"사람이 판단하고 AI가 구조화"하는 분업이 품질에 적합'],
            ['월별 보고서가 독립적으로 존재', '누적 시 선 그래프로 순위 변화 자동 추적', '스냅샷이 아닌 시계열 트렌드가 의사결정에 유용'],
            ['단순 키워드 검색', '유의어 처리 설계', 'AI 분야는 한글명·영어명·약어 등 복수 명칭 공존'],
          ]}
        />
      </div>

      <ResultCard>
        <SectionLabel>Result</SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {[['팀 정식', '프로젝트 승격'], ['~30명', 'AI Lab 팀원 대상 운영'], ['150건+', '뉴스 아카이브 축적']].map(([v, l]) => (
            <div key={l} className="text-center py-3 bg-white/[0.04] rounded-lg">
              <p className="text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{v}</p>
              <p className="text-[0.7rem] text-white/35 mt-1 leading-snug">{l}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40 leading-relaxed mt-3">전사 확대 배포 준비 중 (오류 수정 및 안정화 단계). 뉴스·순위 리포트 정기 발행 중.</p>
      </ResultCard>

      <Takeaway>
        바이브코딩(Cursor + Claude + Gemini)으로 Next.js, React, Firebase, Vercel 기반 풀스택 서비스를 기획부터 배포까지 1인으로 완성. DB 설계, API 연동, 배포 파이프라인까지 전 과정을 직접 다루며 기술적 실현 가능성을 기획 단계에서 함께 판단할 수 있는 시야를 갖게 됐다.
      </Takeaway>

      <div className="flex flex-wrap gap-2 mt-4">
        <Tag>Next.js · React</Tag><Tag>Firebase · Vercel</Tag>
        <Tag color="cyan">Gemini API</Tag><Tag color="cyan">바이브코딩</Tag>
        <Tag color="rose">1인 풀스택</Tag><Tag color="emerald">팀 정식 프로젝트 승격</Tag>
      </div>
    </div>
  )
}

// ── BONUS ────────────────────────────────────────────────────────────
function Bonus() {
  const pocs = [
    {
      title: '① AI TTS PoC',
      desc: 'ElevenLabs, Gemini TTS 2.5, Supertone, Typecast, 클로바더빙을 YBM 실제 콘텐츠에 적용. 자모 발음·끊어읽기 등 20개 이상 자체 평가 항목 수립 + API 요금 체계 분석.',
      result: '→ 사내 AI TTS 도입 검토 근거 마련 / YCC 기획으로 연결',
    },
    {
      title: '② AI 필기인식 기술 분석',
      desc: '셀바스AI, MyScript, Google, Mathpix 등 7개 업체 한국어·영어·수식 인식 성능 비교. Claude 아티팩트로 오류율 비교 분석기 직접 구현.',
      result: '→ 디지털교과서 필기 기능 업체 선정 기초 자료 제공',
    },
    {
      title: '③ 생성형 AI 도구 종합 분석',
      desc: 'LLM·이미지·영상·에이전트 빌더 수십 개를 동일 프롬프트로 비교 평가.',
      result: '→ 사내 AI 리터러시 가이드 / YCC 이미지 생성 프로세스 기획으로 이어짐',
    },
  ]

  return (
    <div className="py-16 border-t border-white/[0.06]">
      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-violet-400 mb-2">
        BONUS PROJECT
      </p>
      <h3 className="text-2xl font-black tracking-tight mb-2">AI 기술 조사 & PoC</h3>
      <p className="text-white/45 italic mb-8 text-[0.93rem]">
        단순 조사 ✕ → 테스트 설계 → PoC 수행 → 정량/정성 분석 → 업무 적용 판단 → 보고
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {pocs.map((p) => (
          <div key={p.title} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
            <p className="font-semibold text-white/85 text-sm mb-2">{p.title}</p>
            <p className="text-xs text-white/50 leading-relaxed mb-3">{p.desc}</p>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
              {p.result}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-8 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-5 h-0.5 bg-violet-400" />
            Main Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            기획하고, 검증하고, 만들었습니다
          </h2>
          <p className="text-white/45 mt-3 text-[0.95rem] max-w-xl leading-relaxed">
            사용자 데이터에서 출발해 실제 서비스로 연결한 3가지 프로젝트입니다.
          </p>
        </div>

        <Project01 />
        <Project02 />
        <Project03 />
        <Bonus />
      </div>
    </section>
  )
}
