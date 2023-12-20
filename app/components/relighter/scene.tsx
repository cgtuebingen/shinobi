import { FigureStylingNode } from "@/types/node"
import { Environment } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import React, { Suspense, type FunctionComponent } from "react"

interface SceneProps {
	url: string
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const Scene: FunctionComponent<SceneProps> = ({ url, styling, children }) => {
    const gltf = useLoader(GLTFEX, '/Poimandres.gltf')

	return (
		<Suspense fallback={null}>
			{/* <Environment files="/hdris/forest_slope.jpg" background /> */}
			<Environment preset="city" background blur={0.5} />
            <
		</Suspense>
	)
}

export default Scene
