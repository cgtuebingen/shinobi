import { FigureStylingNode } from "@/types/node"
import { useRef, type FunctionComponent, useEffect } from "react"

interface VideoProps {
	urls: string[]
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const MultiVideo: FunctionComponent<VideoProps> = ({ urls, styling, children }) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const scaleContent = styling == undefined ? 1.0 : styling.scaleContent

	const videosRefs = useRef<HTMLVideoElement[]>([])
	const videoCurrentTime = useRef<number>(0)

	// Play all videos from the start
	const playAllVideosFromStart = () => {
		videosRefs.current.forEach((video, index) => {
			if (video) {
				video.currentTime = 0 // Reset the time
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
			className="relative w-full h-full grid"
			style={{
				gridTemplateColumns: `repeat(${urls.length}, minmax(0, 1fr))`,
				gap: "10px", // adjust the gap size as needed
			}}
		>
			{urls.map((url, index) => (
				<div key={index} className="w-full h-full">
					<video
						ref={(el) => (el ? (videosRefs.current[index] = el) : null)}
						autoPlay
						loop
						playsInline
						muted
						className="w-full h-full"
						style={{
							objectFit: "cover",
							borderRadius: roundedCorners ? "0.5rem" : "0",
						}}
					>
						<source src={url} type="video/mp4" />
					</video>
				</div>
			))}
			{children}
		</div>
	)
}

export default MultiVideo
