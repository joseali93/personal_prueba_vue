<template>

  <div class="content-wrapper ">
    <div class="content-heading text-capitalize">
      Bienvenido {{nombreusu}}
    </div>
      <div class="panel panel-default  text-capitalize" >
        <h3>
            Este es un aplicativo para manejo de operaciones logisticas
        </h3>
      </div>
    </div>
</template>

<script>
export default {
 props: ['nombreusu']
}
</script>

<style>
.panel.panel-default{
  padding: 5%
}
</style>
