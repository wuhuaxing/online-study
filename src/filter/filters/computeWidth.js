/*
 * 计算宽度
 */
function getWidth (col) {
	if (col == null) {
		return '100%';
	}
	let width = 100/col + '%';
	return width;
}

export default getWidth