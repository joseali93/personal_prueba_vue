<template>
    <b-container>
            <header class="content-heading">
                <h3>Consultar Ordenes de Servicio</h3>
                    <small>Se permite la busqueda por las diferentes opciones </small>
            </header>
        <preload v-show="load"></preload>
        <b-card class="car">
            <b-row>
                <b-col>
                    <b-form-group 
                        label="Clientes">
                    <b-form-select v-model="selectedCL" class="mb-3" :options="clientes"  
                    text-field="nombre" value-field="_id" @change.native="SelectCC">                        
                    </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group 
                        label="Centros de Costo">
                        <b-form-select v-model="selectedCC" class="mb-3" :options="centros" 
                        text-field="nombre" value-field="_id" :disabled="habilitar">
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Rango de Fechas" class="mb-3">
                    <date-picker width=450  v-model="time1" range lang="en"></date-picker>
                    </b-form-group>
                </b-col>
                <b-col>  
                </b-col>
                <b-col>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Orden de servicios" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" type="number" @keyup="numeros(this)" placeholder="Type to Search" />
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Estados" class="mb-0">
                        <b-input-group>
                            <b-form-select  v-model="selected_state" :options="estados" text-field="nombre" value-field="nombre" @change.native="selestado">
                                <!--
                            <option disabled selected value>--  --</option>
                                <option  v-for="(data,indice) in estados" :value="data.nombre">{{data.nombre}}</option>
                            -->
                            </b-form-select>
                            <b-input-group-button>
                            </b-input-group-button>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>    
            <b-row>
                <b-btn   variant="primary" exact-active-class v-on:click="consultar()">Consultar</b-btn>
            </b-row>
        </b-card>
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

      components :{
    Preload,
    DatePicker
  },
    data() {
        return {
            items: [{
                text: 'Consultar Ordenes de Servicio',
                active: true
            }],
            habilitar: true,
            load: false,
            consulta: [],
            estados: {},
            selected_state: '',
            time1: '',
            selectedCL: '',
            clientes: {},
            selectedCC: '',
            centros: {},
            filter: ''
        };
    },
    methods:{
        selestado(value){
            this.selected_state=value.target.value
        },
        numeros(valor) {
            var a = document.getElementById("telefono").value;
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

            bus.$emit('actualizar',indice)
        },
        consultar: function(){
            ///ObtenerOrdenesFiltrado/:consecutivo/:estado/:id_remitente/:id_centro/:fecha_inicio/:fecha_final
            var cliente
            var centrocosto
            var inicio
            var fin
            console.log(this.selected_state);
            if(this.time1[0]===''||this.time1[0]===undefined){
                inicio="null"
                }else{
                    inicio=this.time1[0]
                }
            if(this.time1[1]===''||this.time1[1]===undefined){
                fin="null"
                }else{
                    fin=this.time1[1]
                }
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
            var login = localStorage.getItem("storedData");
            var infologin =JSON.parse(login);  
            this.axios.get(urlservicios+"/ObtenerOrdenesFiltrado/"+infologin.id_OperadorLogistico+"/"+this.filter+"/"+this.selected_state+
            "/"+cliente+"/"+centrocosto+"/"+inicio+"/"+fin)
            .then((response) => {
                this.consulta=response.data
                if(this.consulta==''){
                    swal(
                        'Oops...',
                        'No se encontro ninguna Orden!',
                        'error'
                        )
                }
                else{
                           this.$router.replace('/inicio/consultar/resultado')
                }
            })
        },
        SelectCC(value){
            this.selectedCL=value.target.value
                  this.load = true;
            setTimeout(function(){
            this.axios.get(urlservicios+"CentrosPorCliente/"+value.target.value)            
            //this.axios.get(urlservicios+"centros/")
            .then((response) => {
                this.centros=response.data
            this.load=false
            this.habilitar= false
            })
             }.bind(this),2000)


            }
        
    },

    mounted: function () {
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
    
        this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico)
        .then((response) => {
            this.clientes=response.data
        })
            
        this.axios.get(urlservicios+"estados/")
        .then((response) => {
            this.estados=response.data
        })
                
    },
};
</script>

<style>
.cards{
    margin-top: 2%;
    border-top-width: 3px;
    border-color: gray
}
.car{
    border: 1px solid transparent;
    border-color: #c4c4c4
}
</style>
