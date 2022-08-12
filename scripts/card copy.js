class Card {
  constructor(data,selector){
    this._name = data.name;
    this._reference = data.reference;
    this._selector = selector;
  }

  _getTemplate() {
    const template = document
    .querySelector(this._selector)
    .content.querySelector(selectors.element);
    const cardElement = template.cloneNode(true);
  }
}






const popupPicture = document.querySelector(selectors.popup__picture);
const popupCaption = document.querySelector(selectors.popup__caption);
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
  formAddCard.reset();
  closePopup(popupAddCard);
  setDisabledState(buttonSubmitAddCard, formAdd);
});

function createInitialCards() {

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
  popupCaption.textContent = element.alt;
  popupPicture.alt = element.alt;
  popupPicture.src = element.src;
  openPopup(popupImage);
}

createInitialCards();
