import {
  selectors,
  formAdd,
  formEditProfile,
  initialCards,
} from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./section.js";
import {Popup} from "./popup.js";

//попапы
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-plus");
const popupImage = document.querySelector(".popup-image");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupsSelectors = [".popup-edit", ".popup-plus", ".popup-image"]

//кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__open-popup"
);
const buttonOpenPopupAddCard = document.querySelector(".profile__button-plus");

/*кнопка закрытия попапов
const buttonClosePopupEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
);
const buttonClosePopupAddCard = popupAddCard.querySelector(
  ".popup__button-close"
);
const buttonClosePopupImage = document.querySelector(
  ".popup__button-close_image"
);
const buttonSubmitAddCard = popupAddCard.querySelector(".popup__button-save");
*/

/*function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}*/

popupsSelectors.forEach((popupSelector) => {
  const popupElement = new Popup(popupSelector);
  popupElement.setEventListeners();
  return popupElement
});

const classPopupEdit = new Popup('.popup-edit');
const classPopupAddCard = new Popup('.popup-plus');
const classPopupImage = new Popup('.popup-image');

// Находим форму в DOM
const formEdit = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_plus");

// Находим поля формы в DOM
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_job");

const buttonSavePopupAddCard = document.querySelector("popup__button-save");
//Функция открытия-закрытия попапа
/*function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}*/

buttonOpenPopupEditProfile.addEventListener("click", () => {
  classPopupEdit.openPopup()
  fillPopupEdit();
});

buttonOpenPopupAddCard.addEventListener("click", function () {
  classPopupAddCard.openPopup()
});

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPicture = document.querySelector(selectors.popup__picture);
const popupCaption = document.querySelector(selectors.popup__caption);
const inputTitle = formAddCard.querySelector(selectors.inputTitle);
const inputReference = formAddCard.querySelector(selectors.inputReference);
//заполнение попапа с именем и занятием
const fillPopupEdit = function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

const template = document
  .querySelector(selectors.template)
  .content.querySelector(selectors.element);

function handleSubmitButtonFormEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.g
  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  classPopupEdit.closePopup();
  //popupSaveButtonElement.addEventListener('click', closePopupVisibility);
}

formEdit.addEventListener("submit", handleSubmitButtonFormEdit);

//function closeAllPopupOnEsc(evt) {
//if (evt.key === 'Escape'){
//popups.forEach((popup) => {
//  popup.classList.remove('popup_opened');
//})}
//}
export function handleCardClick({ name, link }) {
  popupCaption.textContent = name;
  popupPicture.alt = name;
  popupPicture.src = link;
  classPopupImage.openPopup();
}

/*const cardsContainer = document.querySelector(selectors.elements);*/

function createCard({ name, link }) {
  const card = new Card({ name, link }, selectors.template, handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const cardElement = createCard({ name, link });
      section.addItem(cardElement);
    },
  },
  selectors.elements
);

section.renderInitialItems();

/*

function renderCard({ name, link }, place) {
  const cardElement = createCard({ name, link })
  place.prepend(cardElement);

}

function createInitialCards() {
  initialCards.forEach((item) => {
    renderCard(item, cardsContainer);

  });
}

createInitialCards();*/

const formProfile = new FormValidator(formEditProfile, formEdit);
formProfile.enableValidation();

const formCard = new FormValidator(formAdd, formAddCard);
formCard.enableValidation();

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();

  /*renderCard(
    { name: inputTitle.value, link: inputReference.value },
    cardsContainer
  );*/
  const cardElement = createCard({
    name: inputTitle.value,
    link: inputReference.value,
  });
  section.addItem(cardElement);
  formAddCard.reset();
  classPopupAddCard.closePopup();
  formCard.setDisabledState();
});
