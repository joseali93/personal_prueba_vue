<template>
<!-- EN ESTE SE PERMITE LA GENERACION DE LOS DETALLES ASOCIADOS A UN CLIENTE Y CENTOR DE COSTO -->
    <b-container>
       <header  class="content-heading text-capitalize text-center">
          <h2>Generacion Orden de Servicio</h2>
          <small></small>
        </header>
      <b-card>
        <header slot="header" class="content-heading text-capitalize">
          <h2>Detalle de Orden de Servicio</h2>
          <small>Permite de la creacion y edicion de los envios que tendra asociado la orden de servicio</small>
        </header>
          <b-row>
              <b-col md="3" offset-md="11">
                  <b-btn class="rounded-circle" variant="danger"  v-b-modal.modalcrear><i class="fa fa-plus"></i></b-btn>
              </b-col>
          </b-row>
          <b-row>
              <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="DetalleServicio">

                  <template slot="eliminar" slot-scope="data">
                      <i class="btn btn-danger fa fa-trash" v-on:click="eliminar(index)" ></i>
                  </template>
                  <template slot="productoslocal"  slot-scope="data">
                      {{data.value.nombre}}         
                  </template>
                  <template slot="servicioslocal"  slot-scope="data">
                      {{data.value.nombre}}
                  </template>
                  <template slot="editar"  slot-scope="data">
                      <i class="btn btn-success fa fa-pencil"  v-on:click="editar(data.index)" v-b-modal.modaleditar></i>
                  </template>
              </b-table>
              <b-pagination size="md" :total-rows="DetalleServicio.length" v-model="currentPage" :per-page="5">
              </b-pagination>
          </b-row>
          <b-row>
            <b-col class="float-left" cols="5">
              <b-btn to="/inicio/orden" variant="primary">
              <i class="fa fa-chevron-left" aria-hidden="true">  </i>
               Anterior</b-btn>

            </b-col>
            <b-col class="d-flex flex-row-reverse">
                                    <b-btn   @click="envioServicio" variant="primary">
                                      <i class="fa fa-check" aria-hidden="true"></i>
                                      Finalizar</b-btn>

            </b-col>
          </b-row>
      </b-card>
      <!-- Modal Adicionar -->
      <b-modal id="modalcrear" ref="Modal" title="Adicionar Registro" size="lg">
            <b-container fluid>
              
                <b-row>
                    <label >Seleccione el Producto:</label>
                    <b-form-select v-model="selectproduct" class="mb-3"  id="produ" 
                    :options="productosurl" text-field="nombre" value-field="_id"  @change.native="service">
                    </b-form-select>
                        
                </b-row>
                <preload v-show="load"></preload>
                <b-row >
                    <label >Seleccione el Servicio:</label>
                    <b-form-select v-model="selectservice" class="mb-3" :options="serviciosurl"
                     @change.native="campos"
                     text-field="nombre" value-field="_id"  :disabled="habilitar" >
                    </b-form-select>
                </b-row>
                <b-row>
                    <h2 v-show="selectservice"> Informacion Adicional: </h2>
                    <br>

                    <br>
                </b-row>
                <b-row  v-for="(data,indice) in inputs.campos" class="my-1 prueba" > 
                  <template v-if="data.type!='select'" >
                    <template v-if="data.espieza==true" style="    display: inline-block;">
                  <b-input-group >
              <b-form-input ></b-form-input>
                <b-btn variant="outline-success">Button</b-btn>
            </b-input-group>
                    </template>
                    <template v-else>
                    <b-col  >   
                        <label  class="col-sm-2 col-form-label col-form-label-sm text-capitalize" :style="[data.style]" >{{data.placeholder}}: </label>
                    </b-col>
                    <b-col >
                        <input class="form-control form-control-sm" :type="data.type" :id="data.id" :style="[data.style,validatecampo]" :max="data.max" :placeholder="data.placeholder" @keyup="Presiono(indice)"   required>
                    </b-col>
                    </template>

                    
                  </template>
                  
                </b-row>
                
                <!--
                <b-row  v-for="(data,indice) in inputs.campos" class="my-1" >
                  <template v-if="data.espieza==true">
                  <b-input-group class="mb-3">
                    <b-form-input 
                    type="text"
                    :id="data.id"
                    :placeholder="'Ingrese la '+data.placeholder">
                    </b-form-input>
                    <b-btn variant="outline-success" @click="adicionarRef">
                    <i class="fa fa-plus"></i>
                    </b-btn>
                  </b-input-group>  
                    <b-table striped hover :items="itemsreferencia" :fields="fieldsprueba"
                   :per-page="3" :current-page="currentPageRef"> 
                      <template slot="eliminar" slot-scope="data">
                      <i class="btn btn-danger fa fa-trash" v-on:click="eliminarRef(data.index)" ></i>
                      </template>
                      <template slot="referencia"  slot-scope="data">           
                         {{data.item.referencia}}
                      </template>
                    </b-table>
                 <b-pagination size="md" :total-rows="itemsreferencia.length" v-model="currentPageRef" 
                 :per-page="3">
                 </b-pagination>

                  </template> 
                 
                </b-row>
                -->
                  <b-form-row  v-show="selectservice">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Referencia: </label>
                    </b-col>
                    <b-col>
                      <b-form-input type="text" class="form-control form-control-sm"  placeholder="Referencia" v-model="detalles.referencia"
                         :state="estado.referencia"></b-form-input>
                         <!--<input type="text" class="form-control form-control-sm" id="referencia"   placeholder="Referencia" v-model="detalles.referencia">
                         -->
                    </b-col>
                </b-form-row>
                <b-row v-show="selectservice">
                    <h2>Destinatario: </h2>
                </b-row>
                 <b-form-row v-show="selectservice" class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm"> Identificacion: </label>
                    </b-col>
                    <b-col>
                        <b-form-input type="number" class="form-control form-control-sm"  placeholder="Indentidicacion"
                         v-model="identificacion"
                         @keyup.enter.native="buscar()"
                         :state="true"  v-b-popover.hover="'Se debe diligenciar sin puntos, en caso de NIT sin numero de validacion, ni guion'" title="Num. Identificacion"></b-form-input>
                        <!--<input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre">
                        -->
                    </b-col>
                </b-form-row>
                <b-form-row v-show="selectservice&&mostrardestinatario" class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Nombre: </label>
                    </b-col>
                    <b-col>
                        <b-form-input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre"
                         :state="estado.nombre"></b-form-input>
                        <!--<input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre">
                        -->
                    </b-col>
                </b-form-row>
                <b-form-row v-show="selectservice&&mostrardestinatario" class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Direccion: </label>
                    </b-col>
                    <b-col>
                      <b-form-input type="text"  class="form-control form-control-sm"  :state="estado.direccion" placeholder="Direccion" v-model="detalles.destinatario.direccion"> </b-form-input>
                        <!--<input type="text" class="form-control form-control-sm"  placeholder="Direccion" v-model="detalles.destinatario.direccion">
                        -->
                    </b-col>
                </b-form-row>
                <b-form-row v-show="selectservice&&mostrardestinatario" class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Telefono: </label>
                    </b-col>
                    <b-col>
                      <!--
                         <b-form-input type="text"  class="form-control form-control-sm"  :state="estado.telefono" 
                         placeholder="Telefono" v-model="detalles.destinatario.telefono" @keyup="numeros(this)"> </b-form-input>
                         -->
                         
                        <input type="text" :style="validatecampoTel"  class="form-control form-control-sm" id="telefono" @keyup="numeros(this)" placeholder="Telefono" v-model="detalles.destinatario.telefono">
                        
                    </b-col>
                </b-form-row>
                <b-form-row v-show="selectservice&&mostrardestinatario">
                  <b-col>
                    <b-form-textarea id="textarea1"
                        v-model="detalles.observaciones"
                        placeholder="Ingrese las observaciones necesarias"
                        :rows="3"
                        :max-rows="6">
                    </b-form-textarea>
                  </b-col>
                </b-form-row>
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn class="mt-3" variant="danger"  @click="hideModal">
                  <i class="fa fa-times-circle" aria-hidden="true">  </i>
                  Cancelar</b-btn>
                <b-btn class="mt-3 float-right" variant="success" v-on:click="ingresarOrden">
                  <i class="fa fa-floppy-o">  </i> Guardar
                </b-btn>

            </div>
      </b-modal>
      <!-- Modal Editar -->
      <b-modal id="modaleditar" ref="ModalEdit" title="Editar Registro" size="lg">
            <b-container fluid>
                <b-row>
                    <label >Seleccione el Producto:</label>
                    <b-form-select v-model="selectproduct" class="mb-3" :options="productosurl" text-field="nombre" value-field="_id"  @change.native="service">
                     </b-form-select>
                </b-row>
                <b-row>
                    <label >Seleccione el Servicio:</label>
                    <b-form-select v-model="selectservice" class="mb-3"  :options="serviciosurl" @change.native="campos" text-field="nombre" value-field="_id">
                    </b-form-select>
                </b-row>
                <b-row  v-if="mostrar">
                    <h2> Informacion: </h2>
                </b-row>
                <b-row v-for="(data,indice) in inputsED.campos" class="my-1"> 
                  <template v-if="data.type!='select'">
                    <b-col >
                        <label  class="col-sm-2 col-form-label col-form-label-sm text-capitalize" :style="[data.style]" >{{data.placeholder}}: </label>
                    </b-col>
                    <b-col>
                        <input class="form-control form-control-sm" :type="data.type" :id="data.id" :style="[data.style,validatecampo]" :max="data.max" :placeholder="data.placeholder" @keyup="PresionoED(indice)"  :value="valores(data.id)"   required>
                    </b-col>
                  </template>
              <!--
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm text-capitalize" :style="data.style">{{data.placeholder}}: </label>
                    </b-col>
                    <b-col>
                        <input class="form-control form-control-sm" :type="data.type" :id="data.id" :max="data.max" :style="data.style" :placeholder="data.placeholder" @keyup="PresionoED(indice)"  :value="valores(data.id)" required>
                    </b-col>
                    -->
                </b-row>
                 <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Referencia: </label>
                    </b-col>
                    <b-col>
                      <b-form-input type="text" class="form-control form-control-sm"  placeholder="Referencia" v-model="detalleseditar.referencia"
                         :state="estado.referencia"></b-form-input>
                         <!--
                        <input type="text" class="form-control form-control-sm" id="referenciaedit"   placeholder="Referencia" v-model="detalleseditar.referencia">
                        -->
                    </b-col>
                </b-form-row>
                <b-row>
                    <h2>Destinatario: </h2>
                </b-row>
                <b-form-row class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Nombre: </label>
                    </b-col>
                    <b-col>
                      <b-form-input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalleseditar.destinatario.nombre"
                         :state="estado.nombre"></b-form-input>
                         <!--
                        <input type="text" class="form-control form-control-sm" id="editarnombre"  placeholder="Nombre" v-model="detalleseditar.destinatario.nombre">
                        -->
                    </b-col>
                </b-form-row>
                <b-form-row class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Direccion: </label>
                    </b-col>
                    <b-col>
                      <b-form-input type="text" class="form-control form-control-sm"  placeholder="Direccion" v-model="detalleseditar.destinatario.direccion"
                         :state="estado.direccion"></b-form-input>
                         <!--
                        <input type="text" class="form-control form-control-sm" id="editardire" placeholder="Direccion" v-model="detalleseditar.destinatario.direccion">
                          -->
                    </b-col>
                </b-form-row>
                <b-form-row class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Telefono: </label>
                    </b-col>
                    <b-col>
                        <input type="text" :style="validatecampoTel" class="form-control form-control-sm" id="telefonoedit"  @keyup="numeroseditar(this)"  placeholder="Telefono" v-model="detalleseditar.destinatario.telefono">
                    </b-col>
                </b-form-row>
                <b-row>
                    <b-form-textarea id="textarea1"
                        v-model="detalleseditar.observaciones"
                        placeholder="Enter something"
                        :rows="3"
                        :max-rows="6">
                    </b-form-textarea>
                </b-row>
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn class="mt-3" variant="danger"  @click="hideModal">
                  <i class="fa fa-times-circle" aria-hidden="true">  </i>
                  Cancelar</b-btn>
                <b-btn class="mt-3 float-right " variant="success" v-on:click="actualizar()">
                  <i class="fa fa-floppy-o"></i> Guardar 
                </b-btn>

            </div>
      </b-modal>
    </b-container>
</template>

<script>
import { bus } from "../main";
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
export default {
  components :{
    Preload
  },
  data() {
    return {
      currentPageRef:1,
      itemsreferencia:[
      ],
      fieldsprueba:[
         { key: "referencia", label: "Referencia" },
         { key: "eliminar", label: "Referencia" },

      ],
      prueba:'',
      mostrardestinatario:false,
      creaciondestinatarios:'',
      identificacion:'',
      estado:{
        direccion:null,
        nombre:null,
        telefono:null,
        referencia:null,
      },
      validatecampo: '',
      validatecampoTel:'',
      mostrar: true,
      habilitar: true,
      load: false,
      selection: '',
      pruebas: '',
      currentPage: 1,
      fields: [
        "eliminar",
        { key: "productoslocal", label: "Productos" },
        { key: "servicioslocal", label: "Servicios" },
        "editar"
      ],
      DetalleServicio: [],
      remitentes: [],
      productosurl: {},
      selectproducto:{},
      serviciosurl: {},
      selectservice: null,
      selectproduct: null,
      selectservicio:{},
      inputs: "",
      objeto: "",
      detallesc: "",
      detalles: {
        destinatario: {
          identificacion:'',
          _id:"",
          nombre: "",
          direccion: "",
          telefono: ""
        },
        infor: {
        },
        referencia: '',
        observaciones: ""
      },
      detalleseditar: {
        destinatario: {
          identificacion:'',
          _id:"",
          nombre: "",
          direccion: "",
          telefono: ""
        },
        infor: {},
        referencia:'',
        observaciones: ""
      },
      inputsED: ""
    };
  },
  watch: {
    selectproduct(n, o) {
    },
    selectservice(n, o) {
    }
  },
  methods: {
    ActualizarRef(value){
      console.log("entro a cambiar")
      console.log(value)
       setTimeout(
        function() {
          if (document.getElementById(this.inputs.campos[value].id).value == "")
           {
            eval("this.objeto." + this.inputs.campos[value].vmodel + "= null");
            eval(
                "this.objeto." +
                  this.inputs.campos[value].vmodel +
                  "=" +
                  this.inputs.campos[value].min)
          } else {
            if (document.getElementById(this.inputs.campos[value].id).value >this.inputs.campos[value].max)
             {
              eval(
                "this.objeto." +
                  this.inputs.campos[value].vmodel +
                  "=" +
                  this.inputs.campos[value].min
              );
              document.getElementById(
                this.inputs.campos[value].id
              ).value = eval(
                "this.objeto." +
                  this.inputs.campos[value].vmodel +
                  "=" +
                  this.inputs.campos[value].min
              );
            } else {
              eval(
                "this.objeto." +
                  this.inputs.campos[value].vmodel +
                  "=" +
                  document.getElementById(this.inputs.campos[value].id).value
              );
            }
          }
        }.bind(this)
      );
      console.log(this.objeto)
    },
    eliminarRef(value){
      console.log("entro a eliminar");
      console.log(value);
      this.itemsreferencia.splice(value, 1);


    },
    adicionarRef(){
      console.log("ntro a prueba");
      console.log(this.prueba);
      var obj ={
        referencia:this.prueba,
      }
      this.itemsreferencia.push(obj)
      console.log(this.itemsreferencia);
    },
    buscar(){
      console.log("entro a buscar");
      console.log(this.identificacion);
       this.axios.get(urlservicios+"obtenerDestinatario"+'/'+this.identificacion)
        .then(response => {
          console.log(response.data);
          var destinatario=response.data.destinatarios
          this.creaciondestinatarios=response.data.validar
          if(response.data.validar==true){
            this.detalles.destinatario.numero_identificacion=destinatario.numero_identificacion
            this.detalles.destinatario._id=destinatario._id
            this.detalles.destinatario.nombre=destinatario.nombre
            this.detalles.destinatario.direccion=destinatario.direccion
            this.detalles.destinatario.telefono=destinatario.telefono
          }
          else{
            this.detalles.destinatario.numero_identificacion=this.identificacion
            this.detalles.destinatario._id=''
            this.detalles.destinatario.nombre=''
            this.detalles.destinatario.direccion=''
            this.detalles.destinatario.telefono=''
          }
          this.mostrardestinatario=true
          
          
        })
    },
    numeroseditar(valor) {
      //console.log("entro a numeros editar");
      //console.log(document.getElementById("telefonoedit").value)
      var a = document.getElementById("telefonoedit").value;
      //var x=check.which;
      //var x = a.charCode;
      var x = a.keyCode;
      if (!(a >= 48 || a <= 57)) {
        swal("Oops...", "Solo deben ser numeros !", "error");
        this.validatecampoTel= {
                border: '1px solid  #ff8080'
            }
        return (document.getElementById("telefonoedit").value = "");
      } else if (a.length >= 9) {
        // if no is more then the value
        swal("Oops...", "Maximo 10 digitos!", "error");
        this.validatecampoTel= {
                border: '1px solid  #ff8080'
            }
        return (document.getElementById("telefonoedit").value = "");
      }
    },
    numeros(valor) {
      console.log("entro a numeros");
      //console.log(document.getElementById("telefono").value)
      var a = document.getElementById("telefono").value;
      //var x=check.which;
      //var x = a.charCode;
      var x = a.keyCode;
      if (!(a >= 48 || a <= 57)) {
        swal("Oops...", "Solo deben ser numeros !", "error");
        this.validatecampoTel= {
                border: '1px solid  #ff8080'
            }
        return (document.getElementById("telefono").value = "");
      } else if (a.length >= 9) {
        // if no is more then the value
        swal("Oops...", "Maximo 10 digitos!", "error");
        this.validatecampoTel= {
                border: '1px solid  #ff8080'
            }
        return (document.getElementById("telefono").value = "");
      }
    },
    PresionoED(index) {
      console.log("entro al presionar editar");
      this.validatecampo= ''
      setTimeout(
        function() {
          if (
            document.getElementById(this.inputsED.campos[index].id).value == ""
          ) {
            eval(
              "this.detalleseditar.infor." +
                this.inputsED.campos[index].vmodel +
                "= null"
            );
          } else {
            eval(
              "this.detalleseditar.infor." +
                this.inputsED.campos[index].vmodel +
                "=" +
                document.getElementById(this.inputsED.campos[index].id).value
            );
          }
        }.bind(this)
      );
      //console.log(this.detalleseditar)
    },
    valores(dato) {
      //console.log(this.detalleseditar)
      //console.log(dato)
      //console.log(eval("this.detalleseditar.infor." + dato));
      return eval("this.detalleseditar.infor." + dato);
    },
    actualizar() {
      console.log("actualizar");
            this.validatecampoTel=''
      var pivoteedi=false
      this.estado.nombre=null
      this.estado.direccion=null
      this.estado.referencia=null

     for(var x=0;x<Object.keys(this.detalleseditar.infor).length;x++){
       if(eval('this.detalleseditar.infor.'+this.inputsED.campos[x].vmodel)==''||
       eval('this.detalleseditar.infor.'+this.inputsED.campos[x].vmodel)==null||
       eval('this.detalleseditar.infor.'+this.inputsED.campos[x].vmodel)=='null')
       {
         pivoteedi=true
         this.validatecampo= {
                border: '1px solid  #ff8080'
            }
       }
     }
      console.log(pivoteedi);
      if (
        this.detalleseditar.destinatario.nombre == "" ||
        this.detalleseditar.destinatario.direccion == "" ||
        this.detalleseditar.referencia==""||
        pivoteedi==true||
        this.detalleseditar.destinatario.telefono==''
        
      ) {
        if(this.detalleseditar.destinatario.telefono==''){
          this.validatecampoTel= {
                border: '1px solid  #ff8080'
            }
                      swal("Oops...", "Falto algun campo por completar!", "error");

        }
        if(this.detalleseditar.destinatario.nombre == ""){
          this.estado.nombre=false
          swal("Oops...", "Falto algun campo por completar!", "error");
        }
        if(this.detalleseditar.destinatario.direccion == "" ){
          this.estado.direccion=false
          swal("Oops...", "Falto algun campo por completar!", "error");
        }
        if(        this.detalleseditar.referencia==""  ){
          this.estado.referencia=false
          swal("Oops...", "Falto algun campo por completar!", "error");
        }
        
      } else {
        var detalleslocal = this.detalleseditar;
        var productoslocal = this.selectproducto;
        var servicioslocal = this.selectservicio;
        var detalles = {
          trazabilidad: [],
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        //console.log(JSON.stringify(detalles));
        this.DetalleServicio.splice(this.indices, 1);
        this.DetalleServicio.splice(this.indices, 0, detalles);
        (this.objeto = ""),
        (this.inputs = ""),
        toastr.success("Se edito exitosamente");
        this.selectservice = "";
        this.selectproduct = "";
        (this.objeto = ""),
          (this.detalleseditar = {
            destinatario: {
              nombre: "",
              direccion: "",
              telefono: ""
            },
            infor: {},
            observaciones: ""
          });
        this.$refs.ModalEdit.hide();
      }
    },
    eliminar: function(indice) {
      this.DetalleServicio.splice(indice, 1);
      toastr.error("Se elmino exitosamente");
    },
    editar(index) {
      this.validatecampo=''
      this.validatecampoTel=''
      this.estado.nombre=null
      this.estado.direccion=null
      this.estado.referencia=null
      this.indices = index;
      console.log("entro al editar");
      this.detalleseditar = this.DetalleServicio[index].detalleslocal;
      this.selectproduct = this.DetalleServicio[index].productoslocal._id;
      this.selectservice = this.DetalleServicio[index].servicioslocal._id;
      console.log(this.selectservice);
      console.log(this.detalleseditar);

      this.axios
        .get(
        urlservicios+"estructuraf/" +
            this.selectproduct +
            "/" +
            this.selectservice
        )
        .then(response => {
          this.inputsED = response.data;
        });
    },
    hideModal() {
      (this.objeto = ""),
        (this.inputs = ""),
        this.selectservice = null;
        this.selectproduct = null;
        (this.objeto = ""),
        (this.detalles = {
          destinatario: {
            nombre: "",
            direccion: "",
            telefono: ""
          },
          infor: {},
          observaciones: ""
        });
      this.$refs.Modal.hide();
      this.$refs.ModalEdit.hide();
    },
    ingresarOrden() {
      this.validatecampoTel=''
      this.estado.nombre=null
      this.estado.direccion=null
      this.estado.referencia=null
      console.log("ingreso orden");
      var pivote=false
      console.log("---------------");
      console.log(this.detalles.destinatario);

      console.log("---------------");
      var inforemitente =localStorage.getItem("orden");
      var inforemi=JSON.parse(inforemitente)

      console.log(this.identificacion);
      if(this.creaciondestinatarios==false){
        var objeto={
        numero_identificacion:this.identificacion,
        direccion:this.detalles.destinatario.direccion,
        nombre:this.detalles.destinatario.nombre,
        telefono:this.detalles.destinatario.telefono,
        id_cliente:inforemi.selected_client
        
      }
      console.log(objeto);
      this.axios.post(urlservicios+"CrearDestinatario", objeto)
        .then(response => {
          console.log(response);

        })
      }
      else{
        console.log("actualiza destinatario");
        console.log(this.detalles.destinatario);
        var objeto={
        numero_identificacion:this.identificacion,
        direccion:this.detalles.destinatario.direccion,
        nombre:this.detalles.destinatario.nombre,
        telefono:this.detalles.destinatario.telefono,
        id_cliente:inforemi.selected_client
        
      }
      console.log(objeto);
      this.axios.post(urlservicios+"ActualizarDestinatario"+'/'+this.detalles.destinatario._id, objeto)
        .then(response => {
          console.log(response);

        })
      }
      
      if(this.objeto==undefined)
      {
      }
      else
      {
        var llaves=''
        llaves=Object.keys(this.objeto)
        for(var x=0;x<llaves.length;x++){          
          if(eval('this.objeto.'+llaves[x])==''||eval('this.objeto.'+llaves[x]=='null')||eval('this.objeto.'+llaves[x]==null))
          {
            console.log("");
            console.log("pivote tru");
            console.log(eval('this.objeto.'+llaves[x]));
            this.validatecampo= {
                border: '1px solid  #ff8080'
            }
            pivote=true
          }
        }
        if(pivote==false){
          this.validatecampo=''
        }
      }
      console.log(pivote);
      if (
        this.selectproduct == "" ||
        this.selectservice == "" ||
        this.detalles.destinatario.nombre == "" ||
        this.detalles.destinatario.telefono == "" ||
        this.detalles.destinatario.direccion == "" ||
        pivote==true//  ||
       //this.detalles.referencia==''
        ) {
          if(this.detalles.destinatario.telefono == ""){
            this.validatecampoTel= {
                border: '1px solid  #ff8080'
            }
          }
          if(this.detalles.destinatario.nombre==''){
            this.estado.nombre=false
          }
          if(this.detalles.destinatario.direccion==''){
            this.estado.direccion=false
          }
          if(this.detalles.referencia==''){
            this.estado.referencia=false
          }
        
          swal("Oops...", "Falto completar algun campo", "error");                    
        



      } else {
        this.objeto.objetoUnidades=this.itemsreferencia
        var servicioslocal = this.selectservicio;
        this.detallesc = this.detalles;
        this.detallesc.infor = this.objeto;
        var productoslocal = this.selectproducto;
        var detalleslocal = this.detalles;

        var detalles = {
          trazabilidad: [],
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        this.DetalleServicio.push(detalles);
        /*        this.DetalleServicio.map((obj,indc)=>{
          console.log(obj);
        })*/
        console.log((this.DetalleServicio));
        //blanquear datos
        this.itemsreferencia=[]
        this.identificacion=''
        this.habilitar=true,
                  this.mostrardestinatario=false,

        (this.objeto = ""),
          (this.inputs = ""),
          toastr.success("Se agrego exitosamente");
        this.selectservice = null,
        this.selectproduct = null;
        (this.objeto = ""),
          (this.detalles = {
            destinatario: {
              nombre: "",
              direccion: "",
              telefono: ""
            },
            infor: {},
            observaciones: ""
          });
        this.$refs.Modal.hide();
      }
    },
    Presiono(index) {
      console.log("entro al presionar");
      setTimeout(
        function() {
          if (document.getElementById(this.inputs.campos[index].id).value == "")
           {
            eval("this.objeto." + this.inputs.campos[index].vmodel + "= null");
            eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  this.inputs.campos[index].min)
          } else {
            if (document.getElementById(this.inputs.campos[index].id).value >this.inputs.campos[index].max)
             {
              eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  this.inputs.campos[index].min
              );
              document.getElementById(
                this.inputs.campos[index].id
              ).value = eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  this.inputs.campos[index].min
              );
            } else {
              eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  document.getElementById(this.inputs.campos[index].id).value
              );
            }
          }
        }.bind(this)
      );
      //console.log(this.detalleseditar)
    },
    service(value) {
          var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Servicio' };
      console.log("entro a seleccion");
      //this.load = true;
       var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
      for(var i=0; i<this.productosurl.length;i++){
        if(this.productosurl[i]._id==value.target.value)
        {
          this.selectproducto =this.productosurl[i]
        }
      }
        this.axios.get(urlservicios+"servicios/"+this.selectproducto._id)
        .then(response => {
            this.serviciosurl = response.data;
            //this.load=false
            var load2=false
            setTimeout(() => {
                bus.$emit('load', {
                    load2 
                })
                }, )
            this.habilitar= false
            //console.log(this.serviciosurl);
            this.serviciosurl.unshift(vacio)

        });

            
    },
    campos(value) {
      console.log("inputs");
            //this.load = true;
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load 
                })
                }, )
      for(var i=0; i<this.serviciosurl.length;i++){
        if(this.serviciosurl[i]._id==value.target.value)
        {
          this.selectservicio =this.serviciosurl[i]
        }
      }
         this.axios.get(
          urlservicios+"estructuraf/" +
            this.selectproducto._id +
            "/" +
            this.selectservicio._id)   
            .then(response => {
            this.inputs = response.data;
            
            console.log(this.inputs);
            this.objeto = this.inputs.objeto;
            console.log(this.objeto)
            //this.load=false
            var load2=false
            setTimeout(() => {
                bus.$emit('load', {
                    load2 
                })
                }, )

            }).catch(function(error){
              //console.log("error estruc -> "+JSON.stringify(error));
            })

    },
    envioServicio() {
      if(this.DetalleServicio==''||this.DetalleServicio==null||this.DetalleServicio==undefined)
      {
        console.log("no se envia");
        swal(
            "Atencion!",
            "La Orden debe tener minimo un detalle ",
            "error"
          );

      }
      else{
      console.log(this.DetalleServicio);
      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);

      var selec = localStorage.getItem("orden");
      var selecc = JSON.parse(selec);
      var inforemitente =localStorage.getItem("infoorden");
      var inforemi=JSON.parse(inforemitente)

      var objeto = {
        id_OperadorLogistico: infologin.id_OperadorLogistico,
        id_usuario: infologin._id,
        id_centro_costo: selecc.selected_center,
        estados: [
          {
            id_usuario:infologin._id
          }
          
            ],
        id_cliente: selecc.selected_client,
        remitente :{
          direccion_recogida :inforemi.infocentro.direccion,
          telefono_contacto :inforemi.infocliente.telefono,
          nombre_contacto :inforemi.infocliente.nombre
        },
        detalle: this.DetalleServicio
      };
      this.axios
        .post(urlservicios+"GuardarOrden", objeto)
        .then(response => {
          this.Documento = response.data.ducumento;
          console.log(response);
          console.log("-------");
          //console.log(JSON.stringify(objeto));
          swal(
            "Excelente!",
            "La Orden de Servicio Generada es: " + this.Documento,
            "success"
          );
        });
       this.$router.replace('/inicio')
       localStorage.removeItem('orden');
    }
    }
  },
  created: function() {
  },
  beforeCreate: function() {
    var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Producto' };
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    this.axios
      .get(
        urlservicios+"productos/" +
          infologin.id_OperadorLogistico
      )
      .then(response => {
        this.productosurl = response.data;
        this.productosurl.unshift(vacio)

      });
  }
};
</script>

<style>
.prueba{
  display:inline-block;
}
.card{
    margin-top: 2%;
}
</style>
