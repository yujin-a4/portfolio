# PLAN: 초대형 이미지 자산 최적화 (Git push 차단 해제 + 로딩 성능)

## 🎯 목표

`site/public/images/`가 현재 **161MB**이며, 그중 `activity/ppt/ybm_ppt_main.gif`가 **112MB**다.

- **GitHub는 100MB 초과 단일 파일의 push를 하드 블록한다** → 이 파일이 untracked 상태로 남아 있는 지금 상태에서 `git add . && git push`를 하면 **push가 실패한다.** (커밋에 한번 들어가면 히스토리에서 제거하는 작업까지 필요해지므로, 커밋 전에 반드시 해결해야 한다.)
- 첫 화면에서 112MB GIF를 로드하면 해당 페이지는 사실상 열리지 않는다.
- 목표: **커밋되는 이미지 총량을 15MB 이하로**, 개별 파일은 2MB 이하로 만든다.

## 📁 수정해야 할 정확한 파일

1. `site/public/images/activity/ppt/ybm_ppt_main.gif` (112MB) — 교체 대상
2. `site/public/images/activity/ppt/ybm_ppt1.png ~ ybm_ppt13.png` (합계 약 40MB) — 리사이즈/재인코딩 대상
3. `site/public/images/portfolio_2025.pdf` (4.5MB) — **코드 어디에서도 참조되지 않음** → 삭제 또는 의도 확인
4. `site/public/images/yj.png` (1.4MB) — **코드 어디에서도 참조되지 않음** → 삭제 또는 의도 확인
5. `site/data/project-sections.ts` — 559행 `headerImage: '/images/activity/ppt/ybm_ppt_main.gif'`, 573행 `images: Array.from({ length: 13 }, (_, i) => \`/images/activity/ppt/ybm_ppt${i + 1}.png\`)`
6. `site/components/RichProjectDetail.tsx` — 598~617행 (headerImage를 `<img>`로 렌더링하는 부분)

## 🔧 단계별 작업 순서

### 1단계: GIF 처리 (가장 중요)

**옵션 A (권장): 정적 대표 이미지로 교체**

1. ffmpeg가 있으면 첫 프레임 추출:
   ```bash
   ffmpeg -i site/public/images/activity/ppt/ybm_ppt_main.gif -frames:v 1 site/public/images/activity/ppt/ybm_ppt_main.png
   ```
   ffmpeg가 없으면: `ybm_ppt1.png`(이미 존재하는 첫 슬라이드)를 대표 이미지로 사용한다 — 새 파일 생성 불필요.
2. `site/data/project-sections.ts` 559행을 교체:
   ```ts
   headerImage: '/images/activity/ppt/ybm_ppt1.png',
   ```
   (2단계에서 이 PNG도 압축되므로 함께 가벼워진다)
3. `ybm_ppt_main.gif` 파일 삭제.

**옵션 B (움직임을 유지하고 싶을 때만): mp4 변환**

1. `ffmpeg -i ybm_ppt_main.gif -movflags faststart -pix_fmt yuv420p -vf "scale=1280:-2" -crf 28 ybm_ppt_main.mp4` (보통 1~3MB로 줄어든다)
2. `RichProjectDetail.tsx` 598~617행에서 headerImage가 `.mp4`로 끝나면 `<video autoPlay muted loop playsInline>`로 렌더링하도록 분기 추가.
3. ffmpeg가 없으면 옵션 B는 포기하고 옵션 A로 진행한다. **GIF 압축 시도(품질 낮추기)는 하지 말 것** — GIF 포맷 특성상 100MB→10MB 수준으로는 줄지 않는다.

### 2단계: PPT 슬라이드 PNG 13장 재인코딩

프로젝트에 이미 설치된 `@napi-rs/canvas`(devDependency)로 리사이즈 스크립트를 작성한다.
`site/scripts/compress-images.ts` 파일을 새로 만들고:

```ts
import { createCanvas, loadImage } from '@napi-rs/canvas'
import { readdirSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'

const DIR = join(process.cwd(), 'public/images/activity/ppt')
const MAX_W = 1600

async function main() {
  for (const f of readdirSync(DIR).filter((f) => f.endsWith('.png'))) {
    const p = join(DIR, f)
    const img = await loadImage(p)
    const scale = Math.min(1, MAX_W / img.width)
    const w = Math.round(img.width * scale)
    const h = Math.round(img.height * scale)
    const canvas = createCanvas(w, h)
    canvas.getContext('2d').drawImage(img, 0, 0, w, h)
    // 슬라이드는 사진이 아니라 도형/텍스트이므로 JPEG 품질 82면 충분
    const out = canvas.toBuffer('image/jpeg', 82)
    writeFileSync(p.replace(/\.png$/, '.jpg'), out)
    console.log(f, (statSync(p).size / 1e6).toFixed(1) + 'MB →', (out.length / 1e6).toFixed(1) + 'MB')
  }
}
main()
```

1. `cd site && npx tsx scripts/compress-images.ts` 실행.
2. 결과 `.jpg`가 모두 1MB 이하인지 확인. 아니면 품질을 75로 낮춰 재실행.
3. `site/data/project-sections.ts` 573행의 확장자를 변경:
   ```ts
   images: Array.from({ length: 13 }, (_, i) => `/images/activity/ppt/ybm_ppt${i + 1}.jpg`),
   ```
4. 원본 `.png` 13장 삭제.

### 3단계: 미참조 파일 정리

- `site/public/images/portfolio_2025.pdf` (4.5MB), `site/public/images/yj.png` (1.4MB)는 코드에서 참조되지 않는다.
- **삭제 전 반드시 사용자에게 물어볼 것** — PDF는 "이력서 다운로드" 링크로 쓸 계획일 수 있다. 사용자가 유지 결정 시 PDF는 예외로 둔다 (4.5MB는 push 가능).

### 4단계: 검증 및 재발 방지

1. `du -sh site/public/images` → 15MB 이하 확인.
2. `find site/public/images -size +2M` → 결과 없음(또는 사용자가 승인한 PDF만) 확인.
3. 리포지토리 루트 `.gitignore`에 이미 커밋 방지 규칙이 있는지 확인하고, 루트의 `image/` 폴더(untracked 원본 보관용으로 보임)가 커밋되지 않도록 `.gitignore`에 `image/` 추가 여부를 사용자에게 확인.

## ⚠️ 놓치기 쉬운 엣지 케이스

- **573행은 `Array.from`으로 경로를 동적 생성한다.** 단순 grep으로 `ybm_ppt3.png` 참조를 못 찾았다고 "미사용"으로 판단해 삭제하면 안 된다. 13장 모두 사용 중이다.
- `@napi-rs/canvas`의 `toBuffer('image/jpeg', 82)` — 품질 인자가 0~100 범위다 (0~1 아님). 라이브러리 버전에 따라 시그니처가 다를 수 있으니 출력 파일을 열어서 깨지지 않았는지 실제로 확인할 것.
- 투명 배경 PNG를 JPEG로 바꾸면 투명 영역이 **검정**으로 변한다. 변환 전 canvas를 흰색으로 채우는 코드(`ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h)`)를 `drawImage` 앞에 넣을 것.
- Windows 셸에서 `${i + 1}` 백틱 문자열이 든 코드를 heredoc으로 만들면 이스케이프가 깨질 수 있다 → 파일은 에디터/Write 도구로 만들 것.
- 삭제 전 원본은 리포 밖(예: 루트의 `image/` 폴더나 별도 백업 폴더)에 보관돼 있는지 확인. 없으면 삭제 대신 이동을 먼저 제안할 것.
- dev 서버가 이미지 파일을 잠그고 있을 수 있다(Windows). 삭제 실패 시 dev 서버 종료 후 재시도.

## ✅ 완료 기준 (직접 검증 방법)

1. `du -sh site/public/images` 출력이 **15MB 이하**
2. `git add . && git push` 시뮬레이션: `find . -path ./node_modules -prune -o -type f -size +50M -print` → 결과 없음
3. `npm run dev` 후 활동 탭 → "YBM 사내 강사" 항목: 헤더 이미지와 슬라이드 13장이 모두 정상 표시되고, 브라우저 Network 탭에서 이미지 각각이 **1MB 이하**로 로드됨
4. 깨진 이미지(404) 없음 — 브라우저 콘솔에 이미지 로드 에러 0건
