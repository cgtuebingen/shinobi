import type { TextNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface TextProps extends TextNode {
	children?: React.ReactNode
}

const Text: FunctionComponent<TextProps> = ({ content }) => {

	return (
		<>
			{
				content.map((textNode, index) => {
					if (textNode.type == "plain_text") {
						return <span key={index}>{textNode.content}   </span>
					} else if (textNode.type == "link_text") {
						return textNode.icon ? (
							<button
								className="flex flex-row items-center space-x-1.5 rounded-full pl-1.5 pr-3 py-1 bg-black bg-opacity-90 hover:bg-opacity-80"
								onClick={() => {
									window.open(textNode.link, "_blank")
								}}
							>
								<img src={"/icons/" + textNode.icon + ".svg"} />
								<span className=" text-white">{textNode.content}</span>
							</button>
						) : (
							<a
								key={index}
								href={textNode.link}
								className="text-primary underline cursor-pointer hover:text-secondary"
							>
								{textNode.content}
							</a>
						)
					}
				})
			}
		</>
	)
}

export default Text
