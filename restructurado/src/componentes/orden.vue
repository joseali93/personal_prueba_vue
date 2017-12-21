<template>
    <b-container>
        <b-row>
        <h3>INFORMACION RECOGIDA</h3>
        <b-form-select v-model="selected_client"class="mb-3" @click.native="ClientesSelect(selected_client)" >
            <option disabled selected value> Clientes </option>
            <option v-for="(data,indice) in clientes" :value="data">
                {{data.nombre}}
            </option>
        </b-form-select>
        <b-form-select v-model="selected_center"class="mb-3">
            <option disabled selected value> Centro de Costos </option>
            <option v-for="(data,indice) in centros" :value="data">
                {{data.nombre}}
            </option>
        </b-form-select>
        </b-row>
        <b-row>
            <b-form-group id="exampleInputGroup1"
                label="Direccion: ">
                    <b-form-input id="direccion"
                    size="lg"
                        type="text"
                        v-model="selected_client.direccion"
                        required
                        placeholder="Direccion">
                    </b-form-input>
            </b-form-group>
        </b-row>
        <b-row>
            <b-form-group id="exampleInputGroup2"
                label="Contacto: ">
                    <b-form-input id="direccion"
                    size="lg"
                        type="text"
                        v-model="selected_client.nombre"
                        required
                        placeholder="Direccion">
                    </b-form-input>
            </b-form-group>
        </b-row>
        <b-row>
            <b-form-group id="exampleInputGroup3"
                label="Telefono: " >
                    <b-form-input id="direccion"
                    size="lg"
                        type="text"
                        v-model="selected_client.telefono"
                        required
                        placeholder="Direccion">
                    </b-form-input>
            </b-form-group>
        </b-row>
        <b-row>
            <a  v-on:click="actualizar"> 
                <b-btn v-on:click="actualizar">Continuar</b-btn>
            </a>
        </b-row>
    </b-container>
</template>

<script>
import Orden from '../componentes/orden.vue'
import {bus} from '../main'
import {urlservicios} from '../main'

export default {
    data () {
    return {
        selected_client: '',
        selected_center: '',
        clientes: {},
        centros:{},

        }    
    },
    methods: {
        ClientesSelect(seleccion){
                        //console.log("antro a selecion de clientes")
                    if(seleccion!==undefined){
                    this.axios.get(urlservicios+"centros/")
                        // this.axios.get("http://192.168.1.69:3000/logistica/centros/"+seleccion._id)
                        .then((response) => {
                            this.centros=response.data
                            //console.log(this.centros)
                        })
                    }
        },
        actualizar: function(){
            if(this.selected_client==''||this.selected_center==''){
                swal(
                    'Oops...',
                    'Falto algun campo por completar!',
                    'error'
                )
            }else{
            var selected_client= this.selected_client._id
            var selected_center= this.selected_center._id
            var seleccionados = {
                selected_client:selected_client,
                selected_center:selected_center
            };
            //console.log(seleccionados)
            bus.$emit('remitente',seleccionados)
            localStorage.setItem("orden",JSON.stringify(seleccionados))
            this.$router.replace('/inicio/ordenservicio')
        }
        }
    },
    beforeCreate: function () {

        //console.log("antes")
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        //console.log(test.id_OperadorLogistico)
        //this.axios.get("http://200.116.52.29:3000/logistica/clientes/"+test.id_OperadorLogistico)
        this.axios.get(urlservicios+"clientes/")
        .then((response) => {
            this.clientes=response.data
            //console.log(this.clientes)
        })
        this.nombreusu;
        bus.$emit('remitente')
    }, 
}
</script>

<style>

</style>
