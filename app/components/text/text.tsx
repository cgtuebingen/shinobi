import type { TextNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface TextProps extends TextNode {
	children?: React.ReactNode
}

const Text: FunctionComponent<TextProps> = ({ type, content, children }) => {
	// return <span dangerouslySetInnerHTML={{ __html: content }} /> <= previous version
	return <span>{content}</span>
}

export default Text
