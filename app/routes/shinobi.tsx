import Acknowledgements from "@/components/acknowledgements/acknowledgements"
import Authors from "@/components/authors/authors"
import Citation from "@/components/citation/citation"
import Header from "@/components/header/header"
import Institutions from "@/components/institutions/institutions"
import Links from "@/components/links/links"
import Relighter from "@/components/relighter/relight"
import StickyHeader from "@/components/stickyHeader/stickyHeader"
import Title from "@/components/title/title"
import type {
	AcknowledgementsNode,
	AuthorNode,
	ChapterNode,
	CitationNode,
	DocumentNode,
	FigureNode,
	InstitutionNode,
	LinkNode,
	TitleNode,
} from "@/types/node"
import { json, type LoaderFunction, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { readFile } from "fs/promises"
import { join } from "path"
import { useState } from "react"
import Chapter from "@/components/chapter/chapter"

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
	// Header
	const title = JSON.parse(await readFile(join(process.cwd(), `/content/title.json`), "utf8"))
	const authors = JSON.parse(await readFile(join(process.cwd(), `/content/authors.json`), "utf8"))
	const institutions = JSON.parse(await readFile(join(process.cwd(), `/content/institutions.json`), "utf8"))
	const links = JSON.parse(await readFile(join(process.cwd(), `/content/links.json`), "utf8"))

	// Content
	const document = JSON.parse(await readFile(join(process.cwd(), `/content/document.json`), "utf8"))

	// Extra
	const figures = JSON.parse(await readFile(join(process.cwd(), `/content/figures.json`), "utf8"))
	const bibliography = JSON.parse(await readFile(join(process.cwd(), `/content/bibliography.json`), "utf8"))
	const citation = JSON.parse(await readFile(join(process.cwd(), `/content/citation.json`), "utf8"))
	const acknowledgements = JSON.parse(await readFile(join(process.cwd(), `/content/acknowledgements.json`), "utf8"))

	const data = {
		title: title,
		authors: authors,
		institutions: institutions,
		links: links,
		document: document,
		figures: figures,
		bibliography: bibliography,
		citation: citation,
		acknowledgements: acknowledgements,
	}
	return json(data)
}

const App = () => {
	const { title } = useLoaderData() as { title: TitleNode }
	const { authors } = useLoaderData() as { authors: AuthorNode[] }
	const { institutions } = useLoaderData() as { institutions: InstitutionNode[] }
	const { links } = useLoaderData() as { links: LinkNode[] }
	const { document } = useLoaderData() as { document: DocumentNode }
	const { figures } = useLoaderData() as { figures: Record<string, FigureNode> }
	const { citation } = useLoaderData() as { citation: CitationNode }
	const { acknowledgements } = useLoaderData() as { acknowledgements: AcknowledgementsNode }

	const [showStickyHeader, setShowStickyHeader] = useState(false)

	return (
		<>
			{showStickyHeader && <StickyHeader title={title.title} links={links} />}
			<div className="flex w-full flex-col bg-white dark:bg-black">
				<div className="mx-auto w-full max-w-4xl px-4 py-12 pb-10 md:px-8">
					<Header
						onScrolledPassed={(passed) => {
							setShowStickyHeader(passed)
						}}
					>
						<Title title={title.title} subtitle={title.subtitle} />
						<Authors authors={authors} />
						<Institutions institutions={institutions} />
						<Links links={links} />
					</Header>

					{/* <div className="pt-2">{figures["overview"] && <Figure {...figures["overview"]} />}</div> */}

					{/* {figures["object_editing_bear"] && (
								<ComparableSwappableVideo {...figures["object_editing_bear"]} />
							)} */}
					{/* <ComparableVideo
								videoSrc1="/videos/bear_original.mp4"
								videoSrc2="/videos/bear_grizzly_sdxl.mp4"
							/> */}

					{document.chapters.map((chapter: ChapterNode, index: number) => (
						<Chapter {...chapter} key={index} figures={figures} />
					))}
					<Relighter url="models/baldeagle.jpg" />

					<Citation {...citation} />
					<Acknowledgements {...acknowledgements} />
				</div>
			</div>
		</>
	)
}

export default App

export function getStaticPaths() {
	return ["/"]
}
