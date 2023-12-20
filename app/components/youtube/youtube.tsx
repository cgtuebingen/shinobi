import { FigureStylingNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface YoutubeProps {
	url: string
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const Video: FunctionComponent<YoutubeProps> = ({ url, styling, children }) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const scaleContent = styling == undefined ? 1.0 : styling.scaleContent
	const showControls = styling == undefined ? false : styling.showControls

	return (
		<div className="relative w-full" style={{ paddingTop: "56.25%" }}>
			{/* <iframe width="560" height="315" src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>*/}
		</div> 
	)
}

export default Video
