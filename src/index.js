

import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat_api.js';


const refs = {
  catInfo: document.querySelector('.cat-info'),
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
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
    Notiflix.Notify.failure(`Error API, ${error}`);
  });

  function selectCat(e) {
    refs.catInfo.innerHTML = '';
    const loader = '<span class="loader"></span>';
  
    refs.catInfo.insertAdjacentHTML('beforeend', loader);
  
    const catId = e.target.value;
  
    fetchCatByBreed(catId)
      .then(cat => {
        refs.catInfo.innerHTML = '';
  
        const kitty = cat[0].breeds[0];
        const markupCat = `
                <img width="400" src="${cat[0].url}" alt="cat" />
                <div class="description-cat">
                  <h1>${kitty.name}</h1>
                  <p>${kitty.description}</p>
                  <p><h2>Temperament:</h2>${kitty.temperament}</p>
                </div>`;
  
        refs.catInfo.insertAdjacentHTML('beforeend', markupCat);
      })
      .catch(error => {
        Notiflix.Notify.failure(`Error fetch API, ${error}`);
      });
  }