<template >


  <b-container fluid>
    <b-btn @click=jose>
      ads
    </b-btn>
    
   

  </b-container>
</template>

<script>
import {urlservicios} from '../main'
import {bus} from '../main'

export default {
  data () {
    return {

      modal2:true,
      algo:'',
      
        
      items: [
        
         {nmovilizado: 123, cliente: 'Macdonalds'
       },
         {nmovilizado: 123, cliente: '1111111111'
        }
         
        
      ],
     
    }
    
  },
  methods:{
    metodo(){
      console.log("llamo funcion externa");
    },
    jose(){
       var titulo1_inicio='<div><ul>'
       var conten_1=''
       var conten_2
       var titulo1_fin='</ul></div>'
       var prueba
       var total
      console.log(this.items);
      for(var y=0;y<this.items.length;y++){
        conten_1=conten_1+'<li>'+this.items[y].cliente+'</li>'
        console.log(this.items[y].cliente);
        console.log(this.items[y].nmovilizado);
        
      }
      total=titulo1_inicio+conten_1+titulo1_fin
      console.log(total);
        //var titulo= '<ul><li>Coffee</li><li>Coffee</li><li>Coffee</li></ul>'


      swal({
  title: '<i>HTML</i> <u>example</u>',
  type: 'info',
  html: total,
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    'Eliminar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
  'Cancelar',
  cancelButtonAriaLabel: 'Thumbs down',
}).then(()=> {

  this.metodo(); // this should execute now

})
    },
      volver(){
        this.$router.push('/inicio/entradasalida')
      },
      imprimir(){
        console.log("entro a imprimir")
      
          //document.getElementById('app').appendChild(imprimible);
          document.getElementById("print-content");
         window.print()
      }
    },
    mounted: function() {
       bus.$on('modalinfo', function (userObject) {
     
        this.algo = userObject.itemsmodal

        console.log(this.algo);
      }.bind(this))
    },
    updated: function(){
     
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

