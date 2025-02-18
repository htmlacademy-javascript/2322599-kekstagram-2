import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bodyElement = document.body;
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');

let currentCommentIndex = 0;

// Закрывает модальное окно
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

// Закрывает модальное окно по клику
const onCloseButtonClick = () => closeBigPicture();

// Закрыввет при нажатии Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Отображает комментарии
const renderComments = (comments) => {
  const commentsToShow = comments.slice(currentCommentIndex, currentCommentIndex + COMMENTS_STEP);

  socialComments.innerHTML = '';

  commentsToShow.forEach(createComment);

  updateCommentCount(comments);
};

// Создает эллемент для одного комментария
const createComment = (comment) => {
  const commentElement = document.createElement('li');

  commentElement.classList.add('social__comment');
  commentElement.innerHTML =
    `<img class="social__picture"
    src="${comment.avatar}"
    alt="${comment.name}"
    width="35"
    height="35">
    <p class="social__text">${comment.message}</p>`;
  socialComments.appendChild(commentElement);
};

// Обновляет счетчик комментариев
const updateCommentCount = (comments) => {
  commentsShownCount.textContent = Math.min(currentCommentIndex + COMMENTS_STEP, comments.length);
  commentsTotalCount.textContent = comments.length;

  commentsLoader.classList.toggle('hidden', currentCommentIndex + COMMENTS_STEP >= comments.length);
};

// Открывает большое фото
const openBigPicture = (photo) => {
  updateBigPicture(photo);
  ShowBigPicture();
};

// Обновляет большое фото
const updateBigPicture = (photo) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');

  currentCommentIndex = 0;

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);
  setUpCommentsLoader(photo.comments);
};

// Настраивает обработчик для загрузки комментариев
const setUpCommentsLoader = (comments) => {
  commentsLoader.onclick = () => {
    currentCommentIndex += COMMENTS_STEP;
    renderComments(comments);
  };
};

// Управляет большим фото
const ShowBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
}

closeButton.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

export { openBigPicture };
