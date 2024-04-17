import { Request, Response } from 'express';
import Arbol from './Analizador/Simbolo/Arbol';
import TablaSimbolo from './Analizador/Simbolo/TablaSimbolo';
import * as path from 'path';

class Controller {

    public interpretar_entrada(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let ArbolAst = new Arbol(parser.parse(req.body.entrada))
            let Tabla_Simbolos = new TablaSimbolo()
            Tabla_Simbolos.setNombre("Tabla Global")
            ArbolAst.setTablaGlobal(Tabla_Simbolos)
            ArbolAst.agregarTabla(Tabla_Simbolos)
            ArbolAst.setConsola("")
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos)
            }
            res.send({"Respuesta": ArbolAst.getConsola()})
        } catch (err: any) {
            console.log(err)
            res.send({"Error": "Error Al Interpretar." })
        }
    }
    
    public generar_reporte_errores(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let ArbolAst = new Arbol(parser.parse(req.body.entrada))
            let Tabla_Simbolos = new TablaSimbolo()
            Tabla_Simbolos.setNombre("Tabla Global")
            ArbolAst.setTablaGlobal(Tabla_Simbolos)
            ArbolAst.agregarTabla(Tabla_Simbolos)
            ArbolAst.setConsola("")
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos)
            }
            ArbolAst.generarReporteErrores()
            res.sendFile(path.resolve('ReporteErrores.html'));
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Error Al Generar Reporte De Errores." })
        }
    }

    public generar_reporte_tablas(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let ArbolAst = new Arbol(parser.parse(req.body.entrada))
            let Tabla_Simbolos = new TablaSimbolo()
            Tabla_Simbolos.setNombre("Tabla Global")
            ArbolAst.setTablaGlobal(Tabla_Simbolos)
            ArbolAst.agregarTabla(Tabla_Simbolos)
            ArbolAst.setConsola("")
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos)
            }
            ArbolAst.generarReporteTablas()
            res.sendFile(path.resolve('ReporteTablas.html'));
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Error Al Generar Reporte De Tablas De Simbolos." })
        }
    }
}

export const indexController = new Controller();
