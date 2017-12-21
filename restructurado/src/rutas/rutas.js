import InicioComponent from '../componentes/login.vue'
import NavComponent from '../componentes/nav.vue'
import InicializaComponent from '../componentes/inicializacion.vue'
import OrdenComponent from '../componentes/orden.vue'
import OrdenServiceComponent from '../componentes/ordenservicio.vue'
import ConsultComponent from '../componentes/filtrado.vue'
import DetailComponent from '../componentes/detalles.vue'
import ResultComponent from '../componentes/resultado.vue'


export const rutas = [    
    {
        path: '/',
        component: InicioComponent,
    },
    {
        path: '/inicio/',
        component: NavComponent,
        children:[
            {
                path: '',  component: InicializaComponent,    
                
            },
            {
                path: 'orden',  component: OrdenComponent,    
                
            },
            {
                path: 'ordenservicio',  component: OrdenServiceComponent,    
                
            },
            {
                path: 'consultar',  component: ConsultComponent,props: true,
                children:[
                    {
                        path: '',  component: InicializaComponent,  props: true,  
                        
                    },
                    {
                        path: 'resultado',  component: ResultComponent,  props: true,  
                        
                    },      
                    {
                        path: 'detalles',  component: DetailComponent,  props: true,  
                        
                    },             
   
                ]                    
            },
            
        ]
    },     
    ]    