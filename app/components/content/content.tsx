import type { ContentNodeTypes, FigureNode } from "@/types/node"
import { type FunctionComponent } from "react"
import Text from "../text/text"
import Cite from "../cite/cite"
import LineBreak from "../lineBreak/lineBreak"
import Paragraph from "../paragraph/paragraph"
import Figure from "../figure/figure"
import List from "../list/list"

interface ContentProps {
	name: string
	contents: ContentNodeTypes[]
	children?: React.ReactNode
	figures?: Record<string, FigureNode>
	isInParagraph?: boolean
}

const Content: FunctionComponent<ContentProps> = ({ name, contents, children, figures, isInParagraph = false }) => {
	return (
		<>
			{contents.map((content, index) => {
				if (content.type === "text") {
					return (
						<p
							key={name + "_text_" + index}
							className="text-justify block font-normal text-primary dark:text-white"
						>
							{isInParagraph && index === 0 && (
								<>
									<strong>{name}</strong>
									{" — "}
								</>
							)}
							<Text {...content} />
						</p>
					)
				} else if (content.type === "paragraph") {
					return <Paragraph key={name + "paragraph" + index} {...content} />
				} else if (content.type === "list") {
					return <List key={name + "list" + index} {...content} />
				} else if (content.type === "figure") {
					if (figures && figures[content.id]) {
						// TODO: This should be fiexed in the future
						return (
							<div key={name + "_figure_" + index} className="text-primary dark:text-white">
								{isInParagraph && index === 0 && (
									<strong key={"hedaing_figure_" + index}>{name}</strong>
								)}
								<Figure key={name + "_figure_" + index} {...figures[content.id]} isInsideTextBlock />
							</div>
						)
					}
				} else {
					return <p key={name + "_" + index}> Error </p>
				}
			})}
		</>
	)
}

export default Content
