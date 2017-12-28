<template>
<!--
<b-container>
    <b-row>
      <b-col md="2">         
      
      </b-col>
      <b-col md="8">
        <b-form class="form-signin center_div">
          <div class="text-a icono" >
            <i class="fa fa-user-o fa-5x icono" aria-hidden="true"></i>
          </div>
          <b-form-group id="exampleInputGroup1"
                    label="ingrese Direccion de Correo:"
                    description="We'll never share your email with anyone else.">
            <b-form-input id="inputEmail"
                      type="email"
                      v-model="correo"
                      required
                      placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup1"
                    label="Ingrese Clave:"
            <b-form-input id="inputPass"
                      type="password"
                      v-model="password"
                      required
                      placeholder="Ingrse clave">
            </b-form-input>
          </b-form-group>
          <b-form  class="form-group">

              <a  v-on:click="autenticar" class="btn btn-lg btn-success btn-block"> <span class="boton">Ingresar</span> </a>
      
          </b-form >
          
         </b-form>
      </b-col>
      <b-col md="2">         
      
      </b-col>
    </b-row>
</b-container>  
-->
<!--
<b-container>
  <div class="form-outer text-center d-flex align-items-center">
    <div class="form-inner">
      <div class="logo text-uppercase">
        <span>ADMIN</span>
      </div>
      <P>LOGIN PARA EL APLICATIVO</P>
      <b-form>
        <b-form-group id="email"
                      label="Email address:"
                      label-for="exampleInput1"
                      description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput1"
                        type="email"
                        v-model="correo"
                        required
                        placeholder="Enter email">
        </b-form-input>
        </b-form-group>
      </b-form>
    </div>
  </div>
</b-container>
-->
<div class="page login-page">
      <div class="container">
        <div class="form-outer text-center d-flex align-items-center">
          <div class="form-inner">
            <div class="logo text-uppercase"><span> Way </span><strong class="text-primary"> Logistic </strong></div>
            <p>Aplicativo para el manejo de procesos logisticos</p>
            <form id="login-form" method="post">
              <div class="form-group">
                <label for="login-username" class="label-custom">User Name</label>
                <input id="login-username" v-model="correo" type="text" name="loginUsername" required="">
              </div>
              <div class="form-group">
                <label for="login-password" class="label-custom">Password</label>
                <input id="login-password" v-model="password" type="password" name="loginPassword" required="">
              </div>
              <a  v-on:click="autenticar" class="btn btn-lg btn-success btn-block"> <span class="boton">Ingresar</span> </a>
              <!-- This should be submit button but I replaced it with <a> for demo purposes-->
            </form>
          </div>
          <div class="copyrights text-center">
            <p>Design by <a href="http://www.waysolutions.co/" class="external">WaySoltions Tecnology</a></p>
            <!-- Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {bus} from '../main'
import {urlservicios} from '../main'

export default {
  data(){
      return{
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
      autenticar: function(){
        if(this.password==''||this.correo==''){
            swal(
              'Oops...',
              'Falto algun campo por completar!',
              'error'
            )
          }else{
        
            //192.168.1.85
            //200.116.52.29
            this.axios.get(urlservicios+"/UsuarioA/"+this.password+"/"+this.correo)
            .then((response) => {
              this.usuario=response.data.objeto;
              console.log(' this.usuario: ',  this.usuario);
              this.estado= response.data.estado;
              console.log('this.estado: ', this.estado);
              if(this.estado){
                localStorage.setItem('storedData', JSON.stringify(this.usuario))
                bus.$emit('login',this.usuario)
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
              //alert(error);
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
              console.log("error de config"+JSON.stringify(error.config));
  
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
