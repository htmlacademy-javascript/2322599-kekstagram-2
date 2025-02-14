const BigPicture = document.querySelector('.big-picture');
const closeButton = BigPicture.querySelector('.big-picture__cancel');
const BodyElement = document.body;

const renderBigPicture = (photo) => {
const bigPictureImage = BigPicture.querySelector('.big-picture__img');
const SocialCaption = BigPicture.querySelector('.social__caption');
const likesCount = BigPicture.querySelector('.likes-count');
const commentsShownCount = BigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = BigPicture.querySelector('.social__comment-total-count');
const socialComments = BigPicture.querySelector('.social__comments');

socialComments.innerHTML = '';

bigPictureImage.src = photo.url;
likesCount.textContent = photo.likes;
commentsShownCount.textContent = photo.comments.length;
commentsTotalCount.textContent = photo.comments.length;
SocialCaption.textContent = photo.description;

photo.comments.forEach((comment) => {
  const commentElement = document.createElement('li');

  commentElement.classList.add('social__comment');

  commentElement.innerHTML =
  <img class="social__picture"
  src="${comment.avatar}"
  alt="${comment.name}"
  width="35"
  height="35">
    <p class = "social__text">${comment.message}</p>;

    socialComments.appendChild(commentElement);
    });

    BigPicture.classList.remove('hidden');
BodyElement.classList.add('modal-open');

closeButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', onEscKeyPress);
};

const closeBigPicture = () => {
  BigPicture.classList.add('hidden');
  BodyElement.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKeyPress);
};

const onEscKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

export {renderBigPicture};
