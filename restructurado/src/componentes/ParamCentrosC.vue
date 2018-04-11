<template>
  <b-container>
    <b-card title="Configuración de Centros de Costo"
    sub-title="Se permite la creación y edición de los centros de costo">
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
    <!-- Modal Crear Centro logistico -->
    <b-modal id="modalNuevo" ref="modalNuevo" size="lg" >
      <b-container fluid>
        <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite nombre del Centro de Costo"
                label="Nombre"
                label-for="nombreCentroC">
                    <b-form-input id="nombreCentroC" v-model="ModalNew.nombre"
                    :state="statusnombre"
                    maxlength="100"
                    @input="ValidarTexto('nombreCentroC','nuevo')"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite dirección del Centro de Costo"
                label="Dirección Centro de Costo"
                label-for="direccionCC">
                    <b-form-input id="direccionCC" v-model="ModalNew.direccion"
                    :state="statusdireccion"
                    maxlength="100"
                     @input="ValidarTexto('direccionCC','nuevo')"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite la descripción del Centro de Costo"
                label="Descripción"
                label-for="descripcionCC">
                <b-form-textarea id="descripcionCC"
                     v-model="ModalNew.descripcion"
                     placeholder="Ingrese la descripción del centro de costo"
                     :rows="3"
                     :max-rows="6"
                     :state="statusdescripcion"
                     maxlength="400"
                     @input="ValidarTexto('descripcionCC','nuevo')">
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
    <!-- Modal Editar Centro Costo -->
    <b-modal id="modalEditar" ref="modalEditar" size="lg" >
        <b-container fluid>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite nombre del Centro de Costo"
                label="Nombre"
                label-for="nombreCentroCED">
                    <b-form-input id="nombreCentroCED" v-model="ModalEdit.nombre"
                    :state="statusnombre"
                     maxlength="100"
                     @input="ValidarTexto('nombreCentroCED','editar')"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite dirección del Centro de Costo"
                label="Dirección Centro de Costo"
                label-for="direccionCCED">
                    <b-form-input id="direccionCCED" v-model="ModalEdit.direccion"
                    :state="statusdireccion"
                    maxlength="100"
                     @input="ValidarTexto('direccionCCED','editar')"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite la descripción del Centro de Costo"
                label="Descripción"
                label-for="descripcionCCED">
                <b-form-textarea id="descripcionCCED"
                     v-model="ModalEdit.descripcion"
                     :state="statusdescripcion"
                     placeholder="Digite la descripción del Centro de Costo"
                     :rows="3"
                     :max-rows="6"
                     maxlength="400"
                     @input="ValidarTexto('descripcionCCED','editar')">
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
        indice:null,
        Cliente: null,
        clientes:{},
        Centro:'',
        CentrosTabla:[],
        fields:[
          { key: 'editar', label: 'Editar', sortable: false },
          { key: 'nombre', label: 'Nombre', sortable: false },
          { key: 'direccion', label: 'Dirección', sortable: false },

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
      ValidarTexto(id,accion){
            var key,tecla,tecla_especial,letras,especiales
            var e = document.getElementById(eval('id')).value;
            ////console.log(id);
           
            if(accion=='nuevo')
            {
                    if(id=='direccionCC')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        
                        if(e.length>=100){
                            this.statusdireccion=false
                        }
                        else{
                            this.statusdireccion=null
                        }
                    }
                    else{
                        this.statusdireccion=false
                    }
                }
                if(e.match(/^[0-9a-zA-Z\s\-]*$/)){
                    if(id=='nombreCentroC')
                    {
                        if(e.length>100){
                            this.statusnombre=false
                        }
                        else{
                            this.statusnombre=null
                        }
                    }
                
                    if(id=='descripcionCC')
                    {
                        if(e.length>400){
                            this.statusdescripcion=false
                        }
                        else{
                            this.statusdescripcion=null
                        }
                    }
                }
                else{
                    if(id=='nombreCentroC')
                    {
                        this.statusnombre=false
                    }
                
                    if(id=='descripcionCC')
                    {
                        this.statusdescripcion=false
                    }

                }
            }
            if(accion=='editar')
            {
                if(id=='nombreCentroCED'){
                    if(this.ModalEdit.nombre.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.ModalEdit.nombre.length>=100){
                            this.statusnombre=false
                        }
                        else{
                            this.statusnombre=null
                        }
                    }
                    else{
                        if(id=='nombreCentroCED')
                        {
                            this.statusnombre=false
                        }
                    }
                }
                if(id=='direccionCCED'){

                    if(this.ModalEdit.direccion.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        //console.log("coincide");
                        if(this.ModalEdit.direccion.length>=100){
                            this.statusdireccion=false
                        }
                        else{
                            this.statusdireccion=null
                        }
                    }
                    else{
                        this.statusdireccion=false
                    }
                }
                if(id=='descripcionCCED'){
                    if(this.ModalEdit.descripcion.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.ModalEdit.descripcion.length>=400){
                            this.statusdescripcion=false
                        }
                        else{
                            this.statusdescripcion=null
                        }
                    }
                    else{
                        if(id=='empresaED')
                        {
                            this.statusdescripcion=false
                        }
                    }
                }

            }
            
            
      },
      nuevocc(){
        console.log("entro a nuevo cc");
        console.log();
        this.ModalNew.nombre=this.Centro
        this.$refs.modalNuevo.show()
      },
      crearcentrocosto(){
        var bandera= true
        if (
          this.ModalNew.nombre == "" ||
          this.ModalNew.direccion == "" ||
          this.ModalNew.ciudad == "" ||
          this.ModalNew.pais == ""
        ) {
          if (this.ModalNew.nombre == "") {
            this.statusnombre = false;
          }
          if (this.ModalNew.direccion == "") {
            this.statusdireccion = false;
          }
          if (this.ModalNew.ciudad == "") {
            this.statusciudad = false;
          }
          if (this.ModalNew.pais == "") {
            this.statuspais = false;
          }
          swal(
            "Error!",
            "Para Actualizar deben estar completos todos los campos",
            "error"
          );
        }
        if( this.statusnombre==false||
          this.statusdireccion==false||
          this.statuspais==false||
          this.statusciudad==false){
          swal(
            'Error!',
            'Para la Creación debe cumplirse el formato establecido',
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
                        title: 'Creado Exitosamente',
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
        //this.ModalEdit={}
        this.$refs.modalEditar.hide()
        this.$refs.modalNuevo.hide()
      },
      actualizar(){
        if(this.ModalEdit.nombre==''||
                this.ModalEdit.direccion==''||
                this.ModalEdit.descripcion==''
               ){
                    if(this.ModalEdit.nombre==''){
                        this.statusnombre=false
                    }
                    if(this.ModalEdit.direccion==''){
                        this.statusdireccion=false
                    }
                    if(this.ModalEdit.descripcion==''){
                        this.statusdescripcion=false
                    }
                    
                    swal(
                    'Error!',
                    'Para Actualizar deben estar completos todos los campos',
                    'error'
                    )
            }
            if(this.statusnombre==false||
            this.statusdireccion==false||
            this.statusdescripcion==false
           ){
                //console.log("alguno no cumple formato");
                 swal(
                    'Error!',
                    'Para Actualizar debe cumplirse el formato establecido',
                    'error'
                    )
            }
            else{
               console.log("entro a actualizar");
                console.log(this.ModalEdit);
                

                this.axios.post(urlservicios+"ActualizarCentroCostos/"+this.ModalEdit._id,this.ModalEdit)
                        .then((response) => {
                          console.log(response.data);
                          if(response.data.validar==true)
                            {
                                swal({
                                title: 'Actualizado Exitosamente',
                                timer: 1500,
                                type:'success'})
                                this.CentrosTabla.splice(this.indice, 1);
                                this.CentrosTabla.splice(this.indice, 0, this.ModalEdit);
                                this.$refs.modalEditar.hide()

                            }else{
                                swal({
                                title: 'No se pudo actualizar',
                                timer: 1000,
                                type:'error'})
                            }
                        })
                //this.$refs.modalEditar.hide()
            }
       

      },
      editar(value){
        console.log("entro a editar");
        console.log(value.item);
        this.indice=value.index
        this.ModalEdit=Object.assign({},value.item)
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
        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+id_cliente)
                .then((response) => {
                    this.clientes=response.data
                    this.clientes.unshift(vacio)
                })
    }

}
</script>

<style>

</style>
