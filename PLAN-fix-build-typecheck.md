# PLAN: 빌드 타입 에러 수정 (최우선 — 배포 차단 중)

## 🎯 목표

`npx tsc --noEmit`과 `npm run build`가 에러 없이 통과하도록 만든다.
현재 아래 타입 에러 때문에 **`next build`가 실패하며, Vercel 배포가 불가능한 상태**다.

```
data/project-sections.ts(642,11): error TS2322:
Type '"3/4"' is not assignable to type '"16/9" | "4/3" | "3/2" | "1/1" | undefined'.
```

## 📁 수정해야 할 정확한 파일

1. `site/data/project-sections.ts`
   - 38행: `imageSlot?: { ... aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'; ... }`
   - 39행: `images?: { ... aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'; ... }[]`
   - (13행 근처에도 동일한 union 타입이 있는지 확인)
   - 642행: `aspectRatio: '3/4'` ← 이 값이 에러의 원인 (siwon-sns 섹션, `sns-result` 이미지 슬롯)
2. `site/components/ImagePlaceholder.tsx`
   - 8행: `aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'`
   - 16~21행: `ratioMap` 객체
3. `site/components/RichProjectDetail.tsx`
   - `ImagePlaceholder`에 aspectRatio를 넘기는 곳이 있으므로, 자체적으로 union 타입을 재선언한 곳이 있는지 grep으로 확인

## 🔧 단계별 작업 순서

1. `site/` 디렉토리에서 `npx tsc --noEmit`을 실행해 에러 전체 목록을 확보한다 (현재 확인된 것은 1건이지만 수정 후 재확인 필수).
2. **타입을 넓히는 방향으로 수정한다** (데이터를 고치는 게 아니라 타입에 `'3/4'`를 추가). 세로형 이미지(SNS 콘텐츠)이므로 `3/4` 비율이 의도된 값이다.
   - `site/components/ImagePlaceholder.tsx` 8행의 union에 `| '3/4'` 추가:
     ```ts
     aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | '3/4'
     ```
   - 같은 파일 `ratioMap`에 항목 추가 (padding-bottom = 세로/가로 × 100 = 4/3 × 100):
     ```ts
     const ratioMap = {
       '16/9': 'pb-[56.25%]',
       '4/3':  'pb-[75%]',
       '3/2':  'pb-[66.67%]',
       '1/1':  'pb-[100%]',
       '3/4':  'pb-[133.33%]',
     }
     ```
3. `site/data/project-sections.ts`의 38행, 39행(및 파일 내 다른 모든 동일 union — `grep -n "16/9" site/data/project-sections.ts`로 전수 확인)에 `| '3/4'` 추가.
4. `site/components/RichProjectDetail.tsx`에서 `grep -n "16/9' |" `로 union 재선언 여부 확인 후 있으면 동일하게 추가.
5. `npx tsc --noEmit` 재실행 → 에러 0개 확인.
6. `npm run build` 실행 → 빌드 성공 확인.
   - ⚠️ 만약 빌드 단계에서 ESLint 에러가 새로 나오면 그것도 함께 기록하고 수정한다 (단, `eslint-disable`로 덮지 말고 원인을 고친다).

## ⚠️ 놓치기 쉬운 엣지 케이스

- **Tailwind 임의 값 클래스는 JIT 스캔 대상이다.** `pb-[133.33%]`를 `ratioMap`에 문자열 리터럴로 넣으면 Tailwind 4가 감지하지만, 동적으로 문자열을 조립하면(`pb-[${x}%]`) 감지하지 못한다. 반드시 리터럴로 넣을 것.
- 동일한 aspectRatio union이 **최소 3곳**(ImagePlaceholder props, project-sections의 imageSlot, images 배열)에 중복 선언되어 있다. 한 곳만 고치면 다른 곳에서 또 에러가 난다. **모두 grep으로 찾아서 고칠 것**: `grep -rn "'16/9'" site/components site/data`
- `tsc --noEmit`은 첫 에러 이후의 에러도 모두 보여주지만, 이번엔 head로 잘라 확인했으므로 수정 후 **전체 출력**을 다시 볼 것.
- `next build`는 `.next` 캐시 때문에 이전 결과를 재사용할 수 있다. 의심되면 `.next` 폴더 삭제 후 재빌드.
- 현재 dev 서버(`npm run dev`)가 떠 있으면 Windows에서 `.next` 파일 잠금으로 빌드가 실패할 수 있다. **빌드 전에 dev 서버를 종료할 것.**

## ✅ 완료 기준 (직접 검증 방법)

1. `cd site && npx tsc --noEmit` → 출력 없이 종료 (exit code 0)
2. `cd site && npm run build` → "Compiled successfully" 확인
3. `npm run dev` 후 브라우저에서: 활동 탭 → 시원스쿨 인턴 → "SNS 교육 콘텐츠 기획" 섹션의 이미지(`sns_1.png`)가 **세로로 긴 3:4 비율**로 잘리지 않고 표시되는지 확인
