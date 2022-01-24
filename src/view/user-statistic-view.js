import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';

const BAR_HEIGHT = 50;

const FilterTypes = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};

const MenuNames = {
  [FilterTypes.ALL_TIME]: 'All time',
  [FilterTypes.TODAY]: 'Today',
  [FilterTypes.WEEK]: 'Week',
  [FilterTypes.MONTH]: 'Month',
  [FilterTypes.YEAR]: 'Year'
};

const getStatisticMenuItem = (filterType, activeFilterType) => (
  `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filterType}" value="${filterType}" ${activeFilterType === filterType ? 'checked' : ''}>
  <label for="statistic-${filterType}" class="statistic__filters-label">${MenuNames[filterType]}</label>`
);

const getStatisticMenu = (activeFilterType) => {
  const result = [];
  for (const filter of Object.values(FilterTypes)) {
    result.push(getStatisticMenuItem(filter, activeFilterType));
  }
  return result.join('');
};

const getStatsTemplate = (activeFilterType) => (
  `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${getStatisticMenu(activeFilterType)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">28 <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">69 <span class="statistic__item-description">h</span> 41 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Drama</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000" height="${BAR_HEIGHT * 5}"></canvas>
    </div>
  </section>`
);

class UserStatisticView extends SmartView {
  #chart = null;
  #genres = [];
  #activeFilterType = FilterTypes.ALL_TIME;
  #statisticCtx = null;

  constructor(filmsData) {
    super();
    this._data = filmsData;
  }

  get template() {
    return getStatsTemplate(this.#activeFilterType);
  }

  init = () => {
    this.#getChart(this._data);
  }

  #getChart = () => {

    this.#statisticCtx = this.element.querySelector('.statistic__chart');

    this.#chart = new Chart(this.#statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
        datasets: [{
          data: [11, 8, 7, 4, 3],
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
}

export { UserStatisticView as default };
