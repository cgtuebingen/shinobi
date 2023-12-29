import type { FigureNode, ParagraphNode } from "@/types/node"
import { type FunctionComponent } from "react"
import Content from "../content/content"

interface ParagraphProps extends ParagraphNode {
	children?: React.ReactNode
	figures?: Record<string, FigureNode>
}

const Paragraph: FunctionComponent<ParagraphProps> = ({ name, contents, children, figures }) => {
	return (
		<div className="prose mt-3 pb-6">
			<Content name={name} contents={contents} figures={figures} isInParagraph />
		</div>
	)
}

export default Paragraph
