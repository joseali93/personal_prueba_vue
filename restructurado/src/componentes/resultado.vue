<template>
    <b-container class="cards">
        <h3>
            Listado de Ordenes de Servicio:
        </h3>
        <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="consulta" :bordered="true"> 
            <template slot="index" slot-scope="data">
                {{data.index + 1}}
            </template>
            <template slot="estado" slot-scope="data">
                {{data.item.estado}}
            </template>
            <template slot="Cancelar" slot-scope="data">
                <b-button variant="danger" class="fa fa-ban" @click="cancelarOrden(data)" 
                v-show="data.item.estado!='orden de servicio cancelada'"></b-button>
                
            </template> 
            <template slot="fecha_creacion" slot-scope="data">
                {{data.item.fecha_creacion | formatdate}}
            </template>
            <template slot="actualizar" slot-scope="data">

                <b-button variant="success" class="fa fa-pencil-square-o"  @click="actualizar(data)"></b-button>

                <!--<router-link  to="/inicio/consultar"  tag="button" class-active="active" class="btn btn-warning fa fa-cogs"></router-link>
                -->
            </template>                       
        </b-table>
        <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
        </b-pagination>
    </b-container>
</template>

<script>
import {bus} from '../main'
import {urlservicios} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'

export default {
    components :{
    Preload
  },
    props:['consulta','peticion'],
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    data(){
        return{
            cantidades:0,
            algo:'',
            currentPage: 1,
            fields: [
                'Cancelar',
                { key: 'id', label:'N. Orden de Servicio', sortable: true },
                { key: 'fecha_creacion',label:'Fecha Creación Orden', sortable: false },
                'estado',
                'actualizar',
                
            ],
        }
    },
    methods: {
        
        cancelarOrden(value){
            console.log(value);
            var login = localStorage.getItem("storedData");
            var infologin =JSON.parse(login);
            console.log(infologin.id_cliente);  
            console.log(this.consulta);
            if(infologin.id_cliente==undefined||
            infologin.id_cliente==null){
                swal({
                title: 'Esta seguro que desea Cancelar la orden de servicio? ',
                text: "Luego no se podrá revertir el estado de la orden",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Salir',
                confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        console.log("elimino");
                        this.consulta.map((obj,ind)=>{
                    if(obj.id==value.item.id)
                        {
                            if(obj.estado=="Orden De Servicio Creada"||obj.estado=="Orden De Servicio Asignada")
                            {
                                this.axios.get(urlservicios+"CancelarOrden/"+value.item._id)
                                    .then((response) => {
                                        console.log(response.data);
                                        if(response.data.message=="orden de servicio actualizada")
                                        {
                                            swal("Orden de servicio Cancelada!",'', "success");

                                        }
                                    })
                                this.consulta.splice(ind,1)
                            }
                            else
                            {
                                swal(
                                    "No se puede Eliminar",
                                    "Por que el estado actual de la Orden no lo permite",
                                    "error"
                                );
                            }
                        }
                        })
                    }
                    else{
                        console.log("no elimino");
                    }
                    })
            }
            else{
                console.log("hay cliente");
                swal({
                title: 'Esta seguro ?',
                text: "Luego no se podra revertir el estado de la orden!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Cancelar',
                confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        console.log("elimino");
                        this.consulta.map((obj,ind)=>{
                    if(obj.id==value.item.id)
                        {
                            if(obj.estado=="Orden De Servicio Creada")
                            {
                                this.axios.get(urlservicios+"CancelarOrden/"+value.item._id)
                                    .then((response) => {
                                        console.log(response.data);
                                        if(response.data.message=="orden de servicio actualizada")
                                        {
                                            swal("Orden Eliminada!", "Orden de Servicio Cancelada!", "success");

                                        }
                                    })
                                this.consulta.splice(ind,1)
                            }
                            else
                            {
                                swal(
                                    "No se puede Eliminar",
                                    "Por que el estado actual de la Orden no lo permite",
                                    "error"
                                );
                            }
                        }
                        })
                    }
                    else{
                        console.log("no elimino");
                    }
                    })
            }
            
 
        },
        actualizar(inde){
            var ocultar=false
            var inputstotales=[]
             for(var a=0;a<inde.item.detalle.length;a++)
            {
                var produc= inde.item.detalle[a].productoslocal._id
                var serv = inde.item.detalle[a].servicioslocal._id
                this.axios.get(urlservicios+"estructuraf/" +produc +
                "/" +serv).then(response => {

                        inputstotales.push(response.data)
                })
            }   
            bus.$emit('items',inde,inputstotales)
            setTimeout(() => {
                bus.$emit('thisEvent', {
                    inde, inputstotales, 
                })
                }, )
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load 
                    })
                    }, )
            bus.$emit('ocul',ocultar)
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar 
                })
                }, )
                var load=false
            setTimeout(() => {
                bus.$emit('load', {
                    load
                })
                }, )
            this.$router.replace('/inicio/consultar/detalles')
        },
         mounted: function () {  
             bus.$on('ocultar', function (userObject) {
        
            this.algo = userObject
            console.log(this.algo);
        }.bind(this))
        
        },
    }
    
}
</script>

<style>
.cards{
    margin-top: 2%;
    border-top-width: 3px;
    border-color: gray
}
</style>
