require('./assets/libs/style.default.css')
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import {rutas} from './rutas/rutas.js'  
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from "moment";
import VueMomentJS from "vue-momentjs";
 
Vue.use(VueMomentJS, moment); 

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)


const enrutador = new VueRouter({
  routes: rutas,
  mode: 'history'
})
//export var urlservicios = 'http://200.116.52.29:3000/logistica/';
//export var urlservicios = 'http://192.168.1.85:3000/logistica/';
//export var urlservicios = 'http://192.168.0.6:3000/logistica/';
export var urlservicios = 'http://localhost:3000/logistica/';


export var bus = new Vue();

new Vue({
  el: '#app',
  router: enrutador,  
  render: h => h(App)
})
