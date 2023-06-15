const cartBtn = document.getElementById('cart-btn');
const price = document.getElementById('product-price').textContent;

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

cartBtn.addEventListener('click', (e) => {
	const cookieManager = new UniversalCookie();
	const productId = e.target.getAttribute('data-product-id');

	const cookie = cookieManager.get('cart');

	if (cookie) {
		const size = document.querySelector('.size-btn:checked');

		const productDoesExist = cookie.products.find(
			(el) => el.id === Number(productId)
		);

		if (productDoesExist) {
			cookie.products.forEach((el) => {
				if (el.id === Number(productId)) {
					el.size = size ? size.value : '500g';
				}
			});
		} else {
			cookie.products.push({
				id: Number(productId),
				size: size ? size.value : '500g'
			});
			cookie.total = Number(cookie.total) + Number(price);
		}

		cookieManager.set('cart', JSON.stringify(cookie), {
			path: '/',
			expires: new Date('2024-12-12'),
			secure: false,
			httpOnly: false,
			sameSite: 'lax'
		});

		animateNotification();
	} else {
		const size = document.querySelector('.size-btn:checked');
		const cartItem = {
			products: [
				{
					id: Number(productId),
					// update it for amjad
					size: size ? size.value : '500g'
				}
			],
			total: Number(price)
		};
		cookieManager.set('cart', JSON.stringify(cartItem), {
			path: '/',
			expires: new Date('2024-12-12'),
			secure: false,
			httpOnly: false,
			sameSite: 'lax'
		});
		animateNotification();
	}
});
