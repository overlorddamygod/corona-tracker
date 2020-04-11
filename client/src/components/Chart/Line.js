import { Line } from 'vue-chartjs';
export default {
    extends: Line,
    props: [
        'latest'
    ],
  mounted: function mounted() {
      this.render();
    },
    methods: {
        render() {
            // console.log(this.latest);
            this.latest.reverse();
            let total_death = []
            let total_cases = []
            let total_recovered = []
            this.latest.forEach(da => {
                const {cases,deaths,recovered} = da.details
                total_death.push(deaths)
                total_cases.push(cases)
                total_recovered.push(recovered)
            });
            
            
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Total Cases',
                Color: 'white',
                borderColor: '#f87979',
                borderWidth: 4,
                data: total_cases
            }, {
                label: 'Total Deaths',
                Color: 'white',
                // backgroundColor: '#f87979',
                data: total_death
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            line: {
                backgroundColor: 'red'
        
            }
        });
}
  }
};