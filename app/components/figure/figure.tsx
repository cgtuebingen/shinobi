import { useState, type FunctionComponent } from "react"
import Paragraph from "../paragraph/paragraph"
import { type FigureNode } from "@/types/node"
import Video from "../video/video"
import SwapableVideo from "../video/swappable_video"
import SwappableVideo from "../video/swappable_video"
import MultiVideo from "../video/multi_video"
import BlurVideo from "../video/blurVideo"

interface FigureProps extends FigureNode {
	children?: React.ReactNode
	isTODO?: boolean
	isInsideTextBlock?: boolean
}

const Figure: FunctionComponent<FigureProps> = ({
	urls,
	type,
	captions,
	styling,
	children,
	isTODO = false,
	isInsideTextBlock = false,
}) => {
	const [selectedIndex, setSelectedIndex] = useState(0)

	return (
		<div
			className="space-y-3 pb-10"
			style={{ paddingTop: isInsideTextBlock ? "1rem" : "0px", filter: isTODO ? "blur(30px)" : "none" }}
		>
			{type === "video" && <Video url={urls[0]} styling={styling} />}
			{type === "multi_video" && <MultiVideo urls={urls} styling={styling} />}
			{type === "blur_video" && <BlurVideo url={urls[0]} styling={styling} />}
			{type === "swappable_video" && (
				<SwappableVideo
					urls={urls}
					onSelectedVideoChange={(index) => setSelectedIndex(index)}
					styling={styling}
				/>
			)}
			{captions && <Paragraph key={captions[selectedIndex].name} {...captions[selectedIndex]}></Paragraph>}
			{children}
		</div>
	)
}

export default Figure
