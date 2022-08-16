import {selectors,formAdd,formEditProfile,initialCards} from './constants.js';
import {FormValidator} from './formValidation.js';
import {Card,cardsContainer} from './card.js';


//попапы
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-plus");
const popupImage = document.querySelector(".popup-image");
const popups = Array.from(document.querySelectorAll(".popup"));
//кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__open-popup"
);
const buttonOpenPopupAddCard = document.querySelector(".profile__button-plus");

//кнопка закрытия попапов
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

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__button-close")
    ) {
      closePopup(popup);
    }
  });
});


// Находим форму в DOM
const formEdit = popupEditProfile.querySelector(".popup__form_edit");
export const formAddCard = popupAddCard.querySelector(".popup__form_plus");

// Находим поля формы в DOM
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_job");

const buttonSavePopupAddCard = document.querySelector("popup__button-save");
//Функция открытия-закрытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

buttonOpenPopupEditProfile.addEventListener("click", function () {
  openPopup(popupEditProfile);
  fillPopupEdit();
});

buttonOpenPopupAddCard.addEventListener("click", function () {
  openPopup(popupAddCard);
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

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.g
  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
  //popupSaveButtonElement.addEventListener('click', closePopupVisibility);
}

formEdit.addEventListener("submit", formEditProfileSubmitHandler);

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//function closeAllPopupOnEsc(evt) {
//if (evt.key === 'Escape'){
//popups.forEach((popup) => {
//  popup.classList.remove('popup_opened');
//})}
//}
export function handleCardClick({name,link}) {
  popupCaption.textContent = name;
  popupPicture.alt = name;
  popupPicture.src = link;
  openPopup(popupImage);}

  function setDisabledState(button,config) {
    button.setAttribute('disabled',true);
    button.classList.add(config.inactiveButton);
    button.classList.remove(config.activeButton);
  }

  formAddCard.addEventListener("submit", function (event) {
    event.preventDefault();
    const card = new Card({name:inputTitle.value,link: inputReference.value}, selectors.template,handleCardClick);
    const CardElement = card.createCard();
    cardsContainer.prepend(CardElement);
    formAddCard.reset();
    closePopup(popupAddCard);
    setDisabledState(buttonSubmitAddCard, formAdd);
  });

  const form1 = new FormValidator(formEditProfile,formEdit,setDisabledState)
  form1.enableValidation();

  const form2 = new FormValidator(formAdd,formAddCard,setDisabledState)
  form2.enableValidation();

