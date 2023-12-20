import { FigureStylingNode } from "@/types/node"
import { useRef, type FunctionComponent, useEffect } from "react"

interface BlurVideoProps {
	url: string
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const BlurVideo: FunctionComponent<BlurVideoProps> = ({ url, styling, children }) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const scaleContent = styling == undefined ? 1.0 : styling.scaleContent
	const showControls = styling == undefined ? false : styling.showControls
	const objectFit = styling == undefined ? "cover" : styling.objectFit

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
		<div className="relative w-full" style={{ paddingTop: objectFit == "cover" ? "56.25%" : 0 }}>
			<video
				autoPlay
				loop
				controls={showControls}
				//@ts-ignore
				playsInline
				muted
				ref={(el) => (el ? (videosRefs.current[0] = el) : null)}
				className={objectFit == "cover" ? "absolute top-0 left-0 w-full h-full" : ""}
				style={{
					zIndex: 1,
					objectFit: objectFit,
					borderRadius: roundedCorners ? "0.5rem" : "0",
					transform: `scale(${scaleContent})`,
				}}
			>
				<source src={url} type="video/mp4" data-src={url} />
			</video>
			<video
				autoPlay
				loop
				//@ts-ignore
				playsInline
				muted
				ref={(el) => (el ? (videosRefs.current[1] = el) : null)}
				className={objectFit == "cover" ? "absolute top-0 left-0 w-full h-full" : ""}
				style={{
					zIndex: 0,
					objectFit: "cover",
					borderRadius: roundedCorners ? "0.5rem" : "0",
					transform: `scale(1.03)`,
					filter: "blur(25px)",
				}}
			>
				<source src={url} type="video/mp4" data-src={url} />
			</video>
			{children}
		</div>
	)
}

export default BlurVideo
