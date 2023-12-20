import type { SectionNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface SectionhProps extends SectionNode {
	children?: React.ReactNode
}

const Section: FunctionComponent<SectionhProps> = ({ name, introduction, children }) => {
	return (
		<div className="space-y-8">
			<h2 className="text-primary font-sans text-xl font-semibold">{name}</h2>
			<div className="prose mt-3">
				<p className="text-justify block"></p>
			</div>
		</div>
	)
}

export default Section
