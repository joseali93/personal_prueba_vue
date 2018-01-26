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
                 <b-form-select :id="data.id"  text-field="nombre" value-field="_id" 
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
        <b-row class="my-1">
            <b-col class="my-3">
                        Total de Movilizados :
                        <strong>
                        {{itemsmovilizados.length}}
                        </strong>
                    </b-col>
                    <b-col  class="my-3">
                        Total de Unidades :
                        <strong>
                        {{mostrar()}}
                        </strong>
                    </b-col>
        </b-row>
         <b-row v-show="itemsmovilizados.length>0">
            <b-btn variant="success" @click="generarManifiesto">
                Generar
            </b-btn>
        </b-row>
        <!-- Modal Component -->
        <b-modal id="modal1" title="Manifiestos" size="lg" :no-close-on-esc="true">
            <b-container fluid>
                 <b-row class="my-1">
                    <b-col>
                        <b-form-select v-model="concepto" :options="listadoconcepto"
                         text-field="nombre" value-field="_id" class="my-1">
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col >
                        <b-form-input v-model="text1"
                        class="float-left"
                        type="number"
                        id="nmovilizado"
                        placeholder="Ingrese N° Movilizado" @keyup.enter.native="adicionar(text1)"
                        v-b-tooltip.hover title="Digite el N de Movilizado!"></b-form-input>
                        
                    </b-col>
                </b-row>
               
                <b-row class="my-1">
                    <b-col class="my-3">
                        Total de Movilizados :
                        <strong>
                        {{itemsmovilizados.length}}
                        </strong>
                    </b-col>
                    <b-col  class="my-3">
                        Total de Unidades :
                        <strong>
                        {{mostrar()}}
                        </strong>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Listado de Movilizados:</h3> 
                            <b-table striped hover :fields="fields" :items="itemsmovilizados"
                            :per-page="5" :current-page="currentPage">
                                <template slot="elimnar" slot-scope="data">
                                    <b-btn variant="danger" @click="borrar(data)">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </b-btn>
                                </template>
                                <template slot="nmovilizado" slot-scope="data">
                                {{data.item.id}}
                                </template>
                                <template slot="unidades" slot-scope="data">
                                {{data.item.unidades}}
                                </template>
                                <template slot="concepto" slot-scope="data">
                                {{data.item.concepto.nombre}}
                                </template>
                            </b-table>
                            <b-pagination size="md" :total-rows="itemsmovilizados.length"
                            v-model="currentPage" :per-page="5">
                            </b-pagination>
                    </b-col>    
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
            processSelected:'',
            concepto: null,
            listadoconcepto:[],
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
            fields: ['elimnar', 'nombre',
                        { key: 'nmovilizado', label: 'N Movilizado' },
                        { key: 'unidades', label: 'Unidades' },
                        { key: 'concepto', label: 'Concepto' },
                ],
            items: [
               {
                    nmovilizado:'',
                    nombre:''
               }
            ],
            itemsmovilizados: [
            ],
            text1:'',
            selected: null,
            proceSeleccionado:'',
            selected2:null,
            mensaje:'',
            
        }
    },
    methods:{
        mostrar(){
            var unidades=0
            if(this.itemsmovilizados.length<=0){
                return 0
            }
            else{
                //console.log(this.itemsmovilizados);
                for(var x=0; x<this.itemsmovilizados.length;x++)
                {
                    if(this.itemsmovilizados[x].unidades==0||
                    this.itemsmovilizados[x].unidades=='0'||
                    this.itemsmovilizados[x].unidades==null||
                    this.itemsmovilizados[x].unidades=='null')
                    {
                        unidades=unidades+1
                    }
                    else{
                        unidades=unidades+parseInt(this.itemsmovilizados[x].unidades)
                    }
                }
                return unidades
            }
        },
        borrar(value){
            console.log("entro a borrar");
            console.log(value)
            this.itemsmovilizados.splice(value.index,1)
        },
        generarManifiesto(){
            console.log("entro a generar manifiesto");
            console.log(this.itemsmovilizados);
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
                    if(eval('this.objeto.'+llaves[x])==''||eval('this.objeto.'+llaves[x])==null)
                    {   

                        this.inputs.campos[x].estado=false
                        swal("Debe completarse", 
                        "Seleccione "+this.inputs.campos[x].placeholder,
                        "error",{
                              allowEnterKey: true,

                        });
                        bandera=true
                    }

                }
                //console.log(this.objeto);
                if(bandera==true)
                {
                    console.log("no hacemos peticion");

                }
                else
                {
                    console.log("hacemos peticion");
                    //console.log(this.itemsmovilizados);
                }
            }
            var inforinputs=[]    
            for(var x=0;x<this.opciones.length;x++){

                var llaves=Object.keys(this.objeto)
                for(var y=0;y<this.opciones[x].length;y++)
                {
                    if(this.opciones[x][y]._id==eval('this.objeto.'+llaves[x]))
                    {
                        console.log("obtengo la info");
                        inforinputs[x]=this.opciones[x][y]
                    }
                }
            }
                            //console.log(inforinputs);
            var inforvaria=inforinputs
            var itemsmodal=this.itemsmovilizados
            var varios=[]
            var listMovilizados={

            }
            for(var x=0;x<this.itemsmovilizados.length;x++){
                console.log(x);
                if(this.itemsmovilizados[x].concepto._id==null||
                this.itemsmovilizados[x].concepto._id==undefined)
                {
                    console.log(this.itemsmovilizados[x].id)
                     var listMovilizados={

                     numeroMovilizado:this.itemsmovilizados[x].id
                     }
                    varios.push(listMovilizados)

                }
                else{
                     var listMovilizados={
                         nombre_concepto:this.itemsmovilizados[x].concepto.nombre,
                    id_concepto:this.itemsmovilizados[x].concepto._id,
                    numeroMovilizado:this.itemsmovilizados[x].id
                     }
                                     varios.push(listMovilizados)

                }
                //console.log(listMovilizados);
            }
            
            var envio ={
                listadoMovilizados:varios,
                infoManifiesto:this.objeto,
                id_procesoLogistico:this.processSelected._id
            }
            console.log(envio);
            
            setTimeout(() => {
                        bus.$emit('modalinfo', {
                            itemsmodal,inforvaria
                        })

                        }, )
            this.$router.push(this.processSelected.modal)
            
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
            var x = document.getElementById(value.id).value
            eval('this.objeto.'+value.vmodel+'='+'x')

        },
        adicionar(value){
            var agregar=true
            var infoconcepto
            
            if(this.concepto==null){
                console.log("hay concepto nulo");
                infoconcepto={}
            }
            else{

                for(var x=0;x<this.listadoconcepto.length;x++)
                {
                    if(this.listadoconcepto[x]._id==this.concepto){
                        infoconcepto=this.listadoconcepto[x]
                    }
                }
            }
            if(value==null||value=='')
            {
                console.log("va vacio");

                swal({
                title: 'Error!',
                text: 'Ingrese un valor por favor',
                type: 'error',
                focusConfirm:true,
                showConfirmButton: true,
                allowOutsideClick:false,
                allowEscapeKey:false,
                allowEnterKey:true,
                timer:3000
                })
            }
            else
            {
                this.axios.get(urlservicios+"MovilizadoProcesosLogistico/" +
                value+'/'+this.selected)
                .then(response => {
                    this.mensaje=response.data
                    if(this.mensaje.message)
                    {
                        swal({
                        title: 'Error!',
                        text: ''+this.mensaje.message,
                        type: 'error',
                        focusConfirm:true,
                        showConfirmButton: true,
                        allowOutsideClick:false,
                        allowEscapeKey:false,
                        allowEnterKey:true,
                        timer:3000
                        })
                    }
                    if(this.mensaje.estado==true)
                    {
                        
                        if(this.itemsmovilizados.length==0)
                        {
                            swal({
                            position: 'center',
                            type: 'success',
                            title: 'Agregado correctamente',
                            showConfirmButton: false,
                            timer: 1000
                            })
                            this.mensaje.concepto=infoconcepto
                            this.itemsmovilizados.push(this.mensaje)
                        }
                        else
                        {
                            for(var x=0;x<this.itemsmovilizados.length;x++){
                                if(this.itemsmovilizados[x].id==this.mensaje.id)
                                {
                                    agregar=false
                                }
                            }
                            if(agregar==false)
                            {
                                swal({
                                    position: 'center',
                                    type: 'error',
                                    title: 'Ya se encuentra en el Listado',
                                    showConfirmButton: false,
                                    timer: 1000
                                    })
                            }
                            else
                            {
                                swal({
                                    position: 'center',
                                    type: 'success',
                                    title: 'Agregado correctamente',
                                    showConfirmButton: false,
                                    timer: 1000
                                    })
                                    this.mensaje.concepto=infoconcepto
                                    this.itemsmovilizados.push(this.mensaje)
                            }
                        }

                    }
                    if(this.mensaje.estado==false)
                    {
                        swal({
                        title: 'Error!',
                        text: 'El N° Movilizado '+this.mensaje.id+' se encuentra en el siguiente proceso '+
                        this.mensaje.proceso,
                        type: 'error',
                        focusConfirm:true,
                        showConfirmButton: true,
                        allowOutsideClick:false,
                        allowEscapeKey:false,
                        allowEnterKey:true,
                        timer:4000
                        })
                        
                    }
                })
            }
        },
        procesoseleccionado(value){
            var nvacio ={ _id: null, nombre: 'Por Favor Seleccione un Concepto' };
            console.log("cambio");
            this.selected=value 
            // console.log(this.procesosLog);
            if(this.selected==null){
            }else{
                for(var x=0;x<this.procesosLog.length;x++)
                {
                if(this.procesosLog[x]._id==this.selected)
                {

                    this.processSelected=this.procesosLog[x]
                    if(this.procesosLog[x].conceptos==null||
                    this.procesosLog[x].conceptos==undefined)
                    {
                        //console.log(this.procesosLog[x].conceptos);
                        this.listadoconcepto.unshift(nvacio)
                    }
                    else{
                        this.listadoconcepto=this.procesosLog[x].conceptos
                        this.listadoconcepto.unshift(nvacio)
                    }
                }
                }
            }
            
            
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

                    this.inputs.campos.forEach((element,indice) => {
                        
                    if(element.urlobjeto==undefined){
                        console.log("no se hace peticion de url");       
                    }
                    else{
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
