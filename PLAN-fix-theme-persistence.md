# PLAN: 다크모드 토글 영속성 버그 수정

## 🎯 목표

`site/app/layout.tsx` 15~21행의 초기화 스크립트가 **페이지를 열 때마다 무조건 light를 강제 저장**한다:

```js
localStorage.setItem('portfolio_theme', 'light');
document.documentElement.setAttribute('data-theme', 'light');
```

그 결과: 사용자가 Nav의 다크모드 토글을 눌러도 **새로고침하면 항상 라이트로 리셋**된다. 토글 UI(`site/components/Nav.tsx`의 `ThemeToggle`)는 정상인데 저장이 무의미해지는 상태.

목표: 저장된 테마를 존중하되, 저장값이 없으면 light를 기본값으로 적용한다 (주석의 의도였던 "기본 light"는 유지).

## 📁 수정해야 할 정확한 파일

1. `site/app/layout.tsx` — 15~21행 `themeScript`
2. `site/app/globals.css` — `[data-theme='dark']` 변수 정의가 존재하고 완전한지 확인 (읽기만)
3. `site/components/Nav.tsx` — 10~49행 `ThemeToggle` (로직 확인, 수정 불필요 예상)

## 🔧 단계별 작업 순서

1. **먼저 다크모드가 시각적으로 멀쩡한지 확인한다.** 강제 light 스크립트는 "이전 캐시 무시"라는 주석과 함께 의도적으로 넣은 것이므로, 다크모드가 깨져 있어서 임시로 막았을 가능성이 있다.
   - `npm run dev` → 토글로 다크 전환 → 랜딩/허브/콘솔(각 카테고리)/이미지 확대 모달/챗 패널을 모두 다크로 훑는다.
   - `site/app/globals.css`에서 `data-theme='dark'`(또는 `[data-theme="dark"]`) 블록이 `--bg`, `--surface`, `--surface-2`, `--surface-3`, `--border`, `--border-2`, `--tx`, `--tx-2`, `--tx-3`, `--accent`, `--accent-dim`, `--nav-bg`, `--shadow-*`, `--cyan`, `--cyan-dim` 전부를 재정의하는지 대조한다. 빠진 변수가 있으면 다크 값 추가.
   - 인라인 스타일에 하드코딩된 색이 있는 곳: `AIInterviewRoom.tsx`의 `rgba(37,99,235,...)` (파란 계열 다수), `DetailPanel`의 `rgba(37,99,235,0.25)` 등 — 다크에서 대비가 무너지는지 눈으로 확인. 무너지면 해당 값을 CSS 변수로 승격.
2. 다크모드 표시가 정상이라고 판단되면 `layout.tsx`의 `themeScript`를 다음으로 교체:
   ```js
   const themeScript = `
   (function(){
     var t;
     try { t = localStorage.getItem('portfolio_theme'); } catch (e) {}
     if (t !== 'dark' && t !== 'light') t = 'light';
     document.documentElement.setAttribute('data-theme', t);
   })();
   `
   ```
   - `setItem` 호출을 제거한다 (저장은 토글이 담당).
   - 알 수 없는 값('auto', 옛 버전의 쓰레기 값 등)은 light로 정규화한다.
3. `Nav.tsx`의 `ThemeToggle`은 마운트 후 `data-theme`을 읽어 초기 상태를 잡으므로(13~15행) 수정 불필요. 단, 스크립트가 `<head>`에서 **hydration 전에** 실행되는 구조가 유지되는지 확인 (`dangerouslySetInnerHTML` 위치 변경 금지).
4. 다크모드가 실제로 **깨져 있다면**: 이 플랜의 범위를 "깨진 다크 스타일 수정 → 그 다음 themeScript 교체" 순서로 확장하고, 수정량이 크면 사용자에게 다크모드 유지/제거 여부를 먼저 물어본다 (제거 결정 시 토글 버튼도 함께 제거해야 일관됨).

## ⚠️ 놓치기 쉬운 엣지 케이스

- **FOUC(테마 깜빡임)**: 스크립트가 `<head>`의 inline `<script>`로 body 렌더 전에 실행되어야 다크 사용자가 새로고침할 때 흰 화면이 번쩍하지 않는다. 이 스크립트를 `useEffect`로 옮기면 안 된다.
- `localStorage`는 시크릿 모드/일부 브라우저 설정에서 접근 시 throw 할 수 있다 → `try/catch` 필수 (위 코드에 포함됨).
- `suppressHydrationWarning`이 `<html>`에 이미 있으므로 서버(light 기본)와 클라이언트(dark 적용) 불일치 경고는 억제된다 — 제거하지 말 것.
- 기존 방문자의 localStorage에는 강제 스크립트가 심어둔 `'light'`가 남아 있다. 이는 정상 동작(기본 light)과 구분되지 않으므로 마이그레이션 불필요 — 신경 쓰지 말 것.
- 이미지 확대 모달(`ImagePlaceholder.tsx` 70~93행)은 `rgba(0,0,0,0.93)` 고정 배경이라 다크/라이트 모두 문제없다 — 건드리지 말 것.

## ✅ 완료 기준 (직접 검증 방법)

1. 토글로 다크 전환 → **F5 새로고침 → 다크가 유지됨**
2. 토글로 라이트 전환 → 새로고침 → 라이트 유지됨
3. 시크릿 창(저장값 없음)에서 접속 → 라이트로 표시됨
4. 다크 상태에서 새로고침할 때 라이트 화면이 번쩍이는 현상(FOUC)이 없음
5. 다크 상태로 랜딩 → 허브 → 5개 카테고리 탭 → 이미지 확대까지 순회했을 때 읽을 수 없는 텍스트(배경과 같은 색)가 한 곳도 없음
