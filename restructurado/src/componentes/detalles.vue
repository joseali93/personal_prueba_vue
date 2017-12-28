<template>
    <b-container fluid>
        <b-card>
        <b-row>
          <router-link  to="/inicio/consultar/resultado" tag="button" class-active="active" 
          class="btn btn-secondary btn-lg fa fa-arrow-left ">
          Volver
          </router-link>
        </b-row>
        </b-card>
            <b-row>
                <h4>Cliente:</h4>
            </b-row>
            <b-row>
                <p>{{info.remitente.nombre}}</p> 
            </b-row>
            <b-row>
                <h5>Direccion:</h5>
            </b-row>
            <b-row>
                <p>{{info.remitente.direccion}}</p> 
            </b-row>
            <b-row>
                <h4>Centro de Costo:</h4>
            </b-row>
            <b-row>
                <p>{{info.centro.nombre}}</p> 
            </b-row>
            <b-row>
                <h4>Direccion Centro de Costo:</h4>
            </b-row>
            <b-row>
                <p>{{info.centro.direccion}}</p> 
            </b-row>
            <b-row>
                <h4>Fecha Creación:</h4>
            </b-row>
            <b-row>
                <p>{{info.fecha_creacion}}</p> 
            </b-row>    
            <b-row>
                <h4>Estado:</h4>
            </b-row>
            <b-row>
                <p>{{info.estado}}</p> 
            </b-row>     
        <b-row>
            <b-table :fields="fields" :per-page="3" :current-page="currentPage" :items="this.currentUser.detalle">
                <template slot="productoslocal" scope="data">
                    {{data.value.nombre}}         
                </template>
                <template slot="servicioslocal" scope="data">
                    {{data.value.nombre}}
                </template>
                <template slot="editar" scope="data">
                    <i class="btn btn-outline-warning fa fa-info" v-on:click="actualizar(data.index)" v-b-modal.modalactualizar></i>
                </template>
            </b-table>
            <b-pagination size="md" :total-rows="this.currentUser.detalle.length" v-model="currentPage" :per-page="3">
            </b-pagination>
            </b-row>
            <b-row>
                <b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre" value-field="_id" @change.native="selectcuriers">

                </b-form-select>
        </b-row>
        <b-row>
            <b-btn size="lg" variant="success" @click="asignar(selected_curier)">Aceptar</b-btn>
        </b-row>
        <!-- Modal para Trayectos-->
        <b-modal id="modalactualizar" ref="ModalAct" title="Editar Registro" size="lg">
            <b-container fluid>
                <b-row v-for="(data,indice) in inputs.campos"> 
                    <template v-if="data.type!='select'">
                        <b-col cols="5">
                            <label  class="col-sm-2 col-form-label col-form-label-sm" :style="data.style" >{{data.placeholder}}: </label>
                        </b-col>
                        <b-col cols="6">
                            <input :type="data.type" :id="data.id" :style="data.style" :max="data.max" @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="data.diseable" :value="values(data.id)"  required>
                        </b-col>
                    </template>
                    <b-row v-else>
                        <h4>Seleccione el Trayecto</h4>
                        <b-form-select :id="data.id"  v-model="selection"  >
                            <option v-for="tray in trayectos" :value="tray" >{{tray.nombre}}</option>
                        </b-form-select>
                    </b-row>

                </b-row>

            </b-container>
            <div slot="modal-footer" class="w-100">
                    <b-btn class="mt-3" variant="outline-danger"  @click="hideModal">Cancelar</b-btn>
                    <b-btn class="mt-3 float-right" variant="outline-success" v-on:click="ingresarTrayectos">Guardar</b-btn>

            </div>
        </b-modal>
    </b-container>
</template>

<script>
import {bus} from '../main'
import {urlservicios} from '../main'

export default {
    data(){
        return{
            detallesactualizar: '',
            fields: [
                { key: "productoslocal", label: "Productos" },
                { key: "servicioslocal", label: "Servicios" },
                "editar"
                ],
            currentPage: 1,
            currentUser: '',
            selected_curier: '',
            curiers: '',
            Documento: '',
            selection: null,
            trayectos: {},
            indices:'',
            inputs: '',
            campos: {},
            info:{}
        }
    },
    
    methods: {
        selectcuriers(value){
            console.log("entro a selec curier");
            console.log(value);
            this.selected_curier=value.target.value
        },
        Presiono(indi,dato){
            console.log("entro a presiono y el indice es -> "+indi);
            //this.campos.id_trayecto=this.selection._id
            console.log(this.campos);

            if(document.getElementById(this.inputs.campos[indi].id).value==null||document.getElementById(this.inputs.campos[indi].id).value==''){
                swal(
                    'Oops...',
                    'No puede ser vacio',
                    'error'
                    )
            }else{
                
                if(document.getElementById(this.inputs.campos[indi].id).value>this.inputs.campos[indi].max){
                    //eval("this.currentUser.detalle[this.indices].detalleslocal.infor.")
                    swal(
                        'Oops...',
                        'El maximo permitido es: '+this.inputs.campos[indi].max,
                        'error'
                    )
                    document.getElementById(this.inputs.campos[indi].id).value=this.inputs.campos[indi].max
                    eval("this.campos."+document.getElementById(this.inputs.campos[indi].id).id+"="+document.getElementById(this.inputs.campos[indi].id).value)
                    //console.log(this.campos);
                }else{
                    eval("this.campos."+document.getElementById(this.inputs.campos[indi].id).id+"="+document.getElementById(this.inputs.campos[indi].id).value)
                    //console.log(this.campos);
                }
                
                console.log("ok");
            }

        },
        values(dato){
            return eval("this.currentUser.detalle[this.indices].detalleslocal.infor."+dato)
        },

        hideModal(){
          this.$refs.ModalAct.hide();
        },
        ingresarTrayectos(){
            this.campos.id_trayecto=this.selection._id
            console.log(this.campos);
            var objeto = {
                id_trayecto:this.selection._id,
            }; 
            this.axios
                .post(urlservicios+"ActualizarTrayecto/"+this.currentUser._id+"/"+this.currentUser.detalle[this.indices].id, objeto)
                .then(response => {
                });
                    this.$refs.ModalAct.hide();
        },
        asignar(seleccionado){

            var obj ={
                id_orden: this.currentUser._id,
                id_curier: seleccionado
            }
            this.axios
                .post(urlservicios+"/AsignarOrdenCurrier/",obj)
                .then(response => {
                this.Documento = response.data.message;

                swal(
                    "Excelente!",
                    "" + this.Documento,
                    "success"
                );
                });
        },
        actualizar(indice){
            //console.log(indice);
            this.indices=indice
            this.detallesactualizar= this.currentUser.detalle[indice].detalleslocal
            //console.log(this.currentUser)
            var produc= this.currentUser.detalle[indice].productoslocal._id
            var serv = this.currentUser.detalle[indice].servicioslocal._id
            this.axios.get(urlservicios+"estructuraf/" +produc +
            "/" +serv)   
            .then(response => {
            this.inputs = response.data;
            //console.log(this.inputs.campos);
            this.campos= response.data.objeto
            for(var i=0;i<this.inputs.campos.length;i++){
                if(this.inputs.campos[i].type=='select'){
                    //console.log("es un select");
                    var login = localStorage.getItem("storedData");
                    var infologin = JSON.parse(login);
                    this.axios.get(this.inputs.campos[i].urlobjeto+infologin.id_OperadorLogistico)   
                    .then(response => {
                    this.trayectos = response.data;

                    //console.log("son los trayectos"+this.trayectos);
                    })
                }else{
                    //console.log("no es selects");
                }
            }
            }).catch(function(error){
              //console.log("error estruc -> "+JSON.stringify(error));
            })

        }
    },
    watch: {
      currentUser (n, o) {
        //console.log(n, o)
      },
    selection(n,o){
        //console.log(n, o)
        //console.log("cambio inputs");
        //console.log(this.indices);
        //console.log(this.inputs.campos[this.indices]);
    }
  },
      mounted: function () {

      //console.log('User outside eventbus:', this.currentUser) // Shows empty user
    },
    created: function(){
        /*let orden = this.$route.params.orden
        this.axios.get("http://200.116.52.29:3000/logistica/ObtenerOrdenesFiltrado/"+orden+"/null/null/null")
            .then((response) => {
                this.consulta=response.data
                //console.log(this.consulta)
            })*/
    }, 
    beforeCreate: function() {
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        this.axios
        .get(
            urlservicios+"UsuariosCurier/"+infologin.id_OperadorLogistico 
        )
        .then(response => {
            this.curiers = response.data;
            console.log("curiers");
            console.log(this.curiers);
        });

        bus.$on('thisEvent', function (userObject) {
        //console.log('event received!', userObject)
        this.currentUser = userObject.inde.item
        this.info=this.currentUser
        //console.log('The user: ', this.currentUser) // Shows correct new user data
      }.bind(this))
    }
}



</script>

<style>

</style>
