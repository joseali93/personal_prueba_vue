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
                <b-row  v-for="(data,indice) in inputs.campos" class="my-1"> 
                  <template v-if="data.type!='select'">
                    <b-col >
                        <label  class="col-sm-2 col-form-label col-form-label-sm text-capitalize" :style="[data.style]" >{{data.placeholder}}: </label>
                    </b-col>
                    <b-col>
                        <input class="form-control form-control-sm" :type="data.type" :id="data.id" :style="[data.style,validatecampo]" :max="data.max" :placeholder="data.placeholder" @keyup="Presiono(indice)"   required>
                    </b-col>
                  </template>
                </b-row>
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
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Nombre: </label>
                    </b-col>
                    <b-col>
                        <b-form-input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre"
                         :state="estado.nombre"></b-form-input>
                        <!--<input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre">
                        -->
                    </b-col>
                </b-form-row>
                <b-form-row v-show="selectservice" class="my-1">
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Direccion: </label>
                    </b-col>
                    <b-col>
                      <b-form-input type="text"  class="form-control form-control-sm"  :state="estado.direccion" placeholder="Direccion" v-model="detalles.destinatario.direccion"> </b-form-input>
                        <!--<input type="text" class="form-control form-control-sm"  placeholder="Direccion" v-model="detalles.destinatario.direccion">
                        -->
                    </b-col>
                </b-form-row>
                <b-form-row v-show="selectservice" class="my-1">
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
                <b-form-row v-show="selectservice">
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
import Preload from '../componentes/preload.vue'
export default {
  components :{
    Preload
  },
  data() {
    return {
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

    numeroseditar(valor) {
      // //.log("entro a numeros editar");
      // //.log(document.getElementById("telefonoedit").value)
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
       //.log("entro a numeros");
      // //.log(document.getElementById("telefono").value)
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
       //.log("entro al presionar editar");
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
      // //.log(this.detalleseditar)
    },
    valores(dato) {
      // //.log(this.detalleseditar)
      // //.log(dato)
      // //.log(eval("this.detalleseditar.infor." + dato));
      return eval("this.detalleseditar.infor." + dato);
    },
    actualizar() {
       //.log("actualizar");
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
       //.log(pivoteedi);
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
        // //.log(JSON.stringify(detalles));
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
       //.log("entro al editar");
      this.detalleseditar = this.DetalleServicio[index].detalleslocal;
      this.selectproduct = this.DetalleServicio[index].productoslocal._id;
      this.selectservice = this.DetalleServicio[index].servicioslocal._id;
       //.log(this.selectservice);

      this.axios
        .get(
        "/api/estructuraf/" +
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
       //.log("ingreso orden");
      var pivote=false
      if(this.objeto==undefined)
      {
         //.log("no hay que evaluar");
      }
      else
      {
         //.log("evaluamos");
        var llaves=''
        llaves=Object.keys(this.objeto)
        for(var x=0;x<llaves.length;x++){          
          if(eval('this.objeto.'+llaves[x])==''||eval('this.objeto.'+llaves[x]=='null')||eval('this.objeto.'+llaves[x]==null))
          {
             //.log("");
             //.log("pivote tru");
             //.log(eval('this.objeto.'+llaves[x]));
            this.validatecampo= {
                border: '1px solid  #ff8080'
            }
            pivote=true
          }
        }
      }
       //.log(pivote);
      if (
        this.selectproduct == "" ||
        this.selectservice == "" ||
        this.detalles.destinatario.nombre == "" ||
        this.detalles.destinatario.telefono == "" ||
        this.detalles.destinatario.direccion == "" ||
        pivote==true||
        this.detalles.referencia==''
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
         //.log("alerta");
        
          swal("Oops...", "Falto completar algun campo", "error");                    
        



      } else {
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
           //.log(obj);
        })*/
         //.log((this.DetalleServicio));
        //blanquear datos
        this.habilitar=true,
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
       //.log("entro al presionar");
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
      // //.log(this.detalleseditar)
    },
    service(value) {
          var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Servicio' };
       //.log("entro a seleccion");
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
       //.log("/api/servicios/"+this.selectproducto._id);
        this.axios.get("/api/servicios/"+this.selectproducto._id)
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
            // //.log(this.serviciosurl);
            this.serviciosurl.unshift(vacio)

        });

            
    },
    campos(value) {
       //.log("inputs");
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
          "/api/estructuraf/" +
            this.selectproducto._id +
            "/" +
            this.selectservicio._id)   
            .then(response => {
            this.inputs = response.data;
            
             //.log(this.inputs);
            this.objeto = this.inputs.objeto;
             //.log(this.objeto)
            //this.load=false
            var load2=false
            setTimeout(() => {
                bus.$emit('load', {
                    load2 
                })
                }, )

            }).catch(function(error){
              // //.log("error estruc -> "+JSON.stringify(error));
            })

    },
    envioServicio() {
      if(this.DetalleServicio==''||this.DetalleServicio==null||this.DetalleServicio==undefined)
      {
         //.log("no se envia");
        swal(
            "Atencion!",
            "La Orden debe tener minimo un detalle ",
            "error"
          );

      }
      else{
       //.log(this.DetalleServicio);
      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);

      var selec = localStorage.getItem("orden");
      var selecc = JSON.parse(selec);
      var objeto = {
        id_OperadorLogistico: infologin.id_OperadorLogistico,
        id_usuario: infologin._id,
        id_centro: selecc.selected_center,
        estados: [
          {
            id_usuario:infologin._id
          }
          
            ],
        id_remitente: selecc.selected_client,
        detalle: this.DetalleServicio
      };
      this.axios
        .post("/api/GuardarOrden", objeto)
        .then(response => {
          this.Documento = response.data.ducumento;
           //.log(response);
           //.log("-------");
           //.log(JSON.stringify(objeto));
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
        "/api/productos/" +
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
.card{
    margin-top: 2%;
}
</style>
