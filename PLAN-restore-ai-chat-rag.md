# PLAN: AI 인터뷰 챗봇 복구 + RAG 임베딩 생성

## 🎯 목표

사이트 제목이 "AI 인터뷰형 포트폴리오"인데, 정작 핵심 기능이 **둘 다 죽어 있다**:

1. `site/components/AIInterviewRoom.tsx` 17행: `const SHOW_CHAT = false` → **챗 패널이 화면에서 완전히 꺼져 있음**
2. `site/data/embeddings.json`: **chunks가 0개** (`generated_at`도 비어 있음) → RAG 검색이 항상 빈 문자열 반환, 챗봇이 포트폴리오 컨텍스트 없이 답변

목표: 챗 패널을 다시 켜고, 임베딩을 생성해 RAG가 실제로 동작하게 만든다.

## 📁 수정해야 할 정확한 파일

1. `site/components/AIInterviewRoom.tsx` — 17행 `SHOW_CHAT`, 260~340행 `ConsoleScene` 레이아웃
2. `site/data/embeddings.json` — 스크립트 실행으로 재생성 (직접 편집 금지)
3. `site/scripts/generate-embeddings.ts` — 25~235행 `CHUNKS` 내용 검수
4. `site/lib/rag.ts` — 방어 코드 확인 (35~37행에 이미 빈 청크 가드 있음)
5. `.env.local` — `GEMINI_API_KEY` 존재 확인 (dev 서버 기동 시 `.env.local` 로드가 확인됨)

## 🔧 단계별 작업 순서

### 1단계: 임베딩 생성

1. `site/.env.local`에 `GEMINI_API_KEY`가 있는지 확인한다 (`grep -c GEMINI_API_KEY site/.env.local` — 값 자체는 출력하지 말 것).
2. `site/scripts/generate-embeddings.ts`의 `CHUNKS`(25~235행)를 `portfolio_kangyujin_structured.md` 및 최근 수정된 `site/data/project-sections.ts`와 대조한다.
   - 특히 최근 커밋 "해커톤 완성"으로 추가된 **Dakon 해커톤**, **시원스쿨 인턴**, **YBM 사내 강사** 내용이 CHUNKS에 없거나 빈약하면 청크를 추가한다 (형식은 기존 청크와 동일: `id`, `title`, `content`).
3. `cd site && npm run generate-embeddings` 실행.
4. 검증: `node -e "const d=require('./data/embeddings.json'); console.log(d.chunks.length, d.chunks[0].embedding.length)"` → 청크 13개 이상, 벡터 차원 768 출력 확인.

### 2단계: 챗 패널 재활성화

1. `site/components/AIInterviewRoom.tsx` 17행을 `const SHOW_CHAT = true`로 변경.
2. `ConsoleScene`(260행~)의 grid 레이아웃이 SHOW_CHAT=true 분기(`lg:grid-cols-[220px_minmax(0,1fr)_300px]`)에서 깨지지 않는지 확인 — 이 분기는 코드에 이미 존재하므로 켜기만 하면 된다.
3. `npm run dev`로 실제 질문을 보내 스트리밍 응답이 도착하는지 확인.

### 3단계: 답변 품질 확인

1. 챗봇에 다음 3개 질문을 보내고 답변에 **구체 수치**가 포함되는지 확인 (RAG 동작의 실질 증거):
   - "클래스캔버스 성과를 수치로 말해줘" → 87.32%, 296명, 1,976건 등이 나와야 함
   - "FGI를 몇 명 대상으로 했나요?" → 157명/72명(합계 229명)이 나와야 함
   - "Dakon 해커톤에서 뭘 했나요?" → 해커톤 청크를 추가했다면 관련 내용이 나와야 함
2. 답변 스타일: 시스템 프롬프트(`site/lib/ai-context.ts`)가 개조식(불릿) 답변을 지시하는지 확인하고, 아니라면 "답변은 개조식(불릿 중심)으로, 긴 줄글 지양" 지침을 추가한다 (사용자 선호).

## ⚠️ 놓치기 쉬운 엣지 케이스

- **`rag.ts`와 `generate-embeddings.ts`의 임베딩 모델이 반드시 같아야 한다.** 현재 둘 다 `text-embedding-004`로 일치하지만, `DEPLOY.md`에는 `gemini-embedding-001`로 적혀 있어 혼동 소지가 있다. 모델을 바꾸려면 **양쪽 파일과 embeddings.json을 동시에** 재생성해야 한다. 쿼리와 문서를 다른 모델로 임베딩하면 에러 없이 조용히 무의미한 유사도가 나온다 — 가장 발견하기 어려운 버그.
- `embeddings.json`이 `require()`로 번들에 포함된다(`site/lib/rag.ts` 31행). **임베딩 재생성 후 dev 서버를 재시작해야 반영된다** (모듈 캐시).
- 스크립트는 청크당 300ms 대기가 있지만, 무료 티어 rate limit(분당 요청 제한)에 걸리면 특정 청크의 `embedding`이 빈 배열로 저장될 수 있다. 생성 후 `node -e "const d=require('./data/embeddings.json'); console.log(d.chunks.filter(c=>!c.embedding.length).map(c=>c.id))"` → `[]` 확인 필수.
- `cosineSimilarity`(rag.ts 16행)는 차원이 다른 벡터를 넣어도 에러 없이 잘못된 값을 반환한다. 모든 청크의 차원이 동일한지 위 검증으로 확인할 것.
- SHOW_CHAT을 켜면 **모바일 레이아웃**에서 챗 패널이 grid 기본 흐름으로 리스트 아래에 붙는다. `lg:` 프리픽스 미만 화면(375px 등)에서 화면이 세로로 무한정 길어지거나 챗이 화면 밖으로 밀리지 않는지 반드시 확인. 문제가 있으면 모바일에서는 챗을 하단 고정 토글(펼침/접힘)로 처리하는 것을 사용자에게 제안.
- `/api/chat`은 `GEMINI_API_KEY`가 없으면 500 텍스트를 반환하고, 클라이언트는 catch에서 "답변 생성에 실패했습니다."만 표시한다. 로컬에서 키 없이 테스트하면 RAG 문제와 API 키 문제를 구분할 수 없다 — 서버 터미널 로그(`Chat API error:`)를 함께 볼 것.
- Vercel 배포 환경에도 `GEMINI_API_KEY`가 설정되어 있는지 별도 확인 필요 (로컬에서 되고 프로덕션에서 안 되는 전형적 원인).

## ✅ 완료 기준 (직접 검증 방법)

1. `node -e "const d=require('./site/data/embeddings.json'); console.log(d.chunks.length)"` → **13 이상**
2. 사이트에서 카테고리 진입 시 우측에 "AI Interview — 자유롭게 질문하세요" 패널이 보임
3. "클래스캔버스 성과를 수치로 말해줘" 질문에 **87.32% 또는 296명 또는 1,976건** 중 하나 이상이 답변에 포함됨 (RAG 실동작 증거)
4. 375px 모바일 뷰포트에서 챗 패널이 접근 가능하고 레이아웃이 깨지지 않음
5. 응답이 타자 치듯 점진적으로 표시됨 (스트리밍 정상)
