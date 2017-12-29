<template>
    <b-container>
        {{consulta}}
            <b-row>
                <b-table striped hover :items="consulta" :fields="fields">
                    
                    <template slot="nmovilizado" slot-scope="data">
                        {{data.item.detalle[0].id}}
                    </template> 
                    <template slot="productoslocal" slot-scope="data" >
                        {{data.item.detalle[0].productoslocal.nombre}}
                    </template> 
                    <template slot="servicioslocal" slot-scope="data">
                        {{data.item.detalle[0].servicioslocal.nombre}}
                    </template> 
                    <template slot="imagenes" slot-scope="data" >
                        <i class="btn btn-success fa fa-picture-o" v-show="imagen===true">
                            
                        </i>
                    </template> 
                    <template slot="detalles" slot-scope="data">
                        <i class="btn btn-warning fa fa-info"  v-b-modal.myModal></i>
                    </template> 
                </b-table>
            </b-row>
            <b-row>
                <b-button @click="exportarxls()">
                    Exportar XLS
                </b-button>
            </b-row>
        <!-- the modal -->
        <b-modal id="myModal" size="lg">
            <b-container>
                <b-row>
                <b-card title="Card Title"
                        img-src="https://lorempixel.com/600/300/food/5/"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2" 
                        >
                    <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
                                <b-card title="Card Title"
                        img-src="https://lorempixel.com/600/300/food/5/"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2" 
                        >
                    <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
                </b-row>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import {bus} from '../main'
export default {
    methods:{
        exportarxls(){
            console.log("entro a exportar excel");
             alasql('SELECT * INTO XLS("Data.xls",{headers:true}) FROM ?',[this.consulta]);
        }
    },
    props:['consulta'],
    data () {
        return {
        imagen: false,
        existe: true,
        fields: [ 
            { key: 'id', sortable: true , label: 'N° Orden de Servicio'},
            {key:'nmovilizado', label: 'N° Movilizado'},
            {key:'estado', label: 'Estado'},
            {key:'fecha_creacion', label: 'Fecha Ultima Actualizacion'},
            {key:'productoslocal', label: 'Producto'},
            {key:'servicioslocal', label: 'Servicio'},
            'imagenes',
            'detalles'
               ],
        }
    }
}
</script>

<style>

</style>
