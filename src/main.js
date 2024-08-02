import { renderFunc, itemService, lightbox } from './js/render-function';
import receiveDataFromServer from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');
const loadMoreLoader = document.querySelector('.load-more');
const loadMoreButton = document.querySelector('.position');
const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

let params = {
  page: 1,
  perPage: 15,
  maxPages: 0,
  q: '',
};

const loaderHide = new itemService(loader, 'visually-hidden');
const loaderMoreHide = new itemService(loadMoreLoader, 'visually-hidden');
const buttonMoreHide = new itemService(loadMoreButton, 'visually-hidden');

buttonMoreHide.hide();
loaderHide.hide();
loaderMoreHide.hide();

async function searchFunc(event) {
  event.preventDefault();

  params.page = 1;

  params.q = event.currentTarget.elements.information.value.trim();

  console.log(params.q);

  try {
    const data = await receiveDataFromServer(params);

    console.log(data);

    const itemsToDrawArr = renderFunc(data.hits);
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('afterbegin', itemsToDrawArr);

    lightbox.refresh();

    if (data.totalHits === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    params.maxPages = Math.ceil(data.totalHits / params.perPage);

    console.log(params.page);
    console.log(params.maxPages);

    if (params.page !== params.maxPages) {
      buttonMoreHide.show();
      loadMoreButton.addEventListener('click', loadMore);
    } else {
      buttonMoreHide.hide();
      loadMoreButton.removeEventListener('click', loadMore);
    }
  } catch (error) {
    console.log(error);
  } finally {
    form.reset();
  }
}

async function loadMore() {
  buttonMoreHide.disable();
  params.page += 1;

  try {
    const data = await receiveDataFromServer(params);

    const itemsToDrawArr = renderFunc(data.hits);

    gallery.insertAdjacentHTML('beforeend', itemsToDrawArr);

    lightbox.refresh();

    console.log(gallery.childElementCount);
    if (params.maxPages === params.page) {
      buttonMoreHide.hide();
      loadMoreButton.removeEventListener('click', loadMore);
      return iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    buttonMoreHide.enable();
  }
}

form.addEventListener('submit', searchFunc);
