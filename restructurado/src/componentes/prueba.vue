<template >


  <b-container fluid>

     <b-row class="non-printableE" id="inicio">
       <b-col>
         <b-btn v-b-modal="modallg1" variant="primary">
           ENTRADA
         </b-btn>
       </b-col>
       <b-col>
         <b-btn v-b-modal.modallg2 variant="primary">
           SALIDA
         </b-btn>
       </b-col>
       
     </b-row>

    <!-- Modal Imprimir-->
    <b-modal id="modallg2" size="lg" >
      <div slot="modal-header" class="w-100 non-printableE">
         <b-btn size="sm" class="float-left" variant="primary">
           Close
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
            <h1>MANIFIESTO DE BODEGA SALIDA</h1>
            </b-row>
            <b-row>
            <h2>Ciudad:</h2>
            </b-row>
            <b-row>
            <h2>Bodega:</h2>
            </b-row>
            <b-row>
            <h3>fecha:</h3>
            </b-row>
            <b-row>
            <h3>Conductor:</h3>
            </b-row>
            <b-row>
            <h3>Auxiliar:</h3>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="my-5">
        <b-col class="my-5">
        <b-table  responsive="sm md" bordered	outlined :items="items2" :fields="fields2"></b-table>
        </b-col>
        </b-row>
        <b-row>
        <b-col>
        </b-col>
        <b-col>
        <b-row>
        <h2>Total de Envios: </h2><strong>34</strong>
        </b-row>
        <b-row>
        <h2>Total de Unidades: </h2><strong>99</strong>
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

    <!-- Modal Imprimir-->
    <b-modal id="modallg1" size="lg" >
      <div slot="modal-header" class="w-100 non-printableE ">
         <b-btn size="sm" class="float-left" variant="primary">
           Close
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
            <h2>Ciudad:</h2>
            </b-row>
            <b-row>
            <h2>Bodega:</h2>
            </b-row>
            <b-row>
            <h3>fecha:</h3>
            </b-row>
            <b-row>
            <h3>Conductor:</h3>
            </b-row>
            <b-row>
            <h3>Auxiliar:</h3>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <b-col class="my-5">
          <b-table  responsive="sm md" bordered	outlined :items="items" :fields="fields"></b-table>
          </b-col>
          </b-row>
          <b-row>
          <b-col>
          </b-col>
          <b-col>
          <b-row>
          <h2>Total de Envios: </h2><strong>34</strong>
          </b-row>
          <b-row>
          <h2>Total de Unidades: </h2><strong>99</strong>
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
export default {
  data () {
    return {
         fields: [
              { key: 'nmovilizado', label: 'N° Movilizado' },
              { key: 'cliente', label: 'Cliente' },
              { key: 'ccosto', label: 'Centro de Costos' },
              { key: 'referencia', label: 'Referencia' },
              { key: 'orden', label: 'N° Orden' },
              { key: 'peso', label: 'Peso' },
              { key: 'unidades', label: 'Unidades' },
         ],
         fields2: [
              { key: 'nmovilizado', label: 'N° Movilizado' },
              { key: 'cliente', label: 'Cliente' },
              { key: 'direccion', label: 'Dirección' },
              { key: 'referencia', label: 'Referencia' },
              { key: 'orden', label: 'N° Orden' },
              { key: 'peso', label: 'Peso' },
              { key: 'unidades', label: 'Unidades' },
         ],
      items: [
        
         {nmovilizado: 123, cliente: 'Macdonalds',
        ccosto:'local Iserra', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
         {nmovilizado: 123, cliente: 'Macdonalds',
        ccosto:'local Iserra', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
         {nmovilizado: 123, cliente: 'Macdonalds',
        ccosto:'local Iserra', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
         {nmovilizado: 123, cliente: 'Macdonalds',
        ccosto:'local Iserra', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
         {nmovilizado: 123, cliente: 'Macdonalds',
        ccosto:'local Iserra', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
         {nmovilizado: 123, cliente: 'Macdonalds',
        ccosto:'local Iserra', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
        
      ],
      items2: [
        
         {nmovilizado: 123, cliente: 'Macdonalds',
        direccion:'Av calle 45#34-79', referencia:'AAAAA',
         orden: 999, peso: 40, unidades: 4 },
         
        
      ]
    }
    
  },
  methods:{

      imprimir(){
        console.log("entro a imprimir")
      
          //document.getElementById('app').appendChild(imprimible);
          document.getElementById("print-content");
         window.print()
      }
    },
    mounted: function() {
      
    },
  computed: {
  }
}
</script>
<style>
        @import url("../css/PrintManifest.css") print;
        @import url("../assets/libs/style.default.css");
        .center-button {
        display: block;
        margin: auto;
    }
   
    
    
 </style>

