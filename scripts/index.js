//попапы
const popupEdit = document.querySelector('.popup-edit');
const popupPlus = document.querySelector('.popup-plus');
const popupImage = document.querySelector('.popup-image');
//кнопки открытия попапов
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupPlusOpenButton = document.querySelector('.profile__button-plus');

//кнопка закрытия попапов
const popupCloseButtonElement = popupEdit.querySelector('.popup__button-close');
const popupPlusCloseButton = popupPlus.querySelector('.popup__button-close');
const popupImageCloseButton = document.querySelector('.popup__button-close_image');

// Находим форму в DOM
let formEdit = popupEdit.querySelector('.popup__form_edit');
let formPlus = popupPlus.querySelector('.popup__form_plus');

// Находим поля формы в DOM
let nameInput = formEdit.querySelector('.popup__input_type_name');
let jobInput = formEdit.querySelector('.popup__input_type_job');

const popupPlusSaveButton = document.querySelector('popup__button-save');
//Функция открытия-закрытия попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

}

popupOpenButtonElement.addEventListener('click', function () {
  togglePopup(popupEdit);
});

popupPlusOpenButton.addEventListener('click', function () {
  togglePopup(popupPlus);
});

popupCloseButtonElement.addEventListener('click', function () {
  togglePopup(popupEdit);
})

popupPlusCloseButton.addEventListener('click', function () {
  togglePopup(popupPlus);
})

popupImageCloseButton.addEventListener('click', function () {
  togglePopup(popupImage);
})


let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
//заполнение попапа с именем и занятием
const fillPopupEdit = function () {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

}

fillPopupEdit();

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.g
  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupEdit.classList.remove('popup_opened');
  //popupSaveButtonElement.addEventListener('click', closePopupVisibility);
}

formEdit.addEventListener('submit', formSubmitHandler);


const selectors = {
  form: '.popup-plus__form',
  inputTitle: '.popup__input_type_title',
  inputReference: '.popup__input_type_reference',
  elements: '.elements',
  template: '.element-template',
  element: '.elements__element',
  element__title: '.elements__title',
  elements__picture: '.elements__picture',
  trash: '.elements__trash',
  like: '.elements__like',
  popup__picture: '.popup__picture',
  popup__caption: '.popup__caption'

};

const inputTitle = formPlus.querySelector(selectors.inputTitle);
const inputReference = formPlus.querySelector(selectors.inputReference);
const elements = document.querySelector(selectors.elements);
const element = document.querySelector(selectors.element);
const trash = document.querySelector(selectors.trash);


function createCard({ name, reference }) {
  const template = document.querySelector(selectors.template).content.querySelector(selectors.element).cloneNode(true);
  template.querySelector(selectors.element__title).textContent = name;
  template.querySelector(selectors.elements__picture).alt = name;
  template.querySelector(selectors.elements__picture).src = reference;
  template.querySelector(selectors.trash).addEventListener('click', cardRemove);
  template.querySelector(selectors.like).addEventListener('click', activeLike);
  template.querySelector(selectors.elements__picture).addEventListener('click', popupImageOpen);
  template.querySelector(selectors.elements__picture).addEventListener('click', fillpopupImage);
  return template
};

function renderCard({ name, reference }, cardsContainer) {
  // Создаем карточку на основе данных
  const cardElement = createCard({ name, reference });
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
}

function addEventListeners() {
  formPlus.addEventListener('submit', function (event) {
    event.preventDefault();

    renderCard({ name: inputTitle.value, reference: inputReference.value }, elements);

  })
};


function createInitialCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach((card) => renderCard({ name: card.name, reference: card.link }, elements));

}

function cardRemove(event) {
  const element = event.target.parentNode;
  element.remove()
}

function activeLike(event) {
  const element = event.target;
  element.classList.toggle('elements__like_active');
}

function popupImageOpen() {

  togglePopup(popupImage);

};

function fillpopupImage(event) {
  const element = event.target;
  const el = document.querySelector('.popup-image');
  el.querySelector(selectors.popup__caption).textContent = element.alt;
  el.querySelector(selectors.popup__picture).alt = element.alt;
  el.querySelector(selectors.popup__picture).src = element.src;
}

addEventListeners();
createInitialCards();











