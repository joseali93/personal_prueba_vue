<template>
<b-container>
  <b-row class="non-printableE" id="inicio">
       <b-col>
        
       </b-col>
  </b-row>
   <!-- Modal Imprimir-->
    <b-modal id="modallg1" size="lg" v-model="modal" :no-close-on-esc="true">
      <div slot="modal-header" class="w-100 non-printableE ">
         <b-btn size="sm" class="float-left" variant="primary" @click="volver">
           Volver
         </b-btn>
         <b-btn size="sm" class="float-right" variant="primary" @click="imprimir">
           imprimir
         </b-btn>
       </div>
       <div slot="modal-footer" class="w-100 non-printableE">
               
            </div>
      <b-container  id="prueba" class="non-printableE " >
        <b-row>
          <b-col class="my-2">
                    <b-img src="http://localhost:8080/src/assets/logo.png"  fluid alt="Fluid image" class="imgpr" />
                    <!--
            <b-img src="https://lorempixel.com/300/150/" fluid alt="Fluid image" />

                        -->
          </b-col>
          <b-col class="my-2">
            <b-row>
            <h1>MANIFIESTO DE BODEGA ENTRADA</h1>
            </b-row>
            <b-row>
              <label class="labels">Ciudad: <strong class="text-capitalize">{{otrainfo[0].ciudad}}</strong></label>
            </b-row>
            <b-row>
            <label class="labels">Bodega: <strong class="text-capitalize">{{otrainfo[0].nombre}}</strong></label>
            </b-row>
            <b-row>
            <label class="labels">Fecha: <strong class="text-capitalize">{{fecha}}</strong></label>
            </b-row>
            <b-row>
            <label class="labels">Conductor: <strong class="text-uppercase">{{otrainfo[1].nombre}} {{otrainfo[1].apellido}}</strong></label>
            </b-row>
            <b-row>
            <label class="labels">Auxiliar: <strong class="text-uppercase"></strong></label>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <b-col class="my-5">
          <b-table id="mitablita" responsive="sm" bordered :fixed="true"	
          outlined :items="itemsmodal" :fields="fields" class="juana"></b-table>

          </b-col>
          </b-row>
          <b-row>
          <b-col>
          </b-col>
          <b-col>
          <b-row>
          <label class="labels">Total de Envios: <strong class="text-uppercase">{{itemsmodal.length}}</strong></label>
          </b-row>
          <b-row>
          <label class="labels">Total de Unidades: <strong class="text-uppercase">{{Tunidades()}}</strong></label>

          </b-row>
          </b-col>
        </b-row>
        <b-row class="my-5 impresion">
          <p class="center-button">
          RECIBE: ____________________________________________________________________________
          </p>
        </b-row>
        <b-row class="impresion">
          <p class="center-button ">
          ENTREGA: ___________________________________________________________________________
          </p>
        </b-row>
      </b-container>
    </b-modal>
</b-container>
</template>

<script>
import $ from 'jquery'

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
              { key: 'nombre_centro', label: 'Centro de Costos' },
              { key: 'referencia', label: 'Referencia' },
              { key: 'numeroOrden', label: 'N° Orden' },
              { key: 'peso', label: 'Peso' },
              { key: 'unidades', label: 'Unidades' },
            ],
        }   
    },
    methods:{
      Tunidades(){
          var retornar=0
          console.log("entro a Total unidades");
         
          for(var x=0;x<this.itemsmodal.length;x++){
              retornar=retornar+parseInt(this.itemsmodal[x].unidades)
          }
          return retornar
      },
      volver(){
          console.log("entro a volver");
          this.$router.go(-1)
        //this.$router.replace('/inicio/entradasalida')
      },
      imprimir(){
       
          if($("#print").length == 0)
                {
                    var print =null
                    print = document.createElement('div');
                    print.setAttribute('id', 'print');
                    print.setAttribute('class', 'printable');
                    $(print).appendTo('body');

                }
          $("#print").html($("#prueba").html());
          window.print();

          $("#print").remove();
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
        @import url("../css/PrintManifest.css") print;

.labels{
  font-size: 20px;
}
</style>
