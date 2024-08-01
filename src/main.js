import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import receiveDataFromServer from './js/pixabay-api';
import { renderFunc, lightbox } from './js/render-function';

const form = document.querySelector('.form');
const inputValue = form.elements.information;
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.button.position');
const loader = document.querySelector('.loader');
const loadMoreLoader = document.querySelector('.load-more');

let currentInputValue = '';

const drawDataFromServer = async event => {
  event.preventDefault();

  currentInputValue = inputValue.value;

  loader.classList.remove('visually-hidden');

  try {
    const data = await receiveDataFromServer(currentInputValue, true);

    if (data.total === 0) {
      button.classList.add('visually-hidden');
      gallery.innerHTML = '';
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    gallery.innerHTML = '';
    const itemsArr = renderFunc(data.hits);
    gallery.insertAdjacentHTML('afterbegin', itemsArr);

    lightbox.refresh();

    button.classList.remove('visually-hidden');
  } catch (error) {
    gallery.innerHTML = '';
    console.log(error);
  } finally {
    loader.classList.add('visually-hidden');
    form.reset();
  }
};

const loadMoreContent = async () => {
  button.disabled = true;
  loadMoreLoader.classList.remove('visually-hidden');

  try {
    const data = await receiveDataFromServer(currentInputValue);

    loadMoreLoader.classList.add('visually-hidden');

    const itemsArr = renderFunc(data.hits);
    gallery.insertAdjacentHTML('beforeend', itemsArr);

    lightbox.refresh();

    if (data.totalHits - gallery.childElementCount <= 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      button.classList.add('visually-hidden');
    }
  } catch (error) {
    console.log(error);
  } finally {
    button.disabled = false;
  }
};

button.addEventListener('click', loadMoreContent);

form.addEventListener('submit', drawDataFromServer);
