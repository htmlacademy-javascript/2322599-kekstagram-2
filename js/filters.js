import { renderPhotos, clearPhotos } from './picture.js';
import { debounce, shuffleArray } from './util.js';

const TIMEOUT_DELAY_MS = 500;
const MAX_RANDOM_IMAGES = 10;

const filterContainer = document.querySelector('.img-filters');
let currentActiveFilter = filterContainer.querySelector('.img-filters__button--active');

// Сортирует по количеству комментариев
const sortByCommentCount = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;



// Определяет фильтры
const photoFilters = {
  defaultFilter: {
    id: 'filter-default',
    applyFilter(photos) {
      return [...photos];
    }
  },
  randomFilter: {
    id: 'filter-random',
    applyFilter(photos) {
      return shuffleArray([...photos]).slice(0, MAX_RANDOM_IMAGES);
    }
  },
  discussedFilter: {
    id: 'filter-discussed',
    applyFilter(photos) {
      return [...photos].sort(sortByCommentCount);
    }
  }
};

// Примененяет выбранный фильтр
const applySelectedFilter = (photos, activeElement) => {
  const selectedFilter = Object.values(photoFilters).find((filterItem) => filterItem.id === activeElement.id);
  return selectedFilter ? selectedFilter.applyFilter(photos) : photos;
};

// Обновляет активный фильтр
const updateActiveFilter = (newActiveElement) => {
  currentActiveFilter.classList.remove('img-filters__button--active');
  newActiveElement.classList.add('img-filters__button--active');
  currentActiveFilter = newActiveElement;
};

// Показывает контейнер фильтров
const revealFilterContainer = () => filterContainer.classList.remove('img-filters--inactive');

// Настраивает клик по кнопкам фильтров
const setupFilterButtonClick = (photos, callback) => {
  filterContainer.addEventListener('click', debounce((evt) => {
    const target = evt.target;
    if (!target.matches('.img-filters__button') || target === currentActiveFilter) {
      return;
    }
    updateActiveFilter(target);
    clearPhotos();
    const filteredPhotos = applySelectedFilter(photos, target);
    callback(filteredPhotos);
  }, TIMEOUT_DELAY_MS));
};

// Инициализирует сортировку
const initializeSorting = (photos) => {
  revealFilterContainer();
  setupFilterButtonClick(photos, renderPhotos);
};

export { initializeSorting };

