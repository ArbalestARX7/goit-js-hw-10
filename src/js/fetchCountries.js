const URL = `https://restcountries.com/v3.1/`;

export function fetchCountries(name) {
  return fetch(
    `${URL}name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(result => {
      if (!result.ok) {
        throw new Error(result.status);
      }
      return result.json();
    })
    .then(data => data)
    .catch(error => console.log(error));
}
