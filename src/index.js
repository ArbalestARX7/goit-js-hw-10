import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputField = document.querySelector('#search-box');
const listOfcountries = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  let counrtyName = e.target.value.trim();
  console.log(counrtyName);

  if (counrtyName === '') {
    return;
  }
  fetchCountries(counrtyName)
    .then(result => {
      clearMarkup();
      countryMagic(result);
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function countryMagic(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1 && countries.length <= 9) {
    markupList(countries);
  } else if (countries.length === 1) {
    markupCountryInfo(countries);
  }
}

function markupList(countries) {
  const markupList = countries
    .map(
      ({ name, flags }) =>
        `<li class="list-item"><img src="${flags.svg}" alt="${flags.alt}" width="40" class="list-img" >${name.official}</li>`
    )
    .join('');
  listOfcountries.insertAdjacentHTML('beforeend', markupList);
}

function markupCountryInfo(countries) {
  const markupList = countries
    .map(
      ({ name, flags, languages, population, capital }) =>
        `<img class="info-img" src="${flags.svg}" alt="${
          flags.alt
        }" width ="40"/>
      <h1 class="info-name">${name.official}</h1>
      <p class="desc"><span class="value">capital:</span>${capital}</p>
      <p class="desc"><span class="value">population:</span>${population}</p>
      <p class="desc"><span class="value">languages:</span>${Object.values(
        languages
      )}</p>`
    )
    .join('');
  countryInfo.insertAdjacentHTML('beforeend', markupList);
}

function clearMarkup() {
  countryInfo.innerHTML = '';
  listOfcountries.innerHTML = '';
}
