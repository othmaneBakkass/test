const filterBtns = [...document.querySelectorAll('.filter-by-category')];

function handleFiltering(event) {
	const value = event.target.closest('.filter-by-category').value;
	console.log('🚀 ~ value ~', value);
}

filterBtns.forEach((el) => {
	el.addEventListener('click', handleFiltering);
});
