<template>
  <b-container>
    <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="consulta"> 
        <template slot="index" scope="data">
            {{data.index + 1}}
        </template>
        <template slot="Cancelar" scope="data">
            <i class="btn btn-danger fa fa-trash" ></i>
        </template> 
        <template slot="actualizar" scope="data">

              <b-button variant="warning" class="fa fa-cogs" @click="actualizar(data)"></b-button>

            <!--<router-link  to="/inicio/consultar"  tag="button" class-active="active" class="btn btn-warning fa fa-cogs"></router-link>
            -->
        </template>                       
    </b-table>
    <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
    </b-pagination>
  </b-container>
</template>

<script>
import {bus} from '../main'

export default {
    props:['consulta'],
    data(){
        return{
            currentPage: 1,
            fields: [
                'index',
                'Cancelar',
                { key: 'id', sortable: true },
                { key: 'fecha_creacion',label:'Fecha Creacion Orden', sortable: false },
                'actualizar'
            ],
        }
    },
    methods: {
        actualizar(inde){
            console.log(inde)
            bus.$emit('items',inde)
            setTimeout(() => {
                bus.$emit('thisEvent', {
                    inde
                })
                }, )
            this.$router.replace('/inicio/consultar/detalles')
        }
    }
    
}
</script>

<style>

</style>
