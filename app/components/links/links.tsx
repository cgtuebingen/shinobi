import { type LinkNode } from "@/types/node"
import { type FunctionComponent } from "react"
import Link from "../link/link"

interface LinksProps {
	links: LinkNode[]
	children?: React.ReactNode
}

const Links: FunctionComponent<LinksProps> = ({ links, children }) => {
	return (
		<div className="w-full flex flex-wrap justify-center items-center gap-5">
			{links.map((link, index) => {
				const includeInHeader = link.styling ? link.styling.includeInHeader : true
				if (includeInHeader) {
					return <Link key={link.name} {...link} />
				} else {
					return null
				}
			})}
		</div>
	)
}

export default Links
