import { Router } from 'express'
import { indexController } from '../Controladores/index_controlador'

class router {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.prueba);
        /*
        this.router.post('/post', indexController.metodoPost);
        this.router.post('/analizar', indexController.Analizar);
        */
    }
}

const indexRouter = new router();
export default indexRouter.router; 