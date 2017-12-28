import InicioComponent from '../componentes/login.vue'
import NavComponent from '../componentes/nav.vue'
import InicializaComponent from '../componentes/inicializacion.vue'
import OrdenComponent from '../componentes/orden.vue'
import OrdenServiceComponent from '../componentes/ordenservicio.vue'
import ConsultComponent from '../componentes/filtrado.vue'
import DetailComponent from '../componentes/detalles.vue'
import ResultComponent from '../componentes/resultado.vue'
import preloadComponent from '../componentes/preload.vue'
import ConsultTraceComponent from '../componentes/filtradoTraza.vue'
import ListadoComponent from '../componentes/listadoTraza.vue'
import NotFoundComponent from '../componentes/NotFound.vue'


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
                    {
                        path:'*',
                        redirect: '/404'
                    }        
   
                ]                    
            },
            {
                path: 'trazabilidad',
                component: ConsultTraceComponent, props: true,
                children:[
                    {
                        path: '',  component: InicializaComponent,  props: true,  
                        
                    },
                    {
                        path: 'listado',  component: ListadoComponent,  props: true,  
                        
                    },
                    {
                        path:'*',
                        redirect: '/404'
                    } 
                ]
            },
            
        ]
    }, 
    {
        path: '/404',
        component: NotFoundComponent
    },
 
    ]    