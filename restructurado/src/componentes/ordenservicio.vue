<template>
<!-- EN ESTE SE PERMITE LA GENERACION DE LOS DETALLES ASOCIADOS A UN CLIENTE Y CENTOR DE COSTO -->
    <b-container fluid class="contenedorTotal">
         <div class="breadPersonalizado">
         <b-breadcrumb :items="items" />
        </div>
       <b-container fluid class="contenedorInterno">

        <b-card class="cards">
          <b-row>
                <b-col md="10" offset-md="8">
                    <b-btn class="rounded" variant="secondary " 
                     to="/inicio/orden" 
                     v-b-tooltip.hover title="Anterior"
                     ><i class="fa fa-arrow-left"></i>
                     Anterior</b-btn>
                    <b-btn  class="rounded" variant="success"
                         @click="envioServicio"
                        v-b-tooltip.hover title="Finalizar"><i class="fa fa-check"></i>
                        Finalizar
                    </b-btn>
                    <b-btn class="rounded"  variant="danger"  
                    v-b-tooltip.hover title="Adicionar"
                    @click="abirmodal()"><i class="fa fa-plus"></i>
                    Adicionar

                    </b-btn>
                </b-col>        
            </b-row>
            <br>
            <b-row>
                <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="DetalleServicio">

                    <template slot="eliminar" slot-scope="data" >
                        <i class="btn btn-danger fa fa-trash" v-on:click="eliminar(index)" ></i>
                    </template>
                    <template slot="productoslocal"  slot-scope="data">
                        {{data.value.nombre}}         
                    </template>
                    <template slot="servicioslocal"  slot-scope="data">
                        {{data.value.nombre}}
                    </template>
                    <template slot="editar"  slot-scope="data">
                        <i class="btn btn-success fa fa-pencil"  v-on:click="editar(data.index)" ></i>
                        <!--
                        <i class="btn btn-success fa fa-pencil"  v-on:click="editar(data.index)" v-b-modal.modaleditar></i>

                          -->
                    </template>
                </b-table>
                <b-pagination size="md" :total-rows="DetalleServicio.length" v-model="currentPage" :per-page="5">
                </b-pagination>
            </b-row>
            <!--
            <b-row>
              <b-col class="float-left" cols="5">
                <b-btn to="/inicio/orden" variant="primary">
                <i class="fa fa-chevron-left" aria-hidden="true">  </i>
                Anterior</b-btn>

              </b-col>
              <b-col class="d-flex flex-row-reverse">
                                      <b-btn   @click="envioServicio" variant="primary">
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                        Finalizar</b-btn>

              </b-col>
            </b-row>
            -->
        </b-card>
       </b-container>
        <!-- Modal Adicionar -->
        <b-modal id="modalcrear" ref="Modal" title="Adicionar Registro" 
            no-close-on-backdrop
            no-close-on-esc
            size="lg" >
            <div slot="modal-header" class="w-100">
                    <b-btn class="mt-3" variant="danger"  @click="hideModal">
                    <i class="fa fa-times-circle" aria-hidden="true">  </i>
                    Cancelar</b-btn>
                    <b-btn class="mt-3 float-right" variant="success" v-on:click="ingresarOrden">
                    <i class="fa fa-floppy-o">  </i> Guardar
                    </b-btn>
            </div>
                <b-container fluid>
                <b-row class=" my-1">
                    <b-col>
                    <!--
                    <b-form-select v-model="selectproduct"   id="produ" 
                    :options="productosurl" text-field="nombre" value-field="_id"  @change.native="service">
                    </b-form-select>
                    -->
                    <v-select v-model="selectproduct" label="nombre" placeholder="Digite el Producto"
                        :options="productosurl" @input="seleccionarServicio()">
                    </v-select>
                        
                    </b-col>
                    <b-col>
                    <!--
                    <b-form-select v-model="selectservice"  :options="serviciosurl"
                    @change.native="campos"
                    text-field="nombre" value-field="_id"  :disabled="habilitar" >
                    </b-form-select>
                    -->
                    <v-select v-model="selectservice" label="nombre" placeholder="Digite el Servicio"
                        :disabled="habilitar"
                        :options="serviciosurl" @input="camposNversion()">
                    </v-select>
                    </b-col>
                </b-row>
                
                    <b-card no-body v-show="selectservice" class=" w-100 cards" 
                    style="
                    padding-left: 0px;
                    padding-right: 0px;
                    padding-top: 0px;
                    padding-bottom: 0px;
                    ">
                                
                
                    <b-tabs card id="tarjeta"  class=" cardPersonalizada" v-show="selectservice" v-model="tabIndex">
                            <b-tab  title="Información" class="cardPersonalizada" >

                            <b-card-body>
                                    <b-row>
                                        <b-col>
                                            <label class="col col-form-label col-form-label-sm text-capitalize text-primary" >Documento Referencia:</label>
                                        </b-col>
                                        <b-col>
                                            <b-form-input type="text" class="form-control form-control-sm " 
                                                                    placeholder="Referencia" v-model="detalles.referencia"
                                                                :state="estado.referencia"></b-form-input>
                                        </b-col>
                                    </b-row>
                                    


                                    <b-row  v-for="(data,indice) in inputs.campos" class="my-2"> 
                                        <template v-if="data.type!='select'" >
                                        <template v-if="data.espieza==false">
                                        <b-col  >   
                                            <label  class="col-sm col-form-label col-form-label-sm text-capitalize text-primary" :style="[data.style]" >{{data.placeholder}}: </label>
                                        </b-col>
                                        <b-col >
                                            
                                            <input class="form-control form-control-sm "  :maxlength="data.maxlength" :type="data.type" :id="data.id" :style="[data.style,validatecampo]" :max="data.max" :min="data.min" :placeholder="data.placeholder" @keyup="Presiono(indice)"   required>
                                        </b-col>
                                        
                                        </template>
                    
                                        </template>              
                                    </b-row>
                                    <b-form-row v-show="selectservice" class=" my-1">
                                    <b-col>
                                    <b-form-textarea id="textarea1"
                                        v-model="detalles.observaciones"
                                        placeholder="Ingrese las observaciones necesarias"
                                        :rows="3"
                                        :max-rows="6">
                                    </b-form-textarea>
                                    </b-col>
                                </b-form-row>
                                <b-form-row v-show="selectservice" class=" my-1">
                                    <b-col>
                                    <b-form-textarea id="textarea1"
                                        v-model="detalles.contenido"
                                        placeholder="Ingrese el contenido de los paquetes"
                                        :rows="3"
                                        :max-rows="6">
                                    </b-form-textarea>
                                    </b-col>
                                </b-form-row>
                            </b-card-body>
                            </b-tab>
                            <b-tab title="Detalle" :disabled="tabdinamico">
                            <b-card-body>
                                <b-row v-for="(data,indice) in inputs.campos" v-show="camposdinamicos">
                                <template v-if="data.type!='select'" >
                                    <template v-if="data.espieza==true">
                                    <b-col  >   
                                        <label  class="col-sm col-form-label col-form-label-sm text-capitalize text-primary" :style="[data.style]" >{{data.placeholder}}: </label>
                                    </b-col>
                                    <b-col >
                                      <!--
                                        @keyup="Presiono(indice)"
                                        -->
                                        <input focus class="form-control form-control-sm"  :maxlength="data.maxlength" :type="data.type" :id="data.id" :style="[data.style,validatecampo]" 
                                        :max="data.max" :min="data.min" :placeholder="data.placeholder"  @keyup="Presiono(indice)"
                                         @keyup.enter.tab="adicionarRef"
                                        @keydown.tab="adicionarRef"
                                          required>
                                    </b-col>
                                    </template>
                
                                    </template>  
                                </b-row>   
                                <b-row v-show="ocultardicionar">
                                    <b-col class="d-flex flex-row-reverse">
                                        <b-btn variant="outline-success" active-class class="float-right" @click="adicionarRef" v-show="camposdinamicos">
                                        <i class="fa fa-plus"></i>
                                        </b-btn>
                                    </b-col>
                                    </b-row> 
                                    <b-row v-show="ocultareditar">
                                    <b-col class="d-flex flex-row-reverse">
                                        <b-btn variant="outline-success" active-class class="float-right" @click="UpdateDinamico" v-show="camposdinamicos">
                                        <i class="fa fa-pencil"></i>
                                        </b-btn>
                                    </b-col>
                                    </b-row>    
                                    <b-row>
                                    <b-table striped hover :items="itemsdinamicos"  :fields="fieldsdinamicos"
                                    :per-page="3" :current-page="currentPageRef" v-show="camposdinamicos"> 
                                        <template slot="eliminar" slot-scope="data">
                                            <i class="btn btn-danger fa fa-trash" v-on:click="eliminarRef(data)" v-show="ocultardicionar"></i>
                                        </template>
                                        <template slot="actualizar" slot-scope="data">
                                            <i class="btn btn-primary fa fa-pencil" v-on:click="ActualizarRef(data,data.index)" v-show="ocultardicionar"></i>
                                        </template>
                                    
                                        
                                        </b-table>
                                    <b-pagination size="md" :total-rows="itemsdinamicos.length" v-model="currentPageRef" 
                                    :per-page="3" v-show="camposdinamicos">
                                    </b-pagination>    
                                    </b-row>  
                            </b-card-body>
                            </b-tab>
                            <b-tab title="Destinatario">
                            <b-card-body>
                              <b-form-row v-show="selectservice" class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm text-primary">Nombre: </label>
                                </b-col>
                                <b-col cols="9">
                                  <!--
                                    <b-form-input type="text" class="form-control form-control-sm" 
                                     placeholder="Nombre" v-model="detalles.destinatario.nombre"
                                    :state="estado.nombre"></b-form-input>
                                     <v-select label="nombre" :filterable="false" v-model=nombre_remitente
                                        placeholder="Digite el remitente" :options="optionsremitentes"
                                          @input="updateOption"
                                          @search="onSearch">
                                    -->
                                      <v-select maxHeight="500px" label="nombre" :filterable="false" v-model=nombre_remitente
                                        placeholder="Digite el remitente" :options="optionsremitentes"
                                          @input="Seleccionado"
                                          @search="onSearch">
                                          <template slot="no-options">
                                            <p @click="NuevoDestinatario(nombre_remitente)">Digite el nombre del remitente..</p>
                                          </template>
                                          <template slot="option" slot-scope="option">
                                            <div class="d-center">
                                              {{ option.nombre }}
                                              </div>
                                          </template>
                                          <template slot="selected-option" scope="option">
                                            <div class="selected d-center">
                                              {{ option.nombre }}
                                            </div>
                                          </template>
                                          
                                        </v-select>
                                        {{nombre_remitente}}
                                </b-col>
                            </b-form-row>
                            <b-form-row v-show="selectservice&&mostrardestinatario" class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm text-primary"> Identificación: </label>
                                </b-col>
                                <b-col>
                                    <b-form-input type="number" class="form-control form-control-sm"  placeholder="Indentidicación"
                                    v-model="detalles.destinatario.identificacion"
                                  
                                    :state="true"  v-b-popover.hover="'Se debe diligenciar sin puntos, en caso de NIT sin numero de validación, ni guion'" title="Num. Identificacion"></b-form-input>
                                    <!--<input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre">
                                     @keyup.enter.tab.native="buscar('nuevo')"
                                    @keydown.tab.native="buscar('nuevo')"
                                    -->
                                </b-col>
                            </b-form-row>
                  
                            <b-form-row v-show="selectservice&&mostrardestinatario " class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm text-primary">Dirección: </label>
                                </b-col>
                                <b-col>
                                    <b-form-input type="text"  class="form-control form-control-sm"  :state="estado.direccion"
                                     placeholder="Direccion" v-model="detalles.destinatario.direccion"> </b-form-input>

                                </b-col>
                            </b-form-row>
                            <b-form-row v-show="selectservice&&mostrardestinatario" class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm text-primary">Telefono: </label>
                                </b-col>
                                <b-col>

                                    <input type="text" :style="validatecampoTel"  class="form-control form-control-sm" 
                                    id="telefono" @keyup="numeros(this)" placeholder="Telefono"
                                     v-model="detalles.destinatario.telefono">
                                    
                                </b-col>
                            </b-form-row>
                            {{detalles.destinatario.telefono}}
                            </b-card-body>
                            </b-tab>
                    </b-tabs>  
                    
                    <b-card-footer>
                        <div class="text-center" v-show="selectservice">
                            <b-button-group class="mt-2">
                            <b-btn @click="tabIndex--"><i class="fa fa-chevron-left" aria-hidden="true"></i></b-btn>
                            <b-btn @click="tabIndex++"><i class="fa fa-chevron-right" aria-hidden="true"></i></b-btn>
                            </b-button-group>
                            
                        </div>
                    </b-card-footer>
                    </b-card>
        
                </b-container>
                <div slot="modal-footer" class="w-100">
                

                </div>
        </b-modal>
        <!-- Modal Editar -->
        <b-modal id="modaleditar" ref="ModalEdit" title="Editar Registro"
         no-close-on-backdrop
            no-close-on-esc size="lg">
            <div slot="modal-header" class="w-100">
                    <b-btn class="mt-3" variant="danger"  @click="hideModal">
                    <i class="fa fa-times-circle" aria-hidden="true">  </i>
                    Cancelar</b-btn>
                    <b-btn class="mt-3 float-right " variant="success" v-on:click="actualizar()">
                    <i class="fa fa-floppy-o"></i> Guardar 
                    </b-btn>
                </div>
                <b-container fluid>
                    <b-row class=" my-1">
                    <b-col>

                    <v-select v-model="selectproductED" label="nombre" placeholder="Digite el Producto"
                        :options="productosurlED" @input="seleccionarServicioED()"
                        :disabled="true">
                    </v-select>
                        
                    </b-col>
                    <b-col>

                    <v-select v-model="selectserviceED" label="nombre" placeholder="Digite el Servicio"
                        :disabled="true"
                        :options="serviciosurlED"  @input="camposNversionED()">
                        <!--
            :options="serviciosurl" @input="camposNversion()">
                          -->
                    </v-select>
                    </b-col>
                </b-row>
                    <!--
                    <b-row class=" my-1">
                    <b-col>
                        <small>Producto</small>
                        <b-form-select v-model="selectproduct" class="mb-3" 
                        :options="productosurl" text-field="nombre" value-field="_id" 
                        @change.native="service"
                        disabled>
                        </b-form-select>
                    </b-col>
                    <b-col>
                        <small>Servicio</small>
                        <b-form-select v-model="selectservice" class="mb-3" 
                        :options="serviciosurl" @change.native="campos" text-field="nombre"
                        disabled value-field="_id">
                        </b-form-select>
                    </b-col>

                    </b-row>
                    -->
            <b-card no-body v-show="selectserviceED" class=" w-100 cards"
                    style="
                    padding-left: 0px;
                    padding-right: 0px;
                    padding-top: 0px;
                    padding-bottom: 0px;
                    ">
                    <b-tabs card  v-show="selectserviceED" v-model="tabIndexED">
                        <b-tab  title="Información" >
                            <b-card-body>
                                <b-row>
                                        <b-col>
                                            <label class="col col-form-label col-form-label-sm text-capitalize text-primary" >Documento Referencia:</label>
                                        </b-col>
                                        <b-col>
                                            <b-form-input type="text" class="form-control form-control-sm " 
                                                                    placeholder="Referencia" v-model="detalleseditar.referencia"
                                                                :state="estado.referencia"></b-form-input>
                                        </b-col>
                                    </b-row>
                            <b-row  v-for="(data,indice) in inputsED.campos" class="my-2"> 
                                <template v-if="data.type!='select'" >
                                <template v-if="data.espieza==false">
                                <b-col  >   
                                    <label  class="col-sm col-form-label col-form-label-sm text-capitalize" :style="[data.style]" >{{data.placeholder}}: </label>
                                </b-col>
                                <b-col >
                                    <input class="form-control form-control-sm" 
                                    :type="data.type" :id="data.id" :style="[data.style,validatecampo]"
                                    :max="data.max" :placeholder="data.placeholder" 
                                    @keyup="PresionoED(indice)"  :value="valores(data.id)"      required>
                                </b-col>
                                </template>
            
                                </template>              
                            </b-row>
                            <b-row class=" my-1">
                                <b-form-textarea id="textarea1"
                                    v-model="detalleseditar.observaciones"
                                    placeholder="Observaciones"
                                    :rows="3"
                                    :max-rows="6">
                                </b-form-textarea>
                            </b-row>
                            <b-row class=" my-1">
                                <b-form-textarea id="textarea1"
                                    v-model="detalleseditar.contenido"
                                    placeholder="Ingrese el contenido"
                                    :rows="3"
                                    :max-rows="6">
                                </b-form-textarea>
                            </b-row>
                            </b-card-body>
                        </b-tab>
                        <b-tab title="Detalle" :disabled="tabdinamicoED">
                        <!--
  
                          -->
                            <b-row v-for="(data,indice) in inputsED.campos" v-show="camposdinamicos">
                            <template v-if="data.type!='select'" >
                                <template v-if="data.espieza==true">
                                <b-col  >   
                                    <label  class="col-sm col-form-label col-form-label-sm text-capitalize" :style="[data.style]" >{{data.placeholder}}: </label>
                                </b-col>
                                <b-col >
                                    <input class="form-control form-control-sm" :type="data.type"
                                    :id="data.id" :style="[data.style,validatecampo]" :max="data.max" 
                                    :placeholder="data.placeholder" @keyup="PresionoED(indice)"   required>
                                </b-col>
                                </template>
            
                            </template>  
                            </b-row>   
                        
                            <b-row v-show="ocultardicionarED">
                            <b-col class="d-flex flex-row-reverse">
                                <b-btn variant="outline-success" active-class class="float-right" @click="adicionarRefED" v-show="camposdinamicos">
                                <i class="fa fa-plus"></i>
                                </b-btn>
                            </b-col>
                            </b-row> 
                            <b-row v-show="ocultareditarED">
                            <b-col class="d-flex flex-row-reverse">
                                <b-btn variant="outline-success" active-class class="float-right" @click="UpdateDinamicoED" v-show="camposdinamicos">
                                <i class="fa fa-pencil"></i>
                                </b-btn>
                            </b-col>
                            </b-row>    

                            <b-row>
                            <b-table striped   hover :items="itemsdinamicos"  :fields="fieldsdinamicos"
                            :per-page="3" :current-page="currentPageRef" v-show="camposdinamicos"> 
                                <template slot="eliminar" slot-scope="data">
                                    <i class="btn btn-danger fa fa-trash" v-on:click="eliminarRef(data)" v-show="ocultardicionarED"></i>
                                </template>
                                <template slot="actualizar" slot-scope="data">
                                    <i class="btn btn-primary fa fa-pencil" v-on:click="ActualizarRefED(data,data.index)" v-show="ocultardicionarED"></i>
                                </template>
                                </b-table>
                            <b-pagination size="md" :total-rows="itemsdinamicos.length" v-model="currentPageRef" 
                            :per-page="3" v-show="camposdinamicos">
                            </b-pagination>    
                            </b-row> 
                        </b-tab>
                        <b-tab title="Destinatario">
                        <b-card-body>
                            <b-form-row v-show="selectservice" class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm"> Identificación: </label>
                                </b-col>
                                <b-col>
                                    <b-form-input type="number" class="form-control form-control-sm"  placeholder="Indentidicación"
                                    v-model="detalleseditar.destinatario.numero_identificacion"
                                    @keyup.enter.tab.native="buscar('editar')"
                                    @keydown.tab.native="buscar('editar')"
                                    :state="true"  v-b-popover.hover="'Se debe diligenciar sin puntos, en caso de NIT sin numero de validación, ni guion'" title="Num. Identificacion"></b-form-input>
                                    <!--<input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalles.destinatario.nombre">
                                    -->
                                </b-col>
                            </b-form-row>
                            <b-form-row class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm">Nombre: </label>
                                </b-col>
                                <b-col>
                                <b-form-input type="text" class="form-control form-control-sm"  placeholder="Nombre" v-model="detalleseditar.destinatario.nombre"
                                    :state="estado.nombre"></b-form-input>
                                    <!--
                                    <input type="text" class="form-control form-control-sm" id="editarnombre"  placeholder="Nombre" v-model="detalleseditar.destinatario.nombre">
                                    -->
                                </b-col>
                            </b-form-row>
                            <b-form-row class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm">Dirección: </label>
                                </b-col>
                                <b-col>
                                <b-form-input type="text" class="form-control form-control-sm"  placeholder="Direccion" v-model="detalleseditar.destinatario.direccion"
                                    :state="estado.direccion"></b-form-input>
                                    <!--
                                    <input type="text" class="form-control form-control-sm" id="editardire" placeholder="Direccion" v-model="detalleseditar.destinatario.direccion">
                                    -->
                                </b-col>
                            </b-form-row>
                            <b-form-row class="my-1">
                                <b-col>
                                    <label  class="col-sm col-form-label col-form-label-sm">Telefono: </label>
                                </b-col>
                                <b-col>
                                    <input type="text" :style="validatecampoTel" class="form-control form-control-sm" id="telefonoedit"  @keyup="numeroseditar(this)"  placeholder="Telefono" v-model="detalleseditar.destinatario.telefono">
                                </b-col>
                            </b-form-row>
                        </b-card-body>
                        </b-tab>
                    </b-tabs>
            </b-card>
                
                    
                    
                </b-container>
                <div slot="modal-footer" class="w-100">
                    

                </div>
        </b-modal>
    </b-container>
</template>

<script>
import { bus } from "../main";
import { urlservicios } from "../main";
import Preload from "../componentes/preload.vue";
export default {
  components: {
    Preload
  },
  data() {
    return {
      nombre_remitente:'',
      optionsremitentes:[],
      pruebas: {
        "background-color": "#ebeaea",
        " border-bottom-color": "#495057",
        " border-top": "none"
      },
      tabIndexED: 0,
      tabdinamico: false,
      tabIndex: 0,
      items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Generación Orden",
          to: "/inicio/orden",
          active: true
        },
        {
          text: "Detalle Orden de Servicio",
          to: "/inicio/ordenservicio",
          active: true
        }
      ],
      ocultardicionarED: true,
      ocultareditarED: false,
      ocultardicionar: true,
      ocultareditar: false,
      indicedinamico: "",
      camposdinamicos: false,
      currentPageRef: 1,
      itemsdinamicos: [],
      fieldsdinamicos: [],
      prueba: "",
      mostrardestinatario: true,
      creaciondestinatarios: "",
      identificacion: "",
      estado: {
        direccion: null,
        nombre: null,
        telefono: null,
        referencia: null
      },
      validatecampo: "",
      validatecampoTel: "",
      mostrar: true,
      habilitar: true,
      load: false,
      selection: "",
      pruebas: "",
      currentPage: 1,
      fields: [
        "eliminar",
        { key: "productoslocal", label: "Productos" },
        { key: "servicioslocal", label: "Servicios" },
        "editar"
      ],
      DetalleServicio: [],
      remitentes: [],
      tabdinamicoED:false,
      productosurl: [],
      selectproducto: {},
      productosurlED: [],
      selectproductED:null,
      selectserviceED:null,
      serviciosurlED:[],
      selectservice:null,
      serviciosurl: [],
      selectservice: null,
      selectproduct: null,
      selectservicio: {},
      inputs: "",
      objeto: "",
      detallesc: "",
      detalles: {
        destinatario: {
          identificacion: "",
          _id: "",
          nombre: "",
          direccion: "",
          telefono: ""
        },
        infor: {},
        referencia: "",
        observaciones: "",
        contenido: ""
      },
      detalleseditar: {
        destinatario: {
          identificacion: "",
          _id: "",
          nombre: "",
          direccion: "",
          telefono: ""
        },
        infor: {},
        referencia: "",
        observaciones: "",
        contenido: ""
      },
      inputsED: ""
    };
  },
  watch: {},
  methods: {
    NuevoDestinatario(){
      console.log("nuevo destinatario");
      console.log(this.nombre_remitente);
    },
    Seleccionado(){
      console.log("tengo un seleccionado");
      
      console.log(this.nombre_remitente);
      this.detalles.destinatario.identificacion=this.nombre_remitente.numero_identificacion
      this.detalles.destinatario.direccion=this.nombre_remitente.direccion
      this.detalles.destinatario.telefono=this.nombre_remitente.telefono
      this.detalles.destinatario.nombre=this.nombre_remitente.nombre
      this.detalles.destinatario.latitud=this.nombre_remitente.latitud
      this.detalles.destinatario.longitud=this.nombre_remitente.longitud
    },
     onSearch(search) {
      //this.nombre_remitente=search
        //loading(true);
      this.search(search, this);
      
    },
    
  search(search){
    var remi = localStorage.getItem("remitente");
      var remijson = JSON.parse(remi);
      if(remi==undefined||remi==''){
        this.optionsdestinatarios=[]
        setTimeout(function(){
          /*
          this.axios.get(`https://api.github.com/search/repositories?q=${escape(search)}`)
        .then(response => {
          this.optionsdestinatarios=response.data.items
                  loading(false);

        })
        */
        
        this.axios.get(`http://192.168.1.59:3000/logistica//obtenerDestinatarioNombre/${escape(search)}`)
        .then(response => {

          this.optionsremitentes=response.data.destinatarios
                  //loading(false);

        })
     
      }.bind(this), 345);
      }else{
        //this.remitente=remijson.nombre
        this.optionsdestinatarios=[]
        setTimeout(function(){
          /*
          this.axios.get(`https://api.github.com/search/repositories?q=${escape(search)}`)
        .then(response => {
          this.optionsdestinatarios=response.data.items
                  loading(false);

        })
        */
        
        this.axios.get(`http://192.168.1.59:3000/logistica//obtenerDestinatarioNombre/${escape(search)}`)
        .then(response => {

          this.optionsremitentes=response.data.destinatarios
                  //loading(false);

        })
        
          }.bind(this), 345);

      }
      /*
    this.optionsdestinatarios=[]
    setTimeout(function(){
      /*
      this.axios.get(`https://api.github.com/search/repositories?q=${escape(search)}`)
     .then(response => {
       this.optionsdestinatarios=response.data.items
               loading(false);

     })
     
    
    this.axios.get(`http://192.168.1.59:3000/logistica//obtenerDestinatarioNombre/${escape(search)}`)
     .then(response => {

       this.optionsdestinatarios=response.data.destinatarios
               loading(false);

     })
     
      }.bind(this), 345);

    */
     
  },
    abirmodal() {
      this.selectservice = null;
      this.selectproduct = null;
      var login = localStorage.getItem("storedData");
      var infologin = JSON.parse(login);
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
      this.axios
        .get(urlservicios + "productos/" + infologin.id_OperadorLogistico._id)
        .then(response => {
          this.productosurl = response.data;
          //this.productosurl.unshift(vacio);
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          this.$refs.Modal.show();
        })
        .catch(function(error) {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          swal("Error", "Intente nuevamente, por favor", "warning");
        });
    },
    UpdateDinamico(value) {
      var objellaves = Object.keys(this.itemsdinamicos[0]);
      var tituloopciones = {};

      for (var x = 0; x < this.inputs.campos.length; x++) {
        if (this.inputs.campos[x].espieza == true) {
          for (var y = 0; y < objellaves.length; y++) {
            if (this.inputs.campos[x].vmodel == objellaves[y]) {
              eval(
                "this.objeto." +
                  this.inputs.campos[x].vmodel +
                  "=" +
                  document.getElementById(this.inputs.campos[x].id).value
              );
              tituloopciones[objellaves[y]] = eval(
                "this.objeto." + objellaves[y]
              );
              document.getElementById(this.inputs.campos[x].id).value = "";
            }
          }
        }
      }

      if (this.indicedinamico == 0 && this.currentPageRef == 1) {
        this.itemsdinamicos.splice(this.indicedinamico, 1);
        this.itemsdinamicos.splice(this.indicedinamico, 0, tituloopciones);
      } else {
        if (this.currentPageRef == 1) {
          this.itemsdinamicos.splice(this.indicedinamico, 1);
          this.itemsdinamicos.splice(this.indicedinamico, 0, tituloopciones);
        } else {
          this.itemsdinamicos.splice(this.indicedinamico + 3, 1);
          this.itemsdinamicos.splice(
            this.indicedinamico + 3,
            0,
            tituloopciones
          );
        }
      }
      this.ocultardicionar = true;
      this.ocultareditar = false;
    },
    UpdateDinamicoED(value) {
      var objellaves = Object.keys(
        this.DetalleServicio[this.indices].detalleslocal.infor
      );
      var indiceobjdina;
      if (this.currentPageRef == 1) {
        indiceobjdina = this.indicedinamico;
      } else {
        indiceobjdina = 3 + this.indicedinamico;
      }
      for (var x = 0; x < this.inputsED.campos.length; x++) {
        if (this.inputsED.campos[x].espieza == true) {
          for (var y = 0; y < objellaves.length; y++) {
            if (this.inputsED.campos[x].vmodel == objellaves[y]) {
              eval(
                "this.DetalleServicio[this.indices].detalleslocal.infor.objetoUnidades[indiceobjdina]." +
                  objellaves[y] +
                  "=" +
                  document.getElementById(this.inputsED.campos[x].id).value
              );
              document.getElementById(this.inputsED.campos[x].id).value = "";
            }
          }
        }
      }
      this.ocultardicionarED = true;
      this.ocultareditarED = false;
    },
    ActualizarRefED(value, value2) {
      this.indicedinamico = value2;
      var objellaves = Object.keys(value.item);
      this.ocultardicionarED = false;
      this.ocultareditarED = true;
      for (var x = 0; x < this.inputsED.campos.length; x++) {
        if (this.inputsED.campos[x].espieza == true) {
          for (var y = 0; y < objellaves.length; y++) {
            if (this.inputsED.campos[x].vmodel == objellaves[y]) {
              document.getElementById(this.inputsED.campos[x].id).value = eval(
                "value.item." + objellaves[y]
              );
            }
          }
        }
      }
    },
    ActualizarRef(value, value2) {
      this.indicedinamico = value2;
      var objellaves = Object.keys(value.item);
      this.ocultardicionar = false;
      this.ocultareditar = true;
      for (var x = 0; x < this.inputs.campos.length; x++) {
        if (this.inputs.campos[x].espieza == true) {
          for (var y = 0; y < objellaves.length; y++) {
            if (this.inputs.campos[x].vmodel == objellaves[y]) {
              document.getElementById(this.inputs.campos[x].id).value = eval(
                "value.item." + objellaves[y]
              );
            }
          }
        }
      }
    },
    eliminarRef(value) {
      this.itemsdinamicos.splice(value.index, 1);
    },
    adicionarRefED() {
      var objetollaves = Object.keys(this.inputsED.objeto);
      var tituloopciones = {};
      var bandera = true;
      var resumen = this.DetalleServicio[this.indices].detalleslocal.infor
        .objetoUnidades;
      for (var x = 0; x < this.inputsED.campos.length; x++) {
        if (this.inputsED.campos[x].espieza == true) {
          for (var y = 0; y < objetollaves.length; y++) {
            if (this.inputsED.campos[x].vmodel == objetollaves[y]) {
              if (
                document.getElementById(this.inputsED.campos[x].id).value ==
                  "" ||
                document.getElementById(this.inputsED.campos[x].id).value ==
                  null
              ) {
                bandera = false;
              } else {
                tituloopciones[objetollaves[y]] = eval(
                  "this.DetalleServicio[this.indices].detalleslocal.infor." +
                    objetollaves[y]
                );
                document.getElementById(this.inputsED.campos[x].id).value = "";
              }
            }
          }
        }
      }
      if (bandera == false) {
        swal("Error!", "Revise los campos", "error");
      } else {
        bandera = true;
        this.itemsdinamicos.push(tituloopciones);
      }
    },
    adicionarRef() {
      console.log("entro a adicionar");
      var objetollaves = Object.keys(this.inputs.objeto);
      var tituloopciones = {};
      var opciones = [];
      var bandera = true;
      for (var x = 0; x < this.inputs.campos.length; x++) {
        if (this.inputs.campos[x].espieza == true) {
          for (var y = 0; y < objetollaves.length; y++) {
            if (this.inputs.campos[x].vmodel == objetollaves[y]) {
              //aca creamos la llave y le asignamos el valor correspondiente
              tituloopciones[objetollaves[y]] = eval(
                "this.objeto." + objetollaves[y]
              );
              if (
                document.getElementById(this.inputs.campos[x].id).value == "" ||
                document.getElementById(this.inputs.campos[x].id).value == null
              ) {
                bandera = false;
              } else {
                document.getElementById(this.inputs.campos[x].id).value = "";
                eval("this.objeto." + this.inputs.campos[x].vmodel + '=""');

                /*
              
                  if(this.inputs.campos[x].vmodel=='unidades'){
                  if(this.itemsdinamicos.length==0)
                  {
                    eval('this.objeto.'+objetollaves[y]+'='+1)
                  }
                  else{
                    eval('this.objeto.'+objetollaves[y]+'='+this.itemsdinamicos.length+ eval('this.objeto.'+objetollaves[y]))
                  }
                  
                }
                */
              }
            }
          }
        }
      }
      if (bandera == false) {
        swal("Error !", "Revise los campos", "error");
      } else {
        bandera = true;
        var fields = Object.keys(tituloopciones);
        fields.push("eliminar");
        fields.push("actualizar");

        this.fieldsdinamicos = fields;
        this.itemsdinamicos.push(tituloopciones);
      }
    },
    buscar(accion) {
      if (accion == "nuevo") {
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        var algo = this.prueba;
        this.axios
          .get(urlservicios + "obtenerDestinatario" + "/" + this.identificacion)
          .then(response => {
            var destinatario = response.data.destinatarios;
            this.creaciondestinatarios = response.data.validar;

            if (response.data.validar == true) {
              this.detalles.destinatario.numero_identificacion =
                destinatario.numero_identificacion;
              this.detalles.destinatario._id = destinatario._id;
              this.detalles.destinatario.nombre = destinatario.nombre;
              this.detalles.destinatario.direccion = destinatario.direccion;
              this.detalles.destinatario.telefono = destinatario.telefono;
            } else {
              this.detalles.destinatario.numero_identificacion = this.identificacion;
              this.detalles.destinatario._id = "";
              this.detalles.destinatario.nombre = "";
              this.detalles.destinatario.direccion = "";
              this.detalles.destinatario.telefono = "";
            }
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            //this.mostrardestinatario = true;
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal("Advertencia", "Intente nuevamente, por favor", "warning");
          });
      }
      if (accion == "editar") {
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .get(
            urlservicios +
              "obtenerDestinatario" +
              "/" +
              this.detalleseditar.destinatario.numero_identificacion
          )
          .then(response => {
            var destinatario = response.data.destinatarios;
            this.creaciondestinatarios = response.data.validar;
            if (response.data.validar == true) {
              this.detalles.destinatario.numero_identificacion =
                destinatario.numero_identificacion;
              this.detalleseditar.destinatario._id = destinatario._id;
              this.detalleseditar.destinatario.nombre = destinatario.nombre;
              this.detalleseditar.destinatario.direccion =
                destinatario.direccion;
              this.detalleseditar.destinatario.telefono = destinatario.telefono;
            } else {
              this.detalleseditar.destinatario.numero_identificacion = this.identificacion;
              this.detalleseditar.destinatario._id = "";
              this.detalleseditar.destinatario.nombre = "";
              this.detalleseditar.destinatario.direccion = "";
              this.detalleseditar.destinatario.telefono = "";
            }
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            //this.mostrardestinatario = true;
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal("Advertencia", "Intente nuevamente, por favor", "warning");
          });
      }
    },
    numeroseditar(valor) {
      var a = document.getElementById("telefonoedit").value;
      //var x=check.which;
      //var x = a.charCode;
      var x = a.keyCode;
      if (!(a >= 48 || a <= 57)) {
        swal("Oops...", "Solo deben ser numeros !", "error");
        this.validatecampoTel = {
          border: "1px solid  #ff8080"
        };
        return (document.getElementById("telefonoedit").value = "");
      } else if (a.length >= 9) {
        // if no is more then the value
        swal("Oops...", "Maximo 10 digitos!", "error");
        this.validatecampoTel = {
          border: "1px solid  #ff8080"
        };
        return (document.getElementById("telefonoedit").value = "");
      }
    },
    numeros(valor) {
      var a = document.getElementById("telefono").value;
      //var x=check.which;
      //var x = a.charCode;
      var x = a.keyCode;
      if (!(a >= 48 || a <= 57)) {
        swal("Oops...", "Solo deben ser numeros !", "error");
        this.validatecampoTel = {
          border: "1px solid  #ff8080"
        };
        return (document.getElementById("telefono").value = "");
      } else if (a.length >= 9) {
        // if no is more then the value
        swal("Oops...", "Maximo 10 digitos!", "error");
        this.validatecampoTel = {
          border: "1px solid  #ff8080"
        };
        return (document.getElementById("telefono").value = "");
      }
    },
    PresionoED(index) {
      this.validatecampo = "";
      var cero = "";
      setTimeout(
        function() {
          if (this.inputsED.campos[index].type == "text") {
            if (
              document.getElementById(this.inputsED.campos[index].id).value ==
              ""
            ) {
              //eval("this.objeto." + this.inputs.campos[index].vmodel + "= null");
              eval(
                "this.detalleseditar.infor." +
                  this.inputsED.campos[index].vmodel +
                  "= null"
              );
            } else {
              eval(
                "this.detalleseditar.infor." +
                  this.inputsED.campos[index].vmodel +
                  "=" +
                  "document.getElementById(this.inputsED.campos[index].id).value"
              );
            }
          } else {
            if (
              document.getElementById(this.inputsED.campos[index].id).value ==
              ""
            ) {
              eval(
                "this.detalleseditar.infor." +
                  this.inputsED.campos[index].vmodel +
                  "= null"
              );
            } else {
              eval(
                "this.detalleseditar.infor." +
                  this.inputsED.campos[index].vmodel +
                  "=" +
                  document.getElementById(this.inputsED.campos[index].id).value
              );
            }
          }
        }.bind(this)
      );
    },
    valores(dato) {
      return eval("this.detalleseditar.infor." + dato);
    },
    actualizar() {
      this.validatecampoTel = "";
      var pivoteedi = false;
      this.estado.nombre = null;
      this.estado.direccion = null;
      this.estado.referencia = null;

      if (this.detalleseditar.infor.objetoUnidades.length == 0) {
      } else {
        var objetollaves = Object.keys(this.detalleseditar.infor);

        var objdinamico = Object.keys(
          this.detalleseditar.infor.objetoUnidades[0]
        );
        var totales = {};
        var algo = 0;

        for (var y = 0; y < this.itemsdinamicos.length; y++) {
          for (var x = 0; x < this.inputsED.campos.length; x++) {
            for (var z = 0; z < objdinamico.length; z++) {
              if (
                this.inputsED.campos[x].espieza == true &&
                this.inputsED.campos[x].type == "number"
              ) {
                if (objdinamico[z] == this.inputsED.campos[x].vmodel) {
                  if (y == 0) {
                    algo = eval(
                      "this.itemsdinamicos[y]." +
                        this.inputsED.campos[x].acumulaen
                    );
                    totales[this.inputsED.campos[x].acumulaen] = algo;
                    algo = 0;
                  } else {
                    var anterior = totales[this.inputsED.campos[x].acumulaen];

                    anterior =
                      anterior +
                      eval(
                        "this.itemsdinamicos[y]." +
                          this.inputsED.campos[x].acumulaen
                      );

                    totales[this.inputsED.campos[x].acumulaen] = anterior;
                  }
                }

                //algo=algo+eval('this.itemsdinamicos[y].'+this.inputsED.campos[x].acumulaen)
                //totales[this.inputsED.campos[x].acumulaen]=algo
                //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
              }
              if (
                this.inputsED.campos[x].espieza == true &&
                this.inputsED.campos[x].type == "text"
              ) {
                //algo=algo+eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)
                totales[
                  this.inputsED.campos[x].acumulaen
                ] = this.itemsdinamicos.length;
                //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
              }
            }
          }
        }
        var objtotal = Object.keys(totales);

        for (var x = 0; x < objtotal.length; x++) {
          eval(
            "this.detalleseditar.infor." +
              objtotal[x] +
              "=" +
              totales[objtotal[x]]
          );
        }
      }

      if (
        this.detalleseditar.destinatario.nombre == "" ||
        this.detalleseditar.destinatario.direccion == "" ||
        //this.detalleseditar.referencia==""||
        pivoteedi == true ||
        this.detalleseditar.destinatario.telefono == ""
      ) {
        if (this.detalleseditar.destinatario.telefono == "") {
          this.validatecampoTel = {
            border: "1px solid  #ff8080"
          };
          swal("Oops...", "Falto algun campo por completar!", "error");
        }
        if (this.detalleseditar.destinatario.nombre == "") {
          this.estado.nombre = false;
          swal("Oops...", "Falto algun campo por completar!", "error");
        }
        if (this.detalleseditar.destinatario.direccion == "") {
          this.estado.direccion = false;
          swal("Oops...", "Falto algun campo por completar!", "error");
        }
      } else {
        var detalleslocal = this.detalleseditar;
        var productoslocal = this.selectproducto;
        var servicioslocal = this.selectservicio;
        var detalles = {
          trazabilidad: [],
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        this.DetalleServicio.splice(this.indices, 1);
        this.DetalleServicio.splice(this.indices, 0, detalles);
        (this.objeto = ""),
          (this.inputs = ""),
          toastr.success("Se edito exitosamente");
        this.selectservice = "";
        this.selectproduct = "";
        (this.objeto = ""),
          (this.detalleseditar = {
            destinatario: {
              nombre: "",
              direccion: "",
              telefono: ""
            },
            infor: {},
            observaciones: ""
          });
        this.selectservice = null;
        this.selectproduct = null;
        (this.camposdinamicos = false),
          (this.fieldsdinamicos = []),
          (this.itemsdinamicos = []),
          (this.tabIndex = 0);
        this.camposdinamicos = false;
        this.fieldsdinamicos = [];
        this.itemsdinamicos = [];
        this.identificacion = "";
        (this.habilitar = true),
          //this.mostrardestinatario = false),
          //pendiente para correcion error de cambio de servicio
          //this.selectproducto=''
          //this.selectservicio=''
          (this.objeto = ""),
          (this.inputs = ""),
          // toastr.success("Se agrego exitosamente");
          //this.selectservice = null
          //this.selectproduct = null
          //this.selectproducto=null
          //this.selectservicio=null

          (this.objeto = ""),
          (this.detalles = {
            destinatario: {
              nombre: "",
              direccion: "",
              telefono: ""
            },
            infor: {},
            observaciones: ""
          });
        this.$refs.ModalEdit.hide();
      }
    },
    eliminar: function(indice) {
      swal({
        title: "Esta seguro ?",
        text: "No podrá recuperarlo después de realizado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then(result => {
        if (result.value) {
          this.DetalleServicio.splice(indice, 1);
          toastr.error("Se elmino exitosamente");
          swal(
            "Eliminado !",
            "Detalle de la Orden de servicio elimado correctamente.",
            "success"
          );
        }
      });
    },
    editar(index) {
      //this.selectservice= null
      (this.tabIndexED = 0), (this.tabIndex = 0);
      this.validatecampo = "";
      this.validatecampoTel = "";
      this.estado.nombre = null;
      this.estado.direccion = null;
      this.estado.referencia = null;
      this.indices = index;
      this.detalleseditar = this.DetalleServicio[index].detalleslocal;
      this.selectproduct = this.DetalleServicio[index].productoslocal;
      this.selectproducto = this.DetalleServicio[index].productoslocal;
      this.selectservice = this.DetalleServicio[index].servicioslocal;
      this.selectservicio = this.DetalleServicio[index].servicioslocal;

      //this.detalleseditar = this.DetalleServicio[index].detalleslocal;
      this.selectproductED = this.DetalleServicio[index].productoslocal;
      this.selectproducto = this.DetalleServicio[index].productoslocal;
      this.selectserviceED = this.DetalleServicio[index].servicioslocal;
      this.selectservicio = this.DetalleServicio[index].servicioslocal;
      this.seleccionarServicioED()
      this.itemsdinamicos = this.DetalleServicio[
        index
      ].detalleslocal.infor.objetoUnidades;
      if (this.itemsdinamicos.length == 0) {
      } else {
        var fields = Object.keys(
          this.DetalleServicio[index].detalleslocal.infor.objetoUnidades[0]
        );
        fields.push("eliminar");
        fields.push("actualizar");
        this.fieldsdinamicos = fields;
      }
      var load = true;
      setTimeout(() => {
        bus.$emit("load", {
          load
        });
      });
      
      this.axios
        .get(
          urlservicios +
            "estructuraf/" +
            this.selectproduct._id +
            "/" +
            this.selectservice._id
        )
        .then(response => {
          this.inputsED = response.data;

          for (var x = 0; x < this.inputsED.campos.length; x++) {
            if (this.inputsED.campos[x].espieza == true) {
              this.camposdinamicos = true;
              this.tabdinamicoED=false
            }
            else{
              this.camposdinamicos = true;
              //this.tabdinamicoED=true
            }
          }
          //this.camposNversion()
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          this.$refs.ModalEdit.show();
        })
        .catch(function(error) {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          swal("Error", "Intente nuevamente, por favor", "warning");
        });
        
    },
    hideModal() {
     
      //this.tabIndexED=0,
      //this.tabIndex
      (this.habilitar = true),
        //(this.mostrardestinatario = false),
        (this.camposdinamicos = false),
        (this.fieldsdinamicos = []),
        (this.itemsdinamicos = []),
        (this.identificacion = null),
        (this.objeto = ""),
        (this.inputs = ""),
        //this.serviciosurl=null
        //this.productosurl=null
       // this.tabdinamico=false
        (this.selectservice = null);
      this.selectproduct = null;
      (this.objeto = ""),
        (this.detalles = {
          destinatario: {
            nombre: "",
            direccion: "",
            telefono: ""
          },
          infor: {},
          observaciones: ""
        });
      this.$refs.Modal.hide();
      this.$refs.ModalEdit.hide();
    },
    ingresarOrden() {
      this.validatecampoTel = "";
      this.estado.nombre = null;
      this.estado.direccion = null;
      this.estado.referencia = null;
      var pivote = false;
      var inforemitente = localStorage.getItem("orden");
      var inforemi = JSON.parse(inforemitente);

      if (this.creaciondestinatarios == false) {
        var objeto = {
          numero_identificacion: this.identificacion,
          direccion: this.detalles.destinatario.direccion,
          nombre: this.detalles.destinatario.nombre,
          telefono: this.detalles.destinatario.telefono,
          id_cliente: inforemi.selected_client
        };
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .post(urlservicios + "CrearDestinatario", objeto)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
          });
      } else {
        /*
        var objeto = {
          numero_identificacion: this.identificacion,
          direccion: this.detalles.destinatario.direccion,
          nombre: this.detalles.destinatario.nombre,
          telefono: this.detalles.destinatario.telefono,
          id_cliente: inforemi.selected_client
        };
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios.post(urlservicios +"ActualizarDestinatario" +"/" +this.detalles.destinatario._id,objeto)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
          });
      */
      }
      if (this.objeto == undefined) {
      } else {
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        var llaves = "";
        var objllaves;
        llaves = Object.keys(this.objeto);
        if (this.itemsdinamicos.length > 0) {
          objllaves = Object.keys(this.itemsdinamicos[0]);
          var totales = {};
          var algo = 0;
          var prsuma;
          for (var y = 0; y < this.itemsdinamicos.length; y++) {
            for (var x = 0; x < this.inputs.campos.length; x++) {
              for (var z = 0; z < objllaves.length; z++) {
                if (
                  this.inputs.campos[x].espieza == true &&
                  this.inputs.campos[x].type == "number"
                ) {
                  if (objllaves[z] == this.inputs.campos[x].vmodel) {
                    if (y == 0) {
                      algo = eval(
                        "this.itemsdinamicos[y]." +
                          this.inputs.campos[x].acumulaen
                      );
                      totales[this.inputs.campos[x].acumulaen] = algo;
                      algo = 0;
                    } else {
                      var anterior = totales[this.inputs.campos[x].acumulaen];

                      anterior =
                        anterior +
                        eval(
                          "this.itemsdinamicos[y]." +
                            this.inputs.campos[x].acumulaen
                        );

                      totales[this.inputs.campos[x].acumulaen] = anterior;
                    }
                  }

                  //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
                }
                if (
                  this.inputs.campos[x].espieza == true &&
                  this.inputs.campos[x].type == "text"
                ) {
                  //algo=algo+eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)
                  totales[
                    this.inputs.campos[x].acumulaen
                  ] = this.itemsdinamicos.length;
                  //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
                }
              }
            }
          }
          var objtotales = Object.keys(totales);
          for (var x = 0; x < objtotales.length; x++) {
            eval("this.objeto." + objtotales[x] + "=" + totales[objtotales[x]]);
          }

          for (var x = 0; x < this.inputs.campos.length; x++) {
            if (this.inputs.campos[x].espieza == false) {
              if (
                eval("this.objeto." + this.inputs.campos[x].vmodel) == "" ||
                eval("this.objeto." + this.inputs.campos[x].vmodel == "null") ||
                eval("this.objeto." + this.inputs.campos[x].vmodel == null)
              ) {
                this.validatecampo = {
                  border: "1px solid  #ff8080"
                };
                pivote = true;
              } else {
              }
            }
          }
        } else {
          for (var x = 0; x < this.inputs.campos.length; x++) {
            if (this.inputs.campos[x].espieza == false) {
              if (
                eval("this.objeto." + this.inputs.campos[x].vmodel) == "" ||
                eval("this.objeto." + this.inputs.campos[x].vmodel == "null") ||
                eval("this.objeto." + this.inputs.campos[x].vmodel == null)
              ) {
                this.validatecampo = {
                  border: "1px solid  #ff8080"
                };
                pivote = true;
              } else {
              }
            }
          }
        }

        if (pivote == false) {
          this.validatecampo = "";
        }
        var load = false;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
      }
      if (
        this.selectproduct == "" ||
        this.selectservice == "" ||
        //this.detalles.destinatario.nombre == "" ||
        //this.detalles.destinatario.telefono == "" ||
        //this.detalles.destinatario.direccion == "" ||
        pivote == true //  ||
        //this.detalles.referencia==''
      ) {
        if (this.detalles.destinatario.telefono == "") {
          this.validatecampoTel = {
            border: "1px solid  #ff8080"
          };
        }
        if (this.detalles.destinatario.nombre == "") {
          this.estado.nombre = false;
        }
        if (this.detalles.destinatario.direccion == "") {
          this.estado.direccion = false;
        }
        if (this.detalles.referencia == "") {
          this.estado.referencia = false;
        }

        swal("Oops...", "Falto completar algun campo", "error");
      } else {
        
        this.objeto.objetoUnidades;
        this.objeto.objetoUnidades = this.itemsdinamicos;
        var servicioslocal = this.selectservicio;
        this.detallesc = this.detalles;
        this.detallesc.infor = this.objeto;
        var productoslocal = this.selectproducto;
        var detalleslocal = this.detalles;
        this.detalles.destinatario=
        /*

        cambios de immpresion
        */
        this.inputs.campos.forEach(element => {
          if(element.esImprimible==true||element.esImprimible===true)
          {
            console.log(element);
           detalleslocal.Imprime=element.acumulaen
          }
          else{
            //detalleslocal.Imprime=''
          }
        });


        var detalles = {
          trazabilidad: [],
          servicioslocal: servicioslocal,
          productoslocal: productoslocal,
          detalleslocal: detalleslocal
        };
        this.DetalleServicio.push(detalles);
        console.log('this.DetalleServicio: ', this.DetalleServicio);
        
        //BLANQUEAR DATOS
        this.tabIndex = 0;
        this.camposdinamicos = false;
        this.fieldsdinamicos = [];
        this.itemsdinamicos = [];
        this.identificacion = "";
        (this.habilitar = true),
         //(this.mostrardestinatario = false),
 
          (this.objeto = ""),
          (this.inputs = ""),
          toastr.success("Se agrego exitosamente");
  

        (this.objeto = ""),
          (this.detalles = {
            destinatario: {
              nombre: "",
              direccion: "",
              telefono: ""
            },
            infor: {},
            observaciones: ""
          });
        this.$refs.Modal.hide();
      }
    },
    Presiono(index) {
      var cero = "";
      setTimeout(
        function() {
          if (this.inputs.campos[index].type == "text") {
            if (
              document.getElementById(this.inputs.campos[index].id).value == ""
            ) {
              //eval("this.objeto." + this.inputs.campos[index].vmodel + "= null");
              eval(
                "this.objeto." + this.inputs.campos[index].vmodel + "=" + cero
              );
            } else {
              eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  "document.getElementById(this.inputs.campos[index].id).value"
              );
              document.getElementById(this.inputs.campos[index].id).focus();
            }
          } else {
            if (
              document.getElementById(this.inputs.campos[index].id).value == ""
            ) {
              eval(
                "this.objeto." + this.inputs.campos[index].vmodel + "= null"
              );
              eval(
                "this.objeto." +
                  this.inputs.campos[index].vmodel +
                  "=" +
                  this.inputs.campos[index].min
              );
            } else {
              if (
                document.getElementById(this.inputs.campos[index].id).value >
                this.inputs.campos[index].max
              ) {
                eval(
                  "this.objeto." +
                    this.inputs.campos[index].vmodel +
                    "=" +
                    this.inputs.campos[index].min
                );
                document.getElementById(
                  this.inputs.campos[index].id
                ).value = eval(
                  "this.objeto." +
                    this.inputs.campos[index].vmodel +
                    "=" +
                    this.inputs.campos[index].min
                );
              } else {
                eval(
                  "this.objeto." +
                    this.inputs.campos[index].vmodel +
                    "=" +
                    document.getElementById(this.inputs.campos[index].id).value
                );
              }
            }
          }
        }.bind(this)
      );
    },
    seleccionarServicioED() {
      this.axios
        .get(urlservicios + "servicios/" + this.selectproducto._id)
        .then(response => {
          this.serviciosurlED = response.data;
          //this.load=false
          var load2 = false;
          setTimeout(() => {
            bus.$emit("load", {
              load2
            });
          });
          this.habilitar = false;
        })
        .catch(function(error) {
          var load = false;
          setTimeout(() => {
            bus.$emit("load", {
              load
            });
          });
          swal("Advertencia", "Intente nuevamente, por favor", "warning");
        });
    },
    seleccionarServicio() {
      if (
        this.selectproduct == null ||
        (this.selectproduct == "null") | (this.selectproduct == "")
      ) {
        this.habilitar = true;
        this.serviciosurl = [];
        this.selectservice = null;
      } else {
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.habilitar = true;
        this.serviciosurl = [];
        this.selectservice = null;
        //this.habilitar = false;
        this.selectproducto = this.selectproduct;
        this.axios
          .get(urlservicios + "servicios/" + this.selectproducto._id)
          .then(response => {
            this.serviciosurl = response.data;
            //this.load=false
            var load2 = false;
            setTimeout(() => {
              bus.$emit("load", {
                load2
              });
            });
            this.habilitar = false;
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal("Advertencia", "Intente nuevamente, por favor", "warning");
          });
      }
    },
    camposNversionED() {
     
      this.axios
        .get(
          urlservicios +
            "estructuraf/" +
            this.selectproductED._id +
            "/" +
            this.selectserviceED._id
        )
        .then(response => {
          this.inputsED = response.data;

          for (var x = 0; x < this.inputsED.campos.length; x++) {
            if (this.inputsED.campos[x].espieza == true) {

              this.camposdinamicos = true;
              this.tabdinamicoED=false
            }
            else{
              //this.tabdinamicoED=true
            }
          }
          this.$refs.ModalEdit.show();
        })
     
    },
    camposNversion() {
      if (
        this.selectservice == null ||
        this.selectservice == "" ||
        this.selectservice == "null"
      ) {
        this.inputs = "";
        this.objeto = "";
        this.tabdinamico = true;
      } else {
        this.selectservicio = this.selectservice;
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        this.axios
          .get(
            urlservicios +
              "estructuraf/" +
              this.selectproducto._id +
              "/" +
              this.selectservicio._id
          )
          .then(response => {
            this.inputs = response.data;

            this.objeto = this.inputs.objeto;

            var bandera_dinamico = false;
            for (var x = 0; x < this.inputs.campos.length; x++) {
              if (this.inputs.campos[x].espieza == true) {
                bandera_dinamico = true;
                this.camposdinamicos = true;
              } else {
                this.camposdinamicos = true;
              }
            }
            if (this.camposdinamicos == true && bandera_dinamico == true) {
              this.tabdinamico = false;
            } else {
              this.camposdinamicos = false;
              this.tabdinamico = true;
            }
            //this.load=false
            var load2 = false;
            setTimeout(() => {
              bus.$emit("load", {
                load2
              });
            });
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal("Error", "Intente nuevamente, por favor", "warning");
          });
      }
    },

    envioServicio() {
      if (
        this.DetalleServicio == "" ||
        this.DetalleServicio == null ||
        this.DetalleServicio == undefined
      ) {
        swal("Atencion!", "La Orden debe tener minimo un detalle ", "error");
      } else {
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);

        var selec = localStorage.getItem("orden");
        var selecc = JSON.parse(selec);
        var inforemitente = localStorage.getItem("infoorden");
        var inforemi = JSON.parse(inforemitente);
        var localremitente = localStorage.getItem("remitente");
        var localremijson = JSON.parse(inforemitente);
        console.log(localremitente);
        /*
        var objeto = {
          id_OperadorLogistico: infologin.id_OperadorLogistico._id,
          id_usuario: infologin._id,
          id_centro_costo: selecc.selected_center,
          estados: [
            {
              id_usuario: infologin._id
            }
          ],
          id_cliente: selecc.selected_client,
          remitente: {
            direccion_recogida: inforemi.infocentro.direccion,
            telefono_contacto: inforemi.infocliente.telefono,
            nombre_contacto: inforemi.infocliente.nombre
          },
          detalle: this.DetalleServicio
        };
        */
        var objeto = {
          id_OperadorLogistico: infologin.id_OperadorLogistico._id,
          id_usuario: infologin._id,
          id_centro_costo: selecc.selected_center,
          //fecha_crecion:
          //fecha_real:
          id_cliente: selecc.selected_client,
          remitente: {
            direccion_recogida: localremijson.direccion,
            telefono_contacto: localremijson.telefono,
            nombre_contacto: localremijson.nombre,
            latitud:localremijson.latitud,
            longitud:localremijson.longitud,
            codigo_postal:localremijson.codigo_postal
          },
          detalle: this.DetalleServicio
        };
        var load = true;
        setTimeout(() => {
          bus.$emit("load", {
            load
          });
        });
        console.log(objeto);
        this.axios
          .post(urlservicios + "GuardarOrden", objeto)
          .then(response => {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            this.Documento = response.data.ducumento;
            swal(
              "Excelente!",
              "La Orden de Servicio Generada es: " + this.Documento,
              "success"
            );
            this.$router.replace("/inicio");
            localStorage.removeItem("orden");
          })
          .catch(function(error) {
            var load = false;
            setTimeout(() => {
              bus.$emit("load", {
                load
              });
            });
            swal("Error", "Intente nuevamente, por favor", "warning");
          });
      }
    }
  },
  created: function() {},
  beforeCreate: function() {
    /*
    var login = localStorage.getItem("storedData");
    var infologin = JSON.parse(login);
    this.axios
      .get(urlservicios + "productos/" + infologin.id_OperadorLogistico._id)
      .then(response => {
        this.productosurl = response.data;
        //this.productosurl.unshift(vacio);
      });
      */
  }
};
</script>

<style>
.contenedorTotal {
  padding-top: 0px;
  padding-right: 0%;
  padding-bottom: 0px;
  padding-left: 0%;
  background-color: #f8f8ff;
}
.card-header-tabs {
  background-color: #ebeaea;
}
.nav-link {
  border-left-width: 13px;
}
.contenedor {
  padding-top: 0px;
  padding-right: 5px;
  padding-bottom: 0px;
  padding-left: 5px;
  background-color: #f8f8ff;
}
.prueba {
  display: inline-table;
  margin-left: 15px;
}
.card {
  margin-top: 2%;
}
.cards {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */

  border-left-width: 0px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 30px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;
}
/*
.card-header{
    background-color: #ebeaea !important;
    color: white;
}

.cardPersonalizada card-header{
    background-color: #ebeaea;
   
    color: white;
}
#josecard{
    background-color: #ebeaea;
  border-bottom-color: #495057;
  border-top: none;
}
*/
#tarjeta .card-header {
  background-color: #ebeaea !important;

  color: white;
}
</style>
