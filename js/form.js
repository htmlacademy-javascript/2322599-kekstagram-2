import { isEscapeKey } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAGS = /^(#[A-Za-zА-Яа-я0-9]{1,19})$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('.img-upload__input');
const photoUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hastagErrors = {
  tooMany: `Не больше ${MAX_HASHTAGS} хэштегов`,
  notUnique: 'Хэштеги должны быть уникальными',
  invalidFormat: 'Хэштег должен начинаться с # и содержать только буквы и цифры (максимум 20 символов)'
};

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.split(' ').map((tag) => tag.toLowerCase());

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  for (const tag of hashtags) {
    if (!VALID_HASHTAGS.test(tag)) {
      return false;
    }
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  if (!value) {
    return '';
  }
  const hashtags = value.split(' ').map((tag) => tag.toLowerCase());

  if (hashtags.length > MAX_HASHTAGS) {
    return hastagErrors.tooMany;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return hastagErrors.notUnique;
  }

  for (const tag of hashtags) {
    if (!VALID_HASHTAGS.test(tag)) {
      return hastagErrors.invalidFormat;
    }
  }

  return '';
};

const validateComment = (value) => {
  if (!value) {
    return true;
  }
  return value.length <= MAX_COMMENT_LENGTH;
};

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  () => getHashtagErrorMessage(hashtagInput.value)
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`
);

function closePhotoUpload() {
  photoUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hashtagInput.value = '';
  commentInput.value = '';
  cancelButton.removeEventListener('click', closePhotoUpload);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closePhotoUpload();
    }
  }
};

const initUploadModal = () => {
  uploadFileInput.addEventListener('change', () => {
    photoUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    cancelButton.addEventListener('click', closePhotoUpload);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      closePhotoUpload();
    }
  });
};

initUploadModal();
