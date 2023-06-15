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

export function handleFieldState(validator, inputField, msgField, darkMode) {
	const isValid = validator(inputField);

	if (isValid.ok) {
		classesToAdd(inputField, ['ring-gray-300', 'ring-neutral-600']);
		classesToRemove(inputField, ['ring-red-300']);

		if (msgField) {
			classesToAdd(msgField, ['invisible']);
			classesToRemove(msgField, ['visible']);
		}
		return true;
	}

	classesToAdd(inputField, ['ring-red-300']);
	classesToRemove(inputField, ['ring-gray-300', 'ring-neutral-600']);

	if (msgField) {
		classesToAdd(msgField, [
			'visible',
			darkMode ? 'text-red-300' : 'text-red-400'
		]);
		classesToRemove(msgField, ['invisible']);
	}

	return false;
}
