import Icon from "@/icons/icon"
import { type LinkNode } from "@/types/node"
import { type FunctionComponent } from "react"
import * as gtag from "@/utils/gtags.client"

interface LinkProps extends LinkNode {
	children?: React.ReactNode
}

const Link: FunctionComponent<LinkProps> = ({ link, name, icon, styling, children }) => {
	return (
		<button
			className="flex flex-row items-center space-x-2 rounded-full pl-2 pr-3 py-1 bg-black bg-opacity-70 hover:bg-opacity-80 transition duration-200 ease-in-out cursor-pointer dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-20 "
			onClick={() => {
				window.open(link, "_blank")

				gtag.event({
					category: "Link",
					action: "custom_click",
					label: name,
				})
			}}
		>
			<Icon className="w-5 h-5" name={icon} constant="white" />
			<span className="text-m  text-white">{name}</span>
		</button>
	)
}

export default Link
