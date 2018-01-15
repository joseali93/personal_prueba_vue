<template>
    <b-container fluid class="conta">
        <b-row>
            <b-btn @click="volver" variant="success">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                Volver
            </b-btn>
            <!---
          <router-link  to="/inicio/consultar/resultado" tag="button" class-active="active" 
          class="btn btn-secondary btn-lg fa fa-arrow-left ">
          Volver
          </router-link>
          -->
        </b-row>
        <b-row>
            <b-col>
                <b-row>
                    <b-col>
                        <h4>Cliente:</h4>
                    </b-col>
                    <b-col>
                        <p>{{info.remitente.nombre}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Direccion Cliente:</h4>
                    </b-col>
                    <b-col>
                        <p>{{info.remitente.direccion}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Centro de Costo:</h4>
                    </b-col>
                    <b-col>
                        <p>{{info.centro.nombre}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Direccion Centro de Costo:</h4>
                    </b-col>
                    <b-col>
                        <p>{{info.centro.direccion}}</p> 
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        <h4>Fecha Creación:</h4>
                    </b-col>
                    <b-col>
                        <p>{{info.fecha_creacion | formatdate}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Estado Orden de Servicio:</h4>
                    </b-col>
                    <b-col>
                        <p>{{info.estado}}</p> 
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

              
        <b-row>
            <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="this.currentUser.detalle">
                <template slot="consecutivo" scope="data">
                    {{data.item.id}}
                </template>
                <template slot="productoslocal" scope="data">
                    {{data.value.nombre}}         
                </template>
                <template slot="servicioslocal" scope="data">
                    {{data.value.nombre}}
                </template>
                <template slot="editar" scope="data">
                    <i class="btn btn-success fa fa-pencil" v-on:click.stop="actualizar(data.index,data.item.id)" v-b-modal.modalactualizar></i>
                </template>
            </b-table>
            <b-pagination size="md" :total-rows="this.currentUser.detalle.length" v-model="currentPage" :per-page="5">
            </b-pagination>
            </b-row>
            <b-row>
                <h4>Seleccione el Currier: </h4>
                <b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre" value-field="_id" @change.native="selectcuriers">
                </b-form-select>
            </b-row>
        <b-row>
            <b-btn size="lg" variant="success" @click="asignar(selected_curier)">Aceptar</b-btn>
        </b-row>
        <!-- Modal para Trayectos-->
        <b-modal id="modalactualizar" ref="ModalAct" title="Editar Registro" size="lg">
            <b-container fluid>
                <b-row v-for="(data,indice) in inputs.campos" class="my-1"> 
                    <template v-if="data.type!='select'">
                        <b-col cols="5">
                            <label  class="col-sm-2 col-form-label col-form-label-sm" :style="data.style" >{{data.placeholder}}: </label>
                        </b-col>
                        <b-col cols="6">
                            <input class="form-control form-control-sm"  :type="data.type" :id="data.id" :style="data.style" :max="data.max"
                             @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="data.diseable"
                              :value="values(data.id)"  required>
                        </b-col>
                    </template>
                    <b-row v-else>
                        <h4>Seleccione el Trayecto</h4>
                        <b-form-select :id="data.id" :options="trayectos" text-field="nombre" value-field="_id"  v-model="selection"  >
                            <!--
                            <option v-for="tray in trayectos" :value="tray" >{{tray.nombre}}</option>
                            -->
                        </b-form-select>
                    </b-row>

                </b-row>

            </b-container>
            <div slot="modal-footer" class="w-100">
                    <b-btn class="mt-3" variant="danger"  @click="hideModal">Cancelar</b-btn>
                    <b-btn class="mt-3 float-right" variant="success" v-on:click="ingresarTrayectos()">Guardar</b-btn>

            </div>
        </b-modal>
    </b-container>
</template>

<script>
import {bus} from '../main'
import {urlservicios} from '../main'
import moment from 'moment'


export default {
    data(){
        return{
            consecutivo:'',
            camposT:[],
            inputstotales:[],
            id_trayectos:[],
            detallesactualizar: '',
            fields: [
                { key: "consecutivo", label: "Consecutivo" },
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
            trayectos: null,
            indices:'',
            inputs: '',
            campos: {},
            info:{}
        }
    },
        filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    methods: {
        volver(){
            var ocultar=true
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar 
                })
                }, )
            this.$router.replace('/inicio/consultar/resultado')

        },
        selectcuriers(value){

            this.selected_curier=value.target.value
        },
        Presiono(indi,dato){
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
                }else{
                    eval("this.campos."+document.getElementById(this.inputs.campos[indi].id).id+"="+document.getElementById(this.inputs.campos[indi].id).value)
                }
                
            }
            //console.log(this.campos);

        },
        values(dato){
            //console.log(eval("this.currentUser.detalle[this.indices].detalleslocal.infor"));
            return eval("this.currentUser.detalle[this.indices].detalleslocal.infor."+dato)
        },
        hideModal(){
            this.selection=''
          this.$refs.ModalAct.hide();
        },
        ingresarTrayectos(){     
            var nombresel
            if(this.info.estado=="orden de servicio cancelada")
            {
                swal(
                    "Cuidado!",
                    "Orden de Servicio Cancelada",
                    "warning"
                );            }
            else{
                this.campos.id_trayecto=this.selection
                console.log(this.trayectos.length);
                for(var x=0;x<this.trayectos.length;x++)
                {
                    console.log(this.trayectos[x]);
                    console.log(this.selection);
                    if(this.trayectos[x]._id==this.selection)
                    {
                        console.log("saco el nombre");
                        nombresel=this.trayectos[x].nombre
                        console.log(this.trayectos[x].nombre);
                    }
                }
                var objeto = {
                    id_trayecto:this.selection,
                    nombre:nombresel
                }; 
                for(var x=0;x<this.currentUser.detalle.length;x++)
                {  
                    if(this.currentUser.detalle[x].id==this.consecutivo)
                    {   

                        this.currentUser.detalle[x].detalleslocal.infor.id_trayecto=this.selection._id
                    }
                    
                }
                
                
                this.axios
                    .post(urlservicios+"ActualizarTrayecto/"+this.currentUser._id+"/"+this.consecutivo, objeto)
                    .then(response => {
                        //console.log(response);
                    });

                var objeto2 = {
                    id_trayecto:this.selection,
                    indice:this.indices,
                    detalle:this.currentUser.detalle[this.indices].id
                }; 
                this.id_trayectos.push(objeto2)
                console.log(this.id_trayectos);
                            this.selection=''
                this.$refs.ModalAct.hide();
            }
            
                    
        },
        asignarcurier(seleccionado)
        {
            console.log(this.info.estado);
            if(seleccionado==''){
                    seleccionado='null'
                    }
                    var obj ={
                        id_orden: this.currentUser._id,
                        id_curier: seleccionado
                    }

                    
                    this.axios
                        .post(urlservicios+"AsignarOrdenCurrier/",obj)
                        .then(response => {
                        this.Documento = response.data;
                        if(this.Documento.validacion==false){
                        swal(
                            "Cuidado!",
                            "" + this.Documento.message,
                            "warning"
                        );
                        }
                        else{
                            swal(
                            "Excelente!",
                            "" + this.Documento.message,
                            "success"
                        );
                        }
        
                        });
        },
        asignar(seleccionado)
        {
            var bandera
            var pendientes,llaves
            this.currentUser.detalle.map((obj,ind)=>{
                
                this.inputstotales[ind].campos.map((objinput,indi)=>{
                    //console.log(Object.keys(eval('obj.detalleslocal.infor')));
                    
                    if(objinput.requerido_edi==true)
                    {
                        if(eval('obj.detalleslocal.infor.'+objinput.vmodel)==''||
                            eval('obj.detalleslocal.infor.'+objinput.vmodel)==null||
                            eval('obj.detalleslocal.infor.'+objinput.vmodel)==undefined||
                            eval('obj.detalleslocal.infor.'+objinput.vmodel)=='000000000000000000000000')

                        {
                           /* console.log( typeof(eval('obj.detalleslocal.infor.'+objinput.vmodel)));
                            console.log(ind);
                            console.log(objinput);
                            console.log(eval('obj.detalleslocal.infor'));*/
                            bandera=false
                            pendientes=ind+1

                        }
                        else
                        {
                            console.log("anda completo todo");
                            bandera=true
                        }
                    }
                    else
                    {
                        console.log("no se exige");
                    }
                    
                })
            }) 
            this.currentUser.detalle.map((obj,ind)=>{
                llaves=Object.keys(eval('obj.detalleslocal.infor'))
                    //console.log(objinput);
                    llaves.map((objlla,ind)=>{
                        if(typeof(eval('obj.detalleslocal.infor.'+objlla))=='object')
                        {
                            console.log("hay un ojeto");
                            bandera=true
                        }
                        else{
                            console.log("no hay un objeto");
                            if(this.id_trayectos.length>0){
                                bandera=true
                            }
                            else{
                                bandera=false
                            }
                        }
                    })
            })

            if(bandera==true)
            {
                console.log("hacemos peticion");
                this.asignarcurier(seleccionado)
            }
            else
            {
                console.log("no hacemos peticion");
                swal(
                    "Falta algo por completar!",
                    "Revisa el detalle "+pendientes,
                    "error"
                );
            }
        },
        actualizar(indice,consecutivo){
            this.consecutivo=consecutivo
                      var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Trayecto' };

            //console.log(this.info.estado);
            if(this.info.estado=='orden de servicio cancelada'||this.info.estado=='Orden De Servicio Recogida'||this.info.estado=='Orden de servicio cerrada')
            {
                this.indices=indice
                this.detallesactualizar= this.currentUser.detalle[indice].detalleslocal
                var produc= this.currentUser.detalle[indice].productoslocal._id
                var serv = this.currentUser.detalle[indice].servicioslocal._id
                this.axios.get(urlservicios+"estructuraf/" +produc +
                "/" +serv)   
                .then(response => {
                this.inputs = response.data;
                this.campos= response.data.objeto
                //console.log(this.inputs.campos);
                for(var i=0;i<this.inputs.campos.length;i++){
                    this.inputs.campos[i].diseable='true'
                    if(this.inputs.campos[i].type=='select'){
                        var login = localStorage.getItem("storedData");
                        var infologin = JSON.parse(login);
                        this.axios.get(this.inputs.campos[i].urlobjeto+infologin.id_OperadorLogistico)   
                        .then(response => {
                        this.trayectos = response.data;
                        this.trayectos.unshift(vacio)
                        console.log(this.trayectos);

                        })
                    }else{
                    }
                }
                }).catch(function(error){
                })
            }
            else
            {
                this.indices=indice
                this.detallesactualizar= this.currentUser.detalle[indice].detalleslocal
                var produc= this.currentUser.detalle[indice].productoslocal._id
                var serv = this.currentUser.detalle[indice].servicioslocal._id
                this.axios.get(urlservicios+"estructuraf/" +produc +
                "/" +serv)   
                .then(response => {
                this.inputs = response.data;
                this.campos= response.data.objeto
                //console.log(this.inputs.campos);
                for(var i=0;i<this.inputs.campos.length;i++){
                    if(this.inputs.campos[i].type=='select'){
                        var login = localStorage.getItem("storedData");
                        var infologin = JSON.parse(login);
                        this.axios.get(this.inputs.campos[i].urlobjeto+infologin.id_OperadorLogistico)   
                        .then(response => {
                        this.trayectos = response.data;
                        })
                    }else{
                    }
                }
                }).catch(function(error){
                })
            }


        }
    },
    watch: {
      currentUser (n, o) {
      },
    selection(n,o){
    },

  },
      mounted: function () {
          console.log("montado");
          
    },
    created: function(){

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

        });

        bus.$on('thisEvent', function (userObject) {
        this.currentUser = userObject.inde.item
        this.info=this.currentUser
        this.inputstotales=userObject.inputstotales
      }.bind(this))
    }
}



</script>

<style>
.conta {
    padding: 3%
}
</style>
