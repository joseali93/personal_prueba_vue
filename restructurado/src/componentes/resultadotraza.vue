<template>
    <b-container fluid>
        <b-row class="my-1">
                <b-btn @click="volver" variant="success">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    Volver
                </b-btn>
        </b-row>
        <b-row>
            {{info}}
        </b-row>
        <b-row>
            <b-col>
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
                        <h3>Centro de Costos :</h3>
                    </b-col>
                    <b-col>
                        {{otro.centro.nombre}}
                    </b-col>
                </b-row>
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
               
            </b-col>
            
            <b-col>
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
                        <h3>Servicios:</h3>
                    </b-col>
                    <b-col>
                        {{info.servicioslocal.nombre}}
                    </b-col>
                </b-row>
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
            info: '',
            otro:'',
            inputs:'',
            campostra:[
                { key: "fecha", label: "Fecha" },
                { key: "nombre", label: "Nombre" },
                { key: "imagen", label: "Imagenes" },
                
            ]
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

</style>
