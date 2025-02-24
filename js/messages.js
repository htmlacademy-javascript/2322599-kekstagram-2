const ALERT_SHOW_TIME_MS = 5000;

const showError = (message) => {
  const template = document.querySelector('#error');
  const errorElement = template.content.cloneNode(true);

  const titleElement = errorElement.querySelector('.error__title');
  if (titleElement) {
    titleElement.textContent = message;
  }

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME_MS);
};

const showSuccess = () => {
  const template = document.querySelector('#success');
  const successElement = template.content.cloneNode(true);

  const button = successElement.querySelector('.success__button');
  if (button) {
    button.addEventListener('click', () => {
      successElement.remove();
    });
  }

  document.body.appendChild(successElement);

  setTimeout(() => {
    successElement.remove();
  }, ALERT_SHOW_TIME_MS);
};

const showDataError = () => {
  const template = document.querySelector('#data-error');
  const dataErrorElement = template.content.cloneNode(true);

  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME_MS);
};

export { showError, showSuccess, showDataError };

