// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

console.log(galleryEl);
console.log(loaderEl);

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `<li>
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="300"/>
      </a>
      <p>Likes ${image.likes}</p>
      <p>Views ${image.views}</p>
      <p>Comments ${image.comments}</p>
      <p>Downloads ${image.downloads}</p>
    </li>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}
export function showLoader() {
  loaderEl.classList.add('is-active');
}
export function hideLoader() {
  loaderEl.classList.remove('is-active');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add('is-active');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-active');
}
