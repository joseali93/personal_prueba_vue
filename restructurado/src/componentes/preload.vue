<template>
    <div class="center ">
        <img src="https://www.ole.com.ar/static/OLEOleV2/images/loading.gif"  class="imagen ">                        
    </div>
</template>

<script>
export default {

}
</script>

<style> 
.center {
  position: fixed;
  width: 100%;
  height: 100%;
  display: block;
  background-color: gray;
    z-index: 9000;
    opacity : 0.5;
    top: 0;
    bottom: 0;     
}
.imagen{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
