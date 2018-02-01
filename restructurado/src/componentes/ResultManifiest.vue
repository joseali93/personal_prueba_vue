<template>
  <b-container>
        <b-table  :items="consulta" :fields="fields"
            :per-page="5" :current-page="currentPage" :bordered="true">
            <template slot="id_manifiesto" slot-scope="data">
                        {{data.item.id}}
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
            <template slot="fecha_hora_generacion" slot-scope="data">
                {{data.item.fecha_hora_generacion |formatdate}}
            </template>
        </b-table>
        <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
        </b-pagination>
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
            currentPage:1,
            fields:[
                 { key: 'id_manifiesto', sortable: true , label: 'N° Manifiesto'},
                {key:'courier',  label: 'Courier'},
                {key:'fecha_hora_generacion', label: 'Fecha'},
                {key:'estado', label: 'Estado'},
                {key:'cantmovilizados', label: 'Cantidad de Movilizados'},
                {key:'imprimir', label: 'Imprimir'},
                'detalles'
            ]
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
            console.log(value);
        },
        actualizar(value){
            console.log("entro a actualizar");
            console.log(value);
            var detalles=value
            var ocultar=false
            setTimeout(() => {
                bus.$emit('detallemanifiesto', {
                    detalles 
                })
                }, )
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar 
                })
                }, )    
            this.$router.replace('/inicio/manifiestos/detalle')
        }
    }
}
</script>

<style>

</style>
