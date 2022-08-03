function enableValidation(config) {
  const form = document.querySelector(config.form);
  const button=form.querySelector(config.button);
  form.addEventListener("input", (event) => handleFormInput(event,config,button));
}

function setDisabledState(button,config) {
  button.setAttribute('disabled',true);
  button.classList.add(config.inactiveButton);
  button.classList.remove(config.activeButton);
}


function handleFormInput(event,config,button) {
  const input = event.target;
  setCustomError(input);
  showFieldError(input);
  setSubmitButtonState(event.currentTarget,config,button);
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

function setSubmitButtonState(form,config,button) {
  const isValid = form.checkValidity();
  if (isValid) {
    button.classList.remove(config.inactiveButton);
    button.classList.add(config.activeButton);
    button.removeAttribute('disabled','');

  } else
  {
    setDisabledState(button,config);

  }
}

enableValidation(formEditProfile);
enableValidation(formAdd);












