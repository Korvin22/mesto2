const formAdd = {
  form: ".popup__form_plus",
  button: '.popup__button-save',
  inactiveButton: '.popup__button-save_disabled'
};

const formEditProfile = {
  form: ".popup__form_edit",
  button: '.popup__button-save',
  inactiveButton: '.popup__button-save_disabled'
};

function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("input", (event) => handleFormInput(event,config));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
  if (isValid) {
    alert("Форма валидна!");
    form.reset();
  } else {
    alert("Форма не валидна!");
  }
}

function handleFormInput(event,config) {
  const input = event.target;
  const form = event.currentTarget;
  setCustomError(input);
  showFieldError(input);
  setSubmitButtonState(form,config);
}

function setCustomError(input) {
  const validity = input.validity;
  input.setCustomValidity("");
  if (validity.tooShort) {
    input.setCustomValidity("Ввод слишком короткий!");
  }
  if (validity.tooLong) {
    input.setCustomValidity("Ввод слишком длинный!");
  }
  if ((validity.typeMismatch) && (type='url')) {
    input.setCustomValidity("Введите ссылку!");
  }
  if (validity.valueMissing) {
    input.setCustomValidity("Заполните поле!");
  }

}

function showFieldError(input) {
  const span=input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form,config) {
  button=form.querySelector(config.button);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled','');
    button.classList.remove('popup__button-save_disabled');

  } else
  {
    button.setAttribute('disabled',true);
    button.classList.add('popup__button-save_disabled');

  }
}




enableValidation(formEditProfile);
enableValidation(formAdd);
