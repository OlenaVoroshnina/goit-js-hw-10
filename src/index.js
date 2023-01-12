import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import { fetchCountries } from "./js/fetchCountries";


const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
} 



refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();
    const name = event.target.value.trim();

    refs.countryListEl.innerHTML = "";
    refs.countryInfoEl.innerHTML = "";

    if (name !== "") {
        fetchCountries(name)
            .then((countries) => {
            
                if (countries.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    refs.countryListEl.innerHTML = "";
                } else
                    if (2 <= countries.length && countries.length <= 10) {
                        renderCountryList(countries);
                    } else
                        if (countries.length === 1) {
                        renderCountryList(countries);
                        renderOneCard(countries);
                        }
            })
            .catch(error => {
                console.log(error);
                refs.countryListEl.innerHTML = "";
            })
    };
};

function renderCountryList(countries) {
    const markup = countries.map(country => {
        return `<li class = "countries-item">
        <img src = "${country.flags.svg}" alt ="${country.name.official}" width = "30px" height = '20px'>
        <p><b>${country.name.official}</b></p>
        </li>`
    }).join('');
    refs.countryListEl.innerHTML = markup;
}


function renderOneCard(countries) {
    const markup = countries.map(country => {
        return `
        <p><b>Capital: </b>${country.capital}</p>
        <p><b>Population: </b>${country.population}</p>
        <p><b>Languages: </b>${Object.values(country.languages).join(", ")}</p>`
    }).join('');
    refs.countryInfoEl.innerHTML = markup;
}

