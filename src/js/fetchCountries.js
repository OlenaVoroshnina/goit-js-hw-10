import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name'

export function fetchCountries(name) {
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,languages,flags`)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                   return Notiflix.Notify.failure('Oops, there is no country with that name');                       
                };
                throw new Error(response.status);
            }
            return response.json();
        })       
};