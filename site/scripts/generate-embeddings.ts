/**
 * RAG 임베딩 생성 스크립트
 * 실행: npx tsx scripts/generate-embeddings.ts
 * (site/ 디렉토리에서 실행)
 */

import { GoogleGenAI } from '@google/genai'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

// .env.local 로드
try {
  const env = readFileSync(join(process.cwd(), '.env.local'), 'utf-8')
  for (const line of env.split('\n')) {
    const idx = line.indexOf('=')
    if (idx > 0) {
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      if (key) process.env[key] = val
    }
  }
} catch {}

// ─── 지식 청크 정의 ───────────────────────────────────────────────
const CHUNKS = [
  {
    id: 'profile-basic',
    title: '기본 프로필',
    content: `강유진(Yujin Kang) — YBM AI Lab 사원 (2024.05~재직중)
포지셔닝: AI 기술 문해력을 바탕으로 직접 빌드하고 증명하는 서비스 기획자
이메일: yujinkang1008@gmail.com / 소재지: 서울 노원구`,
  },
  {
    id: 'education-certs',
    title: '학력 및 자격',
    content: `학력:
- 연세대학교 대학원 석사, 국어국문학과, 4.21/4.3 (2021~2023)
  논문: 한국어 학습자의 비음과 파열음 인지 연구
- 덕성여자대학교 학사, 국어국문학과/부전공 독어독문학 (2015~2021)
- 독일 본(Bonn) 대학 교환학생 (2018~2019)
자격:
- AI POT(AI 프롬프트활용능력) 1급 (2026.02)
- TOEIC Speaking 160점 / Advanced Low (2026.01)
- 한국어교원자격증 2급 (2023.10)`,
  },
  {
    id: 'core-skills',
    title: '핵심 역량 및 스킬',
    content: `핵심 역량:
- 서비스 기획: 화면 기획서, 유저 플로우, PRD, KPI 설계
- 사용자 리서치: FGI 설계·수행, 정량/정성 분석, GA 분석
- AI/프롬프트: 프롬프트 엔지니어링, Conversation Flow 설계, GPTs 로직, AI API 기획, PoC
- 개발(바이브코딩): Next.js, React, Firebase, Vercel, Gemini API, Claude API
- 도구: Figma, Notion, GA, Cursor, GitHub, Adobe XD
스킬: PM, AI/AX 서비스 기획, UX/UI 기획, 스토리보드, 데이터 분석, 데이터 시각화`,
  },
  {
    id: 'classcanvas-problem',
    title: '클래스캔버스 — 문제 정의',
    content: `[프로젝트: 클래스캔버스 서비스 개편 기획 (2025.01~2025.09, YBM AI Lab)]
문제: 기능은 있었지만 YBM 교과서 연계 수업 자료가 없었음
데이터 분석 (Y클라우드 활성 사용자 16,278명):
- 영어 과목 조회 78% 집중
- 초등 영어 교사 사용률 87.4%, 중등 80.2%, 고등 89.4%
- 수학·음악·체육 등 비영어 과목도 수천 건 조회 — 연계 자료 전무
FGI (2024.09, 약 70명): 교사 대다수가 쌍방향 기능 존재조차 몰랐음
결론: 자료를 먼저 채워야 함, 영어에만 집중하면 안 됨`,
  },
  {
    id: 'classcanvas-role',
    title: '클래스캔버스 — 기획 역할',
    content: `[클래스캔버스 — 기획 역할]
① "YBM 자료 가져오기" 유저 플로우 설계
   - 탐색 동선: 학교급→과목→대단원/중단원 필터링
   - 기술 제약 반영: 과목 수 유동적 → 스와이프+이동버튼 UX 채택
   - 유저 플로우: 자료 선택→선택 카운팅→내 보관함 추가→완료 토스트
② 자료 품질 설계: 쌍방향 수업 자료 기준 수립, 편집팀 교육
③ 다과목 동시 구축 전략: 수학·음악·체육·실과·한문·보건 동시 구축
④ 화면 기획서 v1.0~v2.3 버전 관리, 외부 개발사(블루가) 협업
⑤ 편집창 UX 개선: 메뉴 재설계, 저장버튼, OX퀴즈 가독성, QR 공유 추가
⑥ 폴더 시스템: 최대 12개 폴더, 생성·이동·삭제 기능 설계`,
  },
  {
    id: 'classcanvas-assets',
    title: '클래스캔버스 — 자료 구축 현황',
    content: `[클래스캔버스 — 자료 구축 현황 (2026.04 기준)]
수학 (초등 3~6학년): 942건
음악 (초·중·고): 371건
체육 (초·중·고): 311건
영어 (초·중·고): 195건
실과·한문·보건: 157건
합계: 1,976건
전략: 영어 78% 집중 데이터에도 불구하고 다과목 동시 구축 — 수학·음악 교사도 핵심 유저층`,
  },
  {
    id: 'classcanvas-result',
    title: '클래스캔버스 — 성과 및 배움',
    content: `[클래스캔버스 — GA 성과 (2025.10~2026.03, 개편 후 6개월)]
10월(개편 직후): 활성 170명, 참여율 80.39%, 평균 4분 17초
11월: 132명, 80.08%, 1분 49초
12월: 190명, 78.24%, 3분 13초
1월(방학): 137명, 78.21%, 6분 47초 (연중 최고)
2월: 175명, 81.83%, 5분 59초
3월(신학기): 296명, 87.32% (최고), 2분 27초

핵심 지표:
- 6개월 연속 78%+ 참여율 (Google 기준 양호 수준 63% 상회)
- 방학 딥유즈: 137명이지만 조회 24.3회/인, 평균 6분 47초 — 코어 유저층 검증
- 신학기 3월: 활성 296명(+74%), 참여율 87.32% — 별도 마케팅 없이 달성

배움: "도구+콘텐츠"를 함께 줘야 활용됨. 기획서는 살아있는 문서 (v2.3까지)`,
  },
  {
    id: 'aidt-overview',
    title: 'AI 디지털교과서 — 프로젝트 개요',
    content: `[프로젝트: AI 디지털교과서 FGI 기반 서비스 개선 (2024.05~현재, YBM AI Lab)]
제품: LKT 기반 학습진단, AI 보조교사, AI 튜터, 음성인식 말하기 연습 탑재 클라우드 교육 플랫폼
과제: ①교육부 검정 심사 30+항목 통과 ②실제 교사 수용성 파악 및 개선
역할 4축: ①대규모 FGI ②품질관리 체계 설계 ③자체기술검증결과서 관리 ④접근성 테스트`,
  },
  {
    id: 'aidt-fgi1',
    title: 'AI 디지털교과서 — 1차 FGI',
    content: `[AI 디지털교과서 — 1차 FGI (2024.05, 검정 심사 전)]
대상: 전국 6개 지역 초등교사 157명 (영어 77명/수학 80명)
설문 구조: 5개 영역 × 내용/기능 2개 측면 (동일 기능에 내용적/기능적 측면 분리)

핵심 발견:
- 수업 화면 적절성: 긍정응답 59.9% (영어 42%) — 태블릿 33.8%인데 최적화 미흡
- 모니터링 기능 인지 실패: 긍정응답 32.4% — 다른 탭에 숨어 존재 자체를 모름
- 수학 학생 간 상호작용 부재: 긍정응답 29.4% (수학 23.8%) — 협업 활동 전무

개선 제안서 → 개발사(에누마) 전달:
- 아이콘→[수업안 만들기] 텍스트 버튼, 저장 조건·복사·검색·공유 기능 설계
- 수학 모둠 활동 6종 규칙·진행방식·디지털 구현 설계까지 전달
- 우선순위 분류: [요청] 제출 전 반영 / [검토] 제출 후 수정`,
  },
  {
    id: 'aidt-fgi2-quality',
    title: 'AI 디지털교과서 — 2차 FGI + 품질관리',
    content: `[AI 디지털교과서 — 2차 FGI (2025.05, 운영 단계)]
대상: 초·중학교 교사 72명 / 방식: 소그룹 간담회
변경: 평가 영역 5→6개+50+문항, 기능 제안 항목 별도 분리 (1차 반성)
핵심 발견: AI 보조교사 모니터링 63%, 추가활동 탐색 65%, 교사 판서 실시간 공유 안 됨

[품질관리 체계 설계 (검정 심사 10-3장)]
- 시스템과 콘텐츠 품질관리 분리 설계
- 지표: 가용률 99.5%+, 응답속도 3초 이내, 콘텐츠 오류율 0.1%이하
- 이슈 등급: Critical/Major/Minor, 조직 역할 분장, 피드백 수렴 체계

[자체기술검증결과서] 복수 개발사 초안 검토·수정, 서술 구조·증빙 형식 통일
[접근성] KWCAG 2.1 기준, 장애 유형별 테스트 설계·수행

성과: AI 디지털교과서 교육부 검정 심사 통과에 기여
배움: 리서치는 질문 설계가 전부. 개선 제안은 "이렇게, 이 이유로"여야 개발사가 움직임`,
  },
  {
    id: 'trend-lab-problem-features',
    title: 'AI Trend Lab — 문제와 기능',
    content: `[프로젝트: AI Trend Lab (2025.11~현재, YBM AI Lab, 기획+개발 1인)]
기술: Next.js, React, Firebase, Vercel, Gemini API
사이트: https://ai-trend-lab.vercel.app/

문제 — 구글 시트 수기 아카이브의 한계:
- 탐색·검색 어려움 (행 늘수록 스크롤)
- 트렌드 파악 불가 (시계열 흐름 안 보임)
- AI 리터러시 편차 (공유 구조 없음)

주요 기능:
① 대시보드: 분야별 주목 AI 서비스 조망
② AI 뉴스 아카이브 (150건+): URL 입력→Gemini 자동 구조화(제목/요약/핵심/인사이트), 유의어 처리
③ 순위 리포트: 벤치마크 붙여넣기→AI 자동 보고서, 모델별 순위 변화 선그래프 추적
④ 뉴스 리포트: 주간/월간 AI 뉴스 분석 정기 발행`,
  },
  {
    id: 'trend-lab-decisions-result',
    title: 'AI Trend Lab — 기획 판단 및 성과',
    content: `[AI Trend Lab — 핵심 기획 판단]
- 자동 크롤링 차단됨 → "사람이 판단, AI가 구조화" 분업으로 전환
- 월별 보고서가 독립적 → 누적 시 선그래프로 순위 변화 자동 추적
- 단순 키워드 → 유의어 처리 (동일 기술의 한글명·영어명·약어 공존)

성과:
- 자발 프로젝트 → 팀 정식 프로젝트 승격
- AI Lab 팀원 약 30명 안정 운영, 전사 확대 배포 준비 중
- 뉴스 아카이브 150건+, 순위·뉴스 리포트 정기 발행

배움: 바이브코딩(Cursor+Claude+Gemini)으로 DB 설계~배포 1인 완성. 기술 실현가능성을 기획 단계에서 함께 판단 가능해짐`,
  },
  {
    id: 'poc-tts',
    title: 'AI TTS PoC',
    content: `[AI TTS PoC (2024.05~현재, YBM AI Lab)]
비교 대상: ElevenLabs, Gemini TTS 2.5, Supertone, Typecast, 클로바더빙
적용 콘텐츠: YBM 실제 콘텐츠 (초·중·고 ELT, 독해/듣기)
자체 평가 항목 20+개: 자모 발음, 숫자/기호 읽기, 끊어읽기, 감정 구현, API 요금 체계
평가 기준: "초등 영어 교과서 지문을 교육적으로 허용 가능한 수준으로 읽는가" — 도메인 특화
결과: 사내 AI TTS 도입 검토 근거 마련, YCC(내부 AX 플랫폼) 기획으로 연결`,
  },
  {
    id: 'poc-handwriting-ai',
    title: 'AI 필기인식 비교 + 생성형 AI 도구 분석',
    content: `[AI 필기인식 기술 분석]
비교 대상: 셀바스AI, MyScript, 아이텍솔루션, Google, Mathpix 등 7개 업체
테스트: 한국어·영어·베트남어·일본어·수식, 정자체/보통/날림체 3단계
도구: GPT로 고난이도 문장 설계(겹받침·유사철자·혼합언어), Claude 아티팩트로 오류율 비교 분석기 직접 구현
결과: AIDT 필기 기능 업체 선정 기초 자료 제공

[생성형 AI 도구 종합 분석]
대상: LLM(ChatGPT·Gemini·Claude), 이미지 생성, 영상 생성, AI 에이전트 빌더 등 수십 개
방법: 동일 프롬프트 기반 비교 평가
결과: 사내 AI 리터러시 가이드, YCC 이미지 생성 프로세스 기획으로 이어짐`,
  },
  {
    id: 'skills-stats-activities',
    title: '역량 매핑·핵심 수치·활동 이력',
    content: `[핵심 수치]
- 229명: FGI 참여 교사 (2회 기획·수행)
- 1,976건: 클래스캔버스 교과서 연계 자료
- 30+: AIDT 검정 심사 항목 관리
- 87.32%: 신학기 최고 참여율
- 6개월 연속 78%+: 클래스캔버스 참여율
- 20+: AI TTS 자체 평가 항목
- 7개사: 필기인식 기술 비교

[교육·활동]
- KISA 웹테크 밋업데이: Cursor AI 바이브코딩, AI API·MCP 서비스 구현 (2025.08)
- 부스트코스 Connect On: AI 업무 자동화, 생성형 AI 기획서 (2025.09~12)
- YBM 사내 강사: AI 툴 활용 PPT 제작 강의 공식 선정 (2025.07)
- 타임교육 C&P 인턴: AI 챗봇 연구, 에듀테크 코리아 페어 발표, 우수 인턴 수상 (2023.08~09)
- 시원스쿨 인턴: SNS 콘텐츠 기획, 한국어 교재 3종 기획출간 (2023.10~2024.01)
- 국립국어원 학습자 말뭉치: 한국어 음성 DB 구축 연구원 (2021~2022)
- 독일 본(Bonn) 대학 교환학생 (2018.09~2019.07)`,
  },
]

// ─── 메인 ─────────────────────────────────────────────────────────
async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY가 없습니다. .env.local을 확인하세요.')
    process.exit(1)
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  console.log(`📚 ${CHUNKS.length}개 청크 임베딩 생성 시작...`)

  const chunksWithEmbeddings = []

  for (let i = 0; i < CHUNKS.length; i++) {
    const chunk = CHUNKS[i]
    process.stdout.write(`  [${i + 1}/${CHUNKS.length}] ${chunk.title}... `)

    const result = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: chunk.content,
    })

    const embedding = (result.embeddings?.[0]?.values ?? []) as number[]
    chunksWithEmbeddings.push({ ...chunk, embedding })
    console.log(`✅ (${embedding.length}d)`)

    // 레이트 리밋 대응
    await new Promise((r) => setTimeout(r, 300))
  }

  const output = {
    generated_at: new Date().toISOString(),
    model: 'text-embedding-004',
    chunks: chunksWithEmbeddings,
  }

  const outPath = join(process.cwd(), 'data/embeddings.json')
  writeFileSync(outPath, JSON.stringify(output, null, 2))
  console.log(`\n✅ 완료: ${outPath}`)
  console.log(`📊 총 ${chunksWithEmbeddings.length}개 청크, 벡터 차원: ${chunksWithEmbeddings[0].embedding.length}`)
}

main().catch(console.error)
