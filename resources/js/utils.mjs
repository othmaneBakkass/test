export function classesToAdd(field, classes) {
	try {
		field.classList.add(...classes);
	} catch (error) {
		console.log('🚀 ~ error ~', error);
	}
}

export function classesToRemove(field, classes) {
	field.classList.remove(...classes);
}
