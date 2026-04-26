# 배포 가이드

이 저장소의 루트가 곧 Next.js 앱 루트입니다. Vercel에서 Root Directory를 따로 `site`로 지정하지 말고 기본값으로 둡니다.

---

## 1. 로컬 개발 환경

```bash
cp .env.local.example .env.local
# .env.local에 실제 키 값을 입력한 뒤
npm run dev
# http://localhost:3000
```

필요한 환경변수:

```bash
GEMINI_API_KEY=...
FIGMA_TOKEN=figd_...
NEXT_PUBLIC_FIGMA_FILE_KEY=...
```

---

## 2. GitHub에 올리기

```bash
git status
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/portfolio.git
git push -u origin main
```

이미 `origin` remote를 추가했다면 `git remote add origin ...` 대신 아래처럼 URL만 확인하거나 수정합니다.

```bash
git remote -v
git remote set-url origin https://github.com/<username>/portfolio.git
```

---

## 3. Vercel 배포

1. https://vercel.com 에서 New Project 선택
2. GitHub repo 선택
3. Framework Preset은 Next.js로 확인
4. Root Directory는 비워두거나 기본값 유지
5. Environment Variables 추가:
   - `GEMINI_API_KEY`: Google AI Studio에서 발급
   - `FIGMA_TOKEN`: Figma Settings > Personal access tokens에서 발급
   - `NEXT_PUBLIC_FIGMA_FILE_KEY`: Figma URL의 `/design/` 뒤 파일 키
6. Deploy 클릭

주의: 이 저장소에서는 `site` 폴더가 repo 루트가 아닙니다. Vercel Root Directory를 `site`로 설정하면 repo 안에서 `site` 폴더를 다시 찾게 되어 빌드가 실패할 수 있습니다.

---

## 4. Figma 이미지 연동

1. Figma에서 포트폴리오 이미지로 쓸 프레임 또는 컴포넌트를 우클릭한 뒤 Copy link
2. URL에서 `node-id` 값을 확인
   - 예: `https://www.figma.com/design/AbCdEfG.../파일명?node-id=1%3A234`
3. `node-id=1%3A234`를 `1-234` 형식으로 변환
4. `data/figma-config.ts`에서 해당 슬롯의 `nodeId` 값으로 입력

```typescript
{ id: 'cc-main', nodeId: '1-234', ... }
```

5. Vercel에 `NEXT_PUBLIC_FIGMA_FILE_KEY`와 `FIGMA_TOKEN` 환경변수 설정
6. Redeploy하면 이미지가 자동으로 표시됩니다.

Figma 수정 후 반영은 Vercel 대시보드에서 Redeploy를 누르는 방식이 가장 간단합니다. 자동화를 원하면 Vercel Deploy Hook을 만들고 Figma Webhook에 연결합니다. Hook의 Branch는 `main`으로 설정합니다.

---

## 5. AI 유진 인터뷰룸 API

현재 인터뷰룸 API는 Gemini API를 사용합니다.

관련 파일:

- `app/api/chat/route.ts`
- `lib/ai-context.ts`
- `data/ai-interview.ts`

나중에 정식 RAG로 확장할 경우 필요한 작업:

- 포트폴리오 문서 조각화
- `gemini-embedding-001` 기반 임베딩 생성
- 검색 결과를 `app/api/chat/route.ts`의 시스템 컨텍스트에 추가

---

## 6. 커스텀 도메인 연결

Vercel 대시보드 > 프로젝트 > Settings > Domains에서 도메인을 추가합니다.
