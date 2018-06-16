<template>
<!-- SE PERMITE LA SELECCION DE LOS CLIENTE Y CENTRO DE COSTO QUE CORRESPONDA PARA LA REALIZACION
DE LA ORDEN DE SERVICIO -->
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
      <b-row>
        <b-col>
          <b-btn class="rounded float-right btn-warning text-white mt-3" variant="primary" v-on:click="actualizar"
            v-b-popover.hover="'Continuar'">Continuar&#32;<i class="fa fa-arrow-right"></i>
          </b-btn>
        </b-col>
      </b-row>
      <b-card class="my-3 border" header="Primary" header-bg-variant="primary">
        <h3 slot="header" class="mb-0">Información del cliente</h3>
        <b-row>
          <b-col>
            <h3 class="text-primary">Fecha y hora de recolección</h3>
            <b-form-group class="text-dark my-1">
              <b-form-radio-group v-model="prueba" :options="radios" name="radiosSm" @change="cambio">
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col v-show="prueba=='second'" >
              <h3 class="text-primary"> Fecha </h3>
              <b-form-input  type="date" v-model="fecha"></b-form-input>
          </b-col>
            <b-col v-show="prueba=='second'" >
              <h3 class="text-primary"> Hora inicio </h3>
              <b-form-input  type="number" v-model="horaInicio"></b-form-input>
          </b-col>
            <b-col v-show="prueba=='second'" >
              <h3 class="text-primary"> Hora fin </h3>
              <b-form-input  type="number" v-model="horaFin"></b-form-input>
          </b-col>
        </b-row>
          <b-row>
              <b-col>
                  <h3 class="text-primary">Cliente</h3>
                  <!--
                  <b-form-select v-model="selected_client" class="mb-3"
                  :options="clientes" text-field="nombre" value-field="_id" @change.native="ClientesSelect"
                  :disabled="disable_selected_client" >
                  </b-form-select>
                  -->
                    <v-select v-model="selected_client" label="nombre" placeholder="Cliente"
                    :options="clientes" @input="clienteSeleccionado()"
                      :disabled="disable_selected_client" ></v-select>

              </b-col>
              <b-col>
                  <h3 class="text-primary">Centro de Costos</h3>
                  <preload v-if="load"></preload>

                  <v-select v-model="selected_center" label="nombre_concatenado"
                  placeholder=" Centro de Costo" :options="centros"
                  @input="centroSeleccionado()" :disabled="habilitar"
                    ></v-select>
              </b-col>

          </b-row>
      </b-card>
      <b-card class="my-3 border" header="Primary" header-bg-variant="primary">
          <h3 slot="header" class="mb-0">Información de recolección</h3>
          <b-row >
              <b-col class=" my-2">
                  <h3 class="text-primary">Nombre</h3>
                  <!--
                <v-select v-model="selected_client" label="nombre" placeholder="Seleccione el remitente"
                    :options="clientes" @input="clienteSeleccionado()"
                      :disabled="disable_selected_client" ></v-select>


                    v-model="remitente"

                  -->
                    <v-select label="nombre" :filterable="false" v-model=remitente
                    placeholder="Nombre" :options="optionsdestinatarios"
                    @input="updateOption"
                    @search="onSearch">
                    <template slot="no-options" >
                      Nombre del remitente..
                    </template>
                    <template slot="option" slot-scope="option">
                      <div class="d-center">
                        {{ option.nombre }}
                        </div>
                        <template slot="no-options" >
                        no se encontro nada.
                      </template>
                      </template>

                    </v-select>
                </b-col>
            </b-row>
            <b-row v-if="GeoReferenciacion==true">
                    <b-col>
                       <h3 class="text-primary">Dirección</h3>
                    <b-form-group id="exampleInputGroup1"
                      class="text-primary"
                        >
                            <b-form-input id="direccionGoogle"
                                size=""
                                ref="focusRemitente"
                                type="text"
                                v-model="remit.direccion"
                                required
                                @input="initAutocomplete()"
                               @change="initAutocomplete()"
                                placeholder="Dirección"
                                maxlength="100">
                            </b-form-input>
                            <!--
                               @change="localizar()"
                              @keypress="localizar()"
                                 @keyup.enter.native="localizar()"
                              -->

                    </b-form-group>
                    </b-col>
            </b-row>
            <b-row v-if="GeoReferenciacion==true">
                    <b-col>
                       <h3 class="text-primary">Complemento</h3>
                    <b-form-group id="exampleInputGroup1"
                      class="text-primary"
                        >
                            <b-form-input id="complemento"
                                size=""
                                type="text"
                                v-model="remit.complemento"
                                required

                                placeholder="Torre, Apartamento, Oficina, Conjunto Residencial, Bodega"
                                maxlength="100">
                            </b-form-input>
                            <!--
                               @change="localizar()"
                              @keypress="localizar()"
                                 @keyup.enter.native="localizar()"
                              -->

                    </b-form-group>
                    </b-col>
            </b-row>
            <b-row v-if="GeoReferenciacion==false">
                    <b-col>
                       <h3 class="text-primary">Dirección</h3>
                    <b-form-group id="exampleInputGroup1"
                      class="text-primary"
                        >
                            <b-form-input id="complemento"
                                size=""
                                type="text"
                                ref="focusRemitente"
                                v-model="remit.direccion "
                                required

                                placeholder="Calle, Carrera, Avenida..."
                                maxlength="100">
                            </b-form-input>
                            <!--
                               @change="localizar()"
                              @keypress="localizar()"
                                 @keyup.enter.native="localizar()"
                              -->

                    </b-form-group>
                    </b-col>
            </b-row>

          <b-row v-if="GeoReferenciacion">
                  <b-col>
                  <h3 class="text-primary">Dirección</h3>
                  <b-form-group id="exampleInputGroup1"
                    class="text-primary">
                          <b-form-input id="direccionGoogle"
                              size=""
                              ref="focusRemitente"
                              type="text"
                              v-model="remit.direccion"
                              required
                              @input="initAutocomplete()"
                              @change="initAutocomplete()"
                              placeholder="Dirección"
                              maxlength="100">
                          </b-form-input>
                          <!--
                              @change="localizar()"
                            @keypress="localizar()"
                                @keyup.enter.native="localizar()"
                            -->

                  </b-form-group>
                  </b-col>
          </b-row>

              <b-row>
                  <b-col>
                  <h3 class="text-primary">Contacto</h3>
                  <b-form-group id="exampleInputGroup2"
                  class="text-primary my-2">
                          <b-form-input id="nombre"
                              size=""
                              type="text"
                              v-model="remit.nombre"
                              required
                              placeholder="Nombre"
                              maxlength="100"
                              >
                          </b-form-input>
                  </b-form-group>
                  </b-col>
              </b-row>
              <b-row>
                  <b-col>
                  <h3 class="text-primary">Número de identificación</h3>
                  <b-form-group id="exampleInputGroup2"
                  class="text-primary my-2">
                          <b-form-input id="identificacion"
                              size=""
                              type="text"
                              v-model="remit.numero_identificacion"
                              required
                              placeholder="Numero de identificacion"
                              maxlength="100"
                              >
                          </b-form-input>
                  </b-form-group>
                  </b-col>
              </b-row>
              <b-row>
                  <b-col>
                  <h3 class="text-primary">Teléfono</h3>
                  <b-form-group id="exampleInputGroup3"
                  class="text-primary my-2">
                          <b-form-input id="telefono"
                          size=""
                              type="text"

                              v-model="remit.telefono"
                              required
                              placeholder="Teléfono"
                              maxlength="20">
                          </b-form-input>
                  </b-form-group>
                  </b-col>
              </b-row>



      </b-card>
    </b-container>
  </b-container>
</template>

<script>
/*
    POR MEDIO DE LA SELECCION DE UN SELECT SE COMPLETAN LOS CAMPOS FALTANTES
    LA DIRECCION LA DA EL CENTRO DE COSTO LUEGO DE SELECCIONADO
*/
import Orden from "../componentes/orden.vue";
import Preload from "../componentes/preload.vue";
import { bus } from "../main";
import { urlservicios } from "../main";
import axios from "axios";

export default {
  components: {
    Preload
  },
  watch: {
    clientprueba(newValue, oldValue) {}
  },
  data() {
    return {
      GeoReferenciacion: false,
      validacionDireccion: false,
      horaInicio: "",
      horaFin: "",
      prueba: "first",
      fecha: "",
      //observaciones:'',
      remit: {
        nombre: "",
        direccion: "",
        telefono: "",
        latitud: "",
        longitud: "",
        codigo_postal: "",
        complemento: ""
      },
      lati: "",
      longi: "",
      posta: "",
      remitente: "",
      /*
      remitente:{
        nombre:'',
        direccion:'',
        telefono:'',
        numero_identificacion:'',
      },
      */
      optionsdestinatarios: [],
      selected: "first",
      radios: [
        { text: "Hoy, cualquier horario", value: "first" },
        { text: "Programar recolección", value: "second" }
      ],
      items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Generación Orden",
          to: "/inicio/orden",
          active: true
        },
        {
          text: "Información de Recogida",
          to: "/inicio/orden",
          active: true
        }
      ],
      clientprueba: {},
      disable_selected_client: false,
      selected_client: null,
      selected_center: null,
      selected_cliente: {},
      selected_centro: {},
      clientes: [],
      centros: [],
      load: false,
      habilitar: true
    };
  },

  methods: {
    initAutocomplete() {
      var longi;
      var latit;
      var codpostal;
      var options = {
        componentRestrictions: { country: "co" }
      };
      var input = document.getElementById("direccionGoogle");
      var searchBox = new google.maps.places.Autocomplete(input);

      input.value = input.value.split(",")[0];
      searchBox.setComponentRestrictions({ country: ["co"] });
      searchBox.addListener(
        "place_changed",
        function() {
          input.value = input.value.split(",")[0];
          var places = searchBox.getPlace();
          if (!places.geometry) {
            this.validacionDireccion = false;
            console.log("no es posible geo referenciar");
            swal({
              position: "top-end",
              type: "warning",
              title: "No es posible Georeferenciar la dirección digitada",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.validacionDireccion = true;
            this.lati = places.geometry.location.lat();
            this.longi = places.geometry.location.lng();
            for (var i = 0; i < places.address_components.length; i++) {
              for (
                var j = 0;
                j < places.address_components[i].types.length;
                j++
              ) {
                if (places.address_components[i].types[j] == "postal_code") {
                  this.posta = places.address_components[i].long_name;
                }
              }
            }
          }

          // Object.keys(places).forEach((k) => {
        }.bind(this)
      );
      //input.value=input.value.split(',')[0];
      input.value = input.value.split(",")[0];
    },
    cambio() {
      if (this.prueba == "second") {
        this.fecha = "";
      }
    },
    updateOption() {
      var remi = localStorage.getItem("remitente");
      var remijson = JSON.parse(remi);
      if (remi) {
        if (this.remitente != null) {
          if (this.remitente.nombre == remijson.nombre) {
            this.onSearch(remijson.nombre);
          } else {
            this.onSearch(this.remitente.nombre);
            this.remit.nombre = "";
            this.remit.direccion = "";
            this.remit.numero_identificacion = "";
            this.remit.telefono = "";
            this.remit.nombre = "";
          }
        } else {
          this.remit.nombre = "";
          this.remit.direccion = "";
          this.remit.numero_identificacion = "";
          this.remit.telefono = "";
        }

        //  this.remitente=Object.assign({}, this.remitente);
      } else {
        if (this.remitente == null || this.remitente == "null") {
          this.remit.nombre = "";
          this.remit.direccion = "";
          this.remit.numero_identificacion = "";
          this.remit.telefono = "";
        } else {
          console.log("entro al else");
          this.remit = Object.assign({}, this.remitente);
          this.$nextTick(() => {
            this.$refs.focusRemitente.focus();
          });
          //this.remitente=Object.assign({}, this.remitente);
        }
      }

      //this.remitente=remijson
    },

    onSearch(search) {
      //loading(true);
      this.search(search, this);
    },

    search(search) {
      var remi = localStorage.getItem("remitente");
      var remijson = JSON.parse(remi);
      if (remi == undefined || remi == "") {
        this.optionsdestinatarios = [];
        setTimeout(
          function() {
            /*
            this.axios.get(`https://api.github.com/search/repositories?q=${escape(search)}`)
          .then(response => {
            this.optionsdestinatarios=response.data.items
                    loading(false);

          })
          */
          this.axios.get(urlservicios+`/obtenerDestinatarioNombre/${escape(search)}`)
          .then(response => {
            if(response.data.destinatarios.length==0)
            {
              this.optionsdestinatarios=[]
              this.remitente={}
              this.remitente.nombre=search

            }
            else{
              this.optionsdestinatarios=response.data.destinatarios
            }
            //this.optionsdestinatarios=response.data.destinatarios
                    //loading(false);

          })

          }.bind(this), 345);
        }else{
          console.log("entro al search con local");
          //this.remitente=remijson.nombre
          this.optionsdestinatarios=[]
          setTimeout(function(){
          this.axios.get(urlservicios+`/obtenerDestinatarioNombre/${escape(search)}`)
          .then(response => {
            if(response.data.destinatarios.length==0)
            {
              console.log("no tengo destinatarios blanqueo");
              this.optionsdestinatarios=[]
              localStorage.removeItem("remitente");
              //this.remitente={}

              //this.remitente=search

              this.remit.nombre=search
              if(this.GeoReferenciacion==true){
              this.$nextTick(() => {
                          this.$refs.focusRemitente.focus();
              });
            }             //this.remitente=this.remit.nombre
              this.remit.numero_identificacion=''
              this.remit.direccion=''
              this.remit.telefono=''
              //this.remitente.nombre=this.remit.nombre
              //this.remitente=this.remit
            }
            else{
              this.optionsdestinatarios=response.data.destinatarios
              if(this.GeoReferenciacion==true){
                this.$nextTick(() => {
                            this.$refs.focusRemitente.focus();
                });
              }
              this.optionsdestinatarios.forEach(element => {
                if(search==element.nombre){
                  this.remit=element
                }
              });
              }

            //this.remit=this.optionsdestinatarios[0]
                    //loading(false);




                //this.remit=this.optionsdestinatarios[0]
                //loading(false);
              });
          }.bind(this),
          345
        );
      }
    },

    centroSeleccionado() {
      this.selected_centro = Object.assign({}, this.selected_center);
    },
    clienteSeleccionado() {
      var orden = localStorage.getItem("orden");
      var ordenjson = JSON.parse(orden);
      if (this.disable_selected_client == true) {
        if (this.selected_client) {
          if (orden) {
            this.selected_cliente = Object.assign(
              {},
              ordenjson.selected_client
            );
            this.selected_centro = Object.assign({}, ordenjson.selected_center);
            this.selected_center = Object.assign({}, this.selected_centro);
            localStorage.removeItem("orden");

            var load = true;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.axios
              .get(
                urlservicios + "CentrosPorCliente/" + this.selected_client._id
              )
              .then(response => {
                this.centros = response.data;

                //this.selected_centro = {};
                this.habilitar = false;
                //this.load=false
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
              })
              .catch(error => {});
          } else {
            this.selected_cliente = Object.assign({}, this.selected_client);
            this.selected_center = null;
            var load = true;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.axios
              .get(
                urlservicios + "CentrosPorCliente/" + this.selected_client._id
              )
              .then(response => {
                this.centros = response.data;

                //this.selected_centro = {};
                this.habilitar = false;
                //this.load=false
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
              })
              .catch(error => {});
          }
        } else {
          var load = true;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          this.selected_cliente = {};
          this.selected_center = null;
          this.habilitar = true;
          this.centros = [];
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
        }
      } else {
        if (this.selected_client) {
          if (orden) {
            this.selected_cliente = Object.assign(
              {},
              ordenjson.selected_client
            );
            this.selected_centro = Object.assign({}, ordenjson.selected_center);
            this.selected_center = Object.assign({}, this.selected_centro);
            localStorage.removeItem("orden");

            var load = true;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.axios
              .get(
                urlservicios + "CentrosPorCliente/" + this.selected_client._id
              )
              .then(response => {
                this.centros = response.data;

                //this.selected_centro = {};
                this.habilitar = false;
                //this.load=false
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
              });
          } else {
            this.selected_cliente = Object.assign({}, this.selected_client);
            this.selected_center = null;
            var load = true;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });

            this.axios
              .get(
                urlservicios + "CentrosPorCliente/" + this.selected_client._id
              )
              .then(response => {
                this.centros = response.data;

                //this.selected_centro = {};
                this.habilitar = false;
                //this.load=false
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
              });
          }
        } else {
          var load = true;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          //this.selected_cliente = {};
          this.selected_center = null;
          this.habilitar = true;
          this.centros = [];
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
        }
      }
    },

    ClientesSelect(seleccion) {
      /*
                FUNCION DEL CUAL OBTENEMOS EL CLIENTE QUE FUE SELECCIONADO
            */

      if (this.disable_selected_client == true) {
        var id_cliente;
        this.selected_center = null;
        id_cliente = seleccion;
        var vacio = {
          _id: null,
          nombre: "Por Favor Seleccione un Centro de Costo"
        };
        for (var i = 0; i < this.clientes.length; i++) {
          if (this.clientes[i]._id == id_cliente) {
            this.selected_cliente = Object.assign({}, this.clientes[i]);
            //this.selected_cliente=this.clientes[i]
          }
        }
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        if (seleccion !== undefined) {
          this.axios
            .get(urlservicios + "CentrosPorCliente/" + id_cliente)
            .then(response => {
              this.centros = response.data;
              this.centros.unshift(vacio);
              this.selected_centro = {};
              this.habilitar = false;
              //this.load=false
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
            });
        }
      } else {
        if (seleccion.target.value == "" || seleccion.target.value == null) {
          this.selected_cliente = {};
          this.selected_centro = {};
          this.selected_center = null;
          this.habilitar = true;
        } else {
          var vacio = {
            _id: null,
            nombre: "Por Favor Seleccione un Centro de Costo"
          };
          for (var i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i]._id == seleccion.target.value) {
              this.selected_cliente = Object.assign({}, this.clientes[i]);

              this.clientprueba = Object.assign({}, this.selected_cliente);
            }
          }
          this.selected_center = null;
          var load = true;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          if (seleccion !== undefined) {
            this.axios
              .get(urlservicios + "CentrosPorCliente/" + seleccion.target.value)
              .then(response => {
                this.centros = response.data;
                //this.centros.unshift(vacio);
                //this.selected_centro = {};
                this.habilitar = false;
                //this.load=false
                var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
              })
              .catch(function(error) {});
          }
        }
      }
    },
    actualizar: function() {
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
      if (
        this.selected_client == "" ||
        this.selected_center == "" ||
        this.selected_client == null ||
        this.selected_center == null ||
        this.selected_client == "null" ||
        this.selected_center == "null" ||
        this.remitente == null ||
        this.remit == null ||
        this.remit == "null" ||
        this.remit == "" ||
        this.remitente == "null" ||
        this.remitente == "" ||
        this.remit.direccion == "" ||
        (this.prueba == "second" && this.fecha == "") ||
        this.validacionDireccion == false
      ) {
        if (this.validacionDireccion == false) {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          swal("Cuidado", "La dirección digitada no es valida", "warning");
        }
        if (this.prueba == "second") {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          if (this.fecha == "") {
            swal(
              "Cuidado",
              "Se deben completar la fecha de recolección de la orden",
              "warning"
            );
          }
        } else {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          swal("Cuidado", "Se deben completar todos los campos !", "warning");
        }
      } else {
        var fecha = {
          fecha: this.fecha
        };
        localStorage.setItem("fecha_orden", JSON.stringify(fecha));
        var selected_client = this.selected_cliente;
        var selected_center = this.selected_centro;
        var seleccionados = {
          selected_client: selected_client,
          selected_center: selected_center
        };
        var selecciones = {
          idcliente: selected_client._id,
          idcentro: selected_center._id,
          infocliente: this.selected_cliente,
          infocentro: this.selected_center
        };
        /*
                    SE CREA UN LOCALSTORAGE EL CUAL PERMITE LA OBTENER LO QUE FUE SELECCIONADO PREVIAMENTE
                */

        /*
      var observacionesOrden={
        observacion:this.observaciones
      }
      localStorage.setItem("observaciones_orden", JSON.stringify(observacionesOrden));
      */
        bus.$emit("remitente", seleccionados);
        localStorage.setItem("orden", JSON.stringify(seleccionados));
        localStorage.setItem("infoorden", JSON.stringify(selecciones));
        var objetoremitente;
        if (
          this.longi == null ||
          this.longi === null ||
          this.longi == "" ||
          this.lati == null ||
          this.lati === null ||
          this.lati == ""
        ) {
          objetoremitente = {
            numero_identificacion: this.remit.numero_identificacion,
            direccion: this.remit.direccion,
            nombre: this.remit.nombre,
            telefono: this.remit.telefono,
            id_cliente: this.remit.id_cliente,
            complemento: this.remit.complemento
            //latitud: this.lati,
            //longitud:this.longi,
            //codigo_postal:this.posta
          };
        } else {
          objetoremitente = {
            complemento: this.remit.complemento,
            numero_identificacion: this.remit.numero_identificacion,
            direccion: this.remit.direccion,
            nombre: this.remit.nombre,
            telefono: this.remit.telefono,
            id_cliente: this.remit.id_cliente,
            latitud: this.lati,
            longitud: this.longi,
            codigo_postal: this.posta
          };
        }
        /*
       objetoremitente = {
          numero_identificacion: this.remitente.numero_identificacion,
          direccion: this.remitente.direccion,
          nombre: this.remitente.nombre,
          telefono: this.remitente.telefono,
          id_cliente: this.remitente.id_cliente,
          latitud: this.lati,
          longitud:this.longi,
          codigo_postal:this.posta
        };
        */
        localStorage.setItem("remitente", JSON.stringify(this.remit));
        if (this.optionsdestinatarios.length == 0) {
          var objetocrear = {
            numero_identificacion: this.remit.numero_identificacion,
            direccion: this.remit.direccion,
            nombre: this.remit.nombre,
            telefono: this.remit.telefono,
            id_cliente: this.remit.id_cliente,
            latitud: this.lati,
            longitud: this.longi,
            codigo_postal: this.posta,
            id_cliente: this.selected_cliente._id
          };
          this.axios
            .post(urlservicios + "CrearDestinatario", objetocrear)
            .then(response => {
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              this.$router.replace("/inicio/ordenservicio");
            })
            .catch(function(error) {
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
            });
        } else {
          this.axios
            .post(
              urlservicios + "ActualizarDestinatario" + "/" + this.remit._id,
              objetoremitente
            )
            .then(response => {
              var load = false;
              setTimeout(() => {
                bus.$emit("load", {
                  load
                });
              });
              this.$router.replace("/inicio/ordenservicio");
            })
            .catch(function(error) {});
        }
        /*
      this.axios.post(urlservicios+"ActualizarDestinatario" +"/" +this.remitente._id,objetoremitente)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
          })
          .catch(function(error) {

          })
        */
        //this.$router.replace("/inicio/ordenservicio");
        var load = false;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
      }
    }
  },
  created: function() {
    var _this = this;
    // -------------------------------
    var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);

    var id_cliente;
    if (test.id_cliente == undefined || test.id_cliente == null) {
      id_cliente = "null";
      var bandera = true;
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });

      this.axios
        .get(
          urlservicios +
            "clientesOperador/" +
            test.id_OperadorLogistico._id +
            "/" +
            id_cliente
        )
        .then(response => {
          this.clientes = response.data;
          var orden = localStorage.getItem("orden");
          var ordenjson = JSON.parse(orden);

          if (orden) {
            this.selected_cliente = ordenjson.selected_client;
            this.selected_centro = ordenjson.selected_center;
            this.clientes.forEach(element => {
              if (element._id == this.selected_cliente._id) {
                this.selected_client = element;
              }
            });
          }
          var remi = localStorage.getItem("remitente");
          var remijson = JSON.parse(remi);
          if (remi) {
            this.remitente = remijson;
            //this.onSearch(remijson.nombre, loading)
          }
          //this.clientes.unshift(vacio);
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
        })
        .catch(function(error) {
          bandera = false;
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          if ((error.response = '""')) {
            swal({
              title: "Se presento un error",
              text: "Si persiste comuniquese con soporte",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok, Entiendo"
            }).then(result => {
              if (result.value) {
                swal("Se Redireccionara a la pagina de inicio", "", "warning");
                _this.$router.replace("/inicio");
              }
            });
          } else {
            swal({
              title: "Dificultades en el Servicio",
              text: "Intente nuevamente",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok"
            }).then(result => {
              if (result.value) {
                swal(
                  "Se Redireccionara al pagino de inicio",
                  "Intente luego",
                  "warning"
                );
                _this.$router.replace("/inicio");
              }
            });
          }
          /*
          if(error.response.status==500){
          }
          */
          //this.$router.replace('/inicio')

          if (bandera == false) {
          }
        });
    } else {
      id_cliente = test.id_cliente;
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
      this.axios
        .get(
          urlservicios +
            "clientesOperador/" +
            test.id_OperadorLogistico._id +
            "/" +
            id_cliente
        )
        .then(response => {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          this.clientes = response.data;
          this.selected_client = this.clientes[0];
          this.selected_cliente = Object.assign({}, this.clientes[0]);
          this.disable_selected_client = true;
          /*
          this.clientes = response.data;
          this.selected_cliente.nombre = this.clientes[0].nombre;
          this.selected_cliente.telefono = this.clientes[0].telefono;
          this.clientes.unshift(vacio);
          this.selected_client = id_cliente;
          this.disable_selected_client = true;
          this.ClientesSelect(id_cliente);
          */
        })
        .catch(function(error) {
          bandera = false;
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          //onsole.log(JSON.stringify(error));
          //this.$router.replace('/inicio')
          if (bandera == false) {
            swal({
              title: "No hay Internet",
              text: "Revise su conexion",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok, Entiendo"
            }).then(result => {
              if (result.value) {
                swal(
                  "Se Redireccionara a la pagina de inicio",
                  "Buen Rato",
                  "warning"
                );
                _this.$router.replace("/inicio");
              }
            });
          }
        });
    }
    if(test.id_OperadorLogistico.geolocalizaciónGoogle==true){
      this.GeoReferenciacion=true
    }
    else{
      this.GeoReferenciacion=false
      this.validacionDireccion=true
    }
    this.nombreusu;
    bus.$emit("remitente");
  },
  updated: function() {},
  beforeCreate: function() {
    var items;
    items = [
      {
        text: "Inicio",
        to: "/inicio"
      },
      {
        text: "Información de Recogida",
        href: "#"
      }
    ];
    setTimeout(() => {
      bus.$emit("items", {
        items
      });
    });
  }
};
</script>

<style >
/*
.card-header{
    background-color: #ebeaea ;
    color: white;
}
*/

.nav-tabs .nav-link {
  background-color: #ebeaea;
}
/*
.nav-tabs{
  background-color: #ebeaea !important;
}
*/
/*
.card-header-tabs {
  background-color: #ebeaea;
}
*/
.contenedorTotal {
  padding-top: 0px;
  padding-right: 0%;
  padding-bottom: 0px;
  padding-left: 0%;
  background-color: #f8f8ff;
}
.contenedorNavegacion {
  padding-top: 0px;
  padding-right: 2%;
  padding-bottom: 0px;
  padding-left: 4%;
  background-color: #f8f8ff;
}
.titulo {
  padding: 5%;
  border: 5px;
  border-color: black;
}
.cards {
  top: 22px;
  box-shadow: 5px 5px 7px 5px rgba(0, 0, 0, 0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */

  border-left-width: 0px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 15px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;
}
.dashboard-header section-padding {
  padding-top: 1px;
  padding-bottom: 01px;
}
</style>
