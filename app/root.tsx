import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react"
import type { LinksFunction } from "@remix-run/node"
import { json, type LoaderFunctionArgs, type LoaderFunction } from "@remix-run/node"
import { readFile } from "fs/promises"
import { join } from "path"
import { useLoaderData } from "@remix-run/react"
import styles from "./../styles/app.css"
import { TitleNode } from "./types/node"
import * as gtag from "./utils/gtags.client"
import { useEffect } from "react"

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
]

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
	const title = JSON.parse(await readFile(join(process.cwd(), `/content/title.json`), "utf8"))

	return json({ title: title })
}

export default function App() {
	const location = useLocation()
	const { title } = useLoaderData() as { title: TitleNode }

	useEffect(() => {
		gtag.pageview(location.pathname, "G-H3WNEKDGDG")
	}, [location])

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{/* HTML Meta Tags */}
				<meta
					name="description"
					content="Shape and Illumination using Neural Object Decomposition via BRDF Optimization In-the-wild"
				/>

				{/* <!-- Facebook Meta Tags --> */}
				<meta property="og:url" content="https://shinobi.aengelhardt.com" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="SHINOBI" />
				<meta
					property="og:description"
					content="Shape and Illumination using Neural Object Decomposition via BRDF Optimization In-the-wild"
				/>
				<meta property="og:image" content="https://shinobi.aengelhardt.com/images/preview.jpg" />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="shinobi.aengelhardt.com" />
				<meta property="twitter:url" content="https://shinobi.aengelhardt.com" />
				<meta name="twitter:title" content="SHINOBI" />
				<meta
					name="twitter:description"
					content="Shape and Illumination using Neural Object Decomposition via BRDF Optimization In-the-wild"
				/>
				<meta name="twitter:image" content="https://shinobi.aengelhardt.com/images/preview.jpg" />

				<link rel="icon" href="favicon.ico" />
				<Meta />
				<Links />
				<title>{title.title}</title>

				<script src="babylon/babylon.js"></script>
				<script src="babylon/babylonjs.loaders.min.js"></script>
				<script src="babylon/babylon.gui.min.js"></script>
				<script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
			</head>
			<body className="bg-white dark:bg-black" style={{ overscrollBehavior: "none" }}>
				<script async src={`https://www.googletagmanager.com/gtag/js?id=G-H3WNEKDGDG`} />
				<script
					async
					id="gtag-init"
					dangerouslySetInnerHTML={{
						__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());

								gtag('config', 'G-H3WNEKDGDG', {
								page_path: window.location.pathname,
								});
							`,
					}}
				/>

				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
