import React, { forwardRef } from "react"
import { FigureStylingNode } from "@/types/node"

interface VideoProps {
	url: string
	classNameDiv?: string
	classNameVideo?: string
	styling?: FigureStylingNode
	children?: React.ReactNode
	onHover?: (hover: boolean) => void
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
	({ url, classNameDiv, classNameVideo, styling, children, onHover }, ref) => {
		const roundedCorners = styling?.roundedCorners ?? true
		const showControls = styling?.showControls ?? false
		const objectFit = styling?.objectFit ?? "cover"
		const scaleContent = styling?.scaleContent ?? 1

		return (
			<div
				className={classNameDiv ? classNameDiv : "w-full h-full overflow-hidden"}
				onMouseEnter={() => onHover && onHover(true)}
				onMouseLeave={() => onHover && onHover(false)}
				onTouchStart={() => onHover && onHover(true)}
				onTouchEnd={() => onHover && onHover(false)}
				style={{ borderRadius: roundedCorners ? "0.5rem" : "0" }}
			>
				<video
					autoPlay
					loop
					controls={showControls}
					playsInline
					muted
					className={classNameVideo ? classNameVideo : "w-full h-full"}
					style={{
						objectFit: objectFit,
						transform: `scale(${scaleContent})`,
						transformOrigin: "center center",
					}}
					ref={ref}
				>
					<source src={url} type="video/mp4" />
				</video>
			</div>
		)
	},
)

export default Video
