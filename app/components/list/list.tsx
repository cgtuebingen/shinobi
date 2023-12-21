import type { ListNode } from "@/types/node"
import { type FunctionComponent } from "react"
import Text from "../text/text"
import exp from "constants"

interface ListProps extends ListNode {
	children?: React.ReactNode
}

const List: FunctionComponent<ListProps> = ({ content, isOrdered = false }) => {
	return (
		<>
			{isOrdered ? (
				<ol className="list-outside ml-5  text-justify block font-normal text-primary dark:text-white">
					{content.map((textNode, index) => (
						<li key={index}>
							<Text {...textNode} />
						</li>
					))}
				</ol>
			) : (
				<ul className="list-disc list-outside ml-5 text-justify block font-normal text-primary dark:text-white">
					{content.map((textNode, index) => (
						<li key={index}>
							<Text {...textNode} />
						</li>
					))}
				</ul>
			)}
		</>
	)
}
export default List
