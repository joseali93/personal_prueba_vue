<template >


  <b-container fluid>
<b-btn @click="prue">
  asda
</b-btn>
  </b-container>
</template>

<script>
import {urlservicios} from '../main'
import {bus} from '../main'

export default {
  data () {
    return {
      selected:'',
      modal2:true,
      algo:'',
      clientes:[],
        
      items: [
        
         {nmovilizado: 123, cliente: 'Macdonalds'
       },
         {nmovilizado: 123, cliente: '1111111111'
        }
         
        
      ],
     
    }
    
  },
  methods:{
   prue(){
     console.log("eeeeeeeeeeeeeeeeeen");
     /*
     console.log("entro a prueba");
     var dt = new Date('8/24/2009');
     var prueba=[
     ]
     //console.log(this.clientes);
     //console.log(this.clientes.length);
     for(var z=0;z<this.clientes.length;z++)
     {
       (this.clientes[z].direccion=dt)
     }
     alasql.fn.prueba= function(date)
     {
       console.log(date.toLocaleString());

     return date.toLocaleString()
     }
     console.log(this.clientes);
    alasql('SELECT prueba(direccion) as Fecha INTO XLS("Data.xls",{headers:true}) FROM ?',[this.clientes]);
    */
    var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    console.log(urlservicios +"ConsultaExcel/" +test.id_OperadorLogistico._id +"/5a11a8faee87f501080bce29/5a2052ea6535d593c73c815c/90/null/null/null/null/");
    this.axios.get("http://192.168.1.58:3000/logistica/ConsultaExcel/5a2052ea6535d593c73c815c/5a11a8faee87f501080bce29/5a0496229a3714c4196351fb/97/162/9/null/null/")
        .then(response => {
          console.log(response);
          var consulta=response.data.select
          this.consulta=response.data.movilizadosobjet    
           //alasql(consulta,[this.consulta])      
        })

       
           
   }

    },
    mounted: function() {
       bus.$on('modalinfo', function (userObject) {
     
        this.algo = userObject.itemsmodal

        console.log(this.algo);
      }.bind(this))
    },
    updated: function(){
     
    },
    beforeCreate: function(){
          ///var vacio = { _id: null, nombre: "Por Favor Seleccione un Cliente" };

      var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    console.log(urlservicios +"ConsultaExcel/" +test.id_OperadorLogistico._id +"/5a11a8faee87f501080bce29/5a2052ea6535d593c73c815c/90/null/null/null/null/");
    this.axios.get("http://192.168.1.58:3000/logistica/ConsultaExcel/5a2052ea6535d593c73c815c/5a11a8faee87f501080bce29/5a0496229a3714c4196351fb/null/null/null/2018-04-22/2018-04-25/")
        .then(response => {
          console.log(response);
          this.consulta=response.data          
        })
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

