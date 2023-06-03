import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement'
})
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat_api.js';

const refs = {
  boxCat: document.querySelector('.cat-info'),
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader-span'),
};

refs.select.addEventListener('input', selectCat);

fetchBreeds()
  .then(i => {
    const markupOptions = i
      .map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>\n`;
      })
      .join('');

    refs.select.insertAdjacentHTML('beforeend', markupOptions);
  })
  .catch(error => {
    Notiflix.Notify.failure(`Error fetch API, ${error}`);
  });

function selectCat(e) {
  refs.boxCat.innerHTML = '';
  const loader = '<span class="loader"></span>';

  refs.boxCat.insertAdjacentHTML('beforeend', loader);

  const catId = e.target.value;

  fetchCatByBreed(catId)
    .then(cat => {
      refs.boxCat.innerHTML = '';

      const kitty = cat[0].breeds[0];
      const markupCat = `
              <img width="400" src="${cat[0].url}" alt="cat" />
              <div class="description-cat">
                <h1>${kitty.name}</h1>
                <p>${kitty.description}</p>
                <p><h2>Temperament:</h2>${kitty.temperament}</p>
              </div>`;

      refs.boxCat.insertAdjacentHTML('beforeend', markupCat);
    })
    .catch(error => {
      Notiflix.Notify.failure(`Error fetch API, ${error}`);
    });
}