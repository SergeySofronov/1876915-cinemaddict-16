/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserScores": () => (/* binding */ UserScores),
/* harmony export */   "UserRanks": () => (/* binding */ UserRanks),
/* harmony export */   "FilterTypes": () => (/* binding */ FilterTypes),
/* harmony export */   "SectionMessages": () => (/* binding */ SectionMessages),
/* harmony export */   "SortType": () => (/* binding */ SortType),
/* harmony export */   "KeyCode": () => (/* binding */ KeyCode),
/* harmony export */   "DateFormatStyle": () => (/* binding */ DateFormatStyle),
/* harmony export */   "UserActions": () => (/* binding */ UserActions),
/* harmony export */   "EventStates": () => (/* binding */ EventStates),
/* harmony export */   "UpdateTypes": () => (/* binding */ UpdateTypes)
/* harmony export */ });
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
  NOVICE: 1
};
const UserRanks = {
  BUFF: 'movie buff',
  FAN: 'fan',
  NOVICE: 'novice'
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
  MAJOR: 'major'
};
const EventStates = {
  PREVENT_DEFAULT: true,
  EVENT_DEFAULT: false
};
const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter'
};


/***/ }),

/***/ "./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFilmsStatistic": () => (/* binding */ getFilmsStatistic),
/* harmony export */   "getUserRank": () => (/* binding */ getUserRank),
/* harmony export */   "getTopCommentedFilmsData": () => (/* binding */ getTopCommentedFilmsData),
/* harmony export */   "getTopRatedFilmsData": () => (/* binding */ getTopRatedFilmsData),
/* harmony export */   "getFilmsDataByDate": () => (/* binding */ getFilmsDataByDate),
/* harmony export */   "filterFunctions": () => (/* binding */ filterFunctions)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.js");
/* harmony import */ var _mock_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock/utils */ "./src/mock/utils.js");

 //todo:remove

const filmsStatistic = {
  watchlist: 0,
  watched: 0,
  favorite: 0,
  total: 0
};

const getUserRank = () => {
  if (filmsStatistic.watched >= _const__WEBPACK_IMPORTED_MODULE_0__.UserScores.BUFF) {
    return _const__WEBPACK_IMPORTED_MODULE_0__.UserRanks.BUFF;
  }

  if (filmsStatistic.watched >= _const__WEBPACK_IMPORTED_MODULE_0__.UserScores.FAN) {
    return _const__WEBPACK_IMPORTED_MODULE_0__.UserRanks.FAN;
  }

  if (filmsStatistic.watched >= _const__WEBPACK_IMPORTED_MODULE_0__.UserScores.NOVICE) {
    return _const__WEBPACK_IMPORTED_MODULE_0__.UserRanks.NOVICE;
  }

  return null;
}; //todo:remove


const getFilmsStatistic = films => {
  if (Array.isArray(films)) {
    filmsStatistic.total = films.length;
    films.forEach(film => {
      filmsStatistic.watchlist += film.userDetails.watchlist ? 1 : 0;
      filmsStatistic.watched += film.userDetails.watched ? 1 : 0;
      filmsStatistic.favorite += film.userDetails.favorite ? 1 : 0;
    });
  }

  return filmsStatistic;
};

const getTopRatedFilmsData = films => {
  if (Array.isArray(films)) {
    return films.filter(film => {
      var _film$filmInfo;

      return Boolean((_film$filmInfo = film.filmInfo) === null || _film$filmInfo === void 0 ? void 0 : _film$filmInfo.totalRating);
    }).sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  }

  return [];
};

const getTopCommentedFilmsData = films => {
  if (Array.isArray(films)) {
    return films.filter(film => {
      var _film$comments;

      return Boolean((_film$comments = film.comments) === null || _film$comments === void 0 ? void 0 : _film$comments.length);
    }).sort((a, b) => b.comments.length - a.comments.length);
  }

  return [];
};

const getFilmsDataByDate = films => {
  if (Array.isArray(films)) {
    return films.filter(film => {
      var _film$filmInfo2, _film$filmInfo2$relea;

      return Boolean((_film$filmInfo2 = film.filmInfo) === null || _film$filmInfo2 === void 0 ? void 0 : (_film$filmInfo2$relea = _film$filmInfo2.release) === null || _film$filmInfo2$relea === void 0 ? void 0 : _film$filmInfo2$relea.date);
    }).sort((a, b) => {
      const first = parseInt((0,_mock_utils__WEBPACK_IMPORTED_MODULE_1__.changeDateFormat)(a.filmInfo.release.date, _const__WEBPACK_IMPORTED_MODULE_0__.DateFormatStyle.YEAR), 10);
      const second = parseInt((0,_mock_utils__WEBPACK_IMPORTED_MODULE_1__.changeDateFormat)(b.filmInfo.release.date, _const__WEBPACK_IMPORTED_MODULE_0__.DateFormatStyle.YEAR), 10);

      if (typeof first !== 'number' && typeof second !== 'number') {
        return 0;
      } else if (typeof first !== 'number') {
        return -1;
      } else {
        return second - first;
      }
    });
  }

  return [];
};

const filterFunctions = {
  [_const__WEBPACK_IMPORTED_MODULE_0__.FilterTypes.ALL]: films => films.filter(film => Boolean(film.id)),
  [_const__WEBPACK_IMPORTED_MODULE_0__.FilterTypes.WATCHLIST]: films => films.filter(film => Boolean(film.userDetails.watchlist)),
  [_const__WEBPACK_IMPORTED_MODULE_0__.FilterTypes.WATCHED]: films => films.filter(film => Boolean(film.userDetails.watched)),
  [_const__WEBPACK_IMPORTED_MODULE_0__.FilterTypes.FAVORITE]: films => films.filter(film => Boolean(film.userDetails.favorite))
};


/***/ }),

/***/ "./src/mock/data.js":
/*!**************************!*\
  !*** ./src/mock/data.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomFilmData": () => (/* binding */ getRandomFilmData)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/mock/utils.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.dev.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const BASE_IMAGE_URL = './images/posters/';
const COMMENT_MAX_QUANTITY = 50;
const COMMENT_MIN_QUANTITY = 0;
const FILM_MAX_QUANTITY = 50;
const FILM_MIN_QUANTITY = 0;
const FILM_MAX_RATE = 10;
const FILM_MIN_RATE = 0;
const FILM_MIN_PEGI = 3;
const FILM_MAX_PEGI = 18;
const FILM_MIN_RUNTIME = 70;
const FILM_MAX_RUNTIME = 180;
const FILM_DESCRIPTION_MAX_QUANTITY = 5;
const FILM_DESCRIPTION_MIN_QUANTITY = 1;
const DATE_BASE_VALUE = '1950-01-01';
const DATE_GAP_MAX = 30;
const HOUR_VALUE = 60;
const filmUrl = new Map();
filmUrl.set('Made for Each Other', 'made-for-each-other.png').set('Popeye the Sailor Meets Sindbad the Sailor', 'popeye-meets-sinbad.png').set('Sagebrush Trai', 'sagebrush-trail.jpg').set('The Dance of Life', 'the-dance-of-life.jpg').set('The Man with the Golden Arm', 'the-man-with-the-golden-arm.jpg').set('The Great Flamarion', 'the-great-flamarion.jpg').set('Santa Claus Conquers the Martians', 'santa-claus-conquers-the-martians.jpg');
const filmDescriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const filmCountries = ['USA', 'Italy', 'New Zealand', 'France', 'Great Britain', 'Canada'];
const filmWriters = ['Asghar Farhadi', 'Woody Allen', 'Charlie Kaufman', 'Paul Haggis', 'Rian Johnson'];
const filmDirectors = ['Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese', 'Ridley Scott', 'Stanley Kubrick'];
const filmActors = ['Leonardo DiCaprio', 'Brad Pitt', 'Robert De Niro', 'Christian Bale', 'Tom Hanks', 'Gary Oldman', 'Edward Norton'];
const filmGenres = ['Drama', 'Comedy', 'Noir', 'Mystery', 'Fantasy'];
const commentEmotionTypes = ['smile', 'sleeping', 'puke', 'angry'];
const commentUserNames = ['Алиса Селезнёва ', 'Пашка Гераскин', 'Маша и Наташа Белые', 'Коля Наумов', 'Громозека', 'Весельчак У'];
const filmCommentExample = {
  smile: ['А film that changed my life, a true masterpiece, post-credit scene was just amazing omg.', 'That\'s awesome!', 'Great movie!'],
  sleeping: ['Booooooooooring', 'Almost fell asleep. Really...', 'Good film but i\'m tired.'],
  puke: ['Very very old. Meh', 'It\'s just disgusting'],
  angry: ['Almost two hours? Seriously?', 'And it\'s an Oscar nominee? It sucks', 'Burn it out', 'My eyes and ears are bleeding...']
};
const filmQuantity = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(FILM_MIN_QUANTITY, FILM_MAX_QUANTITY);

const prepareCommentData = () => {
  const commentEmotion = commentEmotionTypes[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, commentEmotionTypes.length - 1)];
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
    author: commentUserNames[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, commentUserNames.length - 1)],
    emotion: commentEmotion,
    content: filmCommentExample[commentEmotion][(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, filmCommentExample[commentEmotion].length - 1)],
    date: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomDate)(DATE_BASE_VALUE, DATE_GAP_MAX, _const_js__WEBPACK_IMPORTED_MODULE_1__.DateFormatStyle.COMMENT)
  };
};

const getRandomCommentData = () => {
  const commentQuantity = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(COMMENT_MIN_QUANTITY, COMMENT_MAX_QUANTITY);
  return Array.from({
    length: commentQuantity
  }, prepareCommentData);
};

const getFilmTime = () => {
  const time = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(FILM_MIN_RUNTIME, FILM_MAX_RUNTIME);
  const hour = parseInt(time / HOUR_VALUE, 10);
  const minute = time - hour * HOUR_VALUE;
  return `${hour}h ${minute}m`;
};

const prepareFilmData = () => {
  if (filmQuantity) {
    const filmName = [...filmUrl.keys()][(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, filmUrl.size - 1)];
    const randomIndexes = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getNonRepeatUintArray)(0, filmDescriptions.length - 1, filmDescriptions.length).slice(FILM_DESCRIPTION_MIN_QUANTITY, FILM_DESCRIPTION_MAX_QUANTITY);
    return {
      id: (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
      comments: getRandomCommentData(),
      filmInfo: {
        title: filmName,
        alternativeTitle: filmName,
        totalRating: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomFloatStrict)(FILM_MIN_RATE, FILM_MAX_RATE, 1),
        poster: `${BASE_IMAGE_URL}${filmUrl.get(filmName)}`,
        pegi: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(FILM_MIN_PEGI, FILM_MAX_PEGI),
        director: filmDirectors[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, filmDirectors.length - 1)],
        description: randomIndexes.map(value => filmDescriptions[value]).join(' '),
        actors: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomPartFromArray)(filmActors).join(', '),
        genre: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomPartFromArray)(filmGenres),
        writers: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomPartFromArray)(filmWriters).join(', '),
        release: {
          date: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomDate)(DATE_BASE_VALUE, DATE_GAP_MAX, _const_js__WEBPACK_IMPORTED_MODULE_1__.DateFormatStyle.DEFAULT),
          country: filmCountries[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, filmCountries.length - 1)]
        },
        runtime: getFilmTime()
      },
      userDetails: {
        watchlist: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomBoolean)(),
        watched: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomBoolean)(),
        favorite: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomBoolean)()
      }
    };
  }

  return null;
};

const getRandomFilmData = () => Array.from({
  length: filmQuantity
}, prepareFilmData);



/***/ }),

/***/ "./src/mock/utils.js":
/*!***************************!*\
  !*** ./src/mock/utils.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": () => (/* binding */ getRandomInteger),
/* harmony export */   "getNonRepeatUintArray": () => (/* binding */ getNonRepeatUintArray),
/* harmony export */   "getRandomPartFromArray": () => (/* binding */ getRandomPartFromArray),
/* harmony export */   "getRandomBoolean": () => (/* binding */ getRandomBoolean),
/* harmony export */   "getRandomDate": () => (/* binding */ getRandomDate),
/* harmony export */   "getRandomFloatStrict": () => (/* binding */ getRandomFloatStrict),
/* harmony export */   "getShortFilmDescription": () => (/* binding */ getShortFilmDescription),
/* harmony export */   "changeDateFormat": () => (/* binding */ changeDateFormat)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

const DATE_FORMAT = 'YYYY/MM/DD HH:mm';
const DESCRIPTION_MAX_LENGTH = 140;
const BASE_DATE = '1990-01-01';
const DateFormat = {
  DAY: 'day',
  WEEK: 'week',
  QUARTER: 'quarter',
  MONTH: 'month',
  YEAR: 'year',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
  MSECOND: 'millisecond'
}; // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (lowerBound, upperBound) => Math.random() * (upperBound - lowerBound) + lowerBound;

const getRandomFloatStrict = (lowerBound, upperBound, valueAfterComma) => Number((getRandomFloat(lowerBound, upperBound) + 1 / Math.pow(10, valueAfterComma + 1)).toFixed(valueAfterComma));

const getNonRepeatUintArray = (lowerBorder, upperBorder, arrayLength) => {
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  let lower = Math.ceil(Math.min(Math.abs(lowerBorder), Math.abs(upperBorder)));
  const upper = Math.floor(Math.max(Math.abs(lowerBorder), Math.abs(upperBorder)));
  let totalNumbers = Math.abs(upper - lower) + 1;

  if (arrayLength && totalNumbers >= arrayLength) {
    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers + lower);
    }

    while (arrayTotalNumbers.length) {
      lower = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[lower]);
      arrayTotalNumbers.splice(lower, 1);
    }

    return arrayRandomNumbers;
  }

  throw new Error('generateNonRepeatArray: wrong attributes');
};

const getRandomPartFromArray = inputArray => {
  if (Array.isArray(inputArray)) {
    return inputArray.slice(0, getRandomInteger(1, inputArray.length));
  }

  return new Error('getRandomPartFromArray: inputArray is not an array');
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const getRandomDate = (dateBase = BASE_DATE, dateGap = 0, dateFormat = DATE_FORMAT) => {
  const date = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateBase).add(getRandomInteger(-dateGap, dateGap), DateFormat.DAY).add(getRandomInteger(-dateGap, dateGap), DateFormat.MONTH).add(getRandomInteger(-dateGap, dateGap), DateFormat.YEAR).toDate();
  return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(dateFormat);
};

const getShortFilmDescription = filmDescription => {
  if ((filmDescription === null || filmDescription === void 0 ? void 0 : filmDescription.length) >= DESCRIPTION_MAX_LENGTH) {
    return `${filmDescription.slice(0, DESCRIPTION_MAX_LENGTH - 1)}...`;
  }

  return filmDescription;
};

const changeDateFormat = (date, format = DATE_FORMAT) => date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format) : '';



/***/ }),

/***/ "./src/model/abstract-observable.js":
/*!******************************************!*\
  !*** ./src/model/abstract-observable.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractObservable)
/* harmony export */ });
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _observers = /*#__PURE__*/new WeakMap();

class AbstractObservable {
  constructor() {
    _classPrivateFieldInitSpec(this, _observers, {
      writable: true,
      value: new Set()
    });
  }

  addObserver(observer) {
    _classPrivateFieldGet(this, _observers).add(observer);
  }

  removeObserver(observer) {
    _classPrivateFieldGet(this, _observers).delete(observer);
  }

  _notify(event, payload) {
    _classPrivateFieldGet(this, _observers).forEach(observer => observer(event, payload));
  }

}



/***/ }),

/***/ "./src/model/films-model.js":
/*!**********************************!*\
  !*** ./src/model/films-model.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsModel)
/* harmony export */ });
/* harmony import */ var _abstract_observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-observable.js */ "./src/model/abstract-observable.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _filmsData = /*#__PURE__*/new WeakMap();

class FilmsModel extends _abstract_observable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _classPrivateFieldInitSpec(this, _filmsData, {
      writable: true,
      value: []
    });

    _defineProperty(this, "update", (updateType, updateData) => {
      const index = _classPrivateFieldGet(this, _filmsData).findIndex(film => film.id === (updateData === null || updateData === void 0 ? void 0 : updateData.id));

      if (index === -1) {
        throw new Error('Can\'t update non existing film');
      }

      _classPrivateFieldSet(this, _filmsData, [..._classPrivateFieldGet(this, _filmsData).slice(0, index), updateData, ..._classPrivateFieldGet(this, _filmsData).slice(index + 1)]);

      this._notify(updateType, updateData);
    });
  }

  set filmsData(films) {
    _classPrivateFieldSet(this, _filmsData, [...films]);
  }

  get filmsData() {
    return _classPrivateFieldGet(this, _filmsData);
  }

}



/***/ }),

/***/ "./src/model/filter-model.js":
/*!***********************************!*\
  !*** ./src/model/filter-model.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterModel)
/* harmony export */ });
/* harmony import */ var _abstract_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-observable */ "./src/model/abstract-observable.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




var _filterType = /*#__PURE__*/new WeakMap();

class FilterModel extends _abstract_observable__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _classPrivateFieldInitSpec(this, _filterType, {
      writable: true,
      value: _const__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.ALL
    });

    _defineProperty(this, "setFilter", (updateType, filterType) => {
      _classPrivateFieldSet(this, _filterType, filterType);

      this._notify(updateType, filterType);
    });
  }

  get filterType() {
    return _classPrivateFieldGet(this, _filterType);
  }

}



/***/ }),

/***/ "./src/presenter/film-presenter.js":
/*!*****************************************!*\
  !*** ./src/presenter/film-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmPresenter)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _view_smart_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/smart-view.js */ "./src/view/smart-view.js");
/* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/abstract-view.js */ "./src/view/abstract-view.js");
/* harmony import */ var _view_film_card_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/film-card-view */ "./src/view/film-card-view.js");
/* harmony import */ var _view_popup_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/popup-view */ "./src/view/popup-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }








var _filmsList = /*#__PURE__*/new WeakMap();

var _filmData = /*#__PURE__*/new WeakMap();

var _filmCard = /*#__PURE__*/new WeakMap();

var _filmPopup = /*#__PURE__*/new WeakMap();

var _handleViewAction = /*#__PURE__*/new WeakMap();

var _getActiveFilmId = /*#__PURE__*/new WeakMap();

var _updateFilmHandlers = /*#__PURE__*/new WeakMap();

var _isActiveFilm = /*#__PURE__*/new WeakMap();

var _onWatchListClick = /*#__PURE__*/new WeakMap();

var _onWatchedClick = /*#__PURE__*/new WeakMap();

var _onFavoriteClick = /*#__PURE__*/new WeakMap();

var _onFilmCardClick = /*#__PURE__*/new WeakMap();

class FilmPresenter {
  constructor(filmsList, handleViewAction, getActiveFilmId) {
    _classPrivateFieldInitSpec(this, _filmsList, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmData, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmCard, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmPopup, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _handleViewAction, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _getActiveFilmId, {
      writable: true,
      value: null
    });

    _defineProperty(this, "init", filmData => {
      const prevFilmCard = _classPrivateFieldGet(this, _filmCard);

      _classPrivateFieldSet(this, _filmData, filmData);

      _classPrivateFieldSet(this, _filmCard, new _view_film_card_view__WEBPACK_IMPORTED_MODULE_4__["default"](_classPrivateFieldGet(this, _filmData)));

      _classPrivateFieldGet(this, _updateFilmHandlers).call(this);

      if (prevFilmCard) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.replace)(prevFilmCard, _classPrivateFieldGet(this, _filmCard));
      } else {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _filmsList), _classPrivateFieldGet(this, _filmCard), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
      }

      if (_classPrivateFieldGet(this, _filmPopup)) {
        _classPrivateFieldGet(this, _filmPopup).updateElement(_view_smart_view_js__WEBPACK_IMPORTED_MODULE_2__["default"].parseData(_classPrivateFieldGet(this, _filmData)));
      }
    });

    _defineProperty(this, "removeCard", () => {
      _classPrivateFieldGet(this, _filmCard).destroyElement();
    });

    _defineProperty(this, "removePopup", () => {
      var _classPrivateFieldGet2;

      (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _filmPopup)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.destroyElement();

      _classPrivateFieldSet(this, _filmPopup, null);

      document.body.classList.remove('hide-overflow');
    });

    _defineProperty(this, "createPopup", () => {
      _classPrivateFieldGet(this, _handleViewAction).call(this, _const_js__WEBPACK_IMPORTED_MODULE_1__.UserActions.UPDATE_ACTIVE, this);

      _classPrivateFieldSet(this, _filmPopup, new _view_popup_view__WEBPACK_IMPORTED_MODULE_5__["default"](_classPrivateFieldGet(this, _handleViewAction)));

      _classPrivateFieldGet(this, _filmPopup).init(_classPrivateFieldGet(this, _filmData));

      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(document.body, _classPrivateFieldGet(this, _filmPopup), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
      document.body.classList.add('hide-overflow');
    });

    _classPrivateFieldInitSpec(this, _updateFilmHandlers, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _filmCard).setFilmClickHandler(_classPrivateFieldGet(this, _onFilmCardClick));

        _classPrivateFieldGet(this, _filmCard).setWatchListClickHandler(_classPrivateFieldGet(this, _onWatchListClick));

        _classPrivateFieldGet(this, _filmCard).setWatchedClickHandler(_classPrivateFieldGet(this, _onWatchedClick));

        _classPrivateFieldGet(this, _filmCard).setFavoriteClickHandler(_classPrivateFieldGet(this, _onFavoriteClick));
      }
    });

    _classPrivateFieldInitSpec(this, _isActiveFilm, {
      writable: true,
      value: () => _classPrivateFieldGet(this, _getActiveFilmId).call(this) === this.id
    });

    _classPrivateFieldInitSpec(this, _onWatchListClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _filmData).userDetails.watchlist = !_classPrivateFieldGet(this, _filmData).userDetails.watchlist;

        _classPrivateFieldGet(this, _handleViewAction).call(this, _const_js__WEBPACK_IMPORTED_MODULE_1__.UserActions.UPDATE_DATA, _classPrivateFieldGet(this, _filmData));
      }
    });

    _classPrivateFieldInitSpec(this, _onWatchedClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _filmData).userDetails.watched = !_classPrivateFieldGet(this, _filmData).userDetails.watched;

        _classPrivateFieldGet(this, _handleViewAction).call(this, _const_js__WEBPACK_IMPORTED_MODULE_1__.UserActions.UPDATE_DATA, _classPrivateFieldGet(this, _filmData));
      }
    });

    _classPrivateFieldInitSpec(this, _onFavoriteClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _filmData).userDetails.favorite = !_classPrivateFieldGet(this, _filmData).userDetails.favorite;

        _classPrivateFieldGet(this, _handleViewAction).call(this, _const_js__WEBPACK_IMPORTED_MODULE_1__.UserActions.UPDATE_DATA, _classPrivateFieldGet(this, _filmData));
      }
    });

    _classPrivateFieldInitSpec(this, _onFilmCardClick, {
      writable: true,
      value: () => {
        if (_classPrivateFieldGet(this, _filmPopup) || _classPrivateFieldGet(this, _isActiveFilm).call(this)) {
          return;
        }

        this.createPopup();
      }
    });

    if (!(filmsList instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_3__["default"] || filmsList instanceof Element)) {
      throw new Error('Can\'t create instance of FilmPresenter while filmsList is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof Function)) {
        throw new Error(`Can\\'t create instance of FilmPresenter while argument${i - 1} is not a Function`);
      }
    }

    _classPrivateFieldSet(this, _filmsList, filmsList);

    _classPrivateFieldSet(this, _handleViewAction, handleViewAction);

    _classPrivateFieldSet(this, _getActiveFilmId, getActiveFilmId);
  }

  get id() {
    var _classPrivateFieldGet3;

    return (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _filmData)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.id;
  }

}



/***/ }),

/***/ "./src/presenter/films-desk-presenter.js":
/*!***********************************************!*\
  !*** ./src/presenter/films-desk-presenter.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmDeskPresenter)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../filter.js */ "./src/filter.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _model_abstract_observable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/abstract-observable.js */ "./src/model/abstract-observable.js");
/* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/abstract-view.js */ "./src/view/abstract-view.js");
/* harmony import */ var _view_sort_menu_view_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/sort-menu-view.js */ "./src/view/sort-menu-view.js");
/* harmony import */ var _view_films_desk_view_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/films-desk-view.js */ "./src/view/films-desk-view.js");
/* harmony import */ var _view_films_sheet_view_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/films-sheet-view.js */ "./src/view/films-sheet-view.js");
/* harmony import */ var _view_film_card_list_view_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../view/film-card-list-view.js */ "./src/view/film-card-list-view.js");
/* harmony import */ var _film_presenter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./film-presenter.js */ "./src/presenter/film-presenter.js");
/* harmony import */ var _view_show_more_button_view_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../view/show-more-button-view.js */ "./src/view/show-more-button-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }












const FILM_SHOW_PER_STEP = 5;
const FILM_EXTRA_QUANTITY = 2;

var _deskContainer = /*#__PURE__*/new WeakMap();

var _filmSortMenu = /*#__PURE__*/new WeakMap();

var _filmsDesk = /*#__PURE__*/new WeakMap();

var _filmEmptySheet = /*#__PURE__*/new WeakMap();

var _filmsMainSheet = /*#__PURE__*/new WeakMap();

var _filmsMainCardList = /*#__PURE__*/new WeakMap();

var _filmsRatedSheet = /*#__PURE__*/new WeakMap();

var _filmsRatedCardList = /*#__PURE__*/new WeakMap();

var _filmsPopularSheet = /*#__PURE__*/new WeakMap();

var _filmsPopularCardList = /*#__PURE__*/new WeakMap();

var _showMoreButton = /*#__PURE__*/new WeakMap();

var _filmsModel = /*#__PURE__*/new WeakMap();

var _filterModel = /*#__PURE__*/new WeakMap();

var _filmsPresenters = /*#__PURE__*/new WeakMap();

var _topRatedFilms = /*#__PURE__*/new WeakMap();

var _topCommentedFilms = /*#__PURE__*/new WeakMap();

var _activeFilm = /*#__PURE__*/new WeakMap();

var _activeSortType = /*#__PURE__*/new WeakMap();

var _shownFilmQuantity = /*#__PURE__*/new WeakMap();

var _restFilmQuantity = /*#__PURE__*/new WeakMap();

var _getTotalFilmsQuantity = /*#__PURE__*/new WeakMap();

var _getActiveFilmId = /*#__PURE__*/new WeakMap();

var _setActiveFilm = /*#__PURE__*/new WeakMap();

var _changeActiveFilm = /*#__PURE__*/new WeakMap();

var _handleViewAction = /*#__PURE__*/new WeakMap();

var _isCommentRatingChanged = /*#__PURE__*/new WeakMap();

var _handleModelEvent = /*#__PURE__*/new WeakMap();

var _updateFilmsPresenters = /*#__PURE__*/new WeakMap();

var _getFilmsToShow = /*#__PURE__*/new WeakMap();

var _renderFilmCards = /*#__PURE__*/new WeakMap();

var _renderSheet = /*#__PURE__*/new WeakMap();

var _getExtraFilmsData = /*#__PURE__*/new WeakMap();

var _renderDeskSheets = /*#__PURE__*/new WeakMap();

var _clearPresenters = /*#__PURE__*/new WeakMap();

var _clearDesk = /*#__PURE__*/new WeakMap();

var _resetCards = /*#__PURE__*/new WeakMap();

var _resetDesk = /*#__PURE__*/new WeakMap();

var _onSortMenuClick = /*#__PURE__*/new WeakMap();

var _onShowMoreButtonClick = /*#__PURE__*/new WeakMap();

class FilmDeskPresenter {
  constructor(deskContainer, filmsModel, filterModel) {
    _classPrivateFieldInitSpec(this, _deskContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmSortMenu, {
      writable: true,
      value: new _view_sort_menu_view_js__WEBPACK_IMPORTED_MODULE_5__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filmsDesk, {
      writable: true,
      value: new _view_films_desk_view_js__WEBPACK_IMPORTED_MODULE_6__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filmEmptySheet, {
      writable: true,
      value: new _view_films_sheet_view_js__WEBPACK_IMPORTED_MODULE_7__["default"](_const_js__WEBPACK_IMPORTED_MODULE_2__.SectionMessages.NO_MOVIES)
    });

    _classPrivateFieldInitSpec(this, _filmsMainSheet, {
      writable: true,
      value: new _view_films_sheet_view_js__WEBPACK_IMPORTED_MODULE_7__["default"](_const_js__WEBPACK_IMPORTED_MODULE_2__.SectionMessages.DEFAULT, false, true)
    });

    _classPrivateFieldInitSpec(this, _filmsMainCardList, {
      writable: true,
      value: new _view_film_card_list_view_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filmsRatedSheet, {
      writable: true,
      value: new _view_films_sheet_view_js__WEBPACK_IMPORTED_MODULE_7__["default"](_const_js__WEBPACK_IMPORTED_MODULE_2__.SectionMessages.RATED, true)
    });

    _classPrivateFieldInitSpec(this, _filmsRatedCardList, {
      writable: true,
      value: new _view_film_card_list_view_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filmsPopularSheet, {
      writable: true,
      value: new _view_films_sheet_view_js__WEBPACK_IMPORTED_MODULE_7__["default"](_const_js__WEBPACK_IMPORTED_MODULE_2__.SectionMessages.POPULAR, true)
    });

    _classPrivateFieldInitSpec(this, _filmsPopularCardList, {
      writable: true,
      value: new _view_film_card_list_view_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
    });

    _classPrivateFieldInitSpec(this, _showMoreButton, {
      writable: true,
      value: new _view_show_more_button_view_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filmsModel, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filterModel, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmsPresenters, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _topRatedFilms, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _topCommentedFilms, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _activeFilm, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _activeSortType, {
      writable: true,
      value: _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.DEFAULT
    });

    _classPrivateFieldInitSpec(this, _shownFilmQuantity, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _restFilmQuantity, {
      writable: true,
      value: null
    });

    _defineProperty(this, "init", () => {
      _classPrivateFieldGet(this, _filmSortMenu).setSortClickHandler(_classPrivateFieldGet(this, _onSortMenuClick));

      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _deskContainer), _classPrivateFieldGet(this, _filmSortMenu), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
      (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _deskContainer), _classPrivateFieldGet(this, _filmsDesk), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);

      _classPrivateFieldGet(this, _renderDeskSheets).call(this, _const_js__WEBPACK_IMPORTED_MODULE_2__.UserActions.RESET_DESK);
    });

    _classPrivateFieldInitSpec(this, _getTotalFilmsQuantity, {
      writable: true,
      value: () => this.filmsData.length
    });

    _classPrivateFieldInitSpec(this, _getActiveFilmId, {
      writable: true,
      value: () => {
        var _classPrivateFieldGet2;

        return (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _activeFilm)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.id;
      }
    });

    _classPrivateFieldInitSpec(this, _setActiveFilm, {
      writable: true,
      value: film => {
        var _classPrivateFieldGet3;

        (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _activeFilm)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.removePopup();

        _classPrivateFieldSet(this, _activeFilm, film);
      }
    });

    _classPrivateFieldInitSpec(this, _changeActiveFilm, {
      writable: true,
      value: () => {
        const activeFilmId = _classPrivateFieldGet(this, _getActiveFilmId).call(this);

        if (!activeFilmId) {
          return;
        }

        for (const [presenter, filmId] of _classPrivateFieldGet(this, _filmsPresenters).entries()) {
          if (filmId === activeFilmId) {
            presenter.createPopup();
            return;
          }
        }
      }
    });

    _classPrivateFieldInitSpec(this, _handleViewAction, {
      writable: true,
      value: (actionType,
      /*updateType,*/
      update) => {
        switch (actionType) {
          case _const_js__WEBPACK_IMPORTED_MODULE_2__.UserActions.UPDATE_ACTIVE:
            _classPrivateFieldGet(this, _setActiveFilm).call(this, update);

            break;

          case _const_js__WEBPACK_IMPORTED_MODULE_2__.UserActions.UPDATE_DATA:
            if (_classPrivateFieldGet(this, _filterModel).filterType !== _const_js__WEBPACK_IMPORTED_MODULE_2__.FilterTypes.ALL && _classPrivateFieldGet(this, _isCommentRatingChanged).call(this, update)) {
              _classPrivateFieldGet(this, _filmsModel).update(_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateTypes.MINOR, update);
            } else {
              _classPrivateFieldGet(this, _filmsModel).update(_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateTypes.PATCH, update);
            }

            break;

          default:
            break;
        }
      }
    });

    _classPrivateFieldInitSpec(this, _isCommentRatingChanged, {
      writable: true,
      value: film => {
        const type = _classPrivateFieldGet(this, _activeSortType);

        _classPrivateFieldSet(this, _activeSortType, _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.COMMENT);

        const indexOld = _classPrivateFieldGet(this, _topCommentedFilms).findIndex(item => item.id === film.id);

        const indexNew = this.filmsData.indexOf(film);
        const result = !(indexOld === -1 || indexOld === indexNew);

        _classPrivateFieldSet(this, _activeSortType, type);

        return result;
      }
    });

    _classPrivateFieldInitSpec(this, _handleModelEvent, {
      writable: true,
      value: (updateType, data) => {
        switch (updateType) {
          case _const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateTypes.PATCH:
            _classPrivateFieldGet(this, _updateFilmsPresenters).call(this, data);

            break;

          case _const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateTypes.MINOR:
            _classPrivateFieldGet(this, _resetCards).call(this);

            break;

          case _const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateTypes.MAJOR:
            _classPrivateFieldGet(this, _resetDesk).call(this);

            break;

          default:
            break;
        }
      }
    });

    _classPrivateFieldInitSpec(this, _updateFilmsPresenters, {
      writable: true,
      value: filmPresenter => {
        for (const [presenter, filmId] of _classPrivateFieldGet(this, _filmsPresenters).entries()) {
          if (filmId === filmPresenter.id) {
            presenter.init(filmPresenter);
          }
        }
      }
    });

    _classPrivateFieldInitSpec(this, _getFilmsToShow, {
      writable: true,
      value: () => {
        const totalQuantity = _classPrivateFieldGet(this, _getTotalFilmsQuantity).call(this);

        if (totalQuantity > _classPrivateFieldGet(this, _shownFilmQuantity)) {
          _classPrivateFieldSet(this, _restFilmQuantity, Math.min(totalQuantity - _classPrivateFieldGet(this, _shownFilmQuantity), FILM_SHOW_PER_STEP));

          return this.filmsData.slice(_classPrivateFieldGet(this, _shownFilmQuantity), _classPrivateFieldGet(this, _shownFilmQuantity) + _classPrivateFieldGet(this, _restFilmQuantity));
        }

        return null;
      }
    });

    _classPrivateFieldInitSpec(this, _renderFilmCards, {
      writable: true,
      value: (filmsList, filmsData) => {
        filmsData.forEach(film => {
          if (film.id) {
            const filmPresenter = new _film_presenter_js__WEBPACK_IMPORTED_MODULE_9__["default"](filmsList, _classPrivateFieldGet(this, _handleViewAction), _classPrivateFieldGet(this, _getActiveFilmId));
            filmPresenter.init(film);

            _classPrivateFieldGet(this, _filmsPresenters).set(filmPresenter, film.id);
          }
        });
      }
    });

    _classPrivateFieldInitSpec(this, _renderSheet, {
      writable: true,
      value: (filmsSheet, filmsList) => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _filmsDesk), filmsSheet, _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.AFTERBEGIN);
        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(filmsSheet, filmsList, _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
      }
    });

    _classPrivateFieldInitSpec(this, _getExtraFilmsData, {
      writable: true,
      value: sortType => {
        const savedSort = _classPrivateFieldGet(this, _activeSortType);

        _classPrivateFieldSet(this, _activeSortType, sortType);

        const data = this.filmsData.slice(0, FILM_EXTRA_QUANTITY);

        _classPrivateFieldSet(this, _activeSortType, savedSort);

        return data;
      }
    });

    _classPrivateFieldInitSpec(this, _renderDeskSheets, {
      writable: true,
      value: isDeskReset => {
        if (!_classPrivateFieldGet(this, _getTotalFilmsQuantity).call(this)) {
          (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _filmsDesk), _classPrivateFieldGet(this, _filmEmptySheet), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
          return;
        }

        _classPrivateFieldSet(this, _topCommentedFilms, _classPrivateFieldGet(this, _getExtraFilmsData).call(this, _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.COMMENT));

        if (_classPrivateFieldGet(this, _topCommentedFilms).length >= FILM_EXTRA_QUANTITY) {
          if (isDeskReset) {
            _classPrivateFieldGet(this, _renderSheet).call(this, _classPrivateFieldGet(this, _filmsPopularSheet), _classPrivateFieldGet(this, _filmsPopularCardList));
          }

          _classPrivateFieldGet(this, _renderFilmCards).call(this, _classPrivateFieldGet(this, _filmsPopularCardList), _classPrivateFieldGet(this, _topCommentedFilms));
        }

        _classPrivateFieldSet(this, _topRatedFilms, _classPrivateFieldGet(this, _getExtraFilmsData).call(this, _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.RATE));

        if (_classPrivateFieldGet(this, _topRatedFilms).length >= FILM_EXTRA_QUANTITY) {
          if (isDeskReset) {
            _classPrivateFieldGet(this, _renderSheet).call(this, _classPrivateFieldGet(this, _filmsRatedSheet), _classPrivateFieldGet(this, _filmsRatedCardList));
          }

          _classPrivateFieldGet(this, _renderFilmCards).call(this, _classPrivateFieldGet(this, _filmsRatedCardList), _classPrivateFieldGet(this, _topRatedFilms));
        }

        if (isDeskReset) {
          _classPrivateFieldGet(this, _renderSheet).call(this, _classPrivateFieldGet(this, _filmsMainSheet), _classPrivateFieldGet(this, _filmsMainCardList));

          _classPrivateFieldSet(this, _shownFilmQuantity, Math.min(_classPrivateFieldGet(this, _getTotalFilmsQuantity).call(this), FILM_SHOW_PER_STEP));

          if (_classPrivateFieldGet(this, _getFilmsToShow).call(this)) {
            _classPrivateFieldGet(this, _showMoreButton).setButtonClickHandler(_classPrivateFieldGet(this, _onShowMoreButtonClick));

            (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _filmsMainCardList), _classPrivateFieldGet(this, _showMoreButton), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.AFTEREND);
          }
        }

        _classPrivateFieldGet(this, _renderFilmCards).call(this, _classPrivateFieldGet(this, _filmsMainCardList), this.filmsData.slice(0, _classPrivateFieldGet(this, _shownFilmQuantity)));
      }
    });

    _classPrivateFieldInitSpec(this, _clearPresenters, {
      writable: true,
      value: () => {
        for (const [presenter] of _classPrivateFieldGet(this, _filmsPresenters).entries()) {
          presenter.removeCard();
        }

        _classPrivateFieldGet(this, _filmsPresenters).clear();
      }
    });

    _classPrivateFieldInitSpec(this, _clearDesk, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _filmsMainCardList).destroyElement();

        _classPrivateFieldGet(this, _filmsRatedCardList).destroyElement();

        _classPrivateFieldGet(this, _filmsPopularCardList).destroyElement();

        _classPrivateFieldGet(this, _showMoreButton).destroyElement();
      }
    });

    _classPrivateFieldInitSpec(this, _resetCards, {
      writable: true,
      value: () => {
        //todo: добавить проверку, надо ли удалять ShowMoreButton, т.к. мало карточек после фильтрации
        _classPrivateFieldGet(this, _clearPresenters).call(this);

        _classPrivateFieldGet(this, _renderDeskSheets).call(this, _const_js__WEBPACK_IMPORTED_MODULE_2__.UserActions.RESET_CARDS);
      }
    });

    _classPrivateFieldInitSpec(this, _resetDesk, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _clearPresenters).call(this);

        _classPrivateFieldGet(this, _clearDesk).call(this);

        _classPrivateFieldGet(this, _renderDeskSheets).call(this, _const_js__WEBPACK_IMPORTED_MODULE_2__.UserActions.RESET_DESK);
      }
    });

    _classPrivateFieldInitSpec(this, _onSortMenuClick, {
      writable: true,
      value: evt => {
        if (evt.target.tagName === 'A') {
          const type = evt.target.dataset.sortType;

          if (_classPrivateFieldGet(this, _activeSortType) !== type) {
            _classPrivateFieldSet(this, _activeSortType, type);

            _classPrivateFieldGet(this, _resetDesk).call(this);

            _classPrivateFieldGet(this, _changeActiveFilm).call(this);
          }
        }
      }
    });

    _classPrivateFieldInitSpec(this, _onShowMoreButtonClick, {
      writable: true,
      value: () => {
        const rest = _classPrivateFieldGet(this, _getFilmsToShow).call(this);

        if (rest) {
          _classPrivateFieldGet(this, _renderFilmCards).call(this, _classPrivateFieldGet(this, _filmsMainCardList), rest);

          _classPrivateFieldSet(this, _shownFilmQuantity, _classPrivateFieldGet(this, _shownFilmQuantity) + rest.length);
        }

        if (!_classPrivateFieldGet(this, _getFilmsToShow).call(this)) {
          _classPrivateFieldGet(this, _showMoreButton).destroyElement();
        }
      }
    });

    if (!(deskContainer instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_4__["default"] || deskContainer instanceof Element)) {
      throw new Error('Can\'t create instance of FilmDeskPresenter while renderContainer is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof _model_abstract_observable_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
        throw new Error(`Can\\'t create instance of FilmDeskPresenter while argument${i - 1} is not an instance of AbstractObservable`);
      }
    }

    _classPrivateFieldSet(this, _deskContainer, deskContainer);

    _classPrivateFieldSet(this, _filmsModel, filmsModel);

    _classPrivateFieldSet(this, _filterModel, filterModel);

    _classPrivateFieldGet(this, _filmsModel).addObserver(_classPrivateFieldGet(this, _handleModelEvent));

    _classPrivateFieldGet(this, _filterModel).addObserver(_classPrivateFieldGet(this, _handleModelEvent));
  }

  get filmsData() {
    const filterType = _classPrivateFieldGet(this, _filterModel).filterType;

    const films = _classPrivateFieldGet(this, _filmsModel).filmsData;

    const filteredTasks = _filter_js__WEBPACK_IMPORTED_MODULE_1__.filterFunctions[filterType](films);

    switch (_classPrivateFieldGet(this, _activeSortType)) {
      case _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.RATE:
        return (0,_filter_js__WEBPACK_IMPORTED_MODULE_1__.getTopRatedFilmsData)(filteredTasks);

      case _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.DATE:
        return (0,_filter_js__WEBPACK_IMPORTED_MODULE_1__.getFilmsDataByDate)(filteredTasks);

      case _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.COMMENT:
        return (0,_filter_js__WEBPACK_IMPORTED_MODULE_1__.getTopCommentedFilmsData)(filteredTasks);

      default:
      case _const_js__WEBPACK_IMPORTED_MODULE_2__.SortType.DEFAULT:
        return filteredTasks;
    }
  }

}



/***/ }),

/***/ "./src/presenter/filter-presenter.js":
/*!*******************************************!*\
  !*** ./src/presenter/filter-presenter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterMenuPresenter)
/* harmony export */ });
/* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract-view.js */ "./src/view/abstract-view.js");
/* harmony import */ var _model_abstract_observable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/abstract-observable.js */ "./src/model/abstract-observable.js");
/* harmony import */ var _view_filter_menu_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/filter-menu-view.js */ "./src/view/filter-menu-view.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filter.js */ "./src/filter.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }








var _filterContainer = /*#__PURE__*/new WeakMap();

var _filterModel = /*#__PURE__*/new WeakMap();

var _filmsModel = /*#__PURE__*/new WeakMap();

var _filterComponent = /*#__PURE__*/new WeakMap();

var _getStatistic = /*#__PURE__*/new WeakMap();

var _handleModelEvent = /*#__PURE__*/new WeakMap();

var _onFilterMenuClick = /*#__PURE__*/new WeakMap();

class FilterMenuPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    _classPrivateFieldInitSpec(this, _filterContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filterModel, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmsModel, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filterComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _getStatistic, {
      writable: true,
      value: () => ({
        watchlist: _filter_js__WEBPACK_IMPORTED_MODULE_4__.filterFunctions[_const_js__WEBPACK_IMPORTED_MODULE_5__.FilterTypes.WATCHLIST](_classPrivateFieldGet(this, _filmsModel).filmsData).length,
        watched: _filter_js__WEBPACK_IMPORTED_MODULE_4__.filterFunctions[_const_js__WEBPACK_IMPORTED_MODULE_5__.FilterTypes.WATCHED](_classPrivateFieldGet(this, _filmsModel).filmsData).length,
        favorite: _filter_js__WEBPACK_IMPORTED_MODULE_4__.filterFunctions[_const_js__WEBPACK_IMPORTED_MODULE_5__.FilterTypes.FAVORITE](_classPrivateFieldGet(this, _filmsModel).filmsData).length
      })
    });

    _defineProperty(this, "init", () => {
      const prevFilterComponent = _classPrivateFieldGet(this, _filterComponent);

      _classPrivateFieldSet(this, _filterComponent, new _view_filter_menu_view_js__WEBPACK_IMPORTED_MODULE_2__["default"](_classPrivateFieldGet(this, _getStatistic).call(this), _classPrivateFieldGet(this, _filterModel).filterType));

      _classPrivateFieldGet(this, _filterComponent).setFilterMenuClickHandler(_classPrivateFieldGet(this, _onFilterMenuClick));

      if (prevFilterComponent) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_3__.replace)(prevFilterComponent, _classPrivateFieldGet(this, _filterComponent));
        prevFilterComponent.removeElement();
        return;
      }

      (0,_render_js__WEBPACK_IMPORTED_MODULE_3__.render)(_classPrivateFieldGet(this, _filterContainer), _classPrivateFieldGet(this, _filterComponent), _render_js__WEBPACK_IMPORTED_MODULE_3__.RenderPosition.BEFOREEND);
    });

    _classPrivateFieldInitSpec(this, _handleModelEvent, {
      writable: true,
      value: () => {
        this.init();
      }
    });

    _classPrivateFieldInitSpec(this, _onFilterMenuClick, {
      writable: true,
      value: filterType => {
        if (_classPrivateFieldGet(this, _filterModel).filterType === filterType) {
          return;
        }

        _classPrivateFieldGet(this, _filterModel).setFilter(_const_js__WEBPACK_IMPORTED_MODULE_5__.UpdateTypes.MAJOR, filterType);
      }
    });

    if (!(filterContainer instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] || filterContainer instanceof Element)) {
      throw new Error('Can\'t create instance of FilterPresenter while filterContainer is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof _model_abstract_observable_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
        throw new Error(`Can\\'t create instance of FilterPresenter while argument${i - 1} is not an instance of AbstractObservable`);
      }
    }

    _classPrivateFieldSet(this, _filterContainer, filterContainer);

    _classPrivateFieldSet(this, _filterModel, filterModel);

    _classPrivateFieldSet(this, _filmsModel, filmsModel); //todo: проверить, что не нужно
    //this.#filterModel.addObserver(this.#onFilterMenuClick);


    _classPrivateFieldGet(this, _filmsModel).addObserver(_classPrivateFieldGet(this, _handleModelEvent));
  }

}



/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition)
/* harmony export */ });
/* harmony import */ var _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/abstract-view */ "./src/view/abstract-view.js");

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

const render = (container, component, place) => {
  const parent = container instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] ? container.element : container;
  const child = component instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] ? component.element : component;

  if (parent instanceof Element && child instanceof Element) {
    switch (place) {
      case RenderPosition.BEFOREBEGIN:
        parent.before(child);
        break;

      case RenderPosition.AFTERBEGIN:
        parent.prepend(child);
        break;

      case RenderPosition.BEFOREEND:
        parent.append(child);
        break;

      case RenderPosition.AFTEREND:
        parent.after(child);
        break;

      default:
        break;
    }
  } else {
    throw new Error('Container or component aren\'t instance of Element');
  }
};

const replace = (oldElement, newElement) => {
  if (!(oldElement && newElement)) {
    throw new Error('Can\'t replace non-existing elements');
  }

  const oldInstance = oldElement instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldElement.element : oldElement;
  const newInstance = newElement instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] ? newElement.element : newElement;

  if (!(oldInstance instanceof Element && newInstance instanceof Element)) {
    throw new Error('Can\'t replace non-Element instance');
  }

  oldInstance.replaceWith(newInstance);
};



/***/ }),

/***/ "./src/view/abstract-view.js":
/*!***********************************!*\
  !*** ./src/view/abstract-view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _element = /*#__PURE__*/new WeakMap();

var _eventInfo = /*#__PURE__*/new WeakMap();

var _getElementSelector = /*#__PURE__*/new WeakMap();

class AbstractView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _eventInfo, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _getElementSelector, {
      writable: true,
      value: selector => {
        var _this$element;

        const elementSelector = selector instanceof Element ? selector : (_this$element = this.element) === null || _this$element === void 0 ? void 0 : _this$element.querySelector(selector);

        if (!(elementSelector instanceof Element)) {
          throw new Error('Unable to create/remove event listener for non DOM Element');
        }

        return elementSelector;
      }
    });

    _defineProperty(this, "createElement", template => {
      if (typeof template === 'string') {
        const element = document.createElement('div');
        element.innerHTML = template;

        if (element.firstElementChild === element.lastElementChild) {
          return element.firstElementChild;
        }

        throw new Error('Can\'t create component from several sibling elements');
      }

      return null;
    });

    _defineProperty(this, "removeElement", () => {
      this.removeAllEventListeners();

      _classPrivateFieldSet(this, _element, null);
    });

    _defineProperty(this, "destroyElement", () => {
      if (!_classPrivateFieldGet(this, _element)) {
        return;
      }

      _classPrivateFieldGet(this, _element).remove();

      this.removeElement();
    });

    _defineProperty(this, "createEventListener", (selector, eventType, callback, isPreventDefault = _const_js__WEBPACK_IMPORTED_MODULE_0__.EventStates.PREVENT_DEFAULT) => {
      const elementSelector = _classPrivateFieldGet(this, _getElementSelector).call(this, selector);

      if (typeof callback !== 'function') {
        throw new Error('Argument "callback" is not a function');
      }

      const eventHandler = evt => {
        if (isPreventDefault) {
          evt.preventDefault();
        }

        callback(evt);
      };

      const isHasSimilar = [..._classPrivateFieldGet(this, _eventInfo).entries()].some(([key, [, handler]]) => key === elementSelector || handler === eventHandler);

      if (!isHasSimilar) {
        _classPrivateFieldGet(this, _eventInfo).set(elementSelector, [eventType, eventHandler]);

        elementSelector.addEventListener(eventType, eventHandler);
      }
    });

    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, class instance only');
    }
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, this.createElement(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    throw new Error('Abstract method not implemented: get template()');
  }

  removeAllEventListeners() {
    for (const [elementSelector, [eventType, eventHandler]] of _classPrivateFieldGet(this, _eventInfo).entries()) {
      elementSelector.removeEventListener(eventType, eventHandler);
    }

    _classPrivateFieldGet(this, _eventInfo).clear();
  }

}



/***/ }),

/***/ "./src/view/film-card-list-view.js":
/*!*****************************************!*\
  !*** ./src/view/film-card-list-view.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmCardListView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");


const getFilmCardsContainerTemplate = () => `<div class="films-list__container">
        <!-- Карточки фильмов -->
  </div>`;

class FilmCardListView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return getFilmCardsContainerTemplate();
  }

}



/***/ }),

/***/ "./src/view/film-card-view.js":
/*!************************************!*\
  !*** ./src/view/film-card-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmCardView)
/* harmony export */ });
/* harmony import */ var _mock_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/utils */ "./src/mock/utils.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const ACTIVE_CLASS = 'film-card__controls-item--active';

const getFilmCardTemplate = filmData => {
  if (filmData) {
    const {
      title = '',
      description = '',
      totalRating = 0,
      poster = '',
      genre = [],
      runtime = '',
      release = ''
    } = filmData.filmInfo || {};
    const year = (0,_mock_utils__WEBPACK_IMPORTED_MODULE_0__.changeDateFormat)(release === null || release === void 0 ? void 0 : release.date, _const__WEBPACK_IMPORTED_MODULE_1__.DateFormatStyle.YEAR);
    const comments = filmData.comments || [];
    const {
      watchlist = false,
      watched = false,
      favorite = false
    } = filmData.userDetails || {};
    return `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre.length ? genre[genre.length - 1] : ''}</span>
          </p>
          <img src="${poster}" alt="Изображение обложки фильма" class="film-card__poster">
          <p class="film-card__description">${(0,_mock_utils__WEBPACK_IMPORTED_MODULE_0__.getShortFilmDescription)(description)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? ACTIVE_CLASS : ''}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watched ? ACTIVE_CLASS : ''}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? ACTIVE_CLASS : ''}" type="button">Mark as favorite</button>
        </div>
    </article>`;
  }

  return '';
};

var _id = /*#__PURE__*/new WeakMap();

var _filmData = /*#__PURE__*/new WeakMap();

class FilmCardView extends _abstract_view__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(filmData) {
    super();

    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filmData, {
      writable: true,
      value: {}
    });

    _defineProperty(this, "setFilmClickHandler", callback => {
      this.createEventListener('.film-card__link', 'click', callback);
    });

    _defineProperty(this, "setWatchListClickHandler", callback => {
      this.createEventListener('.film-card__controls-item--add-to-watchlist', 'click', callback);
    });

    _defineProperty(this, "setWatchedClickHandler", callback => {
      this.createEventListener('.film-card__controls-item--mark-as-watched', 'click', callback);
    });

    _defineProperty(this, "setFavoriteClickHandler", callback => {
      this.createEventListener('.film-card__controls-item--favorite', 'click', callback);
    });

    _classPrivateFieldSet(this, _filmData, filmData);
  }

  get id() {
    return _classPrivateFieldGet(this, _id);
  }

  get template() {
    return getFilmCardTemplate(_classPrivateFieldGet(this, _filmData));
  }

}



/***/ }),

/***/ "./src/view/films-desk-view.js":
/*!*************************************!*\
  !*** ./src/view/films-desk-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsDeskView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");


const getFilmSectionTemplate = () => `<section class="films">
    <!-- Main film section + Top rated + Top commented -->
  </section>`;

class FilmsDeskView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return getFilmSectionTemplate();
  }

}



/***/ }),

/***/ "./src/view/films-quantity-footer-view.js":
/*!************************************************!*\
  !*** ./src/view/films-quantity-footer-view.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmFooterView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const getFilmFooterTemplate = filmFilter => {
  if (filmFilter !== null && filmFilter !== void 0 && filmFilter.total) {
    return `<p>${filmFilter.total} movies inside</p>`;
  }

  return '';
};

var _filmFilter = /*#__PURE__*/new WeakMap();

class FilmFooterView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmFilter) {
    super();

    _classPrivateFieldInitSpec(this, _filmFilter, {
      writable: true,
      value: {}
    });

    _classPrivateFieldSet(this, _filmFilter, filmFilter);
  }

  get template() {
    return getFilmFooterTemplate(_classPrivateFieldGet(this, _filmFilter));
  }

}



/***/ }),

/***/ "./src/view/films-sheet-view.js":
/*!**************************************!*\
  !*** ./src/view/films-sheet-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsSheetView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const getFilmListSectionTemplate = (titleText, isExtraSection = false, isHidden = false) => `<section class="films-list ${isExtraSection ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${titleText}</h2>
  </section>`;

var _titleText = /*#__PURE__*/new WeakMap();

var _isExtraSection = /*#__PURE__*/new WeakMap();

var _isHidden = /*#__PURE__*/new WeakMap();

class FilmsSheetView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(titleText, isExtraSection, isHidden) {
    super();

    _classPrivateFieldInitSpec(this, _titleText, {
      writable: true,
      value: ''
    });

    _classPrivateFieldInitSpec(this, _isExtraSection, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(this, _isHidden, {
      writable: true,
      value: false
    });

    _classPrivateFieldSet(this, _titleText, titleText);

    _classPrivateFieldSet(this, _isExtraSection, isExtraSection);

    _classPrivateFieldSet(this, _isHidden, isHidden);
  }

  get template() {
    return getFilmListSectionTemplate(_classPrivateFieldGet(this, _titleText), _classPrivateFieldGet(this, _isExtraSection), _classPrivateFieldGet(this, _isHidden));
  }

}



/***/ }),

/***/ "./src/view/filter-menu-view.js":
/*!**************************************!*\
  !*** ./src/view/filter-menu-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterMenuView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const ACTIVE_CLASS = 'main-navigation__item--active';

const getFilterMenuTemplate = (filmsStatistic = {}, filterType) => {
  const {
    watchlist = 0,
    watched = 0,
    favorite = 0
  } = filmsStatistic;
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${filterType === _const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.ALL ? ACTIVE_CLASS : ''}" data-filter-type=${_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.ALL}>All movies</a>
        <a href="#watchlist" class="main-navigation__item ${filterType === _const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.WATCHLIST ? ACTIVE_CLASS : ''}" data-filter-type=${_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${filterType === _const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.WATCHED ? ACTIVE_CLASS : ''}" data-filter-type=${_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.WATCHED}>History <span class="main-navigation__item-count">${watched}</span></a>
        <a href="#favorites" class="main-navigation__item ${filterType === _const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.FAVORITE ? ACTIVE_CLASS : ''}" data-filter-type=${_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.FAVORITE}>Favorites <span class="main-navigation__item-count">${favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional ${filterType === _const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.STATS ? ACTIVE_CLASS : ''}" data-filter-type=${_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.STATS}>Stats</a>
    </nav>`;
};

var _filmsStatistic = /*#__PURE__*/new WeakMap();

var _filterType = /*#__PURE__*/new WeakMap();

var _setActiveAnchor = /*#__PURE__*/new WeakMap();

class FilterMenuView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmsStatistic, filterType) {
    super();

    _classPrivateFieldInitSpec(this, _filmsStatistic, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _filterType, {
      writable: true,
      value: _const_js__WEBPACK_IMPORTED_MODULE_1__.FilterTypes.ALL
    });

    _classPrivateFieldInitSpec(this, _setActiveAnchor, {
      writable: true,
      value: evt => {
        this.element.querySelectorAll('a').forEach(anchor => {
          if (anchor === evt.target || anchor === evt.target.closest('a')) {
            anchor.classList.add(ACTIVE_CLASS);
          } else {
            anchor.classList.remove(ACTIVE_CLASS);
          }
        });
      }
    });

    _defineProperty(this, "setFilterMenuClickHandler", callback => {
      this.createEventListener(this.element, 'click', evt => {
        _classPrivateFieldGet(this, _setActiveAnchor).call(this, evt);

        callback(evt.target.dataset.filterType);
      });
    });

    _classPrivateFieldSet(this, _filmsStatistic, filmsStatistic);

    _classPrivateFieldSet(this, _filterType, filterType);
  }

  get template() {
    return getFilterMenuTemplate(_classPrivateFieldGet(this, _filmsStatistic), _classPrivateFieldGet(this, _filterType));
  }

}



/***/ }),

/***/ "./src/view/popup-view.js":
/*!********************************!*\
  !*** ./src/view/popup-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupView)
/* harmony export */ });
/* harmony import */ var _smart_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./smart-view */ "./src/view/smart-view.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const ACTIVE_CLASS = 'film-details__control-button--active';
const emotionTypes = ['smile', 'sleeping', 'puke', 'angry'];
const TableTerms = {
  DIRECTOR: 'Director',
  WRITERS: 'Writers',
  ACTORS: 'Actors',
  DATE: 'Release Date',
  TIME: 'Runtime',
  COUNTRY: 'Country',
  GENRES: 'Genres'
};

const getCommentEmotionTemplate = (emotion, isChecked = false) => {
  if (emotionTypes.includes(emotion)) {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isChecked ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`;
  }

  return '';
};

const getPopupNewCommentTemplate = (comment, userEmoji) => `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <!--User Emoji-->
      ${userEmoji ? `<img src="images/emoji/${userEmoji}.png" width="55" height="55" alt="emoji-${userEmoji}">` : ''}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ''}</textarea>
    </label>

    <div class="film-details__emoji-list">
        ${emotionTypes.map(emotion => getCommentEmotionTemplate(emotion, emotion === userEmoji)).join('')}
    </div>
  </div>`;

const getLoadedCommentTemplate = (comment = {}) => {
  const {
    id = '',
    author = '',
    emotion = '',
    content = '',
    date = ''
  } = comment;
  return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${content}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete" data-button-id = ${id}>Delete</button>
        </p>
      </div>
    </li>`;
};

const getPopupCommentSectionTemplate = data => {
  if (data) {
    return `<div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data.changedComments ? data.changedComments.length : 0}</span></h3>

          <ul class="film-details__comments-list">
            <!-- Отрисовка всех комментариев к фильму -->
            ${data.changedComments.map(comment => getLoadedCommentTemplate(comment)).join('')}
          </ul>

          ${getPopupNewCommentTemplate(data.userComment, data.userEmoji)}
        </section>
      </div>`;
  }

  return '';
};

const getTableRow = (term, ceilData) => `<tr class="film-details__row">
    <td class="film-details__term">${term || ''}</td>
    <td class="film-details__cell">${ceilData || ''}</td>
  </tr>`;

const getCardGenres = genres => {
  const genreTemplates = [];

  if (Array.isArray(genres)) {
    genres.forEach(genre => {
      genreTemplates.push(`<span class="film-details__genre">${genre}</span>`);
    });
  }

  return genreTemplates.join(' ');
};

const getPopupTemplate = data => {
  if (data) {
    const {
      title = '',
      alternativeTitle = '',
      description = '',
      totalRating = 0,
      poster = '',
      genre = [],
      runtime = '',
      release = {},
      pegi = '',
      director = '',
      writers = [],
      actors = []
    } = data.filmInfo || {};
    const {
      watchlist = false,
      watched = false,
      favorite = false
    } = data;
    return `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="Изображение постера фильма">
                <p class="film-details__age">+${pegi}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                ${getTableRow(TableTerms.DIRECTOR, director)}
                ${getTableRow(TableTerms.WRITERS, writers)}
                ${getTableRow(TableTerms.ACTORS, actors)}
                ${getTableRow(TableTerms.DATE, release.date || '')}
                ${getTableRow(TableTerms.TIME, runtime)}
                ${getTableRow(TableTerms.COUNTRY, release.country || '')}
                ${getTableRow(TableTerms.GENRES, getCardGenres(genre))}
                </table>

                <p class="film-details__film-description">
                  ${description}
              </div>
            </div>

            <section class="film-details__controls">
              <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? ACTIVE_CLASS : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
              <button type="button" class="film-details__control-button film-details__control-button--watched ${watched ? ACTIVE_CLASS : ''}" id="watched" name="watched">Already watched</button>
              <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? ACTIVE_CLASS : ''}" id="favorite" name="favorite">Add to favorites</button>
            </section>
          </div>

          <!-- Секция комментариев -->
          ${getPopupCommentSectionTemplate(data)}


        </form>
      </section>`;
  }

  return '';
};

var _popupActionCallback = /*#__PURE__*/new WeakMap();

var _defaultPopupUpdate = /*#__PURE__*/new WeakMap();

var _onUserEmojiChange = /*#__PURE__*/new WeakMap();

var _onUserCommentChange = /*#__PURE__*/new WeakMap();

var _onCommentDelete = /*#__PURE__*/new WeakMap();

var _onWatchListButtonClick = /*#__PURE__*/new WeakMap();

var _onWatchedButtonClick = /*#__PURE__*/new WeakMap();

var _onFavoriteButtonClick = /*#__PURE__*/new WeakMap();

var _onPopupButtonClose = /*#__PURE__*/new WeakMap();

var _onEscKeyDown = /*#__PURE__*/new WeakMap();

class PopupView extends _smart_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupActionCallback) {
    super();

    _classPrivateFieldInitSpec(this, _popupActionCallback, {
      writable: true,
      value: null
    });

    _defineProperty(this, "init", filmData => {
      this.data = _smart_view__WEBPACK_IMPORTED_MODULE_0__["default"].parseData(filmData);
      this.restoreHandlers();
    });

    _defineProperty(this, "restoreHandlers", () => {
      this.createEventListener('.film-details__close-btn', 'click', _classPrivateFieldGet(this, _onPopupButtonClose));
      this.createEventListener('.film-details__control-button--watchlist', 'click', _classPrivateFieldGet(this, _onWatchListButtonClick));
      this.createEventListener('.film-details__control-button--watched', 'click', _classPrivateFieldGet(this, _onWatchedButtonClick));
      this.createEventListener('.film-details__control-button--favorite', 'click', _classPrivateFieldGet(this, _onFavoriteButtonClick));
      this.createEventListener('.film-details__comment-input', 'change', _classPrivateFieldGet(this, _onUserCommentChange));
      this.createEventListener('.film-details__emoji-list', 'change', _classPrivateFieldGet(this, _onUserEmojiChange));
      this.createEventListener(document.body, 'keydown', _classPrivateFieldGet(this, _onEscKeyDown), _const_js__WEBPACK_IMPORTED_MODULE_1__.EventStates.EVENT_DEFAULT);
      this.element.querySelectorAll('.film-details__bottom-container li button').forEach(commentSelector => this.createEventListener(commentSelector, 'click', _classPrivateFieldGet(this, _onCommentDelete)));
    });

    _classPrivateFieldInitSpec(this, _defaultPopupUpdate, {
      writable: true,
      value: (update, actionType = _const_js__WEBPACK_IMPORTED_MODULE_1__.UserActions.UPDATE_DATA) => {
        this.updateElement(update);

        _classPrivateFieldGet(this, _popupActionCallback).call(this, actionType, _smart_view__WEBPACK_IMPORTED_MODULE_0__["default"].restoreData(this.data));
      }
    });

    _classPrivateFieldInitSpec(this, _onUserEmojiChange, {
      writable: true,
      value: evt => {
        this.updateElement({
          userEmoji: evt.target.value
        });
      }
    });

    _classPrivateFieldInitSpec(this, _onUserCommentChange, {
      writable: true,
      value: evt => {
        this.updateData({
          userComment: evt.target.value
        });
      }
    });

    _classPrivateFieldInitSpec(this, _onCommentDelete, {
      writable: true,
      value: evt => {
        const buttonId = evt.target.dataset.buttonId;
        const index = this.data.changedComments.findIndex(comment => comment.id === buttonId);
        this.data.changedComments.splice(index, 1);

        _classPrivateFieldGet(this, _defaultPopupUpdate).call(this, {
          changedComments: this.data.changedComments
        });
      }
    });

    _classPrivateFieldInitSpec(this, _onWatchListButtonClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _defaultPopupUpdate).call(this, {
          watchlist: !this.data.watchlist
        });
      }
    });

    _classPrivateFieldInitSpec(this, _onWatchedButtonClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _defaultPopupUpdate).call(this, {
          watched: !this.data.watched
        });
      }
    });

    _classPrivateFieldInitSpec(this, _onFavoriteButtonClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _defaultPopupUpdate).call(this, {
          favorite: !this.data.favorite
        });
      }
    });

    _classPrivateFieldInitSpec(this, _onPopupButtonClose, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _popupActionCallback).call(this, _const_js__WEBPACK_IMPORTED_MODULE_1__.UserActions.UPDATE_ACTIVE, null);
      }
    });

    _classPrivateFieldInitSpec(this, _onEscKeyDown, {
      writable: true,
      value: evt => {
        if (evt.key === _const_js__WEBPACK_IMPORTED_MODULE_1__.KeyCode.ESC) {
          _classPrivateFieldGet(this, _onPopupButtonClose).call(this);
        }

        if (evt.key === _const_js__WEBPACK_IMPORTED_MODULE_1__.KeyCode.ENTER && (evt.ctrlKey || evt.metaKey)) {
          //document.querySelector('.film-details__inner').submit();
          console.log(evt.key, evt.ctrlKey);
        }
      }
    });

    if (!(popupActionCallback instanceof Function)) {
      throw new Error('Can\'t create PopupView instance updateFilmPresenter is not a Function');
    }

    _classPrivateFieldSet(this, _popupActionCallback, popupActionCallback);
  }

  get template() {
    return getPopupTemplate(this.data);
  }

}



/***/ }),

/***/ "./src/view/show-more-button-view.js":
/*!*******************************************!*\
  !*** ./src/view/show-more-button-view.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowMoreButtonView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const getShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButtonView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setButtonClickHandler", callback => {
      this.createEventListener(this.element, 'click', callback);
    });
  }

  get template() {
    return getShowMoreButtonTemplate();
  }

}



/***/ }),

/***/ "./src/view/smart-view.js":
/*!********************************!*\
  !*** ./src/view/smart-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SmartView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _data = /*#__PURE__*/new WeakMap();

class SmartView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: {}
    });

    _defineProperty(this, "updateData", update => _classPrivateFieldSet(this, _data, { ..._classPrivateFieldGet(this, _data),
      ...update
    }));

    _defineProperty(this, "updateElement", update => {
      this.updateData(update);
      const prevElement = this.element;
      const scrollPosition = prevElement.scrollTop || 0;
      const parent = prevElement.parentElement;
      this.removeElement();
      const newElement = this.element;
      parent.replaceChild(newElement, prevElement);
      newElement.scrollTop = scrollPosition;
      this.restoreHandlers();
    });

    _defineProperty(this, "restoreHandlers", () => {
      throw new Error('Abstract method not implemented: restoreHandlers');
    });
  }

  get data() {
    return _classPrivateFieldGet(this, _data);
  }

  set data(data) {
    _classPrivateFieldSet(this, _data, data);
  }

}

_defineProperty(SmartView, "parseData", filmData => ({ ...filmData,
  changedComments: [...filmData.comments],
  watchlist: filmData.userDetails.watchlist,
  watched: filmData.userDetails.watched,
  favorite: filmData.userDetails.favorite
}));

_defineProperty(SmartView, "restoreData", data => {
  const filmData = { ...data
  };
  filmData.comments = data.changedComments;
  filmData.userDetails.watchlist = data.watchlist;
  filmData.userDetails.watched = data.watched;
  filmData.userDetails.favorite = data.favorite;
  delete filmData.watchlist;
  delete filmData.watched;
  delete filmData.favorite;
  delete filmData.changedComments;
  delete filmData.userComment;
  delete filmData.userEmoji;
  return filmData;
});



/***/ }),

/***/ "./src/view/sort-menu-view.js":
/*!************************************!*\
  !*** ./src/view/sort-menu-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortMenuView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



const ACTIVE_CLASS = 'sort__button--active';

const getFilmSortMenuTemplate = () => `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type = ${_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.RATE}>Sort by rating</a></li>
  </ul>`;

var _setActiveAnchor = /*#__PURE__*/new WeakMap();

class SortMenuView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _classPrivateFieldInitSpec(this, _setActiveAnchor, {
      writable: true,
      value: evt => {
        this.element.querySelectorAll('a').forEach(anchor => {
          if (anchor === evt.target) {
            anchor.classList.add(ACTIVE_CLASS);
          } else {
            anchor.classList.remove(ACTIVE_CLASS);
          }
        });
      }
    });
  }

  get template() {
    return getFilmSortMenuTemplate();
  }

  setSortClickHandler(callback) {
    this.createEventListener(this.element, 'click', evt => {
      _classPrivateFieldGet(this, _setActiveAnchor).call(this, evt);

      callback(evt);
    });
    return this.element;
  }

}



/***/ }),

/***/ "./src/view/user-profile-view.js":
/*!***************************************!*\
  !*** ./src/view/user-profile-view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserProfileView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const getUserProfileTemplate = userRank => `<section class="header__profile profile ">
    <p class="profile__rating">${userRank || ''}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

var _userRank = /*#__PURE__*/new WeakMap();

class UserProfileView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(userRank) {
    super();

    _classPrivateFieldInitSpec(this, _userRank, {
      writable: true,
      value: ''
    });

    _classPrivateFieldSet(this, _userRank, userRank);
  }

  get template() {
    return getUserProfileTemplate(_classPrivateFieldGet(this, _userRank));
  }

}



/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ "./node_modules/nanoid/index.dev.js":
/*!******************************************!*\
  !*** ./node_modules/nanoid/index.dev.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

if (true) {
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "./src/filter.js");
/* harmony import */ var _mock_data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock/data.js */ "./src/mock/data.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _view_user_profile_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/user-profile-view.js */ "./src/view/user-profile-view.js");
/* harmony import */ var _view_films_quantity_footer_view_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/films-quantity-footer-view.js */ "./src/view/films-quantity-footer-view.js");
/* harmony import */ var _presenter_films_desk_presenter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./presenter/films-desk-presenter.js */ "./src/presenter/films-desk-presenter.js");
/* harmony import */ var _presenter_filter_presenter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./presenter/filter-presenter.js */ "./src/presenter/filter-presenter.js");
/* harmony import */ var _model_films_model_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./model/films-model.js */ "./src/model/films-model.js");
/* harmony import */ var _model_filter_model_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./model/filter-model.js */ "./src/model/filter-model.js");









const filmsData = (0,_mock_data_js__WEBPACK_IMPORTED_MODULE_1__.getRandomFilmData)();
const filmsStatistic = (0,_filter_js__WEBPACK_IMPORTED_MODULE_0__.getFilmsStatistic)(filmsData);
const userRank = (0,_filter_js__WEBPACK_IMPORTED_MODULE_0__.getUserRank)();
const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');
(0,_render_js__WEBPACK_IMPORTED_MODULE_2__.render)(sectionHeader, new _view_user_profile_view_js__WEBPACK_IMPORTED_MODULE_3__["default"](userRank), _render_js__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
const filmsModel = new _model_films_model_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
filmsModel.filmsData = filmsData;
const filterModel = new _model_filter_model_js__WEBPACK_IMPORTED_MODULE_8__["default"]();
const filterMenu = new _presenter_filter_presenter_js__WEBPACK_IMPORTED_MODULE_6__["default"](sectionMain, filterModel, filmsModel);
filterMenu.init();
const filmDesk = new _presenter_films_desk_presenter_js__WEBPACK_IMPORTED_MODULE_5__["default"](sectionMain, filmsModel, filterModel);
filmDesk.init(filmsData);

if (filmsData.length) {
  (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.render)(footerStatistic, new _view_films_quantity_footer_view_js__WEBPACK_IMPORTED_MODULE_4__["default"](filmsStatistic), _render_js__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map