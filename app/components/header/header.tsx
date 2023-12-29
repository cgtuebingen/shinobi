import { useEffect, type FunctionComponent, useRef } from "react"

interface HeaderProps {
	children?: React.ReactNode
	onScrolledPassed?: (passed: boolean) => void
}

const Header: FunctionComponent<HeaderProps> = ({ children, onScrolledPassed }) => {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				const headerBottom = ref.current.getBoundingClientRect().bottom + window.scrollY
				const passed = window.scrollY > headerBottom
				if (onScrolledPassed) {
					onScrolledPassed(passed)
				}
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [onScrolledPassed, ref])

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-5 pb-10  rounded-lg" ref={ref}>
			{children}
		</div>
	)
}

export default Header
