<template>
<!-- SE PERMITE LA SELECCION DE LOS CLIENTE Y CENTRO DE COSTO QUE CORRESPONDA PARA LA REALIZACION 
DE LA ORDEN DE SERVICIO -->
    <b-container class="prueba" >
        <header  class="content-heading  text-center">
          <h2>Generación Orden de Servicio</h2>
          <small></small>
        </header>
        
        <b-card class="cards">
        <header slot="header" class="content-heading ">
            <h3>INFORMACIÓN DE RECOGIDA</h3>
                <small>Se visualiza la selección de cliente y centro de costo</small>
        </header>
            <b-row>
                <b-col>
                    <h3>Seleccione el Cliente</h3>
                    <b-form-select v-model="selected_client" class="mb-3"  
                    :options="clientes" text-field="nombre" value-field="_id" @change.native="ClientesSelect"
                    :disabled="disable_selected_client" >  
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
                    horizontal
                        label="Dirección: ">
                            <b-form-input id="direccion"
                                size="lg"
                                type="text"
                                v-model="selected_centro.direccion"
                                required
                                placeholder="Dirección"
                                maxlength="100">
                            </b-form-input>
                    </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                    <b-form-group id="exampleInputGroup2"
                    horizontal
                        label="Contacto: ">
                            <b-form-input id="direccion"
                                size="lg"
                                type="text"
                                v-model="selected_cliente.nombre"
                                required
                                placeholder="Nombre"
                                maxlength="100">
                            </b-form-input>
                    </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                    <b-form-group id="exampleInputGroup3"
                    horizontal
                        label="Teléfono: " >
                            <b-form-input id="telefono"
                            size="lg"
                                type="text"
                                v-model="selected_cliente.telefono"
                                required
                                placeholder="Teléfono"
                                maxlength="20">
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
/*
    POR MEDIO DE LA SELECCION DE UN SELECT SE COMPLETAN LOS CAMPOS FALTANTES
    LA DIRECCION LA DA EL CENTRO DE COSTO LUEGO DE SELECCIONADO
*/
import Orden from '../componentes/orden.vue'
import Preload from '../componentes/preload.vue'
import {bus} from '../main'
import {urlservicios} from '../main'
        import axios from 'axios'


export default {
      components :{
          Preload
      },
    data () {

    return {
        disable_selected_client: false,
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
            /*
                FUNCION DEL CUAL OBTENEMOS EL CENTRO QUE FUE SELECCIONADO SEGUN EL CLIENTE
            */
             for(var i=0;i<this.centros.length;i++){
                if(this.centros[i]._id==seleccion.target.value){
                    this.selected_centro=this.centros[i]
                }
            }
        },
        ClientesSelect(seleccion){
            /*
                FUNCION DEL CUAL OBTENEMOS EL CLIENTE QUE FUE SELECCIONADO 
            */
           console.log("entro a seleccion clientes");
           if(this.disable_selected_client==true){
               var id_cliente
               id_cliente=seleccion
               var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Centro de Costo' };
                for(var i=0;i<this.clientes.length;i++){
                    if(this.clientes[i]._id==id_cliente){
                        this.selected_cliente=this.clientes[i]
                    }
                }
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load 
                    })
                    }, )
                    if(seleccion!==undefined){

                    this.axios.get(urlservicios+"CentrosPorCliente/"+id_cliente)
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
           }
           else
           {
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
           }
            


        },
        actualizar: function(){
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
            /*
                SE CREA UN LOCALSTORAGE EL CUAL PERMITE LA OBTENER LO QUE FUE SELECCIONADO PREVIAMENTE
            */
            bus.$emit('remitente',seleccionados)
            localStorage.setItem("orden",JSON.stringify(seleccionados))
            localStorage.setItem("infoorden",JSON.stringify(selecciones))
            //console.log(selecciones);
            this.$router.replace('/inicio/ordenservicio')
        },

        },
    
        mounted: function () {
        var orden=localStorage.getItem("orden");
        var ordenjson=JSON.parse(orden)
        if(orden==null||orden=='null'||orden=='')
        {
        }
        else
        {
            this.selected_client=ordenjson.selected_client
            this.selected_center=ordenjson.selected_center
            this.axios.get(urlservicios+"CentrosPorCliente/"+this.selected_client)
                    .then((response) => {
                        this.centros=response.data
                        console.log(this.centros);
                        console.log(this.selected_center);
                        //this.selected_centro.direccion=this.centros.direccion
                        this.habilitar= false
                        for(var i=0;i<this.centros.length;i++){
                            if(this.centros[i]._id==this.selected_center){
                                this.selected_centro=this.centros[i]
                            }
                        }
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load 
                            })
                            }, )
                    })
            var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            console.log("errr");
            this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+this.selected_client)
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
    created: function(){
        var _this=this
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Cliente' };
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        //console.log(test.id_cliente);
        var id_cliente
        if(test.id_cliente==undefined||test.id_cliente==null){
            id_cliente='null'
            var bandera=true
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
                
                this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+id_cliente)
                .then((response) => {
                    //console.log(response);
                    this.clientes=response.data
                                this.clientes.unshift(vacio)
                                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
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
        else{
            console.log("tengo cliente");
            id_cliente=test.id_cliente
            //console.log(urlservicios+"clientesOperador/"+test.id_OperadorLogistico+'/'+id_cliente);
            this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+id_cliente)
                .then((response) => {
                    this.clientes=response.data
                    this.selected_cliente.nombre=this.clientes[0].nombre
                    this.selected_cliente.telefono=this.clientes[0].telefono
                                this.clientes.unshift(vacio)
                this.selected_client=id_cliente
                this.disable_selected_client=true
                this.ClientesSelect(id_cliente)
                

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
        
        
        this.nombreusu;
        bus.$emit('remitente')
    },
    beforeCreate: function () {
        
        
        
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
