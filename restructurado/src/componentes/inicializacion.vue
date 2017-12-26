<template>
  <div class="content-wrapper ">
      <div class="panel panel-default  text-capitalize" >
        <h3>
            Bienvenido {{nombreusu}}
            <hr>
            <small>Aplicativo para manejo de operaciones logisticas</small>
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

</style>
