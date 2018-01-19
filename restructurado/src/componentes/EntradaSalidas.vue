<template>
    <b-container>
        <b-row>
            <h3>Seleccione el Proceso Logistico</h3>
            <b-form-select v-model="selected"  text-field="nombre" value-field="_id"
            :options="procesosLog" class="mb-3" @input="procesoseleccionado">
            </b-form-select>
        </b-row>
        <b-row class="my-1 ">
            <b-col class="float-right">
                <b-btn class="float-right rounded"  variant="success" v-show="selected!=null"  v-b-modal.modal1>
                    <i class="fa fa-plus-square-o" aria-hidden="true"></i>
                </b-btn>
            </b-col>
        </b-row>
        <b-row class="my-1"> 
        <template v-for="(data, indice) in inputs.campos">
            <template v-if="data.vmodel=='id_centrologistico'">   
                         
                <b-form-select :id="data.id" v-model="objeto.id_centrologistico" text-field="nombre" value-field="_id" 
                :options="centrologistico" class="mb-3">
                </b-form-select>
            </template>
            <template v-if="data.vmodel=='id_curier'">
                 <b-form-select :id="data.id" v-model="objeto.id_curier" text-field="nombre" value-field="_id" 
                 :options="curiers" class="mb-3">
                </b-form-select>
            </template>
        </template>
        </b-row>
        <b-row v-show="proceSeleccionado.atencion_courier==true">
            <b-form-select v-model="curier" text-field="nombre" value-field="_id" :options="curiers2" class="mb-3">
            </b-form-select>
            {{curier}}
        </b-row>
        <b-row>
            CONTADOR
            {{itemsmovilizados.length}}
        </b-row>
        <b-row v-show="itemsmovilizados.length>0">
            <b-btn>
                Generar
            </b-btn>
        </b-row>
        <!-- Modal Component -->
        <b-modal id="modal1" title="Manifiestos" size="lg">
            <b-container fluid>
                <b-row>
                    <b-col >
                    <b-form>
                        <b-form-input v-model="text1"
                        class="float-left"
                        type="number"
                        placeholder="Ingrese N° Movilizado"></b-form-input>
                        
                    </b-form>
                    </b-col>
                    <b-col>
                        <b-btn variant="success" class="float-right" @click="adicionar(text1)">
                            Agregar
                        </b-btn>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="my-1">
                        N° de movilizados ingresados:
                        {{itemsmovilizados.length}}
                    </b-col>
                    <b-col>
                        <b-form-select v-model="selected" :options="options" class="my-1">
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                   <h3>listado de Movilizados:</h3> 
                        <b-table striped hover :fields="fields" :items="itemsmovilizados"
                         :per-page="10" :current-page="currentPage">
                            <template slot="elimnar" slot-scope="data">
                                <b-btn variant="danger">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                </b-btn>
                            </template> 
                         </b-table>
                        <b-pagination size="md" :total-rows="items.length"
                         v-model="currentPage" :per-page="10">
                        </b-pagination>
                </b-row>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import { bus } from "../main";
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'

export default {
    data(){
        return{
            curier: '',
            centrologistico:{},
            curiers:{},
            curiers2:{},
            objeto:'',
            pre:'',
            procesosLog:{},
            inputs:'',
            currentPage:1,
            fields: ['elimnar', 'nombre', 'nmovilizado' ],
            items: [
               {
                    nmovilizado:'',
                    nombre:''
               }
            ],
            itemsmovilizados: [
            ],
        options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: {'C': '3PO'}, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            text1:'',
            selected: null,
            proceSeleccionado:'',
            selected2:null,
            
        }
    },
    methods:{
        adicionar(value){
            console.log("entro a adicionar");
            console.log(value);
            if(value==null||value=='')
            {
                console.log("va vacio");
                swal(
                'Error',
                'Ingrese un valor por favor',
                'error'
                )
            }
        },
        procesoseleccionado(value){
            console.log("cambio");
            this.selected=value 
            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            //console.log(infologin.id_OperadorLogistico);
            this.axios.get(urlservicios+"CamposProcesoLogisticosOperadores/" +
                infologin.id_OperadorLogistico+'/'+this.selected)
                .then(response => {
                this.inputs = response.data;
                this.objeto=this.inputs.objeto
                
                if(this.objeto==undefined||this.objeto=='undefined')
                {

}
                else
                {
                    console.log("hago peticiones");
                    var llaves = Object.keys(this.objeto);
                    llaves.forEach(ele=>{
                    this.inputs.campos.forEach(element => {
                    if(element.vmodel=="id_centrologistico"){
                        this.axios.get(element.urlobjeto+
                            infologin.id_OperadorLogistico)
                            .then(resp1 => {
                                 var vacio=  { _id: "", nombre: 'Por Favor Seleccione un Centro Logistico' };
                                this.centrologistico=resp1.data
                                this.centrologistico.unshift(vacio)
                                
                            })
                    }
                    if(element.vmodel=="id_curier"){
                         this.axios.get(element.urlobjeto+
                            infologin.id_OperadorLogistico)
                            .then(resp1 => {
                                var vacio=  { _id: "", nombre: 'Por Favor Seleccione un Curier' };
                                this.curiers=resp1.data
                                this.curiers.unshift(vacio)
                                
                            })
                    }
                    });
                });
                }   
            });

            for(var x=0; x<this.procesosLog.length;x++)
            {   
                if(this.procesosLog[x]._id==this.selected)
                {   

                    this.proceSeleccionado=this.procesosLog[x]
                    if(this.proceSeleccionado.atencion_courier==true){
                        var login = localStorage.getItem("storedData");
                        var infologin = JSON.parse(login);
                        this.axios.get(
                            urlservicios+"UsuariosCurier/"+infologin.id_OperadorLogistico)
                            .then(response => {
                                this.curiers2 = response.data;
                                var vacio=  { _id: "", nombre: 'Por Favor Seleccione un Curier' };
                                this.curiers2.unshift(vacio)
                                
                            });
                    }
                }
            }
        }
        
    },
    beforeCreate: function() {
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Proceso logistico' };
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        //console.log(infologin.id_OperadorLogistico);
        this.axios
        .get(
            urlservicios+"Procesos/" +
            infologin.id_OperadorLogistico
        )
        .then(response => {
            this.procesosLog = response.data;
            this.procesosLog.unshift(vacio)
            console.log(this.procesosLog);

        });
  }
};

</script>

<style>
    .center-button {
        display: block;
        margin: auto;
    }
</style>
