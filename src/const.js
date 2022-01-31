const SectionMessages = {
  DEFAULT: 'All movies. Upcoming',
  RATED: 'Top rated',
  POPULAR: 'Most commented',
};

const UserScores = {
  BUFF: 21,
  FAN: 11,
  NOVICE: 1,
};

const UserRanks = {
  BUFF: 'movie buff',
  FAN: 'fan',
  NOVICE: 'novice',
};

const FilterTypes = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITE: 'favorite',
  STATS: 'stats',
};

const SortTypes = {
  DEFAULT: 'default',
  TOP_COMMENT: 'most-commented',
  TOP_RATE: 'top-rated',
  RATE: 'sortByRating',
  DATE: 'sortByDate',
};

const DateFormatStyle = {
  DEFAULT: 'DD MMMM YYYY',
  YEAR: 'YYYY',
};

const UserActions = {
  CREATE_POPUP: 'createPopup',
  DELETE_POPUP: 'deletePopup',
  DELETE_COMMENT: 'deleteComment',
  ADD_COMMENT:'addComment',
  UPDATE_DATA: 'updateData',
};

const UpdateTypes = {
  LOAD: 'load',
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};

const EventStates = {
  PREVENT_DEFAULT: true,
  EVENT_DEFAULT: false
};

const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export { UserScores, UserRanks, FilterTypes, SectionMessages, SortTypes, KeyCode, DateFormatStyle, UserActions, EventStates, UpdateTypes, Methods };
