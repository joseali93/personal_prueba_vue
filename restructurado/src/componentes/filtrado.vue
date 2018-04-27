<template>
    <b-container fluid class="contenedorTotal">
        <div>
            <b-breadcrumb :items="items" />
        </div>
               
        <b-container fluid>
             
                <header class="content-heading" slot="header">
                <h3>Consultar Ordenes de Servicio</h3>
                    
                </header>
                <b-card class="cards" v-show="ocultar">
                <!--
                <header class="content-heading" slot="header">
                    <h3>Consultar Ordenes de Servicio</h3>
                        
                </header>
                -->
                <b-row>
                    <b-col>
                        <b-form-group 
                        class="text-primary"
                            label="Clientes">
                        <!--    
                        <b-form-select v-model="selectedCL" class="mb-3" :options="clientes"  
                        text-field="nombre" value-field="_id" @change.native="SelectCC"
                        :disabled="disabled_selectedCL">                        
                        </b-form-select>
                        -->
                         <v-select v-model="selectedCL" label="nombre" placeholder="Seleccione el Cliente"
                      :options="clientes" @input="seleccionCliente()"
                      :disabled="disabled_selectedCL"></v-select>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group 
                        class="text-primary"
                            label="Centros de Costo">
                            <!--
                            <b-form-select v-model="selectedCC" class="mb-3" :options="centros" 
                            text-field="nombre" value-field="_id" :disabled="habilitar">
                            
                            </b-form-select>
                            -->
                            <v-select v-model="selectedCC" label="nombre" placeholder="Seleccione el Cliente"
                      :options="centros" 
                      :disabled="habilitar"></v-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group 
                        class="text-primary" label="Rango de Fechas" >
                        <date-picker width=400  v-model="time1" range lang="es" 
                        :shortcuts="shortcuts" :confirm="true"
                        ></date-picker>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" class="my-1">
                        <b-form-group 
                        class="text-primary"
                         label="Orden de Servicio" >
                            <b-input-group>
                                <b-form-input v-model="filter" type="number" @keyup="numeros(this)" placeholder="Digite numero Orden de Servicio" />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                    </b-col>
                </b-row>
                <b-row>
                
                    <b-col>
                        <b-form-group  label="Estados" class="text-primary">
                            <b-input-group>
                                <!--
                                <b-form-select  v-model="selected_state" :options="estados" text-field="nombre"
                                value-field="nombre" @change.native="selestado">
                                </b-form-select>
                                -->
                                <v-select v-model="selected_state" label="nombre" placeholder="Seleccione un Estado"
                                :options="estados"
                                ></v-select>
                                
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>    
                <b-row>
                    <b-col  md="6">
                    <b-btn class="my-1 rounded"  variant="primary" exact-active-class v-on:click="consultar()">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        Consultar</b-btn>
                    </b-col>
                </b-row>
            </b-card>
            <b-card id="jose" class="cards2"  v-show="sel_conslta">
                <router-view :consulta="consulta" :peticion="peticion">

            </router-view>
            </b-card>
        </b-container>
        
        </b-container>
</template>

<script>
import DatePicker from "vue2-datepicker";
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
import moment from 'moment'

export default {

      components :{
    Preload,
    DatePicker
  },
  
    data() {
        return {
            sel_conslta: false,
            items : [
            {
                text: "Inicio",
                to: "/inicio"
            },
            {
                text: "Consultar Ordenes de Servicio",
                href: "#"
            }
            ],
                peticion:'',
             shortcuts: [
                {
                text: 'Hoy',
                start: new Date(),
                end: new Date()
                },
                {
                text: 'Semana',
                start: new Date(),
                end: new Date()
                },
                {
                text: 'Mes',
                start: new Date(),
                end: new Date()
                },
            ],
            disabled_selectedCL: false,
            ocultar: true,
            /*
            items: [{
                text: 'Consultar Ordenes de Servicio',
                active: true
            }],
            */
            habilitar: true,
            load: false,
            consulta: [],
            estados: [],
            selected_state: null,
            time1: [
               
            ],
            selectedCL: null,
            clientes: [],
            selectedCC: null,
            centros: [],
            filter: ''
        };
    },
    methods:{
        seleccionCliente(){
            console.log("entro a sleccion cliente");
            console.log(this.selectedCL);
            if(this.selectedCL!=null){
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load 
                    })
                    }, )
                this.axios.get(urlservicios+"CentrosPorCliente/"+this.selectedCL._id)            
                    //this.axios.get(urlservicios+"centros/")
                    .then((response) => {
                        this.centros=response.data
                    
                    //this.load=false
                    var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                    this.habilitar= false
                    })
            }
            else{
                this.habilitar= true
            }
            
            
        },
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
            
            this.sel_conslta=true
            console.log();
            ///ObtenerOrdenesFiltrado/:consecutivo/:estado/:id_remitente/:id_centro/:fecha_inicio/:fecha_final
            var cliente
            var centrocosto
            var inicio
            var fin
            var esadoconsulta
            //console.log(this.selectedCL);
            //console.log(this.selected_state);
            //console.log(this.time1);
             var fecha=new Date();
            var _this=this
            var d =new Date()
            var year = d.getFullYear()
            var month = d.getMonth()
            var day = d.getDate()
            var ant = new Date()
            var monthante = ant.getMonth()-1
            var dayante =ant.getDate()
            d.setFullYear(year,month,day)
            ant.setFullYear(year,monthante,dayante)
        
            var mana=new Date(fecha.getTime() + 24*60*60*1000);
            var fechainicial= moment(this.time1[0])
            var finalfinal= moment(this.time1[1])
           
            var cantidaddias=finalfinal.diff(fechainicial, 'days')
            /*
            console.log(mana);
            console.log(ant);
            console.log(cantidaddias);
            console.log(this.time1);
            */
            if(cantidaddias>32||this.time1=='')
            {
                //console.log("tiempo mayor de 30 dias");
                if(cantidaddias>32){
                    swal(
                    'Advertencia',
                    'Solo puede seleccionarse maximo 30 días',
                    'warning'
                    )
                }
                else{
                    if(this.time1==''||this.time1===''||this.time1===undefined){
                        this.time1=[]
                        this.time1[0]=mana
                        this.time1[1]=ant
                    }
                    if(this.time1[0]===''||this.time1[0]===undefined){
                    inicio=ant
                    }
                    else{
                            inicio=this.time1[0]
                    }
                    if(this.time1[1]===''||this.time1[1]===undefined){
                        fin=mana
                    }
                    else{
                            fin=this.time1[1]
                        }
                    if(this.filter===''){
                        this.filter="null"
                        }
                    if(this.selected_state===''|| this.selected_state==null){
                        //this.selected_state="null"
                        //queda pendiente de juan
                        esadoconsulta='null'
                        }
                        else{
                            esadoconsulta=this.selected_state.nombre
                        }
                    if(this.selectedCL===''||this.selectedCL===null){
                        cliente="null"
                        }
                        else{
                        cliente=this.selectedCL._id
                        }   
                    if(this.selectedCC===''||this.selectedCC===null){
                        centrocosto="null"
                        }   
                        else{
                        centrocosto=this.selectedCC._id
                        }   
                        console.log(this.time1);
                        
                    var login = localStorage.getItem("storedData");
                    var infologin =JSON.parse(login);  
                    var load=true
                        setTimeout(() => {
                            bus.$emit('load', {
                                load 
                            })
                            }, )
                
                    this.axios.get(urlservicios+"ObtenerOrdenesFiltrado/"+infologin.id_OperadorLogistico._id+"/"+this.filter+"/"+esadoconsulta+
                    "/"+cliente+"/"+centrocosto+"/"+inicio+"/"+fin)
                    .then((response) => {
                        this.consulta=response.data
                        if(this.consulta==''){
                            var load=false
                            setTimeout(() => {
                                bus.$emit('load', {
                                    load
                                })
                                }, )
                            swal(
                                'Oops...',
                                'No se encontro ninguna Orden!',
                                'error'
                                )
                                
                        }
                        else{
                            console.log(this.consulta);
                            var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                                this.$router.replace('/inicio/consultar/resultado')
                        }
                    })
                    
                }
               
               
            }
            else{
                console.log("hago peticion");
                if(this.time1[0]===''||this.time1[0]===undefined){
                inicio=ant
                }
                else{
                        inicio=this.time1[0]
                }
                if(this.time1[1]===''||this.time1[1]===undefined){
                    fin=mana
                }
                else{
                        fin=this.time1[1]
                    }
                if(this.filter===''){
                    this.filter="null"
                    }
                if(this.selected_state===''|| this.selected_state==null){
                    //this.selected_state="null"
                    //queda pendiente de juan
                    esadoconsulta='null'
                    }
                    else{
                        esadoconsulta=this.selected_state.nombre
                    }
                if(this.selectedCL===''||this.selectedCL===null){
                    cliente="null"
                    }
                    else{
                    cliente=this.selectedCL._id
                    }   
                if(this.selectedCC===''||this.selectedCC===null){
                    centrocosto="null"
                    }   
                    else{
                    centrocosto=this.selectedCC._id
                    }   
                    console.log(this.time1);
                    
                var login = localStorage.getItem("storedData");
                var infologin =JSON.parse(login);  
                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                        }, )
            
                this.axios.get(urlservicios+"ObtenerOrdenesFiltrado/"+infologin.id_OperadorLogistico._id+"/"+this.filter+"/"+esadoconsulta+
                "/"+cliente+"/"+centrocosto+"/"+inicio+"/"+fin)
                .then((response) => {
                    this.consulta=response.data
                    if(this.consulta==''){
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                        swal(
                            'Oops...',
                            'No se encontro ninguna Orden!',
                            'error'
                            )
                            
                    }
                    else{
                        console.log(this.consulta);
                        var load=false
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                            this.$router.replace('/inicio/consultar/resultado')
                    }
                })
                
            }
            
        },
        SelectCC(value){
            var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Centro de Costo' };
            if(this.disabled_selectedCL==true)
            {
                this.selectedCL=value
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load 
                    })
                    }, )
                this.axios.get(urlservicios+"CentrosPorCliente/"+this.selectedCL)            
                //this.axios.get(urlservicios+"centros/")
                .then((response) => {
                    this.centros=response.data
                    //this.centros.unshift(vacio)
                //this.load=false
                var load=false
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                this.habilitar= false
                })
            }else{
                this.selectedCL=value.target.value
                  //this.load = true;
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load 
                    })
                    }, )
                this.axios.get(urlservicios+"CentrosPorCliente/"+value.target.value)            
                //this.axios.get(urlservicios+"centros/")
                .then((response) => {
                    this.centros=response.data
                    //this.centros.unshift(vacio)
                //this.load=false
                var load=false
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                this.habilitar= false
                })
            }
            


        }
        
    },
    updated: function () {
        bus.$on('ocultar', function (userObject) {
        
        this.ocultar = userObject.ocultar
      }.bind(this))
    },
    mounted: function () {
        var fecha=new Date();
        var _this=this
        var d =new Date()
        var year = d.getFullYear()
        var month = d.getMonth()
        var day = d.getDate()
        var ant = new Date()
        var monthante = ant.getMonth()-1
        var dayante =ant.getDate()
        d.setFullYear(year,month,day)
        ant.setFullYear(year,monthante,dayante)
       
       var mana=new Date(fecha.getTime() + 24*60*60*1000);
       
       
        var HaceUnaSemana=new Date(fecha.getTime() - (24*60*60*1000)*7);
        var HaceUnaSemanaDia = HaceUnaSemana.getDate()
        var HaceUnaSemanaMes = HaceUnaSemana.getMonth()
        var HaceUnaSemanaYear = HaceUnaSemana.getFullYear()
        HaceUnaSemana.setFullYear(HaceUnaSemanaYear,HaceUnaSemanaMes,HaceUnaSemanaDia)
        for(var p=0;p<this.shortcuts.length;p++){
            if(p==1)
            {
                this.shortcuts[p].start=HaceUnaSemana
                this.shortcuts[p].end=d
            }
            if(p==2)
            {
                this.shortcuts[p].start=ant
                this.shortcuts[p].end=d
            }
        }
        //this.shortcuts[3].start=ant
        //this.shortcuts[3].end=d
        
        this.time1[1]= mana
        this.time1[0] =ant
        var concatday
        var bandera=true
         
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Cliente' };
        var vacio2= { nombre: 'Por Favor Seleccione un Cliente' };
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        //console.log(infologin.id_cliente);
        var id_cliente
        if(infologin.id_cliente==undefined||infologin.id_cliente==null){
            console.log("no hay cliente");
            id_cliente='null'
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
            this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico._id
            +'/null')
            .then((response) => {
                var load=false
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
                this.clientes=response.data

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
        }else{
            console.log("hay cliente");
            id_cliente=infologin.id_cliente
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
            }, )
            this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico._id
            +'/'+id_cliente)
            .then((response) => {
                console.log("_----------------");
                console.log(response.data);
                this.clientes=response.data
                this.selectedCL=Object.assign({},this.clientes[0])
                //this.clientes.unshift(vacio)

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
            this.disabled_selectedCL=true
            //this.SelectCC(id_cliente)
        }
            
        this.axios.get(urlservicios+"estados/")
        .then((response) => {
            this.estados=response.data
             //var vacio3=  { nombre: 'Por Favor Seleccione un Estado' ,disabled:true};
             //this.selected_state='Por Favor Seleccione un Estado'
             //this.estados.unshift(vacio3)
            //console.log(this.estados);
        })
            
        
    },
}
</script>

<style>
.contenedorTotal {
    padding-top: 0px;
    padding-right: 0%;
    padding-bottom: 0px;
    padding-left: 0%;
    background-color: #f8f8ff;
}
.cards2 {
box-shadow: 1px 5px 7px 5px rgba(0,0,0,0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */
    margin-top: 15px;

  border-left-width:0px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 39px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;
}
.contenedor {
  padding-top: 0px;
  padding-right: 2%;
  padding-bottom: 0px;
  padding-left: 4%;
  background-color: #f8f8ff;
}
.cards{
    /*
    margin-top: 2%;
    border-top-width: 3px;
    border-color: gray
    */
    box-shadow: 1px 5px 7px 5px rgba(0,0,0,0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */

  border-left-width:px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 30px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;

  
}
.car{
    border: 1px solid transparent;
    border-color: #c4c4c4
}
</style>
