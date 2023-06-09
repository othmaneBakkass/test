const filterBtns = [...document.querySelectorAll('.filter-by-category')];
const productContainer = document.getElementById('product-container');

async function handleFiltering(event) {
	const input = event.target.closest('.filter-by-category');

	const type = input.value.trim().toLowerCase();

	const fetchConfig = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const URL =
		type === 'all'
			? `http://localhost:8000/api/products`
			: `http://localhost:8000/api/products/category/${type}`;

	try {
		const { ok, data } = await fetch(URL, fetchConfig).then((res) =>
			res.json()
		);

		console.log('🚀 ~ data ~ ', type);

		if (ok) {
			//empty products section
			productContainer.innerHTML = '';

			let products = '';

			// display the new list of todos
			data.forEach((product) => {
				products += `
				<a href="http://localhost:8000/products/${product.id}" class="w-full bg-gradient-to-b from-neutral-600 to-neutral-800 rounded-3xl group shadow-3xl relative overflow-hidden">
				<div class="flex flex-col justify-center items-center">
					<div class="w-full h-80 relative flex justify-center items-center">
						<img class="w-[90%] object-contain rounded-t-3xl  duration-300 transition-transform group-hover:scale-105" src="http://localhost:8000/static/imgs/${product.imgs[0]}">
					</div>
					<div class="mt-1 w-full flex flex-col items-center justify-center border-t border-neutral-600">
						<p class="text-sm mt-2 capitalize font-brand text-neutral-400">${product.category}</p>
						<h3 class="text-base mt-2 font-brand text-neutral-300">
							${product.name}
						</h3>
						<p class="text-base my-2 font-brand font-medium text-neutral-50">$${product.price}</p>

					</div>
				</div>
			</a>
				`;
			});
			productContainer.innerHTML = products;
		}
	} catch (error) {
		console.log(error);
	}
}

filterBtns.forEach((el) => {
	el.addEventListener('click', handleFiltering);
});
