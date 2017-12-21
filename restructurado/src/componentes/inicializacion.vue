<template>
  <div class="col">
                    <ul class="nav nav-tabs small" role="tablist">
                       <!-- <li class="nav-item"><a class="nav-link text-uppercase active" data-toggle="tab" href="#tab1" role="tab"></a></li>
                        -->
                    </ul>
                    <div class="tab-content py-3">
                        <div class="tab-pane active" id="tab1" role="tabpanel">
                            <h1 class="text-capitalize">Bienvenido {{nombreusu}}</h1>
                            
                            <span class="anchor" id="sec1"></span>
                            
                        </div>
                        
                        
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
