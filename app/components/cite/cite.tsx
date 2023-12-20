import type { CiteNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface CiteProps extends CiteNode {
	children?: React.ReactNode
}

const Cite: FunctionComponent<CiteProps> = ({ type, index, reference, children }) => {
	return (
		<code>
			{"["}
			{index.map((value, idx) => {
				if (idx === 0) {
					return (
						<a
							data-tooltip-id="cite-tooltip"
							data-tooltip-content={reference}
							data-tooltip-place="top"
							style={{ textDecoration: "none", cursor: "pointer" }}
						>
							{value}
						</a>
					)
				} else {
					return (
						<>
							{","}
							<a
								style={{ textDecoration: "none", cursor: "pointer" }}
								data-tooltip-id="cite-tooltip"
								data-tooltip-content={reference}
								data-tooltip-place="top"
							>
								{value}
							</a>
						</>
					)
				}
			})}
			{"]"}
		</code>
	)
}

export default Cite
