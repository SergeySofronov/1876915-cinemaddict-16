import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';
import { getUserRank, getWatchedFilmsData } from '../filter.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(duration);
dayjs.extend(isBetween);

const BAR_HEIGHT = 50;
const DATE_DIFF_STEP = 1;
const DATE_OLDEST = 1000;

const FilterTypes = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};

const menuNames = {
  [FilterTypes.ALL_TIME]: 'All time',
  [FilterTypes.TODAY]: 'Today',
  [FilterTypes.WEEK]: 'Week',
  [FilterTypes.MONTH]: 'Month',
  [FilterTypes.YEAR]: 'Year'
};

const dateDiffCalc = {
  [FilterTypes.ALL_TIME]: () => dayjs().subtract(DATE_OLDEST, 'year'),
  [FilterTypes.TODAY]: () => dayjs().subtract(DATE_DIFF_STEP, 'day'),
  [FilterTypes.WEEK]: () => dayjs().subtract(DATE_DIFF_STEP, 'week'),
  [FilterTypes.MONTH]: () => dayjs().subtract(DATE_DIFF_STEP, 'month'),
  [FilterTypes.YEAR]: () => dayjs().subtract(DATE_DIFF_STEP, 'year')
};

const getStatisticMenuItem = (filterType, activeFilterType) => (
  `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filterType}" value="${filterType}" ${activeFilterType === filterType ? 'checked' : ''}>
  <label for="statistic-${filterType}" class="statistic__filters-label">${menuNames[filterType]}</label>`
);

const getStatisticMenu = (activeFilterType) => {
  const result = [];
  for (const filter of Object.values(FilterTypes)) {
    result.push(getStatisticMenuItem(filter, activeFilterType));
  }
  return result.join('');
};

const getStatsTemplate = (data, activeFilterType, genresAndQuantity, userRank, totalDuration) => {

  const topGenre = [...genresAndQuantity.keys()][0];
  const chartRows = genresAndQuantity.size;
  const hours = dayjs.duration(totalDuration, 'minutes').$d.hours;
  const minutes = dayjs.duration(totalDuration, 'minutes').$d.minutes;

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${getStatisticMenu(activeFilterType)}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${(activeFilterType === FilterTypes.ALL_TIME) ? data.filmsData.length : data.filteredFilmsData.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre ? topGenre : ''}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000" height="${BAR_HEIGHT * chartRows}"></canvas>
      </div>
    </section>`
  );
};

class UserStatisticView extends SmartView {
  #filmsData = null;
  #userRank = '';
  #totalDuration = '';
  #genres = new Set;
  #genresAndQuantity = new Map;
  #activeFilterType = FilterTypes.ALL_TIME;
  #statisticCtx = null;

  get template() {
    return getStatsTemplate(this._data, this.#activeFilterType, this.#genresAndQuantity, this.#userRank, this.#totalDuration);
  }

  init = (filmsData) => {
    if (filmsData) {
      this.#filmsData = filmsData;
    }
    const isDateChecking = (this.#activeFilterType !== FilterTypes.ALL_TIME);
    this._data = { filmsData: getWatchedFilmsData(this.#filmsData, isDateChecking) || [], filteredFilmsData: [], };
    this.#userRank = getUserRank(this._data.filmsData.length);

    this._data.filteredFilmsData = this.#getFilteredFilmsData();
    this.#updateFilmsStatistic();
    this.updateElement();
    this.#createChart();
    this.restoreHandlers();
  }

  restoreHandlers = () => this.createEventListener('.statistic__filters', 'change', this.#onFiltersChange);


  #updateFilmsGenres = (genres) => genres.forEach((genre) => this.#genres.add(genre));

  #getFilteredFilmsData = () => this._data.filmsData.filter((film) => (dayjs(film.userDetails.watchingDate).isBetween(dateDiffCalc[this.#activeFilterType](), dayjs())));

  #getFilmsQuantityByGenre = () => {
    this.#genres.forEach((genre) => {
      let quantity = 0;
      this._data.filteredFilmsData.forEach((film) => {
        const filmGenres = film.filmInfo?.genre;
        if (Array.isArray(filmGenres) && filmGenres.includes(genre)) {
          quantity++;
        }
      });
      this.#genresAndQuantity.set(genre, quantity);
    });
    this.#genresAndQuantity = new Map([...this.#genresAndQuantity.entries()].sort((a, b) => (b[1] - a[1])));
  }

  #updateFilmsStatistic = () => {
    this.#genres = new Set;
    this.#genresAndQuantity = new Map;
    this._data.filteredFilmsData.forEach((film) => {
      this.#updateFilmsGenres(film.filmInfo?.genre || []);
    });
    this.#getFilmsQuantityByGenre();
    this.#totalDuration = this._data.filteredFilmsData.reduce((sum, film) => (sum += parseInt(film.filmInfo?.runtime, 10)), 0);
  }

  #createChart = () => {

    this.#statisticCtx = this.element.querySelector('.statistic__chart');

    new Chart(this.#statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [...this.#genresAndQuantity.keys()],
        datasets: [{
          data: [...this.#genresAndQuantity.values()],
          backgroundColor: '#ffe800',
          hoverBackgroundColor: '#ffe800',
          anchor: 'start',
          barThickness: 24,
        }],
      },
      options: {
        responsive: false,
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: '#ffffff',
            anchor: 'start',
            align: 'start',
            offset: 40,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#ffffff',
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  #onFiltersChange = (evt) => {
    this.#activeFilterType = evt.target.value;
    this.init();
  }

}

export { UserStatisticView as default };
