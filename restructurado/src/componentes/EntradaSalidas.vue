<template>
    <b-container fluid class="contenedorTotal">
      <div>
        <b-breadcrumb :items="itemsbr" />
      </div>
      <b-container fluid>
        
      <b-card class="cards">
        <b-row class="my-1 ">
            <b-col class="float-right">
                <b-btn class="float-right rounded"  variant="success" @click="MostrarModal()" >
                    <i class="fa fa-plus-square-o" aria-hidden="true"></i> Adicionar Movilizados
                </b-btn>
            </b-col>
        </b-row>
        <b-row>
            <h3 class="text-primary">Seleccione el Proceso Logistico</h3>
            <b-form-select v-model="selected"  text-field="nombre" value-field="_id" 
            :options="procesosLog" class="mb-3" @input="procesoseleccionado">
            </b-form-select>
        </b-row>
        <b-row class="my-1"> 
        <template v-for="(data,indice) in inputs.campos">
            <template v-if="data.type=='text'">   
                    <label class=" text-primary">Ingrese {{ data.placeholder }}:</label>   
                    <b-form-input 
                    :id="data.id"
                    :type="data.type"
                    :placeholder="data.placeholder"
                    @input="digitar(data)"
                    :state="data.estado"></b-form-input>
    
            </template>
            <template v-if="data.type=='number'">
                    <label class=" text-primary">Ingrese {{ data.placeholder }}:</label>
                    <b-form-input 
                    :id="data.id"
                    :type="data.type"
                    :placeholder="data.placeholder"
                    @input="digitar(data)"
                    :state="data.estado">
                    </b-form-input>
            </template>
            <template v-if="data.type=='select'">
                <h3 class=" text-primary">Seleccione el {{data.placeholder}}</h3>
                
                 <b-form-select :id="data.id"  :value="valores(indice,data)"  text-field="nombre" value-field="_id" 
                 :options="opciones[indice]" @change="seleccionado(data)" class="mb-3"
                 :state="data.estado">
                </b-form-select>
            </template>
        </template>
        </b-row>
        <b-row v-show="proceSeleccionado.atencion_courier==true">
            <b-form-select v-model="curier" text-field="nombre" value-field="_id" :options="curiers2" class="mb-3" 
            :state="Scurier">
            </b-form-select>
        </b-row>
        <b-row class="my-1 text-primary">
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
            <b-btn variant="success" @click="generarManifiesto" :disabled="manifiesto">
                Generar
            </b-btn>
        </b-row>
      </b-card>
      </b-container>
        
        

        <router-view></router-view>
        <!-- Modal Component -->
        <b-modal id="modal1" ref="myModalRef" title="Movilizados" class="text-primary" size="lg" :no-close-on-esc="true">
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
               
                <b-row class="my-1 text-primary">
                    <b-col class="my-3 ">
                      <h3 ></h3>
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
                        <h3 class="text-primary">Listado de Movilizados:</h3> 
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
import { urlservicios } from "../main";
import Preload from "../componentes/preload.vue";

export default {
  data() {
    return {
      manifiesto:false,
      itemsbr: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Entradas y Salidas",
          to: "/inicio/entradasalida",
          active: true
        },

      ],
      errores:[],
      bandera: 0,
      value: [],
      id_centrologistico: null,
      validacionModal: "",
      Scurier: null,
      processSelected: "",
      concepto: null,
      listadoconcepto: [],
      opciones: [],
      curier: null,
      centrologistico: {},
      curiers: {},
      curiers2: {},
      objeto: "",
      pre: "",
      procesosLog: {},
      inputs: "",
      currentPage: 1,
      fields: [
        "elimnar",
        "nombre",
        { key: "nmovilizado", label: "N Movilizado" },
        { key: "unidades", label: "Unidades" },
        { key: "concepto", label: "Concepto" }
      ],
      items: [
        {
          nmovilizado: "",
          nombre: ""
        }
      ],
      itemsmovilizados: [],
      text1: "",
      selected: null,
      proceSeleccionado: "",
      selected2: null,
      mensaje: ""
    };
  },
  methods: {
    metodo(errores){
      console.log("llamo funcion externa");
      console.log(errores);
      console.log(this.itemsmovilizados);
      for(var o=0;o< this.itemsmovilizados.length;o++){
        for(var x=0;x<errores.length;x++){
          if(errores[x].id==this.itemsmovilizados[o].id){
            console.log("elimino");
            this.itemsmovilizados.splice(o,1)
          }
        }
      }
    },
    valores(valores, inputs) {
      //console.log("entro a valores");
      //console.log(valores);
      var guardadoManifiesto = localStorage.getItem("Manifiesto");
      var infoguardadoManifiesto = JSON.parse(guardadoManifiesto);
      //this.objeto=infoguardadoManifiesto.inputs
      if (infoguardadoManifiesto == null || infoguardadoManifiesto == "null") {
        return null;
      } else {
        //console.log(infoguardadoManifiesto.inputs);
        var llaves = Object.keys(infoguardadoManifiesto.inputs);
        if (this.bandera == 0 || this.bandera == 1) {
          this.bandera = this.bandera + 1;
          eval(
            "this.objeto." +
              llaves[valores] +
              "=" +
              "infoguardadoManifiesto.inputs." +
              llaves[valores]
          );
          return eval("this.objeto." + llaves[valores]);
        } else {
          return eval("this.objeto." + llaves[valores]);
        }
      }
    },
    MostrarModal() {
      var bandera;
      console.log("entro a mostar modal");
      if (this.objeto == undefined || this.objeto == "") {
        if (this.inputs == "") {
          console.log("no tiene items");
          console.log(this.curier);
          if (this.curier == "null" || this.curier == null) {
            console.log("hay curier vacio");
            swal("Debe completarse", "Seleccione los campos previos", "error", {
              allowEnterKey: true
            });
          } else {
            console.log("curier tiene valores");
            this.$refs.myModalRef.show();
          }
        } else {
          swal("Debe completarse", "Seleccione los campos previos", "error", {
            allowEnterKey: true
          });
        }
      } else {
        var llaves = Object.keys(this.objeto);

        for (var x = 0; x < llaves.length; x++) {
          if (
            eval("this.objeto." + llaves[x]) == "null" ||
            eval("this.objeto." + llaves[x]) == null
          ) {
            console.log("andavacio");
            bandera = true;
          }
        }
        if (bandera == true) {
          console.log("no muesto 2");
          swal(
            "Debe completarse",
            "Algun Campo esta pendiente de Seleccionar",
            "error",
            {
              allowEnterKey: true
            }
          );
        } else {
          this.$refs.myModalRef.show();
        }
      }
    },
    mostrar() {
      var unidades = 0;
      if (this.itemsmovilizados.length <= 0) {
        return 0;
      } else {
        //console.log(this.itemsmovilizados);
        for (var x = 0; x < this.itemsmovilizados.length; x++) {
          if (
            this.itemsmovilizados[x].unidades == 0 ||
            this.itemsmovilizados[x].unidades == "0" ||
            this.itemsmovilizados[x].unidades == null ||
            this.itemsmovilizados[x].unidades == "null"
          ) {
            unidades = unidades + 1;
          } else {
            unidades = unidades + parseInt(this.itemsmovilizados[x].unidades);
          }
        }
        return unidades;
      }
    },
    borrar(value) {
      console.log("entro a borrar");
      console.log(value);
      this.itemsmovilizados.splice(value.index, 1);
    },
    generarManifiesto() {
                  console.log("entro a generar");
            this.Scurier=null
            console.log(this.objeto);
            console.log(this.curier);
            console.log(this.curiers2);
            var objvario=[
              {},
              {}
            ]
            if(this.objeto==undefined){
                console.log("no hago nada");
                this.objeto=[]
                for(var j=0;j<this.curiers2.length;j++){
                  console.log(this.curiers2[j]._id);
                  if(this.curier==this.curiers2[j]._id){
                    objvario[0]=[null]
                    objvario[1]=this.curiers2[j]
                  }
                }
              console.log(objvario);
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
                    //console.log("no hacemos peticion");
                }
                else
                {
                    //console.log("hacemos peticion");
                    //console.log(this.itemsmovilizados);
                }
            }
            
            var inforinputs=[]    
            //console.log(this.objeto);
            if(this.objeto==undefined){
                //console.log("no me llegan inputs variables");
                this.objeto=[]
            }else{
                for(var x=0;x<this.opciones.length;x++){
                var llaves=Object.keys(this.objeto)
                for(var y=0;y<this.opciones[x].length;y++)
                {
                    if(this.opciones[x][y]._id==eval('this.objeto.'+llaves[x]))
                    {
                        //console.log("obtengo la info");
                        inforinputs[x]=this.opciones[x][y]
                    }
                }
                }
            }
           console.log("inforinputs");
           var inforvaria
           if(inforinputs.length==0){
            inforvaria=objvario
           }else{
             inforvaria=inforinputs
           }
                            console.log(inforvaria);
            
            var itemsmodal=this.itemsmovilizados
            var varios=[]
            var listMovilizados={
            }
            for(var x=0;x<this.itemsmovilizados.length;x++){
                //console.log(x);
                if(this.itemsmovilizados[x].concepto._id==null||
                this.itemsmovilizados[x].concepto._id==undefined)
                {
                    //console.log(this.itemsmovilizados[x].id)
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
            
            if(this.proceSeleccionado.atencion_courier==true){
               
                if(this.curier!="null"&&this.curier!=''&&this.curier!=null)
                {
                   this.Scurier=null
                }
                else{
                    swal("Debe completarse", 
                        "Seleccione un curier",
                        "error",{
                              allowEnterKey: true,
                        });
                    this.Scurier=false
                }
            var envio ={
                listadoMovilizados:varios,
                infoManifiesto:this.objeto,
                id_procesoLogistico:this.processSelected._id,
                id_courier:this.curier
            }
            }
            else{
                var envio ={
                listadoMovilizados:varios,
                infoManifiesto:this.objeto,
                id_procesoLogistico:this.processSelected._id
            }
            }
            //console.log(this.processSelected.modal)
            console.log(envio);
            var validacion
            this.axios
            .post(urlservicios+"GenerarManifiestoWeb", envio)
            .then(response => {
                console.log(response);
                if(response.data.validacion==true){
                  this.manifiesto=true
                  console.log("se creo correctamente");
                   localStorage.removeItem('Manifiesto');
                    console.log("mostramos modal");
                    console.log(itemsmodal);
                    console.log(inforvaria);
                    setTimeout(() => {
                        bus.$emit('modalinfo', {
                            itemsmodal,inforvaria
                        })
                        }, )
            
                    this.$router.push(this.processSelected.modal)
                }
                if(response.data.validacion==false){
                  this.manifiesto=false
                  console.log("no se creoo");
                  console.log(response.data.listaMovilizadoConManifiesto);
                  var Movilizados=response.data.listaMovilizadoConManifiesto
                  this.errores=response.data.listaMovilizadoConManifiesto
                  var n_movilizados=''
                  for(var o=0;o<Movilizados.length;o++){
                    console.log(Movilizados[o].id)
                    if(o==Movilizados.length-1){
                      n_movilizados=n_movilizados+ Movilizados[o].id
                    }
                    else{
                    n_movilizados=n_movilizados+ Movilizados[o].id+', '

                    }

                  }
                  this.errores=Movilizados
                  console.log(n_movilizados);
                  console.log(this.errores);
                  //this.$refs.myModalRef2.show()
                  var titulo1_inicio='<div class="prueba"><ul>'
                  var conten_1=''
                  var conten_2=''
                  var titulo1_fin='</ul></div><br><h3><strong>Desea Retirarlos del Manifiesto?</strong></h3>'
                  var prueba
                  var total
                   for(var y=0;y<this.errores.length;y++){
                  conten_1=conten_1+'<li>'+this.errores[y].id+' - '+this.errores[y].NombreProceso+'</li>'
                  conten_2=conten_2+'<li>'+this.errores[y].NombreProceso+'</li>'
                  
                  
                }
              total=titulo1_inicio+conten_1+titulo1_fin
                    console.log(total);
                                    swal({
                title: 'El manifiesto no se puede generar por que los movilizados ya se encuentran procesados',
                type: 'info',
                html: total,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                  'Si',
                confirmButtonAriaLabel: '',
                cancelButtonText:
                'No',
                cancelButtonAriaLabel: '',
              }).then((result)=> {
                if(result.value){
                this.metodo(this.errores); // this should execute now

                }

              })
                  /*
                  swal("Movilizados con Manifiesto Creado", 
                        ""+n_movilizados,
                        "error",{
                              allowEnterKey: true,
                        });
                        */
                }
                /*
                this.validacionModal=response.validacionModal
                if(this.validacionModal=true)
                {
                    localStorage.removeItem('Manifiesto');
                    console.log("mostramos modal");
                    console.log(itemsmodal);
                    console.log(inforvaria);
                    setTimeout(() => {
                        bus.$emit('modalinfo', {
                            itemsmodal,inforvaria
                        })
                        }, )
            
                    this.$router.push(this.processSelected.modal)
                }
                else
                {
                    console.log("no mostramos modal");
                    swal("Debe completarse", 
                        "No se puede Generar el Manifiesto en este momento",
                        "error",{
                              allowEnterKey: true,
                        });
                }
                */
            })
            
    },
    digitar(value) {
      setTimeout(
        function() {
          console.log("entro a digitar");
          var x = document.getElementById(value.id).value;
          if (x == "" || x == null || x == "") {
            eval("this.objeto." + value.vmodel + "=" + value.min);
            document.getElementById(value.id).value = value.min;
          } else {
            if (x > value.max) {
              document.getElementById(value.id).value = value.min;
              eval("this.objeto." + value.vmodel + "=" + value.min);
            } else {
              eval("this.objeto." + value.vmodel + "=" + "x");
            }
          }
        }.bind(this)
      );
      console.log(this.objeto);
    },
    seleccionado(value) {
      console.log("entro a seleccionado");

      var x = document.getElementById(value.id).value;
      console.log(x);
      eval("this.objeto." + value.vmodel + "=" + "x");
      console.log(this.objeto);
    },
    adicionar(value) {
      console.log(this.objeto);
      var agregar = true;
      var infoconcepto;
      var algo;

      if (this.concepto == null) {
        console.log("hay concepto nulo");
        infoconcepto = {};
      } else {
        for (var x = 0; x < this.listadoconcepto.length; x++) {
          if (this.listadoconcepto[x]._id == this.concepto) {
            infoconcepto = this.listadoconcepto[x];
          }
        }
      }
      if (value == null || value == "") {
        console.log("va vacio");

        swal({
          title: "Error!",
          text: "Ingrese un valor por favor",
          type: "error",
          focusConfirm: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: true,
          timer: 3000
        });
      } else {
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        console.log(
          urlservicios +
            "MovilizadoProcesosLogistico/" +
            value +
            "/" +
            this.selected
        );
        this.axios
          .get(
            urlservicios +
              "MovilizadoProcesosLogistico/" +
              value +
              "/" +
              this.selected
          )
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            console.log(response);
            this.mensaje = response.data;
            if (this.mensaje.message) {
              swal({
                title: "Error!",
                text: "" + this.mensaje.message,
                type: "error",
                focusConfirm: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: true,
                timer: 3000
              });
            }
            if (this.mensaje.estado == true) {
              if (this.itemsmovilizados.length == 0) {
                swal({
                  position: "center",
                  type: "success",
                  title: "Agregado correctamente",
                  showConfirmButton: false,
                  timer: 1000
                });
                console.log(this.mensaje);
                this.text1 = "";
                this.mensaje.concepto = infoconcepto;
                this.itemsmovilizados.push(this.mensaje);
                console.log(this.itemsmovilizados);
                console.log(this.objeto);
                console.log(this.curier);
                var guardado = {
                  itemsmovilizados: this.itemsmovilizados,
                  inputs: this.objeto,
                  curier: this.curier,
                  ProSeleccionado: this.selected
                };
                localStorage.setItem("Manifiesto", JSON.stringify(guardado));
              } else {
                for (var x = 0; x < this.itemsmovilizados.length; x++) {
                  if (this.itemsmovilizados[x].id == this.mensaje.id) {
                    agregar = false;
                  }
                }
                if (agregar == false) {
                  swal({
                    position: "center",
                    type: "error",
                    title: "Ya se encuentra en el Listado",
                    showConfirmButton: false,
                    timer: 1000
                  });
                } else {
                  swal({
                    position: "center",
                    type: "success",
                    title: "Agregado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  this.mensaje.concepto = infoconcepto;
                  this.itemsmovilizados.push(this.mensaje);
                  this.text1 = "";
                  console.log(this.itemsmovilizados);
                  console.log(this.objeto);
                  console.log(this.curier);
                  var guardado = {
                    itemsmovilizados: this.itemsmovilizados,
                    inputs: this.objeto,
                    curier: this.curier,
                    ProSeleccionado: this.selected
                  };
                  localStorage.setItem("Manifiesto", JSON.stringify(guardado));
                }
              }
            }
            if (this.mensaje.estado == false) {
              if(this.mensaje.message=="esta en ruta"){
                console.log("tengo mensaje en ruta");
                swal({
                title: "Error!",
                text:
                  "El N° Movilizado " +
                  this.mensaje.id +
                  " se encuentra en ruta",
                type: "error",
                focusConfirm: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: true,
                timer: 4000
              });
              }else{
                swal({
                title: "Error!",
                text:
                  "El N° Movilizado " +
                  this.mensaje.id +
                  " se encuentra en el siguiente proceso " +
                  this.mensaje.proceso,
                type: "error",
                focusConfirm: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: true,
                timer: 4000
              });
              }
              
            }
          });
      }
    },
    procesoseleccionado(value) {
      var guardadoManifiesto = localStorage.getItem("Manifiesto");
      var infoguardadoManifiesto = JSON.parse(guardadoManifiesto);

      console.log("cambio");
      this.manifiesto=false
      if (infoguardadoManifiesto == null || infoguardadoManifiesto == "null") {
        console.log("no hay items paa cargar");
        var nvacio = { _id: null, nombre: "Por Favor Seleccione un Concepto" };
        this.selected = value;
        this.itemsmovilizados = [];
        this.listadoconcepto = [];
        // console.log(this.procesosLog);
        if (this.selected == null) {
        } else {
          for (var x = 0; x < this.procesosLog.length; x++) {
            if (this.procesosLog[x]._id == this.selected) {
              this.processSelected = this.procesosLog[x];
              if (
                this.procesosLog[x].conceptos == null ||
                this.procesosLog[x].conceptos == undefined
              ) {
                //console.log(this.procesosLog[x].conceptos);
                this.listadoconcepto.unshift(nvacio);
              } else {
                this.listadoconcepto = this.procesosLog[x].conceptos;
                this.listadoconcepto.unshift(nvacio);
              }
            }
          }
        }
      } else {
        console.log("hay itempara cargar");
        this.itemsmovilizados = infoguardadoManifiesto.itemsmovilizados;
        var nvacio = { _id: null, nombre: "Por Favor Seleccione un Concepto" };
        this.selected = value;
        this.listadoconcepto = [];
        // console.log(this.procesosLog);
        if (this.selected == null) {
        } else {
          for (var x = 0; x < this.procesosLog.length; x++) {
            if (this.procesosLog[x]._id == this.selected) {
              this.processSelected = this.procesosLog[x];
              if (
                this.procesosLog[x].conceptos == null ||
                this.procesosLog[x].conceptos == undefined
              ) {
                //console.log(this.procesosLog[x].conceptos);
                this.listadoconcepto.unshift(nvacio);
              } else {
                this.listadoconcepto = this.procesosLog[x].conceptos;
                this.listadoconcepto.unshift(nvacio);
              }
            }
          }
        }
      }

      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);
      //console.log(infologin.id_OperadorLogistico);
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
      this.axios
        .get(
          urlservicios +
            "CamposProcesoLogisticosOperadores/" +
            infologin.id_OperadorLogistico._id +
            "/" +
            this.selected
        )
        .then(response => {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          this.inputs = response.data;
          this.objeto = this.inputs.objeto;
          console.log(this.inputs);
          //console.log(this.objeto);
          if (this.objeto == undefined || this.objeto == "undefined") {
          } else {
            //console.log("hago peticiones");
            var llaves = Object.keys(this.objeto);
            //llaves.forEach(ele=>{
            var errore
            this.inputs.campos.forEach((element, indice) => {
              if (element.urlobjeto == undefined) {
                console.log("no se hace peticion de url");
              } else {
                setTimeout(function(){
                  this.axios
                    .get(element.urlobjeto + infologin.id_OperadorLogistico._id)
                    .then(resp1 => {
                      //this.value[indice]=null
                      var vacio = {
                        _id: "null",
                        nombre: "Por Favor Seleccione un Campo"
                      };
                      var respuesta = resp1.data;
                      respuesta.unshift(vacio);
                      this.opciones.push(respuesta);
                      console.log(this.opciones);
                    })
                    .catch(e => {
                      console.log(e);
                      /*
                      swal({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Se presento un error, intente nuevamente',
                      footer: 'Intente nuevamente',

                      })
                      */
                     swal({
                      type: 'warning',
                      title: 'Oops',
                      text: 'Se presento un problema en el servicio',
                      footer: 'Intente nuevamente',
                    })
                    })
                }.bind(this),10)

                
                  

              }
            });
            //});
          }
        });
      
      for (var x = 0; x < this.procesosLog.length; x++) {
        if (this.procesosLog[x]._id == this.selected) {
          this.proceSeleccionado = this.procesosLog[x];
          if (this.proceSeleccionado.atencion_courier == true) {
            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            this.axios
              .get(
                urlservicios +
                  "UsuariosCurier/" +
                  infologin.id_OperadorLogistico._id
              )
              .then(response => {
                this.curiers2 = response.data;
                var vacio = {
                  _id: "null",
                  nombre: "Por Favor Seleccione un Curier"
                };
                this.curiers2.unshift(vacio);
              });
          }
        }
      }
      
    }
  },
  beforeCreate: function() {
    var bandera = true;
    var _this = this;
    var vacio = {
      _id: null,
      nombre: "Por Favor Seleccione un Proceso logistico"
    };
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    var guardadoManifiesto = localStorage.getItem("Manifiesto");
    var infoguardadoManifiesto = JSON.parse(guardadoManifiesto);
    console.log(infoguardadoManifiesto);

    if (infoguardadoManifiesto == null || infoguardadoManifiesto == "null") {
      console.log("no hay previo");
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
      this.axios
        .get(urlservicios + "Procesos/" + infologin.id_OperadorLogistico._id)
        .then(response => {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          this.procesosLog = response.data;
          this.procesosLog.unshift(vacio);
          console.log(this.procesosLog);
        })
        .catch(function(error) {
          bandera = false;
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          //onsole.log(JSON.stringify(error));
          //this.$router.replace('/inicio')
          if (bandera == false) {
            swal({
              title: "No hay Internet",
              text: "Revise su conexion",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok, Entiendo"
            }).then(result => {
              if (result.value) {
                swal(
                  "Se Redireccionara a la pagina de inicio",
                  "Buen Rato",
                  "warning"
                );
                _this.$router.replace("/inicio");
              }
            });
          }
        });
    } else {
      swal({
        title: "Hay un Manifiesto Pendiente?",
        text: "Quiere continuar",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Continuar"
      }).then(result => {
        if (result.value) {
          this.selected = infoguardadoManifiesto.ProSeleccionado;
          this.itemsmovilizados = infoguardadoManifiesto.itemsmovilizados;
          swal("Actualizado!", "Puede continuar con el proceso.", "success");
        } else {
          localStorage.removeItem("Manifiesto");
        }
      });
    }
  }
};
</script>

<style>
.center-button {
  display: block;
  margin: auto;
}
.prueba ul li{
  list-style-type: none;
}
</style>
