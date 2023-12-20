import { type InstitutionNode } from "@/types/node"
import { type FunctionComponent } from "react"

interface InstututionsProps {
	institutions: InstitutionNode[]
	children?: React.ReactNode
}

const Institutions: FunctionComponent<InstututionsProps> = ({ institutions, children }) => {
	return (
		<div className="w-full flex flex-row justify-center items-center space-x-10">
			{institutions.map((institution, index) => {
				return (
					<a
						key={institution.name}
						href={institution.link}
						className="text-secondary font-sans cursor-pointer hover:text-primary"
					>
						{institution.name}
					</a>
				)
			})}
		</div>
	)
}

export default Institutions
