import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');


// https://restcountries.com/v3.1/name/{name}

function fetchCountries(name) {
	const filter = `?fields=name,capital,population,flags,languages`;
	return fetch(`https://restcountries.com/v3.1/name/${name}?${filter}`).then(response => response.json())
}
fetchCountries("Canada").then(country => {
	console.log(country);
});

const searchBox = document.querySelector("#search-box");

searchBox.addEventListener("submit", event => {
	event.preventDefault();
	console.log(searchBox.elements.country);
})