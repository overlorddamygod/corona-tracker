<template>
  <div id="app">
    <b-container>
      <header class="title">
        <div>
        <h2>Corona Virus Tracker</h2>
        </div>
      </header>
      <main v-if="loaded">
        <b-row>
          <b-col cols=4>
          <b-card
          border-variant="danger"
          header="Cases"
          header-border-variant="danger"
          header-text-variant="danger"
          align="center"
          class="full-height"
          >
          <b-card-text><countTo v-if="loaded" :startVal=0 :endVal='details.cases' :duration='1200'></countTo></b-card-text>
          </b-card>
          </b-col>
          <b-col cols=4><b-card
          border-variant="danger"
          header="Deaths"
          header-border-variant="danger"
          header-text-variant="danger"
          align="center"
          class="full-height"
          >
          <b-card-text><countTo v-if="loaded" :startVal=0 :endVal='details.deaths' :duration='1200'></countTo></b-card-text>
          </b-card></b-col>
          <b-col cols=4><b-card
          border-variant="danger"
          header="Recovered"
          header-border-variant="danger"
          header-text-variant="danger"
          align="center"
          class="full-height"
          >
          <b-card-text><countTo v-if="loaded" :startVal=0 :endVal='details.recovered' :duration='1200'></countTo></b-card-text>
          </b-card></b-col>
         
        </b-row>
        <b-row class="my-4">

          <b-col lg=6 sm=12 >

            <bar :styles="barStyle" :details="details" :items="items" class="mb-3"></bar>
            <b-table responsive small hover striped outlined :items="items"></b-table>
          </b-col>
          <b-col lg=6 sm=12 >
                    <doughnut class="mx-auto mb-3" :styles="doughnutStyle" :countryData="countryData"></doughnut>
            <b-form-group id="input-group-3" label="Browse by country" label-for="input-3">

        <b-form-select
          id="input-3"
          v-model="country"
          :options="countries"
          required
        ></b-form-select>
      </b-form-group>
      <b-card>
        <div v-if="countryData.Country != ''">
          Country : {{countryData.Country}}
        </div>
        <div v-if="countryData.TotalCases != ''">
          TotalCases : {{countryData.TotalCases}}
        </div>
        <div v-if="countryData.NewCases != ''">
          NewCases : {{countryData.NewCases}}
        </div>
        <div v-if="countryData.TotalDeaths != ''">
          TotalDeaths : {{countryData.TotalDeaths}}
        </div>
        <div v-if="countryData.NewDeaths != ''">
          NewDeaths : {{countryData.NewDeaths}}
        </div>
        <div v-if="countryData.TotalRecovered != ''">
          TotalRecovered : {{countryData.TotalRecovered}}
        </div>
        <div v-if="countryData.ActiveCases != ''">
          ActiveCases : {{countryData.ActiveCases}}
        </div>
        </b-card>
        </b-col>
        </b-row>
      </main>
      <main v-else><b-spinner variant="primary" class="spin" label="Spinning"></b-spinner></main>
      <!-- <img class="corona-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/2019-nCoV-CDC-23312_without_background.png/220px-2019-nCoV-CDC-23312_without_background.png" alt="corona"> -->
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import countTo from 'vue-count-to';
import {getName} from 'country-list';
import Bar from './components/Chart/Bar';
import Doughnut from './components/Chart/Doughnut';



export default {
  name: 'App',
  data() {
      return {
        loaded:false,
        details:{},
        items: [],
        country:'China',
        countries:["Afghanistan","Albania","Algeria","Andorra","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bhutan","Bolivia","Bosnia and Herzegovina","Brazil","Brunei","Bulgaria","Burkina Faso","Cambodia","Cameroon","Canada","Cayman Islands","Channel Islands","Chile","China","Colombia","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Diamond Princess","Dominican Republic","DRC","Ecuador","Egypt","Estonia","Ethiopia","Faeroe Islands","Finland","France","French Guiana","French Polynesia","Gabon","Georgia","Germany","Ghana","Gibraltar","Greece","Guadeloupe","Guinea","Guyana","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia","Lebanon","Liechtenstein","Lithuania","Luxembourg","Macao","Malaysia","Maldives","Malta","Martinique","Mexico","Moldova","Monaco","Mongolia","Morocco","Nepal","Netherlands","New Zealand","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palestine","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Réunion","Romania","Russia","S. Korea","Saint Martin","San Marino","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","South Africa","Spain","Sri Lanka","St. Barth","St. Vincent Grenadines","Sudan","Sweden","Switzerland","Taiwan","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","UAE","UK","Ukraine","USA","Vatican City","Vietnam"],
        countryData:[], 
        apiurl:window.location.hostname==="localhost"? 'http://localhost:5000/api/corona' : 'https://corona-tracker-api.herokuapp.com/api/corona'
      }
  },
  created() {
    this.getData();
    this.location();
  },
  components: {
    countTo,
    Bar,
    Doughnut
  },
  computed: {
    doughnutStyle () {
      return {
        height: `200px`,
        width: `200px`,
        // position: 'relative'
      }
    },
    barStyle () {
      return {
        height: `280px`,
        // width: `200px`,
        // position: 'relative'
      }
    }
  },
  watch: {
    country: function() {
      this.getCountryData();
    }
  },
  methods: {
    async getData() {
      const {data} = await axios.get(this.apiurl);
      this.details=data;
      const {data:details} = await axios.get(`${this.apiurl}/top`);
      this.items=details;
      const {data:country} = await axios.get(`${this.apiurl}/${this.country}`);
      this.countryData=country;
      this.loaded=true;
    },
    async getCountryData() {
      const {data:country} = await axios.get(`${this.apiurl}/${this.country}`);
      this.countryData=country;
    },
    async location() {
      const {data} = await axios.get(`https://ipinfo.io?token=adasdasda`);
      this.country=getName(data.country);
    }
  }
}
</script>

<style>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

#app {
  height:100vh;
  max-height:100vh;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height:10vh;
}
.corona-image {
  position: absolute;
  top:30%;
  left:3%;
  z-index: -1;
  opacity: 0.7;
}
.spin {
  position:absolute;
  top:48%;
  left:48%;
}
.full-height {
  height:100%;
}
@media screen and (max-width: 700px) {
  *{
    font-size:1em;
  }
}

</style>
