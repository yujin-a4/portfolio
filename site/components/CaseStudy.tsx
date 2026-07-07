// 케이스스터디 공용 렌더러 (Problem → Research → Solution → Impact → Retrospective)
// 데이터: data/case-studies.ts 레지스트리 — AIInterviewRoom의 프로젝트 상세 패널에 임베드된다.
//
// 디자인 노트: 좌측 타임라인 스파인이 시그니처 — 스텝이 실제 시간 순서이고,
// 케이스스터디의 본질이 "축적된 과정"이라 선형 축이 내용을 형태로 옮긴 것.

import ImagePlaceholder from '@/components/ImagePlaceholder'
import type { CaseStudy as CaseStudyData, CaseStudyStep, CsTable as CsTableData } from '@/data/case-studies'

/* 형광펜 하이라이트 — 리서치 문서의 "주석" 감성 */
function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? (
        <mark
          key={i}
          style={{
            background: 'linear-gradient(transparent 62%, var(--accent-glow) 62%)',
            color: 'inherit',
            fontWeight: 800,
            padding: '0 0.08em',
          }}
        >
          {part}
        </mark>
      )
      : <span key={i}>{part}</span>
  )
}

/* ── 표 ── */
function CsTable({ headers, rows }: CsTableData) {
  return (
    <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {headers.map((h, hi) => {
              const isLast = hi === headers.length - 1
              return (
                <th key={h} className="px-5 py-3 text-left text-[0.62rem] font-bold uppercase tracking-widest whitespace-nowrap"
                  style={{
                    background: isLast ? 'var(--accent-dim)' : 'var(--surface-2)',
                    color: isLast ? 'var(--accent)' : 'var(--tx-3)',
                  }}>
                  {h}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              {row.map((cell, ci) => {
                const isLast = ci === row.length - 1
                return (
                  <td key={ci} className="px-5 py-3.5 text-sm leading-relaxed"
                    style={{
                      background: isLast ? 'var(--accent-dim)' : 'transparent',
                      color: ci === 0 || isLast ? 'var(--accent)' : 'var(--tx-2)',
                      fontWeight: ci === 0 || isLast ? 600 : 400,
                      whiteSpace: ci === 0 ? 'nowrap' : undefined,
                    }}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── 강조 콜아웃 ── */
function Callout({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl px-5 py-4 flex items-start gap-3"
      style={{ background: 'var(--accent-dim)', borderLeft: '3px solid var(--accent)' }}>
      <span className="shrink-0 text-[0.6rem] font-black uppercase tracking-widest pt-1" style={{ color: 'var(--accent)' }}>
        {label}
      </span>
      <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--tx)' }}>
        {text}
      </p>
    </div>
  )
}

/* ── Before → After 카드 ── */
function BeforeAfterCard({ title, before, after }: { title: string; before: string; after: string }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
      <h4 className="text-sm font-black leading-snug" style={{ color: 'var(--tx)' }}>{title}</h4>
      <div className="flex flex-col gap-3 flex-1">
        <div className="rounded-xl px-4 py-3" style={{ background: 'var(--surface-2)', border: '1px dashed var(--border-2)' }}>
          <p className="text-[0.58rem] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-3)' }}>Before</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-3)' }}>{before}</p>
        </div>
        <div className="flex justify-center -my-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
        <div className="rounded-xl px-4 py-3 flex-1" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(37,99,235,0.2)' }}>
          <p className="text-[0.58rem] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>After</p>
          <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--tx-2)' }}>{after}</p>
        </div>
      </div>
    </div>
  )
}

/* ── 체크 불릿 리스트 ── */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5 px-5 py-3.5 text-sm leading-relaxed"
          style={{
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            color: 'var(--tx-2)',
          }}>
          <svg className="shrink-0 mt-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ── 스텝 본문 블록 ── */
function StepBlocks({ step }: { step: CaseStudyStep }) {
  return (
    <div className="space-y-5">
      {step.images && (
        <div className={`grid gap-3 ${step.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
          {step.images.map((img) => (
            <ImagePlaceholder key={img.id} id={img.id} description={img.description}
              aspectRatio={img.aspectRatio ?? '16/9'} src={img.src} badge={img.badge} />
          ))}
        </div>
      )}

      {step.table && <CsTable headers={step.table.headers} rows={step.table.rows} />}

      {step.cards && (
        <div className="grid grid-cols-1 gap-4">
          {step.cards.map((card) => (
            <div key={card.title} className="rounded-2xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
              <div className={card.image ? 'grid grid-cols-1 md:grid-cols-[minmax(220px,2fr)_3fr] gap-5 items-start' : ''}>
                {card.image && (
                  <ImagePlaceholder id={card.image.id} description={card.image.description}
                    aspectRatio={card.image.aspectRatio ?? '4/3'} src={card.image.src} badge={card.image.badge} />
                )}
                <div>
                  <h4 className="text-sm font-black leading-snug mb-3" style={{ color: 'var(--tx)' }}>
                    {card.title}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>
                        <svg className="shrink-0 mt-1" width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {step.beforeAfter && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {step.beforeAfter.map((s) => (
            <BeforeAfterCard key={s.title} title={s.title} before={s.before} after={s.after} />
          ))}
        </div>
      )}

      {step.statTiles && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {step.statTiles.map((s) => (
            <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-1.5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', boxShadow: 'var(--shadow-xs)' }}>
              <p className="text-[0.62rem] font-bold uppercase tracking-widest" style={{ color: 'var(--tx-3)' }}>
                {s.label}
              </p>
              <p className="text-[1.45rem] font-black leading-tight tracking-tight" style={{ color: 'var(--tx)', fontVariantNumeric: 'tabular-nums' }}>
                {s.value}
              </p>
              {s.note && (
                <p className="text-[0.68rem] leading-relaxed" style={{ color: 'var(--tx-3)' }}>{s.note}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {step.bullets && <CheckList items={step.bullets} />}

      {step.entries && (
        <div>
          {step.entries.map(({ label, content }) => (
            <div key={label} className="flex flex-col sm:flex-row gap-1.5 sm:gap-5 items-start py-4"
              style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="shrink-0 text-xs font-black pt-0.5" style={{ color: 'var(--accent)', width: '5rem' }}>
                {label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>
                {content}
              </p>
            </div>
          ))}
        </div>
      )}

      {step.callout && <Callout label={step.callout.label} text={step.callout.text} />}
    </div>
  )
}

/* ── 스파인 스텝 섹션 ── */
function StepSection({ step, isLast }: { step: CaseStudyStep; isLast: boolean }) {
  return (
    <section id={step.id} className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr]">
      {/* 스파인 레일 + 노드 */}
      <div className="relative flex justify-center">
        <div
          aria-hidden
          className="absolute w-px"
          style={{
            background: 'var(--border-2)',
            top: '2.75rem',
            bottom: isLast ? 'auto' : '-4rem',
            height: isLast ? '0' : undefined,
          }}
        />
        <div
          className="sticky top-28 flex h-10 w-10 items-center justify-center rounded-full text-xs font-black self-start"
          style={{
            background: 'var(--surface)',
            border: '2px solid var(--accent)',
            color: 'var(--accent)',
            fontVariantNumeric: 'tabular-nums',
            zIndex: 1,
          }}
        >
          {step.step}
        </div>
      </div>

      {/* 본문 */}
      <div className={isLast ? 'pl-4 md:pl-6' : 'pb-16 pl-4 md:pl-6'}>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.25em] mb-1.5 pt-2.5" style={{ color: 'var(--accent)' }}>
          {step.eyebrow}
        </p>
        <h2 className="text-2xl font-black leading-tight tracking-tight mb-3" style={{ color: 'var(--tx)' }}>
          {step.title}
        </h2>
        <p className="text-base leading-relaxed mb-6 max-w-xl" style={{ color: 'var(--tx-2)' }}>
          {renderHighlight(step.lead)}
        </p>
        <StepBlocks step={step} />
      </div>
    </section>
  )
}

export default function CaseStudy({ cs }: { cs: CaseStudyData }) {
  return (
    <div className="px-6 md:px-8 py-8">

      {/* ── 커버: 질문이 헤드라인 ── */}
      <header className="mb-14">
        <p className="flex items-center gap-2.5 text-[0.65rem] font-black uppercase tracking-[0.25em] mb-5" style={{ color: 'var(--tx-3)' }}>
          <span className="inline-block h-px w-8" style={{ background: 'var(--accent)' }} />
          Case Study
        </p>

        <h1
          className="font-black tracking-tight mb-6"
          style={{
            color: 'var(--tx)',
            fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
            lineHeight: 1.35,
            wordBreak: 'keep-all',
          }}
        >
          {renderHighlight(cs.coverQuestion)}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {cs.tags.map((t) => (
            <span key={t} className="text-[0.62rem] font-black uppercase tracking-widest rounded-full px-3 py-1.5"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
              #{t}
            </span>
          ))}
        </div>

        {/* 콜로폰 — 2열 메타 그리드 */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-8 pt-6" style={{ borderTop: '1px solid var(--border-2)' }}>
          {cs.meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[0.62rem] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-3)' }}>
                {m.label}
              </dt>
              <dd className="text-sm leading-relaxed font-medium" style={{ color: 'var(--tx)' }}>
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <ImagePlaceholder
          id={cs.heroImage.id}
          description={cs.heroImage.description}
          aspectRatio={cs.heroImage.aspectRatio ?? '16/9'}
          src={cs.heroImage.src}
          badge={cs.heroImage.badge}
        />

        {cs.link && (
          <a
            href={cs.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold rounded-full px-4 py-2 transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {cs.link.label}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10"/>
            </svg>
          </a>
        )}
      </header>

      {/* ── 타임라인 ── */}
      {cs.steps.map((step, i) => (
        <StepSection key={step.id} step={step} isLast={i === cs.steps.length - 1} />
      ))}

    </div>
  )
}
