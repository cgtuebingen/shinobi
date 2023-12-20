import { FigureStylingNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface YoutubeProps {
	url: string
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const Youtube: FunctionComponent<YoutubeProps> = ({ url, styling, children }) => {
	return (
		<div className="relative w-full" style={{ paddingBottom: "56.25%", overflow: "hidden", height: 0 }}>
			<iframe
				width="853"
				height="480"
				className="absolute top-0 left-0 w-full h-full"
				src={url}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				frameBorder="0"
			></iframe>
		</div>
	)
}

export default Youtube
