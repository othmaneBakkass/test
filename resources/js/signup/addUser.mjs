export async function addUser(userInfo) {
	const fetchConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userInfo)
	};

	const url = new URL(`http://localhost:8000/api/users/`);

	try {
		const { ok, data } = await fetch(url, fetchConfig).then((res) =>
			res.json()
		);

		if (ok) {
			return data;
		}
	} catch (error) {
		console.log(error);
	}
}
