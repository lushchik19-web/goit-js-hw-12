import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

console.log(formEl);
console.log(loadMoreBtn);

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';
let page = 1;

async function onFormSubmit(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (searchQuery === '') {
    return;
  }

  page = 1;

  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      return;
    }

    createGallery(data.hits);

    if (data.totalHits > data.hits.length) {
      showLoadMoreButton();
    } else {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery li');
    const { height } = galleryItem.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });

    const totalLoaded = page * 15;

    if (totalLoaded >= data.totalHits || data.hits.length < 15) {
      hideLoadMoreButton();

      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });

      return;
    }

    showLoadMoreButton();
  } catch (error) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    hideLoader();
  }
}
