<template>
    <b-container>
        <b-row>
        <b-form-select v-model="selected" :options="options" class="mb-3">
        </b-form-select>
        </b-row>
        <b-row>
              <b-btn v-b-modal.modal1>Launch demo modal</b-btn>
        </b-row>
            <b-card bg-variant="light">
                <b-form-group horizontal
                            breakpoint="lg"
                            label="Shipping Address"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            class="mb-0">
                <b-form-group horizontal
                            label="Street:"
                            label-class="text-sm-right"
                            label-for="nestedStreet">
                <b-form-input id="nestedStreet"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                            label="City:"
                            label-class="text-sm-right"
                            label-for="nestedCity">
                <b-form-input id="nestedCity"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                            label="State:"
                            label-class="text-sm-right"
                            label-for="nestedState">
                <b-form-input id="nestedState"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                            label="Country:"
                            label-class="text-sm-right"
                            label-for="nestedCountry">
                <b-form-input id="nestedCountry"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                            label="Ship via:"
                            label-class="text-sm-right"
                            class="mb-0">
                <b-form-radio-group class="pt-2" :options="['Air', 'Courier', 'Mail']" />
                </b-form-group>
            </b-form-group>
        </b-card>
        <b-row class="my-1">
            <b-form-select v-model="selected" :options="options" class="mb-3">
            </b-form-select>
        </b-row>   
        <b-row>
              <b-button class="align-self-center center-button">Generar</b-button>

        </b-row> 
        <!-- Modal Component -->
        <b-modal id="modal1" title="Bootstrap-Vue" size="lg">
            <b-container>
                <b-row>
                    <b-form-input v-model="text1"
                    type="text"
                    placeholder="Enter your name"></b-form-input>
                </b-row>
                <b-row>
                    <b-col class="my-1">
                        {{items.length}}
                    </b-col>
                    <b-col>
                        <b-form-select v-model="selected" :options="options" class="my-1">
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                   <h3>listado de No de Movilizado:</h3> 
                        <b-table striped hover :fields="fields" :items="items"
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
export default {
    data(){
        return{
            currentPage:1,
            fields: ['elimnar', 'first_name', 'last_name', 'age' ],
            items: [
                { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
            ],
            text1:'',
            selected: null,
            options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: 'c', text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ]
        }
    }
}
</script>

<style>
    .center-button {
        display: block;
        margin: auto;
    }
</style>
