<template>
    <b-container>
        
        <b-table striped hover :items="items" :fields="fields">
            <template slot="imagenes" scope="data">
                <b-btn v-b-toggle.collapseA.collapseB>
                <i class="btn btn-success fa fa-picture-o" >
                    
                </i>
                </b-btn>
            </template> 
            <template slot="detalles" scope="data">
                <i class="btn btn-warning fa fa-info"  v-b-modal.myModal></i>
            </template> 
        </b-table>
        <!-- the modal -->
        <b-modal id="myModal">
            <b-container>
                <p v-if="existe">no tiene imagenes</p>
                <b-card title="Card Title"
                        img-src="https://lorempixel.com/600/300/food/5/"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2" 
                        v-else>
                    <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
            </b-container>
        </b-modal>
        <!-- elements to collapse -->
        <b-collapse id="collapseA" class="mt-2" style="text-align: center">
           <b-card title="Card Title"
          img-src="https://lorempixel.com/600/300/food/5/"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
        </b-collapse>
        <b-collapse id="collapseB" class="mt-2">
            <b-card>
            I am collapsable content B!
            </b-card>
        </b-collapse>
    </b-container>
</template>

<script>
export default {
    data () {
        return {
        existe: true,
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [ 'first_name', 'last_name', 'age', 'imagenes', 'detalles' ],
        items: [
            { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
            { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
            { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
            { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
        }
    }
}
</script>

<style>

</style>
