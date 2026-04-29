'use client'

import ImagePlaceholder from '@/components/ImagePlaceholder'
import { getRichProject, type ProjectSection } from '@/data/project-sections'

/* ── renderHighlight ── */
function renderHighlight(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--accent)', fontWeight: '700' }}>{part}</strong>
      : <span key={i}>{part}</span>
  )
}

/* ── DataTable ── */
function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  const is2Col = headers.length === 2

  if (is2Col) {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="flex gap-5 px-5 py-2.5" style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
          {headers.map((h) => (
            <span key={h} className="text-[0.62rem] font-black uppercase tracking-widest first:w-[4.5rem] first:shrink-0"
              style={{ color: 'var(--tx-3)' }}>{h}</span>
          ))}
        </div>
        {rows.map(([key, val], ri) => (
          <div
            key={ri}
            className="flex gap-5 px-5 py-3.5"
            style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-widest shrink-0 pt-0.5"
              style={{ color: 'var(--tx-3)', width: '4.5rem' }}>
              {key}
            </span>
            <span className="text-sm leading-relaxed font-medium" style={{ color: 'var(--tx-2)' }}>
              {val}
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
          <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 text-left text-[0.62rem] font-bold uppercase tracking-widest whitespace-nowrap"
                style={{ color: 'var(--tx-3)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{
              background: ri % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
              borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-5 py-3.5 text-sm leading-relaxed"
                  style={{
                    color: ci === 0 ? 'var(--accent)' : 'var(--tx-2)',
                    fontWeight: ci === 0 ? '600' : '400',
                    whiteSpace: ci === 0 ? 'nowrap' : undefined,
                  }}>
                  {cell}
                </td>
              ))}
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

/* ── Section ── */
function Section({ section, depth = 0 }: { section: ProjectSection; depth?: number }) {
  const hasSideLayout = section.sideLayout && section.imageSlot

  return (
    <div className={depth > 0 ? 'pl-5 border-l-2' : ''} style={depth > 0 ? { borderColor: 'rgba(37,99,235,0.15)' } : {}}>
      {section.title && (
        <h3
          className={`font-black leading-snug mb-4 ${depth === 0 ? 'text-base' : 'text-sm'}`}
          style={{ color: 'var(--tx)' }}
        >
          {section.title}
        </h3>
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
            <ImagePlaceholder
              key={img.id}
              id={img.id}
              description={img.description}
              aspectRatio={img.aspectRatio}
              src={img.src}
              badge={img.badge}
            />
          ))}
        </div>
      )}

      {hasSideLayout ? (
        <div className="grid gap-4 mb-4 items-start" style={{ gridTemplateColumns: '2fr 3fr' }}>
          <ImagePlaceholder
            id={section.imageSlot!.id}
            description={section.imageSlot!.description}
            aspectRatio={section.imageSlot!.aspectRatio ?? '4/3'}
            src={section.imageSlot!.src}
            badge={section.imageSlot!.badge}
          />
          <div className="flex flex-col gap-3">
            {section.content && (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>{section.content}</p>
            )}
            {section.table && <DataTable headers={section.table.headers} rows={section.table.rows} />}
            {section.bullets && <BulletList items={section.bullets} />}
          </div>
        </div>
      ) : (
        <>
          {section.imageSlot && (
            <div className="mb-4">
              <ImagePlaceholder
                id={section.imageSlot.id}
                description={section.imageSlot.description}
                aspectRatio={section.imageSlot.aspectRatio}
                src={section.imageSlot.src}
                badge={section.imageSlot.badge}
              />
            </div>
          )}
          {section.content && (
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--tx-2)' }}>
              {section.content}
            </p>
          )}
          {section.table && (
            <div className="mb-4">
              <DataTable headers={section.table.headers} rows={section.table.rows} />
            </div>
          )}
          {section.bullets && (
            <div className="mb-4">
              <BulletList items={section.bullets} />
            </div>
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
      {/* Tagline */}
      <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--tx-2)' }}>
        {renderHighlight(rich.tagline)}
      </p>

      {/* Overview */}
      <div>
        <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-3)' }}>
          Overview
        </p>
        <DataTable headers={rich.overview.headers} rows={rich.overview.rows} />
      </div>

      {/* Sections */}
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
