import AbstractObservable from './abstract-observable.js';
import { UpdateTypes } from '../const.js';

class FilmsModel extends AbstractObservable {
  #filmsData = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get filmsData() {
    return this.#filmsData;
  }

  init = async () => {
    try {
      const films = await this.#apiService.filmsData;
      this.#filmsData = Array.isArray(films) ? films.map(this.#adaptFilmToClient) : [];
    } catch (err) {
      this.#filmsData = [];
    }

    this._notify(UpdateTypes.INIT);
  }


  update = async (updateType, updateData) => {
    try {
      const index = this.#getFilmIndex(updateData);
      const filmResponse = await this.#apiService.updateFilm(updateData);
      let updatedFilm = this.#adaptFilmToClient(filmResponse);
      const commentResponse = await this.#apiService.getComments(updateData);
      updatedFilm = this.#adaptCommentToClient(updatedFilm, commentResponse);
      this.#filmsData.splice(index, 1, updatedFilm);

      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update film');
    }
  };

  getComments = async (updateType, updateData) => {
    try {
      const index = this.#getFilmIndex(updateData);
      const response = await this.#apiService.getComments(updateData);
      const updatedFilm = this.#adaptCommentToClient(this.filmsData[index], response);
      this.#filmsData.splice(index, 1, updatedFilm);

      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t get film comment');
    }
  }

  addComment = async (updateType, updateData) => {
    try {
      const index = this.#getFilmIndex(updateData);
      const response = await this.#apiService.addComment(updateData);
      this.#filmsData[index].comments = response.comments;
      this.#filmsData[index].commentsIds = response.movie.comments;

      this._notify(updateType, { ...this.filmsData[index] });
    } catch (err) {
      throw new Error('Can\'t get film comment');
    }
  }

  deleteComment = async (updateType, updateData) => {
    try {
      const index = this.#getFilmIndex(updateData);
      const commentId = updateData.deletingCommentId;
      const commentIndex = this.#filmsData[index].comments.findIndex((comment) => comment.id === commentId);

      await this.#apiService.deleteComment(commentId);
      this.#filmsData[index].comments.splice(commentIndex, 1);
      this.#filmsData[index].commentsIds.splice(commentIndex, 1);

      this._notify(updateType, { ...this.filmsData[index] });
    } catch (err) {
      throw new Error('Can\'t get film comment');
    }
  }

  #getFilmIndex = (updateData) => {
    const index = this.#filmsData.findIndex((film) => film.id === updateData?.id);
    if (index === -1) {
      throw new Error('Can\'t update non existing film');
    }
    return index;
  }

  #adaptCommentToClient = (film, comments) => ({
    ...film,
    comments: Array.isArray(comments) ? comments : [],
  });

  #adaptFilmToClient = (film) => {

    let adaptedFilm = {
      id: '',
      commentsIds: [],
      comments: [],
      filmInfo: {
        title: '',
        alternativeTitle: '',
        totalRating: '',
        poster: '',
        pegi: '',
        director: '',
        description: '',
        actors: '',
        genre: '',
        writers: '',
        release: {
          date: '',
          country: '',
        },
        runtime: '',
      },
      userDetails: {
        watchlist: '',
        watched: '',
        favorite: '',
        watchingDate: '',
      },
      deletingCommentId: '',
      addingComment: '',
    };

    adaptedFilm = {
      ...adaptedFilm,
      ...film,
      comments: [],
      commentsIds: Array.isArray(film.comments) ? film.comments : [],
      filmInfo: { ...film.film_info },
      userDetails: { ...film.user_details }
    };

    if (film.film_info) {
      adaptedFilm.filmInfo.pegi = film.film_info.age_rating;
      delete adaptedFilm.filmInfo.age_rating;
      adaptedFilm.filmInfo.alternativeTitle = film.film_info.alternative_title;
      delete adaptedFilm.filmInfo.alternative_title;
      adaptedFilm.filmInfo.totalRating = film.film_info.total_rating;
      delete adaptedFilm.filmInfo.total_rating;

      if (film.film_info.release) {
        adaptedFilm.filmInfo.release.country = film.film_info.release.release_country;
        delete adaptedFilm.filmInfo.release.release_country;
      }

      delete adaptedFilm.film_info;
    }

    if (film.user_details) {
      adaptedFilm.userDetails.watched = film.user_details.already_watched;
      delete adaptedFilm.userDetails.already_watched;
      adaptedFilm.userDetails.watchingDate = film.user_details.watching_date;
      delete adaptedFilm.userDetails.watching_date;
      delete adaptedFilm.user_details;
    }

    return adaptedFilm;
  }
}

export { FilmsModel as default };
