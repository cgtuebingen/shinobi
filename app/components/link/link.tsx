import { type LinkNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface LinkProps extends LinkNode {
	children?: React.ReactNode
}

const Link: FunctionComponent<LinkProps> = ({ link, name, icon, children }) => {
	return (
		<button
			className="flex flex-row items-center space-x-1.5 rounded-full pl-1.5 pr-3 py-1 bg-black bg-opacity-90 hover:bg-opacity-80"
			onClick={() => {
				window.open(link, "_blank")
			}}
		>
			<img src={"/icons/" + icon + ".svg"} />
			<span className="text-m  text-white">{name}</span>
		</button>
	)
}

export default Link
