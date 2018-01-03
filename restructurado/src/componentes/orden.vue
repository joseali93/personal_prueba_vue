<template>
    <b-container class="prueba">
        <header class="content-heading">
            <h3>INFORMACION RECOGIDA</h3>
                <small>Se visualiza la seleccion de cliente y centro de costo</small>
        </header>
        
        <b-card class="cards">
            <b-row>
                <h3>Seleccione el Cliente</h3>
                    <b-form-select v-model="selected_client" class="mb-3" 
                    :options="clientes" text-field="nombre" value-field="_id" @change.native="ClientesSelect" >  
                    </b-form-select>
            </b-row>
                
            <b-row>
                <h3>Seleccione el Centro de Costos</h3>
            <preload v-if="load"></preload>
            <b-form-select v-model="selected_center" class="mb-3"
            :options="centros" text-field="nombre" value-field="_id" :disabled="habilitar" v-else >
            </b-form-select>
            </b-row>
        </b-card>
        <b-card>
                <b-row>
                    <b-form-group id="exampleInputGroup1"
                        label="Direccion: ">
                            <b-form-input id="direccion"
                            size="lg"
                                type="text"
                                v-model="selected_cliente.direccion"
                                required
                                placeholder="Direccion">
                            </b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group id="exampleInputGroup2"
                        label="Contacto: ">
                            <b-form-input id="direccion"
                            size="lg"
                                type="text"
                                v-model="selected_cliente.nombre"
                                required
                                placeholder="Nombre">
                            </b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group id="exampleInputGroup3"
                        label="Telefono: " >
                            <b-form-input id="direccion"
                            size="lg"
                                type="text"
                                v-model="selected_cliente.telefono"
                                required
                                placeholder="Telefono">
                            </b-form-input>
                    </b-form-group>
                </b-row>
                            </b-card>
                <b-card-footer>
                <b-row>
                    <a  v-on:click="actualizar"> 
                        <b-btn v-on:click="actualizar">Continuar</b-btn>
                    </a>
                </b-row>
                </b-card-footer>
    </b-container>
</template>

<script>
import Orden from '../componentes/orden.vue'
import Preload from '../componentes/preload.vue'

import {bus} from '../main'
import {urlservicios} from '../main'

export default {
      components :{
          Preload
      },
    data () {

    return {
        selected_client: '',
        selected_center: '',
        selected_cliente: {},
        selected_centro:{},
        clientes: {},
        centros:{},
        load: false,
        habilitar: true
        }    
    },
   
    methods: {
        ClientesSelect(seleccion){
            console.log(seleccion.target.value);
            console.log("antro a selecion de clientes")
            for(var i=0;i<this.clientes.length;i++){
                if(this.clientes[i]._id==seleccion.target.value){
                    this.selected_cliente=this.clientes[i]
                }
            }
            this.load = true;
            setTimeout(function(){
                if(seleccion!==undefined){
                this.axios.get(urlservicios+"CentrosPorCliente/"+seleccion.target.value)
                    // this.axios.get("http://192.168.1.69:3000/logistica/centros/"+seleccion._id)
                    .then((response) => {
                        this.centros=response.data
                        this.habilitar= false
                        this.load=false
                    })
                }
            }.bind(this),1000)


        },
        actualizar: function(){
            console.log("entro a actualizar");
            if(this.selected_client==''||this.selected_center==''){
                swal(
                    'Oops...',
                    'Falto algun campo por completar!',
                    'error'
                )
            }else{
            var selected_client= this.selected_client
            var selected_center= this.selected_center
            var seleccionados = {
                selected_client:selected_client,
                selected_center:selected_center
            };
            bus.$emit('remitente',seleccionados)
            localStorage.setItem("orden",JSON.stringify(seleccionados))
            this.$router.replace('/inicio/ordenservicio')
        }
        }
    },
    beforeCreate: function () {
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico)
        //this.axios.get(urlservicios+"clientes/")
        .then((response) => {
            this.clientes=response.data
        })
        this.nombreusu;
        bus.$emit('remitente')
    }, 
}
</script>

<style>
.titulo{
    padding: 5%;
    border:  5px;
    border-color: black
    }
.cards{
    margin-top: 2%;
    border-top-width: 3px;
    border-color: gray
}
</style>
