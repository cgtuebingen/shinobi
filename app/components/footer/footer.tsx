// components/StickyHeader.tsx
import Icon from "@/icons/icon"
import { LinkNode } from "@/types/node"
import React from "react"
import * as gtag from "@/utils/gtags.client"

interface FooterProps {
	title: string
	links: LinkNode[]
}

const Footer: React.FC<FooterProps> = ({ title, links }) => {
	return (
		<div className="absolute w-full">
			<div className=" mx-auto w-full max-w-4xl px-4  md:px-8 flex flex-col justify-between  pb-2 py-2">
				<div className="w-full h-0.5 bg-gray-200 dark:bg-gray-800"></div>
				<div className=" w-full py-4 flex flex-row justify-between">
					<div className="flex flex-row  justify-center items-center space-x-3">
						<a
							href={
								"https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/informatik/lehrstuehle/computergrafik/lehrstuhl/"
							}
							className="cursor-pointer hover:underline opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
							onClick={() => {
								gtag.event({
									category: "Link",
									action: "custom_click",
									label: "CG Tübingen",
								})
							}}
						>
							<p className="text-primary text-justify block  font-medium  text-md dark:text-white ">
								CG Tübingen
							</p>
						</a>
					</div>
					<div className="flex flex-row space-x-3 justify-center items-center">
						<a
							href={"https://uni-tuebingen.de/impressum/"}
							className="cursor-pointer hover:underline opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
							onClick={() => {
								gtag.event({
									category: "Link",
									action: "custom_click",
									label: "Impressum",
								})
							}}
						>
							<p className="text-primary text-justify block text-sm  dark:text-white ">Impressum</p>
						</a>
						<a
							href={"https://www.uni-tuebingen.de/datenschutzerklaerung/"}
							className="cursor-pointer hover:underline opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
							onClick={() => {
								gtag.event({
									category: "Link",
									action: "custom_click",
									label: "Datenschutzerklärung",
								})
							}}
						>
							<p className="text-primary text-justify block  text-sm dark:text-white ">Datenschutz</p>
						</a>
						<p> </p>
						<a
							href={"https://twitter.com/CG_Tuebingen"}
							className="text-secondary font-normal  cursor-pointer text-inherit  text-center hover:underline dark:text-white"
							onClick={() => {
								gtag.event({
									category: "Link",
									action: "custom_click",
									label: "Twitter",
								})
							}}
						>
							<Icon
								className="w-5 h-5 inline-block opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
								name="twitter"
							/>
						</a>
						<a
							href={"https://github.com/cgtuebingen"}
							className="text-secondary font-normal  cursor-pointer text-inherit  text-center hover:underline dark:text-white"
							onClick={() => {
								gtag.event({
									category: "Link",
									action: "custom_click",
									label: "GitHub",
								})
							}}
						>
							<Icon
								className="w-5 h-5 inline-block opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
								name="github"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
