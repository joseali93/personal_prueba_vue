<template>
  <b-container fluid>
        <b-row>
            <b-col>
                <b-form-select v-model="selectedCL" class="mb-3" :options="clientes.nombre" >
                        <!-- this slot appears above the options from 'options' prop -->
                        <option disabled selected value>-- Por favor seleccione un Cliente --</option>
                        <option v-for="(data,indice) in clientes" :value="data">{{data.nombre}}</option>
                </b-form-select>
            </b-col>
            <b-col>
                <b-form-select v-model="selectedCC" class="mb-3" @click.native="SelectCC(selectedCL)">
                        <!-- this slot appears above the options from 'options' prop -->
                        <option disabled selected value>-- Por favor seleccione un Centro de Costo --</option>
                        <option v-for="(data,indice) in centros" :value="data" >{{data.nombre}}</option>
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
                        <b-form-input v-model="filter" placeholder="Type to Search" />
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
            <b-btn  to="/inicio/consultar/resultado"class="mt-3 float-right" variant="primary" v-on:click="consultar()">Consultar</b-btn>
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

export default {
    components: { DatePicker },
    data() {
        return {
            consulta: [],
            estados:[
                {nombre: 'Activo'},
                {nombre: 'Inactivo'}
            ],
            selected_state: '',
            time1: "",
            selectedCL: '',
            clientes: '',
            selectedCC: '',
            centros: '',
            filter: ''
        };
    },
    methods:{
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
                cliente=this.selectedCL._id
                }   
            if(this.selectedCC===''){
                centrocosto="null"
                }   
                else{
                centrocosto=this.selectedCC._id
                }     
            this.axios.get(urlservicios+"/ObtenerOrdenesFiltrado/"+this.filter+"/"+this.selected_state+"/"+cliente+"/"+centrocosto+"")
            .then((response) => {
                this.consulta=response.data
                console.log("consilta"+this.consulta)
                if(this.consulta==''){
                    swal(
                        'Oops...',
                        'No se encontro ninguna Orden!',
                        'error'
                        )
                }
            })
        },
        SelectCC: function(selectedCL){
            console.log("entramos a seleccionar cc")
            this.axios.get(urlservicios+"/centros/")
            .then((response) => {
                this.centros=response.data
                //console.log(this.centros)

            })
            }
    },

    mounted: function () {
        console.log("montado")
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        //console.log(infologin.id_OperadorLogistico)
    
        this.axios.get(urlservicios+"/clientes/")
        .then((response) => {
            this.clientes=response.data
            //console.log(this.clientes)
        })
                
    },
};
</script>

<style>

</style>
