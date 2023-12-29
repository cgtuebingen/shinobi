import { type FunctionComponent } from "react"

interface TitleProps {
	title: string
	subtitle?: string
	children?: React.ReactNode
}

const Title: FunctionComponent<TitleProps> = ({ title, subtitle, children }) => {
	return (
		<div className="w-full flex flex-col justify-center items-center space-y-5">
			<h1 className="text-primary font-sans text-3xl font-bold xl:text-5xl text-center dark:text-white">
				{title}
			</h1>
			{/* Add 'break-words' class and potentially adjust padding or max-width */}
			<h2 className="text-primary font-sans text-xl font-medium xl:text-2xl text-center break-words px-2 max-w-[90%] dark:text-white">
				{subtitle}
			</h2>
		</div>
	)
}

export default Title
