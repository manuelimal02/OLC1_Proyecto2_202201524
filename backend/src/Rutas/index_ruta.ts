import { Router } from 'express'
import { indexController } from '../Controladores/index_controlador'

class router {
    public router: Router = Router();;
    constructor() {
        this.config();
    }


    config(): void {
        this.router.post('/interpretar', indexController.interpretar)
        this.router.post('/generarReporte', indexController.generarReporte) 
    }
}

const indexRouter = new router();
export default indexRouter.router; 