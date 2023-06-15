const cookieManager = new UniversalCookie();

const notification = document.getElementById('notification');

function animateNotification() {
	if (!notification.classList.contains('animate-slide-down-from-top')) {
		notification.classList.add('animate-slide-down-from-top');
	}
	if (notification.classList.contains('animate-slide-up-from-bottom')) {
		notification.classList.remove('animate-slide-up-from-bottom');
	}

	setTimeout(() => {
		if (notification.classList.contains('animate-slide-down-from-top')) {
			notification.classList.add('animate-slide-up-from-bottom');
			notification.classList.remove('animate-slide-down-from-top');
		} else {
			notification.classList.add('animate-slide-down-from-top');
			notification.classList.remove('animate-slide-up-from-bottom');
		}
	}, 750);
}

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
			animateNotification();

			cookieManager.set(
				'cart',
				JSON.stringify({
					products: [],
					total: 0
				}),
				{
					path: '/',
					expires: new Date('2024-12-12'),
					secure: false,
					httpOnly: false,
					sameSite: 'lax'
				}
			);
		}
	} catch (error) {
		console.log(error);
	}
}
