'use client'

import { useState } from 'react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { getRichProject, type ProjectSection, type FeatureCardData } from '@/data/project-sections'

/* ── renderHighlight ── */
function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--accent)', fontWeight: '700' }}>{part}</strong>
      : <span key={i}>{part}</span>
  )
}

function CellValue({ value }: { value: string }) {
  if (value.startsWith('http')) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--accent)' }}>
        Notion ↗
      </a>
    )
  }
  return <>{value}</>
}

/* ── DataTable ── */
function DataTable({ headers, rows, forceTable }: { headers: string[]; rows: string[][]; forceTable?: boolean }) {
  const is2Col = headers.length === 2

  if (is2Col && !forceTable) {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="flex gap-5 px-5 py-2.5" style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
          {headers.map((h) => (
            <span key={h} className="text-[0.62rem] font-black uppercase tracking-widest first:w-[4.5rem] first:shrink-0"
              style={{ color: 'var(--tx-3)' }}>{h}</span>
          ))}
        </div>
        {rows.map(([key, val], ri) => (
          <div key={ri} className="flex gap-5 px-5 py-3.5"
            style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span className="text-[0.65rem] font-bold uppercase tracking-widest shrink-0 pt-0.5"
              style={{ color: 'var(--tx-3)', width: '4.5rem' }}>
              {key}
            </span>
            <span className="text-sm leading-relaxed font-medium" style={{ color: 'var(--tx-2)' }}>
              <CellValue value={val} />
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {headers.map((h, hi) => {
              const isLast = hi === headers.length - 1 && headers.length > 2
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
            <tr key={ri} style={{
              borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              {row.map((cell, ci) => {
                const isLast = ci === row.length - 1 && row.length > 2
                return (
                  <td key={ci} className="px-5 py-3.5 text-sm leading-relaxed"
                    style={{
                      background: isLast
                        ? 'var(--accent-dim)'
                        : ri % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
                      color: ci === 0 ? 'var(--accent)' : isLast ? 'var(--accent)' : 'var(--tx-2)',
                      fontWeight: ci === 0 || isLast ? '600' : '400',
                      whiteSpace: ci === 0 ? 'nowrap' : undefined,
                    }}>
                    <CellValue value={cell} />
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

/* ── BulletList ── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5 px-5 py-3.5 text-sm leading-relaxed"
          style={{
            background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            color: 'var(--tx-2)',
          }}>
          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-black"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent)', minWidth: '1.25rem' }}>
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ── EntryList ── */
function EntryList({ entries }: { entries: { label: string; content: string }[] }) {
  return (
    <div className="space-y-4">
      {entries.map(({ label, content }) => (
        <div key={label} className="flex gap-4 items-start">
          <span
            className="shrink-0 text-xs font-black pt-0.5"
            style={{ color: 'var(--tx)', width: '3.5rem' }}
          >
            {label}
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>
            {content}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ── Lightbox ── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6 cursor-zoom-out"
      style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <img
        src={src}
        className="rounded-2xl object-contain shadow-2xl"
        style={{ maxWidth: '92vw', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all"
        style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
        onClick={onClose}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  )
}

/* ── FeatureCardGrid ── */
function FeatureCardGrid({ cards }: { cards: FeatureCardData[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.badge}
            className={`rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 ${card.src ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
            style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.18)' }}
            onClick={() => card.src && setLightboxSrc(card.src)}
          >
            <span
              className="self-start text-[0.6rem] font-black uppercase tracking-widest rounded-full px-2.5 py-1"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              {card.badge}
            </span>
            <h4 className="text-sm font-black leading-snug" style={{ color: 'var(--tx)' }}>
              {card.title}
            </h4>
            {card.bullets && (
              <ul className="flex flex-col gap-1.5 flex-1">
                {card.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--tx-2)' }}>
                    <svg className="shrink-0 mt-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {card.src && (
              <div
                className="flex items-center gap-1.5 text-[0.65rem] font-semibold mt-auto pt-3"
                style={{ color: 'var(--accent)', borderTop: '1px solid rgba(37,99,235,0.12)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                슬라이드 보기
              </div>
            )}
          </div>
        ))}
      </div>
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  )
}

/* ── Section ── */
function Section({ section, depth = 0 }: { section: ProjectSection; depth?: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const hasCollapsibleImage = !!(section.imageSlot?.collapsible && section.imageSlot?.src)
  const hasSideLayout = !!(section.sideLayout && section.imageSlot && !hasCollapsibleImage)

  return (
    <div className={depth > 0 ? 'pl-5 border-l-2' : ''} style={depth > 0 ? { borderColor: 'rgba(37,99,235,0.15)' } : {}}>

      {/* Title row — with optional "사진 보기" button */}
      {section.title && (
        <div className={`flex items-start gap-3 mb-4 ${hasCollapsibleImage ? 'justify-between' : ''}`}>
          <h3
            className={`font-black leading-snug ${depth === 0 ? 'text-base' : 'text-sm'}`}
            style={{ color: 'var(--tx)' }}
          >
            {section.title}
          </h3>
          {hasCollapsibleImage && (
            <button
              className="flex items-center gap-1.5 shrink-0 text-[0.65rem] font-semibold rounded-full px-3 py-1.5 transition-colors"
              style={{
                background: 'var(--accent-dim)',
                color: 'var(--accent)',
                border: '1px solid rgba(37,99,235,0.2)',
              }}
              onClick={() => setLightboxOpen(true)}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              사진 보기
            </button>
          )}
        </div>
      )}

      {/* Collapsible image lightbox (no title case) */}
      {hasCollapsibleImage && !section.title && (
        <button
          className="flex items-center gap-2 text-xs font-semibold rounded-full px-3.5 py-1.5 mb-4 transition-colors"
          style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(37,99,235,0.2)' }}
          onClick={() => setLightboxOpen(true)}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          {section.imageSlot!.badge ?? '사진 보기'}
        </button>
      )}

      {lightboxOpen && section.imageSlot?.src && (
        <Lightbox src={section.imageSlot.src} onClose={() => setLightboxOpen(false)} />
      )}

      {section.highlight && (
        <div className="rounded-xl px-5 py-4 mb-4 text-center"
          style={{ background: 'rgba(37,99,235,0.06)', border: '2px solid rgba(37,99,235,0.2)' }}>
          <p className="text-base font-bold leading-relaxed" style={{ color: 'var(--accent)' }}>
            {section.highlight}
          </p>
        </div>
      )}

      {section.images && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {section.images.map((img) => (
            <ImagePlaceholder key={img.id} id={img.id} description={img.description}
              aspectRatio={img.aspectRatio} src={img.src} badge={img.badge} />
          ))}
        </div>
      )}

      {section.featureCards && (
        <div className="mb-4">
          <FeatureCardGrid cards={section.featureCards} />
        </div>
      )}

      {hasSideLayout ? (
        <div className="grid grid-cols-1 gap-4 mb-4 items-stretch md:grid-cols-[minmax(260px,2fr)_minmax(0,3fr)]">
          <ImagePlaceholder
            id={section.imageSlot!.id}
            description={section.imageSlot!.description}
            aspectRatio={section.imageSlot!.aspectRatio ?? '4/3'}
            src={section.imageSlot!.src}
            badge={section.imageSlot!.badge}
            fillHeight
          />
          <div className="flex h-full flex-col gap-3">
            {section.content && <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>{section.content}</p>}
            {section.table && <DataTable headers={section.table.headers} rows={section.table.rows} />}
            {section.bullets && <BulletList items={section.bullets} />}
          </div>
        </div>
      ) : (
        <>
          {!hasCollapsibleImage && section.imageSlot && (
            <div className="mb-4">
              <ImagePlaceholder id={section.imageSlot.id} description={section.imageSlot.description}
                aspectRatio={section.imageSlot.aspectRatio} src={section.imageSlot.src} badge={section.imageSlot.badge} />
            </div>
          )}
          {section.content && (
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--tx-2)' }}>{section.content}</p>
          )}
          {section.table && (
            <div className="mb-4"><DataTable headers={section.table.headers} rows={section.table.rows} /></div>
          )}
          {section.bullets && (
            <div className="mb-4"><BulletList items={section.bullets} /></div>
          )}
          {section.entries && (
            <div className="mb-4"><EntryList entries={section.entries} /></div>
          )}
        </>
      )}

      {section.subsections?.map((sub) => (
        <div key={sub.id} className="mb-5">
          <Section section={sub} depth={depth + 1} />
        </div>
      ))}
    </div>
  )
}

/* ── RichProjectDetail ── */
export default function RichProjectDetail({ projectId }: { projectId: string }) {
  const rich = getRichProject(projectId)
  if (!rich) return null

  return (
    <div className="space-y-6 p-6 md:p-7">
      <div className="space-y-2">
        <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--tx-2)' }}>
          {renderHighlight(rich.tagline)}
        </p>
        {rich.subtitle && (
          <p className="text-sm font-semibold" style={{ color: 'var(--tx-3)' }}>
            {rich.subtitle}
          </p>
        )}
        {rich.description && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>
            {rich.description}
          </p>
        )}
      </div>

      <div>
        <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-3)' }}>
          Overview
        </p>
        <DataTable headers={rich.overview.headers} rows={rich.overview.rows} forceTable />
      </div>

      {rich.sections.map((section) => (
        <div
          key={section.id}
          className={section.title ? 'rounded-2xl p-5 md:p-6' : 'py-1'}
          style={section.title ? {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
          } : {}}
        >
          <Section section={section} />
        </div>
      ))}
    </div>
  )
}
