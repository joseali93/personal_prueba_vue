<template>
<!-- SE PERMITE LA SELECCION DE LOS CLIENTE Y CENTRO DE COSTO QUE CORRESPONDA PARA LA REALIZACION 
DE LA ORDEN DE SERVICIO -->

    <b-container fluid class="contenedorTotal">
      <div class="breadPersonalizado">
         <b-breadcrumb :items="items" />
      </div>
       

      <b-container fluid class="contenedorInterno">
                <header class="content-heading" slot="header">
                <h3>Generación Orden de Servicio</h3>
                    
                </header> 
                <b-card class="cards">
            
             <b-row>
                 <!--
                <a  v-on:click="actualizar" > 
                    <b-btn v-on:click="actualizar" variant="primary" >
                        
                        Continuar
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </b-btn>
                </a>
                -->
            
                <b-col md="3" offset-md="10">
                  <b-btn class="rounded" variant="primary"   v-on:click="actualizar"
                  v-b-popover.hover="'Continuar'" >Continuar<i class="fa fa-arrow-right"></i>
                  </b-btn>
              </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3 class="text-primary">Seleccione el Cliente</h3>
                    <!--
                    <b-form-select v-model="selected_client" class="mb-3"  
                    :options="clientes" text-field="nombre" value-field="_id" @change.native="ClientesSelect"
                    :disabled="disable_selected_client" >  
                    </b-form-select>
                    -->
                     <v-select v-model="selected_client" label="nombre" placeholder="Seleccione el Cliente"
                      :options="clientes" @input="clienteSeleccionado()"
                       :disabled="disable_selected_client" ></v-select>
                      
                </b-col>
                <b-col>
                    <h3 class="text-primary">Seleccione el Centro de Costos</h3>
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
                    placeholder="Seleccione el Centro de Costo" :options="centros" 
                    @input="centroSeleccionado()" :disabled="habilitar"
                      ></v-select>
                </b-col>
                
            </b-row>
            <b-row >
                <b-col class=" my-2">
                    <h3 class="text-primary">Digite el Remitente</h3>
                    <!--
                  <v-select v-model="selected_client" label="nombre" placeholder="Seleccione el remitente"
                      :options="clientes" @input="clienteSeleccionado()"
                       :disabled="disable_selected_client" ></v-select>


                      v-model="remitente" 
                    
                    -->
                     <v-select label="nombre" :filterable="false" v-model=remitente
                     placeholder="Digite el remitente" :options="optionsdestinatarios"
                      @input="updateOption"
                      @search="onSearch">
                      <template slot="no-options">
                        Digite el nombre del remitente..
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
                      </template>
                      
                    </v-select>
                </b-col>
            </b-row>
            <b-row>
                    <b-col>
                    <b-form-group id="exampleInputGroup1"
                      class="text-primary"
                        label="Dirección ">
                            <b-form-input id="direccion"
                                size="lg"
                                type="text"
                                v-model="remitente.direccion"
                                required
                                 @keyup.enter.native="localizar()"
                                placeholder="Dirección"
                                maxlength="100">
                            </b-form-input>
                    </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                    <b-form-group id="exampleInputGroup2"
                    class="text-primary"
                        label="Contacto ">
                            <b-form-input id="direccion"
                                size="lg"
                                type="text"
                                v-model="remitente.nombre"
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
                    <b-form-group id="exampleInputGroup3"
                    class="text-primary"
                        label="Teléfono " >
                            <b-form-input id="telefono"
                            size="lg"
                                type="text"
                                
                                v-model="remitente.telefono"
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
    clientprueba(newValue, oldValue) {

    }
  },
  data() {
    return {
      remit:{
        nombre:'',
        direccion:'',
        telefono:''
      },
      lati:"",
      longi:"",
      posta:"",
      remitente:'',
      optionsdestinatarios:[],
      selected: 'first',
      radios: [
        { text: 'Recoge en Centro de Costo', value: 'first' },
        { text: 'Recoger en Remitente diferente', value: 'second' }
      
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
    updateOption(){
        var remi = localStorage.getItem("remitente");
        var remijson = JSON.parse(remi);
        if(remi){
          console.log("exite");
         this.onSearch(remijson.nombre)
          
        }
        else{
          console.log("no existe");
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
          console.log(results[0]);
          results[0].address_components.forEach(element => {
            console.log(element);
          });
          var resultados = results[0].geometry.location,
          
            resultados_lat = resultados.lat(),
            resultados_long = resultados.lng();
          
          longi=resultados_long
          latit=resultados_lat
          codpostal=results[0].address_components[7].long_name
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
        
        this.axios.get(`http://192.168.1.59:3000/logistica//obtenerDestinatarioNombre/${escape(search)}`)
        .then(response => {

          this.optionsdestinatarios=response.data.destinatarios
                  //loading(false);

        })
     
      }.bind(this), 345);
      }else{
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
        
        this.axios.get(`http://192.168.1.59:3000/logistica//obtenerDestinatarioNombre/${escape(search)}`)
        .then(response => {

          this.optionsdestinatarios=response.data.destinatarios
                  //loading(false);

        })
        
          }.bind(this), 345);

      }
      /*
    this.optionsdestinatarios=[]
    setTimeout(function(){
      /*
      this.axios.get(`https://api.github.com/search/repositories?q=${escape(search)}`)
     .then(response => {
       this.optionsdestinatarios=response.data.items
               loading(false);

     })
     
    
    this.axios.get(`http://192.168.1.59:3000/logistica//obtenerDestinatarioNombre/${escape(search)}`)
     .then(response => {

       this.optionsdestinatarios=response.data.destinatarios
               loading(false);

     })
     
      }.bind(this), 345);

    */
     
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
              .get(urlservicios + "CentrosPorCliente/" + this.selected_client._id)
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
        this.selected_center == "null"
      ) {
        var load = false;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
        swal("Cuidado", "Se deben completar todos los campos !", "warning");
      } else {
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
        bus.$emit("remitente", seleccionados);
        localStorage.setItem("orden", JSON.stringify(seleccionados));
        localStorage.setItem("infoorden", JSON.stringify(selecciones));
         var objetoremitente
        if(this.longi==null||this.longi===null||this.longi==''||
       this.lati==null||this.lati===null||this.lati==''){
         objetoremitente = {
          numero_identificacion: this.remitente.numero_identificacion,
          direccion: this.remitente.direccion,
          nombre: this.remitente.nombre,
          telefono: this.remitente.telefono,
          id_cliente: this.remitente.id_cliente,
          //latitud: this.lati,
          //longitud:this.longi,
          //codigo_postal:this.posta
        };
        }else{
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
       localStorage.setItem("remitente", JSON.stringify(this.remitente));
      this.axios.post(urlservicios +"ActualizarDestinatario" +"/" +this.remitente._id,objetoremitente)
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

        this.$router.replace("/inicio/ordenservicio");
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

    this.nombreusu;
    bus.$emit("remitente");
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
  box-shadow: 1px 5px 7px 5px rgba(0, 0, 0, 0.1);
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
