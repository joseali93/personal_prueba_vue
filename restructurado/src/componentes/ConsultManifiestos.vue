<template>
  <b-container>
      <b-card v-show="ocultar">
          <header slot="header" class="content-heading">
                <h3>Consultar Manifiestos</h3>
                    <small>Se permite la busqueda de Manifiestos seleccionando los siguientes filtros </small>
            </header>
            <b-row>
                <b-col>
                    <b-btn class="float-right" variant="success" @click="limpiar">
                        <i class="fa fa-eraser"></i>
                        
                    </b-btn>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Numero de Manifiesto" class="mb-3">
                        <b-form-input v-model="nmanifiesto"
                        :state="nmanifiestoestado"
                        type="number"
                        placeholder="Ingrese el numero de Manifiesto"
                        v-on:keyup.enter.native="consultar()"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Seleccione un Proceso Logistico" class="mb-3">
                        <b-form-select v-model="procelogistica"  text-field="nombre" 
                        :state="procelogisticaestado" value-field="_id" 
                        :options="procesosLog" class="mb-3" @input="procesoseleccionado">
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                
                        <b-form-group label="Rango de Fechas" class="mb-3">
                            <date-picker disabled="true" id="fecha" width="500" v-model="time1" placeholder="Rango de Fechas" range lang="en"></date-picker>
                        </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-btn variant="success" class="float-right" @click="consultar()">
                        <i class="fa fa-search " aria-hidden="true"></i>
                        Consultar
                    </b-btn>
                </b-col>
            </b-row>
      </b-card>
          <router-view :consulta="consulta"></router-view>
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
        return{
            ocultar:true,
            consulta:[],
            nmanifiestoestado:null,
            nmanifiesto:'',
            procelogistica:null,
            procelogisticaestado:null,
            procesosLog:[],
            time1:'',

        }
    },
    methods:{
        consultar(){
            var nmanifiesto
            var idproce
            var fecha=[]
            console.log("entro a consultar");
            if(this.nmanifiesto==''&&
            this.time1==''&&
            this.procelogistica==null){
                console.log("todo va vacio");
                swal(
                'Error!',
                'Debe Seleccionar al menos un filtro',
                'error'
                )

            }
            else{
                if(this.nmanifiesto==''){
                    nmanifiesto='null'
                }
                else{
                    nmanifiesto=this.nmanifiesto
                }
                if(this.time1==''){
                    fecha[0]='null'
                    fecha[1]='null'
                }
                else{
                    fecha[0]=this.time1[0]
                    fecha[1]=this.time1[1]
                }
                if(this.procelogistica==null)
                {
                    idproce='null'
                }
                else{
                    idproce=this.procelogistica
                }
                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                        }, )
                //console.log(urlservicios+"ConsultaManifiestos/"+nmanifiesto+'/'+idproce+'/'+fecha[0]+'/'+fecha[1]);
                this.axios.get(urlservicios+"ConsultaManifiestos/"+nmanifiesto+'/'+idproce+'/'+fecha[0]+'/'+fecha[1])
                        .then((response) => {
                            
                             var load=false
                            setTimeout(() => {
                                bus.$emit('load', {
                                    load
                                })
                                }, )
                            console.log(response);
                            this.consulta=response.data
                            if(this.consulta==''){
                                console.log("no llega nada");
                            }else{
                                this.$router.replace('/inicio/manifiestos/resultado')
                            }
                        })
                
            }
            
            
        },
        limpiar(){
            console.log("entro a limpiar");
            this.nmanifiesto=''
            this.procelogistica=null
            this.time1=''
            this.$router.replace('/inicio/manifiestos')

        },
        procesoseleccionado(value){
            console.log("entro");
            console.log(value);
        }
    },
    updated: function () {
        bus.$on('ocultar', function (userObject) {
        if(userObject.ocultar==undefined){
            this.ocultar = true
        }else{
            this.ocultar = userObject.ocultar
        }
      }.bind(this))
    },
    beforeCreate: function() {
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Proceso logistico' };
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
        this.axios
        .get(
            urlservicios+"Procesos/" +
            infologin.id_OperadorLogistico
        )
        .then(response => {
            var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
            this.procesosLog = response.data;
            this.procesosLog.unshift(vacio)
            console.log(this.procesosLog);

        }).catch(function(error){
                    bandera=false
                    var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
                    //onsole.log(JSON.stringify(error));
                    //this.$router.replace('/inicio')
                    if(bandera==false){
                        swal({
                        title: 'No hay Internet',
                        text: "Revise su conexion",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok, Entiendo'
                        }).then((result) => {
                        if (result.value) {
                            
                            swal(
                            'Se Redireccionara a la pagina de inicio',
                            'Buen Rato',
                            'warning'
                            )
                            _this.$router.replace('/inicio')
                        }
                        })
                        
                    }
            })
        
    }

}
</script>

<style>
 .center-button {
        display: block;
        margin: auto;
    }
</style>
