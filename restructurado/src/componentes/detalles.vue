<template>
    <b-container fluid class="conta">
        <b-row>
            <b-btn @click="volver" variant="success">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                Volver
            </b-btn>
        
        </b-row>
        <b-row>
           
        </b-row>
        <b-row>
            <b-col>
                <b-row>
                    <b-col>
                        <h4>Cliente:</h4>
                    </b-col>
                    <b-col>
                        <p>{{currentUser.id_remitente.nombre}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Direccion Cliente:</h4>
                    </b-col>
                    <b-col>
                        <p>{{currentUser.id_remitente.direccion}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Centro de Costo:</h4>
                    </b-col>
                    <b-col>
                        <p>{{currentUser.id_centro.nombre}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Direccion Centro de Costo:</h4>
                    </b-col>
                    <b-col>
                        <p>{{currentUser.id_centro.direccion}}</p> 
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        <h4>Fecha Creación:</h4>
                    </b-col>
                    <b-col>
                        <p>{{currentUser.fecha_creacion | formatdate}}</p> 
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>Estado Orden de Servicio:</h4>
                    </b-col>
                    <b-col>
                        <p>{{currentUser.estado}}</p> 
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

              
        <b-row>
            <b-table :fields="fields" ref="table" :per-page="5" :current-page="currentPage" :items="this.currentUser.detalle">
                <template slot="consecutivo" slot-scope="data">
                    {{data.item.id}}
                </template>
                <template slot="productoslocal" slot-scope="data">
                    {{data.value.nombre}}         
                </template>
                <template slot="servicioslocal" slot-scope="data">
                    {{data.value.nombre}}
                </template>
                
                <template slot="editar" slot-scope="data">
                    <i class="btn btn-success fa fa-table" v-on:click.stop="actualizar(data.index,data.item.id)" v-b-modal.modalactualizar></i>
                </template>
            </b-table>
            <b-pagination size="md" :total-rows="this.currentUser.detalle.length" v-model="currentPage" :per-page="5">
            </b-pagination>
            </b-row>
            <b-row>
                <h4>Seleccione el Currier: </h4>
                <b-form-select v-model="selected_curier" class="mb-3"  :options="curiers" text-field="nombre" value-field="_id" 
                @change.native="selectcuriers" :disabled="selec_disable">
                </b-form-select>
            </b-row>
        <b-row>
            <b-btn size="lg" variant="success" @click="asignar(selected_curier)">Aceptar</b-btn>
        </b-row>
        <!-- Modal para Trayectos-->
        <b-modal id="modalactualizar" ref="ModalAct" title="Editar Registro" size="lg">
            <div slot="modal-header" class="w-100">
                <p class="float-left">Editar Registro - Numero de Movilizado {{info.detalle[indemodal].id}}</p>
            </div>
            <b-container fluid>
                
                <b-row>
                    <b-col cols="5" class="borderF">
                        <h2>
                            Remitente
                        </h2>
                        <b-row>
                            
                            <b-col>
                                <label class="col-form-label col-form-label-sm text-capitalize">
                                Nombre Remitente:
                                </label>
                            </b-col>
                            <b-col>
                                <b-row class=" col-form-label col-form-label-sm">
                                    {{info.id_remitente.nombre}}
                                </b-row>
                            </b-col>                           
                        </b-row>
                        <b-row>
                            <b-col>
                                <label class=" col-form-label col-form-label-sm text-capitalize">
                                Direccion Remitente:
                                </label>
                            </b-col>
                            <b-col>
                                <b-row class=" col-form-label col-form-label-sm">
                                    {{info.id_remitente.direccion}}
                                </b-row>
                            </b-col>
                        </b-row>   
                    </b-col>
                    <b-col cols="6" class="borderF">
                        <h2>
                            Destinatario
                        </h2>
                        <b-row>
                            <b-col>
                                <label class=" col-form-label col-form-label-sm text-capitalize">
                                Nombre Destinatario:
                                </label>
                            </b-col>
                            <b-col>
                                <b-row class=" col-form-label col-form-label-sm"> 
                                    {{info.detalle[0].detalleslocal.destinatario.nombre}}
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                 <label class=" col-form-label col-form-label-sm text-capitalize">
                                    Direccion Destinatario:
                                </label>
                            </b-col>
                            <b-col>
                                <b-row class=" col-form-label col-form-label-sm">
                                    {{info.detalle[0].detalleslocal.destinatario.direccion}}
                                </b-row>
                            </b-col>
                        </b-row>                    
                    </b-col>
                </b-row>
                <b-row >
                    <b-col>
                        <h2>
                        <label class="col-form-label col-form-label-sm text-capitalize">N° Orden de Servicio</label>
                        </h2>
                    </b-col>
                    <b-col>
                        <h2>
                        {{info.id}}
                        </h2>
                    </b-col>
                </b-row>
                    <b-row v-for="(data,indice) in inputs.campos" class="my-1 card-text"> 
                    <template v-if="data.type=='number'" >
                        <b-col cols="5">
                            <label  class="col-form-label col-form-label-sm text-capitalize" :style="data.style" >{{data.placeholder}}: </label>
                        </b-col>
                        <b-col cols="6">
                            <input class="form-control form-control-sm"  :type="data.type" :id="data.id" :style="data.style" :max="data.max"
                             @keyup="Presiono(indice,data)" :placeholder="data.placeholder" :disabled="desabilitar(data)"
                              :value="values(data.id)"  required>
                        </b-col>
                    </template>
                    <template v-if="data.type=='select'" class="my-1 card-text">
                        <b-col cols="5">
                            <label class="col-form-label col-form-label-sm text-capitalize">Seleccione el {{data.placeholder}}</label>
                        </b-col>
                        <b-col cols="6">
                            <b-form-select class="col-form-label col-form-label-sm " :id="data.id" :options="trayectos" text-field="nombre" value-field="_id" 
                             @input="seleccionar(data)" :value="valueseleccion(data,indice)" 
                             :disabled="selec_disable">
                            </b-form-select>
                        </b-col>
                    </template>

                </b-row>
            </b-container>
            <div slot="modal-footer" class="w-100">
                    <b-btn class="mt-3" variant="danger"  @click="hideModal">
                        <i class="fa fa-times-circle" aria-hidden="true">  </i>
                        Cancelar</b-btn>
                    <b-btn class="mt-3 float-right " variant="success" v-on:click="ingresarTrayectos()">
                         <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    Guardar</b-btn>

            </div>
        </b-modal>
    </b-container>
</template>

<script>
import {bus} from '../main'
import moment from 'moment'


export default {
    data(){
        return{
            id_cliente_local:null,
            selec_disable: false,
            indemodal:0,
            vali:'',
            consecutivo:'',
            camposT:[],
            inputstotales:[],
            id_trayectos:[],
            detallesactualizar: '',
            fields: [
                { key: "consecutivo", label: "N. Movilizado" },
                { key: "productoslocal", label: "Productos" },
                { key: "servicioslocal", label: "Servicios" },
                "editar",
                ],
            currentPage: 1,
            currentUser: '',
            selected_curier: null,
            curiers: '',
            Documento: '',
            selection: null,
            trayectos: null,
            indices:'',
            inputs: '',
            campos: {},
            info:{}
        }
    },
        filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    methods: {
        desabilitar(value){
             //.log(value);
            if(this.selec_disable==true){
                 //.log("desabilito todo");
                return true
            }
            else
            {
                  //.log("no desabilito  todo");
                 return value.requerido_edi
            }
        },
        valueseleccion(datos,indices){
            // //.log(this.currentUser.detalle[0].detalleslocal.infor.trayectoobj.id_trayecto);
            for(var x=0;x<this.currentUser.detalle.length;x++)
            {
                if(this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj==undefined){
                     //.log("no tiene trayectos");
                    return null
                }
                else{
                    var llaves =Object.keys(this.campos)
                   
                    return eval('this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj.'+llaves[indices])
                }
            }
            
        },
        seleccionar(value){
             //.log("entro a algo");
            var trayecto
            var trayectoobj={}
            var x = document.getElementById(value.id).value
            // //.log(this.indices);
            eval('this.campos.'+value.vmodel+'='+'x')
                    for(var x=0;x<this.trayectos.length;x++)
                    {
                        if(this.trayectos[x]._id==eval('this.campos.'+value.vmodel))
                        {

                            trayectoobj ={
                                id_trayecto:eval('this.campos.'+value.vmodel),
                                nombre:this.trayectos[x].nombre
                            }
                             //.log(this.indices);
                            // //.log(typeof(this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj));
                             //.log("----------------------");
                             //.log(this.currentUser.detalle[this.indices].detalleslocal.infor);
                            if(this.currentUser.detalle[this.indices].detalleslocal.infor.trayecto==undefined
                            ||this.currentUser.detalle[this.indices].detalleslocal.infor.trayecto==null)
                            {
                                 //.log("no tiene trayecto ");
                                this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj={}
                                this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj=trayectoobj
                                this.currentUser.detalle[this.indices].detalleslocal.infor.trayecto=this.trayectos[x].nombre
                                trayecto=this.trayectos[x].nombre
                                this.$refs.table.refresh();

                            }
                           else{
                                //.log(" tiene trayecto ");
                               this.currentUser.detalle[this.indices].detalleslocal.infor.trayectoobj=trayectoobj
                                //.log(this.currentUser.detalle[this.indices].detalleslocal.infor);
                                 this.currentUser.detalle[this.indices].detalleslocal.infor.trayecto=this.trayectos[x].nombre
                                trayecto=this.trayectos[x].nombre
                                                    this.$refs.table.refresh();

                           }
                           
                        }
                    }
                            this.$refs.table.refresh();

        },
        volver(){
            var ocultar=true
            var eliminar= this.vali
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar,eliminar 
                })
                }, )
            this.$router.replace('/inicio/consultar/resultado')

        },
        selectcuriers(value){

            this.selected_curier=value.target.value
        },
        Presiono(indi,dato){
             //.log("entro a presionar");
            if(document.getElementById(this.inputs.campos[indi].id).value==null||document.getElementById(this.inputs.campos[indi].id).value==''){
                swal(
                    'Oops...',
                    'No puede ser vacio',
                    'error'
                    )
            }else{
                
                if(document.getElementById(this.inputs.campos[indi].id).value>this.inputs.campos[indi].max){
                    //eval("this.currentUser.detalle[this.indices].detalleslocal.infor.")
                    swal(
                        'Oops...',
                        'El maximo permitido es: '+this.inputs.campos[indi].max,
                        'error'
                    )
                    document.getElementById(this.inputs.campos[indi].id).value=this.inputs.campos[indi].max
                    eval("this.campos."+document.getElementById(this.inputs.campos[indi].id).id+"="+document.getElementById(this.inputs.campos[indi].id).value)
                }else{
                    eval("this.campos."+document.getElementById(this.inputs.campos[indi].id).id+"="+document.getElementById(this.inputs.campos[indi].id).value)
                }
                
            }
            // //.log(this.campos);

        },
        values(dato){
            
            eval('this.campos.'+dato+'='+"this.currentUser.detalle[this.indices].detalleslocal.infor."+dato)
            return eval("this.currentUser.detalle[this.indices].detalleslocal.infor."+dato)
        },
        hideModal(){
            
            this.selection=''
            this.$refs.ModalAct.hide();
        },
        ingresarTrayectos(){   
            if(this.id_cliente_local!=null){
                this.$refs.ModalAct.hide();
            }else{
                // //.log(this.campos);
                this.$refs.table.refresh();
                // //.log(this.selection);  
                var nombresel
                // //.log(this.currentUser.detalle[this.indices].detalleslocal.infor);
                if(this.info.estado=="orden de servicio cancelada")
                {
                    swal(
                        "Cuidado!",
                        "Orden de Servicio Cancelada",
                        "warning"
                    );            }
                else{
                        this.selection=this.campos.id_trayecto
                        for(var x=0;x<this.trayectos.length;x++)
                        {
                            if(this.trayectos[x]._id==this.selection)
                            {
                                 //.log("saco el nombre");
                                nombresel=this.trayectos[x].nombre
                            }
                        }
                        var prueba =this.currentUser.detalle[this.indices].detalleslocal.infor
                        // //.log(prueba);

                        var objeto = {
                            id_trayecto:this.selection,
                            nombre:nombresel,
                            campos:this.campos
                        }; 
                        
                        
                        this.$refs.table.refresh();

                        // //.log(objeto);
                    /*
                        for(var x=0;x<this.currentUser.detalle.length;x++)
                        {  
                            if(this.currentUser.detalle[x].id==this.consecutivo)
                            {   

                                this.currentUser.detalle[x].detalleslocal.infor.id_trayecto=this.selection
                            }
                            
                        }
                        */
                        
                        
                        this.axios
                            .post("/api/ActualizarTrayecto/"+this.currentUser._id+"/"+this.consecutivo, objeto)
                            .then(response => {
                            });
                        
                        this.$refs.table.refresh();
                        var objeto2 = {
                            id_trayecto:this.selection,
                            campos:this.campos,
                            indice:this.indices,
                            detalle:this.currentUser.detalle[this.indices].id
                        }; 
                        if(this.id_trayectos.length==0)
                        {
                            this.id_trayectos.push(objeto2)

                        }
                        else
                        {
                            this.id_trayectos.forEach((obj,ind)=>{
                                 //.log(obj);
                                if(obj.indice==this.indices){
                                    this.id_trayectos.splice(obj,1)
                                    this.id_trayectos.push(objeto2)
                                
                                     //.log(this.id_trayectos);
                                }
                                else
                                {
                                     //.log("se agrega");
                                    this.id_trayectos.push(objeto2)
                                }
                            })
                        }
                        this.$refs.table.refresh();
                        this.selection=''
                        

                        this.$refs.ModalAct.hide();
                    }
                    
                
                
                    

            }
                
        },
        asignarcurier(seleccionado)
        {

            if(seleccionado==''||seleccionado=='null'||seleccionado==null){
                    seleccionado='null'
                    }
                    var obj ={
                        id_orden:this.currentUser._id,
                        id_curier: seleccionado
                    }

                    
                    this.axios
                        .post("/api/AsignarOrdenCurrier/",obj)
                        .then(response => {
                        this.Documento = response.data;
                        if(this.Documento.validacion==false){
                        swal(
                            "Cuidado!",
                            "" + this.Documento.message,
                            "warning"
                        );
                        }
                        else{
                            swal(
                            "Excelente!",
                            "" + this.Documento.message,
                            "success"
                        );
                        }
        
                        });
        },
        asignar(seleccionado)
        {
             //.log(this.id_cliente_local);
            if(this.id_cliente_local!=null){
                 //.log("tiene algo");
                var ocultar=true
                    var eliminar= this.vali
                    setTimeout(() => {
                        bus.$emit('ocultar', {
                            ocultar,eliminar 
                        })
                        }, )
                //this.$router.go(-1)
                this.$router.replace('/inicio/consultar/resultado')
            }else{
                
                 //.log("entro a asignar");
                    var banderasinT=false
                    var banderaconT=false
                    var contador=0
                    var pendi=[
                        
                    ]

                    var correcto=[]
                    // //.log(this.currentUser.detalle);
                    // //.log(this.id_trayectos);
                    if(this.id_trayectos.length==0){
                         //.log("no ingreso nda");
                        for(var x=0;x<this.currentUser.detalle.length;x++){
                            // //.log(this.currentUser.detalle[x].detalleslocal.infor);
                            
                            var llavesinfor=Object.keys(this.currentUser.detalle[x].detalleslocal.infor)
                            for(var y=0;y<llavesinfor.length;y++)
                            {   
                                
                                if(typeof(eval('this.currentUser.detalle[x].detalleslocal.infor.'+llavesinfor[y]))!='object')
                                {
                                     //.log("entrooo");
                                    // //.log(x);
                                
                                }
                                else{
                                    banderasinT=true
                                    contador=contador+1
                                     //.log();
                                    correcto.push(x)
                                } 
                            }
                            pendi.push(x)
                        }
                    }
                    else{
                         //.log("hay trayectos");
                         //.log(this.id_trayectos);
                        for(var x=0;x<this.currentUser.detalle.length;x++){
                             //.log(this.currentUser.detalle[x].detalleslocal.infor);
                            var llavesinfor=Object.keys(this.currentUser.detalle[x].detalleslocal.infor)
                            for(var y=0;y<llavesinfor.length;y++)
                            {   
                                if(typeof(eval('this.currentUser.detalle[x].detalleslocal.infor.'+llavesinfor[y]))!='object')
                                {
                                     //.log("entrooo");

                                }
                                else{
                                    banderasinT=true
                                    contador=contador+1
                                    correcto.push(x)
                                } 
                            }
                            pendi.push(x)
                        }
                    }
                    for(var o=0;o<pendi.length;o++)
                    {
                        // //.log(pendi[o]);
                        //
                        
                        pendi[o]=pendi[o]++
                        for(var p=0;p<correcto.length;p++)
                        {
                            
                            if(pendi[o]==correcto[p]){
                                 //.log("son iguales");
                                
                                pendi.splice(o,1)
                                 //.log(pendi);
                            }
                        }
                    }
                    for(var o=0;o<pendi.length;o++)
                    {
                        pendi[o]++
                    }
                    // //.log(banderasinT)
                    // //.log(banderaconT);
                    // //.log(contador);
                     //.log(pendi);
                     //.log(correcto);
                    if(contador==this.currentUser.detalle.length){
                         //.log("todos andan completos");
                        this.asignarcurier(seleccionado)
                    }else{
                         //.log("no andan completos")
                        swal(
                                "Falta algo por completar!",
                                "Revisa por favor "+pendi,
                                "error"
                            );
                    }
            }
            
                /*
                var bandera=false
                var pendientes,llaves
                this.currentUser.detalle.map((obj,ind)=>{
                    
                    this.inputstotales[ind].campos.map((objinput,indi)=>{
                        // //.log(Object.keys(eval('obj.detalleslocal.infor')));
                        
                        if(objinput.requerido_edi==true)
                        {
                            if(eval('obj.detalleslocal.infor.'+objinput.vmodel)==''||
                                eval('obj.detalleslocal.infor.'+objinput.vmodel)==null||
                                eval('obj.detalleslocal.infor.'+objinput.vmodel)==undefined)

                            {
                                bandera=false
                                pendientes=ind+1

                            }
                            else
                            {
                                // //.log("anda completo todo");
                                bandera=true
                            }
                        }
                        else
                        {
                            // //.log("no se exige");
                        }
                        
                    })
                }) 
                var bandera2=false
                var bandera3=false
                this.currentUser.detalle.some((obj,ind)=>{
                     //.log(obj.detalleslocal.infor);
                    llaves=Object.keys(eval('obj.detalleslocal.infor'))
                        // //.log(obj);
                        llaves.map((objlla,ind)=>{
                            // //.log("---------------");
                            // //.log(objlla);
                            if(typeof(eval('obj.detalleslocal.infor.'+objlla))=='object')
                            {
                                 //.log("hay un ojeto");

                                bandera2=true
                            }
                            else{
                                 //.log("no hay un objeto");
                            }

                        })
            
            })

                if(bandera==true&&bandera2==false)
                {
                     //.log("hacemos peticion");
                    this.asignarcurier(seleccionado)
                }
                else
                {
                     //.log("no hacemos peticion");
                    swal(
                        "Falta algo por completar!",
                        "Revisa el detalle "+pendientes,
                        "error"
                    );
                }*/
        },
        actualizar(indice,consecutivo){
            this.indemodal=indice
            this.consecutivo=consecutivo
            var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Trayecto' };
            // //.log(this.info.estado);
            if(this.info.estado=='orden de servicio cancelada'||this.info.estado=='Orden De Servicio Recogida'||this.info.estado=='Orden de servicio cerrada')
            {
                this.indices=indice
                this.detallesactualizar= this.currentUser.detalle[indice].detalleslocal
                var produc= this.currentUser.detalle[indice].productoslocal._id
                var serv = this.currentUser.detalle[indice].servicioslocal._id
                this.axios.get("/api/estructuraf/" +produc +
                "/" +serv)   
                .then(response => {
                this.inputs = response.data;
                this.campos= response.data.objeto
                for(var i=0;i<this.inputs.campos.length;i++){
                    this.inputs.campos[i].diseable='true'
                    if(this.inputs.campos[i].type=='select'){
                        var login = localStorage.getItem("storedData");
                        var infologin = JSON.parse(login);
                        document.getElementById(this.inputs.campos[i].id).value=null
                        this.axios.get(this.inputs.campos[i].urlobjeto+infologin.id_OperadorLogistico)   
                        .then(response => {
                        this.trayectos = response.data;
                        this.trayectos.unshift(vacio)

                        })
                    }else{
                    }
                }
                }).catch(function(error){
                })
            }
            else
            {
                this.indices=indice
                this.detallesactualizar= this.currentUser.detalle[indice].detalleslocal
                var produc= this.currentUser.detalle[indice].productoslocal._id
                var serv = this.currentUser.detalle[indice].servicioslocal._id
                this.axios.get("/api/estructuraf/" +produc +
                "/" +serv)   
                .then(response => {
                this.inputs = response.data;
                this.campos= response.data.objeto
                for(var i=0;i<this.inputs.campos.length;i++){
                    if(this.inputs.campos[i].type=='select'){
                        var login = localStorage.getItem("storedData");
                        var infologin = JSON.parse(login);
                        this.axios.get(this.inputs.campos[i].urlobjeto+infologin.id_OperadorLogistico)   
                        .then(response => {
                        this.trayectos = response.data;
                        this.trayectos.unshift(vacio)
                        })
                    }else{
                    }
                }
                }).catch(function(error){
                })
            }
            // //.log(this.currentUser.detalle[indice].detalleslocal.infor.trayectoobj)

        }
    },
    watch: {
      currentUser (n, o) {
          
      },
    selection(n,o){
    },

  },
      mounted: function () {
           //.log("montado");
       bus.$on('ocultar', function (userObject) {
        
        this.ocultar = userObject.ocultar
      }.bind(this))
       var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        // //.log(infologin.id_cliente);
        var id_cliente
        
        if(infologin.id_cliente==undefined||infologin.id_cliente==null){
            // //.log("no hay cliente");
        }
        else{
            // //.log("hay cliente");
            this.selec_disable=true
            this.id_cliente_local=infologin.id_cliente

        }
    },
    created: function(){

    }, 
    beforeCreate: function() {
        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Cliente' };
        var x=0
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        this.axios
        .get(
            "/api/UsuariosCurier/"+infologin.id_OperadorLogistico 
        )
        .then(response => {
            this.curiers = response.data;
            this.curiers.unshift(vacio)

        });

        bus.$on('thisEvent', function (userObject) {
        this.currentUser = userObject.inde.item
         //.log(this.currentUser);
        if(this.currentUser.id_courier=="000000000000000000000000"){
            this.selected_curier=null
        }
        else{
            this.selected_curier=this.currentUser.id_courier
        }
        this.vali=userObject.inde
        this.info=this.currentUser
        this.inputstotales=userObject.inputstotales
        }.bind(this))
    }
}



</script>

<style>
.conta {
    padding: 3%
}
.borderF {
    border: 1px solid #DCDCDC;
    margin: 1%
}
</style>
