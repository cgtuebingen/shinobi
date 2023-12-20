import { AcknowledgementsNode, CitationNode } from "@/types/node"
import { type FunctionComponent, useRef, useState } from "react"
import Content from "../content/content"

interface AcknowledgementsProps extends AcknowledgementsNode {
	children?: React.ReactNode
}

const Acknowledgements: FunctionComponent<AcknowledgementsProps> = ({ name, content, children }) => {
	return (
		<>
			<div className="space-y-3 pt-16">
				<h1 className="text-primary font-sans text-xl font-bold">{"Acknowledgements"}</h1>
				<p className="text-justify block font-normal "></p> {/* FIXME: Bad practice just for spacing for now */}
				<Content name={name} contents={content} />
				{children}
			</div>
		</>
	)
}

export default Acknowledgements
