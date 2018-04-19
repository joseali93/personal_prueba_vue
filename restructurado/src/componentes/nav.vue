<template>
<!-- CONTENEDOR DE NAVBAR Y ASIDE-BAR-->
   <div>
     <preload v-show="load" ></preload>
     <nav id="nav-prueba" class="side-navbar mCustomScrollbar _mCS_1 mCS_no_scrollbar">
            <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0">
            <div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position: relative; top: 0px; left: 0px;" dir="ltr">
        <div class="side-navbar-wrapper">
            <div class="sidenav-header d-flex align-items-center justify-content-center">
            <div class="sidenav-header-inner text-center " >
              <b-link to="/inicio" class="active">
                <b-img :src="imagen" fluid alt="Responsive image" 
                class="img-fluid   mCS_img_loaded"/>
              </b-link>
            </div>
            <div class="sidenav-header-logo">
              <a  class="brand-small text-center"><b-link > <strong class="text-dark">W</strong><strong class="text-primary">L</strong></b-link></a></div>
            </div>
            <div class="main-menu">
              <!-- ASIDE BAR -->
            <ul id="side-main-menu" class="side-menu list-unstyled">                
               <li v-for="(ruta,indice) in rutas">
                    <b-link :to="ruta" v-if="indice=='ruta_uno'"  class="pintar">
                         <!--<i class="fa fa-wpforms"></i> /lib/icons/generacion_orden.svg -->
                         <b-img src="/src/assets/icons/generar_orden.svg"
                          fluid alt="G_O" 
                          width="25%"
                         />
                        <span>
                            Generación Orden de Servicio </span>
                    </b-link>
                </li>
                <li v-for="(ruta,indice) in rutas"> 
                    <b-link :to="ruta" v-if="indice=='ruta_dos'" >
                        <!--<i class="fa fa-truck " ></i>-->
                        <b-img src="/src/assets/icons/consulta_orden.svg"
                          fluid alt="C_O" 
                          width="25%"
                         />
                        <span > Consultar Ordenes de Servicio </span>
                    </b-link>
                </li>
                <li  v-for="(ruta,indice) in rutas"> 
                    <b-link :to="ruta" v-if="indice=='ruta_tres'">  
                        <!--<i class="fa fa-map-signs" >-->
                           <b-img src="/src/assets/icons/trazabilidad.svg"
                          fluid alt="C_T" 
                          width="25%"
                         />
                          <span >Consulta Trazabilidad</span>
                    </b-link>
                </li>
                <li  v-for="(ruta,indice) in rutas"> 
                    <b-link :to="ruta" v-if="indice=='ruta_cuatro'">
                       
                        <b-img src="/src/assets/icons/entradas_salidas.svg"
                          fluid alt="C_T" 
                          width="25%"
                         />
                        <span >Entradas y Salidas</span>
                    </b-link>
                </li>
                <li  v-for="(ruta,indice) in rutas"> 
                    <b-link :to="ruta" v-if="indice=='ruta_cinco'">
                        
                           <b-img src="/src/assets/icons/documento.svg"
                          fluid alt="C_T" 
                          width="25%"
                         />
                          <span > Consulta Manifiestos </span>
                    </b-link>
                </li>
            </ul>
            </div>

        </div>
        </div>
        <div id="mCSB_1_scrollbar_vertical" 
        class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical"
         style="display: none;">
          <div class="mCSB_draggerContainer">
            <div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; height: 0px; top: 0px; display: block; max-height: 724.4px;"><div class="mCSB_dragger_bar" style="line-height: 30px;">

            </div>
        </div>

        </div>
        </div>
        </div>
    </nav>
    <div id="div-prueba" class="page home-page">
      <!-- NAVBAR-->
      <header class="header ">
        <nav class="navbar ">
          <div class="container-fluid">
            <div class="navbar-holder d-flex align-items-center justify-content-between">
              <div class="navbar-header">
                <a  id="toggle-btn" class="menu-btn" @click="menu()">
                  <i class="icon-bars"> </i>
                </a >
                  
                  <a class="navbar-brand">
              <b-link to="/inicio">
                  <div class="brand-text d-none d-md-inline-block">
                    <span> </span><strong class="text-primary"></strong>
                  </div>
              </b-link>
              </a>
              </div>
              <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                <li class="nav-item">
                  <b-link variant="link" class="nav-link logout" @click="Salir()">
                    Cerrar
                    <i class="fa fa-sign-out"></i>
                  </b-link>
                </li>
                <li class="nav-item">
                  <b-dropdown id="ddown-header" text="Configuración" variant="link" class="nav-link logout"
                  v-show="config">
                    <b-dropdown-header>Configuración Aplicativo</b-dropdown-header>
                    <b-dropdown-item-button @click="confiCliente">Clientes</b-dropdown-item-button>
                    <b-dropdown-item-button @click="confiCentroC">Centros de Costo</b-dropdown-item-button>
                    <b-dropdown-item-button @click="confiCentroL">Centros Logísticos </b-dropdown-item-button>
                  </b-dropdown>
                </li>
               </ul>
            </div>
          </div>
        </nav>
      </header>
      <!-- SECCION DEL HEADER Y CONTENIDO DIV-->
      <section class="dashboard-header section-padding" 
      style="
    padding-top: 1px;">
        <!--
        <div class="container">
           <div class="content-wrapper">
             -->
            <!-- AQUI SE RENDERIZAN LAS VISTAS Y SE PASA PARMETROS  -->
                    <!-- <b-breadcrumb :items="items" @click="jose"/>
                -->
            <router-view
              v-bind:nombreusu="nombreusu">
            </router-view>
            <!--
         </div>
        </div>
        -->
      </section>

      <!-- FOOTER  -->
      <footer class="main-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <p>WaySolutions Tecnology © 2017</p>
            </div>
            <div class="col-sm-6 text-right">
              <p>Design by <a href="http://www.waysolutions.co/" class="external">WaySolutions Tecnology</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
   </div>
</template>

<script>
import $ from "jquery";

import Preload from "../componentes/preload.vue";
import { bus } from "../main";

export default {
  data() {
    return {
      config:false,
      items: [{
        text: 'Inicio',
        to: '/inicio',
        active: true

      }
      ],
      nombreusu: "",
      load: "",
      imagen: "",
      rutas: "",
      estado: true
    };
  },

  updated: function() {
    bus.$on(
      "load",
      function(userObject) {
        this.load = userObject.load;
      }.bind(this)
    );
    bus.$on(
      "items",
      function(userObject) {
        this.items = userObject.items;
      }.bind(this)
    );
    
  },
  methods: {
    jose(){
      console.log("jose");
    },

    confiCliente() {
      console.log("entro a config cliente");
      this.$router.replace("/inicio/configcliente");
    },
    confiCentroC() {
      console.log("entro a cc");
      this.$router.replace("/inicio/configcentroc");
    },
    confiCentroL() {
      console.log("entro a cl");
      this.$router.replace("/inicio/configcentrol");
    },
    menu() {
      if (this.estado == true) {
        $("#toggle-btn").click(function(e) {
          e.preventDefault();
          $("#div-prueba").addClass("page home-page active");
          $("#nav-prueba").addClass(
            "side-navbar mCustomScrollbar _mCS_1 shrink"
          );
        });
        this.estado = false;
      } else {
        this.estado = true;
        $("#toggle-btn").click(function(e) {
          e.preventDefault();
          $("#div-prueba")
            .removeClass("page home-page active")
            .addClass("page home-page");
          $("#nav-prueba")
            .removeClass("side-navbar mCustomScrollbar _mCS_1 shrink")
            .addClass("side-navbar mCustomScrollbar _mCS_1");
        });
      }
    },

    Salir(val) {
      console.log("entro a salir");
      localStorage.clear();
      this.$router.replace("/");
    }
  },
  components: {
    Preload
  },
  
  mounted: function() {

    
    var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    this.nombreusu = test.nombre;
    this.imagen = test.url_logo;

    if (test.id_rol.nombre == "courier") {
      console.log("hay courier");
      this.config = false;

      swal({
        title: "Es un Courier!",
        text: "No tiene funcionalidades en el aplicativo Web",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Salir"
      }).then(result => {
        if (result.value) {
          localStorage.clear();
          this.$router.replace("/");
        } else {
          console.log("se mantiene");
        }
      });
    }
    if (test.id_rol.nombre == "cliente") {
      this.config = false;
      this.rutas = test.id_rol.rutas;
    } else {
      this.rutas = test.id_rol.rutas;
      this.config = true;
    }

    //console.log(test)
    //console.log(this.imagen);
    //console.log(this.rutas);
  },
  beforeCreate: function() {
    
  }
};
</script>

<style>


nav.side-navbar span {
  display: initial;
}

nav.side-navbar .sidenav-header {
  background: white;
}
nav.side-navbar .sidenav-header img {
  width: 39%;
  height: auto;
}
imagen {
  width: 50px;
  height: 18.462px;
}
ul > li > a:hover {
  text-decoration: none;
}
.textb {
  color: white;
  font-size: 18px;
}
.menu {
  margin-top: 100px;
  padding: 5px;
}
.menu:hover {
  background-color: #aed6f1;
}
.navbar-custom {
  background-color: #024464;
}
/*
.jumbotron {
  background-color: white;
}
*/
.sidemenu {
  height: 900px;
}
.listado {
  padding-right: 0px;
}
.contenido {
  padding-left: 0px;
}
.logo {
  width: 10%;
  height: 5%;
}


</style>
