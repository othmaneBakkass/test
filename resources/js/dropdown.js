const dropdown = document.getElementById('dropdown-list');
const dropdownBtn = document.getElementById('dropdown-btn');

dropdownBtn.addEventListener('click', () => {
	dropdown.classList.toggle('dropdown--hidden');
});
