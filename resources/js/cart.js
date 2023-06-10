const removeBtns = document.querySelectorAll('[data-remove-btn-id]');
const qtySelectors = document.querySelectorAll('[data-select-qty-id]');
const ProceedToCheckoutBtn = document.getElementById('checkout-btn');

const subtotal = document.querySelector('#Subtotal');
const shippingCost = document.querySelector('#Shipping');

const totalPrice = document.querySelector('#total');

const cookieManager = new UniversalCookie();

function updateCartTotalWhenProductQuantityChanges(e) {
	const cookie = cookieManager.get('cart');

	const selector = e.target.closest('[data-select-qty-id]');

	const productPrice = selector.getAttribute('data-product-price');

	const prevQty = selector.getAttribute('data-qty');

	const currentQty = selector.value;

	if (Number(currentQty) > Number(prevQty)) {
		const difference = Number(currentQty) - Number(prevQty);

		const addedAmount = Number(difference) * Number(productPrice);

		const total = Number(cookie.total) + addedAmount;

		console.log('🚀 ~ > ~', {
			currentQty,
			prevQty,
			difference,
			addedAmount,
			cookieTotal: cookie.total,
			total
		});

		cookieManager.set(
			'cart',
			JSON.stringify({
				products: cookie.products,
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
		selector.setAttribute('data-qty', currentQty);

		subtotal.textContent = total;
		totalPrice.textContent = total + Number(shippingCost.textContent);
		return;
	}

	if (Number(currentQty) < Number(prevQty)) {
		const difference = Number(prevQty) - Number(currentQty);

		const lostAmount = Number(difference) * Number(productPrice);

		const total = Number(cookie.total) - lostAmount;

		console.log('🚀 ~ < ~', {
			currentQty,
			prevQty,
			difference,
			lostAmount,
			total,
			cookieTotal: cookie.total,
			total
		});

		cookieManager.set(
			'cart',
			JSON.stringify({
				products: cookie.products,
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

		selector.setAttribute('data-qty', currentQty);

		subtotal.textContent = total;
		totalPrice.textContent = Number(totalPrice.textContent) - total;
		return;
	}
}

qtySelectors.forEach((el) => {
	el.addEventListener('change', (e) => {
		updateCartTotalWhenProductQuantityChanges(e);
	});
});

function updateCart(productPrice, productId, cookie) {
	const productList = cookie.products.filter(
		(el) => el.id !== Number(productId)
	);
	const total = Number(cookie.total) - Number(productPrice);

	console.log('🚀 ~ total ~', total, productPrice, cookie.total);

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
	const cookie = cookieManager.get('cart');

	const productId = e.target
		.closest('[data-remove-btn-id]')
		.getAttribute('data-remove-btn-id');

	const productNode = document.querySelector(
		`[data-cart-item-id="${productId}"]`
	);
	const productPrice = document.querySelector(
		`[data-product-price-id="${productId}"]`
	).textContent;

	// remove cart item from html
	productNode.remove();

	// update cart
	updateCart(productPrice, productId, cookie);

	// check if we should disable checkout btn
	const NumberOfProducts = document.querySelectorAll('[data-cart-item-id]');

	if (NumberOfProducts.length === 0) {
		ProceedToCheckoutBtn.setAttribute('disabled', true);
	}
	// update total and subtotal
	const total = Number(cookie.total) - Number(productPrice);

	// totalPrice.textContent = Number(totalPrice.textContent) - total;

	subtotal.textContent = total;
	totalPrice.textContent = Number(totalPrice.textContent) - total;
}

removeBtns.forEach((el) => {
	el.addEventListener('click', handleRemoveCartItem);
});

ProceedToCheckoutBtn.addEventListener('click', () => {
	const products = document.querySelectorAll('[data-cart-item-id]');

	let orderedProducts = [];

	products.forEach((product) => {
		const id = product.getAttribute('data-cart-item-id');

		const qty = document.querySelector(`[data-select-qty-id="${id}"]`).value;

		const size = document
			.querySelector(`[data-size-id="${id}"]`)
			.textContent.trim();

		const name = document
			.querySelector(`[data-name-id="${id}"]`)
			.textContent.trim();

		orderedProducts.push({
			product_id: id,
			product_name: name,
			quantity: qty,
			size: size
		});
	});

	console.log(orderedProducts);

	// store order in localStorage
	localStorage.setItem('order_items', JSON.stringify(orderedProducts));

	window.location.assign('http://localhost:8000/checkout');
});
