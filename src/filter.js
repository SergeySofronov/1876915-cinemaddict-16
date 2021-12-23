import { DateFormatStyle } from './const';
import { changeDateFormat } from './mock/utils';

const filmStatistic = {
  watchlist: 0,
  watched: 0,
  favorite: 0,
  total: 0
};

const userRank = {
  'novice': [1, 10],
  'fan': [11, 20],
  'movie buff': [21, Infinity]
};

const getUserRank = () => {
  let rank = null;
  const rankValues = Object.entries(userRank);
  for (const [key, [min, max]] of rankValues) {
    if ((filmStatistic.watched >= min) && (filmStatistic.watched <= max)) {
      rank = key;
      break;
    }
  }

  return rank;
};

const getFilmsStatistic = (filmData) => {
  if (Array.isArray(filmData)) {
    filmStatistic.total = filmData.length;

    filmData.forEach((film) => {
      filmStatistic.watchlist += film.userDetails.watchlist ? 1 : 0;
      filmStatistic.watched += film.userDetails.watched ? 1 : 0;
      filmStatistic.favorite += film.userDetails.favorite ? 1 : 0;
    });
  }

  return filmStatistic;
};

const getTopRatedFilmsData = (films) => {
  if (Array.isArray(films)) {
    return films.filter((film) => Boolean(film.filmInfo?.totalRating))
      .sort((a, b) => (b.filmInfo.totalRating - a.filmInfo.totalRating));
  }

  return [];
};


const getTopCommentedFilmsData = (films) => {
  if (Array.isArray(films)) {
    return films.filter((film) => Boolean(film.comments?.length))
      .sort((a, b) => (b.comments.length - a.comments.length));
  }

  return [];
};

const getFilmsDataByDate = (films) => {
  if (Array.isArray(films)) {
    return films.filter((film) => Boolean(film.filmInfo?.release?.date))
      .sort((a, b) => {
        const first = parseInt(changeDateFormat(a.filmInfo.release.date, DateFormatStyle.YEAR), 10);
        const second = parseInt(changeDateFormat(b.filmInfo.release.date, DateFormatStyle.YEAR), 10);

        if ((typeof (first) !== 'number') && (typeof (second) !== 'number')) {
          return 0;
        } else if ((typeof (first) !== 'number')) {
          return -1;
        } else {
          return (second - first);
        }
      });
  }

  return [];

};

export { getFilmsStatistic, getUserRank, getTopCommentedFilmsData, getTopRatedFilmsData, getFilmsDataByDate };

