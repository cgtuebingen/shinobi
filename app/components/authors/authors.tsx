import { type AuthorNode } from "@/types/node"
import { type FunctionComponent } from "react"
import * as gtag from "@/utils/gtags.client"

interface AuthorsProps {
	authors: AuthorNode[]
	children?: React.ReactNode
}

const Authors: FunctionComponent<AuthorsProps> = ({ authors, children }) => {
	return (
		<div className="w-full flex flex-wrap justify-center items-center gap-5">
			{authors.map((author, index) => (
				<a
					key={index}
					href={author.link}
					className="text-secondary font-sans underline cursor-pointer text-inherit text-center hover:text-primary dark:text-white dark:text-opacity-80 dark:hover:text-white dark:hover:text-opacity-100 transition duration-200 ease-in-out"
					onClick={() => {
						gtag.event({
							category: "Link",
							action: "custom_click",
							label: author.name,
						})
					}}
				>
					{author.name}
				</a>
			))}
		</div>
	)
}

export default Authors
