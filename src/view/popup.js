import { getPopupLoadedCommentTemplate } from './popup-loaded-comments';
import { getPopupNewCommentTemplate } from './popup-new-comment';

const TableTerms = {
  DIRECTOR: 'Director',
  WRITERS: 'Writers',
  ACTORS: 'Actors',
  DATE: 'Release Date',
  TIME: 'Runtime',
  COUNTRY: 'Country',
  GENRES: 'Genres'
};

//Функция возвращает класс для подсветки соответствующего фильтра
const getCardClassesByFilter = (filter) => filter ? 'film-details__control-button--active' : '';

//Шаблон для таблицы с информацией о фильме
const getTableRow = (term, ceilData) => (
  `<tr class="film-details__row">
  <td class="film-details__term">${term}</td>
  <td class="film-details__cell">${ceilData}</td>
</tr>`
);

//Шаблон с информацией о жанрах фильма
const getCardGenres = (genres) => {
  const genreHTML = [];
  if (Array.isArray(genres)) {
    genres.forEach((genre) => {
      genreHTML.push(`<span class="film-details__genre">${genre}</span>`);
    });
  }
  return genres.join(', ');
};

//Шаблон всего popup'a
const getPopupTemplate = (filmData) => {
  const {
    title = '',
    alternativeTitle = '',
    description = '',
    totalRating = 0,
    poster = '',
    genre = [],
    runtime = '',
    release = '',
    pegi = '',
    director = '',
    writers = '',
    actors = '',
  } = filmData?.filmInfo ? filmData.filmInfo : '';

  const {
    watchlist = '',
    watched = '',
    favorite = ''
  } = filmData?.userDetails ? filmData.userDetails : '';

  return (
    `<section class="film-details">
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
              ${getTableRow(TableTerms.DATE, release.date ? release.date : '')}
              ${getTableRow(TableTerms.TIME, runtime)}
              ${getTableRow(TableTerms.COUNTRY, release.country ? release.country : '')}
              ${getTableRow(TableTerms.GENRES, getCardGenres(genre))}
              </table>

              <p class="film-details__film-description">
                ${description}
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getCardClassesByFilter(watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${getCardClassesByFilter(watched)}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${getCardClassesByFilter(favorite)}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <!-- Uploaded Comments -->
            ${getPopupLoadedCommentTemplate(filmData)}
            <!-- New Comment -->
            ${getPopupNewCommentTemplate(filmData)}
          </section>
        </div>
      </form>
    </section>`
  );
};

export { getPopupTemplate };
