import { Request, Response } from 'express';

class Controller {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public interpretar(req: Request, res: Response) {
        try {
            const parser = require('./Analizador/LexicoSintactico');
            
            const arbol = parser.parse(req.body.entrada);
            console.log("-------------------");
            arbol.imprimirNodos();
            console.log("-------------------");
            res.send({ "Respuesta": "Interpretado"});
        } catch (err: any) {
            console.log(err);
            res.send({ "Error": "Error al interpretar" });
        }
    }
}

export const indexController = new Controller();
