const NO_EFFECT = 'none';
const INITIAL_VALUE = 0;

const effectsData = {
  none: { min: 0, max: 1, step: 1, start: 0, filter: '' },
  chrome: { min: 0, max: 1, step: 0.1, start: 1, filter: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, start: 1, filter: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, start: 100, filter: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, start: 3, filter: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, start: 3, filter: (value) => `brightness(${value})` },
};

const effectLevelInput = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');

noUiSlider.create(slider, {
  range: {
    min: effectsData.none.min,
    max: effectsData.none.max
  },
  start: effectsData.none.start,
  step: effectsData.none.step,
  connect: 'lower'
});

// Обновляет эффект
const updateEffect = (effect, value) => {
  const selectedEffectData = effectsData[effect];

  if (selectedEffectData && selectedEffectData.filter) {
    previewImage.style.filter = selectedEffectData.filter(value);
  } else {
    previewImage.style.filter = '';
  }
};

// Сбрасывает эффект к исходному состоянию
const resetEffect = () => {
  effectLevelContainer.style.display = 'none';
  previewImage.style.filter = '';
};

// Обработчик изменения эффекта
const initEffects = () => {
  document.querySelectorAll('input[name="effect"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const selectedEffect = event.target.value;

      // Устанавливает значение слайдера на 0 для оригинала
      if (selectedEffect === 'none') {
        resetEffect();
        slider.noUiSlider.set(0);
        updateEffect(selectedEffect, 0);
        return;
      } else {
        effectLevelContainer.style.display = 'block';
      }

      effectLevelInput.value = effectsData[selectedEffect].start;

      // Устанавливает значение слайдера
      slider.noUiSlider.updateOptions({
        range: {
          min: effectsData[selectedEffect].min,
          max: effectsData[selectedEffect].max
        },
        start: effectsData[selectedEffect].start,
        step: effectsData[selectedEffect].step
      });

      slider.noUiSlider.set(effectsData[selectedEffect].start);

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
  updateEffect(NO_EFFECT, INITIAL_VALUE);
};

export { initEffects, resetEffect };
