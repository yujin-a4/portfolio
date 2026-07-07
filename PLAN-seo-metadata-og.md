# PLAN: SEO / 링크 미리보기(OG) / 파비콘 정비

## 🎯 목표

이 포트폴리오는 채용 담당자에게 **링크로 공유되는 것**이 존재 이유다. 그런데 현재:

- OG 이미지가 없음 → 카카오톡/슬랙/링크드인에 공유하면 썸네일 없는 밋밋한 링크로 보임
- `metadataBase` 미설정 → 상대 경로 OG 자산이 절대 URL로 해석되지 않음
- 파비콘이 Next.js 기본 아이콘(`site/app/favicon.ico`) 그대로
- robots/sitemap 없음

목표: 링크 공유 시 이름·직함·썸네일이 제대로 보이는 미리보기 카드를 만든다.

## 📁 수정해야 할 정확한 파일

1. `site/app/layout.tsx` — 4~13행 `metadata` 확장
2. `site/app/favicon.ico` — 교체
3. `site/app/opengraph-image.png` — **신규** (Next.js 파일 컨벤션: app 디렉토리에 이 이름으로 두면 자동으로 og:image 메타태그 생성)
4. `site/app/robots.ts`, `site/app/sitemap.ts` — 신규
5. (참고) `site/public/images/yj.png` — 프로필 사진으로 보임, OG 이미지 소재로 활용 가능

## 🔧 단계별 작업 순서

### 1단계: 배포 URL 확정

1. **사용자에게 실제 배포 도메인을 물어본다** (예: `https://xxx.vercel.app` 또는 커스텀 도메인). 이 값 없이는 metadataBase를 채울 수 없다. 아직 미배포라면 Vercel 프로젝트명 기준 예상 URL을 받아 적는다.

### 2단계: OG 이미지 제작 (1200×630)

1. `@napi-rs/canvas`(설치돼 있음)로 정적 PNG를 생성하는 일회성 스크립트 `site/scripts/generate-og.ts`를 만든다:
   - 캔버스 1200×630, 배경은 사이트 라이트 테마 톤(`#ffffff` 계열 + 파란 포인트 `#2563eb`)
   - 텍스트: "강유진" (큰 글씨) / "AI 서비스 기획자" / "AI 기술 문해력으로 직접 빌드하고 증명합니다"
   - 폰트: `site/public/PretendardVariable.ttf`를 `GlobalFonts.registerFromPath`로 등록해 사용 (시스템 폰트에 의존하면 한글이 깨질 수 있음)
   - 출력: `site/app/opengraph-image.png`
2. 스크립트 실행 후 생성된 PNG를 이미지 뷰어로 열어 한글이 정상 렌더링됐는지 눈으로 확인.
3. 같은 이미지를 `site/app/twitter-image.png`로 복사 (트위터 카드용 — Next가 자동 인식).

### 3단계: metadata 확장

`site/app/layout.tsx`의 metadata를 다음처럼 확장 (URL은 1단계에서 받은 값):

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://<실제-도메인>'),
  title: '강유진 | AI 인터뷰형 포트폴리오',
  description: 'AI 서비스 기획자 강유진의 경력, 교육, 프로젝트, 활동, 자격을 메뉴와 대화로 탐색하는 인터뷰형 포트폴리오입니다.',
  openGraph: {
    title: '강유진 | AI 인터뷰형 포트폴리오',
    description: '경력 · 교육 · 프로젝트 · 활동 · 자격증을 대화형 콘솔로 탐색',
    type: 'website',
    locale: 'ko_KR',
    siteName: '강유진 포트폴리오',
  },
  twitter: { card: 'summary_large_image' },
}
```

(og:image는 `opengraph-image.png` 파일 컨벤션이 자동 처리하므로 `images` 필드를 손으로 넣지 않는다 — 이중 선언 방지.)

### 4단계: 파비콘

1. `yj.png`(또는 파란 원 + "YJ" 텍스트 — Nav 로고와 동일 컨셉)를 32×32로 리사이즈해 `site/app/favicon.ico`를 교체한다. `@napi-rs/canvas`로 PNG를 만들고, ico 변환이 번거로우면 `site/app/icon.png`(Next 파일 컨벤션, PNG 그대로 인식)로 두고 기존 favicon.ico는 삭제한다.

### 5단계: robots + sitemap

1. `site/app/robots.ts`:
   ```ts
   import type { MetadataRoute } from 'next'
   export default function robots(): MetadataRoute.Robots {
     return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://<실제-도메인>/sitemap.xml' }
   }
   ```
2. `site/app/sitemap.ts`: 단일 페이지 앱이므로 `/` 하나만 반환.

## ⚠️ 놓치기 쉬운 엣지 케이스

- **이 프로젝트는 Next.js 16이다.** `site/AGENTS.md`가 명시하듯 학습 데이터와 API가 다를 수 있다 — metadata/파일 컨벤션 작업 전에 `site/node_modules/next/dist/docs/`에서 metadata 관련 문서를 먼저 읽을 것. (예: `opengraph-image` 컨벤션의 지원 확장자·크기 제한이 바뀌었을 수 있음)
- OG 이미지는 **8MB 초과 시 대부분의 크롤러가 무시**하고, 카카오톡은 캐시가 강력하다 — 배포 후 https://developers.kakao.com/tool/debugger/sharing 에서 캐시 초기화 후 테스트해야 반영이 보인다.
- `GlobalFonts.registerFromPath`는 variable font(ttf) 등록은 되지만 weight 지정 방식이 라이브러리 버전마다 다르다. 출력 PNG에서 글자 굵기가 이상하면 `ctx.font`에 등록 시 지정한 family 이름을 정확히 썼는지 확인.
- `opengraph-image.png`를 app 루트에 두면 **모든 라우트에 상속**된다. 이 앱은 단일 페이지이므로 문제없음 — 나중에 라우트가 늘어나도 그대로 두면 된다.
- 파비콘 교체 후 브라우저가 옛 파비콘을 캐시한다 — 시크릿 창이나 강력 새로고침으로 확인할 것. "안 바뀌었다"고 코드를 재수정하지 말 것.
- `twitter-image.png` 없이 `twitter.card`만 선언해도 OG 이미지로 폴백되는 크롤러가 많지만, 링크드인은 og:image만 본다 — 링크드인 Post Inspector(https://www.linkedin.com/post-inspector/)로 별도 확인.

## ✅ 완료 기준 (직접 검증 방법)

1. `npm run build && npm run start` 후 `curl -s http://localhost:3000 | grep -o '<meta[^>]*og:[^>]*>'` → `og:image`가 **절대 URL**로 출력됨
2. `http://localhost:3000/opengraph-image.png` 접속 시 1200×630 이미지가 열리고 한글이 깨지지 않음
3. `http://localhost:3000/robots.txt`, `/sitemap.xml`이 200으로 응답
4. 브라우저 탭에 새 파비콘(YJ)이 보임
5. 배포 후: 카카오톡 나에게 보내기로 링크 전송 → 이름·직함·썸네일이 있는 카드로 표시됨
