export const breakpoints = {
	small: '(max-width: 735px)',
	medium: '(max-width: 1070px)'
};

/**
 * Linear interpolation (blend) between 2 values.
 * @param start Output when progress = 0.
 * @param end Output when progress = 0.
 * @param progress Progress through the blend 0.0-1.0.
 * @returns Blended value.
 */
export function lerp(start: number, end: number, progress: number) {
	return start * (1 - progress) + end * progress;
}

/**
 * Maps a value to a new range.
 * @param val the input value.
 * @param inRange Min and max values of `val` used for normalizing `val`.
 * @param outRange Min and max value of the new scale.
 * @param clamp If value falls outside the range, snap it to nearest bound.
 * @returns `val` scaled to `outRange`.
 */
export function mapRange(
	val: number,
	inRange: [number, number],
	outRange: [number, number],
	clamp = false
) {
	if (clamp) {
		val = Math.max(Math.min(val, inRange[1]), inRange[0]);
	}
	let p = (val - inRange[0]) / (inRange[1] - inRange[0]);
	return lerp(outRange[0], outRange[1], p);
}

/**
 * Encodes form data as a URL.
 */
export function encode(formData: any): string {
	let data = [];
	for (let [key, val] of formData) {
		data.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
	}
	return data.join('&');
}
