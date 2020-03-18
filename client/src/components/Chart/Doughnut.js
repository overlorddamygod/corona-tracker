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
              backgroundColor: ['#E46651', '#059BFF','#4BC0C0'],
              borderWidth:1,
              data: [Cases,Deaths,Recovered]
            }]
        }, {
            legend: {
              labels: {
                fontColor: 'whitesmoke'
              }
            },
            responsive: true,
            maintainAspectRatio: false
          });
      }
  }
};