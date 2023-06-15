import { handleFieldState, classesToAdd, classesToRemove } from '../utils.mjs';
import {
	validateEmail,
	validatePassword
} from '../checkout-form/fields-validation.mjs';
import { checkEmailAndPassword } from './checkEmailAndPassword.mjs';

const form = document.getElementById('login-form');

const emailField = document.getElementById('email');
const emailMsg = document.getElementById('email-msg');

const passwordField = document.getElementById('password');
const passwordMsg = document.getElementById('password-msg');

const loginMsg = document.getElementById('login-msg');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const isValidEmailField = handleFieldState(
		validateEmail,
		emailField,
		emailMsg,
		true
	);

	const isValidPassword = handleFieldState(
		validatePassword,
		passwordField,
		passwordMsg,
		true
	);

	if (isValidEmailField && isValidPassword) {
		console.log({
			passwordField: passwordField.value,
			emailField: emailField.value
		});

		// check email and password
		const newEmail = await checkEmailAndPassword(
			emailField.value,
			passwordField.value
		);
		console.log('🚀 ~ newEmail ~', newEmail);

		if (newEmail) {
			window.location.assign('http://localhost:8000/reda');
		} else {
			classesToAdd(loginMsg, ['visible']);
			classesToRemove(loginMsg, ['invisible']);
		}
	}
});
