<template>

  <div class="content-wrapper ">
    <div class="content-heading text-capitalize">
      Bienvenido {{nombreusu}}
    </div>
      <div class="panel panel-default" >
        <h3>
            <strong >Way</strong><strong class="text-primary">Logistic</strong> es un aplicativo para el manejo logistico de su empresa
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
