<template>
  <b-container>
    <b-card>
      <b-card-body>
        <b-row>
          <b-input-group class="mb-3">
          <b-form-input v-model="CentroL"
          type="text"
          placeholder="Ingrese el nombre del Centro de Costo">
          </b-form-input>
          <b-btn variant="outline-success" @click="nuevocl">
          <i class="fa fa-plus"></i>
          </b-btn>
        </b-input-group>
        </b-row>
        <b-row>
          <b-table striped hover :items="centrosLogisticos" 
          :fields="fields">
          </b-table>
        </b-row>
        
        

      </b-card-body>
    </b-card>
    <!-- Modal Component -->
    <b-modal id="ModalNuevo" size="lg" ref="ModalNuevo" title="Nuevo Centro Logistico">
      <b-container fluid>
        <b-row class="mb-3">
          <b-col sm="3"><label for="Nnombre">Nombre Centro Logistico</label></b-col>
          <b-col sm="9">
            <b-form-input id="Nnombre" type="text" v-model="ModalNew.nombre"
            :state="statusnombre"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col sm="3"><label for="Ndireccion">Direccion</label></b-col>
          <b-col sm="9"><b-form-input id="Ndireccion" type="text" v-model="ModalNew.direccion"
          :state="statusdireccion"></b-form-input></b-col>
        </b-row>
         <b-row class="mb-3">
          <b-col sm="3"><label for="Nciudad">Ciudad</label></b-col>
          <b-col sm="9"><b-form-input id="Nciudad" type="text" v-model="ModalNew.ciudad"
          :state="statusciudad"></b-form-input></b-col>
        </b-row>
         <b-row class="mb-3">
          <b-col sm="3"><label for="Npais">Pais</label></b-col>
          <b-col sm="9"><b-form-input id="Npais" type="text" v-model="ModalNew.pais"
          :state="statuspais"></b-form-input></b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="float-right" variant="primary" @click="CrearNuevoCL()">
           Guardar
         </b-btn>
         <b-btn size="sm" class="float-left" variant="danger" >
           Cancelar
         </b-btn>
       </div>
    </b-modal>
    <!-- Modal Component -->
    <b-modal id="ModalEditar" ref="ModalEditar" title="Bootstrap-Vue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </b-container>
</template>

<script>
import {urlservicios} from '../main'

export default {
data () {

    return {
      statusciudad:null,
      statusdireccion:null,
      statusnombre:null,
      statuspais:null,
      CentroL:'',
      ModalNew:{
        ciudad:'',
        direccion:'',
        nombre:'',
        pais:''
      },
      ModalEdit:{
        ciudad:'',
        direccion:'',
        nombre:'',
        pais:''
      },
      centrosLogisticos:[],
      fields:[
        { key: 'ciudad', label: 'Ciudad', sortable: false },
        { key: 'nombre', label: 'Nombre', sortable: false },
        { key: 'direccion', label: 'Direccion', sortable: false },
      ] 
    }
},
methods:{
  nuevocl(){
    this.$refs.ModalNuevo.show()
  },
  CrearNuevoCL(){
    console.log("guardo");
    var test2 = localStorage.getItem("storedData");
    var test =JSON.parse(test2);
    var objeto
    var bandera
    objeto=this.ModalNew
    if(objeto.nombre==''){
      this.statusnombre=false
      bandera=false
    }else{
      this.statusnombre=null
    }
    if(objeto.direccion==''){
      this.statusdireccion=false
      bandera=false

    }else{
      this.statusdireccion=null
    }
    if(objeto.ciudad==''){
      this.statusciudad=false
      bandera=false
    }else{
      this.statusciudad=null
    }
    if(objeto.pais==''){
      this.statuspais=false
      bandera=false
    }else{
      this.statuspais=null
    }
    if(bandera===false){
      swal(
        'Debe completar todos los campos',
        'Revise lo anterior',
        'error'
      )
    }
    else{
      var objenvio={
        nombre:objeto.nombre,
        direccion:objeto.direccion,
        ciudad:objeto.ciudad,
        pais:objeto.pais,
        id_operadorlogistico:test.id_OperadorLogistico._id
      }
            console.log(objenvio);

      this.axios.post(urlservicios+"CrearCentrosLogisticos/",objenvio)
                .then((response) => {
                  console.log(response.data);
                })
    }
    
    
  }
},

created: function(){
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente
        id_cliente='null'
        
        this.axios.get(urlservicios+"centroslogisticos/"+test.id_OperadorLogistico._id)
                .then((response) => {
                    console.log(response.data);
                    this.centrosLogisticos=response.data
                })
    }

}
</script>

<style>

</style>
