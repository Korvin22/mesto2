//попапы
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-plus");
const popupImage = document.querySelector(".popup-image");
const popups = Array.from(document.querySelectorAll('.popup'));
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

// Находим форму в DOM
const formEdit = popupEditProfile.querySelector(".popup__form_edit");
const formAddCard = popupAddCard.querySelector(".popup__form_plus");

// Находим поля формы в DOM
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_job");

const buttonSavePopupAddCard = document.querySelector("popup__button-save");
//Функция открытия-закрытия попапа
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");

}

buttonOpenPopupEditProfile.addEventListener("click", function () {
  togglePopup(popupEditProfile);
  fillPopupEdit();
});

buttonOpenPopupAddCard.addEventListener("click", function () {
  togglePopup(popupAddCard);
});

buttonClosePopupEditProfile.addEventListener("click", function () {
  togglePopup(popupEditProfile);
});

buttonClosePopupAddCard.addEventListener("click", function () {
  togglePopup(popupAddCard);
});

buttonClosePopupImage.addEventListener("click", function () {
  togglePopup(popupImage);
});

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
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
  togglePopup(popupEditProfile);
  //popupSaveButtonElement.addEventListener('click', closePopupVisibility);
}

formEdit.addEventListener("submit", formEditProfileSubmitHandler);

const selectors = {
  inputTitle: ".popup__input_type_title",
  inputReference: ".popup__input_type_reference",
  elements: ".elements",
  template: ".element-template",
  element: ".elements__element",
  element__title: ".elements__title",
  elements__picture: ".elements__picture",
  trash: ".elements__trash",
  like: ".elements__like",
  popup__picture: ".popup__picture",
  popup__caption: ".popup__caption",
};

const inputTitle = formAddCard.querySelector(selectors.inputTitle);
const inputReference = formAddCard.querySelector(selectors.inputReference);
const cardsContainer = document.querySelector(selectors.elements);
const template = document
  .querySelector(selectors.template)
  .content.querySelector(selectors.element);

function createCard({ name, reference }) {
  const cardElement = template.cloneNode(true);
  const cardPicture = cardElement.querySelector(selectors.elements__picture);
  cardElement.querySelector(selectors.element__title).textContent = name;
  cardPicture.alt = name;
  cardPicture.src = reference;
  cardElement
    .querySelector(selectors.trash)
    .addEventListener("click", removeCard);
  cardElement
    .querySelector(selectors.like)
    .addEventListener("click", handleLikeClick);
  cardPicture.addEventListener("click", handleClickCardImage);
  return cardElement;
}

function renderCard({ name, reference }, cardsContainer) {
  // Создаем карточку на основе данных
  const cardElement = createCard({ name, reference });
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
}

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();

  renderCard(
    { name: inputTitle.value, reference: inputReference.value },
    cardsContainer
  );
  togglePopup(popupAddCard);
});

function createInitialCards() {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  initialCards.forEach((card) =>
    renderCard({ name: card.name, reference: card.link }, cardsContainer)
  );
}

function removeCard(event) {
  event.target.closest(".elements__element").remove();
}

function handleLikeClick(event) {
  const element = event.target;
  element.classList.toggle("elements__like_active");
}

function handleClickCardImage(event) {
  const element = event.target;
  popupImage.querySelector(selectors.popup__caption).textContent = element.alt;
  popupImage.querySelector(selectors.popup__picture).alt = element.alt;
  popupImage.querySelector(selectors.popup__picture).src = element.src;
  togglePopup(popupImage);
}

createInitialCards();

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function closePopupEsc(evt,popup) {
  if (evt.key === 'Escape') {
    console.log(evt.key);
    closePopup(popup);
    }
}

function closePopupByOverlay(evt,popup) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  togglePopup(popup);
}

popupAddCard.addEventListener('click', function (evt) {
  closePopupByOverlay(evt,popupAddCard)
});
popupEditProfile.addEventListener('click', function (evt) {
  closePopupByOverlay(evt,popupEditProfile)
});
popupImage.addEventListener('click', function (evt) {
  closePopupByOverlay(evt,popupImage)
});

function closeAllPopupOnEsc(evt) {
  if (evt.key === 'Escape'){
  popups.forEach((popup) => {
    popup.classList.remove('popup_opened');
  })}
}

document.addEventListener('keydown',closeAllPopupOnEsc);



