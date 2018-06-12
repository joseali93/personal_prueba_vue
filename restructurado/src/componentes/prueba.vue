<template >


  <b-container fluid>
       <b-input-group>
   

    <b-form-input type="text" placeholder="digite direccion" ></b-form-input>

    <b-input-group-append>
      <b-btn variant="outline-secondary" v-b-modal.modal1
      > <i class="fa fa-map-o"></i></b-btn>
    </b-input-group-append>
  </b-input-group>
  <!-- Modal Component -->
  <b-modal id="modal1" title="Bootstrap-Vue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
  </b-container>
</template>

<script>
import {urlservicios} from '../main'
import {bus} from '../main'

export default {

  data () {
    return {
    
    }
    
  },
  methods:{

    },
    updated: function(){
     
    },
    beforeCreate: function(){
          ///var vacio = { _id: null, nombre: "Por Favor Seleccione un Cliente" };

    },
  computed: {
  },
  updated:{
     initialize() {
  var input = document.getElementById('searchTextField');
  new google.maps.places.Autocomplete(input);
}

  },
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

