<template>
  <b-container fluid>
      <preload v-show="load"></preload>
        <b-row>
            <b-col>
                <b-form-select v-model="selectedCL" class="mb-3" :options="clientes"  
                text-field="nombre" value-field="_id" @change.native="SelectCC">
                        <!-- this slot appears above the options from 'options' prop -->
                        
                </b-form-select>
            </b-col>
            <b-col>
                <b-form-select v-model="selectedCC" class="mb-3" :options="centros" 
                text-field="nombre" value-field="_id">
                        <!-- this slot appears above the options from 'options' prop -->
                </b-form-select>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                 <date-picker width=450  v-model="time1" range lang="en"></date-picker>
            </b-col>
            <b-col>
               
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" class="my-1">
                <b-form-group horizontal label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" type="number" @keyup="numeros(this)" placeholder="Type to Search" />
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col md="6" class="my-1">
                <b-form-group horizontal label="Sort" class="mb-0">
                    <b-input-group>
                        <b-form-select  v-model="selected_state">
                        <option disabled selected value>--  --</option>
                            <option  v-for="(data,indice) in estados" :value="data.nombre">{{data.nombre}}</option>
                        </b-form-select>
                        <b-input-group-button>
                        </b-input-group-button>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-btn to="/inicio/consultar/resultado"  class="mt-3 float-right" variant="primary" v-on:click="consultar()">Consultar</b-btn>
        </b-row>
        <b-row>
            <router-view :consulta="consulta">

            </router-view>
            
        </b-row>
    </b-container>
</template>

<script>
import DatePicker from "vue2-datepicker";
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'

export default {
    components: { DatePicker },
      components :{
    Preload
  },
    data() {
        return {
            habilitar: true,
            load: false,
            consulta: [],
            estados:[
                {nombre: 'Activo'},
                {nombre: 'Inactivo'}
            ],
            selected_state: '',
            time1: "",
            selectedCL: '',
            clientes: {},
            selectedCC: '',
            centros: {},
            filter: ''
        };
    },
    methods:{
        numeros(valor) {
        //console.log("entro a numeros");
        //console.log(document.getElementById("telefono").value)
        var a = document.getElementById("telefono").value;
        //var x=check.which;
        //var x = a.charCode;
        var x = a.keyCode;
        if (!(a >= 48 || a <= 57)) {
            swal("Oops...", "Solo deben ser numeros :)!", "error");
            return (document.getElementById("telefono").value = "");
        } else if (a.length >= 9) {
            // if no is more then the value
            swal("Oops...", "Maximo 10 digitos!", "error");
            return (document.getElementById("telefono").value = "");
        }
        },
        detalles(indice){
            console.log("entro a detalles")
            console.log(this.consulta[indice]);
            bus.$emit('actualizar',indice)
        },
        consultar: function(){
            ///ObtenerOrdenesFiltrado/:consecutivo/:estado/:id_remitente/:id_centro
            var cliente
            var centrocosto
            if(this.filter===''){
                this.filter="null"
                }
            if(this.selected_state===''){
                this.selected_state="null"
                }
            if(this.selectedCL===''){
                cliente="null"
                }
                else{
                cliente=this.selectedCL
                }   
            if(this.selectedCC===''){
                centrocosto="null"
                }   
                else{
                centrocosto=this.selectedCC
                }     
            this.axios.get(urlservicios+"/ObtenerOrdenesFiltrado/"+this.filter+"/"+this.selected_state+"/"+cliente+"/"+centrocosto+"")
            .then((response) => {
                this.consulta=response.data
                //console.log(JSON.stringify(this.consulta))
                if(this.consulta==''){
                    swal(
                        'Oops...',
                        'No se encontro ninguna Orden!',
                        'error'
                        )
                }
            })
        },
        SelectCC(value){
            console.log(value.target.value);
            this.selectedCL=value.target.value
                  this.load = true;
      setTimeout(function(){
            console.log("entramos a seleccionar cc")
            //this.axios.get(urlservicios+"centros/"+value.target.value)            
            this.axios.get(urlservicios+"centros/")
            .then((response) => {
                this.centros=response.data
                //console.log(this.centros)
            this.load=false
            this.habilitar= false
            })
      }.bind(this),2000)


            }
        
    },

    mounted: function () {
        console.log("montado")
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        //console.log(infologin.id_OperadorLogistico)
    
        this.axios.get(urlservicios+"clientes/")
        .then((response) => {
            this.clientes=response.data
            console.log(this.clientes)
        })
                
    },
};
</script>

<style>

</style>
