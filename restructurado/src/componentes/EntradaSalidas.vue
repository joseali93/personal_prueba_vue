<template>
    <b-container>
        <b-row class="my-1 ">
            <b-col class="float-right">
                <b-btn class="float-right rounded"  variant="success" v-show="selected!=null"  v-b-modal.modal1>
                    <i class="fa fa-plus-square-o" aria-hidden="true"></i> Adicionar Movilizados
                </b-btn>
            </b-col>
        </b-row>
        <b-row>
            <h3>Seleccione el Proceso Logistico</h3>
            <b-form-select v-model="selected"  text-field="nombre" value-field="_id" 
            :options="procesosLog" class="mb-3" @input="procesoseleccionado">
            </b-form-select>
        </b-row>
        
        <b-row class="my-1"> 
        <template v-for="(data,indice) in inputs.campos">
            <template v-if="data.type=='text'">   
                    <label>Ingrese {{ data.placeholder }}:</label>
                
                    <b-form-input 
                    :id="data.id"
                    :type="data.type"
                    :placeholder="data.placeholder"
                    @input="digitar(data)"
                    :state="data.estado"></b-form-input>
    
            </template>
            <template v-if="data.type=='number'">
                    <label>Ingrese {{ data.placeholder }}:</label>
                    <b-form-input 
                    :id="data.id"
                    :type="data.type"
                    :placeholder="data.placeholder"
                    @input="digitar(data)"
                    :state="data.estado">
                    </b-form-input>
            </template>
            <template v-if="data.type=='select'">
                <h3>Seleccione el {{data.placeholder}}</h3>
                 <b-form-select :id="data.id" text-field="nombre" value-field="_id" 
                 :options="opciones[indice]" @change="seleccionado(data)" class="mb-3"
                 :state="data.estado">
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
        <b-row >
            <b-btn variant="success" @click="generarManifiesto">
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
            opciones:[],
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
        generarManifiesto(){
            console.log("entro a generar manifiesto");
            if(this.objeto==undefined){
                console.log("no hago nada");
            }
            else{
                var llaves=Object.keys(this.objeto)
                var bandera
                for(var x=0;x<llaves.length;x++){
                this.inputs.campos[x].estado=null
                }
                for(var x=0;x<llaves.length;x++){
                    if(eval('this.objeto.'+llaves[x])=='')
                    {
                        this.inputs.campos[x].estado=false
                        swal("Debe completarse", 
                        "Seleccione "+this.inputs.campos[x].placeholder,
                        "error");
                        bandera=true
                    }
                }
                console.log(this.objeto);
                if(bandera==true)
                {
                    console.log("no hacemos peticion");
                }
                else
                {
                    console.log("hacemos peticion");
                }
            }
            

        },
        digitar(value){
            setTimeout(
            function() {
            console.log("entro a digitar");
            var x = document.getElementById(value.id).value
            if(x==''||x==null||x==""){
                eval('this.objeto.'+value.vmodel+'='+value.min)
                document.getElementById(value.id).value=value.min
            }else{
                if(x>value.max)
                {
                    document.getElementById(value.id).value=value.min
                    eval('this.objeto.'+value.vmodel+'='+value.min)
                }else{
                    eval('this.objeto.'+value.vmodel+'='+'x')
                }
            }
            }.bind(this))
            console.log(this.objeto);
        },
        seleccionado(value){
            console.log("entro a seleccionado");

            var x = document.getElementById(value.id).value
            eval('this.objeto.'+value.vmodel+'='+'x')

        },
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
            console.log(value);
            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            //console.log(infologin.id_OperadorLogistico);
            this.axios.get(urlservicios+"CamposProcesoLogisticosOperadores/" +
                infologin.id_OperadorLogistico+'/'+this.selected)
                .then(response => {
                this.inputs = response.data;
                this.objeto=this.inputs.objeto
                //console.log(this.inputs);
                //console.log(this.objeto);
                if(this.objeto==undefined||this.objeto=='undefined')
                {

            }
                else
                {
                    //console.log("hago peticiones");
                    var llaves = Object.keys(this.objeto);
                    //llaves.forEach(ele=>{
                    this.inputs.campos.forEach(element => {
                        //console.log(ele);
                        //console.log("valida if");
                        //console.log(element.urlobjeto);
                    if(element.urlobjeto==undefined){
                        console.log("no se hace peticion de url");       
                    }
                    else{
                        console.log("se hace peticion url");
                        this.axios.get(element.urlobjeto+
                            infologin.id_OperadorLogistico)
                            .then(resp1 => {
                                 var vacio=  { _id: "", nombre: 'Por Favor Seleccione un Campo' };
                                 var respuesta=resp1.data
                                 respuesta.unshift(vacio)
                                 this.opciones.push(respuesta)
                                
                                
                            })
                    }
                   
                    });
                //});
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
