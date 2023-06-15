export async function checkEmailAndPassword(email, password) {
	const fetchConfig = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const url = new URL(`http://localhost:8000/api/users/credentials/basic`);
	url.searchParams.set('email', email);
	url.searchParams.set('password', password);

	try {
		const { ok, data } = await fetch(url, fetchConfig).then((res) =>
			res.json()
		);

		if (ok) {
			if (data.length > 0) {
				// valid credentials
				return true;
			}
			return false;
		}
	} catch (error) {
		console.log(error);
	}
}
