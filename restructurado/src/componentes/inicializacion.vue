<template>
   <b-container fluid class="contenedorTotal">
      <div >
         <b-breadcrumb :items="items" />
      </div>
       <b-container fluid>
         <header class="content-heading text-capitalize">
            Bienvenido {{nombreusu}}
         </header>
         <b-row>
           <h3>
            <strong >Way</strong><strong class="text-primary">Logistic</strong> es un aplicativo para el manejo logístico de su empresa
        </h3>
         </b-row>
       </b-container>
   </b-container>


</template>

<script>
export default {
 props: ['nombreusu'],
  data() {
    return {
      items: [
        {
          text: "Inicio",
          to: "/inicio"
        }
        
      ],
    }
  }
}
</script>

<style>
.panel.panel-default{
  padding: 5%
}
</style>
