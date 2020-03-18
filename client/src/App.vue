<template>
    <div id="app">
        <b-container>
            <header class="title my-2">
                <div class="d-flex flex-column position-relative">
                    <h2 class="mb-3">Corona Virus Tracker</h2>
                    <small class="creator"><a target="_blank" href="https://github.com/overlorddamygod">By Pratham Byanjankar</a></small>
                </div>
            </header>
            <main v-if="loaded">
                <!-- Details Cards -->
                <b-row class="my-3">
                    <b-col cols=4>
                        <div class="card text-white bg-secondary" style="max-width:20rem;">
                            <div class="card-header text-center">
                                <b-card-text>
                                    <countTo v-if="loaded" :startVal=0 :endVal='details.cases' :duration='1200'></countTo>
                                </b-card-text>
                                <h6 class="mob card-title">Cases</h6>
                                <h4 class="web card-title">Cases</h4>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols=4>
                        <div class="card text-white bg-secondary" style="max-width:20rem;">
                            <div class="card-header text-center">
                                <b-card-text>
                                    <countTo v-if="loaded" :startVal=0 :endVal='details.deaths' :duration='1200'></countTo>
                                </b-card-text>
                                <h6 class="mob card-title">Deaths</h6>
                                <h4 class="web card-title">Deaths</h4>
                            </div>
                        </div>
                    </b-col>

                    <b-col cols=4>
                        <div class="card text-white bg-secondary" style="max-width:20rem;">
                            <div class="card-header text-center">
                                <b-card-text>
                                    <countTo v-if="loaded" :startVal=0 :endVal='details.recovered' :duration='1200'></countTo>
                                </b-card-text>
                                <h6 class="mob card-title ">Recovered</h6>
                                <h4 class="web card-title">Recovered</h4>
                            </div>
                        </div>
                    </b-col>

                </b-row>
                <b-row class="my-4">
                    <!-- Top Infected Countries Section -->
                    <b-col lg=6 sm=12>

                        <bar :styles="barStyle" :details="details" :items="items" class="mb-3"></bar>
                        <b-table borderless	 responsive small hover striped  :items="items"></b-table>
                    </b-col>
                    <!-- Individual Country Section -->
                    <b-col lg=6 sm=12>
                        <doughnut class="mx-auto mb-3" :styles="doughnutStyle" :countryData="countryData"></doughnut>
                        <b-form-group id="input-group-3" label="Browse by country" label-for="input-3">

                            <b-form-select id="input-3" v-model="country" :options="countries" required></b-form-select>
                        </b-form-group>
                        <b-card>
                            <div v-if="countryData.Country != ''">
                                Country : {{countryData.Country}}
                            </div>
                            <div v-if="countryData.TotalCases != ''">
                                Total Cases : {{countryData.TotalCases}}
                            </div>
                            <div v-if="countryData.NewCases != ''">
                                New Cases : {{countryData.NewCases}}
                            </div>
                            <div v-if="countryData.TotalDeaths != ''">
                                Total Deaths : {{countryData.TotalDeaths}}
                            </div>
                            <div v-if="countryData.NewDeaths != ''">
                                New Deaths : {{countryData.NewDeaths}}
                            </div>
                            <div v-if="countryData.TotalRecovered != ''">
                                Total Recovered : {{countryData.TotalRecovered}}
                            </div>
                            <div v-if="countryData.ActiveCases != ''">
                                Active Cases : {{countryData.ActiveCases}}
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <div class="help">
                  <a target="_blank" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"><i class="fas fa-question fa-2x "></i></a>
                </div>
            </main>
            <!-- Spinner -->
            <main v-else>
                <b-spinner variant="primary" class="spin" label="Spinning"></b-spinner>
            </main>
        </b-container>
        <!-- Footer -->
        <footer v-if="loaded" class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center footer">
          Data Source<span class="mx-2">:</span><a target="_blank" href="https://www.worldometers.info/coronavirus/">Worldometers.info</a>
        </footer>
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
      }
    },
    barStyle () {
      return {
        height: `280px`,
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
.card-header {
  padding:1rem 0.6rem !important;
}
.help {
  position:fixed;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  right:4%;
  bottom:8%;
  border-radius: 30px;
  cursor:pointer;
  background: #444444;
  transition: all 0.5s ease-in;
}
.help a,.help a:hover {
  color:white;
}
.help:hover {
  transform: scale(1.1);
}
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

#app {
  height:100vh;
  max-height:100vh;
}
.mob {
  display: none;
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
.creator {
  position: absolute;
  bottom:0;
  right:0;
  font-size:0.8em;
}
.spin {
  position:absolute;
  top:48%;
  left:48%;
}
.full-height {
  height:100%;
}
.footer {
  padding:0.50rem !important;
}
@media screen and (max-width: 700px) {
  .mob {
    display:initial
  }
  .web,.help {
    display:none;
  }
}

</style>
