import { FigureStylingNode } from "@/types/node"
import React, { useEffect, type FunctionComponent } from "react"
import { Model as Tractor } from "@/components/models/tractor"
import { Model as RemoteCar } from "@/components/models/remotecar"
import { Model as Keywest } from "@/components/models/keywest"
import { Model as Lion } from "@/components/models/lion"
import { Model as Baldeagle } from "@/components/models/baldeagle"
import { Model as Fireengine } from "@/components/models/fireengine"
import { Model as Pumpkin } from "@/components/models/pumpkin"
import { Model as Dino5 } from "@/components/models/dino_5"
import { Model as Hutmushroom } from "@/components/models/hutmushroom"
import { Model as ColoredBox } from "@/components/models/colored_box"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"

interface RelighterR3FProps {
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const RelighterR3F: FunctionComponent<RelighterR3FProps> = ({ styling, children }) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const scaleContent = styling == undefined ? 1.0 : styling.scaleContent
	const showControls = styling == undefined ? false : styling.showControls
	const objectFit = styling == undefined ? "cover" : styling.objectFit
	const [selectedModel, setSelectedModel] = React.useState(0)
	const [selectedHDR, setSelectedHDR] = React.useState(0)

	const usable_hdrs = ["lebombo", "photo_studio", "forest_slope", "urban_alley"]

	const usable_assets = [
		"tractor",
		"remotecar",
		"keywest",
		"lion",
		"baldeagle",
		"fireengine",
		"pumpkin",
		"dino_5",
		"hutmushroom",
		"colored_box",
	]

	return (
		<div className="flex flex-col justify-center items-center gap-2">
			<div className="w-full h-20 grid grid-cols-fill gap-2 grid-flow-col ">
				{usable_assets.map((asset, index) => (
					<button
						key={index}
						className="relative w-auto h-auto hover:opacity-80"
						onClick={() => setSelectedModel(index)}
					>
						<img
							src={"/models/" + asset + ".jpg"}
							alt={asset}
							className="w-full h-full object-cover rounded-lg"
							style={{ aspectRatio: "1 / 1" }}
						/>
					</button>
				))}
			</div>
			<div
				className="relative w-full bg-slate-200 rounded-lg"
				style={{
					height: "30rem",
					overflow: "hidden",
				}}
			>
				<div
					className="absolute top-0 left-0 w-full h-full "
					style={{
						filter: "blur(100px)",
					}}
				>
					<img
						className="w-full h-full object-cover rounded-lg"
						src={"/hdris/" + usable_hdrs[selectedHDR] + ".jpg"}
						alt={usable_hdrs[selectedHDR]}
					/>
				</div>
				<Canvas className="absolute top-0 left-0 w-full h-full">
					<OrbitControls
						enablePan={true}
						enableZoom={true}
						enableRotate={true}
						minDistance={0.4}
						maxDistance={0.8}
					/>
					<Environment files={"hdris/" + usable_hdrs[selectedHDR] + ".hdr"} background blur={0.3} />

					{usable_assets[selectedModel] == "tractor" && <Tractor rotation={[0, Math.PI * 0.8, 0]} />}
					{usable_assets[selectedModel] == "remotecar" && <RemoteCar rotation={[0, Math.PI * 0.8, 0]} />}
					{usable_assets[selectedModel] == "keywest" && <Keywest rotation={[0, Math.PI, 0]} />}
					{usable_assets[selectedModel] == "lion" && <Lion rotation={[0, Math.PI * 0.8, 0]} />}
					{usable_assets[selectedModel] == "baldeagle" && <Baldeagle rotation={[0, Math.PI * 0.9, 0]} />}
					{usable_assets[selectedModel] == "fireengine" && <Fireengine rotation={[0, Math.PI * 0.8, 0]} />}
					{usable_assets[selectedModel] == "pumpkin" && <Pumpkin />}
					{usable_assets[selectedModel] == "dino_5" && <Dino5 rotation={[0, Math.PI * 1.5, 0]} />}
					{usable_assets[selectedModel] == "hutmushroom" && <Hutmushroom rotation={[0, Math.PI * 1.1, 0]} />}
					{usable_assets[selectedModel] == "colored_box" && <ColoredBox rotation={[0, Math.PI * 0.7, 0]} />}
				</Canvas>
			</div>

			<div className="w-full h-20 grid grid-cols-fill gap-2 grid-flow-col ">
				{usable_hdrs.map((asset, index) => (
					<button key={index} className="relative w-auto h-auto hover:opacity-80" onClick={() => se(index)}>
						<img
							src={"/hdris/" + asset + ".jpg"}
							alt={asset}
							className="w-full h-full object-cover rounded-lg"
							style={{ aspectRatio: "2 / 1" }}
							onClick={() => {
								setSelectedHDR(index)
							}}
						/>
					</button>
				))}
			</div>
		</div>
	)
}

export default RelighterR3F
