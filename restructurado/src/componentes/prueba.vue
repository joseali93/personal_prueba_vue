<template>
<div>
     <p>Original message: "{{ message }}"</p>
     <input type="text" v-model="message">
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
</template>

<script>
export default {
  data () {
    return {
        message: 'holaaa'
    }
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
