<template>
  <b-container>
      {{consulta}}
        <b-table  :items="consulta" :fields="fields"
            :per-page="5" :current-page="currentPage" :bordered="true">
            <template slot="id_manifiesto" slot-scope="data">
                        {{data.item.id}}
            </template>
            
            <template slot="NombresYApellidoCourier" slot-scope="data">
                        {{data.item.NombresYApellidoCourier}}
            </template>
            <template slot="estado_manifiesto" slot-scope="data">
                        {{data.item.estado_manifiesto}}
            </template>
            <template slot="detalles" slot-scope="data">
                
                 <i class="btn btn-success fa fa-info" @click="actualizar(data.item)"></i>
            </template>
            <template slot="imprimir" slot-scope="data">
                <i class="btn btn-success fa fa-print"  @click="imprimir(data.item)"></i>
            </template>
            <template slot="cantmovilizados" slot-scope="data">
                {{data.item.listaMovilizados.length}}
            </template>
            <template slot="fecha_creacion" slot-scope="data">
                {{data.item.fecha_creacion |formatdate}}
            </template>
        </b-table>
        <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
        </b-pagination>
        <!-- Modal Component -->
        <b-modal id="modal1" size="lg" ref="myModalRef" title="Bootstrap-Vue">
            <b-container>
                <b-row>
                    <b-col>
                        <h3>Ciudad:</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Bodega:</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Ciudad:</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Fecha:</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Conductor:</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        {{detalle}}
                        <b-table bordered fixed hover
                        :items="detalle.listaMovilizados"  :fields="fields2">
                        <template slot="nmanifiesto" slot-scope="data">
                                {{data.item.id_manifiesto}}
                        </template>
                        <template slot="id_orden" slot-scope="data">
                                {{data.item.id_orden}}
                        </template>
                        <template slot="id_movilizado" slot-scope="data">
                                {{data.item.id_movilizado}}
                        </template>
                    
                        </b-table>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
  </b-container>
</template>

<script>
import moment from 'moment'
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
export default {
    data(){
        
        return{
            detalle: '',
            currentPage:1,
            fields:[
                { key: 'id_manifiesto', sortable: true , label: 'N° Manifiesto'},
                {key:'NombresYApellidoCourier',  label: 'Courier'},
                {key:'fecha_creacion', label: 'Fecha'},
                {key:'estado_manifiesto', label: 'Estado'},
                {key:'cantmovilizados', label: 'Cantidad de Movilizados'},
                {key:'imprimir', label: 'Imprimir'},
                'detalles'
            ],
             fields2:[
                {key:'nmanifiesto', label:'N° Manifiesto'},
                {key:'id_orden',  label: 'N° Orden'},
                {key:'id_movilizado', label:'N° Movilizado'},
                {key:'unidades', label: 'Unidades'},
                {key:'peso', label: 'Peso'},
            ],
        }
    },
    props:['consulta'],
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    methods:{
        imprimir(value){
            console.log("entro a imprimir");
            var itemsmovilizados=value.listaMovilizados
            var infovaria=value
            console.log(itemsmovilizados);
            console.log(infovaria);
        },
        actualizar(value){
            console.log("entro a actualizar");
            console.log(value);
            var detalles=value
            this.detalle=value
            var ocultar=false
            setTimeout(() => {
                bus.$emit('detallemanifiesto', {
                    detalles 
                })
                }, )
                /*
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar 
                })
                }, )   
                 
            this.$router.replace('/inicio/manifiestos/detalle')
                */
                this.$refs.myModalRef.show()
        }
    }
}
</script>

<style>

</style>
