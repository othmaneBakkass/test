export function validateName(inputField) {
	if (inputField.value.trim().length >= 1) {
		return { ok: true };
	}
	return { ok: false };
}

export function validateEmail(inputField) {
	/*
	This Javascript regex will match 99% of valid email addresses and will not pass validation for email addresses that have, for instance:

	Dots in the beginning
	Multiple dots at the end
	But at the same time it will allow part after @ to be IP address.
	
	*/
	const regex =
		/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	if (regex.test(inputField.value)) {
		return { ok: true };
	}
	return { ok: false };
}

export function validateAddress(inputField) {
	if (inputField.value.trim().length >= 1) {
		return { ok: true };
	}
	return { ok: false };
}

export function validateCardNumber(inputField) {
	if (inputField.value.trim().length === 19) {
		return { ok: true };
	}
	return { ok: false };
}
export function validateMonth(inputField) {
	const valueLength = inputField.value.length;
	const value = Number(inputField.value);

	if (typeof value === 'number' && valueLength > 0) {
		return { ok: true };
	}
	return { ok: false };
}
export function validateYear(inputField) {
	const valueLength = inputField.value.length;
	const value = Number(inputField.value);

	if (typeof value === 'number' && valueLength > 0) {
		return { ok: true };
	}
	return { ok: false };
}
export function validateSecurityCode(inputField) {
	const valueLength = inputField.value.length;
	const value = Number(inputField.value);

	if (typeof value === 'number' && valueLength > 0) {
		return { ok: true };
	}
	return { ok: false };
}
