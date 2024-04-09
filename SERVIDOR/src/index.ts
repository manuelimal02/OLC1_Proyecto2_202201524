import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRouter from './Rutas/index_ruta';

class servidor {
    public aplicacion: Application;

    constructor() {
        this.aplicacion = express();
        this.configuracion();
        this.rutas();
    }

    configuracion(): any {
        this.aplicacion.set('port', process.env.PORT || 4000);
        this.aplicacion.use(morgan('dev'));
        this.aplicacion.use(express.urlencoded({ extended: false }));
        this.aplicacion.use(express.json());
        this.aplicacion.use(express.json({ limit: '50mb' }));
        this.aplicacion.use(express.urlencoded({ limit: '50mb' }));
        this.aplicacion.use(cors());
        this.aplicacion.use(bodyParser.urlencoded({ extended: true }));
    }

    rutas(): void {
        this.aplicacion.use('/', indexRouter);
    }

    start(): void {
        this.aplicacion.listen(this.aplicacion.get('port'), () => {
            console.log('Server on port:', this.aplicacion.get('port'));
        }
        )
    }

}

export const server = new servidor();
server.start();