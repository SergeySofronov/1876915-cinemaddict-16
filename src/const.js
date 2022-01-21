const SectionMessages = {
  DEFAULT: 'All movies. Upcoming',
  RATED: 'Top rated',
  POPULAR: 'Most commented',
  NO_MOVIES: 'There are no movies in our database',
  NO_WATCHLIST: 'There are no movies to watch now',
  NO_HISTORY: 'There are no watched movies now',
  NO_FAVORITE: 'There are no favorite movies now'
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
  STATS: 'stats'
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

const UserActions = {
  UPDATE_ACTIVE: 'updateActive',
  UPDATE_DATA: 'updateData',
  RESET_DESK: true,
  RESET_CARDS: false
};

const UpdateTypes = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

const EventStates = {
  PREVENT_DEFAULT: true,
  EVENT_DEFAULT: false
};

const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

export { UserScores, UserRanks, FilterTypes, SectionMessages, SortType, KeyCode, DateFormatStyle, UserActions, EventStates, UpdateTypes };
