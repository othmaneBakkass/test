export async function addOrder(order, orderItems) {
	const fetchConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			order: order,
			products: orderItems
		})
	};

	const URL = `http://localhost:8000/api/orders`;

	try {
		const { ok, data } = await fetch(URL, fetchConfig).then((res) =>
			res.json()
		);

		if (ok) {
			alert('order is complete' + data);
		}
	} catch (error) {
		console.log(error);
	}
}
