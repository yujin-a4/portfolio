'use client'

import { useEffect, useRef, useState } from 'react'
import { resolveInterviewTopic } from '@/data/ai-interview'
import {
  getCategoryById,
  getPortfolioItemById,
  portfolioCategories,
  type PortfolioCategoryId,
  type PortfolioMenuItem,
} from '@/data/portfolio-menu'
import LandingScene from '@/components/LandingScene'
import HubScene from '@/components/HubScene'
import CertificateGrid from '@/components/CertificateGrid'
import RichProjectDetail from '@/components/RichProjectDetail'

type Stage = 'landing' | 'hub' | 'console'
type Message = { role: 'user' | 'assistant'; content: string }

const CHAT_STARTERS: Record<PortfolioCategoryId, string[]> = {
  career:     ['YBM AI Lab에서 어떤 역할을 맡았나요?', '가장 임팩트 있는 성과를 설명해 주세요.', '커리어 성장 스토리를 들려주세요.'],
  education:  ['연세대 석사 과정과 현재 업무의 연결고리는?', '독일 교환학생 경험이 역량에 어떤 영향을 줬나요?', '학업 중 주목할 만한 성과가 있나요?'],
  projects:   ['기획자로서 가장 어려웠던 점은?', '핵심 성과만 요약해 주세요.', '면접 꼬리질문처럼 물어봐 주세요.'],
  activities: ['인턴 경험이 현재 역량에 어떤 영향을 줬나요?', '이 활동이 업무 역량에 어떤 영향을 줬나요?', '가장 인상 깊은 활동 경험은?'],
  certs:      ['AI POT 자격증을 취득한 계기는?', '자격증이 실무에서 어떻게 활용되나요?', '언어 역량이 AI 기획에 도움이 되는 이유는?'],
}

/* ── CategoryTabs ── */
function CategoryTabs({ activeId, onSelect }: { activeId: PortfolioCategoryId; onSelect: (id: PortfolioCategoryId) => void }) {
  return (
    <div className="flex items-center gap-0.5 px-4 shrink-0 glass" style={{ borderBottom: '1px solid var(--border)' }}>
      {portfolioCategories.map((cat) => {
        const isActive = activeId === cat.id
        return (
          <button key={cat.id} type="button" onClick={() => onSelect(cat.id)}
            className="relative flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold transition-colors"
            style={{ color: isActive ? 'var(--accent)' : 'var(--tx-3)' }}
          >
            {cat.label}
            {cat.id === 'projects' && (
              <span className="rounded-full px-1.5 py-0.5 text-[0.58rem] font-black" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>MAIN</span>
            )}
            {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full" style={{ background: 'var(--accent)' }} />}
          </button>
        )
      })}
    </div>
  )
}

/* ── ItemList ── */
function ItemList({ items, activeItemId, onSelect }: { items: PortfolioMenuItem[]; activeItemId: string; onSelect: (item: PortfolioMenuItem) => void }) {
  return (
    <nav className="flex flex-col gap-1.5 overflow-y-auto p-3">
      {items.map((item) => {
        const isActive = activeItemId === item.id
        return (
          <button key={item.id} type="button" onClick={() => onSelect(item)}
            className="w-full rounded-xl p-3.5 text-left transition-all duration-200"
            style={{
              background: isActive ? 'var(--accent-dim)' : 'var(--surface-2)',
              border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="block text-[0.62rem] font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--amber)' }}>{item.eyebrow}</span>
            <span className="block text-sm font-bold leading-snug" style={{ color: 'var(--tx)' }}>{item.title}</span>
            <span className="block text-xs mt-1.5" style={{ color: 'var(--tx-3)' }}>{item.period}</span>
          </button>
        )
      })}
    </nav>
  )
}

/* ── DetailPanel ── */
function DetailPanel({ item, onAsk }: { item: PortfolioMenuItem; onAsk: (prompt: string) => void }) {
  return (
    <section className="min-h-0 overflow-y-auto">
      <div className="px-6 py-5 sticky top-0 z-10 glass" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--amber)' }}>{item.eyebrow}</p>
            <h2 className="text-2xl font-black leading-tight" style={{ color: 'var(--tx)' }}>{item.title}</h2>
            <p className="mt-1.5 text-sm font-semibold" style={{ color: 'var(--cyan)' }}>{item.period}</p>
          </div>
          <button type="button" onClick={() => onAsk(item.prompt)}
            className="shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:scale-105"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            AI 답변으로 보기 →
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--tx-2)' }}>{item.summary}</p>
      </div>

      <div className="p-6 space-y-5">
        {item.stats?.length ? (
          <div className={`grid gap-3 ${item.stats.length === 2 ? 'grid-cols-2' : 'sm:grid-cols-3'}`}>
            {item.stats.map((s) => (
              <div key={s.label} className="rounded-xl p-4 glass-2">
                <p className="text-2xl font-black" style={{ color: 'var(--accent)' }}>{s.value}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--tx-3)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--tx-3)' }}>주요 내용</p>
          <div className="space-y-2">
            {item.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed glass-2">
                <span className="mt-0.5 shrink-0 font-black" style={{ color: 'var(--accent)' }}>›</span>
                <span style={{ color: 'var(--tx-2)' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-lg px-2.5 py-1.5 text-xs font-medium glass-2" style={{ color: 'var(--tx-3)' }}>{tag}</span>
          ))}
        </div>

        {item.link ? (
          <a href={item.link.href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all hover:scale-105 glass-2"
            style={{ color: 'var(--accent)' }}
          >
            {item.link.label} ↗
          </a>
        ) : null}
      </div>
    </section>
  )
}

function renderInline(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

/* ── ChatPanel ── */
function ChatPanel({ messages, input, streaming, activeCategoryId, onInputChange, onSend, className = '' }: {
  messages: Message[]; input: string; streaming: boolean; activeCategoryId: PortfolioCategoryId;
  onInputChange: (v: string) => void; onSend: (text?: string) => void; className?: string;
}) {
  const endRef = useRef<HTMLDivElement>(null)
  const starters = CHAT_STARTERS[activeCategoryId]

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages])

  return (
    <aside className={`flex min-h-0 flex-col rounded-2xl overflow-hidden glass ${className}`}>
      <div className="px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>AI Interview</p>
        </div>
        <p className="mt-0.5 text-sm font-bold" style={{ color: 'var(--tx)' }}>자유 질문</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { background: 'var(--accent)', color: '#fff' }
                : { background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--tx-2)' }}
            >
              {msg.content ? (
                <span className="block space-y-1">
                  {msg.content.split('\n').map((line, j) => {
                    if (!line.trim()) return <span key={j} className="block h-1" />
                    const isBullet = /^[-•·]\s/.test(line)
                    return (
                      <span key={j} className={`block ${isBullet ? 'flex gap-1.5 items-start' : ''}`}>
                        {isBullet && <span className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>›</span>}
                        <span>{renderInline(isBullet ? line.replace(/^[-•·]\s/, '') : line)}</span>
                      </span>
                    )
                  })}
                </span>
              ) : (
                <span className="inline-flex gap-1.5">
                  {[0, 120, 240].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'var(--tx-3)', animationDelay: `${d}ms` }} />
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 shrink-0 space-y-2" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="space-y-1.5">
          {starters.map((prompt) => (
            <button key={prompt} type="button" onClick={() => onSend(prompt)} disabled={streaming}
              className="w-full rounded-xl px-3 py-2 text-left text-xs leading-snug transition-all hover:scale-[1.01] disabled:opacity-40 glass-2"
              style={{ color: 'var(--tx-3)' }}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() } }}
            disabled={streaming} placeholder="자유롭게 질문하세요"
            className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-sm outline-none transition-all disabled:opacity-50 glass-2"
            style={{ color: 'var(--tx)', caretColor: 'var(--accent)' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '')}
          />
          <button type="button" onClick={() => onSend()} disabled={streaming || !input.trim()}
            className="rounded-xl px-4 text-sm font-bold transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            전송
          </button>
        </div>
      </div>
    </aside>
  )
}

/* ── ConsoleScene ── */
function ConsoleScene({ messages, input, streaming, activeCategoryId, activeItem, onInputChange, onCategorySelect, onItemSelect, onSend, onBackToHub }: {
  messages: Message[]; input: string; streaming: boolean; activeCategoryId: PortfolioCategoryId; activeItem: PortfolioMenuItem;
  onInputChange: (v: string) => void; onCategorySelect: (id: PortfolioCategoryId) => void;
  onItemSelect: (item: PortfolioMenuItem) => void; onSend: (text?: string) => void; onBackToHub: () => void;
}) {
  const activeCategory = getCategoryById(activeCategoryId)
  const isCerts = activeCategoryId === 'certs'
  const isProject = activeCategoryId === 'projects'
  const RICH_PROJECT_IDS = ['project-classcanvas', 'project-aidt', 'project-ai-trend-lab']

  return (
    <section id="console" className="console-enter h-screen flex flex-col pt-16 overflow-hidden">
      <CategoryTabs activeId={activeCategoryId} onSelect={onCategorySelect} />

      {/* Breadcrumb + back */}
      <div className="flex items-center gap-3 px-5 py-2.5 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <button type="button" onClick={onBackToHub}
          className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'var(--tx-3)' }}
        >
          ← 메뉴로
        </button>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <p className="text-xs" style={{ color: 'var(--tx-3)' }}>
          <span className="font-semibold" style={{ color: 'var(--tx-2)' }}>{activeCategory.label}</span>
          {' — '}{activeCategory.description}
        </p>
      </div>

      {/* Main grid — flex-1 min-h-0 ensures it fills remaining height without overflow */}
      <div className="flex-1 min-h-0 p-4 md:p-5 overflow-hidden">
        <div
          className={`h-full grid gap-4 ${isCerts ? 'lg:grid-cols-[1fr_300px]' : 'lg:grid-cols-[220px_minmax(0,1fr)_300px]'}`}
        >
          {!isCerts && (
            <div className="hidden lg:flex flex-col h-full overflow-hidden rounded-2xl glass">
              <ItemList items={activeCategory.items} activeItemId={activeItem.id} onSelect={onItemSelect} />
            </div>
          )}

          {/* Center — only this column scrolls */}
          <div className="h-full overflow-y-auto rounded-2xl glass">
            {isCerts ? (
              <CertificateGrid />
            ) : (
              <>
                <div className="lg:hidden p-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <select value={activeItem.id}
                    onChange={(e) => { const f = activeCategory.items.find((i) => i.id === e.target.value); if (f) onItemSelect(f) }}
                    className="w-full rounded-xl px-3 py-2 text-sm outline-none glass-2" style={{ color: 'var(--tx)' }}
                  >
                    {activeCategory.items.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                  </select>
                </div>

                {isProject && RICH_PROJECT_IDS.includes(activeItem.id) ? (
                  <div className="overflow-y-auto h-full">
                    <div className="px-6 py-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between glass sticky top-0 z-10" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--amber)' }}>{activeItem.eyebrow}</p>
                        <h2 className="text-2xl font-black leading-tight" style={{ color: 'var(--tx)' }}>{activeItem.title}</h2>
                        <p className="mt-1.5 text-sm font-semibold" style={{ color: 'var(--cyan)' }}>{activeItem.period}</p>
                      </div>
                      <div className="flex gap-2 shrink-0 flex-wrap">
                        <button type="button" onClick={() => onSend(activeItem.prompt)}
                          className="rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:scale-105"
                          style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                        >AI 답변으로 보기 →</button>
                        {activeItem.link && (
                          <a href={activeItem.link.href} target="_blank" rel="noopener noreferrer"
                            className="rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:scale-105"
                            style={{ background: 'var(--cyan-dim)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
                          >{activeItem.link.label} ↗</a>
                        )}
                      </div>
                    </div>
                    <RichProjectDetail projectId={activeItem.id} />
                  </div>
                ) : (
                  <DetailPanel item={activeItem} onAsk={onSend} />
                )}
              </>
            )}
          </div>

          <ChatPanel messages={messages} input={input} streaming={streaming} activeCategoryId={activeCategoryId} onInputChange={onInputChange} onSend={onSend} className="h-full" />
        </div>
      </div>
    </section>
  )
}

/* ── Root ── */
export default function AIInterviewRoom() {
  const [stage, setStage] = useState<Stage>('landing')
  const [activeCategoryId, setActiveCategoryId] = useState<PortfolioCategoryId>('career')
  const [activeItemId, setActiveItemId] = useState(portfolioCategories[0].items[0].id)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '항목을 선택하거나 바로 질문해 주세요. 면접 답변처럼 설명하겠습니다.' },
  ])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)

  const activeItem = getPortfolioItemById(activeItemId)

  function selectCategory(id: PortfolioCategoryId) {
    const cat = getCategoryById(id)
    setActiveCategoryId(cat.id)
    setActiveItemId(cat.items[0].id)
    setMessages([{ role: 'assistant', content: `${cat.label} 탭입니다. ${cat.description} 질문해 주세요.` }])
    setStage('console')
  }

  function selectItem(item: PortfolioMenuItem) {
    setActiveCategoryId(item.categoryId)
    setActiveItemId(item.id)
  }

  async function send(text?: string) {
    const question = (text ?? input).trim()
    if (!question || streaming) return
    const topic = resolveInterviewTopic(question)
    const nextMessages: Message[] = [...messages, { role: 'user', content: question }]
    setInput('')
    setMessages([...nextMessages, { role: 'assistant', content: '' }])
    setStreaming(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, topicId: topic.id, activeItemId }),
      })
      if (!res.ok || !res.body) throw new Error()
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: updated[updated.length - 1].content + chunk }
          return updated
        })
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: '답변 생성에 실패했습니다.' }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  if (stage === 'landing') return <LandingScene onEnter={() => setStage('hub')} />
  if (stage === 'hub') return <HubScene onSelectCategory={selectCategory} />

  return (
    <ConsoleScene
      messages={messages} input={input} streaming={streaming}
      activeCategoryId={activeCategoryId} activeItem={activeItem}
      onInputChange={setInput} onCategorySelect={selectCategory}
      onItemSelect={selectItem} onSend={send}
      onBackToHub={() => setStage('hub')}
    />
  )
}
