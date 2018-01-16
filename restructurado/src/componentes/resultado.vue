<template>
    <b-container class="cards">
        {{algo}}
        <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="consulta" :bordered="true"> 
            <template slot="index" scope="data">
                {{data.index + 1}}
            </template>
            <template slot="estado" scope="data">
                {{data.item.estado}}
            </template>
            <template slot="Cancelar" scope="data">
                <b-button variant="danger" class="fa fa-ban" @click="cancelarOrden(data)"></b-button>
                
            </template> 
            <template slot="fecha_creacion" scope="data">
                {{data.item.fecha_creacion | formatdate}}
            </template>
            <template slot="actualizar" scope="data">

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

export default {
    props:['consulta'],
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    data(){
        return{
            algo:'',
            currentPage: 1,
            fields: [
                'index',
                'Cancelar',
                { key: 'id', sortable: true },
                { key: 'fecha_creacion',label:'Fecha Creacion Orden', sortable: false },
                'estado',
                'actualizar',
                
            ],
        }
    },
    methods: {
        cancelarOrden(value){
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
                                        swal(
                                            "Eliminado Correctamente",
                                            "Se elimino correctamente",
                                            "success"
                                        )
                                    }
                                })
                            this.consulta.splice(ind,1)
                        }
                        else
                        {
                            swal(
                                "No se puede Eliminar",
                                "Por que los siguientes estados no lo permiten",
                                "error"
                            );
                        }
                    }
                })
                    
               
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
            bus.$emit('ocul',ocultar)
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar 
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
