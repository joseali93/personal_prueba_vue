<template>
    <b-container>

        
        <b-row id="ejemplo">

        </b-row>
        <b-modal id="modallg2" size="lg" v-model="modal" :no-close-on-esc="true">
            <div slot="modal-header" class="w-100 non-printableE">
                <b-btn size="sm" class="float-left" variant="primary" @click="volver">
                Volver
                </b-btn>
                <b-btn size="sm" class="float-right" variant="primary" @click="imprimir">
                Imprimir
                </b-btn>
            </div>
            <div slot="modal-footer"  class="w-100 footerimpresion" >
               <b-row>
                <b-col>
                    RPL LOGISTICA- IMPRIME: {{infoimpresion()}}
                </b-col>
                <b-col>
                    FECHA: {{fechaimpre}}
                </b-col>
                </b-row>
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
                    <h1>MANIFIESTO DE BODEGA SALIDA</h1>
                    </b-row>
                    <b-row>
                    <h2>Ciudad: <strong class="text-capitalize"> {{otrainfo[0].ciudad}}</strong></h2> 
                    </b-row>
                    <b-row>
                    <h2>Bodega: <strong class="text-capitalize"> {{otrainfo[0].nombre}}</strong></h2> 
                    </b-row>
                    <b-row>
                    <h3>fecha: <strong>{{fecha}}</strong></h3>  
                    </b-row>
                    <b-row>
                    <h3>Conductor: <strong class="text-uppercase"> {{otrainfo[1].nombre}} {{otrainfo[1].apellido}}</strong></h3> 
                    </b-row>
                    <b-row>
                    <h3>Auxiliar:</h3>
                    </b-row>
                </b-col>
                </b-row>
                <b-row class="my-5">
                <b-col class="my-5">
                <b-table id="mitablita" responsive="sm" bordered	outlined :items="itemsmodal" :fields="fields2" class="juana"></b-table>
                </b-col>
                </b-row>
                <b-row>
                <b-col>
                </b-col>
                <b-col>
                <b-row class="impresion">
                <h2>Total de Envios:  <strong>{{itemsmodal.length}}</strong></h2>
                </b-row>
                <b-row class="impresion">
                <h2>Total de Unidades: <strong>{{Tunidades()}}</strong></h2> 
                </b-row>
                </b-col>
                </b-row>
                <b-row class="my-5 impresion"> 
                <p class="center-button">
                RECIBE: ____________________________________________________________________________
                </p>
                </b-row>
                <b-row class="my-5 impresion">
                <p class="center-button">
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
        moment.locale('es');

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
            fechaimpre:moment().format('MMMM Do YYYY, h:mm:ss a'),
            otrainfo:'',
            modal:true,
            itemsmodal:[],
           fields2: [
              { key: 'id', label: 'N° Movilizado' },
              { key: 'nombre', label: 'Cliente' },
              { key: 'direccion', label: 'Dirección' },
              { key: 'referencia', label: 'Referencia' },
              { key: 'orden', label: 'N° Orden' },
              { key: 'peso', label: 'Peso' },
              { key: 'unidades', label: 'Unidades' },
         ],
        }   
    },
    methods:{
        infoimpresion(){
            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            return infologin.nombre+' '+infologin.apellido
        },
        Tunidades(){
            var retornar=0
            for(var x=0;x<this.itemsmodal.length;x++){
                retornar=this.itemsmodal[x].unidades
            }
            return retornar
        },
      volver(){
          console.log("entro a volver");
        this.$router.replace('/inicio/entradasalida')
      },
      imprimir(){
          console.log("entro aimprimir");
        if($("#print").length == 0)
        {
            var print =null
            print = document.createElement('div');
            print.setAttribute('id', 'print');
            print.setAttribute('class', 'printable');
            $(print).appendTo('body');

        }
          //$("#print").html($("#footerimpresion").html());

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

        moment.locale('es');
    },
}
</script>
<style  scopped>

            @import url("../css/PrintManifest.css") print;

        </style>
