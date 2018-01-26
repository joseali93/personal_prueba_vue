<template>
<b-container>
  <b-row class="non-printableE" id="inicio">
       <b-col>
         <b-btn v-b-modal="'modallg1'" variant="primary">
           ENTRADA
         </b-btn>
       </b-col>
  </b-row>
   <!-- Modal Imprimir-->
    <b-modal id="modallg1" size="lg" v-model="modal">
      <div slot="modal-header" class="w-100 non-printableE ">
         <b-btn size="sm" class="float-left" variant="primary" @click="volver">
           Volver
         </b-btn>
         <b-btn size="sm" class="float-right" variant="primary" @click="imprimir">
           imprimir
         </b-btn>
       </div>
      <b-container id="print-content">
        <b-row>
          <b-col class="my-2">
            <b-img src="https://lorempixel.com/300/150/" fluid alt="Fluid image" />
          </b-col>
          <b-col class="my-2">
            <b-row>
            <h1>MANIFIESTO DE BODEGA ENTRADA</h1>
            </b-row>
            <b-row>
            <h2>Ciudad:</h2> <strong class="text-capitalize"> {{otrainfo[0].ciudad}}</strong>
            </b-row>
            <b-row>
            <h3>Bodega:</h3> <strong class="text-capitalize"> {{otrainfo[0].nombre}}</strong>
            </b-row>
            <b-row>
            <h3>fecha:</h3> <strong>{{fecha}}</strong>
            </b-row>
            <b-row>
            <h3>Conductor:</h3> <strong class="text-capitalize"> {{otrainfo[1].nombre}} {{otrainfo[1].apellido}}</strong>
            </b-row>
            <b-row>
            <h3>Auxiliar:</h3>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <b-col class="my-5">
          <b-table  responsive="sm md" bordered	outlined :items="itemsmodal" :fields="fields">

          </b-table>
          </b-col>
          </b-row>
          <b-row>
          <b-col>
          </b-col>
          <b-col>
          <b-row>
          <h2>Total de Envios: </h2> <strong>{{itemsmodal.length}}</strong>
          </b-row>
          <b-row>
          <h2>Total de Unidades: </h2> <strong>{{Tunidades()}}</strong>
          </b-row>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <p class="center-button">
          RECIBE: ____________________________________________________________________________
          </p>
        </b-row>
        <b-row>
          <p class="center-button">
          ENTREGA: ___________________________________________________________________________
          </p>
        </b-row>
      </b-container>
    </b-modal>
</b-container>
</template>

<script>
import {urlservicios} from '../main'
import {bus} from '../main'
import moment from 'moment'

export default {
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    data(){
        return{
            fecha:  moment().format("DD/MM/YYYY"),
            otrainfo:'',
            modal:true,
            itemsmodal:[],
            fields: [
              { key: 'id', label: 'N° Movilizado' },
              { key: 'nombre', label: 'Cliente' },
              { key: 'ccosto', label: 'Centro de Costos' },
              { key: 'referencia', label: 'Referencia' },
              { key: 'orden', label: 'N° Orden' },
              { key: 'peso', label: 'Peso' },
              { key: 'unidades', label: 'Unidades' },
            ],
        }   
    },
    methods:{
        Tunidades(){
            var retornar=0
            console.log("entro a Total unidades");
            console.log(this.itemsmodal.length);
            console.log(this.itemsmodal);
            for(var x=0;x<this.itemsmodal.length;x++){
                console.log(this.itemsmodal);
                retornar=this.itemsmodal[x].unidades
            }
            return retornar
        },
      volver(){
          console.log("entro a volver");
        this.$router.replace('/inicio/entradasalida')
      },
      imprimir(){
        console.log("entro a imprimir")
      
          //document.getElementById('app').appendChild(imprimible);
          document.getElementById("print-content");
         window.print()
      }
    },
    mounted: function() {
       bus.$on('modalinfo', function (userObject) {
     
        this.itemsmodal = userObject.itemsmodal
        this.otrainfo= userObject.inforvaria
        
      }.bind(this))
    },
}
</script>

<style>

</style>
