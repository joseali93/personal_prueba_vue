<template>

    <b-container fluid class="contenedorTotal">
    <div class="breadcrumb-holder">
      <div class="container-fluid">
        <b-breadcrumb :items="items" />
        <!-- <ul class="breadcrumb">
          <li v-for="(item, i) in items" :key="i" class="breadcrumb-item">
            <a :href="item.to">{{item.text}}</a>
          </li>
        </ul> -->
      </div>
    </div>

        <b-container fluid>
            <b-card class="border mt-2" no-body header="Primary" header-bg-variant="primary">
              <h3 slot="header" class="mb-0 encabezado">Usuarios</h3>
                <b-card-body>
                    <b-row>
                        <b-col md="2" offset-md="10">
                          <div class="float-right mb-3">
                            <b-btn variant="outline-success" @click="UsuarioNuevo()">
                              <i class="fa fa-plus"></i>
                            </b-btn>
                            <b-btn variant="outline-success" @click="refrescarUsuarios()">
                              <i class="fa fa-refresh"></i>
                            </b-btn>
                          </div>
                        </b-col>
                    </b-row>

                    <b-form-group id="fieldsetHorizontal"
                                    horizontal
                                    :label-cols="4"
                                    breakpoint="md"
                                    description="Filtrara del listado de usuarios existentes"
                                    label="Buscar Usuario "
                                    label-for="inputHorizontal">
                        <b-form-input   id="inputHorizontal"
                                        v-model="usuario"
                                        placeholder="Nombre del Usuario"

                                        ></b-form-input>
                    </b-form-group>

                   
                </b-card-body>
               
            </b-card>
            <b-card class="border mt-2" no-body header="Primary" header-bg-variant="primary">
                <h3 slot="header" class="mb-0 encabezado">Usuarios</h3>
                    <b-card-body>
                        <b-table responsive fixed :items="UsuariosTabla" :fields="fields"
                            :current-page="currentPage" :per-page="5"
                            class="my-2">
                                <template slot="editar" slot-scope="data">
                                    <i class="btn btn-success fa fa-pencil" @click="EditarUsuario(data)"></i>
                                </template>
                                <template slot="nombre" slot-scope="data">
                                    {{data.item.nombre}} {{data.item.apellido}}
                                </template>
                                
                                <template slot="tipo" slot-scope="data">
                                    {{data.item.tipo}}
                                </template>
                                <template slot="numero_identificacion" slot-scope="data">
                                    {{data.item.numero_identificacion}}
                                </template>
                                <template slot="correo" slot-scope="data">
                                    {{data.item.correo}}
                                </template>
                        </b-table>
                        <b-pagination size="md" :total-rows="UsuariosTabla.length" v-model="currentPage" :per-page="5">
                        </b-pagination>
                    </b-card-body>
            </b-card>
        </b-container>

        <!-- Modal Create Component -->
        <b-modal id="modal1" ref="Crear" size="lg" no-close-on-backdrop
         no-close-on-esc title="Bootstrap-Vue">
            <div slot="modal-header"
            class="w-100">
                <b-btn class="rounded text-white"
                    variant="danger"
                    @click="hideModal">
                    <i class="fa fa-times-circle"
                        aria-hidden="true"></i>&#32;Cancelar
                </b-btn>
                <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="actualizar()">
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
            </div>
            <div slot="modal-footer"
            class="w-100">
            </div>
                <b-container fluid>
                    <b-row class="mb-1">
                        <b-col>
                            <v-select v-model="tipoUsu" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="options" @input="tipoUsuario()"></v-select>
                        </b-col>
                    </b-row>
                    <b-row class="w-100" v-show="admin">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Administrador"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre:"
                                                label-class="text-sm-right"
                                                label-for="Nombre1">
                                    <b-form-input id="Nombre1"
                                        v-model="usu.nombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido:"
                                                label-class="text-sm-right"
                                                label-for="Apellido1">
                                    <b-form-input id="Apellido1"
                                    v-model="usu.apellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent1">
                                    <b-form-input id="numIdent1" v-model="usu.numero_identificacion"></b-form-input>
                                    </b-form-group>

                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row class="w-100" v-show="cliente">
                        <b-col>
                            <b-card class="w-100">
                                <b-form-group horizontal
                                                :label-cols="1"
                                                label="Cliente"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombbre2">
                                    <b-form-input id="nombre2"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido2">
                                    <b-form-input id="apellido2"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent2">
                                    <b-form-input id="numIdent2"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Cliente :"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="VM_clientes" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="optionsClientes"></v-select>
                                    </b-form-group>
                                   
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                    <b-row class="w-100" v-show="courier">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Courier"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombbre2">
                                    <b-form-input id="nombre2"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido2">
                                    <b-form-input id="apellido2"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent2">
                                    <b-form-input id="numIdent2"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Medio de Transporte:"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="VM_medios" placeholder="Seleccione el tipo de usuario a crear"  label="tipo" :options="optionsMedios"></v-select>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Vehiculo :"
                                                label-class="text-sm-right"
                                                label-for="Vehiculo">
                                        <v-select id="Vehiculo" v-model="VM_medios" placeholder="Seleccione el tipo de usuario a crear"  label="tipo" :options="optionsMedios"></v-select>
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                </b-container>
        </b-modal>
         <!-- Modal Edit Component -->
        <b-modal id="modal2" ref="Editar" size="lg" no-close-on-backdrop
         no-close-on-esc title="Bootstrap-Vue">
            <div slot="modal-header"
            class="w-100">
                <b-btn class="rounded text-white"
                    variant="danger"
                    @click="hideModal">
                    <i class="fa fa-times-circle"
                        aria-hidden="true"></i>&#32;Cancelar
                </b-btn>
                <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="actualizar()">
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
            </div>
            <div slot="modal-footer"
            class="w-100">
            </div>
                <b-container fluid>
                    <b-row class="mb-1">
                        <b-col>
                            <v-select v-model="usuEditar.tipo" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="options" @input="tipoUsuarioEditar()"
                                :disabled="true"></v-select>
                        </b-col>
                    </b-row>
                    <b-row class="w-100" v-show="admin">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Administrador"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre:"
                                                label-class="text-sm-right"
                                                label-for="Nombre1">
                                    <b-form-input id="Nombre1"
                                        v-model="usuEditar.nombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido:"
                                                label-class="text-sm-right"
                                                label-for="Apellido1">
                                    <b-form-input id="Apellido1"
                                    v-model="usuEditar.apellido"></b-form-input>
                                    </b-form-group>
                                     <b-form-group horizontal
                                                label="Correo :"
                                                label-class="text-sm-right"
                                                label-for="Correo1">
                                    <b-form-input id="Correo1"
                                    v-model="usuEditar.correo"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent1">
                                    <b-form-input id="numIdent1" v-model="usuEditar.numero_identificacion"></b-form-input>
                                    </b-form-group>

                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row class="w-100" v-show="cliente">
                        <b-col>
                            <b-card class="w-100">
                                <b-form-group horizontal
                                                :label-cols="1"
                                                label="Cliente"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                   <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombbre2">
                                    <b-form-input id="nombre2"
                                        v-model="usuEditar.nombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido2">
                                    <b-form-input id="apellido2" 
                                     v-model="usuEditar.apellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Correo :"
                                                label-class="text-sm-right"
                                                label-for="Correo2">
                                    <b-form-input id="Correo2"
                                    v-model="usuEditar.correo"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent2">
                                    <b-form-input id="numIdent2"
                                     v-model="usuEditar.numero_identificacion"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Cliente :"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="usuEditar.id_cliente" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="optionsClientes"></v-select>
                                    </b-form-group>
                                   
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                    <b-row class="w-100" v-show="courier">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Courier"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombbre2">
                                    <b-form-input id="nombre2"
                                        v-model="usuEditar.nombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido2">
                                    <b-form-input id="apellido2" 
                                     v-model="usuEditar.apellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Correo :"
                                                label-class="text-sm-right"
                                                label-for="Correo2">
                                    <b-form-input id="Correo2"
                                    v-model="usuEditar.correo"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent2">
                                    <b-form-input id="numIdent2"
                                     v-model="usuEditar.numero_identificacion"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Medio de Transporte:"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="usuEditar.id_transporte" placeholder="Seleccione el tipo de usuario a crear"  label="tipo" :options="optionsMedios"></v-select>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Vehiculo :"
                                                label-class="text-sm-right"
                                                label-for="Vehiculo">
                                        <v-select id="Vehiculo" v-model="VM_medios" placeholder="Seleccione el tipo de usuario a crear"  label="tipo" :options="optionsMedios"></v-select>
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                </b-container>
        </b-modal>

    </b-container>
</template>

<script>

import {urlservicios} from '../main'

export default {

     data () {

    return {
        usuEditar:{},
        usu:{},
        tipoUsu:'',
        currentPage:1,
        usuario:'',
        items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Configuración Clientes",
          to: "/inicio/configcliente",
          active: true
        }
      ],
       fields: [
          { key: 'editar', label: 'Editar', sortable: false },
            { key: 'nombre', label: 'Nombre Usuario', sortable: true },
             { key: 'tipo', label: 'Tipo de Usuario', sortable: true },
             { key: 'numero_identificacion', label: 'Documento Identificación', sortable: true },
           
            { key: 'correo', label: 'Correo Contacto', sortable: false },
        ],
        options:[
            {nombre:'administrador',
             _id:'1'},
             {nombre:'cliente',
             _id:'2'},
             {nombre:'courier',
             _id:'3'}
        ],
        optionsMedios:[],
        optionsClientes:[],
        VM_clientes:'',
        VM_medios:'',
      UsuariosTabla:[],
        indice:null,
        admin:'',
        cliente:'',
        courier:'',
        
    }
    },
    methods:{
        tipoUsuarioEditar(){
            console.log(this.usuEditar);
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            if(this.usuEditar.tipo){
                if(this.usuEditar.tipo=='administrador'){
                    this.courier=false
                    this.admin=true
                    this.cliente=false
                }
                if(this.usuEditar.tipo=='cliente'){
                    this.courier=false
                    this.admin=false
                    this.cliente=true
                    this.axios.get(urlservicios+"clientesOperador/" +test.id_OperadorLogistico._id +"/null")
                        .then(response =>{
                            console.log(response);
                            this.optionsClientes=response.data
                            this.optionsClientes.forEach(element => {
                                if(this.usuEditar.id_cliente==element._id){
                                    this.usuEditar.id_client=element.nombre
                                    this.usuEditar.id_cliente={}
                                    this.usuEditar.id_cliente=element
                                }
                            });
                        })
                     
                }
                if(this.usuEditar.tipo=='courier'){
                    this.courier=true
                    this.admin=false
                    this.cliente=false
                    this.axios.get(urlservicios+ "medios/")
                            .then(response => {
                                this.optionsMedios=response.data
                                this.optionsMedios.forEach(element => {
                                    if(this.usuEditar.id_transporte=element._id){
                                        this.usuEditar.id_transporte=element.tipo
                                        this.usuEditar.id_transporte={}
                                        this.usuEditar.id_transporte=element
                                    }
                                });
                            })
                }
            }else{
                console.log("no tiene nada");
                    this.courier=false
                    this.admin=false
                    this.cliente=false
            }
        },
        tipoUsuario(value){
            console.log("entro a tipo");
            console.log(this.tipoUsu);
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            if(this.tipoUsu){
                if(this.tipoUsu.nombre=='administrador'){
                    this.courier=false
                    this.admin=true
                    this.cliente=false
                }
                if(this.tipoUsu.nombre=='cliente'){
                    this.courier=false
                    this.admin=false
                    this.cliente=true
                    this.axios.get(urlservicios+"clientesOperador/" +test.id_OperadorLogistico._id +"/null")
                        .then(response =>{
                            console.log(response);
                            this.optionsClientes=response.data
                        })
                     
                }
                if(this.tipoUsu.nombre=='courier'){
                    this.courier=true
                    this.admin=false
                    this.cliente=false
                    this.axios.get(urlservicios+ "medios/")
                            .then(response => {
                                this.optionsMedios=response.data
                            })
                }
            }else{
                console.log("no tiene nada");
                    this.courier=false
                    this.admin=false
                    this.cliente=false
            }
        },
        EditarUsuario(data){
            console.log(data);
            this.usuEditar=data.item
            this.$refs.Editar.show()
        },
        UsuarioNuevo(){
            console.log("lanzamos modal");
            this.$refs.Crear.show()
        },
        hideModal(){
            this.admin=false
            this.cliente=false
            this.courier=false
            //this.options=[]
            this.optionsMedios=[]
            this.optionsClientes=[]
            this.VM_clientes=''
            this.VM_medios=''
            this.tipoUsu=''
            this.usu={}
            this.usuEditar={}
            this.$refs.Crear.hide()
            this.$refs.Editar.hide()
        },
        refrescarUsuarios(){
            console.log("refrescamos");
        }
        
    },
    created: function(){
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente
        id_cliente='null'

        this.axios.get(urlservicios+"UsuariosPorOperador/"+test.id_OperadorLogistico._id)
                .then((response) => {
                    console.log(response);
                    this.UsuariosTabla=response.data
                })
    }

}
</script>

<style>

</style>
