import AbstractView from './abstract-view';

const getUserProfileTemplate = (userRank) => (
  `<section class="header__profile profile ">
    <p class="profile__rating">${userRank || ''}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

class UserProfileView extends AbstractView {
  #userRank = '';
  constructor(userRank) {
    super();
    this.#userRank = userRank;
  }

  get template() {
    return getUserProfileTemplate(this.#userRank);
  }
}

export { UserProfileView as default };
