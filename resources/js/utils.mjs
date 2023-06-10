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

export function handleFieldState(validator, inputField, msgField) {
	const isValid = validator(inputField);

	if (isValid.ok) {
		classesToAdd(inputField, ['ring-gray-300']);
		classesToRemove(inputField, ['ring-red-300']);

		if (msgField) {
			classesToAdd(msgField, ['invisible']);
			classesToRemove(msgField, ['visible']);
		}
		return true;
	}

	classesToAdd(inputField, ['ring-red-300']);
	classesToRemove(inputField, ['ring-gray-300']);

	if (msgField) {
		classesToAdd(msgField, ['visible', 'text-red-400']);
		classesToRemove(msgField, ['invisible']);
	}

	return false;
}
