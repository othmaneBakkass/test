import { classesToAdd, classesToRemove } from '../utils.mjs';
import {
	validateAddress,
	validateCardNumber,
	validateEmail,
	validateMonth,
	validateName,
	validateSecurityCode,
	validateYear
} from './fields-validation.mjs';

const form = document.getElementById('checkout-form');

const firstNameField = document.getElementById('first-name');
const firstNameMsg = document.getElementById('first-name-msg');

const lastNameField = document.getElementById('last-name');
const lastNameMsg = document.getElementById('last-name-msg');

const emailField = document.getElementById('email');
const emailMsg = document.getElementById('email-msg');

const addressField = document.getElementById('address');
const addressMsg = document.getElementById('address-msg');

const cardNumberField = document.getElementById('card-number');

const monthField = document.getElementById('month');

const yearField = document.getElementById('year');

const securityCodeField = document.getElementById('security-code');

const bankMsg = document.getElementById('bank-msg');

function handleFieldState(validator, inputField, msgField) {
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

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const isValidFirstName = handleFieldState(
		validateName,
		firstNameField,
		firstNameMsg
	);

	const isValidLastNameField = handleFieldState(
		validateName,
		lastNameField,
		lastNameMsg
	);

	const isValidEmailField = handleFieldState(
		validateEmail,
		emailField,
		emailMsg
	);

	const isValidAddress = handleFieldState(
		validateAddress,
		addressField,
		addressMsg
	);

	const isValidCardNumber = handleFieldState(
		validateCardNumber,
		cardNumberField
	);
	const isValidMonth = handleFieldState(validateMonth, monthField);
	const isValidYear = handleFieldState(validateYear, yearField);
	const isValidSecurityCode = handleFieldState(
		validateSecurityCode,
		securityCodeField
	);

	if (isValidCardNumber && isValidMonth && isValidYear && isValidSecurityCode) {
		classesToAdd(bankMsg, ['invisible']);

		if (
			isValidFirstName &&
			isValidLastNameField &&
			isValidEmailField &&
			isValidAddress
		) {
			console.log({
				firstName: firstNameField.value,
				lastName: lastNameField.value,
				email: emailField.value,
				address: addressField.value,
				cardNumber: cardNumberField.value,
				month: monthField.value,
				year: yearField.value,
				securityCode: securityCodeField.value
			});
		}
	} else {
		classesToRemove(bankMsg, ['invisible']);
		classesToAdd(bankMsg, ['visible', 'text-red-400']);
	}
});
