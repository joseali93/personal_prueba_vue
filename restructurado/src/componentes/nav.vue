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
  <!--
<div class="wrapper">
  <b-navbar toggleable="md" class="navbar-custom">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">
      RPL Logistica
    </b-navbar-brand>
              <a href="#sidebar" data-toggle="collapse"><i class="fa fa-navicon fa-lg" ></i></a>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>

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
                  <a href="#" class="list-group-item collapsed"  data-toggle="collapse" data-parent="#sidebar" aria-expanded="false">
                    <b-button to="/inicio/orden" variant="link">
                    <i class="fa fa-dashboard"></i> <span class="hidden-sm-down"> Orden de Servicio</span>
                    </b-button>
                  </a>
            
                  <a href="#" class="list-group-item collapsed" data-parent="#sidebar">
                    <b-button to="/inicio/consultar" variant="link">
                    <i class="fa fa-search"></i> <span class="hidden-sm-down">Consultar Orden</span>
                    </b-button>
                  </a>
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
-->
<!--
<div class="wrapper">
      <header class="topnavbar-wrapper">
         <nav class="navbar topnavbar" role="navigation">
            <div class="navbar-header">
               <a class="navbar-brand" href="#/">
                  <div class="brand-logo">
                     <img class="img-responsive" src="image/logo.png" alt="App Logo">
                  </div>
                  <div class="brand-logo-collapsed">
                     <img class="img-responsive" src="img/logo-single.png" alt="App Logo">
                  </div>
               </a>
            </div>

            <div class="nav-wrapper">
               <ul class="nav navbar-nav">
                  <li>
                     <a class="hidden-xs" href="#" data-trigger-resize="" data-toggle-state="aside-collapsed">
                        <em class="fa fa-navicon"></em>
                     </a>
                     <a class="visible-xs sidebar-toggle" href="#" data-toggle-state="aside-toggled" data-no-persist="true">
                        <em class="fa fa-navicon"></em>
                     </a>
                  </li>
               </ul>

               <ul class="nav navbar-nav navbar-right">
                  <li class="visible-lg">
                     <a href="#" data-toggle-fullscreen="">
                        <em class="fa fa-expand"></em>
                     </a>
                  </li>
               </ul>
            </div>
            
         </nav>
      </header>
      <aside class="aside">
         <div class="aside-inner">
            <nav class="sidebar" data-sidebar-anyclick-close="">
               <ul class="nav">

                  <li class="nav-heading ">
                     <span data-localize="sidebar.heading.HEADER">Menu Principal</span>
                  </li>
                  <li class=" ">
                    <b-link to="/inicio/orden" title="Dashboard" data-toggle="collapse">                  
                        <em class="fa fa-tachometer"></em>
                        <span data-localize="sidebar.nav.DASHBOARD">Orden de Servicio</span>
                    </b-link>
                  </li>
                  <li class=" ">
                    <b-link to="/inicio/consultar" title="Widgets" data-toggle="collapse">                  
                        <em class="fa fa-search"></em>
                        <span data-localize="sidebar.nav.WIDGETS">Widgets</span>                   
                    </b-link>
                  </li>
               </ul>
            </nav>
         </div>
      </aside>

      <section>
         <div class="content-wrapper">

            <router-view
              v-bind:nombreusu="nombreusu">
            </router-view>
         </div>
      </section>
      <footer>
         <span>&copy; 2017 - WaySolutions Tecnology</span>
      </footer>
   </div>
   -->
   <div>
     <nav class="side-navbar mCustomScrollbar _mCS_1 mCS_no_scrollbar">
            <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0">
            <div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position: relative; top: 0px; left: 0px;" dir="ltr">
        <div class="side-navbar-wrapper">
            <div class="sidenav-header d-flex align-items-center justify-content-center">
            <div class="sidenav-header-inner text-center">
                <img src="src/assets/logo.png" alt="RLP" class="img-fluid rounded-circle mCS_img_loaded">
                
            </div>
            <div class="sidenav-header-logo"><a href="index.html" class="brand-small text-center"> <strong>R</strong><strong class="text-primary">P</strong><strong>L</strong></a></div>
            </div>
            <div class="main-menu">
            <ul id="side-main-menu" class="side-menu list-unstyled">                  
                <li>
                    <b-link to="/inicio/orden">
                        <i class="fa fa-tachometer"></i><span>Orden de Servicio</span>
                    </b-link>
                </li>
                <li> 
                    <b-link to="/inicio/consultar">
                        <i class="fa fa-search"></i><span>Consultar Orden</span>
                    </b-link>
                </li>
            </ul>
            </div>

        </div>
        </div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer">
            <div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; height: 0px; top: 0px; display: block; max-height: 724.4px;"><div class="mCSB_dragger_bar" style="line-height: 30px;">

            </div>
        </div>
        <div class="mCSB_draggerRail">

        </div>
        </div>
        </div>
        </div>
    </nav>
    <div class="page home-page">
      <!-- navbar-->
      <header class="header">
        <nav class="navbar">
          <div class="container-fluid">
            <div class="navbar-holder d-flex align-items-center justify-content-between">
              <div class="navbar-header"><a id="toggle-btn" href="#" class="menu-btn"><i class="icon-bars"> </i></a><a href="index.html" class="navbar-brand">
                  <div class="brand-text d-none d-md-inline-block"><span> </span><strong class="text-primary"></strong></div></a></div>
              <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                <li class="nav-item"><a href="login.html" class="nav-link logout">Logout<i class="fa fa-sign-out"></i></a></li>
               </ul>
            </div>
          </div>
        </nav>
      </header>
      <!-- Header Section-->
      <section class="dashboard-header section-padding">
        <div class="container-fluid">
           <div class="content-wrapper">
            <router-view
              v-bind:nombreusu="nombreusu">
            </router-view>
         </div>
        </div>
      </section>


      <footer class="main-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <p>WaySolutions Tecnology © 2017</p>
            </div>
            <div class="col-sm-6 text-right">
              <p>Design by <a href="#" class="external">Bootstrapious</a></p>
              <!-- Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)-->
            </div>
          </div>
        </div>
      </footer>
    </div>
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
ul>li>a:hover{
  text-decoration: none;
};
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
