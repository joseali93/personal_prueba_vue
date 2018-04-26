<template>
<!-- SE PERMITE LA SELECCION DE LOS CLIENTE Y CENTRO DE COSTO QUE CORRESPONDA PARA LA REALIZACION 
DE LA ORDEN DE SERVICIO -->

    <b-container fluid class="contenedorTotal">
      <div >
         <b-breadcrumb :items="items" />
      </div>
       

      <b-container fluid>
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
                    <v-select v-model="selected_center" label="nombre" 
                    placeholder="Seleccione el Centro de Costo" :options="centros" 
                    @input="centroSeleccionado()" :disabled="habilitar"
                      ></v-select>
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
                                v-model="selected_centro.direccion"
                                required
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
                                v-model="selected_cliente.nombre"
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
                                
                                v-model="selected_cliente.telefono"
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
      console.log(newValue);
      console.log("------------");
      console.log(oldValue);
    }
  },
  data() {
    return {
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
    centroSeleccionado() {
      console.log("entro a centro");
      this.selected_centro = Object.assign({}, this.selected_center);
    },
    clienteSeleccionado() {
      //console.log(this.selected_client);
       var orden = localStorage.getItem("orden");
          var ordenjson = JSON.parse(orden);
        if (this.disable_selected_client == true) {
            console.log("cliente ");
            if (this.selected_client) {
                if (orden) {
                    //console.log(ordenjson);
                    console.log("entro a cargue");
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
                    console.log("entro");
                    console.log(this.selected_client);
                    this.selected_cliente = Object.assign({}, this.selected_client);
                    this.selected_center = null;
                    var load = true;
                    setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                    });
                    console.log(
                    urlservicios + "CentrosPorCliente/" + this.selected_client._id
                    );
                    this.axios
                    .get(
                        urlservicios + "CentrosPorCliente/" + this.selected_client._id
                    )
                    .then(response => {
                        console.log(response);
                        this.centros = response.data;

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
            } 
            else {
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });
                console.log(this.selected_client);
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
        } 
        else {
            if (this.selected_client) {
                if (orden) {
                    //console.log(ordenjson);
                    console.log("entro a cargue");
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
                    console.log("entro");
                    console.log(this.selected_client);
                    this.selected_cliente = Object.assign({}, this.selected_client);
                    this.selected_center = null;
                    var load = true;
                    setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                    });
                    console.log(
                    urlservicios + "CentrosPorCliente/" + this.selected_client._id
                    );
                    this.axios
                    .get(
                        urlservicios + "CentrosPorCliente/" + this.selected_client._id
                    )
                    .then(response => {
                        console.log(response);
                        this.centros = response.data;

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
            } 
            else {
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });
                console.log(this.selected_client);
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
      }
    },
    centrosseleccionado(seleccion) {
      /*
                FUNCION DEL CUAL OBTENEMOS EL CENTRO QUE FUE SELECCIONADO SEGUN EL CLIENTE
            */
      /*
      if (seleccion.target.value == "" || seleccion.target.value == null) {
        this.selected_centro = {};
        this.selected_center = null;
      } else {
        for (var i = 0; i < this.centros.length; i++) {
          if (this.centros[i]._id == seleccion.target.value) {
            this.selected_centro = this.centros[i];
          }
        }
      }
      */
    },
    ClientesSelect(seleccion) {
      /*
                FUNCION DEL CUAL OBTENEMOS EL CLIENTE QUE FUE SELECCIONADO 
            */

      console.log("entro a seleccion clientes");
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

              //this.clientprueba=Object.assign({},this.selected_cliente)
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
        }
      }
    },
    actualizar: function() {
      if (
        this.selected_client == "" ||
        this.selected_center == "" ||
        this.selected_client == null ||
        this.selected_center == null ||
        this.selected_client == "null" ||
        this.selected_center == "null"
      ) {
        swal("Cuidado", "Se deben completar todos los campos !", "error");
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
          infocentro: this.selected_centro
        };
        /*
                    SE CREA UN LOCALSTORAGE EL CUAL PERMITE LA OBTENER LO QUE FUE SELECCIONADO PREVIAMENTE
                */
        bus.$emit("remitente", seleccionados);
        localStorage.setItem("orden", JSON.stringify(seleccionados));
        localStorage.setItem("infoorden", JSON.stringify(selecciones));
        console.log(selecciones);
        //console.log("-----------");
        console.log(seleccionados);
        this.$router.replace("/inicio/ordenservicio");
      }
    }
  },

  mounted: function() {
    /*
    if (orden == null || orden == "null" || orden == "") {
    } else {
      this.selected_client = ordenjson.selected_client;
      this.selected_center = ordenjson.selected_center;
      this.axios
        .get(urlservicios + "CentrosPorCliente/" + this.selected_client._id)
        .then(response => {
          this.centros = response.data;
          console.log(this.centros);
          console.log(this.selected_center);
          //this.selected_centro.direccion=this.centros.direccion
          this.habilitar = false;
          this.selected_centro = Object.assign({}, this.selected_center)
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
        });
      var test2 = localStorage.getItem("storedData");
      var test = JSON.parse(test2);
      console.log("errr");
      this.axios.get(urlservicios +"clientesOperador/" +test.id_OperadorLogistico._id +"/null")
        .then(response => {
          this.clientes = response.data;
          this.selected_cliente ==Object.assign({}, this.selected_client)
        });
        
    }
    */
  },
  created: function() {
    var _this = this;

    // -------------------------------
    var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    //console.log(test.id_cliente);

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
          //console.log(response);
          this.clientes = response.data;
          var orden = localStorage.getItem("orden");
          var ordenjson = JSON.parse(orden);

          if (orden) {
            //console.log(ordenjson);
            this.selected_cliente = ordenjson.selected_client;
            this.selected_centro = ordenjson.selected_center;
            this.clientes.forEach(element => {
              if (element._id == this.selected_cliente._id) {
                //console.log("son iguales");
                this.selected_client = element;
              }
            });
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
    } else {
      console.log("tengo cliente");
      id_cliente = test.id_cliente;
      console.log(id_cliente);
	  //console.log(urlservicios+"clientesOperador/"+test.id_OperadorLogistico+'/'+id_cliente);
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
			console.log(response);
			var load = false;
			setTimeout(() => {
				bus.$emit("load", {
				load
				});
			});
				this.clientes = response.data;
				this.selected_client=this.clientes[0]
				this.selected_cliente=  Object.assign({},this.clientes[0])
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

<style>
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
.dashboard-header section-padding{
    padding-top: 1px;
    padding-bottom: 01px;
}
</style>
