import { render, replace, RenderPosition } from '../render.js';
import { KeyEnum } from '../const.js';
import AbstractView from '../view/abstract-view.js';
import FilmDeskPresenter from './films-desk-presenter.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';

class FilmPresenter {
  #filmsList = null;
  #filmData = null;
  #filmCard = null;
  #filmPopup = null;
  #footerContainer = null;
  #filmDeskPresenter = null;

  constructor(filmsList, footerContainer, filmDeskPresenter) {
    this.#filmsList = filmsList;
    this.#filmDeskPresenter = filmDeskPresenter;  // Использую ссылку на filmDeskPresenter. Приемлемая практика или нужно передавать гору функций в качестве аргументов конструктора?
    //this.#footerContainer = document.querySelector('.footer');  //Надо ли передавать в constructor контейнер, чтобы в FilmPresenter не было работы с DOM?
    this.#footerContainer = footerContainer;
  }

  init = (filmData) => {
    if (!(this.#filmsList instanceof AbstractView)) {
      throw new Error('Can\'t handle init() while filmsList is not Element');
    }
    if (!(this.#filmDeskPresenter instanceof FilmDeskPresenter)) {
      throw new Error('Can\'t handle init() while filmDeskPresenter is not initialized');
    }

    const prevFilmCard = this.#filmCard;
    const prevFilmPopup = this.#filmPopup;
    const scrollPosition = this.#getActivePopupScrollPosition();

    this.#filmData = filmData;
    this.#filmCard = new FilmCardView(this.#filmData);
    this.#filmPopup = new PopupView(this.#filmData);

    this.#setPresenterHandlers();

    if (prevFilmCard) {
      replace(prevFilmCard, this.#filmCard);
      prevFilmCard.removeElement();
    } else {
      render(this.#filmsList, this.#filmCard, RenderPosition.BEFOREEND);
    }

    if (this.#getActivePopupId() === this.#filmPopup.id) {
      this.#filmDeskPresenter.activePopup = this.#filmPopup;
    }

    if (prevFilmPopup) {
      replace(prevFilmPopup, this.#filmPopup);
      prevFilmPopup.removeElement();
    }

    this.#filmPopup.element.scrollTop = scrollPosition;
  }

  #setPresenterHandlers = () => {
    this.#filmCard.setFilmClickHandler(this.#onFilmCardClick);
    this.#filmCard.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmCard.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmCard.setFavoriteClickHandler(this.#onFavoriteClick);

    this.#filmPopup.setPopupCloseHandler(this.#onPopupButtonClose);
    this.#filmPopup.setCommentCloseHandlers(this.#onCommentButtonCloseClick);
    this.#filmPopup.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmPopup.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmPopup.setFavoriteClickHandler(this.#onFavoriteClick);
  }

  #getActivePopupScrollPosition = () => (this.#filmDeskPresenter.activePopup?.element.scrollTop || 0);
  #getActivePopupId = () => (this.#filmDeskPresenter.activePopup?.id || null);
  #getActivePopup = () => (this.#filmDeskPresenter.activePopup || null);

  #onWatchListClick = () => {
    this.#filmData.userDetails.watchlist = !this.#filmData.userDetails.watchlist;
    this.#filmDeskPresenter.updateFilmData(this.#filmData);
  }

  #onWatchedClick = () => {
    this.#filmData.userDetails.watched = !this.#filmData.userDetails.watched;
    this.#filmDeskPresenter.updateFilmData(this.#filmData);
  }

  #onFavoriteClick = () => {
    this.#filmData.userDetails.favorite = !this.#filmData.userDetails.favorite;
    this.#filmDeskPresenter.updateFilmData(this.#filmData);
  }

  #onFilmCardClick = () => {
    const activePopup = this.#getActivePopup();
    if (activePopup) {
      if (this.#getActivePopupId() !== this.#filmPopup.id) {
        replace(activePopup, this.#filmPopup);
      }
    }
    else {
      this.#filmCard.toggleDocumentScroll();
      render(this.#footerContainer, this.#filmPopup, RenderPosition.AFTEREND);
      document.addEventListener('keydown', this.#onEscKeyDown);
    }

    this.#filmDeskPresenter.activePopup = this.#filmPopup;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === KeyEnum.ESC) {
      this.#onPopupButtonClose();
    }
  };

  #onCommentButtonCloseClick = (evt) => {
    evt.preventDefault();
    evt.target.closest('li').remove();
  };

  #onPopupButtonClose = () => {
    this.#filmCard.toggleDocumentScroll();
    this.#filmCard.closePopup();
    this.#filmDeskPresenter.activePopup = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);  //todo:
  };

}

export { FilmPresenter as default };
