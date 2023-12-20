import { FigureStylingNode } from "@/types/node"
import React, { useEffect, type FunctionComponent } from "react"

interface RelighterProps {
	styling?: FigureStylingNode
	children?: React.ReactNode
}

const Relighter: FunctionComponent<RelighterProps> = ({ styling, children }) => {
	const roundedCorners = styling == undefined ? true : styling.roundedCorners
	const scaleContent = styling == undefined ? 1.0 : styling.scaleContent
	const showControls = styling == undefined ? false : styling.showControls
	const objectFit = styling == undefined ? "cover" : styling.objectFit
	const [selected, setSelected] = React.useState(0)

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

	useEffect(() => {
		var urlParams = new URLSearchParams(window.location.search)
		const sceneName = usable_assets[selected]

		var auto_rotate = urlParams.get("rotate")
		if (auto_rotate === null) {
			auto_rotate = "0"
		}
		var should_rotate = parseInt(auto_rotate)

		const baseModelFolder = "/models/"
		const baseHdriFolder = "/hdris/"

		const canvas = document.getElementById("renderCanvas") // Get the canvas element
		canvas.addEventListener("wheel", (evt) => evt.preventDefault())
		const engine = new BABYLON.Engine(canvas, true) // Generate the BABYLON 3D engine
		var scene = new BABYLON.Scene(engine)

		var camera = new BABYLON.ArcRotateCamera(
			"camera1",
			Math.PI * 0.5,
			Math.PI / 2.5,
			1.5,
			BABYLON.Vector3.Zero(),
			scene,
		)

		camera.panningSensibility = 0
		camera.lowerRadiusLimitSearch = 0.015
		camera.minZ = 0.3
		camera.wheelDeltaPercentage = 0.05
		if (!should_rotate) {
			camera.attachControl(canvas, true)
		} else {
			camera.useAutoRotationBehavior = true
			camera.autoRotationBehavior.idleRotationSpeed = -0.5
		}

		var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene)
		var skyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene)
		skyboxMaterial.backFaceCulling = false
		skyboxMaterial.disableLighting = true
		skyboxMaterial.microSurface = 0.85
		skybox.material = skyboxMaterial
		skybox.infiniteDistance = true

		var uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI")
		var uiSize = uiTexture.getSize()
		var aspectRatio = uiSize.width / uiSize.height
		var grid = new BABYLON.GUI.Grid()
		grid.addColumnDefinition(1.0 / 4.0) // 0
		grid.addColumnDefinition(1.0 / 4.0) // 1
		grid.addColumnDefinition(1.0 / 4.0) // 3
		grid.addColumnDefinition(1.0 / 4.0) // 4
		grid.addRowDefinition(1.0 / 8.0)
		grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
		grid.height = 2.0 / 8.0
		grid.width = 1.0

		var hdri_func = function (path) {
			var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(path, scene)
			hdrTexture.gammaSpace = false
			skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(path, scene)
			skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
			scene.environmentTexture = hdrTexture
		}

		var createButton = function (grid, hdri_name, pos) {
			var col = pos % grid.columnCount
			var row = Math.floor(pos / grid.columnCount) * 2

			var button = BABYLON.GUI.Button.CreateImageOnlyButton(hdri_name, baseHdriFolder + hdri_name + ".jpg")
			button.onPointerClickObservable.add(function () {
				hdri_func(baseHdriFolder + hdri_name + ".env")
			})
			grid.addControl(button, row, col)
		}

		uiTexture.addControl(grid)

		createButton(grid, "forest_slope", 0)
		createButton(grid, "lebombo", 1)
		createButton(grid, "photo_studio", 2)
		createButton(grid, "urban_alley", 3)

		if (!should_rotate) {
			var panel = new BABYLON.GUI.StackPanel()
			panel.width = "200px"
			panel.height = "80px"
			panel.isVertical = false
			panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
			panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
			uiTexture.addControl(panel)

			var rotatingCamera = true

			var checkbox = new BABYLON.GUI.Checkbox()
			checkbox.width = "20px"
			checkbox.height = "20px"
			checkbox.isChecked = rotatingCamera
			checkbox.color = "gray"
			var clicked = false

			var currentPosition = { x: 0, y: 0 }
			var currentRotation = { x: 0, y: 0 }
			var transformNode = new BABYLON.TransformNode("", scene)

			var getCurPos = function (evt) {
				currentPosition.x = evt.clientX
				currentPosition.y = evt.clientY
				currentRotation.x = transformNode.rotation.x
				currentRotation.y = transformNode.rotation.y
				clicked = true
			}
			var rotate = function (evt) {
				if (!clicked) {
					return
				}
				transformNode.rotation.y = currentRotation.y - (evt.clientX - currentPosition.x) / 100.0
				transformNode.rotation.x = currentRotation.x + (evt.clientY - currentPosition.y) / 100.0
			}
			var stop = function (evt) {
				clicked = false
			}

			checkbox.onIsCheckedChangedObservable.add(function (value) {
				rotatingCamera = !rotatingCamera
				if (rotatingCamera) {
					canvas.removeEventListener("pointerdown", getCurPos)
					canvas.removeEventListener("pointermove", rotate)
					canvas.removeEventListener("pointerup", stop)
					camera.attachControl(canvas, true)
				} else {
					camera.detachControl()
					canvas.addEventListener("pointerdown", getCurPos)
					canvas.addEventListener("pointermove", rotate)
					canvas.addEventListener("pointerup", stop)
				}
			})
			/* panel.addControl(checkbox)
			var header = new BABYLON.GUI.TextBlock()
			header.text = "Rotate Camera"
			header.width = "180px"
			header.marginLeft = "10px"
			header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
			header.color = "white"
			panel.addControl(header) */
		}

		BABYLON.SceneLoader.OnPluginActivatedObservable.addOnce(function (loader) {
			if (loader.name === "gltf") {
				loader.loggingEnabled = false
			}
		})

		BABYLON.SceneLoader.Append(baseModelFolder, sceneName + ".glb", undefined, scene, function (scene) {
			hdri_func(baseHdriFolder + "forest_slope.env")
		})

		// Register a render loop to repeatedly render the scene
		engine.runRenderLoop(function () {
			if (!mesh) {
				var mesh = scene.getMeshByID("ObjectToExport")
				if (mesh) {
					mesh.parent = transformNode
				}
			}
			scene.render()
		})

		// Watch for browser/canvas resize events
		window.addEventListener("resize", function () {
			engine.resize()
		})
	}, [selected])

	return (
		<div className="relative w-full bg-slate-200 rounded-lg" style={{ height: "40rem", overflow: "hidden" }}>
			<canvas id="renderCanvas" touch-action="none" className="absolute top-0 left-0 w-full h-full"></canvas>
			<div className="absolute top-0 left-0 w-full h-20 grid grid-cols-fill gap-0 grid-flow-col">
				{usable_assets.map((asset, index) => (
					<div key={index} className="relative w-auto h-auto">
						<img
							src={"/models/" + asset + ".jpg"}
							alt={asset}
							className="w-full h-full object-cover"
							style={{ aspectRatio: "1 / 1" }}
							onClick={() => {
								setSelected(index)
							}}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Relighter
