import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryData = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
    const name = searchBox.value.trim();
    if (name === '') {
        return (countryList.innerHTML = ''), (countryData.innerHTML = '');
    }

    fetchCountries(name)
    .then(country => {
        countryList.innerHTML = '';
        countryData.innerHTML = '';

        if (country.length === 1) {
            countryData.insertAdjacentHTML('beforeend', markupCountryData(country));
        } else if (country.length >= 10) {
            ifTooManyMatchesAlert();
        } else {
            countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
        }
    })
    .catch(ifWrongNameAlert);
}

function ifTooManyMatchesAlert() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function ifWrongNameAlert() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function markupCountryList(country) {
    const layoutCountryList = country.map(({ name, flags }) => {
        const layout = `
            <li class="country-list__item">
                <img class="country-list__img" src="${flags.svg}" alt="Flag of ${name.official}">
                <h2 class="country-list__title">${name.official}</h2>
            </li>
            `;
        return layout;
    }).join('');
    return layoutCountryList;
}

function markupCountryData(country) {
    const layoutCountryData = country.map(({ name, flags, capital, population, languages }) => {
        const layout = `
            <ul class="country-info__list">
                <li class="country-info__item">
                    <img class="country-info__img" src="${flags.svg}" alt="Flag of ${name.official}">
                    <h2 class="country-info__title">${name.official}</h2>
                </li>
                <li class="country-info__item"><span class="country-info__capital">Capital: </span>${capital}</li>
                <li class="country-info__item"><span class="country-info__population">Population: </span>${population}</li>
                <li class="country-info__item"><span class="country-info__languages">Languages: </span>${Object.values(languages, ).join()}</li>
            </ul>
            `;
        return layout;
    }).join('');
    return layoutCountryData;
}


