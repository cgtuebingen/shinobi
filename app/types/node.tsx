export interface CitationNode {
	type: string
	name: string
	authors: string[][] // [first_name, surname]
	title: string
	booktitle: string
	year: number
}

export interface AcknowledgementsNode {
	name: string
	content: [TextNode | CiteNode]
}

export interface AuthorNode {
	name: string
	link: string
}

export interface TitleNode {
	title: string
	subtitle: string
}

export interface LinkNode {
	name: string
	link: string
	icon: string
}

export interface InstitutionNode {
	name: string
	link: string
	image?: string
}

export interface FigureNode {
	name: string
	type: "image" | "video" | "swappable_video" | "multi_video" | "blur_video"
	urls: string[]
	captions?: ParagraphNode[]
	styling?: FigureStylingNode
}

export interface FigureStylingNode {
	roundedCorners?: boolean
	scaleContent?: number
	showControls?: boolean
}

export interface DocumentNode {
	chapters: [ChapterNode]
}

export interface ChapterNode {
	name: string
	introduction: [TextNode | CiteNode | FigureReferenceNode]
	sections: [SectionNode]
	paragraphs: [ParagraphNode]
}

export interface SectionNode {
	name: string
	introduction: [SubSectionNode | ParagraphNode]
}

export interface SubSectionNode {
	name: string
	introduction: [CiteNode | TextNode | ParagraphNode | LineBreakNode | FigureReferenceNode]
}

export interface ParagraphNode {
	type: "paragraph"
	name: string
	contents: [TextNode | CiteNode | LineBreakNode | FigureReferenceNode]
}

export interface TextNode {
	type: "text"
	content: string
}

export interface CiteNode {
	type: "cite"
	index: number[]
	reference: string[]
}

export interface LineBreakNode {
	type: "line_break"
}

export interface FigureReferenceNode {
	type: "figure"
	id: string
}

export type ContentNodeTypes = ParagraphNode | TextNode | CiteNode | LineBreakNode | FigureReferenceNode
