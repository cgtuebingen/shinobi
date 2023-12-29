import React, { useRef, useEffect, type FunctionComponent, useState } from "react"

import { FigureStylingNode, TextNode, ListNode } from "@/types/node"
import Video from "./video"
import Content from "../content/content"

interface MultiVideoProps {
	urls: string[]
	captions?: [TextNode | ListNode][]
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const MultiVideo: FunctionComponent<MultiVideoProps> = ({ urls, captions, styling, children }) => {
	const videosRefs = useRef<HTMLVideoElement[]>([])
	const videoCurrentTime = useRef<number>(0)
	const [hoveredVideoIndex, setHoveredVideoIndex] = useState(-1)

	// Play all videos from the start
	const playAllVideosFromStart = () => {
		videosRefs.current.forEach((video, index) => {
			if (video) {
				video.currentTime = 0 // Reset the time
				video.play()
			}
		})
	}

	// Synchronize videos at the end of each loop
	useEffect(() => {
		const mainVideo = videosRefs.current[0]

		if (mainVideo) {
			const handleTimeUpdate = () => {
				if (videoCurrentTime.current > mainVideo.currentTime) {
					playAllVideosFromStart()
				}
				videoCurrentTime.current = mainVideo.currentTime
			}
			mainVideo.addEventListener("timeupdate", handleTimeUpdate)
			return () => {
				mainVideo.removeEventListener("timeupdate", handleTimeUpdate)
			}
		}
	})

	return (
		<div
			className={
				"relative grid w-full text-xs sm:text-base  md:text-base lg:text-base xl:text-base 2xl:text-base gap-2"
			}
			style={{
				gridTemplateColumns: `repeat(${urls.length}, minmax(0, 1fr))`,
			}}
		>
			{urls.map((url, index) => (
				<Video
					key={index}
					url={url}
					styling={styling}
					ref={(el) => {
						if (el) videosRefs.current[index] = el
					}}
					onHover={(hover) => {
						setHoveredVideoIndex(hover ? index : -1)
					}}
				/>
			))}
			{urls.map(
				(url, index) =>
					captions &&
					captions[index] && (
						<Content key={"caption_" + index} name={"Caption_" + index} contents={captions[index]} />
					),
			)}

			{children}
		</div>
	)
}

export default MultiVideo
