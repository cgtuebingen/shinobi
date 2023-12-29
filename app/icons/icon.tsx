import { type FunctionComponent } from "react"
import GithubIcon from "./github"
import ArxivIcon from "./arxiv"
import YoutubeIcon from "./youtube"
import SuccessIcon from "./success"
import CopyIcon from "./copy"
import TwitterIcon from "./twitter"
import BibtexIcon from "./bibtex"
import ResultsIcon from "./results"

interface IconProps {
	name: string
	inverted?: boolean
	children?: React.ReactNode
	className?: string
	constant?: "white" | "black" | "default"
}

export interface ChildrenIconProps {
	children?: React.ReactNode
}

const Icon: FunctionComponent<IconProps> = ({ name, inverted, children, className, constant = "default" }) => {
	let color = inverted ? "fill-white dark:fill-black" : "fill-black dark:fill-white"
	color = constant === "white" ? "fill-white" : color
	color = constant === "black" ? "fill-black" : color
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className={color + " " + className}
			xmlns="http://www.w3.org/2000/svg"
		>
			{name === "github" && <GithubIcon />}
			{name === "arxiv" && <ArxivIcon />}
			{name === "youtube" && <YoutubeIcon />}
			{name === "success" && <SuccessIcon />}
			{name === "copy" && <CopyIcon />}
			{name === "twitter" && <TwitterIcon />}
			{name === "bibtex" && <BibtexIcon />}
			{name === "results" && <ResultsIcon />}
			{children}
		</svg>
	)
}

export default Icon
