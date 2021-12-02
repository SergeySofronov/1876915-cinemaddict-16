import { filmDescriptionHandle, changeDateFormat } from '../mock/utils';

const getCardClassesByFilter = (filter) => filter ? 'film-card__controls-item--active' : '';

const getFilmCardTemplate = (filmData) => {
  const {
    title = '',
    description = '',
    totalRating = 0,
    poster = '',
    genre = [],
    runtime = '',
    release = '',
  } = filmData?.filmInfo ? filmData.filmInfo : '';
  const year = changeDateFormat(release.date, 'YYYY');
  const watchlistClass = getCardClassesByFilter(filmData?.userDetails?.watchlist);
  const watchedClass = getCardClassesByFilter(filmData?.userDetails?.watched);
  const favoriteClass = getCardClassesByFilter(filmData?.userDetails?.favorite);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${genre.length ? genre[genre.length - 1] : ''}</span>
        </p>
        <img src="${poster}" alt="Изображение обложки фильма" class="film-card__poster">
        <p class="film-card__description">${filmDescriptionHandle(description)}</p>
        <span class="film-card__comments">${filmData?.comments ? filmData?.comments.length : 0} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClass}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClass}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export { getFilmCardTemplate };
