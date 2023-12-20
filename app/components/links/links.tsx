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
				return <Link key={link.name} {...link} />
			})}
		</div>
	)
}

export default Links
