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
		gtag.pageview(location.pathname, "G-0SNPJ02ZX8")
	}, [location])

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<title>{title.title}</title>

				<script src="../babylon/babylon.js"></script>
				<script src="../babylon/babylonjs.loaders.min.js"></script>
				<script src="../babylon/babylon.gui.min.js"></script>
				<script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
			</head>
			<body style={{ overscrollBehavior: "none" }}>
				<script async src={`https://www.googletagmanager.com/gtag/js?id=G-0SNPJ02ZX8`} />
				<script
					async
					id="gtag-init"
					dangerouslySetInnerHTML={{
						__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());

								gtag('config', 'G-0SNPJ02ZX8', {
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
