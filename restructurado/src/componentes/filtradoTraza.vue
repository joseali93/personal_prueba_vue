<template>
    <b-container fluid class="contenedorTotal">

        <div class="breadPersonalizado">
            <b-breadcrumb :items="items" />
        </div>
       
        
        <b-container fluid class="contenedorInterno">
            <header class="content-heading" slot="header">
                <h3>Consultar Trazabilidad</h3>                
            </header>
            <b-card class="cards" v-show="ocultartra">
               
                 <b-row>
                        <b-col>
                            <b-form-group 
                              class="text-primary"
                            label="Clientes">
                                <!--
                                <b-form-select v-model="selectedCL" id="clienteselect" v-bind:style="validatecampo" :options="clientes"  
                                text-field="nombre" value-field="_id" @change.native="SelectCC" required
                                :disabled="disabled_selectedCL" >
                                </b-form-select>
                                -->
                                <v-select v-model="selectedCL" label="nombre" 
                                v-bind:style="validatecampo"
                                :disabled="disabled_selectedCL"
                                placeholder="Seleccione el Cliente" id="clienteselect"
                                :options="clientes" @input="clienteSelec()"></v-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group 
                              class="text-primary"
                            label="Centro de Costo">
                                <!--
                                <b-form-select v-model="selectedCC" id="costoselect"  v-bind:style="validatecampo" class="mb-3" :options="centros" 
                                text-field="nombre" value-field="_id" required :disabled="disable">
                                </b-form-select>
                                -->
                                <v-select v-model="selectedCC" label="nombre" 
                                v-bind:style="validatecampo" :disabled="disable"
                                placeholder="Seleccione el Centro de Costos" id="costoselect"
                                :options="centros"></v-select>
                            </b-form-group>
                        </b-col>
                </b-row>
        </b-card>
        <br>
        <b-card class="cards"  v-show="ocultartra">
            <b-row>
                <b-col>
                    <b-form-group 
                    
                        label="Por Favor seleccione como desea filtrar:"
                        label-size="lg">
                        <b-form-radio-group v-model="prueba"
                        
                                        :options="options"
                                        name="radiosSm"
                                        >
                        </b-form-radio-group>

                    </b-form-group>
                    
                </b-col>
                <b-col >
                    <b-btn active-class class="float-right rounded" @click="limpiarfiltro">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        Busqueda
                    </b-btn>
                </b-col>
            </b-row>
            <b-row v-show="prueba=='first'">
                    <b-col>
                        <b-form-group 
                          class="text-primary"
                          label="Rango de Fechas" >
                            <date-picker disabled="true" id="fecha" width="430" 
                            v-model="time1" placeholder="Rango de Fechas" range lang="en"
                             :shortcuts="shortcuts" :confirm="true"></date-picker>
                        </b-form-group>
                    </b-col>
            </b-row>
            <b-row v-show="prueba=='second'">
                    <b-col>
                        <b-form-group label="Orden de Servicio" class="mb-3 text-primary">
                        <b-input-group>
                        <b-form-input v-model="orden" class="mb-3" type="number" id="orden" @input.native="ordenes"  placeholder="Orden de Servicio" />
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Referencia" class="mb-3 text-primary">
                        <b-input-group>
                        <b-form-input v-model="referencia" class="mb-3" type="text" id="referencia" @input.native="referencias"  placeholder="Referencia" />
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="N° Movilizado" class="mb-3 text-primary">
                        <b-input-group>
                        <b-form-input v-model="nmovilizado" class="mb-3" type="number" id="nmovilizado" @input.native="movilizado" placeholder="Num. Movilizado" />
                        </b-input-group>
                        </b-form-group>
                    </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col>
                <b-button @click="consultar()" variant="success" class="my-1 rounded">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    Consultar
                </b-button>
                </b-col>
            </b-row>
        </b-card>
        <br>
           <b-card class="cards"  v-show="mostrarcard">
               <!--
                    <router-view :consulta="consulta" :centro="selectedCC" 
                    :cliente="selectedCL">
                -->
                <router-view :consulta="consulta" :centro="selectedCC" 
                    :cliente="selectedCL"
                    :envios="envio" >
                </router-view>
           </b-card>
        </b-container>
        
    </b-container>
</template>

<script>
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
import DatePicker from "vue2-datepicker";
import moment from 'moment'

export default {
     components :{
    Preload,
    DatePicker
  },
data(){
    return {
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
        envio:[],
        mostrarcard:false,
        items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Consulta Trazabilidad",
          to: "/inicio/trazabilidad",
          active: true
        }
      ],
        disabled_selectedCL:false,
        ocultartra: true,
        prueba: 'first',
        disable: true,
        load: false,
        orden: '',
        referencia:'',
        nmovilizado: '',    
        selectedCL: null,
        clientes: [],
        clienteseleccionado:{},
        centroseleccionado: {},
        selectedCC: null,
        centros: [],
        time1: [],
        validatecampo: '',
        options: [
        { text: 'Rango de Fechas', value: 'first' },
        { text: 'Orden, Referencia, N° Movilizado', value: 'second' }
      ],
        consulta:[]
    }
},
    updated: function () {
        bus.$on('ocultartra', function (userObject) {
        if(userObject.ocultartra==undefined){
            this.ocultartra = true
        }else{
            this.ocultartra = userObject.ocultartra
        }
      }.bind(this))
    },
methods:{
    clienteSelec(){
        if(this.disabled_selectedCL==true){
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
                    //console.log(this.centros)
                    this.load=false
                    var load=false
                            setTimeout(() => {
                                bus.$emit('load', {
                                    load
                                })
                                }, )
                    this.disable= false
                }) 
            }
            else{
                this.load=true
                this.centros=[]
                this.selectedCC=null
                this.disable= true
            }
        }
        else{
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
                    //console.log(this.centros)
                    this.load=false
                    var load=false
                            setTimeout(() => {
                                bus.$emit('load', {
                                    load
                                })
                                }, )
                    this.disable= false
                }) 
            }
            else{
                this.load=true
                this.centros=[]
                this.selectedCC=null
                this.disable= true
            }
            
        }
    },
    centrosSelec(){

    },
    limpiarfiltro(){
        console.log("entro a limpiar filtro");
        this.time1='',
        this.referencia='',
        this.nmovilizado='',
        this.orden=''
            var referencia = document.getElementById('referencia')
            var nummovilizado =document.getElementById('nmovilizado')
            var orden =document.getElementById('orden')
            referencia.disabled= false
            nummovilizado.disabled=false
            orden.disabled=false
         this.mostrarcard=false
        this.$router.replace('/inicio/trazabilidad')
                

    },
    consultar(){
        //console.log("entro a consultar");
        var inicio,fin
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
            console.log(mana);
            console.log(ant);
            console.log(cantidaddias);
            console.log(this.time1);
        if(this.selectedCL==''||this.selectedCC==''
        ||this.selectedCL==null||this.selectedCC==null)
        {  
            this.validatecampo= {
                border: '2px solid red'
            }
            swal("Oops...", "Falto algun seleccionar Cliente o Centro de Costo", "error");
        }else{
            this.validatecampo=''
            for(var i=0; i<this.clientes.length;i++){
                        if(this.clientes[i]._id==this.selectedCL)
                        {
                        this.clienteseleccionado =this.clientes[i]
                        }
                    } 
            for(var i=0; i<this.centros.length;i++){
                if(this.centros[i]._id==this.selectedCC)
                {
                this.centroseleccionado =this.centros[i]
                }
            }
            if(this.prueba=='first'){
                console.log("tengo tiempo");
                this.orden=''
                this.referencia=''
                this.nmovilizado=''

                if(cantidaddias>32||this.time1=='')
                {
                    if(cantidaddias>32){
                        swal(
                        'Advertencia',
                        'Solo puede seleccionarse maximo 30 días',
                        'warning'
                        )
                        this.$router.replace('/inicio/trazabilidad')
                    }
                    if(this.time1==''){
                        console.log("es vacio fecha");

                        swal("Oops...", "Falto algun seleccionar el rango de fechas", "warning");
                        this.$router.replace('/inicio/trazabilidad')
                    }   
                    
                }
                else{
                    inicio=this.time1[0]
                    fin=this.time1[1]
                    this.validatecampo=''
                    //this.load = true;
                    var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                        }, )
                    console.log(urlservicios+"/ObtenerOrdenesFiltradoDetalle/"+this.selectedCC._id+"/"+this.selectedCL._id+'/null/null/null/'+inicio+'/'+fin+'');
                    this.axios.get(urlservicios+"/ObtenerOrdenesFiltradoDetalle/"+this.selectedCC._id+"/"+this.selectedCL._id+'/null/null/null/'+inicio+'/'+fin+'')
                        .then((response) => {
                            this.consulta=response.data
                            console.log(this.consulta);
                            if(this.consulta==''){
                                swal(
                                    'Oops...',
                                    'No se encontro ninguna Orden!',
                                    'error'
                                    )
                                    //this.load = false;
                            }
                            var envio={
                                centro:this.selectedCC._id,
                                cliente:this.selectedCL._id,
                                inicio:inicio,
                                fin:fin
                            }
                            this.envio=envio
                            //this.load = false;
                            var load=false
                            setTimeout(() => {
                                bus.$emit('load', {
                                    load
                                })
                                }, )
                            console.log(this.consulta);
                            })
                    console.log(this.consulta);
                    this.$router.replace('/inicio/trazabilidad/listado')
                }
            }
            else{
                //ObtenerOrdenesFiltradoDetalle/:id_centro/:id_cliente/:consecutivo/:detalle/:referencia/:fecha_inicio/:fecha_final"
                this.time1=''
                if(this.orden==''&&this.referencia==''&&this.nmovilizado=='')
                {
                    swal(
                        'Oops...',
                        'Debe completar algun campo!',
                        'error'
                        )
                }
                else{
                    if(this.orden==null||this.orden=='')
                    {
                        console.log("entro orden vacio");
                    }
                    else
                    {
                        this.load = true;
                        var load=true
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                            this.axios.get(urlservicios+"/ObtenerOrdenesFiltradoDetalle/"+this.selectedCC._id+"/"+this.selectedCL._id+'/'+this.orden+'/null/null/null/null')
                                .then((response) => {
                                    this.consulta=response.data
                                    if(this.consulta==''){
                                        swal(
                                            'Oops...',
                                            'No se encontro ninguna Orden!',
                                            'error'
                                            )
                                            this.load = false;
                                            var load=false
                                    setTimeout(() => {
                                        bus.$emit('load', {
                                            load
                                        })
                                        }, )
                                    }
                                        var envio={
                                            centro:this.selectedCC._id,
                                            cliente:this.selectedCL._id,
                                            orden:this.orden,
                                            
                                        }
                                    this.envio=envio
                                    this.load = false;
                                    var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                            //console.log(this.consulta);
                            })
                            this.$router.replace('/inicio/trazabilidad/listado')
                    }
                    if(this.referencia==''||this.referencia==null){
                        //console.log("referencia vacio");
                    } 
                    else
                    {
                        console.log("tiene algo");
                            this.load = true;
                            var load=true
                        setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                            this.axios.get(urlservicios+"/ObtenerOrdenesFiltradoDetalle/"+this.selectedCC._id+"/"+this.selectedCL._id+'/null/null/'+this.referencia+'/null/null')
                            .then((response) => {
                                this.consulta=response.data
                                
                                if(this.consulta==''){
                                    swal(
                                        'Oops...',
                                        'No se encontro ninguna Orden!',
                                        'error'
                                        )
                                        this.load = false;
                                        var load=false
                        setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                                }
                                var envio={
                                            centro:this.selectedCC._id,
                                            cliente:this.selectedCL._id,
                                            referencia:this.referencia,
                                            
                                        }
                                    this.envio=envio
                                //console.log(this.consulta);
                                this.load = false;
                                var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                                    })

                            this.$router.replace('/inicio/trazabilidad/listado')
                    }
                    if(this.nmovilizado==''||this.nmovilizado==null){
                        
                    }
                    else
                    {
                        this.load = true;
                        var load=true
                        setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                        //console.log("movilizado");
                        //console.log(this.nmovilizado);
                        this.axios.get(urlservicios+"ObtenerOrdenesFiltradoDetalle/"+this.selectedCC._id+"/"+this.selectedCL._id+'/null/'+this.nmovilizado+'/null/null/null')
                            .then((response) => {
                                this.consulta=response.data
                                if(this.consulta==''){
                                    swal(
                                        'Oops...',
                                        'No se encontro ninguna Orden!',
                                        'error'
                                        )
                                        this.load = false;
                                        var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                                }
                                var envio={
                                            centro:this.selectedCC._id,
                                            cliente:this.selectedCL._id,
                                            nmovilizado:this.nmovilizado,
                                            
                                        }
                                    this.envio=envio
                                this.load = false;
                                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                                })
                            //console.log(this.consulta);
                        this.$router.replace('/inicio/trazabilidad/listado')
                    }   
                }            
            }
        }

        this.mostrarcard=true
    },
    /*
    SelectCC(value){
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Centro de Costo' };
        if(this.disabled_selectedCL==true){
            console.log(value);
            this.selectedCL=value
             var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
            this.axios.get(urlservicios+"CentrosPorCliente/"+this.selectedCL)            
            .then((response) => {
                this.centros=response.data
                this.centros.unshift(vacio)

            
            var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
            this.disable= false
            })
        }
        else{
            this.selectedCL=value.target.value
            this.load = true;
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
                this.centros.unshift(vacio)

                //console.log(this.centros)
                this.load=false
                var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                this.disable= false
                })
        }
    },
    */      
    ordenes(value){
        this.orden =value.target.value
        var referencia = document.getElementById('referencia')
        var nummovilizado =document.getElementById('nmovilizado')

        if(this.orden==''){
        referencia.disabled= false
        nummovilizado.disabled=false     
        }else{
            referencia.disabled= true
            nummovilizado.disabled=true
            this.referencia=''
            this.nmovilizado=''
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
            this.orden=''
            this.nmovilizado=''
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
            this.orden=''
            this.referencia=''
        }
    },
},
    mounted: function () {
        //---------------- fechas
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
        //this.time1[1]= mana
        //this.time1[0] =ant
        //-----------------------------------
        var bandera=true
        var _this=this
       
        console.log("montado")
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        //console.log(infologin.id_OperadorLogistico)
        if(infologin.id_cliente==undefined||infologin.id_cliente==null){
            var id_cliente='null'
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
            this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico._id+'/'+id_cliente)
            .then((response) => {
                var load=false
                setTimeout(() => {
                    bus.$emit('load', {
                        load 
                    })
                    }, )
                this.clientes=response.data
               
                //console.log(this.clientes)
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
        else
        {
            var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
            id_cliente=infologin.id_cliente
            this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico._id+'/'+id_cliente)
            .then((response) => {
                console.log(response);
                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
                this.disabled_selectedCL=true
                this.clientes=response.data
                this.selectedCL=Object.assign({},this.clientes[0])
                /*
                this.clientes=response.data
                this.clientes.unshift(vacio)
                this.disabled_selectedCL=true
                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load 
                        })
                }, )
                //console.log(this.clientes)
                this.SelectCC(id_cliente)
                */
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
