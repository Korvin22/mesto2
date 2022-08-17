export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._selectorButton = this._config.button;
    this._input = this._config.input;
    this._inactiveButton = this._config.inactiveButton;
    this._activeButton = this._config.activeButton;
  }

  enableValidation() {
    this._button = this._form.querySelector(this._selectorButton);
    this._form.addEventListener("input", (event) =>
      this._handleFormInput(event, this._button)
    );
  }

  _handleFormInput(event) {
    const input = event.target;
    this._setCustomError(input);
    this._showFieldError(input);
    this._setSubmitButtonState(this._button);
  }

  _setCustomError(input) {
    const validity = input.validity;
    if (validity.tooShort) {
      input.validationMessage;
    }
    if (validity.tooLong) {
      input.validationMessage;
    }
    if (validity.typeMismatch) {
      input.validationMessage;
    }
    if (validity.valueMissing) {
      input.validationMessage;
    }
  }

  setDisabledState() {
    this._button.setAttribute("disabled", true);
    this._button.classList.add(this._inactiveButton);
    this._button.classList.remove(this._activeButton);
  }

  _showFieldError(input) {
    const span = this._form.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
  }

  _setSubmitButtonState() {
    const isValid = this._form.checkValidity();
    if (isValid) {
      this._button.classList.remove(this._inactiveButton);
      this._button.classList.add(this._activeButton);
      this._button.removeAttribute("disabled", "");
    } else {
      this.setDisabledState(this._button, this._config);
    }
  }
}
