import React, { useRef, useEffect, useState } from "react"
import { canvasCover } from "@/utils/canvas_cover"
import { FigureStylingNode } from "@/types/node"

interface ComparableSwappableVideoProps {
	urls: string[]
	autoSwap?: boolean
	autoSwapInterval?: number // In milliseconds
	autoSwapSelectedCooldown?: number // In milliseconds
	onSelectedVideoChange?: (index: number) => void
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const ComparableSwappableVideo: React.FC<ComparableSwappableVideoProps> = ({
	urls,
	onSelectedVideoChange,
	autoSwap = true,
	autoSwapInterval = 3000,
	autoSwapSelectedCooldown = 10000,
	styling,
	children,
}) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners

	const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
	const [isAutoSwapping, setIsAutoSwapping] = useState(autoSwap)

	const canvasRef = useRef<HTMLCanvasElement>(null)
	const compareVideoRef = useRef<HTMLVideoElement>(null)
	const dividerPositionRef = useRef<number>(0.5)

	const videosRefs = useRef<HTMLVideoElement[]>([])
	const selectableVideosRefs = useRef<HTMLVideoElement[]>([])
	const videoCurrentTime = useRef<number>(0)
	const swapTimerRef = useRef<NodeJS.Timeout | null>(null)

	// Draw videos onto the canvas using the slider position
	useEffect(() => {
		const ctx = canvasRef.current?.getContext("2d")

		if (ctx) {
			const render = () => {
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
				//ctx.drawImage(video1Ref.current, 0, 0, ctx.canvas.width, ctx.canvas.height)

				if (videosRefs.current) {
					const [cx, cy, cw, ch, x, y, w, h] = canvasCover(ctx, videosRefs.current[0])
					ctx.drawImage(videosRefs.current[0], cx, cy, cw, ch, x, y, w, h)
				}

				if (videosRefs.current) {
					const [cx, cy, cw, ch, x, y, w, h] = canvasCover(ctx, videosRefs.current[selectedVideoIndex])
					ctx.drawImage(
						videosRefs.current[selectedVideoIndex],
						cx,
						cy,
						cw * dividerPositionRef.current,
						ch,
						x,
						y,
						w * dividerPositionRef.current,
						h,
					)
				}

				// Draw the divider
				ctx.fillStyle = "rgba(255,255,255,0.5)"
				ctx.fillRect(ctx.canvas.width * dividerPositionRef.current - 1, 0, 10, ctx.canvas.height)
				requestAnimationFrame(render)
			}
			render()
		}
	}, [videosRefs, selectedVideoIndex])

	// Event listener for mouse movement to update the divider position
	const handleMouseMove = (event: React.MouseEvent) => {
		// Get mouse position relative to the canvas
		const rect = canvasRef.current?.getBoundingClientRect()
		const x = event.clientX - rect!.left
		const y = event.clientY - rect!.top

		// Should be between 0 and 1
		const normalizedX = x / rect!.width

		// Update the divider position
		dividerPositionRef.current = normalizedX
	}

	// Auto-swap videos
	useEffect(() => {
		if (isAutoSwapping && urls.length > 1) {
			swapTimerRef.current = setInterval(() => {
				setSelectedVideoIndex((prevIndex) => {
					let newSelectedVideoIndex = (prevIndex + 1) % urls.length
					// Skip the first video as it is the video to compare against
					newSelectedVideoIndex = newSelectedVideoIndex == 0 ? 1 : newSelectedVideoIndex
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
			previousMainVideo.currentTime = newMainVideo.currentTime
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
		<div className="relative w-full" style={{ paddingTop: "56.25%" }} onPointerMove={handleMouseMove}>
			<canvas
				ref={canvasRef}
				width={1920}
				height={1080}
				className="absolute top-0 left-0 w-full h-full rounded-lg"
				style={{ zIndex: 1 }}
			></canvas>
			{urls.map((url, index) => (
				<video
					key={index}
					ref={(el) => (el ? (videosRefs.current[index] = el) : null)}
					autoPlay
					loop
					playsInline
					muted
					className={objectFit == "cover" ? "absolute top-0 left-0 w-full h-full" : ""}
					style={{
						objectFit: "cover",
						zIndex: 0,
						//transition: index === selectedVideoIndex ? "none" : "opacity 500ms ease-in-out",
						//opacity: index === selectedVideoIndex ? 1 : 0,
						//zIndex: index === selectedVideoIndex ? 0 : 1,
						// borderRadius: roundedCorners ? "0.5rem" : "0",
					}}
				>
					<source src={url} type="video/mp4" />
				</video>
			))}
			<div className="absolute bottom-2 right-2 flex flex-row space-x-1.5">
				{urls.map((url, index) => {
					if (index != 0) {
						return (
							<video
								key={index}
								onClick={() => handleVideoSelect(index)}
								ref={(el) => (el ? (selectableVideosRefs.current[index] = el) : null)}
								autoPlay
								loop
								playsInline
								muted
								className="w-16 h-16 cursor-pointer shadow-lg border-2"
								style={{
									objectFit: "cover",
									filter: index === selectedVideoIndex ? "grayscale(100%)" : "none",
									borderColor: index === selectedVideoIndex ? "#fff" : "rgba(255, 255, 255, 0.5)",
									zIndex: 2,
									borderRadius: roundedCorners ? "0.5rem" : "0",
								}}
							>
								<source src={url} type="video/mp4" />
							</video>
						)
					}
				})}
			</div>
			{/* <video
				ref={compareVideoRef}
				autoPlay
				loop
				muted
				playsInline
				className="absolute top-0 left-0 w-full h-full opacity-0"
				style={{ objectFit: "cover" }}
			>
				<source src={videoSrc1} type="video/mp4" />
			</video> */}
		</div>
	)
}

export default ComparableSwappableVideo
