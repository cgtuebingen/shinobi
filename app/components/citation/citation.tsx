import { CitationNode } from "@/types/node"
import { type FunctionComponent, useRef, useState } from "react"

interface CitationProps extends CitationNode {
	children?: React.ReactNode
}

const Citation: FunctionComponent<CitationProps> = ({ type, name, authors, title, booktitle, year }) => {
	const citationRef = useRef<HTMLDivElement>(null)
	const [isCopied, setIsCopied] = useState(false)

	const copyToClipboard = async () => {
		if (citationRef && citationRef.current) {
			try {
				const text = citationRef.current.textContent
				if (!text) throw new Error("No text to copy")
				await navigator.clipboard.writeText(text)
				setIsCopied(true)
			} catch (err) {
				console.error("Failed to copy text to clipboard", err)
			}
		}
	}

	return (
		<div className="space-y-3 pt-16">
			<h1 className="text-primary font-sans text-xl font-bold">Citation</h1>

			<div className="group relative rounded-lg bg-black bg-opacity-5 hover:bg-opacity-10 transition duration-200 ease-in-out p-2">
				<button
					onClick={() => {
						copyToClipboard()
						setTimeout(() => setIsCopied(false), 2000)
					}}
					onMouseLeave={() => setIsCopied(false)}
					className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-2 rounded-lg bg-black text-white transition duration-200 ease-in-out cursor-pointer z-10 hover:bg-opacity-80"
				>
					{isCopied ? (
						<img src="/icons/success.svg" className="w-4 h-4" alt="Copy to Clipboard" />
					) : (
						<img src="/icons/copy.svg" className="w-4 h-4" alt="Copy to Clipboard" />
					)}
				</button>
				<div ref={citationRef} className="text-justify grid grid-cols-[auto_1fr]">
					<span>@{type}&#123;</span>
					<span>{name},</span> {/* Empty cell for alignment */}
					<span className="pl-12">author =</span>
					<span>
						&#123;
						{authors.map((author, index) => {
							if (index === authors.length - 1) {
								return `${author[1]}, ${author[0]}`
							} else {
								return `${author[1]}, ${author[0]} and `
							}
						})}
						&#125;,
					</span>
					<span className="pl-12">title =</span>
					<span>&#123;{title}&#125;,</span>
					<span className="pl-12">booktitle =</span>
					<span>&#123;{booktitle}&#125;,</span>
					<span className="pl-12">year =</span>
					<span>&#123;{year}&#125;</span>
					<span>&#125;</span>
				</div>
			</div>
		</div>
	)
}

export default Citation
