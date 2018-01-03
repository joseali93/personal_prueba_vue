<template>
    <b-container class="conta">
            <b-row>
                <b-table  :items="consulta" :fields="fields"
                :per-page="5" :current-page="currentPage">
                    <template slot="id" slot-scope="data">
                        {{data.item.consec}}
                    </template>
                    <template slot="nmovilizado" slot-scope="data">
                        {{data.item.id}}
                    </template>
                    <template slot="fecha_creacion" slot-scope="data">
                        {{data.item.fecha_estado |formatdate}}
                    </template>
                    <template slot="productoslocal" slot-scope="data" >
                        {{data.item.productoslocal.nombre}}
                    </template> 
                    <template slot="servicioslocal" slot-scope="data">
                        {{data.item.servicioslocal.nombre}}
                    </template> 
                    <template slot="imagenes" slot-scope="data" >
                        <i class="btn btn-success fa fa-picture-o" v-show="!consulta"></i>
                    </template> 
                    <template slot="detalles" slot-scope="data">
                        <i class="btn btn-warning fa fa-info" @click="actualizar(data.item,$event.target)"></i>
                    </template> 
                </b-table>
                <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
                </b-pagination>
            </b-row>
            <b-row>
                <b-button @click="exportarxls()">
                    Exportar EXCEL
                </b-button>
            </b-row>
        <!-- the modal -->
        <b-modal id="myModal" size="lg"  ref="myModalRef" lazy>
            <b-container>
                <b-row>
                    <b-form-group id="Cliente"
                        label="Cliente:"
                        label-for="Cliente"
                        description="Cliente el cual genero la orden.">
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group id="CentroC"
                        label="Centro de Costo:"
                        label-for="CentroC"
                        description="Centro de Costo el cual tiene asociada la orden.">
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group id="numOrden"
                            label="Numero de Orden:"
                            description="Numero de la Orden.">
                        </b-form-group>
                    </b-col>
                    <b-col>
                        {{myModal.content.consec}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group id="numdetalle"
                            label="Numero del Detalle:"
                            description="Numero del detalle.">
                        </b-form-group>
                    </b-col>
                    <b-col>
                        {{myModal.content.id}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group id="producto"
                            label="Producto:"
                            description="Producto asociado al detalle.">
                        </b-form-group>
                    </b-col>
                    <b-col>
                        {{myModal.content.productoslocal}}                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group id="servicio"
                            label="Servicio:"
                            description="Servicio asociado al detalle.">
                        </b-form-group>
                    </b-col>
                    <b-col>
                        {{myModal.content.servicioslocal}}                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group id="info"
                            label="Informacion:"
                            >
                        </b-form-group>
                    </b-col>
                    <b-col>
                        {{myModal.content.detalleslocal}}                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-form-group id="info"
                            label="Trazabilidad:"
                            >
                        </b-form-group>
                </b-row>
                <b-row>
                    <b-table :items="myModal.content.tra" >
                    </b-table>
                </b-row>
                {{myModal.content}}
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import {bus} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'


export default {
    components:{
        Preload
    },
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    computed: {

    },
    methods:{
        exportarxls(){
            var consecutivo,id,estado,fechaT,producto,servicio,detalles,infor
            var variable=[], constante=[]
            var llaveslv1,llaveslv2,llaveslv3
            for(var i=0;i<this.consulta.length;i++){
                llaveslv1=Object.keys(this.consulta[i])
                for(var a=0;a<llaveslv1.length;a++){
                    if(llaveslv1[a]=='consec')
                    {
                        consecutivo=llaveslv1[a];
                    }
                    if(llaveslv1[a]=='id'){
                        id=llaveslv1[a]
                    }
                    if(llaveslv1[a]=='estado'){
                        estado=llaveslv1[a]
                    }
                    if(llaveslv1[a]=='fechaUltimoEstadoT'){
                        fechaT=llaveslv1[a]
                    }
                    if(llaveslv1[a]=='productoslocal'){
                        producto= llaveslv1[a]
                    }
                    if(llaveslv1[a]=='servicioslocal'){
                        servicio= llaveslv1[a]
                    }
                    if(llaveslv1[a]=='detalleslocal'){
                        detalles= llaveslv1[a]
                        llaveslv2= Object.keys(this.consulta[i].detalleslocal);
                        for(var b=0; b<llaveslv2.length;b++){
                            if(llaveslv2[b]=='infor'){
                                infor= llaveslv2[b]
                                llaveslv3=Object.keys(this.consulta[i].detalleslocal.infor);
                                for(var c=0;c<llaveslv3.length;c++){
                                    variable[c]=llaveslv3[c]
                                }

                            }
                        }
                    }
                }
            }
            var consult='';
                for(var d=0;d<variable.length;d++){
                    if(d==(variable.length-1))
                    {
                    consult+=detalles+ '->'+infor+'->'+variable[d]+' as '+variable[d]+' '
                    }
                    else{
                    consult+=detalles+ '->'+infor+'->'+variable[d]+' as '+variable[d]+','
                    }
                    //console.log(consult);
                 }
                var algo = 'SELECT '+
                    consecutivo+' as NumOrden, '+
                    id+' as NumMovilizado,'+
                    estado+' as Estado, '+
                    fechaT+' as Fecha, '+
                    producto+ '->nombre as Producto, '+
                     servicio+'->nombre as Servicio, '+
                    consult+
                    //detalles+ '->'+infor+'->'+variable[2]+'as '+variable[2]+' '+
                    'INTO XLS("Data.xls",{headers:true}) FROM ?'
                    console.log(algo);
                    alasql(algo,[this.consulta])
                    console.log("entro a exportar excel");
                    /*
                    alasql('SELECT consec as NumOrden,'+
                    'id as NumMovilizado,'+
                    'estado as EstadoMovilizado,'+
                    'fechaUltimoEstadoT as Fecha,'+
                    'productoslocal->nombre as Producto,'+
                    'servicioslocal->nombre as Servicio,'+
                    'detalleslocal->referencia as Referencia,'+
                    'detalleslocal->observaciones as Observaciones,'+
                    'detalleslocal->infor->peso as Detalles_Peso,'+
                    'detalleslocal->infor->variable as Detalle_X'+
                    ' INTO XLS("Data.xls",{headers:true}) FROM ?',[this.consulta]);
                    */
        },
        actualizar(value,button){
            console.log(value);
            this.myModal.content=value
            this.$root.$emit('bv::show::modal', 'myModal', button)
        },
        openModal(){
        }
    },
    props:['consulta'],
    data () {
        return {
            myModal: {content: ''},
            consultaactualizar: '',
            prueba: {},
            currentPage: 1,
        imagen: false,
        existe: true,
        fields: [ 
            { key: 'id', sortable: true , label: 'N° Orden de Servicio'},
            {key:'nmovilizado', label: 'N° Movilizado'},
            {key:'nombre_proceso', label: 'Estado'},
            {key:'fecha_creacion', label: 'Fecha Ultima Actualizacion'},
            {key:'productoslocal', label: 'Producto'},
            {key:'servicioslocal', label: 'Servicio'},
            'imagenes',
            'detalles'
               ],
        }
    },
        mounted: function() {
            console.log("antes de crearse");
            this.prueba=consulta
            console.log(this.prueba);
        }
}
</script>

<style>
.conta{
    padding: 5%
}
</style>
