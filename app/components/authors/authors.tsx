import { type AuthorNode } from "@/types/node"
import { type FunctionComponent } from "react"

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
					className="text-secondary font-sans underline cursor-pointer text-inherit text-center hover:text-primary "
				>
					{author.name}
				</a>
			))}
		</div>
	)
}

export default Authors
