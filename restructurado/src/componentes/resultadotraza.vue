<template>
    <b-container fluid>
        <b-row class="my-1">
                <b-btn @click="volver" variant="success">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    Volver
                </b-btn>
        </b-row>
    <b-card-group deck>
        <b-card title="Informacion Remitente"
               >
            <b-card-body class="card-text">
                <b-row>
                    <b-col>
                        <h3>Cliente :</h3>
                    </b-col>
                    <b-col>
                        {{otro.cliente.nombre}}
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col>
                        <h3>Centro de Costos:</h3>
                    </b-col>
                    <b-col>
                        {{otro.centro.nombre}}
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
        <b-card title="Informacion Destinatario"
                >
                <b-card-body class="card-text">
                    <b-row>
                    <b-col>
                        <h3>Nombre:</h3>
                    </b-col>
                    <b-col>
                        {{info.detalleslocal.destinatario.nombre}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Direccion:</h3>
                    </b-col>
                    <b-col>
                        {{info.detalleslocal.destinatario.direccion}}
                    </b-col>
                </b-row>
                </b-card-body>
        </b-card>
    </b-card-group>
    <b-col class="borderF">
        <b-row>
                <b-col>
                    <h3>Numero Orden de Servicio:</h3>
                </b-col>
                <b-col>
                    {{info.consec}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3>Numero de Movilizado:</h3>
                </b-col>
                <b-col>
                    {{info.id}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3>Producto:</h3>
                </b-col>
                <b-col>
                    {{info.productoslocal.nombre}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3>Servicio:</h3>
                </b-col>
                <b-col>
                    {{info.servicioslocal.nombre}}
                </b-col>
            </b-row>
        <b-row>
            <b-col>

            </b-col>
        </b-row>
        <b-row v-for="(data,indice) in inputs" class="my-1">
          
                        <b-col cols="5">
                            <label  class="col-sm-2 col-form-label col-form-label-sm">{{data.nombre}}: </label>
                        </b-col>
                    
                        <template >
                            <b-col cols="6">
                                <b-form-input  :value="data.valores"
                                    type="text"
                                    :readonly="true">
                            </b-form-input>
                            </b-col>
                        </template>
        </b-row>
                <hr>
                <b-row>
                     <b-col>
                    <h3>Courier:</h3>
                    </b-col>
                    <b-col>
                        {{info.courier.nombre}} {{info.courier.apellido}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                     <b-table striped hover :items="info.detalleslocal.infor.objetoUnidades" ></b-table>

                    </b-col>
                </b-row>
    </b-col>

        <b-row>
            <h3>
                Seguimiento del Detalle:
            </h3>
        </b-row>
        <b-row>
            <b-table :items="info.trazabilidad" :fields="campostra">
                        <template slot="fecha" slot-scope="data">
                            {{data.item.fecha |formatdate}}
                        </template>
                        <template slot="nombre" slot-scope="data">
                            {{data.item.nombre}}
                        </template>
                        <template slot="imagen" slot-scope="data">
                                <i class="btn btn-success fa fa-picture-o" @click="imagenmodal(data.item)" v-show="data.item.imagenes.length>0">
                                </i>   
                        </template>
                    </b-table>
        </b-row>
        <!-- Modal Component 1 imagen modal -->
        <b-modal id="modalimagen" ref="ModalImagunidetalle" title="Evidencia Digital">
            <b-container>
                <b-img :src="imgmodal.imagenes[0].url" fluid alt="Fluid image" />
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-left" variant="primary" v-b-toggle.todo>
                Enviar Correo
                </b-btn>
                <b-collapse class="mt-2" id="todo">
                            <b-card>
                                 <b-form inline>
                                <b-form-input v-model="emailT"
                                    type="email"
                                    placeholder="Ingrese su email"
                                    @input="validacorreoT" :state="estadoT"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreoT(imgmodal)" >
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
                <b-btn size="sm" class="float-right " variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component 2 imagenes modal  -->
        <b-modal id="modalimagenes" ref="ModalImagenesdetalle" title="Evidencia Digital"
            data-toggle="modal" lazy> 
            <b-container>
                <template v-for="(data,indice) in imgmodal.imagenes">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-row>
                                <b-col cols="8">
                                    <b-btn block v-b-toggle="data.id" variant="info">
                                        Evidencia {{indice+1}}
                                    </b-btn>
                                </b-col>
                                <b-col cols="4">
                                    <b-btn v-b-toggle="data.email">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                    </b-btn>
                                    <b-btn  active-class :href="data.url" target="_blank" >
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                    </b-btn>
                                </b-col>
                            </b-row>

                        </b-card-header>
                        <b-collapse :id="data.id" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                            <p class="card-text">
                                <b-img :src="data.url" fluid alt="Fluid image" />
                            </p>
                            </b-card-body>
                        </b-collapse>
                        <b-collapse class="mt-2" :id="data.email">
                            <b-card>
                                 <b-form inline>
                                <b-form-input v-model="email"
                                    type="email"
                                    placeholder="Ingrese su email"
                                    @input="validacorreo" :state="estado"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreo(data)" v-b-toggle="data.email">
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
                    </b-card>
                </template>
                
            </b-container>
            <div slot="modal-header" class="w-100">
                <b-btn size="sm" class="float-left" variant="success" v-b-toggle.todo>
                Enviar Correo
                </b-btn>
                <b-collapse class="mt-2" id="todo">
                            <b-card>
                                 <b-form inline>
                                <b-form-input v-model="emailT"
                                    type="email"
                                    placeholder="Ingrese su email"
                                    @input="validacorreoT" :state="estadoT"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreoT(imgmodal)" >
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
            </div>
           <div slot="modal-footer" class="w-100">
                
                <b-btn size="sm" class="float-right" variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        
    </b-container>
</template>

<script>
import {bus} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'
import {urlservicios} from '../main'
export default {
    data () {
        return {
            respuesta:'',
                  email:'',
                  emailT:'',
                  emailvalido: null,
                  emailvalidoT: null,                  
                  estado:null,
                  estadoT:null,
                  
            info: '',
            otro:'',
            inputs:'',
            campostra:[
                { key: "fecha", label: "Fecha" },
                { key: "nombre", label: "Nombre" },
                { key: "imagen", label: "Imagenes" },
                
            ],
            imgmodal: {
                fecha:'',
                EsCierre:'',
                nombre:'',
                id_ProcesoLogistico:'',
                imagenes:[
                {
                    id: '',
                    url: ''
                }
                ]
            },
        }
    },
        filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    methods: {
        validacorreoT(value){
            if(value.length==0){
               this.emailvalidoT=null
               return(this.estadoT=null)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {   
                this.emailvalidoT=true
                return (this.estadoT=true)
            }
                this.emailvalidoT=false
                return (this.estadoT=false)
        },
        enviarcorreoT(value){
            console.log("entro a envio todo");
            if(this.emailvalidoT==null||this.emailT==''){
                swal(
                    'Falta Completar el Email',
                    'Complete el e-mail',
                    'error'
                    )
            }
            if(this.emailvalidoT==false){
                swal(
                    'Formato Ivalido',
                    'Ingrese un e-mail valido',
                    'warning'
                    )
            }
            if(this.emailvalidoT==true){
                var load=true
                    setTimeout(() => {
                        console.log("emite");
                        bus.$emit('load', {
                            load
                        })
                        }, )
                var objeT
                var objeto
                var objetoimanes=[]
                value.imagenes.map((obj,ind)=>{
                    //console.log(obj);
                    objeto={
                        ruta:obj.ruta,
                        id:obj.id
                    }
                    objetoimanes.push(objeto)
                })
                objeT={
                        correo:this.emailT,
                        norden:this.info.consec,
                        nmovilizado:this.info.id,
                        nomproceso:this.info.nombre_proceso,
                        imagenes:objetoimanes
                    }
                console.log(objeT);
                this.axios.post(urlservicios+"EnviarCorreoImagen", objeT)
                    .then(response => {
                    this.respuesta = response.data;
                    console.log(response);
                    var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                    swal(
                        "Excelente!",
                        " " + this.respuesta,
                        "success"
                    );
                    });
            }
        },
        closemodal(){
            this.$refs.ModalImagenesdetalle.hide()
            this.$refs.ModalImagunidetalle.hide()
            
        },
       validacorreo(value){
           if(value.length==0){
               this.emailvalido=null
               return(this.estado=null)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {   
                this.emailvalido=true
                return (this.estado=true)
            }
                this.emailvalido=false
                return (this.estado=false)
            

       },
        enviarcorreo(value){
            var objeto
            if(this.emailvalido==null||this.email==''){
                swal(
                    'Falta Completar el Email',
                    'Complete el e-mail',
                    'error'
                    )
            }
            if(this.emailvalido==false){
                swal(
                    'Formato Ivalido',
                    'Ingrese un e-mail valido',
                    'warning'
                    )
            }
            if(this.emailvalido==true){
                console.log("email ok");
                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                console.log(this.info);
                console.log(value);
                objeto={
                    correo:this.email,
                    norden:this.info.consec,
                    nmovilizado:this.info.id,
                    nomproceso:this.info.nombre_proceso,
                    imagenes:[{
                        ruta:value.ruta,
                        id:value.id
                    }]
                    
                }
                console.log(objeto);
                this.axios.post(urlservicios+"EnviarCorreoImagen", objeto)
                .then(response => {
                this.respuesta = response.data;
                console.log(response);
                console.log(objeto);
                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                swal(
                    "Excelente!",
                    " " + this.respuesta,
                    "success"
                );
                });
            }


        },
        imagenmodal(data){
            console.log("entro a el modal");
            if(data.imagenes.length==1)
            {
                this.imgmodal=data
                 this.$refs.ModalImagunidetalle.show()
            }
            if(data.imagenes.length>1)
            {
                this.imgmodal=data
                this.$refs.ModalImagenesdetalle.show()
            }
        },
        volver(){
            var ocultartra=true
            setTimeout(() => {
                bus.$emit('ocultartra', {
                    ocultartra 
                })
                }, )
            this.$router.replace('/inicio/trazabilidad/listado')
        }
    },
    mounted: function () {
        var llaves
    },
    beforeCreate: function() {
        bus.$on('resultado', function (userObject) {
            //console.log(userObject);
        this.info=userObject.value
        this.otro=userObject.personal
        this.inputs=userObject.personal.inputs
      }.bind(this))
    }
}
</script>

<style>
.borderF {
    border: 1px solid #DCDCDC;
    margin: 1%;
    padding: 1%
}
#jose{
        outline: green dotted thick;
}
</style>
