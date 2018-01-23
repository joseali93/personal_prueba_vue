<template>
    <b-container class="prueba" >
        <header  class="content-heading text-capitalize text-center">
          <h2>Generacion Orden de Servicio</h2>
          <small></small>
        </header>
        
        <b-card class="cards">
        <header slot="header" class="content-heading ">
            <h3>INFORMACION DE RECOGIDA</h3>
                <small>Se visualiza la seleccion de cliente y centro de costo</small>
        </header>
            <b-row>
                <b-col>
                    <h3>Seleccione el Cliente</h3>
                    <b-form-select v-model="selected_client" class="mb-3"  
                    :options="clientes" text-field="nombre" value-field="_id" @change.native="ClientesSelect" >  
                    </b-form-select>
                </b-col>
                <b-col>
                    <h3>Seleccione el Centro de Costos</h3>
                    <preload v-if="load"></preload>
                    <b-form-select v-model="selected_center" class="mb-3"
                    :options="centros" text-field="nombre" value-field="_id" @change.native="centrosseleccionado" :disabled="habilitar" v-else >
                    </b-form-select>
                </b-col>
            </b-row>

        </b-card>
        <b-card class="cards">
                <b-row>
                    <b-col>
                    <b-form-group id="exampleInputGroup1"
                        label="Direccion: ">
                            <b-form-input id="direccion"
                                size="lg"
                                type="text"
                                v-model="selected_centro.direccion"
                                required
                                placeholder="Direccion">
                            </b-form-input>
                    </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
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
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
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
                    </b-col>
                </b-row>
        </b-card>
                <b-card-footer>
                <b-row>
                    <a  v-on:click="actualizar"> 
                        <b-btn v-on:click="actualizar" variant="primary">
                            
                            Continuar
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </b-btn>
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
        
        selected_client: null,
        selected_center: null,
        selected_cliente: {},
        selected_centro:{},
        clientes: {},
        centros:{},
        load: false,
        habilitar: true
        }    
    },
   
    methods: {
        centrosseleccionado(seleccion){
            console.log("entro a select centro");
            console.log(seleccion);
            console.log(this.centros);
             for(var i=0;i<this.centros.length;i++){
                if(this.centros[i]._id==seleccion.target.value){
                    this.selected_centro=this.centros[i]
                }
            }
        },
        ClientesSelect(seleccion){
            console.log(seleccion.target.value);
            console.log("antro a selecion de clientes")
                        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Centro de Costo' };

            for(var i=0;i<this.clientes.length;i++){
                if(this.clientes[i]._id==seleccion.target.value){
                    this.selected_cliente=this.clientes[i]
                }
            }
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
            //this.load = true;
                if(seleccion!==undefined){

                this.axios.get(urlservicios+"CentrosPorCliente/"+seleccion.target.value)
                    .then((response) => {
                        this.centros=response.data
                        this.centros.unshift(vacio)

                        this.habilitar= false
                        //this.load=false
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load 
                            })
                            }, )
                    })
                }


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
               
            }
            var selected_client= this.selected_client
            var selected_center= this.selected_center
            var seleccionados = {
                selected_client:selected_client,
                selected_center:selected_center
            };
            var selecciones={
                idcliente:selected_client,
                idcentro:selected_center,
                infocliente:this.selected_cliente,
                infocentro:this.selected_centro,
            }
        console.log(selecciones);
            bus.$emit('remitente',seleccionados)
            localStorage.setItem("orden",JSON.stringify(seleccionados))
            localStorage.setItem("infoorden",JSON.stringify(selecciones))
            this.$router.replace('/inicio/ordenservicio')
        }
        },
    
        mounted: function () {
        var orden=localStorage.getItem("orden");
        var ordenjson=JSON.parse(orden)
        console.log(orden);
        if(orden==null||orden=='null'||orden=='')
        {
            console.log("entro primera vez");
        }
        else
        {
            console.log("ya tiene algo seleccionado");
            this.selected_client=ordenjson.selected_client
            this.selected_center=ordenjson.selected_center
            this.axios.get(urlservicios+"CentrosPorCliente/"+this.selected_client)
                    .then((response) => {
                        this.centros=response.data
                        this.habilitar= false
                        //this.load=false
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load 
                            })
                            }, )
                    })
            var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico)
            .then((response) => {
                this.clientes=response.data
                for(var i=0;i<this.clientes.length;i++){
                if(this.clientes[i]._id==this.selected_client){
                    this.selected_cliente=this.clientes[i]
                }
            }
            })
            
        }
    },
    beforeCreate: function () {
        console.log("antes");
                var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Cliente' };

        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico)
        .then((response) => {
            this.clientes=response.data
                        this.clientes.unshift(vacio)

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
