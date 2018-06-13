<template>
	<b-container>
		<b-row>
      {{this.inputstotales}}
			<b-btn @click="volver" variant="success">
				<i class="fa fa-chevron-left" aria-hidden="true"></i>
				Volver
			</b-btn>
		</b-row>

    <b-card class="border my-2">
      <div slot="header" class="w-100">
        <strong class="float-left ">Información del cliente</strong>
      </div>
      <b-row class="text-center">
        <b-col md="3">
          <p class="text-primary" style="font-size:25px;">Orden de Servicio</p>
        </b-col>
        <b-col md="3">
          <p class="text-primary" style="font-size:25px;">Fecha Creación</p>
        </b-col>
        <b-col md="3">
          <p class="text-primary" style="font-size:25px;">Estado</p>
        </b-col>
        <b-col md="3">
          <p class="text-primary" style="font-size:25px;">Leída por courier</p>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col md="3">
          <h2 class="text-secondary" style="font-size:18px;">{{info.id}}</h2>
        </b-col>
        <b-col md="3">
          <h2 class="text-secondary" style="font-size:18px;">{{currentUser.fecha_creacion | formatdate}}</h2>
        </b-col>
        <b-col md="3">
          <h2 class="text-secondary" style="font-size:18px;">{{currentUser.estado}}</h2>
        </b-col>
        <b-col md="3">
          <h2 class="text-secondary text-uppercase" style="font-size:18px;">{{leido}}</h2>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="border my-2">
      <div slot="header" class="w-100">
        <strong class="float-left ">Información del cliente</strong>
      </div>
      <b-row class="mb-2">
        <b-col>
          <b-row>
            <b-col>
              <h4 class="text-primary">Cliente:</h4>
            </b-col>
            <b-col cols="8">
              <p class="text-capitalize" style="font-size:20px;">{{currentUser.id_cliente.nombre}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="text-primary">Dirección Cliente:</h4>
            </b-col>
            <b-col cols="8">
              <p class="text-capitalize" style="font-size:20px;">{{currentUser.id_cliente.direccion}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="text-primary">Centro de Costo:</h4>
            </b-col>
            <b-col cols="8">
              <p class="text-capitalize" style="font-size:20px;">{{currentUser.id_centro_costo.nombre}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="text-primary">Dirección Centro de Costo:</h4>
            </b-col>
            <b-col cols="8">
              <p class="text-capitalize" style="font-size:20px;">{{currentUser.id_centro_costo.direccion}}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="border my-2">
      <div slot="header" class="w-100">
        <strong class="float-left">Información de recolección</strong>
      </div>
      <b-row class="mb-2">
        <b-col>
          <b-row>
            <b-col>
              <h4 class="text-primary">Dirección</h4>
            </b-col>
            <b-col cols="8">
              <p  style="font-size:20px;">{{currentUser.remitente.direccion_recogida}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="text-primary">Nombre Contacto</h4>
            </b-col>
            <b-col cols="8">
              <p  style="font-size:20px;">{{currentUser.remitente.nombre_contacto}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="text-primary">Telefono Contacto</h4>
            </b-col>
            <b-col cols="8">
              <p  style="font-size:20px;">{{currentUser.remitente.telefono_contacto}}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="border my-2">
      <div slot="header" class="w-100">
        <strong class="float-left ">Detalle de los envios</strong>
      </div>
      <b-row class="mb-2">
        <b-table :fields="fields" ref="table" :per-page="5" :current-page="currentPage"
          :items="this.currentUser.detalle">
          <template slot="consecutivo" slot-scope="data">
            {{data.item.id}}
          </template>
          <template slot="productoslocal" slot-scope="data">
            {{data.value.nombre}}
          </template>
          <template slot="servicioslocal" slot-scope="data">
            {{data.value.nombre}}
          </template>
          <!-- ------------------------------------------------------- -->
          <template slot="editar" slot-scope="data" v-if="detalleTrayecto.lista.length">
            <i
            v-bind:class="[`btn ${(detalleTrayecto.lista[data.index]) ? ('btn-success') : ('btn-danger')} fa fa-table rounded`]"
            v-on:click.stop="actualizar(data.index,data.item.id)"></i>
          </template>
          <!-- ------------------------------------------------------- -->
        </b-table>
        <b-pagination size="md" :total-rows="this.currentUser.detalle.length" v-model="currentPage" :per-page="5">
        </b-pagination>
      </b-row>
    </b-card>
    <b-container>
      <b-row class="my-3">
        <b-col>
          <h4 class="text-primary">Medio de transporte: </h4>
          <!--
          <b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre"
          value-field="_id" :state="statuscourier"
          @change.native="selectcuriers" :disabled="selec_disable">
          </b-form-select>
          -->
          <v-select v-model="model_medios" label="tipo" placeholder="Medio de Transporte"
            :options="medios" @input="vehic()"
            :disabled="medios_disable"></v-select>
        </b-col>
        <b-col>
          <h4 class="text-primary">Courier: </h4>
          <!--
          <b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre"
          value-field="_id" :state="statuscourier"
          @change.native="selectcuriers" :disabled="selec_disable">
          </b-form-select>
          @input="updatecourier()"
            @search="onSearch"
          -->
          <v-select v-model="selected_curier" label="nombre" placeholder="Courier"
            :options="curiers"
            :disabled="selec_disable"
            @onChange="pruebacambio"
            @input="updatecourier()"
            @search="onSearch"
            :resetOnOptionsChange="true"
          ></v-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-btn class="float-right rounded" size="lg" variant="success" @click="asignar(selected_curier)"
          :disabled=desabilitarguardar()>Aceptar</b-btn>
        </b-col>
      </b-row>
    </b-container>

		<!-- Modal para Trayectos-->
		<b-modal id="modalactualizar" ref="ModalAct" title="Editar Registro"
			no-close-on-esc
			no-close-on-backdrop
		  size="lg">
			<div slot="modal-header" class="w-100">
				<h4 class="float-left m-0 text-secondary">Editar Registro - Numero de Movilizado {{info.detalle[indemodal].id}}</h4>
			</div>
			<b-container fluid>
				<b-row>
					<b-col md="6">
            <b-card no-body class="border">
              <div slot="header" class="w-100">
                <h4 class="float-left">Remitente</h4>
              </div>
              <b-card-body class="p-2">
                <b-row>
                  <b-col md="4">
                    <h5 class="my-1">Nombre:</h5>
                  </b-col>
                  <b-col md="8">
                    <h5 class="font-weight-normal my-1">{{info.id_cliente.nombre}}</h5>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <h5 class="my-1">Dirección:</h5>
                  </b-col>
                  <b-col md="8">
                    <h5 class="font-weight-normal my-1">{{info.id_centro_costo.direccion}}</h5>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
					</b-col>
					<b-col md="6">
            <b-card no-body class="border">
              <div slot="header" class="w-100">
                <h3 class="float-left">Destinatario</h3>
              </div>
              <b-card-body class="p-2">
                <b-row>
                  <b-col md="4">
                    <h5 class="my-1">Nombre:</h5>
                  </b-col>
                  <b-col md="8">
                    <h5 class="font-weight-normal my-1">
                      {{info.detalle[indemodal].detalleslocal.destinatario.nombre}}
                    </h5>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <h5 class="my-1">Dirección:</h5>
                  </b-col>
                  <b-col md="8">
                    <h5 class="font-weight-normal my-1">
                      {{info.detalle[indemodal].detalleslocal.destinatario.direccion}}
                    </h5>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
					</b-col>
				</b-row>
				<b-row class="mt-3 mb-2">
					<b-col md="5">
						<h4># Orden de servicio</h4>
					</b-col>
					<b-col md="7">
						<h4>{{info.id}}</h4>
					</b-col>
				</b-row>
				<b-row class="mb-2">
					<b-col md="5">
						<h5>Producto:</h5>
					</b-col>
					<b-col md="7">
            <h5 class="text-secondary font-weight-normal">{{producto}}</h5>
					</b-col>
				</b-row>
				<b-row class="mb-2">
					<b-col md="5">
						<h5>Servicio:</h5>
					</b-col>
					<b-col md="7">
            <h5 class="text-secondary font-weight-normal">{{servicio}}</h5>
					</b-col>
				</b-row>
        <b-row v-for="(data,indice) in inputs.campos" class="my-1 card-text">
          <template v-if="data.type=='number'">
            <b-col cols="5">
              <label  class="col-form-label col-form-label-sm text-capitalize" :style="data.style" >{{data.nombre}}: </label>
            </b-col>
            <b-col cols="7">
              <input class="form-control form-control-sm"  :type="data.type" :id="data.id" :style="data.style" :max="data.max"
                @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="data.requerido_edi==false"
                :value="values(data.id)" required>
            </b-col>
          </template>
          <template v-if="data.type=='text'">
            <b-col cols="5">
              <label class="col-form-label col-form-label-sm text-capitalize" :style="data.style" >{{data.nombre}}: </label>
            </b-col>
            <b-col cols="7">
              <input class="form-control form-control-sm"  :type="data.type" :id="data.id" :style="data.style" :max="data.max"
                @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="data.requerido_edi==false"
                :value="values(data.id)"  required>
            </b-col>
          </template>
          <template v-if="data.type=='select'" class="my-1 card-text">
            <b-col cols="5">
<<<<<<< HEAD
              <label class="col-form-label col-form-label-sm text-capitalize">{{data.nombre}}</label>
=======
              <label class="col-form-label col-form-label-sm text-capitalize">{{data.nombre}}:</label>
>>>>>>> cristian
            </b-col>
            <b-col cols="7">
              <!-- ------------------------------------------------------- -->
              <b-form-select class="col-form-label col-form-label-sm "
                :id="data.id" :options="trayectos" text-field="nombre" value-field="_id"
                @input="seleccionar(data)" :value="valueseleccion(data,indice)"
                :disabled="selec_disable">
              </b-form-select>
              <!-- ------------------------------------------------------- -->
            </b-col>
          </template>
        </b-row>
				<b-row v-if="itemsvariables.length">
					<b-table striped hover :items="itemsvariables"></b-table>
				</b-row>
			</b-container>
			<div slot="modal-footer" class="w-100">
				<b-btn class="mt-3 rounded" variant="danger"  @click="hideModal">
					<i class="fa fa-times-circle" aria-hidden="true"></i>&#32;Cancelar
        </b-btn>
				<b-btn class="mt-3 float-right rounded" variant="success" v-on:click="ingresarTrayectos()"
					:disabled=desabilitarguardar()>
						<i class="fa fa-floppy-o" aria-hidden="true"></i>&#32;Guardar
        </b-btn>
			</div>
		</b-modal>
	</b-container>
</template>

<script>
import { bus } from "../main";
import { urlservicios } from "../main";
import moment from "moment";
import io from 'socket.io-client'
import { CreateSocket } from './utils/socket'
export default {
  data() {
    return {
      socket: null,
      medios_disable:false,
      leido: "",
      model_medios: null,
      medios: [],
      items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Consultar Ordenes de Servicio",
          href: "#"
        }
      ],
      statuscourier: null,
      itemsvariables: [],
      servicio: "",
      producto: "",
      id_cliente_local: null,
      selec_disable: false,
      indemodal: 0,
      vali: "",
      consecutivo: "",
      camposT: [],
      inputstotales: [],
      id_trayectos: [],
      detallesactualizar: "",
      fields: [
        { key: "consecutivo", label: "N. Movilizado" },
        { key: "productoslocal", label: "Productos" },
        { key: "servicioslocal", label: "Servicios" },
        "editar"
      ],
      currentPage: 1,
      currentUser: "",
      selected_curier: null,
      curiers: [],
      Documento: "",
      selection: null,
      trayectos: null,
      // -------------------------------------------------------
      detalleTrayecto: {
        indiceActual: null,
        lista: []
      },
      // -------------------------------------------------------
      indices: "",
      inputs: "",
      campos: {},
      info: {}
    };
  },
  filters: {
    formatdate: function(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY, h:mm:ss a");
      }
    }
  },
  methods: {
    pruebacambio(){
      console.log("entro a cambios");
    },
    updatecourier(){
      console.log(this.selected_curier);
      console.log("emito!");
        this.socket.on('CouriersActivos', (connectionList) => {
            console.log(connectionList);

            this.curiers=connectionList
          });
    },
    onSearch(search) {

        //loading(true);
      this.search(search, this);

    },

  search(search){
    console.log(search);
    console.log("emito en searchs");
    this.socket.on('CouriersActivos', (connectionList) => {
      console.log("emitio correcto");
                //console.log(connectionList);
                this.curiers=connectionList
              });


  },
    vehic() {
      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);

      if (typeof this.model_medios == "string") {
        console.log(this.model_medios);
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .get(urlservicios + "medios/")
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });

            this.medios = response.data;
            this.medios.forEach(element => {
              if (element._id == this.model_medios) {
                this.model_medios = element;

              }

            });

            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });

            /*
            this.axios.get(
                urlservicios +"UsuariosCurier/" +
                  infologin.id_OperadorLogistico._id +
                  "/" +this.model_medios._id)
              .then(response2 => {
                console.log("hacemos peticion de courier");
                this.curiers = response2.data;
                console.log(response2);
                //this.selec_disable=false
                var nombre;
                console.log(this.curiers);
                this.curiers.forEach(element2 => {
                  console.log("tenemos segundo courier");
                  nombre = element2.nombre;
                  element2.nombre = nombre + " " + element2.apellido;
                  console.log(element2);
                  if (element2._id == this.selected_curier) {
                    this.selected_curier = element2;
                    console.log("-----------------");
                    console.log(element2);
                  }
                  var load = false;
                  setTimeout(() => {
                    bus.$emit("load", {
                      load
                    });
                  });
                });
              });
              */
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal(
              "Se presento un problema",
              "Intente nuevamente, por favor",
              "warning"
            );
          });

      } else {
        if (this.model_medios != null) {
          console.log("no tengo medios");
          var nombre;
          if(infologin.id_OperadorLogistico.confirmacionSocket==false){
            var load = true;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          
          
          this.axios
            .get(
              urlservicios +
                "UsuariosCurier/" +
                infologin.id_OperadorLogistico._id +
                "/" +
                this.model_medios._id
            )
            .then(response => {
              this.curiers = response.data;
              this.curiers.forEach(element2 => {
                nombre = element2.nombre;
                element2.nombre = nombre + " " + element2.apellido;
                if (element2._id == this.selected_curier) {
                  this.selected_curier = element2;
                }
              });
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              //this.selec_disable=false
            })
            .catch(function(error) {
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              swal(
                "Se presento un problema",
                "Intente nuevamente, por favor",
                "warning"
              );
            });
          }
          else{
            console.log("emito");
          this.socket.emit('MedioCourier', {
            id_operadorlogistico:infologin.id_OperadorLogistico._id,
            id_cliente:infologin._id,
            medio_transporte: this.model_medios._id,
            descripcion: 'orden'
          });

          this.socket.on('CouriersActivos', (connectionList) => {
            //console.log(connectionList);
            this.curiers=connectionList
          });
          }
          
          /*
          
            */
        } else {
          //this.selec_disable=true
           console.log("no tiene medios");
        }
      }
    },
    desabilitarguardar() {
      if (
        this.info.estado == "orden de servicio cancelada" ||
        this.info.estado == "Orden De Servicio Recogida"||
         this.info.estado == "Orden de servicio cerrada"
      ) {
        //selec_disable
        this.selec_disable = true;
        this.medios_disable=true
        return true;
      } else {
        return false;
      }
    },
    desabilitar(value) {
      if (this.selec_disable == true) {
        return true;
      } else {
        return value.requerido_edi;
      }
    },
    valueseleccion(datos, indices) {
      for (var x = 0; x < this.currentUser.detalle.length; x++) {
        if (
          this.currentUser.detalle[this.indices].detalleslocal.infor
            .trayectoobj == undefined
        ) {
          return null;
        } else {
          var llaves = Object.keys(this.campos);

          return eval(
            "this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj." +
              llaves[indices]
          );
        }
      }
    },
    seleccionar(value) {
      var trayecto;
      var trayectoobj = {};
      var x = document.getElementById(value.id).value;
      if (
        x == "" ||
        x == null ||
        x == undefined ||
        x == "000000000000000000000000"
      ) {
        this.trayectoSeleccionado(null);
      } else {
        eval("this.campos." + value.vmodel + "=" + "x");
        for (var x = 0; x < this.trayectos.length; x++) {
          if (this.trayectos[x]._id == eval("this.campos." + value.vmodel)) {
            trayectoobj = {
              id_trayecto: eval("this.campos." + value.vmodel),
              nombre: this.trayectos[x].nombre
            };

            if (
              this.currentUser.detalle[this.indices].detalleslocal.infor
                .trayecto == undefined ||
              this.currentUser.detalle[this.indices].detalleslocal.infor
                .trayecto == null
            ) {
              this.currentUser.detalle[
                this.indices
              ].detalleslocal.infor.trayectoobj = {};
              this.currentUser.detalle[
                this.indices
              ].detalleslocal.infor.trayectoobj = trayectoobj;
              this.currentUser.detalle[
                this.indices
              ].detalleslocal.infor.trayecto = this.trayectos[x].nombre;
              trayecto = this.trayectos[x].nombre;
              this.$refs.table.refresh();
            } else {
              this.currentUser.detalle[
                this.indices
              ].detalleslocal.infor.trayectoobj = trayectoobj;

              this.currentUser.detalle[
                this.indices
              ].detalleslocal.infor.trayecto = this.trayectos[x].nombre;
              trayecto = this.trayectos[x].nombre;
              this.$refs.table.refresh();
            }
            this.trayectoSeleccionado(trayectoobj.id_trayecto);
          }
        }
        document.getElementById(value.id).value = "null";
        this.$refs.table.refresh();
      }
    },
    volver() {
      var ocultar = true;
      var eliminar = this.vali;
      setTimeout(() => {
        bus.$emit("ocultar", {
          ocultar,
          eliminar
        });
      });
      this.$router.replace("/inicio/consultar/resultado");
    },
    selectcuriers(value) {
      //this.selected_curier=value.target.value
    },
    Presiono(indi, dato) {
      if (
        document.getElementById(this.inputs.campos[indi].id).value == null ||
        document.getElementById(this.inputs.campos[indi].id).value == ""
      ) {
        swal("Oops...", "No puede ser vacio", "error");
      } else {
        if (
          document.getElementById(this.inputs.campos[indi].id).value >
          this.inputs.campos[indi].max
        ) {
          //eval("this.currentUser.detalle[this.indices].detalleslocal.infor.")
          swal(
            "Oops...",
            "El maximo permitido es: " + this.inputs.campos[indi].max,
            "error"
          );
          document.getElementById(
            this.inputs.campos[indi].id
          ).value = this.inputs.campos[indi].max;
          eval(
            "this.campos." +
              document.getElementById(this.inputs.campos[indi].id).id +
              "=" +
              document.getElementById(this.inputs.campos[indi].id).value
          );
        } else {
          eval(
            "this.campos." +
              document.getElementById(this.inputs.campos[indi].id).id +
              "=" +
              document.getElementById(this.inputs.campos[indi].id).value
          );
        }
      }
    },
    values(dato) {
      eval("this.campos." +dato +"=" +"this.currentUser.detalle[this.indices].detalleslocal.infor." +dato);
      return eval(
        "this.currentUser.detalle[this.indices].detalleslocal.infor." + dato
      );
    },
    hideModal() {
      this.detallesactualizar = "";
      this.itemsvariables = "";
      this.inputs = "";
      this.campos = "";
      this.indices = "";
      this.consecutivo = "";
      this.selection = "";
      this.$refs.ModalAct.hide();
    },
    ingresarTrayectos() {
      if (this.id_cliente_local != null) {
        this.$refs.ModalAct.hide();
      } else {
        this.$refs.table.refresh();
        var nombresel;

        if (this.info.estado == "orden de servicio cancelada") {
          swal("Cuidado!", "Orden de Servicio Cancelada", "warning");
        } else {
          this.selection = this.campos.id_trayecto;
          if (
            this.selection == "" ||
            this.selection == "000000000000000000000000"
          ) {
            this.detallesactualizar = "";
            this.itemsvariables = "";
            this.inputs = "";
            this.campos = "";
            this.indices = "";
            this.consecutivo = "";
            this.selection = "";
          } else {
            for (var x = 0; x < this.trayectos.length; x++) {
              if (this.trayectos[x]._id == this.selection) {
                nombresel = this.trayectos[x].nombre;
              }
            }
            var prueba = this.currentUser.detalle[this.indices].detalleslocal
              .infor;

            var objeto = {
              id_trayecto: this.selection,
              nombre: nombresel,
              campos: this.campos
            };

            this.$refs.table.refresh();
            /*
            var load = true;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            */
            console.log("objeto");
            console.log(objeto);
            console.log(this.currentUser);
            console.log(this.indemodal);
            console.log(this.inputs);
            var enviodestinatario
            var load = true;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
            this.inputs.campos.forEach(element => {
              if(element.HeredaDestinatario==true)
              {
                enviodestinatario=element
              }
            });
            console.log(enviodestinatario);
            var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
            var destina
            var llavescampos =Object.keys(this.inputs.objeto)
            console.log("------");
            console.log(llavescampos);
            var josea
            llavescampos.forEach(element => {
              if(enviodestinatario.vmodel==element){
                console.log("tengo vmodel ==");
                  console.log("campos con eval");
                  console.log(objeto.id_trayecto);
                  josea[element]=objeto.id_trayecto
                  console.log(josea);
                 var objdestinatario={
                  propiedadesDinamicas : josea
                }
                
                  console.log(objdestinatario);
              }
            });
            
            this.axios.get(urlservicios+"obtenerDestinatario/"+this.currentUser.detalle[this.indemodal].detalleslocal.destinatario.numero_identificacion)
              .then(response =>{
                destina=response.data.destinatarios
                console.log(destina);
                
               
                
                /*
                this.axios.post(urlservicios+"ActualizarDestinatario" +"/" +destina._id,objdestinatario)
                  .then(responsedestinatario =>{
                    console.log(responsedestinatario);
                  })
                  */
              });
            //console.log(destina);
            /*
            this.axios.post(urlservicios +"ActualizarTrayecto/" +this.currentUser._id +"/" +this.consecutivo,objeto)
              .then(response => {
                this.$refs.table.refresh();
                var objeto2 = {
                  id_trayecto: this.selection,
                  campos: this.campos,
                  indice: this.indices,
                  detalle: this.currentUser.detalle[this.indices].id
                };
                if (this.id_trayectos.length == 0) {
                  this.id_trayectos.push(objeto2);
                } else {
                  this.id_trayectos.forEach((obj, ind) => {
                    if (obj.indice == this.indices) {
                      this.id_trayectos.splice(obj, 1);
                      this.id_trayectos.push(objeto2);

                    } else {
                      this.id_trayectos.push(objeto2);
                    }
                  });
                }
                this.$refs.table.refresh();
                this.selection = "";
                this.detallesactualizar = "";
                this.itemsvariables = "";
                this.inputs = "";
                this.campos = "";
                this.indices = "";
                this.consecutivo = "";
                this.selection = "";
                //this.$refs.ModalAct.hide();
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
              })
              .catch(function(error) {
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
                swal(
                  "Se presento un problema",
                  "Intente nuevamente, por favor",
                  "warning"
                );
              });
              
          */
          
          }
        }
      }
    },

    asignarcurier(seleccionado) {
      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);
      if (
        seleccionado == "" ||
        seleccionado == "null" ||
        seleccionado == null
      ) {
        swal("Atencion!", "Seleccione un Courier", "warning");
        seleccionado = "null";
        this.statuscourier = false;
      } else {
        if(infologin.id_OperadorLogistico.confirmacionSocket==true){
          this.socket.emit('new-message', {
          idOperador:infologin.id_OperadorLogistico._id,//per logistico
          idOrigen:infologin._id,//id usuario
          idDestino:seleccionado._id,//id courier seleccionado
          mensaje :{
              contacto:this.currentUser.remitente.nombre_contacto,//nombre remitente
              direccion:this.currentUser.remitente.direccion_recogida,//direccion remitente
              observaciones:this.currentUser.remitente.direccion_recogida,
              num_movilizados:this.currentUser.detalle.length,//cantidad movilizados orden
              tipo_proceso:1
            }
          })
          var load = true;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
        }
        else{
          var obj = {
          id_orden: this.currentUser._id,
          id_curier: seleccionado._id,
          id_medio: this.model_medios._id
        };

        this.statuscourier = null;
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .post(urlservicios + "AsignarOrdenCurrier/", obj)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.Documento = response.data;
            if (this.Documento.validacion == false) {
            } else {
              swal("Excelente!", "" + this.Documento.message, "success");
            }
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal(
              "Se presento un problema",
              "Intente nuevamente, por favor",
              "warning"
            );
          });
        }
        /*
        var objson ={
          id_operador:infologin.id_OperadorLogistico._id,//per logistico
          id_origen:infologin._id,//id usuario
          id_destino:seleccionado._id,//id courier seleccionado
          mensaje :{
            contacto:this.currentUser.remitente.nombre_contacto,//nombre remitente
            direccion:this.currentUser.remitente.direccion_recogida+"pruebaaaaaaaaa",//direccion remitente
            observaciones:"observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas observaciones de pruebas ",
            num_movilizados:this.currentUser.detalle.length,//cantidad movilizados orden
            tipo_proceso:1
          }
        }
        */



      }

    },
    asignar(seleccionado) {
      if (this.id_cliente_local != null) {
        var ocultar = true;
        var eliminar = this.vali;
        setTimeout(() => {
          bus.$emit("ocultar", {
            ocultar,
            eliminar
          });
        });
        //this.$router.go(-1)
        this.$router.replace("/inicio/consultar/resultado");
      } else {
        var banderasinT = false;
        var banderaconT = false;
        var contador = 0;
        var pendi = [];
        var correcto = [];

        if (this.id_trayectos.length == 0) {
          for (var x = 0; x < this.currentUser.detalle.length; x++) {

            var llavesinfor = Object.keys(
              this.currentUser.detalle[x].detalleslocal.infor
            );
            for (var y = 0; y < llavesinfor.length; y++) {
              if (llavesinfor[y] != "trayectoobj") {
              } else {

                banderasinT = true;
                contador = contador + 1;
                correcto.push(x);
              }
            }
            pendi.push(x);
          }
        } else {
          for (var x = 0; x < this.currentUser.detalle.length; x++) {
            var llavesinfor = Object.keys(
              this.currentUser.detalle[x].detalleslocal.infor
            );
            for (var y = 0; y < llavesinfor.length; y++) {

              if (llavesinfor[y] != "trayectoobj") {
              } else {
                /*
								if(typeof(eval('this.currentUser.detalle[x].detalleslocal.infor.'+llavesinfor[y]))!='object')
								{

								}
								*/
                banderasinT = true;
                contador = contador + 1;
                correcto.push(x);
              }
            }
            pendi.push(x);
          }
        }
        for (var o = 0; o < pendi.length; o++) {


          pendi[o] = pendi[o]++;
          for (var p = 0; p < correcto.length; p++) {
            if (pendi[o] == correcto[p]) {

              pendi.splice(o, 1);
            }
          }
        }
        for (var o = 0; o < pendi.length; o++) {
          pendi[o]++;
        }

        if (contador == this.currentUser.detalle.length) {
          this.asignarcurier(seleccionado);
        } else {
          swal(
            "Falta algo por completar!",
            "Los servicios " + pendi + " Aún no tienen asignado un trayecto",
            "error"
          );
        }
      }
    },

    actualizar(indice, consecutivo, callback, hidden) {
      var produc
      var serv
      this.currentUser.detalle.forEach((element,i )=> {
        if(element.id==consecutivo){
          this.indemodal=i

          this.servicio =element.servicioslocal.nombre;
          this.producto=element.productoslocal.nombre;
          this.itemsvariables=element.detalleslocal.infor.objetoUnidades;
          produc= element.productoslocal._id;
          serv=element.servicioslocal._id
          this.detallesactualizar=element.detalleslocal
        }
      });
      //this.indemodal = indice;
      this.consecutivo = consecutivo;

      var vacio = { _id: null, nombre: "Por Favor Seleccione un Trayecto" };
      if (
        this.info.estado == "orden de servicio cancelada" ||
        this.info.estado == "Orden De Servicio Recogida" ||
        this.info.estado == "Orden de servicio cerrada") {
        this.indices = this.indemodal;
        /*
        this.detallesactualizar = this.currentUser.detalle[indice].detalleslocal;
        this.servicio = this.currentUser.detalle[indice].servicioslocal.nombre;
        this.producto = this.currentUser.detalle[indice].productoslocal.nombre;
        this.itemsvariables = this.currentUser.detalle[indice].detalleslocal.infor.objetoUnidades;
        var produc = this.currentUser.detalle[indice].productoslocal._id;
        var serv = this.currentUser.detalle[indice].servicioslocal._id;
        */
        var load = true;
        this.selec_disable=false
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        if (produc && serv) {
          this.axios.get(urlservicios + "estructuraf/" + produc + "/" + serv)
            .then(response => {
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              this.inputs = response.data;
              this.campos = response.data.objeto;
              for (var i = 0; i < this.inputs.campos.length; i++) {
                this.inputs.campos[i].diseable = "true";
                if (this.inputs.campos[i].type == "select") {
                  var login = localStorage.getItem("storedData");
                  var infologin = JSON.parse(login);
                  //document.getElementById(this.inputs.campos[i].id).value = null;

                  this.axios.get(this.inputs.campos[i].urlobjeto +infologin.id_OperadorLogistico._id)
                    .then(response22 => {
                      this.trayectos = response22.data;
                      this.trayectos.unshift(vacio);
                      var load = false;
                      setTimeout(() => {
                        bus.$emit("load", {
                          load
                        });
                      });
                      this.detalleTrayecto.indiceActual = (indice);
                      if (this.detalleTrayecto.lista[indice])
                          this.trayectoSeleccionado(this.detalleTrayecto.lista[indice]._id);
                      if (typeof callback === 'function')
                          callback();
                    })
                    .catch(function(error) {
                      var load = false;
                      setTimeout(() => {
                        bus.$emit("load", {
                          load
                        });
                      });
                      swal(
                        "Se presento un problema",
                        "Intente nuevamente, por favor",
                        "warning"
                      );
                    });
                } else {
                }
                if (!hidden)
                    this.$refs.ModalAct.show();
              }
            })
        } else {
          if (typeof callback === 'function')
              callback();
        }
      } else {
        this.indices = this.indemodal;
        /*
        this.detallesactualizar = this.currentUser.detalle[
          indice
        ].detalleslocal;
        this.itemsvariables = this.currentUser.detalle[
          indice
        ].detalleslocal.infor.objetoUnidades;
        this.servicio = this.currentUser.detalle[indice].servicioslocal.nombre;
        this.producto = this.currentUser.detalle[indice].productoslocal.nombre;
        var produc = this.currentUser.detalle[indice].productoslocal._id;
        var serv = this.currentUser.detalle[indice].servicioslocal._id;
        */
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        if (produc && serv) {
          this.axios.get(urlservicios + "estructuraf/" + produc + "/" + serv)
            .then(response => {
              this.selec_disable=false
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              this.inputs = response.data;
              this.campos = response.data.objeto;
              this.campos.objetoUnidades = this.itemsvariables;
              for (var i = 0; i < this.inputs.campos.length; i++) {
                if (this.inputs.campos[i].type == "select") {
                  var login = localStorage.getItem("storedData");
                  var infologin = JSON.parse(login);

                  var load = true;
                  setTimeout(() => {
                    bus.$emit("load", {
                      load
                    });
                  });
                  this.axios.get(this.inputs.campos[i].urlobjeto +infologin.id_OperadorLogistico._id)
                    .then(response => {
                      this.trayectos = response.data;
                      this.trayectos.unshift(vacio);
                      var load = false;
                      setTimeout(() => {
                        bus.$emit("load", {
                          load
                        });
                      });
                      this.detalleTrayecto.indiceActual = (indice);
                      if (this.detalleTrayecto.lista[indice])
                          this.trayectoSeleccionado(this.detalleTrayecto.lista[indice]._id);
                      if (typeof callback === 'function')
                          callback();
                    })
                    .catch(function(error) {
                      var load = false;
                      setTimeout(() => {
                        bus.$emit("load", {
                          load
                        });
                      });
                      swal(
                        "Se presento un problema",
                        "Intente nuevamente, por favor",
                        "warning"
                      );
                    });
                } else {
                }
              }
              if (!hidden)
                  this.$refs.ModalAct.show();
            })
            .catch(function(error) {
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              swal(
                "Se presento un problema",
                "Intente nuevamente, por favor",
                "warning"
              );
            });
        } else {
          if (typeof callback === 'function')
              callback();
        }
      }
      //this.$refs.ModalAct.show()

    },
    asignarfinal(data){
      console.log("entro a asignar final");
      console.log(data);
      if(data.mensaje.respuesta=="true"){
        var obj = {
          id_orden: this.currentUser._id,
          id_curier: data.idOrigen,
          id_medio: this.model_medios._id
        };
        this.statuscourier = null;
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .post(urlservicios + "AsignarOrdenCurrier/", obj)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.Documento = response.data;
            if (this.Documento.validacion == false) {
            } else {
              swal("Excelente!", "" + this.Documento.message, "success");
            }
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal(
              "Se presento un problema",
              "Intente nuevamente, por favor",
              "warning"
            );
          });

      }
      else{
        console.log("no hago nada");
      }
      /*
      var obj = {
          id_orden: this.currentUser._id,
          id_curier: seleccionado._id,
          id_medio: this.model_medios._id
        };

        this.statuscourier = null;
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .post(urlservicios + "AsignarOrdenCurrier/", obj)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.Documento = response.data;
            if (this.Documento.validacion == false) {
            } else {
              swal("Excelente!", "" + this.Documento.message, "success");
            }
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal(
              "Se presento un problema",
              "Intente nuevamente, por favor",
              "warning"
            );
          });
          */

    },
    // -------------------------------------------------------
    trayectoSeleccionado(idTrayecto) {
      if (this.trayectos) {
        const { indiceActual, lista  } = (this.detalleTrayecto);
        const trayecto = (this.trayectos.find((t) => (t._id === idTrayecto)));
        lista[indiceActual] = (trayecto && trayecto._id) ? (trayecto) : (null);
        console.log(this.detalleTrayecto);
      }
    }
    // -------------------------------------------------------
  },
  watch: {
    currentUser(n, o) {},
    selection(n, o) {}
  },
  mounted: function() {
    console.log("montado");
    console.log(this.currentUser);
    bus.$on(
      "ocultar",
      function(userObject) {
        this.ocultar = userObject.ocultar;
      }.bind(this)
    );
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    var id_cliente;

    if (infologin.id_cliente == undefined || infologin.id_cliente == null) {
      this.selec_disable = false;
      this.id_cliente_local = infologin.id_cliente;
    }
    // -------------------------------------------------------
    const idUser = (setInterval(() => {
      if (this.currentUser && this.currentUser.detalle) {
        this.detalleTrayecto.lista = [];
        let count = (0);
        (function trayectos() {
          if (count >= this.currentUser.detalle.length)
              return;
          const detalle = (this.currentUser.detalle[count]);
          this.actualizar(count, detalle.id, () => {
            if (this.trayectos) {
              const infor = (detalle.detalleslocal.infor);
              this.detalleTrayecto.lista[count] = (this.trayectos.find((t) =>
                (t._id === infor.id_trayecto)) || null);
            } else {
              this.detalleTrayecto.lista[count] = (null);
            }
            count++;
            trayectos.call(this);
          }, true);
        }).call(this);
        clearInterval(idUser);
      }
    }, 10));
    // -------------------------------------------------------
  },
  created: function() {
    bus.$on(
      "thisEvent",
      function(userObject) {
        // data.index,data.item.id
        this.currentUser = userObject.inde.item;
        this.currentUser.index = (userObject.inde.index);
        if (this.currentUser.leido == true) {
          this.leido = "Si";
        }
        if (this.currentUser.leido == false) {
          this.leido = "No";
        }
        if (this.currentUser.id_courier == "000000000000000000000000") {
          this.selected_curier = null;
        } else {
          this.selected_curier = this.currentUser.id_courier;
          this.model_medios = this.currentUser.id_medio;
        }
        this.vali = userObject.inde;
        this.info = this.currentUser;
        this.inputstotales = userObject.inputstotales;
      }.bind(this)
    );
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    //console.log(infologin);
    if(infologin.id_OperadorLogistico.confirmacionSocket==true){
      this.socket = (new CreateSocket({

        id_cliente: infologin._id,

        id_operador: infologin.id_OperadorLogistico._id

      }));
      this.socket.on('connect', () => {
        //console.log('conectado!!');
        //console.log(this.socket.instance.id);
      })
      this.socket.on('messages', (data) => {

        //$.cbSpinner("hide");
        console.log('------------------------------------');
        console.log(data);
        console.log('------------------------------------');
        this.asignarfinal(data)
        //this.message = (data.mensaje);
        var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
            // this.socket.instance.disconnect(true);
          });
      });
    }
    console.log("----");
    console.log(this.currentUser);      


  },
  beforeCreate: function() {
    var vacio = { _id: null, nombre: "Por Favor Seleccione un Cliente" };
    var x = 0;
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    var load = true;
    setTimeout(() => {
      bus.$emit("load", {
        load
      });
    });
    this.axios
      .get(urlservicios + "medios/")
      .then(response => {
        var load = false;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.medios = response.data;
      })
      .catch(function(error) {
        var load = false;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        swal(
          "Se presento un problema",
          "Intente nuevamente, por favor",
          "warning"
        );
      });
  }
};
</script>

<style modules >
.cardPersonalizada card-header {
  background-color: #4db35a;
  color: white;
}

.card-header {
  background-color: #4db35a !important;
  color: white;
}

.conta {
  padding: 3%;
}
.borderF {
  border: 1px solid #dcdcdc;
  margin: 1%;
}
.borderC {
  border: 1px solid gray;
  margin: 1%;
}
</style>
