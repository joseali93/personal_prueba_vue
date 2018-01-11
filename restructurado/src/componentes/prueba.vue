<template>
<div>
    
    {{productosurl}}
</div>
</template>

<script>
import {urlservicios} from '../main'

export default {
  data () {
    return {
        message: 'holaaa',
        productosurl:''
    }
  },
    mounted: function() {
      this.axios
      .get(
        urlservicios+"/Concepto/10/5a2052ea6535d593c73c815c" 
      )
      .then(response => {
        this.productosurl = response.data;
        //console.log(this.productosurl);
      });
    },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<!-- accordion-1.vue -->
