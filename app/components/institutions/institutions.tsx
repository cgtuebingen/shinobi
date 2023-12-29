import { type InstitutionNode } from "@/types/node"
import { type FunctionComponent } from "react"
import * as gtag from "@/utils/gtags.client"

interface InstitutionsProps {
	institutions: InstitutionNode[]
	children?: React.ReactNode
}

const Institutions: FunctionComponent<InstitutionsProps> = ({ institutions, children }) => {
	return (
		<div className="w-full flex flex-row justify-center items-center space-x-10">
			{institutions.map((institution, index) => {
				return (
					<a
						key={institution.name}
						href={institution.link}
						className="text-secondary font-sans cursor-pointer hover:text-primary  dark:text-white dark:text-opacity-80 dark:hover:text-white dark:hover:text-opacity-100 transition duration-200 ease-in-out"
						onClick={() => {
							gtag.event({
								category: "Link",
								action: "custom_click",
								label: institution.name,
							})
						}}
					>
						{institution.image ? (
							<img
								src={institution.image}
								alt={institution.name}
								className="w-auto h-20 object-contain"
							/> // Adjust size as needed
						) : (
							institution.name
						)}
					</a>
				)
			})}
		</div>
	)
}

export default Institutions
