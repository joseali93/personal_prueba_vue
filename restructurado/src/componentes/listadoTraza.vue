<template>
    <b-container class="conta">
        <h3>
            Listado de Detalles obtenidos:
        </h3>
            <b-row>
                <b-table  :items="consulta" :fields="fields"
                :per-page="5" :current-page="currentPage" :bordered="true">
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
                        <i class="btn btn-success fa fa-picture-o" @click="image(data.item)" v-show="data.item.trazabilidad[0].EsCierre=='true'"></i>
                    </template> 
                    <template slot="detalles" slot-scope="data">
                        <i class="btn btn-success fa fa-info" @click="actualizar(data.item)"></i>
                    </template> 
                </b-table>
                <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
                </b-pagination>
            </b-row>
            <b-row>
                <b-button @click="exportarxls()">
                    <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                    Exportar EXCEL
                </b-button>
            </b-row>
        <!-- the modal -->
        <b-modal id="myModal" size="lg"  ref="myModalRef" lazy>
            
            <b-container>
                <b-row>
                    <b-col cols="6">
                        <h1>Cliente :</h1>
                    </b-col>
                    <b-col>
                        {{cliente.nombre}}
                    </b-col>
                </b-row>
                <b-row>
                   <b-col cols="6" >
                       <h1>Centro de Costo :</h1>
                    </b-col>
                    <b-col >
                        {{centro.nombre}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Numero de Orden :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.consec}}
                    </b-col>
                </b-row>     
                <b-row>
                    <b-col cols="6" >
                       <h3>Numero de Movilizado :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.id}}
                    </b-col>           
                </b-row>       
                <b-row>
                    <b-col cols="6" >
                       <h3>Producto :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.productoslocal.nombre}}
                    </b-col>               
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Producto :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.servicioslocal.nombre}}
                    </b-col>              
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Informacion :</h3>
                    </b-col>
                </b-row>
                <b-row v-for="(data,indice) in final">

                        <b-col cols="5">
                            <label  class="col-sm-2 col-form-label col-form-label-sm">{{data.nombre}}: </label>
                        </b-col>
                        <template >
                            <b-col cols="6">
                                <b-form-input  :value="data.valores"
                                    type="text"
                                    :disabled="true">
                            </b-form-input>
                            </b-col>
                        </template>
                </b-row>
                <b-row>
                    <b-form-group id="traza"
                            label="Trazabilidad:"
                            >
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-table :items="consultaactualizar.trazabilidad" :fields="campostra">
                        <template slot="fecha" slot-scope="data">
                            {{data.item.fecha |formatdate}}
                        </template>
                        <template slot="nombre" slot-scope="data">
                            {{data.item.nombre}}
                        </template>
                        <template slot="imagen" slot-scope="data">
                                <i class="btn btn-success fa fa-picture-o" @click="imagenmodal(data.item)" v-show="data.item.imagenes.length>0">
                                </i>   
                        </template>
                    </b-table>
                </b-row>
            </b-container>
        </b-modal>
        <!-- Modal Component 1 imagen -->
        <b-modal id="modalimagen" ref="ModalImaguni" title="Evidencia Digital">
            <b-container>
                <b-img :src="modalima.trazabilidad[0].imagenes[0].url" fluid alt="Fluid image" />
            </b-container>
        </b-modal>
        <!-- Modal Component 2 imagenes -->
        <b-modal id="modalimagenes" ref="ModalImagenes" title="Evidencia Digital" lazy>
            <b-container>
                <template v-for="(data,indice) in modalima.trazabilidad[0].imagenes">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-row>
                                <b-col cols="8">
                                    <b-btn block v-b-toggle="data.id" variant="info">
                                        Evidencia {{indice+1}}
                                    </b-btn>
                                </b-col>
                                <b-col cols="4">
                                    <b-btn  active-class class="fa fa-envelope-o">
                                        
                                    </b-btn>
                                </b-col>
                            </b-row>

                        </b-card-header>
                        <b-collapse :id="data.id" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                            <p class="card-text">
                                <b-img :src="data.url" fluid alt="Fluid image" />
                            </p>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </template>
            </b-container>
        </b-modal>
        <!-- Modal Component 1 imagen modal -->
        <b-modal id="modalimagen" ref="ModalImagunidetalle" title="Evidencia Digital">
            <b-container>
                <b-img :src="imgmodal.imagenes[0].url" fluid alt="Fluid image" />
            </b-container>
        </b-modal>
        <!-- Modal Component 2 imagenes modal  -->
        <b-modal id="modalimagenes" ref="ModalImagenesdetalle" title="Evidencia Digital" lazy>
            <b-container>
                <template v-for="(data,indice) in imgmodal.imagenes">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-row>
                                <b-col cols="8">
                                    <b-btn block v-b-toggle="data.id" variant="info">
                                        Evidencia {{indice+1}}
                                    </b-btn>
                                </b-col>
                                <b-col cols="4">
                                    <b-btn  active-class class="fa fa-envelope-o">
                                        
                                    </b-btn>
                                </b-col>
                            </b-row>

                        </b-card-header>
                        <b-collapse :id="data.id" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                            <p class="card-text">
                                <b-img :src="data.url" fluid alt="Fluid image" />
                            </p>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </template>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import {bus} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'
import {urlservicios} from '../main'


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
    watch: {

    },
    methods:{
        cerrar(value){
            console.log(value);
            console.log("entro a cerrar");
            this.$refs.myModalRef.hide();
        },
        imagenmodal(data){
            console.log("entro a el modal");
            if(data.imagenes.length==1)
            {
                this.imgmodal=data
                 this.$refs.ModalImagunidetalle.show()
            }
            if(data.imagenes.length>1)
            {
                this.imgmodal=data
                this.$refs.ModalImagenesdetalle.show()
            }
        },
        image(value){
            console.log("entro a imagen");
            console.log(value);
            this.modalima=value
            if(this.modalima.trazabilidad[0].imagenes.length==0)
            {
                swal(
                    "No se tienen Imagenes",
                    "No hay imagenes disponibles",
                    "warning"
                )
            }
            if(this.modalima.trazabilidad[0].imagenes.length==1)
            {
                this.$refs.ModalImaguni.show()

            }
            if(this.modalima.trazabilidad[0].imagenes.length>1)
            {
                this.$refs.ModalImagenes.show()
            }
        },
        values(value){
            return eval("this.consultaactualizar.detalleslocal.infor."+value)
        },
        exportarxls(){
            var consecutivo,id,estado,fechaT,producto,servicio,detalles,infor,refe
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
                    if(llaveslv1[a]=='nombre_proceso'){
                        estado=llaveslv1[a]
                    }
                    if(llaveslv1[a]=='fecha_estado'){
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
                        if(llaveslv2[b]=='referencia')
                            {
                                refe=llaveslv2[b]
                            }
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
                 }
                var algo = 'SELECT '+
                    consecutivo+' as NumOrden, '+
                    id+' as NumMovilizado,'+
                    estado+' as Estado, '+
                    fechaT+' as Fecha, '+
                    producto+ '->nombre as Producto, '+
                    servicio+'->nombre as Servicio, '+
                    detalles+'->'+refe+' as Referencia, '+
                    consult+
                    //detalles+ '->'+infor+'->'+variable[2]+'as '+variable[2]+' '+
                    'INTO XLS("Data.xls",{headers:true}) FROM ?'
                    alasql(algo,[this.consulta])
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
        actualizar(value){
            this.consultaactualizar=value
            var llaves
            llaves=Object.keys(this.consultaactualizar.detalleslocal.infor)
            if(this.valores.length==0)
            {
            llaves.map((obj,ind)=>{
                if(typeof(eval('value.detalleslocal.infor.'+obj))=='object'){
                    
                }else{
                    this.valores.push(eval('value.detalleslocal.infor.'+obj))
                    this.llavesv.push(obj)
                    var objetogrande={
                        nombre:obj,
                        valores:eval('value.detalleslocal.infor.'+obj)
                    }
                    this.final.push(objetogrande)

                }
            })

            }
            //this.$refs.myModalRef.show()
            //openModal();
            this.axios.get(urlservicios+"estructuraf/" +this.consultaactualizar.productoslocal._id +
            "/" +this.consultaactualizar.servicioslocal._id)   
            .then(response => {
            this.inputs = response.data;
            })

            var client=this.cliente
            var centro=this.centro
            var personal={
                cliente:client,
                centro:centro,
                inputs:this.final
            }
            
            setTimeout(() => {
                bus.$emit('resultado', {
                    value ,personal
                })
                }, )
            this.$router.replace('/inicio/trazabilidad/resultado')
            var ocultartra=false
            setTimeout(() => {
                bus.$emit('ocultartra', {
                    ocultartra 
                })
                }, )
        },
    },

    beforeCreate: function() {
    },
    props:['consulta','centro','cliente'],
    data () {
        return {
            mostrar: false,
            imgmodal: {
                fecha:'',
                EsCierre:'',
                nombre:'',
                id_ProcesoLogistico:'',
                imagenes:[
                {
                    id: '',
                    url: ''
                }
                ]
            },
            final:[],
            valores: [],
            llavesv:[],
            campostra:[
                { key: "fecha", label: "Fecha" },
                { key: "nombre", label: "Nombre" },
                { key: "imagen", label: "Imagenes" },
                
            ],
            inputs:{},
            consultaactualizar: {
                consec:'',
                id:'',
                url:'',
                trazabilidad:[
                    {
                        imagenes:[{
                            url:'',
                            id:'',
                        }]
                    }
                    ],
                detalleslocal: {
                    referencia: '',
                    observaciones: '',
                    infor: {},
                    destinatario:{}
                },
                productoslocal: {},
                servicioslocal: {},
                fecha_estado: ''

            },
            modalima: {
                consec:'',
                id:'',
                url:'',
                trazabilidad:[
                    {
                        imagenes:[{
                            url:'',
                            id:'',
                        }]
                    }
                    ],
                detalleslocal: {
                    referencia: '',
                    observaciones: '',
                    infor: {},
                    destinatario:{}
                },
                productoslocal: {},
                servicioslocal: {},
                fecha_estado: ''

            },
            prueba: {},
            currentPage: 1,
            imagen: false,
            consu: {},
            existe: true,
            fields: [ 
                { key: 'id', sortable: true , label: 'N° Orden de Servicio'},
                {key:'nmovilizado',  label: 'N° Movilizado'},
                {key:'nombre_proceso', label: 'Estado'},
                {key:'fecha_creacion', label: 'Fecha Ultima Actualizacion'},
                {key:'productoslocal', label: 'Producto'},
                {key:'servicioslocal', label: 'Servicio'},
                {key:'imagenes', label: 'Prueba de Entrega'},
                'detalles'
            ],
        }
    },


}
</script>

<style>
.conta{
    padding: 5%
}

</style>
