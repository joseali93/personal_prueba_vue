<template>
<div>
   <b-btn v-b-toggle.myCollapse>
  <span class="when-opened">Close</span>
  <span class="when-closed">Open</span>
  My Collapse
</b-btn>
<b-collapse id="myCollapse">
  <!-- content here -->
  <p>algoasdasd asda</p>
</b-collapse>



<b-btn @click="showCollapse = !showCollapse"
           :class="showCollapse ? 'collapsed' : null"
           aria-controls="collapse4"
           :aria-expanded="showCollapse ? 'true' : 'false'">
      Toggle Collapse
    </b-btn>
    <b-collapse class="mt-2" v-model="showCollapse" id="collapse4">
      <b-card>
        I should start open!
      </b-card>
    </b-collapse>
</div>
</template>

<script>
import {urlservicios} from '../main'

export default {
  data () {
    return {
            showCollapse: true,

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
<style >
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>

<!-- accordion-1.vue -->
