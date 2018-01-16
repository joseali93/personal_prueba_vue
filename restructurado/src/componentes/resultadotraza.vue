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
                                    :disabled="true">
                            </b-form-input>
                            </b-col>
                        </template>
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
                                    <b-btn  active-class class="fa fa-envelope-o algo" @click="enviarcorreo" >
                                        
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
                    </b-card>
                </template>
            </b-container>
        </b-modal>
        
    </b-container>
</template>

<script>
$.fn.modal.Constructor.prototype.enforceFocus = function () {};
import {bus} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'
import {urlservicios} from '../main'
$.fn.modal.Constructor.prototype.enforceFocus = function () {};
export default {
    data () {
        return {
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
       
        enviarcorreo(){
            console.log("entro a enviarcorreo");
            
                
                 swal({
                    title: 'Submit email to run ajax request',
                    input: 'text',
                    inputAttributes: {'id':'jose'},
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                 })

                var d = document.getElementById("jose"); 
                d.focus();
            
       
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

</style>
