import { generatePhotos } from './data.js';
import { renderPhotos } from './picture.js';
import { getData } from './api.js';
import { showDataError } from './messages.js';
import './form.js';
import { initUploadModal } from './form.js'

getData()
  .then((data) => {
    renderPhotos(data);
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

initUploadModal();
