import { FigureStylingNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface VideoProps {
	url: string
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const Video: FunctionComponent<VideoProps> = ({ url, styling, children }) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const scaleContent = styling == undefined ? 1.0 : styling.scaleContent
	const showControls = styling == undefined ? false : styling.showControls
	const objectFit = styling == undefined ? "cover" : styling.objectFit

	return (
		<div className="relative w-full" style={{ paddingTop: objectFit == "cover" ? "56.25%" : 0 }}>
			<video
				autoPlay
				loop
				controls={showControls}
				//@ts-ignore
				playsInline
				muted
				className={objectFit == "cover" ? "absolute top-0 left-0 w-full h-full" : ""}
				style={{
					objectFit: objectFit,
					borderRadius: roundedCorners ? "0.5rem" : "0",
					transform: `scale(${scaleContent})`,
				}}
			>
				<source src={url} type="video/mp4" data-src={url} />
			</video>
		</div>
	)
}

export default Video
