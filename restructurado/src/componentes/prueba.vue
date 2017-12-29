<template>
    <b-container>
        <!--
        <b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="selected" :options="titulos">
        </b-form-checkbox-group>
        -->
        {{selected}}
    </b-container>
</template>

<script>
export default {
data(){
    return{
        selected: '',
        titulos: '',
        json_data : [
            {
                name      : "Tony Peña",
                city      : "New York",
                country  : "United States",
                birthdate : "1978-03-15",
                amount    : 42,
                detalles: {
                    nombre: 'pepe',
                    servicio: {
                        id: '123123',
                        nombreser: 'alslasa'
                    }

                }
            },
            {
                name      : "Tony Peña",
                city      : "New York",
                country  : "United States",
                birthdate : "1978-03-15",
                amount    : 42,
                detalles: {
                    nombre: 'pepe',
                    servicio: {
                        id: '123123',
                        nombreser: 'alslasa'
                    }

                }
            }
        ],

    }
},
mounted: function(){
    /*
    console.log("antes");
    this.axios.get("http://192.168.1.85:3000/logistica/estados/")
        .then((response) => {
            this.estados=response.data
        })
        */
      for (var key in this.json_data) {
        console.log(key);
        console.log(Object.keys(this.json_data[key]));
        this.titulos=Object.keys(this.json_data[key])
        for (var property in this.json_data[key]) {
            if (typeof(this.json_data[key][property]) === 'object') {
                console.info(Object.keys(this.json_data[key][property]));
                for(var lvl3 in this.json_data[key][property]){
                    if (typeof(this.json_data[key][property][lvl3]) === 'object') {
                        console.info(Object.keys(this.json_data[key][property][lvl3]));  
                    }                  
                }
            }
        }
      }
  }

}
</script>

<style>

</style>
