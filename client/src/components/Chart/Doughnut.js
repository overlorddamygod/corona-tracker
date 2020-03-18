import { Doughnut } from 'vue-chartjs';
export default {
    extends: Doughnut,
    props: [
        'countryData',
        'styles'
    ],
    watch: {
        countryData: function () {
            this.render();
        }
      },
  mounted: function mounted() {
      this.render();
  },
  methods: {
      render() {
        const Cases = parseInt(this.countryData.TotalCases.replace(/,/g, ''))
        const Deaths =parseInt(this.countryData.TotalDeaths.replace(/,/g, ''))
        const Recovered = parseInt(this.countryData.TotalRecovered.replace(/,/g, ''))
        
        this.renderChart({
            labels: ['Cases', 'Deaths', 'Recovered'],
            datasets: [{
              backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
              data: [Cases,Deaths,Recovered]
            }]
          }, {
            responsive: true,
            maintainAspectRatio: false
          });
      }
  }
};