export default function hasClass(element, className) {
	if (element.classList) {
		return element.classList.contains(className);
	} else {
		return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	}
}