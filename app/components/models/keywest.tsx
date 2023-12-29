/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 keywest.glb --types 
*/

import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
	nodes: {
		ObjectToExport: THREE.Mesh
	}
	materials: {
		GLTFExport: THREE.MeshStandardMaterial
	}
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>>

export function Model(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF("models/keywest.glb") as GLTFResult
	return (
		<group {...props} dispose={null}>
			<mesh geometry={nodes.ObjectToExport.geometry} material={materials.GLTFExport} />
		</group>
	)
}

useGLTF.preload("models/keywest.glb")