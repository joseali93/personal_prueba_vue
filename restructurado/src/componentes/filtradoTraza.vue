<template>
    <b-container>
        <preload v-show="load"></preload>
        <b-card>
            <b-row>
                    <b-col>
                        <b-form-group 
                        label="Clientes">
                            <b-form-select v-model="selectedCL" id="clienteselect" v-bind:style="validatecampo" :options="clientes"  
                            text-field="nombre" value-field="_id" @change.native="SelectCC" required>
                                    <!-- this slot appears above the options from 'options' prop -->          
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group 
                        label="Centro de Costo">
                            <b-form-select v-model="selectedCC" id="costoselect"  v-bind:style="validatecampo" class="mb-3" :options="centros" 
                            text-field="nombre" value-field="_id" required :disabled="disable">
                            </b-form-select>
                        </b-form-group>
                    </b-col>
            </b-row>
        </b-card>
        <b-card class="car">
            <b-row>
                <b-col>
                    <b-form-group 
                        label="Por Favor seleccione como desea filtrar:"
                        label-size="lg">
                        <b-form-radio-group v-model="prueba"
                                        :options="options"
                                        name="radiosSm">
                        </b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-show="prueba=='first'">
                    <b-col>
                        <b-form-group label="Rango de Fechas" class="mb-3">
                            <date-picker disabled="true" id="fecha" width="430" v-model="time1" placeholder="Rango de Fechas" range lang="en"></date-picker>
                        </b-form-group>
                    </b-col>
            </b-row>
            <b-row v-show="prueba=='second'">
                    <b-col>
                        <b-form-group label="Orden de Servicio" class="mb-3">
                        <b-input-group>
                        <b-form-input v-model="orden" class="mb-3" type="number" id="orden" @input.native="ordenes"  placeholder="Orden de Servicio" />
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Referencia" class="mb-3">
                        <b-input-group>
                        <b-form-input v-model="referencia" class="mb-3" type="text" id="referencia" @input.native="referencias"  placeholder="Referencia" />
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="N° Movilizado" class="mb-3">
                        <b-input-group>
                        <b-form-input v-model="nmovilizado" class="mb-3" type="number" id="nmovilizado" @input.native="movilizado" placeholder="Num. Movilizado" />
                        </b-input-group>
                        </b-form-group>
                    </b-col>
            </b-row>
            <b-row>
                <b-button @click="consultar()">
                    Consultar
                </b-button>
            </b-row>
        </b-card>
        <b-card>
            <b-row>
                <router-view :consulta="consulta">
                </router-view>
            </b-row>
        </b-card>
    </b-container>
</template>

<script>
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
import DatePicker from "vue2-datepicker";

export default {
     components :{
    Preload,
    DatePicker
  },
data(){
    return {
        prueba: 'first',
        disable: true,
        load: false,
        orden: '',
        referencia:'',
        nmovilizado: '',    
        selectedCL: '',
        clientes: {},
        selectedCC: '',
        centros: {},
        time1: '',
        validatecampo: '',
        options: [
        { text: 'Rango de Fechas', value: 'first' },
        { text: 'orden', value: 'second' }
      ],
        consulta:{}
    }
},
methods:{
    consultar(){
        var selectCL = document.getElementById('clienteselect')
        var selectCC = document.getElementById('costoselect')


     if(this.selectedCL==''||this.selectedCC=='')
     {  
        this.validatecampo= {
            border: '2px solid red'
        }
        swal("Oops...", "Falto algun seleccionar Cliente o Centro de Costo", "error");
     }else{
        this.validatecampo=''
        console.log("hace peticion");
        console.log(this.selectedCL);
        console.log(this.selectedCC);
        console.log(this.orden);
        console.log(this.referencia);
        console.log(this.nmovilizado);
                    var login = localStorage.getItem("storedData");
            var infologin =JSON.parse(login);  
        this.axios.get(urlservicios+"/ObtenerOrdenesFiltrado/"+infologin.id_OperadorLogistico+"/null/null/null/null/null/null")
            .then((response) => {
                this.consulta=response.data
                if(this.consulta==''){
                    swal(
                        'Oops...',
                        'No se encontro ninguna Orden!',
                        'error'
                        )
                }
            })
        this.$router.replace('/inicio/trazabilidad/listado')
     }
    },
    SelectCC(value){
        console.log(value.target.value);
        this.selectedCL=value.target.value
        this.load = true;
        setTimeout(function(){
            console.log("entramos a seleccionar cc")
            this.axios.get(urlservicios+"CentrosPorCliente/"+value.target.value)            
            //this.axios.get(urlservicios+"centros/")
            .then((response) => {
            this.centros=response.data
            //console.log(this.centros)
            this.load=false
            this.disable= false
            })
        }.bind(this),2000)
    },
    ordenes(value){
        console.log("entro a ordenes");
        this.orden =value.target.value
        console.log(this.orden);
        var referencia = document.getElementById('referencia')
        var nummovilizado =document.getElementById('nmovilizado')

        if(this.orden==''){
        referencia.disabled= false
        nummovilizado.disabled=false     
        }else{
            referencia.disabled= true
            nummovilizado.disabled=true
            this.referencia=''
            this.nmovilizado='null'
        }
    },
    referencias(value){
        this.referencia= value.target.value
        var nummovilizado =document.getElementById('nmovilizado')
        var orden =document.getElementById('orden')
        if(this.referencia==''){
            orden.disabled=false
            nummovilizado.disabled=false   
        }else{
            orden.disabled=true
            nummovilizado.disabled=true
            this.orden='null'
            this.nmovilizado='null'
        }
    },
    movilizado(value){
        this.nmovilizado= value.target.value
        var orden =document.getElementById('orden')
        var referencia = document.getElementById('referencia')
        if(this.nmovilizado==''){
            orden.disabled=false
            referencia.disabled=false   
        }else{
            orden.disabled=true
            referencia.disabled=true
            this.orden='null'
            this.referencia=''
        }
    },
},
    mounted: function () {
        console.log("montado")
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        //console.log(infologin.id_OperadorLogistico)
    
        this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico)
        .then((response) => {
            this.clientes=response.data
            //console.log(this.clientes)
        })
                
    },
}
</script>

<style>
.borderF {
    border: 1px solid red;
}
.borderV {
    border: 1px solid white;
}

.car{
    border: 1px solid transparent;
    border-color: #c4c4c4
}
</style>
