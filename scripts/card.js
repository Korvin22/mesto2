const popupPicture = document.querySelector(selectors.popup__picture);
const popupCaption = document.querySelector(selectors.popup__caption);
const inputTitle = formAddCard.querySelector(selectors.inputTitle);
const inputReference = formAddCard.querySelector(selectors.inputReference);
const cardsContainer = document.querySelector(selectors.elements);

/* const selectors = {
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
  };*/

class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(selectors.element)
      .cloneNode(true);

    return cardElement;
  }
  _removeCard() {
    this._element.closest(".elements__element").remove();
  }

  _handleLikeClick() {
    this._element
      .querySelector(selectors.like)
      .classList.toggle("elements__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(selectors.trash)
      .addEventListener("click", () => {
        this._removeCard();
      });
    this._element
      .querySelector(selectors.like)
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element
      .querySelector(selectors.elements__picture)
      .addEventListener("click", () => {
        this._handleCardClick({name:this._name,link:this._link});
      });
  }

  createCard() {
    this._element = this._getTemplate();
    const cardPicture = this._element.querySelector(
      selectors.elements__picture
    );
    this._element.querySelector(selectors.element__title).textContent =
      this._name;
    cardPicture.alt = this._name;
    cardPicture.src = this._link;
    this._setEventListeners();
    return this._element;
  }
}
function createInitialCards(){
initialCards.forEach((item) => {
  const card = new Card(item, selectors.template,handleCardClick);
  const CardElement = card.createCard();

  cardsContainer.prepend(CardElement);
});
};

createInitialCards();









/*function createCard({ name, reference }) {
  const cardElement = template.cloneNode(true);
  const cardPicture = cardElement.querySelector(selectors.elements__picture);
  cardElement.querySelector(selectors.element__title).textContent = name;
  cardPicture.alt = name;
  cardPicture.src = reference;

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
  formAddCard.reset();
  closePopup(popupAddCard);
  setDisabledState(buttonSubmitAddCard, formAdd);
});

*/
