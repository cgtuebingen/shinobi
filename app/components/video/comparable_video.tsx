import React, { useRef, useEffect, useState } from "react"
import { canvasCover } from "@/utils/canvas_cover"

interface ComparableVideoProps {
	videoSrc1: string
	videoSrc2: string
}

const ComparableVideo: React.FC<ComparableVideoProps> = ({ videoSrc1, videoSrc2 }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const video1Ref = useRef<HTMLVideoElement>()
	const video2Ref = useRef<HTMLVideoElement>()
	const dividerPositionRef = useRef<number>(0.5)

	// Draw videos onto the canvas using the slider position
	useEffect(() => {
		const ctx = canvasRef.current?.getContext("2d")

		if (ctx) {
			const render = () => {
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
				// ctx.drawImage(video1Ref.current, 0, 0, ctx.canvas.width, ctx.canvas.height)

				if (video1Ref.current) {
					const [cx, cy, cw, ch, x, y, w, h] = canvasCover(ctx, video1Ref.current)
					ctx.drawImage(video1Ref.current, cx, cy, cw, ch, x, y, w, h)
				}

				if (video2Ref.current) {
					const [cx, cy, cw, ch, x, y, w, h] = canvasCover(ctx, video2Ref.current)
					ctx.drawImage(
						video2Ref.current,
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
	}, [])

	// Event listener for mouse movement to update the divider position
	const handleMouseMove = (event: React.MouseEvent) => {
		const rect = canvasRef.current?.getBoundingClientRect()
		const x = event.clientX - rect!.left
		const y = event.clientY - rect!.top

		// Should be between 0 and 1
		const normalizedX = x / rect!.width

		// Update the divider position
		dividerPositionRef.current = normalizedX
	}
	return (
		<div className="relative w-full" style={{ paddingTop: "56.25%" }} onPointerMove={handleMouseMove}>
			<canvas
				ref={canvasRef}
				width={1920}
				height={1080}
				className="absolute top-0 left-0 w-full h-full rounded-lg"
			></canvas>
			<video
				ref={video1Ref}
				autoPlay
				loop
				muted
				playsInline
				className="absolute top-0 left-0 w-full h-full opacity-0"
				style={{ objectFit: "cover" }}
			>
				<source src={videoSrc1} type="video/mp4" />
			</video>
			<video
				ref={video2Ref}
				autoPlay
				loop
				playsInline
				muted
				className="absolute top-0 left-0 w-full h-full opacity-0"
				style={{ objectFit: "cover" }}
			>
				<source src={videoSrc2} type="video/mp4" />
			</video>
		</div>
	)
}

export default ComparableVideo
