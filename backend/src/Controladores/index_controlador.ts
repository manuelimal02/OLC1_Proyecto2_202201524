import { Request, Response } from 'express';
import Arbol from './Analizador/Simbolo/Arbol';
import TablaSimbolo from './Analizador/Simbolo/TablaSimbolo';

class Controller {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public interpretar(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let ArbolAst = new Arbol(parser.parse(req.body.entrada))
            let Tabla_Simbolos = new TablaSimbolo()
            Tabla_Simbolos.setNombre("Ejemplo1")
            ArbolAst.setTablaGlobal(Tabla_Simbolos)
            ArbolAst.setConsola("")
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos)
            }
            console.log(Tabla_Simbolos)
            res.send({ "Respuesta": ArbolAst.getConsola()})
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Ya no sale compi1" })
        }
    }
}

export const indexController = new Controller();
