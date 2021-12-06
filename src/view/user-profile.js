import { createElement } from '../render';

const getUserProfileTemplate = (userRank) => (
  `<section class="header__profile profile ">
    <p class="profile__rating">${userRank || ''}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

class UserProfileView {
  #userRank = '';
  #element = null;
  constructor(userRank) {
    this.#userRank = userRank;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(getUserProfileTemplate(this.#userRank));
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { UserProfileView as default };
