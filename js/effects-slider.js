const EFFECTS_DATA = {
  original: { min: 0, max: 1, step: 1, start: 0 },
  chrome: { min: 0, max: 1, step: 0.1, start: 1 },
  sepia: { min: 0, max: 1, step: 0.1, start: 1 },
  marvin: { min: 0, max: 100, step: 1, start: 100 },
  phobos: { min: 0, max: 3, step: 0.1, start: 3 },
  heat: { min: 1, max: 3, step: 0.1, start: 3 },
};

const effectLevelInput = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');

noUiSlider.create(slider, {
  range: {
    min: EFFECTS_DATA.original.min,
    max: EFFECTS_DATA.original.max
  },
  start: EFFECTS_DATA.original.start,
  step: EFFECTS_DATA.original.step,
  connect: 'lower'
});

// Обновляет эффект
const updateEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      previewImage.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      previewImage.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      previewImage.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      previewImage.style.filter = `brightness(${value})`;
      break;
    case 'original':
    default:
      previewImage.style.filter = '';
      break;
  }
};

// Обработчик изменения эффекта
const initEffects = () => {
  document.querySelectorAll('input[name="effect"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const selectedEffect = event.target.value;

      // Устанавливает значение слайдера на 0 для оригинала
      if (selectedEffect === 'original') {
        effectLevelContainer.style.display = 'none';
        slider.noUiSlider.set(0);
        updateEffect(selectedEffect, 0);
        return;
      } else {
        effectLevelContainer.style.display = 'block';
      }

      effectLevelInput.value = EFFECTS_DATA[selectedEffect].start;

      // Устанавливает значение слайдера
      slider.noUiSlider.updateOptions({
        range: {
          min: EFFECTS_DATA[selectedEffect].min,
          max: EFFECTS_DATA[selectedEffect].max
        },
        start: EFFECTS_DATA[selectedEffect].start,
        step: EFFECTS_DATA[selectedEffect].step
      });

      slider.noUiSlider.set(EFFECTS_DATA[selectedEffect].start);

      // Обновление эффекта
      updateEffect(selectedEffect, effectLevelInput.value);
    });
  });

  // Обработчик изменения слайдера
  slider.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    effectLevelInput.value = value;

    const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
    updateEffect(selectedEffect, value);
  });

  // Инициализация слайдера при загрузке страницы
  updateEffect('original', 0);
};

export { initEffects };
