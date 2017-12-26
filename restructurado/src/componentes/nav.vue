<template>
    <!---
  <b-container fluid>
      <b-row>
                
            <b-col md="2" class="listado navbar-custom sidemenu" >
                <b-nav vertical class="w-50 md flex-row " type="dark" >
                    <b-nav-item active to="/inicio"><img src="src/assets/logo.png" class="img-fluid" alt="Responsive image"></b-nav-item>
                    <b-nav-item to="/inicio/orden" >Orden de Servicio</b-nav-item>
                    <b-nav-item  to="/inicio/consultar">Consultar Orden de Servicio</b-nav-item>
                </b-nav>
            </b-col>
            <b-col class="contenido">
               <b-navbar toggleable="md" class="navbar-custom">
                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                    <b-collapse is-nav id="nav_collapse">
                        <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template slot="button-content">
                            <em>User</em>
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#">Signout</b-dropdown-item>
                        </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                    </b-navbar>
                    <b-jumbotron>
                        <router-view
                                v-bind:nombreusu="nombreusu">
                        </router-view>
                    </b-jumbotron>
            </b-col>
      </b-row>
  </b-container>
  -->
<div class="wrapper">
  <b-navbar toggleable="md" class="navbar-custom">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">
      RPL Logistica
    </b-navbar-brand>
              <a href="#sidebar" data-toggle="collapse"><i class="fa fa-navicon fa-lg" ></i></a>

    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em class="text-capitalize">{{nombreusu}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

<b-container fluid>
    <div class="row">
        <div class="col-md-3 col-xs-1 p-l-0 p-r-0 collapse in" id="sidebar">
            <div class="list-group panel">
                <a href="/inicio/orden" class="list-group-item collapsed"  data-toggle="collapse" data-parent="#sidebar" aria-expanded="false">
                  <b-button to="/inicio/orden" variant="link">
                  <i class="fa fa-dashboard"></i> <span class="hidden-sm-down"> Orden de Servicio</span>
                  </b-button>
                </a>
          
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-film"></i> <span class="hidden-sm-down">Item 2</span></a>
                <a href="#menu3" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-book"></i> <span class="hidden-sm-down">Item 3 </span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-heart"></i> <span class="hidden-sm-down">Item 4</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-list"></i> <span class="hidden-sm-down">Item 5</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-clock-o"></i> <span class="hidden-sm-down">Link</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-th"></i> <span class="hidden-sm-down">Link</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-gear"></i> <span class="hidden-sm-down">Link</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-calendar"></i> <span class="hidden-sm-down">Link</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-envelope"></i> <span class="hidden-sm-down">Link</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-bar-chart-o"></i> <span class="hidden-sm-down">Link</span></a>
                <a href="#" class="list-group-item collapsed" data-parent="#sidebar"><i class="fa fa-star"></i> <span class="hidden-sm-down">Link</span></a>
            </div>
        </div>
        <main class="col-md-9 col-xs-11 p-l-2 p-t-2 ">
            
          <router-view
            v-bind:nombreusu="nombreusu">
          </router-view>
        </main>
    </div>
</b-container>
</div>
</template>

<script>
import Preload from "../componentes/preload.vue";

export default {
  data() {
    return {
      nombreusu: ""
    };
  },
  components: {
    Preload
  },
  mounted: function() {
    var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    this.nombreusu = test.nombre;
  },
  beforeCreate: function() {
    console.log("antes");
  }
};
</script>

<style>

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
.jumbotron {
  background-color: white;
}
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
  width: 15%;
  height: 15%;
}
</style>
