<template>
  <b-container>
    <b-card title="Configuracion de Centros de Costo"
    sub-title="Se permite la creacion y edicion de los centros de costo">
      <b-card-body>

        <b-form-select v-model="Cliente" class="mb-3"  
        :options="clientes" text-field="nombre" value-field="_id" @input="SelectedClient()">  
        </b-form-select>

        <b-input-group class="mb-3">
          <b-form-input v-model="Centro"
          type="text"
          placeholder="Ingrese el nombre del Centro de Costo">
          </b-form-input>
          <b-btn variant="outline-success" v-show="Centro!=''&&Cliente!=null" @click="nuevocc">
          <i class="fa fa-plus"></i>
          </b-btn>
        </b-input-group>

      <b-table striped hover :items="CentrosTabla"
      :fields="fields" :filter="Centro" >
      <template slot="editar" slot-scope="data">
      <i class="btn btn-success fa fa-pencil" @click="editar(data)"></i>
      </template>
      <template slot="nombre" slot-scope="data">
      <label class="text-capitalize">{{data.item.nombre}}</label>
      </template>

      </b-table>

      </b-card-body>
    </b-card>
    <!-- Modal Component -->
    <b-modal id="modalNuevo" ref="modalNuevo" size="lg" title="Bootstrap-Vue">
      <b-container fluid>
        <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite nombre del Centro de Costo"
                label="Nombre"
                label-for="nombreCentroC">
                    <b-form-input id="nombreCentroC" v-model="ModalNew.nombre"
                    :state="statusnombre"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite direccion del Centro de Costo"
                label="Direccion Centro de Costo"
                label-for="direccionCC">
                    <b-form-input id="direccionCC" v-model="ModalNew.direccion"
                    :state="statusdireccion"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite la descripcion del Centro de Costo"
                label="Descripcion"
                label-for="descripcionCC">
                <b-form-textarea id="descripcionCC"
                     v-model="ModalNew.descripcion"
                     placeholder="Ingrese la descripcion del centro de costo"
                     :rows="3"
                     :max-rows="6"
                     :state="statusdescripcion">
                </b-form-textarea>      
          </b-form-group>
      </b-container>
      <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="float-right" variant="primary" @click="crearcentrocosto()">
           Guardar
         </b-btn>
         <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
           Cancelar
         </b-btn>
       </div>
    </b-modal>
    <!-- Modal Component -->
    <b-modal id="modalEditar" ref="modalEditar" size="lg" title="Bootstrap-Vue">
        <b-container fluid>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite nombre del Centro de Costo"
                label="Nombre"
                label-for="nombreCentroC">
                    <b-form-input id="nombreCentroC" v-model="ModalEdit.nombre"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite direccion del Centro de Costo"
                label="Direccion Centro de Costo"
                label-for="direccionCC">
                    <b-form-input id="direccionCC" v-model="ModalEdit.direccion"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite la descripcion del Centro de Costo"
                label="Descripcion"
                label-for="descripcionCC">
                <b-form-textarea id="descripcionCC"
                     v-model="ModalEdit.descripcion"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>      
          </b-form-group>
        </b-container>
        <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="float-right" variant="primary" @click="actualizar()">
           Guardar
         </b-btn>
         <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
           Cerrar
         </b-btn>
       </div>
    </b-modal>

  </b-container>
</template>

<script>

import {urlservicios} from '../main'

export default {

     data () {

    return {

        Cliente: null,
        clientes:{},
        Centro:'',
        CentrosTabla:[],
        fields:[
          { key: 'editar', label: 'Editar', sortable: false },
          { key: 'nombre', label: 'Nombre', sortable: false },
          { key: 'direccion', label: 'Direccion', sortable: false },

        ],
        ModalEdit:{},
        ModalNew:{
          nombre:'',
          direccion:'',
          descripcion:''
        },
        statusnombre:null,
        statusdireccion:null,
        statusdescripcion:null
    }    
    },
    methods:{
      nuevocc(){
        console.log("entro a nuevo cc");
        console.log();
        this.ModalNew.nombre=this.Centro
        this.$refs.modalNuevo.show()
      },
      crearcentrocosto(){
        var bandera= true
        if(this.ModalNew.nombre=='')
        {
          bandera=false
          this.statusnombre=false
        }else{
          this.statusnombre=null
        }
        if(this.ModalNew.direccion=='')
        {
          bandera=false
          this.statusdireccion=false
        }else{
          this.statusdireccion=null

        }
        if(this.ModalNew.descripcion==''){
          bandera=false
          this.statusdescripcion=false
        }else{
          this.statusdescripcion=null

        }
        if(bandera==false){
          swal(
                'Upps!',
                'Debe completar todos los campos',
                'error'
                )
        }
        else{
        console.log(this.ModalNew);
        console.log(this.Cliente);
        var objeto ={
          id_cliente:this.Cliente,
          nombre:this.ModalNew.nombre,
          descripcion:this.ModalNew.descripcion,
          direccion:this.ModalNew.direccion
        }
        console.log(objeto);
        this.axios.post(urlservicios+"CreacionCentrosCostos/",objeto)
                .then((response) => {
                    console.log(response);
                    if(response.data.validar==true)
                    {
                        swal({
                        title: 'Actualizado Exitosamente',
                        timer: 1500,
                        type:'success'})
                        this.CentrosTabla.push(response.data.centro)
                        this.$refs.modalNuevo.hide()

                    }else{
                         swal({
                        title: 'No se pudo actualizar',
                        timer: 1000,
                        type:'error'})
                    }
                    
                })

        }
      },
      cerrarModal(){
        this.ModalNew.nombre=''
        this.ModalNew.descripcion=''
        this.ModalNew.direccion=''
        
        this.$refs.modalEditar.hide()
        this.$refs.modalNuevo.hide()
      },
      actualizar(){
        console.log("entro a actualizar");
        console.log(this.ModalEdit);
        

        this.axios.post(urlservicios+"ActualizarCentroCostos/"+this.ModalEdit._id,this.ModalEdit)
                .then((response) => {
                  if(response.data.validar==true)
                    {
                        swal({
                        title: 'Actualizado Exitosamente',
                        timer: 1500,
                        type:'success'})
                        this.$refs.modalEditar.hide()

                    }else{
                         swal({
                        title: 'No se pudo actualizar',
                        timer: 1000,
                        type:'error'})
                    }
                })
        //this.$refs.modalEditar.hide()

      },
      editar(value){
        console.log("entro a editar");
        console.log(value.item);
        this.ModalEdit=value.item
        this.$refs.modalEditar.show()
      },
        SelectedClient(){
          if(this.Cliente==null)
          {
            console.log("no hago peticion");
            this.CentrosTabla=[]
          }
          else
          {
            this.axios.get(urlservicios+"CentrosPorCliente/"+this.Cliente)
                        .then((response) => {
                          this.CentrosTabla=response.data  
                        })
          }
           
        }
    },
    created: function(){
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Cliente' };

        id_cliente='null'
        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico+'/'+id_cliente)
                .then((response) => {
                    this.clientes=response.data
                    this.clientes.unshift(vacio)
                })
    }

}
</script>

<style>

</style>
