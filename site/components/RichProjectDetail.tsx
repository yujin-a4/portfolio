'use client'

import ImagePlaceholder from '@/components/ImagePlaceholder'
import { getRichProject, type ProjectSection } from '@/data/project-sections'

function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className={`grid gap-3 ${stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl p-4"
          style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}
        >
          <p className="text-2xl font-black" style={{ color: 'var(--accent)' }}>{s.value}</p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--tx-3)' }}>{s.label}</p>
        </div>
      ))}
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--surface-2)' }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide"
                style={{ color: 'var(--tx-3)', borderBottom: '1px solid var(--border)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background: ri % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
                borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2.5 text-sm leading-relaxed"
                  style={{
                    color: ci === 0 ? 'var(--tx-2)' : 'var(--tx)',
                    fontWeight: ci === 0 ? '600' : '400',
                  }}
                >
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed"
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--tx-2)',
          }}
        >
          <span className="mt-0.5 shrink-0 font-black" style={{ color: 'var(--accent)' }}>›</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Section({ section, depth = 0 }: { section: ProjectSection; depth?: number }) {
  return (
    <div className={depth > 0 ? 'pl-4 border-l-2' : ''} style={depth > 0 ? { borderColor: 'var(--border-2)' } : {}}>
      {section.title && (
        <h3
          className={`font-black leading-snug mb-3 ${depth === 0 ? 'text-lg' : 'text-base'}`}
          style={{ color: 'var(--tx)' }}
        >
          {section.title}
        </h3>
      )}

      {section.imageSlot && (
        <div className="mb-4">
          <ImagePlaceholder
            id={section.imageSlot.id}
            description={section.imageSlot.description}
            aspectRatio={section.imageSlot.aspectRatio}
          />
        </div>
      )}

      {section.content && (
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--tx-2)' }}>
          {section.content}
        </p>
      )}

      {section.stats && (
        <div className="mb-4">
          <StatGrid stats={section.stats} />
        </div>
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

      {section.subsections?.map((sub) => (
        <div key={sub.id} className="mb-5">
          <Section section={sub} depth={depth + 1} />
        </div>
      ))}
    </div>
  )
}

export default function RichProjectDetail({ projectId }: { projectId: string }) {
  const rich = getRichProject(projectId)
  if (!rich) return null

  return (
    <div className="space-y-8 p-5 md:p-7">
      {/* Tagline */}
      <blockquote
        className="rounded-xl px-5 py-4 text-sm italic leading-relaxed"
        style={{
          background: 'var(--accent-dim)',
          borderLeft: '3px solid var(--accent)',
          color: 'var(--tx-2)',
        }}
      >
        "{rich.tagline}"
      </blockquote>

      {/* Overview table */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--tx-3)' }}>
          Overview
        </p>
        <DataTable headers={rich.overview.headers} rows={rich.overview.rows} />
      </div>

      {/* Sections */}
      {rich.sections.map((section) => (
        <div
          key={section.id}
          className={section.title ? 'rounded-2xl p-5 md:p-6' : ''}
          style={section.title ? { background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' } : {}}
        >
          <Section section={section} />
        </div>
      ))}
    </div>
  )
}
