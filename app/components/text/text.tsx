import Icon from "@/icons/icon"
import type { TextNode } from "@/types/node"
import { type FunctionComponent } from "react"
import * as gtag from "@/utils/gtags.client"

interface TextProps extends TextNode {
	children?: React.ReactNode
}

const Text: FunctionComponent<TextProps> = ({ content }) => {
	return (
		<>
			{content.map((textNode, index) => {
				if (textNode.type == "plain_text") {
					return <span key={index}>{textNode.content} </span>
				}
				if (textNode.type == "link_text") {
					return (
						<a
							key={index}
							href={textNode.link}
							className="group text-primary font-sans underline cursor-pointer text-inherit text-center text-opacity-70 hover:text-opacity-100 dark:text-white dark:text-opacity-80 dark:hover:text-white dark:hover:text-opacity-100 transition duration-200 ease-in-out"
							onClick={() => {
								if (textNode.gtag_label) {
									gtag.event({
										category: "Link",
										action: "custom_click",
										label: textNode.gtag_label,
									})
								}
							}}
						>
							{textNode.icon && (
								<Icon
									className="w-6 h-6 inline-block opacity-70 pb-0.5 group-hover:opacity-100 transition-opacity duration-200 ease-in-out "
									name={textNode.icon}
								/>
							)}
							{textNode.content}
						</a>
					)
				}
				if (textNode.type == "bold_text") {
					return (
						<span key={index} className=" text-primary font-medium dark:text-white inline-block">
							{textNode.content}
						</span>
					)
				}
				if (textNode.type == "enumerate_text") {
					return (
						<span
							key={index}
							className=" bg-black bg-opacity-70 rounded-full w-4 h-4 inline-block dark:bg-white"
						>
							<span className="flex items-center w-full h-full pt-1">
								<span
									className="text-white dark:text-black text-xs  text-center w-full"
									style={{ transform: "translate(0, -0.1rem)" }}
								>
									{textNode.content}
								</span>
							</span>
						</span>
					)
				}
			})}
		</>
	)
}

export default Text
