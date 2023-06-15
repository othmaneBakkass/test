import { handleFieldState, classesToAdd, classesToRemove } from '../utils.mjs';
import {
	validateEmail,
	validateName,
	validatePassword
} from '../checkout-form/fields-validation.mjs';
import { checkEmail } from './checkEmail.mjs';
import { addUser } from './addUser.mjs';

const form = document.getElementById('signup-form');

const firstNameField = document.getElementById('first-name');
const firstNameMsg = document.getElementById('first-name-msg');

const lastNameField = document.getElementById('last-name');
const lastNameMsg = document.getElementById('last-name-msg');

const emailField = document.getElementById('email');
const emailMsg = document.getElementById('email-msg');

const passwordField = document.getElementById('password');
const passwordMsg = document.getElementById('password-msg');

const signupMsg = document.getElementById('signup-msg');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const isValidFirstName = handleFieldState(
		validateName,
		firstNameField,
		firstNameMsg,
		true
	);

	const isValidLastNameField = handleFieldState(
		validateName,
		lastNameField,
		lastNameMsg,
		true
	);

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

	if (
		isValidFirstName &&
		isValidLastNameField &&
		isValidEmailField &&
		isValidPassword
	) {
		// check email
		const newEmail = await checkEmail(emailField.value);

		console.log(newEmail);

		if (newEmail) {
			classesToAdd(signupMsg, ['invisible']);
			classesToRemove(signupMsg, ['visible']);
			// add user

			const userId = await addUser({
				email: emailField.value,
				first_name: firstNameField.value,
				last_name: lastNameField.value,
				password: passwordField.value
			});

			if (userId) {
				window.location.assign('http://localhost:8000/reda');
			}
		} else {
			classesToAdd(signupMsg, ['visible']);
			classesToRemove(signupMsg, ['invisible']);
		}
	}
});
