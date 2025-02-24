import { previewImage } from './effects-slider.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const effectsPreview = document.querySelectorAll('.effects__preview');

const isFileTypeValid = (fileName) =>
  FILE_TYPES.some((type) => fileName.endsWith(type));

const createImagePreview = (file) => {
  const imageUrl = URL.createObjectURL(file);
  return imageUrl;
};

const applyEffects = (imageUrl) => {
  effectsPreview.forEach((filter) => {
    filter.style.backgroundImage = `url("${imageUrl}")`;
  });
};

const uploadFile = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];

    if (isFileTypeValid(file.name.toLowerCase())) {
      const imageUrl = createImagePreview(file);
      previewImage.src = imageUrl;
      applyEffects(imageUrl);
    }
  });
};

export { uploadFile };
