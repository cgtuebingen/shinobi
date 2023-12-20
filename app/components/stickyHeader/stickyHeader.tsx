// components/StickyHeader.tsx
import { LinkNode } from "@/types/node"
import React from "react"

interface StickyHeaderProps {
	title: string
	links: LinkNode[] // Assuming LinkNode is the type for your links
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ title, links }) => {
	return (
		<div className="sticky top-0 " style={{ zIndex: 100 }}>
			<div
				className="absolute w-full bg-white/80 backdrop-blur-lg border-b border-gray-200"
				style={{ zIndex: 100 }}
			>
				<div className=" mx-auto w-full max-w-4xl px-4 py-2 md:px-8 flex flex-row justify-between">
					<p className="text-justify block  font-bold  text-lg">{title}</p>
					<div className="flex flex-row space-x-4 justify-center items-center">
						{links &&
							links.map((link) => (
								<a
									key={link.name}
									href={link.link}
									className="text-secondary font-normal  cursor-pointer text-inherit  text-center hover:underline"
								>
									{link.name}
								</a>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default StickyHeader
