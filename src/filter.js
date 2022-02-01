import { DateFormatStyle, FilterTypes, UserScores, UserRanks } from './const';
import { changeDateFormat } from './utils';

const getUserRank = (watchedFilmsQuantity) => {
  if (watchedFilmsQuantity >= UserScores.BUFF) {
    return UserRanks.BUFF;
  }

  if (watchedFilmsQuantity >= UserScores.FAN) {
    return UserRanks.FAN;
  }

  if (watchedFilmsQuantity >= UserScores.NOVICE) {
    return UserRanks.NOVICE;
  }

  return '';
};

const getWatchedFilmsData = (films, isDateChecking) => {
  if (Array.isArray(films)) {
    return films.filter((film) => Boolean((film.userDetails?.watched) && (film.userDetails?.watchingDate || (!isDateChecking))));
  }
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
    return films.filter((film) => Boolean(film.commentsIds?.length))
      .sort((a, b) => (b.commentsIds.length - a.commentsIds.length));
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

const filterFunctions = {
  [FilterTypes.ALL]: (films) => films.filter((film) => Boolean(film.id)),
  [FilterTypes.WATCHLIST]: (films) => films.filter((film) => Boolean(film.userDetails.watchlist)),
  [FilterTypes.WATCHED]: (films) => films.filter((film) => Boolean(film.userDetails.watched)),
  [FilterTypes.FAVORITE]: (films) => films.filter((film) => Boolean(film.userDetails.favorite)),
  [FilterTypes.STATS]: (films) => films.filter((film) => Boolean(film.id))
};

export { getUserRank, getWatchedFilmsData, getTopCommentedFilmsData, getTopRatedFilmsData, getFilmsDataByDate, filterFunctions };

