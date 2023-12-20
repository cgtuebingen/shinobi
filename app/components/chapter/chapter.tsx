import { type FunctionComponent } from "react"
import Paragraph from "../paragraph/paragraph"
import type { ChapterNode, FigureNode } from "@/types/node"
import Content from "../content/content"

interface ChapterProps extends ChapterNode {
	children?: React.ReactNode
	figures?: Record<string, FigureNode>
}

const Chapter: FunctionComponent<ChapterProps> = ({ name, introduction, sections, paragraphs, figures, children }) => {
	return (
		<>
			<div className="space-y-3 pt-16">
				<h1 className="text-primary font-sans text-xl font-bold">{name}</h1>
				<p className="text-justify block  font-normal "></p>{" "}
				{/* FIXME: Bad practice just for spacing for now */}
				<Content name={name} contents={introduction} figures={figures} />
				{children}
			</div>
			<div className="space-y-10 pt-10 text-secondary">
				<div className="space-y-8">
					{paragraphs &&
						paragraphs.length > 0 &&
						paragraphs.map((paragraph, index) => {
							return <Paragraph key={paragraph.name} {...paragraph} figures={figures} />
						})}
				</div>
			</div>
		</>
	)
}

export default Chapter
