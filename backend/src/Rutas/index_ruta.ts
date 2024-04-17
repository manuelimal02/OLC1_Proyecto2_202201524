import { Router } from 'express'
import { indexController } from '../Controladores/index_controlador'

class router {
    public router: Router = Router();;
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/interpretar_entrada', indexController.interpretar_entrada)
        this.router.post('/generar_reporte_errores', indexController.generar_reporte_errores)
        this.router.post('/generar_reporte_tablas', indexController.generar_reporte_tablas)  
    }
}

const indexRouter = new router();
export default indexRouter.router; 