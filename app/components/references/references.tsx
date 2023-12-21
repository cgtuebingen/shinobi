import { ReferencesNode } from "@/types/node"
import { type FunctionComponent, useRef, useState } from "react"
import Content from "../content/content"

interface ReferencesProps extends ReferencesNode {
	children?: React.ReactNode
}

const References: FunctionComponent<ReferencesProps> = ({ name, content, children }) => {
	return (
		<>
			<div className="space-y-3 pt-16">
				<h1 className="text-primary font-sans text-xl font-bold dark:text-white">{"References"}</h1>
				<p className="text-justify block font-normal "></p> {/* FIXME: Bad practice just for spacing for now */}
				{content.map((reference, index) => (
					<p className="text-primary text-justify block font-normal dark:text-white" key={index}>
						{" "}
						{"[" + reference.enum + "]"} {reference.text}{" "}
					</p>
				))}
				{children}
			</div>
		</>
	)
}

export default References
