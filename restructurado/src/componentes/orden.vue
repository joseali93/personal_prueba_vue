<template>
<!-- SE PERMITE LA SELECCION DE LOS CLIENTE Y CENTRO DE COSTO QUE CORRESPONDA PARA LA REALIZACION
DE LA ORDEN DE SERVICIO -->

    <b-container fluid class="contenedorTotal">
      <div class="breadPersonalizado">
         <b-breadcrumb :items="items" />
      </div>


      <b-container fluid class="contenedorInterno">
                <header class="content-heading" slot="header">
                  <b-row  class=" my-1">
                  <b-col>
                <h3>Generación Orden de Servicio</h3>
                  </b-col>
                 
                  <b-col >
                    <b-btn class="rounded float-right" variant="primary"   v-on:click="actualizar"
                    v-b-popover.hover="'Continuar'" >Continuar<i class="fa fa-arrow-right"></i>
                    </b-btn>
                </b-col>
                </b-row>
                </header> 
                
    <b-card>
        <b-card class="cards" >
           <b-row>
               <b-form-group
                      class=" text-primary"
                        label="Fecha y Hora de recolección"
                        label-size="">
                        <b-form-radio-group v-model="prueba"

                                        :options="radios"
                                        name="radiosSm"
                                        @change="cambio"
                                        >
                        </b-form-radio-group>

                    </b-form-group>
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
                    <!--
                    <b-form-select v-model="selected_center" class="mb-3"
                    :options="centros" text-field="nombre" value-field="_id"
                     @change.native="centrosseleccionado" :disabled="habilitar" v-else >
                    </b-form-select>

                    <v-select v-model="selected_center" label="nombre"
                    placeholder="Seleccione el Centro de Costo" :options="centros"
                    @input="centroSeleccionado()" :disabled="habilitar"
                      ></v-select>
                    -->
                    <v-select v-model="selected_center" label="nombre_concatenado"
                    placeholder=" Centro de Costo" :options="centros"
                    @input="centroSeleccionado()" :disabled="habilitar"
                      ></v-select>
                </b-col>

            </b-row>
        </b-card>
        <b-card  class="cards" style="top: 34px;">


            <b-row >
                <b-col class=" my-2">
                    <h3 class="text-primary">Remitente</h3>
                    <!--
                  <v-select v-model="selected_client" label="nombre" placeholder="Seleccione el remitente"
                      :options="clientes" @input="clienteSeleccionado()"
                       :disabled="disable_selected_client" ></v-select>


                      v-model="remitente"

                    -->
                    {{remitente}}
                     <v-select label="nombre" :filterable="false" v-model=remitente
                     placeholder=" Remitente " :options="optionsdestinatarios"
                      @input="updateOption"
                      @search="onSearch">
                      <template slot="no-options" >
                        Nombre del remitente..
                      </template>
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          {{ option.nombre }}
                          </div>
                      </template>
                      <template slot="selected-option" scope="option">
                        <div class="selected d-center">
                          {{ option.nombre }}
                        </div>
                        <template slot="no-options" >
                        no se encontro nada.
                      </template>
                      </template>

                    </v-select>
                </b-col>
            </b-row>
            <b-row>
                    <b-col>
                    <b-form-group id="exampleInputGroup1"
                      class="text-primary"
                        label="Dirección ">
                            <b-form-input id="direccionGoogle"
                                size=""
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
                    <b-form-group id="exampleInputGroup2"
                    class="text-primary"
                        label="Contacto ">
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
                    <b-form-group id="exampleInputGroup2"
                    class="text-primary"
                        label="Num Identificacion ">
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
                    <b-form-group id="exampleInputGroup3"
                    class="text-primary"
                        label="Teléfono " >
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
        <!--
        <b-card class="cards">
          <b-row>
                  <b-col>
                    <b-form-group
                        class="text-primary"
                        label="Observaciones para la Orden de Servicio"
                        label-size="">
                    <b-form-textarea id="textarea1"
                        v-model="observaciones"
                        placeholder="Digita las observaciones para tener en cuenta al momento de la recolección "
                        :rows="3"
                        :max-rows="6"
                        >
                    </b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
        </b-card>
        -->
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
    Preload,

  },
  watch: {
    clientprueba(newValue, oldValue) {

    }
  },
  data() {

    return {
      horaInicio:'',
      horaFin:'',
      prueba:'first',
      fecha:'',
      //observaciones:'',
      remit:{
        nombre:'',
        direccion:'',
        telefono:'',
        latitud:'',
        longitud:'',
        codigo_postal:''
      },
      lati:"",
      longi:"",
      posta:"",
      remitente:'',
      /*
      remitente:{
        nombre:'',
        direccion:'',
        telefono:'',
        numero_identificacion:'',
      },
      */
      optionsdestinatarios:[],
      selected: 'first',
      radios: [
        { text: 'Hoy, cualquier horario', value: 'first' },
        { text: 'Programar Recolección', value: 'second' }

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

    initAutocomplete(){
      console.log("entro");
      var longi
      var latit
      var codpostal
       var options = {
        componentRestrictions: {country: 'co'}
      };
       var input = document.getElementById('direccionGoogle');
                var searchBox = new google.maps.places.Autocomplete(input);
                input.value=input.value.split(',')[0];
                 searchBox.setComponentRestrictions( {'country': ['co']})
                searchBox.addListener('place_changed', function() {
                  input.value=input.value.split(',')[0];
                    var places = searchBox.getPlace();
                    if(places.length == 0){
                        return;
                    }
                    else{
                      if(!places.geometry){
                        console.log("no tengo latitud");
                      }else{
                        console.log("tengo lati y longi");
                        this.lati=places.geometry.location.lat()
                        this.longi=places.geometry.location.lng()
                      }
                      for (var i = 0; i < places.address_components.length; i++) {
                        for (var j = 0; j < places.address_components[i].types.length; j++) {
                            if (places.address_components[i].types[j] == "postal_code") {
                              console.log("tengo codigo");
                              this.posta = places.address_components[i].long_name;

                            }
                        }
                      }
                    }
                    
                    // Object.keys(places).forEach((k) => {
                      
                    //   const place = (places[k]);
                    //   console.log(place);
                    //  if(k=='geometry'||k==='geometry'){}
                    // });
                    /*
                    places.forEach(function(place){
                      console.log(place);
                        if(!place.geometry) {
                            return;
                        }
                        latit=place.geometry.location.lat()
                        longi=place.geometry.location.lng()

                        //this.lati=place.geometry.location.lat()
                        //this.longi=place.geometry.location.lng()
                        //this.posta
                        for (var i = 0; i < place.address_components.length; i++) {
                        for (var j = 0; j < place.address_components[i].types.length; j++) {
                            if (place.address_components[i].types[j] == "postal_code") {
                            this.posta = place.address_components[i].long_name;

                            }
                        }
                        }
                        this.lati=latit
                        this.longi=longi
                        //console.log(this.longi);
                       
                    }.bind(this));
                    */
                }.bind(this));
                //input.value=input.value.split(',')[0];
                input.value=input.value.split(',')[0];
    },
    cambio(){
      if(this.prueba=='second'){
            this.fecha=''
      }

    },
    updateOption(){
      console.log("entro a update");
        var remi = localStorage.getItem("remitente");
        var remijson = JSON.parse(remi);
        if(remi){
          console.log("tengo remi")
          console.log(this.remitente);
          if(this.remitente!=null){
            if(this.remitente.nombre==remijson.nombre){
               this.onSearch(remijson.nombre)
            }
            else{
             console.log('------------------------------------');
             console.log("no son iguales");
             console.log('------------------------------------');
               this.onSearch(this.remitente.nombre)
                this.remit.nombre=''
                this.remit.direccion=''
                this.remit.numero_identificacion=''
                this.remit.telefono=''
                //this.remit.nombre=''
                //console.log(this.remit);
            }
          }
          else{
            console.log("es nulo");
            this.remit.nombre=''
            this.remit.direccion=''
            this.remit.numero_identificacion=''
            this.remit.telefono=''
          }

                    //  this.remitente=Object.assign({}, this.remitente);

        }
        else{
          console.log("selecciono");
          console.log("..................");
          console.log(this.remitente);
          if(this.remitente==null||this.remitente=='null'){
            this.remit.nombre=''
            this.remit.direccion=''
            this.remit.numero_identificacion=''
            this.remit.telefono=''
          }
          else{
            console.log('------------------------------------');
            console.log("hago igualacion");
            console.log('------------------------------------');
            this.remit=Object.assign({}, this.remitente);
          //this.remitente=Object.assign({}, this.remitente);

          }
        }


         //this.remitente=remijson
    },

     localizar(){
      var dir
      var longi
      var latit
      var codpostal
      dir=this.remitente.direccion +', Colombia'
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': dir, country: "CO" }, function(results, status) {
        if (status === 'OK') {
          results[0].address_components.forEach(element => {
            if(element.types[0]=='postal_code'){
              codpostal=results[0].address_components[7].long_name
            }
          });
          var resultados = results[0].geometry.location,

            resultados_lat = resultados.lat(),
            resultados_long = resultados.lng();

          longi=resultados_long
          latit=resultados_lat
          //codpostal=results[0].address_components[7].long_name
          /*
          this.lati=resultados_lat
          this.longi=resultados_long
          this.posta=results[0].address_components[7].long_name
          */
          this.lati=latit
          this.longi=longi
          this.posta=codpostal
            } else {
              var mensajeError = "";
              if (status === "ZERO_RESULTS") {
                mensajeError = "No hubo resultados para la dirección ingresada.";
              } else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
                mensajeError = "Error general del mapa.";
              } else if (status === "INVALID_REQUEST") {
                mensajeError = "Error de la web. Contacte con Name Agency.";
              }
              alert(mensajeError);
            }

        }.bind(this));

    },
    onSearch(search) {

        //loading(true);
      this.search(search, this);

    },

    search(search){
     
      var remi = localStorage.getItem("remitente");
        var remijson = JSON.parse(remi);
        if(remi==undefined||remi==''){
          this.optionsdestinatarios=[]
          setTimeout(function(){
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
          console.log('------------------------------------');
          console.log("entro a else");
          console.log('------------------------------------');
          //this.remitente=remijson.nombre
          this.optionsdestinatarios=[]
          setTimeout(function(){
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
              //this.remitente={}
              
              //this.remitente=search
              
              this.remit.nombre=search
              //this.remitente=this.remit.nombre
              this.remit.numero_identificacion=''
              this.remit.direccion=''
              this.remit.telefono=''
              //this.remitente.nombre=this.remit.nombre
              //this.remitente=this.remit
            }
            else{
            this.optionsdestinatarios=response.data.destinatarios
            this.optionsdestinatarios.forEach(element => {
              if(search==element.nombre){
                this.remit=element
              }
            });            }

            //this.remit=this.optionsdestinatarios[0]
                    //loading(false);

          })

            }.bind(this), 345);

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
                urlservicios+ "CentrosPorCliente/" + this.selected_client._id
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
              .catch(error => {
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
              .get(urlservicios+ "CentrosPorCliente/" + this.selected_client._id)
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
              .catch(error => {
              });
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
            this.selected_cliente = Object.assign({},ordenjson.selected_client);
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
                urlservicios+ "CentrosPorCliente/" + this.selected_client._id
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
                urlservicios+ "CentrosPorCliente/" + this.selected_client._id
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
            .get(urlservicios+ "CentrosPorCliente/" + id_cliente)
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

              this.clientprueba=Object.assign({},this.selected_cliente)
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
              .get(urlservicios+ "CentrosPorCliente/" + seleccion.target.value)
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
              }).catch(function(error){

              })
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
        this.remitente == "null" ||
        this.remitente == '' ||
        (this.prueba == 'second'&&this.fecha=='')

      ) {
        if(this.prueba=='second'){
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          if(this.fecha==''){
             swal("Cuidado", "Se deben completar la fecha de recolección de la orden", "warning");
          }


        }
        else{

          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
        swal("Cuidado", "Se deben completar todos los campos !", "warning");
        }

      } else {
         var fecha={
              fecha:this.fecha
            }
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
        console.log(this.remit);
         var objetoremitente
        if(this.longi==null||this.longi===null||this.longi==''||
       this.lati==null||this.lati===null||this.lati==''){
         objetoremitente = {
          numero_identificacion: this.remit.numero_identificacion,
          direccion: this.remit.direccion,
          nombre: this.remit.nombre,
          telefono: this.remit.telefono,
          id_cliente: this.remit.id_cliente,
          //latitud: this.lati,
          //longitud:this.longi,
          //codigo_postal:this.posta
        };
        }else{
          objetoremitente = {
          numero_identificacion: this.remit.numero_identificacion,
          direccion: this.remit.direccion,
          nombre: this.remit.nombre,
          telefono: this.remit.telefono,
          id_cliente: this.remit.id_cliente,
          latitud: this.lati,
          longitud:this.longi,
          codigo_postal:this.posta
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
       if(this.optionsdestinatarios.length==0)
       {
          var objetocrear = {
          numero_identificacion: this.remit.numero_identificacion,
          direccion: this.remit.direccion,
          nombre: this.remit.nombre,
          telefono: this.remit.telefono,
          id_cliente: this.remit.id_cliente,
          latitud: this.lati,
          longitud:this.longi,
          codigo_postal:this.posta,
           id_cliente: this.selected_cliente._id
        };
         this.axios.post(urlservicios+ "CrearDestinatario", objetocrear)
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
       }
       else{
         this.axios.post(urlservicios+"ActualizarDestinatario" +"/" +this.remit._id,objetoremitente)
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

          })
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
          urlservicios+
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
          if(remi){
            this.remitente=remijson
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
                swal(
                  "Se Redireccionara a la pagina de inicio",
                  "",
                  "warning"
                );
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
          urlservicios+
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

    this.nombreusu;
    bus.$emit("remitente");
  },
  updated: function(){
    //this.initAutocomplete()
  },
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

.nav-tabs .nav-link{

  background-color: #ebeaea;

}
/*
.nav-tabs{
  background-color: #ebeaea !important;
}
*/
.card-header{
      background-color: #4db35a !important;
    color: white;
}
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
