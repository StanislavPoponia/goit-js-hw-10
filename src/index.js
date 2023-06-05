

import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat_api.js';


const refs = {
  catInfo: document.querySelector('.cat-info'),
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  container : document.querySelector('.container'),
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

  function selectCat(event) {
    refs.catInfo.innerHTML = '';
  
   
    refs.loader.classList.toggle('invisible')
    refs.container.classList.toggle('invisible')
  
    const catId = event.target.value;
  
    fetchCatByBreed(catId)
      .then(cat => {
        refs.catInfo.innerHTML = '';
  
        const cats = cat[0].breeds[0];
        const markupCat = `
                <img width="400" src="${cat[0].url}" alt="cat" />
                <div class="description-cat">
                  <h1>${cats.name}</h1>
                  <p>${cats.description}</p>
                  <p><h2>Temperament:</h2>${cats.temperament}</p>
                </div>`;
  
        refs.catInfo.insertAdjacentHTML('beforeend', markupCat);
      })
      .catch(error => {
        Notiflix.Notify.failure(`Error API, ${error}`);
      })
      .finally(() =>{ setTimeout(() => {refs.loader.classList.toggle('invisible')
      refs.container.classList.toggle('invisible')
      }, 1000);
        
      })
      ;
  }