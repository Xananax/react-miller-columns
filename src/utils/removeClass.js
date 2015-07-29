import hasClass from './hasClass';

export default function removeClass(element, className) {
	if (hasClass(className)) {
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = (' ' + element.className + ' ')
				.replace(' ' + className + ' ', ' ').trim();
		}
	}
	return element;
}