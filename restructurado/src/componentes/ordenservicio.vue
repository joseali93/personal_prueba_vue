<template>
    <b-container>
        <b-row>
            <h2>Detalle de Orden de Servicio</h2>
        </b-row>
        <b-row>
            <b-col md="3" offset-md="11">
                <b-btn class="pull-rigth"  v-b-modal.modalcrear><i class="fa fa-plus"></i></b-btn>
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
            <router-link  to="/inicio/orden" tag="button"  class-active="active" class="btn btn-primary">Anterior</router-link>
            <a v-on:click="envioServicio">
                <router-link  to="/inicio" tag="button" class-active="active" class="btn btn-primary">Fin</router-link>
            </a>
        </b-row>
        <!-- Modal Adicionar -->
        <b-modal id="modalcrear" ref="Modal" title="Adicionar Registro" size="lg">
            <b-container fluid>
                <b-row>
                    <label >Seleccione el Producto:</label>
                    <b-form-select v-model="selectproduct" class="mb-3"  id="produ" :options="productosurl" text-field="nombre" value-field="_id" @change.native="service">
                       <!-- <option  disabled selected >Productos</option>
                        <option v-for="(data,indice) in productosurl" :value="data">{{data.nombre}}</option> 
                        -->
                        </b-form-select>
                </b-row>
                <b-row>
                    <label >Seleccione el Servicio:</label>
                    <b-form-select v-model="selectservice" class="mb-3" @click.native="campos(selectproduct,selectservice)">
                        <option  disabled selected >Servicios</option>
                        <option v-for="(data,indice) in serviciosurl" :value="data">{{data.nombre}}</option>                    </b-form-select>
                </b-row>
                <b-row>
                    <h2> Informacion: </h2>
                    <br>
                    <h4 v-show="!selectservice">
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
                        <input type="text" class="form-control form-control-sm" id="referencia"   placeholder="Referencia" v-model="detalles.referencia">
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
                <b-btn class="mt-3" variant="outline-danger"  @click="hideModal">Cancelar</b-btn>
                <b-btn class="mt-3 float-right" variant="outline-success" v-on:click="ingresarOrden">Guardar</b-btn>

            </div>
        </b-modal>
        <!-- Modal Editar -->
        <b-modal id="modaleditar" ref="ModalEdit" title="Editar Registro" size="lg">
            <b-container fluid>
                <b-row>
                    <label >Seleccione el Producto:</label>
                    <b-form-select v-model="selectproduct" class="mb-3" @change="service(selectproduct)">
                        <option  disabled selected >Productos</option>
                        <option v-for="(data,indice) in productosurl" :value="data">{{data.nombre}}</option>                    </b-form-select>
                </b-row>
                <b-row>
                    <label >Seleccione el Servicio:</label>
                    <b-form-select v-model="selectservice" class="mb-3"  @click.native="campos(selectproduct,selectservice)">
                        <option  disabled selected >Servicios</option>
                        <option v-for="(data,indice) in serviciosurl" :value="data">{{data.nombre}}</option>                    </b-form-select>
                </b-row>
                <b-row>
                    <h2> Informacion: </h2>
                </b-row>
                <b-row v-for="(data,indice) in inputsED.campos"> 
                    <b-col>
                        <label  class="col-sm-2 col-form-label col-form-label-sm">{{data.placeholder}}: </label>
                    </b-col>
                    <b-col>
                      {{detalleseditar.infor}}
                        <input :type="data.type" :id="data.id" :max="data.max" :placeholder="data.placeholder"@keyup="PresionoED(indice)"  :value="valores(data.id)" required>
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
                <b-btn class="mt-3" variant="outline-danger"  @click="hideModal">Cancelar</b-btn>
                <b-btn class="mt-3 float-right" variant="outline-success" v-on:click="actualizar()">Guardar</b-btn>

            </div>
        </b-modal>
    </b-container>
</template>

<script>
import { bus } from "../main";
import {urlservicios} from '../main'

export default {
  data() {
    return {
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
      productosurl: "",
      serviciosurl: "",
      selectservice: "",
      selectproduct: "",
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
      //console.log("select");
      //console.log(n, o)
      /*
      this.axios
        .get(
          urlservicios+"servicios/" +
            this.selectproduct._id
        )
        .then(response => {
          this.serviciosurl = response.data;
          //console.log(this.serviciosurl);
        });*/
    },
    selectservice(n, o) {
      //console.log("ser");
      //console.log(n, o)
      /*
      this.axios
        .get(
          urlservicios+"estructuraf/" +
            this.selectproduct._id +
            "/" +
            this.selectservice._id
        )
        //200.116.52.29
        .then(response => {
          this.inputs = response.data;
          //this.inputsED =response.data;
          //console.log(this.inputs);
          this.objeto = this.inputs.objeto;
        });*/
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
      console.log(this.inputsED)
      console.log(document.getElementById(this.inputsED.campos[index].id).value)
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
      console.log("valores");
      console.log(dato);
      //console.log(this.detalleseditar)
      //console.log(dato)
      //console.log(eval("this.detalleseditar.infor." + dato));
      return eval("this.detalleseditar.infor." + dato);
    },
    actualizar() {
      console.log("actualizar");
      console.log(this.detalleseditar)
      if (
        this.detalleseditar.destinatario.nombre == "" ||
        this.detalleseditar.destinatario.direccion == "" 
      ) {
        swal("Oops...", "Falto algun campo por completar!", "error");
      } else {
        var detalleslocal = this.detalleseditar;
        var productoslocal = this.selectproduct;
        var servicioslocal = this.selectservice;
        var detalles = {
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        //console.log(detalles);
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
      setInterval;
      this.axios
        .get(
        urlservicios+"estructuraf/" +
            this.selectproduct._id +
            "/" +
            this.selectservice._id
        )
        //this.axios.get("http://192.168.1.69:3000/logistica/estructuraf/5a1d95e48ce0150ae2e951b4/5a1d969c8ce0150ae2e951b8")
        .then(response => {
          this.inputsED = response.data;
          //console.log((this.inputsED));
        });
      //console.log(this.DetalleServicio[index].detalleslocal)
    },
    hideModal() {
      (this.objeto = ""),
        (this.inputs = ""),
        //toastr.success("Se agrego exitosamente");
        //this.selectservice = "";
        //this.selectproduct = "";
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
      console.log(this.inputs);

      if (
        this.selectproduct == "" ||
        this.selectservice == "" ||
        this.detalles.destinatario.nombre == "" ||
        this.detalles.destinatario.telefono == "" ||
        this.detalles.destinatario.direccion == ""
      ) {
        swal("Oops...", "Falto algun campo por completar!", "error");
      } else {
        var servicioslocal = this.selectservice;
        this.detallesc = this.detalles;
        this.detallesc.infor = this.objeto;
        var productoslocal = this.selectproduct;
        var detalleslocal = this.detalles;

        var detalles = {
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        this.DetalleServicio.push(detalles);

        console.log( this.DetalleServicio);
        //blanquear datos
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
          } else {
            if (document.getElementById(this.inputs.campos[index].id).value >this.inputs.campos[index].max)
             {
              eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  this.inputs.campos[index].max
              );
              document.getElementById(
                this.inputs.campos[index].id
              ).value = eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  this.inputs.campos[index].max
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
      console.log(value.target.value);
      this.selectproduct = value.target.value
      /*
            if (seleccion == undefined||seleccion==''||seleccion==null) {
                console.log("esperando")
            }else
            {//200.116.*/
                this.axios.get(urlservicios+"servicios/" + value.target.value)
                .then(response => {
                    this.serviciosurl = response.data;
                    //console.log(this.serviciosurl);
                });
            
            
    },
    campos(selectproduct, selectservice) {
      console.log("inputs");
            
         this.axios.get(
          urlservicios+"estructuraf/" +
            selectproduct._id +
            "/" +
            selectservice._id)   
            .then(response => {
            this.inputs = response.data;
            
            console.log(this.inputs);
            this.objeto = this.inputs.objeto;
                  console.log(this.objeto)
            }).catch(function(error){
              console.log("error estruc -> "+JSON.stringify(error));
            })
    },
    envioServicio() {
      console.log("se envia");
      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);

      var selec = localStorage.getItem("orden");
      var selecc = JSON.parse(selec);
      //console.log(selecc)
      //console.log(infologin._id);
      var objeto = {
        id_usuario: infologin._id,
        id_centro: selecc.selected_center,
        id_remitente: selecc.selected_client,
        detalle: this.DetalleServicio
      };
      //console.log(JSON.stringify(objeto));
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
    }
  },
  created: function() {
    console.log("creado");
  },
  beforeCreate: function() {
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    //console.log(infologin)
    //console.log(infologin.id_OperadorLogistico);
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

</style>
