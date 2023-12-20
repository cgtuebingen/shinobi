export const canvasCover = (
	ctx: CanvasRenderingContext2D,
	video: HTMLVideoElement,
): [cx: number, cy: number, cw: number, ch: number, x: number, y: number, w: number, h: number] => {
	// from https://stackoverflow.com/questions/21961839/simulation-background-size-cover-in-canvas
	const x = 0
	const y = 0
	const w = ctx.canvas.width
	const h = ctx.canvas.height

	// default offset is center
	var offsetX = 0.5
	var offsetY = 0.5

	var iw = video.videoWidth
	var ih = video.videoHeight
	var r = Math.min(w / iw, h / ih)
	var nw = iw * r // new prop. width
	var nh = ih * r // new prop. height
	var cx,
		cy,
		cw,
		ch,
		ar = 1

	// decide which gap to fill
	if (nw < w) ar = w / nw
	if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh // updated
	nw *= ar
	nh *= ar

	// calc source rectangle
	cw = iw / (nw / w)
	ch = ih / (nh / h)

	cx = (iw - cw) * offsetX
	cy = (ih - ch) * offsetY

	// make sure source rectangle is valid
	if (cx < 0) cx = 0
	if (cy < 0) cy = 0
	if (cw > iw) cw = iw
	if (ch > ih) ch = ih

	return [cx, cy, cw, ch, x, y, w, h]
}
