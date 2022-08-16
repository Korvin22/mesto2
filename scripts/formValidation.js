
export class FormValidator {
  constructor(config,form, setDisabledState){
    this._config = config;
    this._form = form;
    this._button = this._config.button;
    this._input = this._config.input;
    this._inactiveButton = this._config.inactiveButton;
    this._activeButton = this._config.activeButton;
    this._setDisabledState = setDisabledState;

  }

  enableValidation() {
    const form = this._form;
    const button=form.querySelector(this._button);
    form.addEventListener("input", (event) => this._handleFormInput(event, button));
  }


  _handleFormInput(event, button) {
    const input = event.target;
    this._setCustomError(input);
    this._showFieldError(input);
    this._setSubmitButtonState(button);
  }

  _setCustomError(input) {
    const validity = input.validity;
    input.setCustomValidity("");
    if (validity.tooShort) {
      input.setCustomValidity("Ввод слишком короткий!");
    }
    if (validity.tooLong) {
      input.setCustomValidity("Ввод слишком длинный!");
    }
    if ((validity.typeMismatch)) {
      input.setCustomValidity("Введите ссылку!");
    }
    if (validity.valueMissing) {
      input.setCustomValidity("Заполните поле!");
    }

  }

  _showFieldError(input) {
    const span=input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  _setSubmitButtonState(button) {
    const isValid = this._form.checkValidity();
    if (isValid) {
      button.classList.remove(this._inactiveButton);
      button.classList.add(this._activeButton);
      button.removeAttribute('disabled','');

    } else
    {
      this._setDisabledState(button,this._config);

    }
  }

}



