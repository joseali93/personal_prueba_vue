<template >


  <b-container fluid>

    
   <v-select v-model="selected" label="nombre" value="_id" :options="clientes" @input="prue()"></v-select>
  {{selected}}
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
     console.log("entro a prueba");
     console.log(this.selected);
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
          var vacio = { _id: null, nombre: "Por Favor Seleccione un Cliente" };

      var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    this.axios
        .get(
          urlservicios +
            "clientesOperador/" +
            test.id_OperadorLogistico._id +
            "/null"
        )
        .then(response => {
          console.log(response);
          this.clientes = response.data;
          this.clientes.unshift(vacio);
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

