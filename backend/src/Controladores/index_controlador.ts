import { Request, Response } from 'express';
import Arbol from './Analizador/ArbolAst/Arbol';
import TablaSimbolo from './Analizador/ArbolAst/TablaSimbolo';

import Metodo from './Analizador/Subrutina/Metodo';
import Declaracion from './Analizador/Instrucciones/Declaracion';
import Execute from './Analizador/Subrutina/Execute';
import * as path from 'path';

class Controller {

    /*public interpretar_entrada(req: Request, res: Response) {
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
            console.log(Tabla_Simbolos)
            res.send({"Respuesta": ArbolAst.getConsola()})
        } catch (err: any) {
            console.log(err)
            res.send({"Error": "Error Al Interpretar." })
        }
    }*/

    public interpretar_entrada(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new TablaSimbolo()
            tabla.setNombre("Ejemplo1")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            let execute = null;
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    i.identificador = i.identificador.toLocaleLowerCase()
                    ast.addFunciones(i)
                }
                if(i instanceof Declaracion){
                    i.interpretar(ast, tabla)
                }
                if (i instanceof Execute){
                    execute = i
                }
            }
            
            if(execute != null){
                execute.interpretar(ast,tabla)
                //manejo de errores
            }
            console.log(tabla)
            res.send({ "Respuesta": ast.getConsola() })
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "REVISAR LA ENTRADA" })
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
