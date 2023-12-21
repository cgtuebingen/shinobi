import type { TextNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface TextProps extends TextNode {
	children?: React.ReactNode
}

const Text: FunctionComponent<TextProps> = ({ content }) => {
	return (
		<>
			{content.map((textNode, index) => {
				if (textNode.type == "plain_text") {
					return <span key={index}>{textNode.content} </span>
				} else if (textNode.type == "link_text") {
					return textNode.icon ? (
						<button
							className="flex flex-row items-center space-x-1.5 rounded-full pl-1.5 pr-3 py-1 bg-black bg-opacity-90 hover:bg-opacity-80 dark:bg-white dark:bg-opacity-5 dark:hover:bg-opacity-80 dark:text-black transition duration-200 ease-in-out cursor-pointer"
							onClick={() => {
								window.open(textNode.link, "_blank")
							}}
						>
							<img src={"/icons/" + textNode.icon + ".svg"} />
							<span className=" text-white dark:text-black">{textNode.content}</span>
						</button>
					) : (
						<a
							key={index}
							href={textNode.link}
							className="text-primary underline cursor-pointer hover:text-secondary dark:text-white dark:hover:text-white dark:hover:text-opacity-80"
						>
							{textNode.content}
						</a>
					)
				}
			})}
		</>
	)
}

export default Text
