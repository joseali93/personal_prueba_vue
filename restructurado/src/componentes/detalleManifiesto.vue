<template>
    <b-container>
        <b-row class="my-3">
            <b-btn @click="volver" variant="success">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                Volver
            </b-btn>
        </b-row>
        <b-row>
            {{valores.listaMovilizados}}
        </b-row>
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
                <b-table bordered fixed hover
                 :items="valores.listaMovilizados"  :fields="fields"></b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'

export default {
    data(){
        return{
            valores:'',
            fields:[
                {key:'ido',  label: 'N° Orden'},
                { key: 'idd', sortable: true , label: 'N° Manifiesto'},
                {key:'unidades', label: 'Unidades'},
                {key:'peso', label: 'Peso'},
            ],
           
        }
    },
    methods:{
        volver()
        {
            console.log("entro a volver");
            
            var ocultar=true
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar 
                })
                }, )
            
            this.$router.replace('/inicio/manifiestos/resultado')
        }
    },
    beforeCreate: function() {
        bus.$on('detallemanifiesto', function (userObject) {
            //console.log(userObject);
        this.valores=userObject.detalles
        
      }.bind(this))

    }
}
</script>

<style>

</style>
