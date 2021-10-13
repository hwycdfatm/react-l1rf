export default function checkImages(image) {
	if (image.type !== 'image/png' && image.type !== 'image/jpeg')
		return alert('Vui lòng chọn file ảnh')
	if (image.size > 1024 * 1024 * 1024) return alert('Kích thước ảnh quá to')
	return true
}
