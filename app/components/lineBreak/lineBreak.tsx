import type { LineBreakNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface LineBreakProps extends LineBreakNode {
	children?: React.ReactNode
}

const LineBreak: FunctionComponent<LineBreakProps> = ({ type, children }) => {
	return (
		<>
			<br /> <br />
		</>
	)
}

export default LineBreak
