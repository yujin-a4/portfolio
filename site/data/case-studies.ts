// 케이스스터디 공용 타입 + 레지스트리
// 구조: Problem → Research → Solution → Impact → Retrospective (portfolio_reference.pptx 형식)
// 라우트: /case-study/[slug]

export interface CsStatTile {
  label: string
  value: string
  note?: string
}

export interface CsBeforeAfter {
  title: string
  before: string
  after: string
}

export interface CsTable {
  headers: string[]
  rows: string[][]
}

export interface CsImage {
  id: string
  description: string
  src?: string
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | '3/4'
  badge?: string
}

export interface CsCard {
  title: string
  bullets: string[]
  image?: CsImage
}

export interface CsEntry {
  label: string
  content: string
}

export interface CaseStudyStep {
  id: string
  step: string // '01'
  eyebrow: string // 'PROBLEM'
  title: string
  lead: string // 이 스텝의 한 문장 메시지 (**강조** 지원)
  // 콘텐츠 블록 — 렌더 순서: images → table → cards → beforeAfter → bullets → statTiles → entries → callout
  images?: CsImage[]
  table?: CsTable
  cards?: CsCard[]
  beforeAfter?: CsBeforeAfter[]
  bullets?: string[]
  statTiles?: CsStatTile[]
  entries?: CsEntry[]
  callout?: { label: string; text: string }
}

export interface CaseStudy {
  slug: string
  projectId: string
  title: string
  coverQuestion: string // **강조** 지원
  tags: string[]
  meta: { label: string; value: string }[]
  heroImage: CsImage
  link?: { label: string; href: string }
  steps: CaseStudyStep[]
}

import { caseStudyTrendLab } from './case-study-trend-lab'
import { caseStudyClasscanvas } from './case-study-classcanvas'
import { caseStudyAidt } from './case-study-aidt'
import { caseStudyMaxer } from './case-study-maxer'

export const caseStudies: CaseStudy[] = [
  caseStudyClasscanvas,
  caseStudyAidt,
  caseStudyTrendLab,
  caseStudyMaxer,
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
