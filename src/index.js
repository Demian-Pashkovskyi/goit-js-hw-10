import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryCard = document.querySelector(".country-info");

searchBox.addEventListener('input', debounce(onCountriesFeatch, DEBOUNCE_DELAY));

function onCountriesFeatch(event) {
	const inputValue = event.target.value.trim();

	if (inputValue === "") {
		countryListBuild();
		countryCardBuild();
	} else {
		fetchCountries(inputValue).then(country => {
			if (country.length > 10) {
				Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`)
				countryListBuild();
				countryCardBuild();
				return;
			} else if (country.length <= 10 && country.length >= 2) {
				countryCardBuild();
				countryList.innerHTML = makeCountriesListMarkup(country);
			} else {
				countryListBuild();
				countryCard.innerHTML = makeCountriesCardMarkup(country);
			}
		})
		.catch(error => {
			console.log(error);
			Notify.failure('Oops, there is no country with that name');
		});
	}
	countryListBuild();
	countryCardBuild();
}

function countryListBuild() {
	countryList.innerHTML = "";
}

function countryCardBuild() {
	countryCard.innerHTML = "";
}

function makeCountriesListMarkup(countriesDataList) {
	return countriesDataList
   .map(({ name, flags }) => {
      return `<li>
               <div class="country-name-wrapper">
                  <img src="${flags.svg}" alt="flag" width="30">
                  <p class="country-name">${name.official}</p>
               </div>
            </li>`;
   })
   .join('');
}

function makeCountriesCardMarkup(countriesDataList) {
	return countriesDataList
   .map(({ name, capital, population, flags, languages }) => {
      return `<div class="country-name-wrapper">
               <img src="${flags.svg}" alt="flag" width="100">
               <h2>${name.official}</h2>
            </div>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population.toLocaleString('en-US')}</p>
            <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`;
   })
   .join('');
}
