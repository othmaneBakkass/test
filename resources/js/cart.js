const removeBtns = document.querySelectorAll('[data-remove-btn-id]');
const ProceedToCheckoutBtn = document.getElementById('checkout-btn');

// const subtotal = document.querySelector('#Subtotal');
const totalPrice = document.querySelector('#total');

const cookieManager = new UniversalCookie();
const cookie = cookieManager.get('cart');

function updateCart(productPrice, productId) {
	const productList = cookie.products.filter(
		(el) => el.id !== Number(productId)
	);
	const total = Number(cookie.total) - Number(productPrice);

	cookieManager.set(
		'cart',
		JSON.stringify({
			products: productList,
			total
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

function handleRemoveCartItem(e) {
	const productId = e.target
		.closest('[data-remove-btn-id]')
		.getAttribute('data-remove-btn-id');

	const productNode = document.querySelector(
		`[data-cart-item-id="${productId}"]`
	);
	const productPrice = document.querySelector(
		`[data-product-price-id="${productId}"]`
	);

	// remove cart item from html
	productNode.remove();

	// update cart
	updateCart(productPrice, productId);

	// check if we should disable checkout btn
	const NumberOfProducts = document.querySelectorAll('[data-cart-item-id]');

	if (NumberOfProducts.length === 0) {
		ProceedToCheckoutBtn.setAttribute('disabled', true);
	}
	// update total and subtotal
	const total = Number(cookie.total) - Number(productPrice);

	totalPrice.textContent = Number(totalPrice.textContent) - total;
	/**
	 * subtotal.textContent = total
	 * totalPrice.textContent = Number(totalPrice.textContent) - total
	 *
	 */
}

removeBtns.forEach((el) => {
	el.addEventListener('click', handleRemoveCartItem);
});

ProceedToCheckoutBtn.addEventListener('click', () => {
	const products = document.querySelectorAll('[data-cart-item-id]');

	let orderInfo = [];

	products.forEach((product) => {
		const id = product.getAttribute('data-cart-item-id');

		const qty = document.querySelector(`[data-select-qty-id="${id}"]`).value;

		const size = document
			.querySelector(`[data-size-id="${id}"]`)
			.textContent.trim();

		const name = document
			.querySelector(`[data-name-id="${id}"]`)
			.textContent.trim();

		orderInfo.push({ id, qty, name, size });
	});

	console.log(orderInfo);
});
