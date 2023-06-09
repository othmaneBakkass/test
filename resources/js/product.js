const cartBtn = document.getElementById('cart-btn');
const price = document.getElementById('product-price').textContent;

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

		console.log('🚀 ~ cart ~', cookieManager.get('cart'));
	} else {
		const size = document.querySelector('.size-btn:checked').value;
		const cartItem = {
			products: [
				{
					id: Number(productId),
					size
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
		console.log('🚀 ~ cart ~', cookieManager.get('cart'));
	}
});
