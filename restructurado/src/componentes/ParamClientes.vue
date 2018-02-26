<template>
    <b-container>
        <b-card title="Configuracion de Clientes"
                sub-title="Se permite la creacion y edicion de los clientes">
            <b-card-body>
                <b-btn variant="outline-success" class="mb-3 float-right" @click="ClienteNuevo()">
                        <i class="fa fa-plus"></i>
                        
                </b-btn>
                <b-btn variant="outline-success" class="mb-3 float-right" @click="refrescarClientes()">
                    <i class="fa fa-refresh"></i>
                        
                </b-btn>
                <b-input-group>
                    <b-form-input v-model="Cliente"
                        type="text"
                        placeholder="Ingrese el Nombre del Cliente">
                    </b-form-input>
                    <!--
                    <b-btn variant="outline-success" v-show="Cliente!=''" @click="ClienteNuevo()">
                        <i class="fa fa-plus"></i>
                    </b-btn>
                    -->
                </b-input-group>
                <b-table responsive :items="ClientesTabla" :fields="fields"
                 :filter="Cliente"
                 class="my-2">
                    <template slot="editar" slot-scope="data">
                        <i class="btn btn-success fa fa-pencil" @click="editar(data)"></i>
                    </template>
                    <template slot="nombre" slot-scope="data">
                        {{data.item.nombre}}
                    </template>
                    <template slot="direccion" slot-scope="data">
                        {{data.item.direccion}}
                    </template>
                    <template slot="nit" slot-scope="data">
                        {{data.item.nit}}
                    </template>
                    <template slot="correo" slot-scope="data">
                        {{data.item.correo}}
                    </template>

                </b-table>
            </b-card-body>
        </b-card>

        <!-- Modal Component -->
        <b-modal id="modalNuevo" size="lg" ref="modalNuevo" title="Crear Clientes">
            <b-container fluid>
                <b-form-group id="nombre"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite nombre Cliente"
                    label="Cliente"
                    label-for="nombreCliente">
                    <b-form-input id="nombreCliente" v-model="ModalNew.nombre"
                    :state="statusnombre"></b-form-input>
                </b-form-group>
                <b-form-group id="direccion"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite direccion del Cliente"
                    label="Direccion Cliente"
                    label-for="direccionCliente">
                    <b-form-input id="direccionCliente" v-model="ModalNew.direccion"
                    :state="statusdireccion"></b-form-input>
                </b-form-group>
                <b-form-group id="telefono"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite telefono del Cliente"
                    label="Telefono"
                    label-for="telefono">
                    <b-form-input id="telefono" v-model="ModalNew.telefono"
                    :state="statusdireccion"></b-form-input>
                </b-form-group>
                <b-form-group id="empresa"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite nombre de la Empresa a la que pertenece"
                    label="Empresa"
                    label-for="empresa">
                    <b-form-input id="empresa" v-model="ModalNew.empresa"
                    :state="statusempresa"></b-form-input>
                </b-form-group>
                <b-form-group id="nit"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite el NIT de la compañia"
                    label="NIT"
                    label-for="nitEmpresa">
                    <b-form-input id="nitEmpresa" v-model="ModalNew.nit"
                    :state="statusnit"></b-form-input>
                </b-form-group>
                <b-form-group id="email"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite el correo de contacto"
                    label="Correo Electronico"
                    label-for="emailContacto">
                    <b-form-input id="emailContacto" v-model="ModalNew.correo"
                    @input="validacorreo" :state="statusCorreo"></b-form-input>
                </b-form-group>
           </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="adicionarCliente()">
                Guardar
                </b-btn>
                <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component -->
        <b-modal id="modalEditar" size="lg" ref="modalEditar" title="Editar Clientes">
           <b-container fluid>
               <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite nombre Cliente"
                label="Cliente"
                label-for="nombreCliente">
                    <b-form-input id="nombreCliente" v-model="ModalEdit.nombre"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite direccion del Cliente"
                label="Direccion Cliente"
                label-for="direccionCliente">
                    <b-form-input id="direccionCliente" v-model="ModalEdit.direccion"></b-form-input>
                </b-form-group>
                <b-form-group id="telefono"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Digite telefono del Cliente"
                    label="Telefono"
                    label-for="telefono">
                    <b-form-input id="telefono" v-model="ModalEdit.telefono"
                    :state="statusdireccion"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite nombre de la Empresa a la que pertenece"
                label="Empresa"
                label-for="empresa">
                    <b-form-input id="empresa" v-model="ModalEdit.empresa"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite el NIT de la compañia"
                label="NIT"
                label-for="nitEmpresa">
                    <b-form-input id="nitEmpresa" v-model="ModalEdit.nit"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Digite el correo de contacto"
                label="Correo Electronico"
                label-for="emailContacto">
                    <b-form-input id="emailContacto" v-model="ModalEdit.correo"></b-form-input>
                </b-form-group>
           </b-container>
           <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="actualizarCliente()">
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
        statusnombre:null,
        statusdireccion:null,
        statusempresa:null,
        statusnit:null,
        statusCorreo: null,
        Cliente: '',
        ClientesTabla:[],
        fields: [
          { key: 'editar', label: 'Editar', sortable: false },
            { key: 'nombre', label: 'Nombre Cliente', sortable: true },
            { key: 'direccion', label: 'Direccion Cliente', sortable: false },
            { key: 'nit', label: 'NIT', sortable: false },
            { key: 'telefono', label: 'Telefono Contacto', sortable: false },
            { key: 'empresa', label: 'Empresa', sortable: false },
            { key: 'correo', label: 'Correo Contacto', sortable: false },    
        ],
        ModalEdit:{},
        ModalNew:{
            nombre:'',
            direccion:'',
            empresa:'',
            nit:'',
            correo:'',
            telefono:''
        }
    }    
    },
    methods:{
        refrescarClientes(){
           var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            var id_cliente
            id_cliente='null'
            this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico+'/'+id_cliente)
                    .then((response) => {
                        //console.log(response);
                        this.ClientesTabla=response.data
                    }) 
        },
        actualizarCliente(){
            //console.log("entro a actualizar cliente");
            console.log(this.ModalEdit);
            var objeto ={
                nombre:this.ModalEdit.nombre,
                direccion:this.ModalEdit.direccion,
                nit:this.ModalEdit.nit,
                telefono:this.ModalEdit.telefono,
                empresa:this.ModalEdit.empresa,
                correo:this.ModalEdit.correo
            }
             this.axios.post(urlservicios+"ActulizarCliente/"+this.ModalEdit._id,objeto)
                .then((response) => {
                    console.log(response);
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
            
        },
        validacorreo(value){
           if(value.length==0){
               return(this.statusCorreo=false)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {   
                return (this.statusCorreo=true)
            }
                return (this.statusCorreo=false)
            

       },
        adicionarCliente(){
            var bandera=true
            if(this.ModalNew.nombre==''){
                this.statusnombre=false
                bandera=false
            }
            else{
                this.statusnombre=null
   
            }
            if(this.ModalNew.direccion==''){
                this.statusdireccion=false
                bandera=false
            }
            else{
                this.statusdireccion=null
            }
            if(this.ModalNew.empresa==''){
                this.statusempresa=false
                bandera=false
            }
            else{
                this.statusempresa=null
            }
            if(this.ModalNew.nit==''){
                this.statusnit=false
                bandera=false
            }
            else{
                this.statusnit=null
            }
            if(this.ModalNew.correo==''){
                this.statusCorreo=false
                bandera=false
            }
            if(bandera==false){
                swal(
                'Upps!',
                'Debe completar todos los campos',
                'error'
                )
            }
            else{
                console.log("hacemos peticion");
                var test2 = localStorage.getItem("storedData");
                var test =JSON.parse(test2);        
                var objeto={
                    nombre:this.ModalNew.nombre,
                    correo:this.ModalNew.correo,
                    empresa:this.ModalNew.empresa,
                    direccion:this.ModalNew.direccion,
                    telefono:this.ModalNew.telefono,
                    nit:this.ModalNew.nit,
                    id_OperadorLogistico:test.id_OperadorLogistico

                }
                this.axios.post(urlservicios+"GuardarCliente", objeto)
                        .then(response => {
                           
                            if(response.data.creado===true)
                            {
                                this.ClientesTabla.push(response.data.orden)
                                swal(
                                'Creado Correctamente!',
                                'Cliente Creado Correctamente',
                                'success'
                                )
                                this.$refs.modalNuevo.hide()

                            }
                            else
                            {
                                swal(
                                'Upps!',
                                'Ya existe un cliente con esas caracteristicas',
                                'error'
                                )                             
                            }
                        })
            
            }
        },
        ClienteNuevo(){
            //this.ModalNew.nombre=this.Cliente
            this.$refs.modalNuevo.show()
        },
        cerrarModal(){
            this.statusnombre=null,
            this.statusdireccion=null,
            this.statusempresa=null,
            this.statusnit=null,
            this.statusCorreo= null,
            this.ModalNew.nombre=''
            this.ModalNew.direccion=''
            this.ModalNew.empresa=''
            this.ModalNew.nit=''
            this.ModalNew.correo=''

            
            this.$refs.modalEditar.hide()
            this.$refs.modalNuevo.hide()
        
        },
        editar(value){
            console.log("entro a editar");
            console.log(value.item);
            this.ModalEdit=value.item
            this.$refs.modalEditar.show()
        }
    },
    created: function(){
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente
        id_cliente='null'
        
        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico+'/'+id_cliente)
                .then((response) => {
                    //console.log(response);
                    this.ClientesTabla=response.data
                })
    }

}
</script>

<style>

</style>
