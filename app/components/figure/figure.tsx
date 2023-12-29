import { useState, type FunctionComponent } from "react"
import Paragraph from "../paragraph/paragraph"
import { type FigureNode } from "@/types/node"
import Video from "../video/video"
import SwapableVideo from "../video/swappable_video"
import SwappableVideo from "../video/swappable_video"
import MultiVideo from "../video/multi_video"
import BlurVideo from "../video/blurVideo"
import Youtube from "../youtube/youtube"
import Content from "../content/content"

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
		<div className={"pt-4"} style={{ filter: isTODO ? "blur(30px)" : "none" }}>
			{type === "video" && <Video url={urls[0]} styling={styling} />}
			{type === "youtube" && <Youtube url={urls[0]} styling={styling} />}
			{type === "multi_video" && <MultiVideo urls={urls} styling={styling} captions={captions} />}
			{type === "blur_video" && <BlurVideo url={urls[0]} styling={styling} />}
			{type === "swappable_video" && (
				<SwappableVideo
					urls={urls}
					onSelectedVideoChange={(index) => setTimeout(() => setSelectedIndex(index), 0)}
					styling={styling}
				/>
			)}
			{/* make text smaller when on phones and below certain width */}
			{captions && captions[selectedIndex] && type != "multi_video" && (
				<div className="text-xs sm:text-base  md:text-base pt-2">
					<Content name={"Caption"} contents={captions[selectedIndex]} />
				</div>
			)}
			{children}
		</div>
	)
}

export default Figure
