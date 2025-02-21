const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = 100;

// Обновляет масштаб
const updateScale = (newScale) => {
  currentScale = newScale;
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const initScaleControls = () => {
  updateScale(currentScale);

  // Обработчик события для кнопки уменьшения масштаба
  scaleControlSmaller.addEventListener('click', () => {
    if (currentScale > MIN_SCALE) {
      updateScale(currentScale - SCALE_STEP);
    }
  });

  // Обработчик события для кнопки увеличения масштаба
  scaleControlBigger.addEventListener('click', () => {
    if (currentScale < MAX_SCALE) {
      updateScale(currentScale + SCALE_STEP);
    }
  });
};

export { initScaleControls };
