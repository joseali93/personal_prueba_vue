<template >


  <b-container fluid>
      <vue-google-autocomplete
            ref="address"
            id="map"
            v-model="prueba"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="co"
        >
                </vue-google-autocomplete>
      {{prueba}}


      
  </b-container>
</template>

<script>
import {urlservicios} from '../main'
import {bus} from '../main'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
        components: { VueGoogleAutocomplete },

  data () {
    return {
      searchPlace:'',
     prueba:'Calle 100 #49-97',
     address:''
      
     
    }
    
  },
  methods:{
    pruebas(){
      console.log("entro a prueba");
      console.log(addressData);
    },
    localizar(){
      console.log("enter");
      var dir
      dir=this.text1+', Colombia'
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': dir, country: "CO" }, function(results, status) {
			if (status === 'OK') {
				var resultados = results[0].geometry.location,
					resultados_lat = resultados.lat(),
					resultados_long = resultados.lng();
				
				console.log(results);
			} else {
				var mensajeError = "";
				if (status === "ZERO_RESULTS") {
					mensajeError = "No hubo resultados para la dirección ingresada.";
				} else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
					mensajeError = "Error general del mapa.";
				} else if (status === "INVALID_REQUEST") {
					mensajeError = "Error de la web. Contacte con Name Agency.";
				}
				alert(mensajeError);
			}
		});
    },
    enterfuncion(){
      console.log("entro a enter");
      console.log(this.text1);
      console.log(typeof(this.text1));
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': this.text1}, this.geocodeResult());
      //console.log(geocodeResult);
    },
     geocodeResult(results, status) {
       console.log("entra a geo code");
       console.log(results);
      // Verificamos el estatus
      if (status == 'OK') {
          // Si hay resultados encontrados, centramos y repintamos el mapa
          // esto para eliminar cualquier pin antes puesto
        
      } else {
          // En caso de no haber resultados o que haya ocurrido un error
          // lanzamos un mensaje con el error
          alert("Geocoding no tuvo éxito debido a: " + status);
      }
    },
    update(valor){
      console.log(valor);
     // onchange(this.getAddressData)
    },
     /**
            * When the location found
            * @param {Object} addressData Data of the found location
            * @param {Object} placeResultData PlaceResult object
            * @param {String} id Input container ID
            */
            getAddressData: function (addressData, placeResultData, id) {
                console.log(addressData);
                console.log(placeResultData);
                this.address = addressData;
            }
    },
    mounted: function() {
                  this.$refs.address.focus();

       bus.$on('modalinfo', function (userObject) {
     
        this.algo = userObject.itemsmodal

        console.log(this.algo);
      }.bind(this))
    },
    updated: function(){
     
    },
    beforeCreate: function(){
          ///var vacio = { _id: null, nombre: "Por Favor Seleccione un Cliente" };

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

