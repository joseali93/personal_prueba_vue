<template>
    <b-container>
      <header class="content-heading text-capitalize">
              <h2>Detalle de Orden de Servicio</h2>
              <small>Permite de la creacion y edicion de los envios que tendra asociado la orden de servicio</small>
      </header>
      <b-card>
          <b-row>
              <b-col md="3" offset-md="11">
                  <b-btn class="rounded-circle" variant="danger"  v-b-modal.modalcrear><i class="fa fa-plus"></i></b-btn>
              </b-col>
          </b-row>
          <b-row>
              <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="DetalleServicio">

                  <template slot="eliminar" scope="data">
                      <i class="btn btn-danger fa fa-trash" v-on:click="eliminar(index)" ></i>
                  </template>
                  <template slot="productoslocal" scope="data">
                      {{data.value.nombre}}         
                  </template>
                  <template slot="servicioslocal" scope="data">
                      {{data.value.nombre}}
                  </template>
                  <template slot="editar" scope="data">
                      <i class="btn btn-success fa fa-pencil"  v-on:click="editar(data.index)" v-b-modal.modaleditar></i>
                  </template>
              </b-table>
              <b-pagination size="md" :total-rows="DetalleServicio.length" v-model="currentPage" :per-page="5">
              </b-pagination>
          </b-row>
          <b-row>
            <b-col class="float-left" cols="5">
                                    <b-btn to="/inicio/orden" variant="primary">Anterior</b-btn>

            </b-col>
            <b-col class="d-flex flex-row-reverse">
                                    <b-btn   @click="envioServicio" variant="primary">Finalizar</b-btn>

            </b-col>
                                    <!--
              <router-link  to="/inicio/orden" tag="button"  class-active="active" class="btn btn-primary">Anterior</router-link>
              <a v-on:click="envioServicio">
                  <router-link  to="/inicio" tag="button" class-active="active" class="btn btn-primary">Fin</router-link>
              </a>-->
          </b-row>
      </b-card>
      <!-- Modal Adicionar -->
      <b-modal id="modalcrear" ref="Modal" title="Adicionar Registro" size="lg">
            <b-container fluid>
              
                <b-row>
                    <label >Seleccione el Producto:</label>
                    <b-form-select v-model="selectproduct" class="mb-3"  id="produ" 
                    :options="productosurl" text-field="nombre" value-field="_id"  @change.native="service">
                       <!-- <option  disabled selected >Productos</option>
                        <option v-for="(data,indice) in productosurl" :value="data">{{data.nombre}}</option> 
                        -->
                    </b-form-select>
                        
                </b-row>
                <preload v-show="load"></preload>
                <b-row >
                    <label >Seleccione el Servicio:</label>
                    <b-form-select v-model="selectservice" class="mb-3" :options="serviciosurl"
                     @change.native="campos"
                     text-field="nombre" value-field="_id"  :disabled="habilitar" >
                        <!--<option  disabled selected >Servicios</option>
                        <option v-for="(data,indice) in serviciosurl" :value="data">{{data.nombre}}</option> 
                        -->
                    </b-form-select>
                </b-row>
                <b-row>
                    <h2> Informacion: </h2>
                    <br>
                    <h4 v-show="!selectservice">
                      <br>
                        Seleccione un producto y un servicio
                    </h4>
                    <br>
                </b-row>
                <b-row v-for="(data,indice) in inputs.campos"> 
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm" :style="data.style" >{{data.placeholder}}: </label>
                    </b-col>
                    <b-col>
                        <input :type="data.type" :id="data.id" :style="data.style" :max="data.max" :placeholder="data.placeholder" @keyup="Presiono(indice)"   required>
                    </b-col>
                    
                </b-row>
                                 <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Referencia: </label>
                    </b-col>
                    <b-col>
                         <input type="text"  id="referencia"   placeholder="Referencia" v-model="detalles.referencia">
                    </b-col>
                </b-form-row>
                <b-row>
                    <h2>Destinatario: </h2>
                </b-row>
                <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Nombre: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre">
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Direccion: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm"  placeholder="Direccion" v-model="detalles.destinatario.direccion">
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Telefono: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm" id="telefono" @keyup="numeros(this)" placeholder="Telefono" v-model="detalles.destinatario.telefono">
                    </b-col>
                </b-form-row>
                <b-row>
                    <b-form-textarea id="textarea1"
                        v-model="detalles.observaciones"
                        placeholder="Ingrese las observaciones necesarias"
                        :rows="3"
                        :max-rows="6">
                    </b-form-textarea>
                </b-row>
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn class="mt-3" variant="danger"  @click="hideModal">Cancelar</b-btn>
                <b-btn class="mt-3 float-right" variant="success" v-on:click="ingresarOrden">Guardar</b-btn>

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
                <b-row>
                    <h2> Informacion: </h2>
                </b-row>
                <b-row v-for="(data,indice) in inputsED.campos"> 
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm" :style="data.style">{{data.placeholder}}: </label>
                    </b-col>
                    <b-col>
                        <input :type="data.type" :id="data.id" :max="data.max" :style="data.style" :placeholder="data.placeholder"@keyup="PresionoED(indice)"  :value="valores(data.id)" required>
                    </b-col>
                </b-row>
                 <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Referencia: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm" id="referenciaedit"   placeholder="Referencia" v-model="detalleseditar.referencia">
                    </b-col>
                </b-form-row>
                <b-row>
                    <h2>Destinatario: </h2>
                </b-row>
                <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Nombre: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm" id="editarnombre"  placeholder="Nombre" v-model="detalleseditar.destinatario.nombre">
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Direccion: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm" id="editardire" placeholder="Direccion" v-model="detalleseditar.destinatario.direccion">
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">Telefono: </label>
                    </b-col>
                    <b-col>
                        <input type="text" class="form-control form-control-sm" id="telefonoedit"  @keyup="numeroseditar(this)"  placeholder="Telefono" v-model="detalleseditar.destinatario.telefono">
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
                <b-btn class="mt-3" variant="danger"  @click="hideModal">Cancelar</b-btn>
                <b-btn class="mt-3 float-right" variant="success" v-on:click="actualizar()">Guardar</b-btn>

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
      selectservice: "",
      selectproduct: "",
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
      //console.log("entro a numeros editar");
      //console.log(document.getElementById("telefonoedit").value)
      var a = document.getElementById("telefonoedit").value;
      //var x=check.which;
      //var x = a.charCode;
      var x = a.keyCode;
      if (!(a >= 48 || a <= 57)) {
        swal("Oops...", "Solo deben ser numeros !", "error");
        return (document.getElementById("telefonoedit").value = "");
      } else if (a.length >= 9) {
        // if no is more then the value
        swal("Oops...", "Maximo 10 digitos!", "error");
        return (document.getElementById("telefonoedit").value = "");
      }
    },
    numeros(valor) {
      //console.log("entro a numeros");
      //console.log(document.getElementById("telefono").value)
      var a = document.getElementById("telefono").value;
      //var x=check.which;
      //var x = a.charCode;
      var x = a.keyCode;
      if (!(a >= 48 || a <= 57)) {
        swal("Oops...", "Solo deben ser numeros :)!", "error");
        return (document.getElementById("telefono").value = "");
      } else if (a.length >= 9) {
        // if no is more then the value
        swal("Oops...", "Maximo 10 digitos!", "error");
        return (document.getElementById("telefono").value = "");
      }
    },
    PresionoED(index) {
      console.log("entro al presionar editar");

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

      if (
        this.detalleseditar.destinatario.nombre == "" ||
        this.detalleseditar.destinatario.direccion == "" 
      ) {
        swal("Oops...", "Falto algun campo por completar!", "error");
      } else {
        var detalleslocal = this.detalleseditar;
        var productoslocal = this.selectproducto;
        var servicioslocal = this.selectservicio;
        var detalles = {
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        console.log(detalles);
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
        //console.log(this.DetalleServicio);
        this.$refs.ModalEdit.hide();
      }
    },
    eliminar: function(indice) {
      this.DetalleServicio.splice(indice, 1);
      toastr.error("Se elmino exitosamente");
    },
    editar(index) {
      this.indices = index;
      console.log("entro al editar");
      this.detalleseditar = this.DetalleServicio[index].detalleslocal;
      this.selectproduct = this.DetalleServicio[index].productoslocal;
      this.selectservice = this.DetalleServicio[index].servicioslocal;
      console.log(this.selectservice);

      this.axios
        .get(
        urlservicios+"estructuraf/" +
            this.selectproduct._id +
            "/" +
            this.selectservice._id
        )
        .then(response => {
          this.inputsED = response.data;
        });
    },
    hideModal() {
      (this.objeto = ""),
        (this.inputs = ""),
        //toastr.success("Se agrego exitosamente");
        this.selectservice = "";
        this.selectproduct = "";
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
      console.log("ingreso orden");
      var pivote=true
      if(this.objeto==undefined)
      {
        console.log("no hay que evaluar");
      }
      else
      {
        console.log("evaluamos");
        var llaves=''
        llaves=Object.keys(this.objeto)
        for(var x=0;x<llaves.length;x++){          
          if(eval('this.objeto.'+llaves[x])==''||eval('this.objeto.'+llaves[x]=='null')||eval('this.objeto.'+llaves[x]==null))
          {
            console.log("pivote tru");
            console.log(eval('this.objeto.'+llaves[x]));
            pivote=false
          }
        }
      }
      console.log(pivote);
      if (
        this.selectproduct == "" ||
        this.selectservice == "" ||
        this.detalles.destinatario.nombre == "" ||
        this.detalles.destinatario.telefono == "" ||
        this.detalles.destinatario.direccion == "" ||
        pivote==false
      ) {
        console.log("alerta");
        swal("Oops...", "Falto algun campo por completar!", "error");
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
          console.log(obj);
        })
        console.log( this.DetalleServicio);*/
        //blanquear datos
        this.habilitar=true,
        (this.objeto = ""),
          (this.inputs = ""),
          toastr.success("Se agrego exitosamente");
        this.selectservice = "";
        this.selectproduct = "";
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
      console.log("entro a seleccion");
      this.load = true;
      for(var i=0; i<this.productosurl.length;i++){
        if(this.productosurl[i]._id==value.target.value)
        {
          this.selectproducto =this.productosurl[i]
        }
      }
      setTimeout(function(){
        this.axios.get(urlservicios+"servicios/"+this.selectproducto._id)
        .then(response => {
            this.serviciosurl = response.data;
            this.load=false
            this.habilitar= false
            //console.log(this.serviciosurl);
        });
      }.bind(this),1000)

            
    },
    campos(value) {
      console.log("inputs");
            this.load = true;
      for(var i=0; i<this.serviciosurl.length;i++){
        if(this.serviciosurl[i]._id==value.target.value)
        {
          this.selectservicio =this.serviciosurl[i]
        }
      }
        setTimeout(function(){
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
            this.load=false


            }).catch(function(error){
              //console.log("error estruc -> "+JSON.stringify(error));
            })
        }.bind(this),2000)

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
        .post(urlservicios+"GuardarOrden", objeto)
        .then(response => {
          this.Documento = response.data.ducumento;
          console.log(response);
          console.log(objeto);
          swal(
            "Excelente!",
            "La Orden de Servicio Generada es: " + this.Documento,
            "success"
          );
        });
       this.$router.replace('/inicio')
    }
    }
  },
  created: function() {
    console.log("creado");
  },
  beforeCreate: function() {
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    console.log(infologin.id_OperadorLogistico);
    this.axios
      .get(
        urlservicios+"productos/" +
          infologin.id_OperadorLogistico
      )
      .then(response => {
        this.productosurl = response.data;
        //console.log(this.productosurl);
      });
  }
};
</script>

<style>
.card{
    margin-top: 2%;
}
</style>
