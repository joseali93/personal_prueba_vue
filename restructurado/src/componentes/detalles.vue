<template>
	<b-container fluid>
		<b-row>
			<b-btn @click="volver" variant="success">
				<i class="fa fa-chevron-left" aria-hidden="true"></i>
				Volver
			</b-btn>
			
		
		</b-row>
		<b-row>
		   
		</b-row>
		  
		  
		<b-card>
			 <b-row class="text-center">
				 <b-col>
					<p style="font-size:25px;">Orden de Servicio  
					</p>
				 </b-col>
				<b-col>
					<p style="font-size:25px;">Fecha Creación</p>
				</b-col>
				<b-col>
					<p style="font-size:25px;">Estado</p>
				</b-col>
				<b-col>
					<p style="font-size:25px;">Leida por Courier</p>
				</b-col>
			</b-row>
			<b-row class="text-center">
				 <b-col >
					<strong class="text-primary " style="font-size:28px;">{{info.id}}</strong> 
				 </b-col>
				<b-col>
					<strong  class="text-primary" style="font-size:28px;">{{currentUser.fecha_creacion | formatdate}}</strong>
				</b-col>
				<b-col>
					<strong  class="text-primary " style="font-size:25px;">{{currentUser.estado}}</strong>
				</b-col>
				<b-col>
					<strong  class="text-primary " style="font-size:25px;">{{leido}}</strong>
				</b-col>
			</b-row>
			<b-card fluid    class="mb-2  borderC">
				<div slot="header" class="w-100 ">
					<strong class="float-left ">INFORMACIÓN DE CLIENTE</strong>
				</div>
				<b-row class="mb-2">
				<b-col>
					<b-row>
						<b-col >
							<h4 class="text-primary">Cliente:</h4>
						</b-col>
						<b-col cols="8"> 
							<p class="text-capitalize" style="font-size:20px; ">{{currentUser.id_cliente.nombre}}</p> 
						</b-col>
						
					</b-row>
					<b-row>
						<b-col>
							<h4 class="text-primary">Dirección Cliente:</h4>
						</b-col>
						<b-col cols="8">
							<p 
							class="text-capitalize"
							style="font-size:20px;">{{currentUser.id_cliente.direccion}}</p> 
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<h4 class="text-primary">Centro de Costo:</h4>
						</b-col>
						<b-col cols="8">
							<p 
							class="text-capitalize"
							style="font-size:20px;">{{currentUser.id_centro_costo.nombre}}</p> 
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<h4 class="text-primary">Dirección Centro de Costo:</h4>
						</b-col>
						<b-col cols="8">
							<p 
							class="text-capitalize"
							style="font-size:20px;">{{currentUser.id_centro_costo.direccion}}</p> 
						</b-col>
					</b-row>
				</b-col>
				</b-row>
			</b-card>

		<b-card 

			class="mb-2 borderC">
			 <div slot="header" class="w-100">
				<strong class="float-left ">INFORMACIÓN DE RECOLECCIÓN</strong>
			</div>
			 <b-row class="mb-2">
			<b-col>

				<b-row>
					<b-col>
						<h4 class="text-primary">Dirección </h4>
					</b-col>
					<b-col cols="8">
						<p  style="font-size:20px;">{{currentUser.remitente.direccion_recogida}}</p>
					</b-col>
				</b-row>
				 <b-row>
					<b-col>
						<h4 class="text-primary">Nombre Contacto </h4>
					</b-col>
					<b-col cols="8">
						<p  style="font-size:20px;">{{currentUser.remitente.nombre_contacto}}</p>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<h4 class="text-primary">Telefono Contacto </h4>
					</b-col>
					<b-col cols="8">
						<p  style="font-size:20px;">{{currentUser.remitente.telefono_contacto}}</p>
					</b-col>
				</b-row>
			</b-col>

			</b-row>
		</b-card>
		<b-card 

			class="mb-2 borderC">
			 <div slot="header" class="w-100">
				<strong class="float-left ">DETALLE ENVIOS</strong>
			</div>
			<b-row class="mb-2">
			<b-table :fields="fields" ref="table" :per-page="5" :current-page="currentPage" :items="this.currentUser.detalle">
				<template slot="consecutivo" slot-scope="data">
					{{data.item.id}}
				</template>
				<template slot="productoslocal" slot-scope="data">
					{{data.value.nombre}}         
				</template>
				<template slot="servicioslocal" slot-scope="data">
					{{data.value.nombre}}
				</template>
				
				<template slot="editar" slot-scope="data">
					<i class="btn btn-success fa fa-table" v-on:click.stop="actualizar(data.index,data.item.id)"></i>
				</template>
			</b-table>
			<b-pagination size="md" :total-rows="this.currentUser.detalle.length" v-model="currentPage" :per-page="5">
			</b-pagination>
			</b-row>
		</b-card>
		
			<b-row>
				<b-col>
					<h4 class="text-primary">Seleccione el Medio de Transporte: </h4>
					<!--
					<b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre"
					value-field="_id" :state="statuscourier"
					@change.native="selectcuriers" :disabled="selec_disable">
					</b-form-select>
					-->
					<v-select v-model="model_medios" label="tipo" placeholder="Seleccione el Medio de Transporte"
					  :options="medios" @input="vehic()"></v-select>
				</b-col>
				<b-col>
					<h4 class="text-primary">Seleccione el Currier: </h4>
					<!--
					<b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre"
					value-field="_id" :state="statuscourier"
					@change.native="selectcuriers" :disabled="selec_disable">
					</b-form-select>
					-->
					<v-select v-model="selected_curier" label="nombre" placeholder="Seleccione el Courier"
					  :options="curiers"  
					  :disabled="selec_disable"></v-select>
				</b-col>
				
			</b-row>
		<b-row>
			<b-btn size="lg" variant="success" @click="asignar(selected_curier)"
			 :disabled=desabilitarguardar()>Aceptar</b-btn>
		</b-row>
		</b-card-body>
	</b-card>
		
		
			  
		
		<!-- Modal para Trayectos-->
		<b-modal id="modalactualizar" ref="ModalAct" title="Editar Registro"
			no-close-on-esc
			no-close-on-backdrop
		 size="lg">
			<div slot="modal-header" class="w-100">
				<p class="float-left">Editar Registro - Numero de Movilizado {{info.detalle[indemodal].id}}</p>
			</div>
			<b-container fluid>
				
				<b-row>
					<b-col cols="5" class="borderF">
						<h2>
							Remitente
						</h2>
						<b-row>
							
							<b-col>
								<label class="col-form-label col-form-label-sm text-capitalize">
								Nombre Remitente:
								</label>
							</b-col>
							<b-col>
								<b-row class=" col-form-label col-form-label-sm">
									{{info.id_cliente.nombre}}
								</b-row>
							</b-col>                           
						</b-row>
						<b-row>
							<b-col>
								<label class=" col-form-label col-form-label-sm text-capitalize">
								Dirección Remitente:
								</label>
							</b-col>
							<b-col>
								<b-row class=" col-form-label col-form-label-sm">
									{{info.id_centro_costo.direccion}}
								</b-row>
							</b-col>
						</b-row>   
					</b-col>
					<b-col cols="6" class="borderF">
						<h2>
							Destinatario
						</h2>
						<b-row>
							<b-col>
								<label class=" col-form-label col-form-label-sm text-capitalize">
								Nombre Destinatario:
								</label>
							</b-col>
							<b-col>
								<b-row class=" col-form-label col-form-label-sm"> 
									{{info.detalle[indemodal].detalleslocal.destinatario.nombre}}
								</b-row>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								 <label class=" col-form-label col-form-label-sm text-capitalize">
									Dirección Destinatario:
								</label>
							</b-col>
							<b-col>
								<b-row class=" col-form-label col-form-label-sm">
									{{info.detalle[indemodal].detalleslocal.destinatario.direccion}}
								</b-row>
							</b-col>
						</b-row>                    
					</b-col>
				</b-row>
				<b-row >
					<b-col>
						<h2>
						<label class="col-form-label col-form-label-sm text-capitalize">N° Orden de Servicio</label>
						</h2>
					</b-col>
					<b-col>
						<h2>
						{{info.id}}
						</h2>
					</b-col>
				</b-row>
				
				<b-row >
					<b-col>
						<h2>
						<label class="col-form-label col-form-label-sm text-capitalize">Producto: </label>
						</h2>
					</b-col>
					<b-col>
						 <label class="col-form-label col-form-label-sm text-capitalize text-muted">
						{{producto}}
						 </label>
					</b-col>
					
				</b-row>
				<b-row >
					<b-col>
						<h2>
						<label class="col-form-label col-form-label-sm text-capitalize">Servicio: </label>
						</h2>
					</b-col>
					<b-col>
						<label class="col-form-label col-form-label-sm text-capitalize text-muted" >
						{{servicio}}
						</label>
					</b-col>
					
				</b-row>
				
					<b-row v-for="(data,indice) in inputs.campos" class="my-1 card-text"> 
					<template v-if="data.type=='number'" >
						<b-col cols="5">
							<label  class="col-form-label col-form-label-sm text-capitalize" :style="data.style" >{{data.placeholder}}: </label>
						</b-col>
						<b-col cols="6">
							<input class="form-control form-control-sm"  :type="data.type" :id="data.id" :style="data.style" :max="data.max"
							 @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="desabilitar(data)"
							  :value="values(data.id)"  required>
						</b-col>
					</template>
					<template v-if="data.type=='text'" >
						<b-col cols="5">
							<label  class="col-form-label col-form-label-sm text-capitalize" :style="data.style" >{{data.placeholder}}: </label>
						</b-col>
						<b-col cols="6">
							<input class="form-control form-control-sm"  :type="data.type" :id="data.id" :style="data.style" :max="data.max"
							 @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="desabilitar(data)"
							  :value="values(data.id)"  required>
						</b-col>
					</template>
					<template v-if="data.type=='select'" class="my-1 card-text">
						<b-col cols="5">
							<label class="col-form-label col-form-label-sm text-capitalize">{{data.placeholder}}</label>
						</b-col>
						<b-col cols="6">
							<b-form-select class="col-form-label col-form-label-sm " :id="data.id" :options="trayectos" 
								text-field="nombre" value-field="_id" 
							 @input="seleccionar(data)" :value="valueseleccion(data,indice)" 
							 :disabled="selec_disable">
							</b-form-select>
              
						</b-col>
					</template>

				</b-row>
				<b-row>
					<b-table striped hover :items="itemsvariables"></b-table>
				</b-row>
			</b-container>
			<div slot="modal-footer" class="w-100">
					<b-btn class="mt-3" variant="danger"  @click="hideModal">
						<i class="fa fa-times-circle" aria-hidden="true">  </i>
						Cancelar</b-btn>
					<b-btn class="mt-3 float-right " variant="success" v-on:click="ingresarTrayectos()"
					:disabled=desabilitarguardar()>
						 <i class="fa fa-floppy-o" aria-hidden="true"></i>
					Guardar</b-btn>

			</div>
		</b-modal>
	</b-container>
</template>

<script>
import { bus } from "../main";
import { urlservicios } from "../main";
import moment from "moment";

export default {
  data() {
    return {
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
    vehic() {

      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);

      if (typeof this.model_medios == "string") {
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
              .then(response2 => {
                this.curiers = response2.data;
                //this.selec_disable=false
                var nombre;
                this.curiers.forEach(element2 => {
                  nombre = element2.nombre;
                  element2.nombre = nombre + " " + element2.apellido;
                  if (element2._id == this.selected_curier) {
                    this.selected_curier = element2;
                  }
                  var load = false;
                  setTimeout(() => {
                    bus.$emit("load", {
                      load
                    });
                  });
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
      } else {
        if (this.model_medios != null) {

          var nombre;
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
        } else {
          //this.selec_disable=true
        }
      }
    },
    desabilitarguardar() {
      if (
        this.info.estado == "orden de servicio cancelada" ||
        this.info.estado == "Orden De Servicio Recogida"
      ) {
        this.selec_disable = true;
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
      console.log(dato);
      console.log(this.currentUser.detalle[this.indices].detalleslocal.infor);
      console.log(eval("this.campos." +dato +"=" +"this.currentUser.detalle[this.indices].detalleslocal.infor." +dato));
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

            var load = true;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.axios
              .post(
                urlservicios +
                  "ActualizarTrayecto/" +
                  this.currentUser._id +
                  "/" +
                  this.consecutivo,
                objeto
              )
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

                this.$refs.ModalAct.hide();
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
          }
        }
      }
    },
    asignarcurier(seleccionado) {
      if (
        seleccionado == "" ||
        seleccionado == "null" ||
        seleccionado == null
      ) {
        swal("Atencion!", "Seleccione un Courier", "warning");
        seleccionado = "null";
        this.statuscourier = false;
      } else {
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
            console.log(response);
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
    
    actualizar(indice, consecutivo) {
      
      
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
        console.log("esta recogidao algo asi");
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
        this.selec_disable=true
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios.get(urlservicios + "estructuraf/" + produc + "/" + serv)
          .then(response => {
            console.log("tengo estructura");
            console.log(response);
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.inputs = response.data;
            this.campos = response.data.objeto;
            for (var i = 0; i < this.inputs.campos.length; i++) {
              console.log("2 peticion");
              this.inputs.campos[i].diseable = "true";
              if (this.inputs.campos[i].type == "select") {
                console.log(this.inputs.campos[i]);
                var login = localStorage.getItem("storedData");
                var infologin = JSON.parse(login);
                //document.getElementById(this.inputs.campos[i].id).value = null;
                
                console.log(this.inputs.campos[i].urlobjeto);
                this.axios.get(this.inputs.campos[i].urlobjeto +infologin.id_OperadorLogistico._id)
                  .then(response22 => {
                    console.log("trayectos");
                    console.log(response22);
                    this.trayectos = response22.data;
                    this.trayectos.unshift(vacio);
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
              } else {
              }
               this.$refs.ModalAct.show();
            }
          })
          
          
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
        this.axios.get(urlservicios + "estructuraf/" + produc + "/" + serv)
          .then(response => {
                      console.log(response);
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
      }
      //this.$refs.ModalAct.show()
      
    }
  },
  watch: {
    currentUser(n, o) {},
    selection(n, o) {}
  },
  mounted: function() {
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
      this.selec_disable = true;
      this.id_cliente_local = infologin.id_cliente;
    }
  },
  created: function() {
    bus.$on(
      "thisEvent",
      function(userObject) {
        this.currentUser = userObject.inde.item;
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
