const link = 'https://restcountries.com/v3.1/name/';
const countryInfo = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${link}${name}?${countryInfo}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}