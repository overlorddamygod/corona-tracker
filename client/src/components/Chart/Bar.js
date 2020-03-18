import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: [
    'items',
    'details',
    'styles'
  ],
  mounted: function mounted() {
    this.renderChart({
      labels: this.items.map((item) => item.Country),
      datasets: [{        
        label: 'Total Cases',
        backgroundColor: '#f87979',
        data: this.items.map((item) => parseInt((item.TotalCases.replace(/,/g, '')/this.details.cases)*100))
      },
      {
        label: 'Total Deaths',
        backgroundColor: '#36A2EB',
        data: this.items.map((item) => parseInt((item.TotalDeaths.replace(/,/g, '')/this.details.deaths)*100))
        },
        {
          label: 'Total Recovered',
          backgroundColor: '#4BC0C0',
          data: this.items.map((item) => parseInt((item.TotalRecovered.replace(/,/g, '')/this.details.recovered)*100))
        }]
    }, {
        title: {
          fontColor: 'red',
        },

        legend: {
          labels: {
          fontColor: 'whitesmoke',
        }
      },
      responsive: true,
      maintainAspectRatio: false
    });
  }
};