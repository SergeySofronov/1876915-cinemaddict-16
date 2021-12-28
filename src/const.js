const SectionMessages = {
  DEFAULT: 'All movies. Upcoming',
  RATED: 'Top rated',
  POPULAR: 'Most commented',
  NO_MOVIES: 'There are no movies in our database',
  NO_WATCHLIST: 'There are no movies to watch now',
  NO_HISTORY: 'There are no watched movies now',
  NO_FAVORITE: 'There are no favorite movies now'
};

const SortType = {
  DEFAULT: 'default',
  COMMENT: 'most-commented',
  RATE: 'top-rated',
  DATE: 'top-dated'
};

const DateFormatStyle = {
  DEFAULT: 'DD MMMM YYYY',
  COMMENT: 'YYYY/MM/DD HH:mm',
  YEAR: 'YYYY'
};

const PresenterMessages = {
  DELETE_POPUP: 'popupDeleted',
  DELETE_POPUP_UPDATE: 'popupDeletedUpdate',
  UPDATE_POPUP: 'updatePopup',
  UPDATE_FILM: 'updateFilm'
};

const UpdateStates = {
  WITHOUT_POPUP_UPDATE: false,
  WITHOUT_FILM_UPDATE: false,
  WITH_POPUP_UPDATE: true,
  WITH_FILM_UPDATE: true,
  PREVENT_DEFAULT: true,
  EVENT_DEFAULT: false
};

const KeyCode = {
  ESC: 'Escape',
};

export { SectionMessages, SortType, KeyCode, DateFormatStyle, PresenterMessages, UpdateStates };
