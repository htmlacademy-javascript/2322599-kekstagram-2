import { renderPhotos } from './picture.js';
import { getData } from './api.js';
import { showDataError } from './messages.js';
import './form.js';
import { initUploadModal } from './form.js';
import { initializeSorting } from './filters.js';

getData()
  .then((data) => {
    renderPhotos(data);
    initializeSorting(data);
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

initUploadModal();
