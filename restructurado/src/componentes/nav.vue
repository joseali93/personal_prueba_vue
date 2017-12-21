<template>
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
                        <!-- Right aligned nav items -->
                        <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <!-- Using button-content slot -->
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
</template>

<script>


export default {
    data(){
        return{
            nombreusu: '',

        }
    },
    components: {

    },
    mounted: function () {
                var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        this.nombreusu=test.nombre;
    },
    beforeCreate: function () {

        console.log("antes")

    }, 
}
</script>

<style>
.textb{
    color: white;
    font-size: 18px
}
.menu {
    margin-top: 100px;
    padding: 5px
}
.menu:hover{
    background-color: #AED6F1;
}
.navbar-custom {
    background-color: #1565C0;
}
.jumbotron{
    background-color: white;
}
.sidemenu{

height: 900px;

}
.listado{
    padding-right: 0px
}
.contenido{
    padding-left: 0px
}
</style>
