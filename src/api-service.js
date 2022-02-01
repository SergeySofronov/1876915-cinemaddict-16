import { Methods } from './const';

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get filmsData() {
    return this.#load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this.#load({
      url: `movies/${film.id}`,
      method: Methods.PUT,
      body: JSON.stringify(this.#adaptFilmToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  getComments = (film) => this.#load({ url: `comments/${film.id}` }).then(ApiService.parseResponse);

  addComment = async (film) => {
    const response = await this.#load({
      url: `comments/${film.id}`,
      method: Methods.POST,
      body: JSON.stringify(film.addingComment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  deleteComment = async (commentId) => {
    const response = await this.#load({
      url: `comments/${commentId}`,
      method: Methods.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Methods.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      { method, body, headers },
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptFilmToServer = (film) => {

    const adaptedFilm = {
      ...film,
      comments: film.commentsIds,
      ['film_info']: {
        ...film.filmInfo,
        ['alternative_title']: film.filmInfo.alternativeTitle,
        ['total_rating']: film.filmInfo.totalRating,
        ['age_rating']: film.filmInfo.pegi,
        release: {
          ...film.filmInfo.release,
          ['release_country']: film.filmInfo.release.country,
        },
      },
      ['user_details']: {
        // ...film.userDetails,
        // ['already_watched']: film.userDetails.watched,
        // ['watching_date']: film.userDetails.watchingDate,
        ['watchlist']: film.watchlist,
        ['favorite']:film.favorite,
        ['already_watched']: film.userDetails.watched,
        ['watching_date']: film.userDetails.watchingDate,
      }
    };

    delete adaptedFilm.commentsIds;
    delete adaptedFilm['film_info'].alternativeTitle;
    delete adaptedFilm['film_info'].totalRating;
    delete adaptedFilm['film_info'].pegi;
    delete adaptedFilm['film_info'].release.country;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm['user_details'].watched;
    delete adaptedFilm['user_details'].watchingDate;
    delete adaptedFilm.userDetails;
    delete adaptedFilm.addingComment;
    delete adaptedFilm.deletingCommentId;
    delete adaptedFilm.watchlist;
    delete adaptedFilm.watched;
    delete adaptedFilm.favorite;

    return adaptedFilm;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}

export { ApiService };
