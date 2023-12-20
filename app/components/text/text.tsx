import type { TextNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface TextProps extends TextNode {
	children?: React.ReactNode
}

const Text: FunctionComponent<TextProps> = ({ type, content, children }) => {
	// return <span dangerouslySetInnerHTML={{ __html: content }} /> <= previous version

	return (
		<>
			{
		
			content.map((textNode, index) => {
				if (textNode.type == "plain_text") {
					return <span key={index}>{textNode.content}</span>
				} else if (textNode.type == "link_text") {
					return <a
						key={index}
						href={textNode.link}
						className="text-primary underline cursor-pointer hover:text-secondary"
					>
						{textNode.content}
					</a>
				}
			})
			}
		</>
	)
}

export default Text
