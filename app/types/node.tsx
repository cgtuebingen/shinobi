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
	content: [TextNode | ListNode]
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
	type: "image" | "video" | "swappable_video" | "multi_video" | "blur_video" | "youtube"
	urls: string[]
	captions?: ParagraphNode[]
	styling?: FigureStylingNode
}

export interface FigureStylingNode {
	roundedCorners?: boolean
	scaleContent?: number
	showControls?: boolean
	objectFit?: "cover" | "contain"
}

export interface DocumentNode {
	chapters: [ChapterNode]
}

export interface ChapterNode {
	name: string
	introduction: [TextNode | FigureReferenceNode | ListNode]
	sections: [SectionNode]
	paragraphs: [ParagraphNode]
	styling?: ChapterStylingNode
}

export interface ChapterStylingNode {
	hideHeading?: boolean
}
export interface SectionNode {
	name: string
	introduction: [SubSectionNode | ParagraphNode]
}

export interface SubSectionNode {
	name: string
	introduction: [TextNode | ParagraphNode | FigureReferenceNode | ListNode]
}

export interface ParagraphNode {
	type: "paragraph"
	name: string
	contents: [TextNode | FigureReferenceNode | ListNode]
}

export interface TextNode {
	type: "text"
	content: [TextPlainNode | TextLinkNode]
}

export interface ListNode {
	type: "list"
	content: [TextNode]
	isOrdered?: boolean
}

export interface TextPlainNode {
	type: "plain_text"
	content: string
}

export interface TextLinkNode {
	type: "link_text"
	content: string
	link: string
	icon?: string
}

export interface FigureReferenceNode {
	type: "figure"
	id: string
}

export type ContentNodeTypes = ParagraphNode | TextNode | ListNode | FigureReferenceNode
