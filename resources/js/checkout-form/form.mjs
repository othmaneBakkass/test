import { classesToAdd, classesToRemove, handleFieldState } from '../utils.mjs';
import { addOrder } from './add-order.mjs';
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

const cookieManager = new UniversalCookie();
const cookie = cookieManager.get('cart');

form.addEventListener('submit', async (e) => {
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
			// check bank details

			const order = {
				address: addressField.value,
				email: emailField.value,
				first_name: firstNameField.value,
				last_name: lastNameField.value,
				order_total: Number(cookie.total)
			};

			const orderItems = JSON.parse(localStorage.getItem('order_items'));

			await addOrder(order, orderItems);
		}
	} else {
		classesToRemove(bankMsg, ['invisible']);
		classesToAdd(bankMsg, ['visible', 'text-red-400']);
	}
});
