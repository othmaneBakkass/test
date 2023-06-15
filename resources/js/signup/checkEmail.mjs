export async function checkEmail(email) {
	const fetchConfig = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const url = new URL(`http://localhost:8000/api/users/email/${email}`);

	try {
		const { ok, data } = await fetch(url, fetchConfig).then((res) =>
			res.json()
		);

		if (ok) {
			if (data.length > 0) {
				// email already exists
				return false;
			}
			return true;
		}
	} catch (error) {
		console.log(error);
	}
}
