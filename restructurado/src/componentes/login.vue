<template>
<!-- Contenedor para el Login-->
<div class="page login-page">
      <div class="container">
        <div class="form-outer text-center d-flex align-items-center">
          <div class="form-inner">
            <div class="logo text-uppercase"><span> Way </span><strong class="text-primary"> Logistic </strong></div>
            <p>Aplicativo para el manejo de procesos logisticos</p>
            <form id="login-form" method="post">
              <div class="form-group">
                <label for="login-username">Correo Electronico</label>
                <b-form-input v-model="correo"
                  autocomplete
                  id="login-username"
                  :state="estadoT"
                  type="text"
                  @input="ValidarCorreo"
                  placeholder="Ingrese su Correo Electronico"></b-form-input>                
              </div>
              <div class="form-group">
                <label for="login-password">Contraseña</label>
                 <b-form-input v-model="password"
                  id="login-password"
                  type="password"
                  autocomplete
                  
                  placeholder="Ingrese su contraseña"
                  :state="estadoClave"
                  @input="ValidarClave"
                  v-b-popover.hover="'Debe contener letras o numeros unicamente'" title="Estructura Valida"
                  ></b-form-input> 
              </div>
              <a  v-on:click="autenticar" class="btn btn-lg btn-success btn-block"> <span class="boton">Ingresar</span> </a>
            </form>
          </div>
          <div class="copyrights text-center">
            <p>Design by <a href="http://www.waysolutions.co/" class="external">WaySoltions Tecnology</a></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//Se inportan lo necesario el bus de servicios y la url de servicios
import {bus} from '../main'
import {urlservicios} from '../main'

export default {
  data(){
      return{
        estadoClave:null,
        estadoT:null,
        usuario: '',
        correo: '',
        password: '',
        estado: '',
        msg: '',
      usuario: {
        
      },
      }
  },
  methods:{  
    ValidarCorreo: function(value){
      if(value.length==0){
               return(this.estadoT=null)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {   
                return (this.estadoT=true)
            }
                return (this.estadoT=false)
        
    }, 
     ValidarClave: function(value){
      if(value.length==0){
               return(this.estadoClave=null)
           }
           if (/^[-_\w\.]+$/i.test(value))
            {   
                return (this.estadoClave=true)
            }
                return (this.estadoClave=false)
        
    }, 
      autenticar: function(){
       
        if(this.password==''||this.correo=='' ||this.estadoT==false
          ||this.estadoClave==false){
            if(this.estadoClave==false){
              swal(
              'Oops...',
              'La clave no cumple los formatos establecidos!',
              'error'
              )
            }
            if(this.estadoT==false){
              swal(
              'Oops...',
              'El correo no cumple los formatos establecidos!',
              'error'
              )
            }
            else{
              swal(
              'Oops...',
              'Falto algun campo por completar!',
              'error'
            )
            }
            
          }else{
            
            /*
              Se realiza la validacion de los servicios 
              usando un password y correo para el login
            */
            //urlservicios
            var algo='/routes/usuario/'
            var objetoLogin={
                password:this.password,
                correo:this.correo
            }
            console.log(objetoLogin);
           console.log(urlservicios+"/UsuarioA/"+this.password+"/"+this.correo);
            this.axios.get(urlservicios+"UsuarioA/"+this.password+"/"+this.correo)
            .then((response) => {
              console.log(response);
              console.log(response.status);
              
              this.usuario=response.data.objeto;
              //console.log(' this.usuario: ',  this.usuario);
              this.estado= response.data.estado;
              //console.log('this.estado: ', this.estado);
              if(this.estado){
                localStorage.setItem('storedData', JSON.stringify(this.usuario))
                localStorage.setItem('servidor', JSON.stringify(response.data.servidor))
                //localStorage.setItem('puerto', JSON.stringify(response.data.puerto))
                //bus.$emit('login',this.usuario)
                this.$router.replace('/inicio')

              }else{
                this.msg=response.data.message
                swal(
                  'Oops...',
                  ''+this.msg,
                  'error'
                )     
                this.correo ='',
                this.password= ''    
                 }
                 
            }).catch(function(error){
                console.log(JSON.stringify(error));
                console.log(error.response);
                /*
                if(error.response.status==401)
                {
                    console.log("no esta autorizado");
                     swal(
                    'Oops...',
                    'Usuario o Contraseña incorrectos',
                    'warning'
                  )     
                }
                if(error.response.status==500)
                {
                    console.log("no esta autorizado");
                }
                */
                
              if(error.response){
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx    
                swal(
                    'Oops...',
                    'El servidor nos dice  '+error.response.data,
                    'error'
                  ) 
              }else if(error.request){
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                  swal(
                    'Oops...',
                    'El servidor nos dice  '+error,
                    'error'
                  ) 
              }else{
                swal(
                    'Oops...',
                    'El servidor nos dice  '+error.message,
                    'error'
                  )                 
              }
              //console.log("error de config"+JSON.stringify(error.config));
                
            })

          }
      }
  }, 

  }
</script>

<style>
.body{
  background-color: #eee;
  margin-top: 100px;
  }

   
.icono {
      margin: auto;
    width: 60%;
    padding: 10px;
    width:180px; 
    line-height: 180px;     
    text-align: center;
}
.form-actions {
    margin: 0;
    background-color: transparent;
    text-align: center;
}
.boton{
  color: white
}
.bn{
  margin-top: 15px;
}
</style>
