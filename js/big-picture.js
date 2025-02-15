import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bodyElement = document.body;

const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
};

const openBigPicture = (photo) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsShownCount = bigPicture.querySelector(
    '.social__comment-shown-count'
  );
  const commentsTotalCount = bigPicture.querySelector(
    '.social__comment-total-count'
  );
  const socialComments = bigPicture.querySelector('.social__comments');

  socialComments.innerHTML = '';

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsShownCount.textContent = photo.comments.length;
  commentsTotalCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  const commentsList = photo.comments.reduce((accumulator, comment) =>
    accumulator +
    `<li class="social__comment">
            <img class="social__picture"
                src="${comment.avatar}"
                alt="${comment.name}"
                width="35"
                height="35">
            <p class="social__text">${comment.message}</p>
        </li>`
    , '');

  socialComments.innerHTML = commentsList;

  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openBigPicture };
