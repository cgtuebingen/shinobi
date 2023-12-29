import { FigureStylingNode } from "@/types/node"
import { useState, useRef, useEffect, type FunctionComponent } from "react"

interface SwappableVideoProps {
	urls: string[]
	autoSwap?: boolean
	autoSwapInterval?: number // In milliseconds
	autoSwapSelectedCooldown?: number // In milliseconds
	onSelectedVideoChange?: (index: number) => void
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const SwappableVideo: FunctionComponent<SwappableVideoProps> = ({
	urls,
	onSelectedVideoChange,
	autoSwap = true,
	autoSwapInterval = 3000,
	autoSwapSelectedCooldown = 10000,
	styling,
	children,
}) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const objectFit = styling == undefined ? "cover" : styling.objectFit

	const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
	const [isAutoSwapping, setIsAutoSwapping] = useState(autoSwap)

	const videosRefs = useRef<HTMLVideoElement[]>([])
	const selectableVideosRefs = useRef<HTMLVideoElement[]>([])
	const videoCurrentTime = useRef<number>(0)
	const swapTimerRef = useRef<NodeJS.Timeout | null>(null)

	// Auto-swap videos
	useEffect(() => {
		if (isAutoSwapping && urls.length > 1) {
			swapTimerRef.current = setInterval(() => {
				setSelectedVideoIndex((prevIndex) => {
					const newSelectedVideoIndex = (prevIndex + 1) % urls.length
					if (onSelectedVideoChange) {
						onSelectedVideoChange(newSelectedVideoIndex)
					}
					return newSelectedVideoIndex
				})
			}, autoSwapInterval)

			return () => {
				if (swapTimerRef.current) {
					clearInterval(swapTimerRef.current)
				}
			}
		}
	}, [isAutoSwapping, autoSwapInterval, urls.length, onSelectedVideoChange])

	// Play all videos from the start
	const playAllVideosFromStart = () => {
		videosRefs.current.forEach((video, index) => {
			if (video) {
				video.currentTime = 0 // Reset the time
			}
		})

		selectableVideosRefs.current.forEach((video) => {
			if (video) {
				video.currentTime = 0 // Reset the time
			}
		})
	}

	// Pause all videos
	const pauseAllVideos = () => {
		videosRefs.current.forEach((video) => {
			if (video) {
				video.pause()
			}
		})

		selectableVideosRefs.current.forEach((video) => {
			if (video) {
				video.pause()
			}
		})
	}

	// Resume all videos
	const resumeAllVideos = () => {
		videosRefs.current.forEach((video) => {
			if (video) {
				video.play()
			}
		})

		selectableVideosRefs.current.forEach((video) => {
			if (video) {
				video.play()
			}
		})
	}

	// Handle video selection
	const handleVideoSelect = (index: number) => {
		if (isAutoSwapping) {
			setIsAutoSwapping(false)
			// After 2 seconds, resume auto-swapping
			setTimeout(() => {
				setIsAutoSwapping(true)
			}, autoSwapSelectedCooldown)
		}

		if (index === selectedVideoIndex) {
			return
		}

		const previousMainVideo = videosRefs.current[selectedVideoIndex]
		const newMainVideo = videosRefs.current[index]

		// Set time of previous main video to the time of the new main video
		if (previousMainVideo) {
			const clickTimeOffset = 0.05
			previousMainVideo.currentTime = newMainVideo.currentTime + clickTimeOffset
		}
		setSelectedVideoIndex(index)

		if (onSelectedVideoChange) {
			onSelectedVideoChange(index)
		}
	}

	// Synchronize videos at the end of each loop
	useEffect(() => {
		const mainVideo = videosRefs.current[selectedVideoIndex]

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
	}, [selectedVideoIndex]) // Rerun this effect when the selected video changes

	return (
		<div className="relative w-full" style={{ paddingTop: objectFit == "cover" ? "56.25%" : 0 }}>
			{urls.map((url, index) => (
				<video
					key={index}
					ref={(el) => (el ? (videosRefs.current[index] = el) : null)}
					onMouseDown={pauseAllVideos}
					onMouseUp={resumeAllVideos}
					onTouchStart={pauseAllVideos}
					onTouchEnd={resumeAllVideos}
					onMouseLeave={resumeAllVideos}
					autoPlay
					loop
					playsInline
					muted
					className={objectFit == "cover" ? "absolute top-0 left-0 w-full h-full" : ""}
					style={{
						objectFit: objectFit,
						transition: index === selectedVideoIndex ? "none" : "opacity 500ms ease-in-out",
						opacity: index === selectedVideoIndex ? 1 : 0,
						zIndex: index === selectedVideoIndex ? 0 : 1,
						borderRadius: roundedCorners ? "0.5rem" : "0",
					}}
				>
					<source src={url} type="video/mp4" />
				</video>
			))}
			<div className="absolute bottom-2 right-2 flex flex-row space-x-1.5">
				{urls.map((url, index) => (
					<video
						key={index}
						onClick={() => handleVideoSelect(index)}
						ref={(el) => (el ? (selectableVideosRefs.current[index] = el) : null)}
						autoPlay
						loop
						playsInline
						muted
						className="cursor-pointer shadow-lg border-2   md:w-16 md:h-16  w-12 h-12"
						style={{
							objectFit: objectFit,
							filter: index === selectedVideoIndex ? "grayscale(100%)" : "none",
							borderColor: index === selectedVideoIndex ? "#fff" : "rgba(255, 255, 255, 0.5)",
							zIndex: 2,
							borderRadius: roundedCorners ? "0.5rem" : "0",
						}}
					>
						<source src={url} type="video/mp4" />
					</video>
				))}
			</div>
		</div>
	)
}

export default SwappableVideo
