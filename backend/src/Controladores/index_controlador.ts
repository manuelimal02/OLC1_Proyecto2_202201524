import { Request, Response } from 'express';
import Arbol from './Analizador/Simbolo/Arbol';
import TablaSimbolo from './Analizador/Simbolo/TablaSimbolo';
import * as path from 'path';
import * as fs from 'fs';

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
    public generarReporte(req: Request, res: Response) {
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
            ArbolAst.generarReporteErrores()
            res.sendFile(path.resolve('reporteErrores.html'));
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Hubo un error al generar el reporte de errores" })
        }
    }
}

export const indexController = new Controller();
