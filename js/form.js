import { isEscapeKey } from './util.js';
import { initScaleControls } from './scale.js'
import { initEffects } from './effects-slider.js';

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
  invalidFormat: 'Хэштег должен начинаться с # и содержать только буквы и цифры (максимум 20 символов)',
  maxLength: `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`
};

const extractLowerCaseHashtags = (value) =>
  value.split(' ').map((tag) => tag.toLowerCase());

const hasUniqueHashtags = (hashtags) => {
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size !== hashtags.length;
};

const checkHashtagValidity = (hashtags) => {
  let isValid = true;
  let error = '';

  if (hashtags.length > MAX_HASHTAGS) {
    isValid = false;
    error = hastagErrors.tooMany;
  } else if (hasUniqueHashtags(hashtags)) {
    isValid = false;
    error = hastagErrors.notUnique;
  } else {
    const invalidHashtag = hashtags.find((tag) => !VALID_HASHTAGS.test(tag));
    if (invalidHashtag) {
      isValid = false;
      error = hastagErrors.invalidFormat;
    }
  }

  return { isValid, error };
};

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = extractLowerCaseHashtags(value);
  const { isValid } = checkHashtagValidity(hashtags);

  return isValid;
};

const getHashtagErrorMessage = (value) => {
  if (!value) {
    return '';
  }

  const hashtags = extractLowerCaseHashtags(value);
  const { isValid, error } = checkHashtagValidity(hashtags);

  return isValid ? '' : error;
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
  hastagErrors.maxLength
);

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

function closePhotoUpload() {
  photoUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hashtagInput.value = '';
  commentInput.value = '';
  cancelButton.removeEventListener('click', closePhotoUpload);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const initUploadModal = () => {
  uploadFileInput.addEventListener('change', () => {
    photoUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    cancelButton.addEventListener('click', closePhotoUpload);
    document.addEventListener('keydown', onDocumentKeydown);

    initScaleControls();
    initEffects();
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      closePhotoUpload();
    }
  });
};

initUploadModal();
