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
  heightOfCard: 0,
};

const loaderHide = new itemService(loader, 'visually-hidden');
const loaderMoreHide = new itemService(loadMoreLoader, 'visually-hidden');
const buttonMoreHide = new itemService(loadMoreButton, 'visually-hidden');

async function searchFunc(event) {
  event.preventDefault();

  loadMoreButton.removeEventListener('click', loadMore);

  loaderHide.show();

  params.page = 1;
  params.q = event.currentTarget.elements.information.value.trim();

  try {
    const data = await receiveDataFromServer(params);

    if (data.totalHits === 0) {
      loaderHide.hide();
      gallery.innerHTML = '';
      buttonMoreHide.hide();

      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    const itemsToDrawArr = renderFunc(data.hits);
    loaderHide.hide();

    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('afterbegin', itemsToDrawArr);

    params.heightOfCard =
      gallery.firstElementChild.getBoundingClientRect().height;

    params.maxPages = Math.ceil(data.totalHits / params.perPage);

    lightbox.refresh();

    if (params.page !== params.maxPages) {
      buttonMoreHide.show();
      loadMoreButton.addEventListener('click', loadMore);
    } else {
      buttonMoreHide.hide();
      loadMoreButton.removeEventListener('click', loadMore);
    }
  } catch (error) {
    loaderHide.hide();

    return iziToast.warning({
      title: 'Error : ',
      message: error,
      position: 'topRight',
    });
  } finally {
    form.reset();
  }
}

async function loadMore() {
  buttonMoreHide.disable();
  loaderMoreHide.show();
  params.page += 1;

  try {
    const data = await receiveDataFromServer(params);

    const itemsToDrawArr = renderFunc(data.hits);

    loaderMoreHide.hide();

    gallery.insertAdjacentHTML('beforeend', itemsToDrawArr);

    console.log(gallery.childElementCount);

    lightbox.refresh();

    window.scrollBy({ top: 2 * params.heightOfCard, behavior: 'smooth' });

    if (params.maxPages === params.page) {
      buttonMoreHide.hide();
      loadMoreButton.removeEventListener('click', loadMore);
      return iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    }
  } catch (error) {
    loaderHide.hide();
    buttonMoreHide.hide();
    loadMoreButton.removeEventListener('click', loadMore);
    return iziToast.warning({
      title: 'Error : ',
      message: error,
      position: 'topRight',
    });
  } finally {
    buttonMoreHide.enable();
  }
}

form.addEventListener('submit', searchFunc);
