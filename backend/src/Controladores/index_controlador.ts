import { Request, Response } from 'express';
import Arbol from './Analizador/ArbolAst/Arbol';
import TablaSimbolo from './Analizador/ArbolAst/TablaSimbolo';
import Metodo from './Analizador/Subrutina/Metodo';
import Declaracion from './Analizador/Instrucciones/Declaracion';
import DeclaracionArreglo from './Analizador/Arreglo/DeclaracionArreglo';
import DeclaracionMatriz from './Analizador/Matriz/DeclaracionMatriz';
import Execute from './Analizador/Subrutina/Execute';
import * as path from 'path';
import Errores from './Analizador/Errores/Errores';

class Controller {

    public interpretar_entrada(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let Arbol_Ast = new Arbol(parser.parse(req.body.entrada))
            let Nueva_Tabla = new TablaSimbolo()
            Nueva_Tabla.setNombre("Tabla Global")
            Arbol_Ast.setTablaGlobal(Nueva_Tabla)
            Arbol_Ast.setConsola("")
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    i.id = i.id.toLocaleLowerCase()
                    Arbol_Ast.addFunciones(i)
                }
                if(i instanceof Declaracion){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof DeclaracionArreglo){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof DeclaracionMatriz){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof Execute){
                    execute = i
                }
                if (i instanceof Errores){
                    Arbol_Ast.agregarError(i)
                }
            }
            if(execute != null){
                execute.interpretar(Arbol_Ast, Nueva_Tabla)
            }
            res.send({ "Respuesta": Arbol_Ast.getConsola() })
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Error En La Entrada." })
        }
    }
    
    public generar_reporte_tablas(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let Arbol_Ast = new Arbol(parser.parse(req.body.entrada))
            let Nueva_Tabla = new TablaSimbolo()
            Nueva_Tabla.setNombre("Tabla Global")
            Arbol_Ast.setTablaGlobal(Nueva_Tabla)
            Arbol_Ast.agregarTabla(Nueva_Tabla)
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    i.id = i.id.toLocaleLowerCase()
                    Arbol_Ast.addFunciones(i)
                }
                if(i instanceof Declaracion){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof DeclaracionArreglo){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof DeclaracionMatriz){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof Execute){
                    execute = i
                }
                if (i instanceof Errores){
                    Arbol_Ast.agregarError(i)
                }
            }
            if(execute != null){
                execute.interpretar(Arbol_Ast, Nueva_Tabla)
                if (execute instanceof Errores){
                    Arbol_Ast.agregarError(execute)
                }
            }
            Arbol_Ast.generarReporteTablas()
            res.sendFile(path.resolve('ReporteTablas.html'));
        } catch (err: any) {
            res.send({ "Error": "Error Al Generar Reporte." })
        }
    }

    public generar_reporte_errores(req: Request, res: Response) {
        try {
            let parser = require('./Analizador/LexicoSintactico')
            let Arbol_Ast = new Arbol(parser.parse(req.body.entrada))
            let Nueva_Tabla = new TablaSimbolo()
            Nueva_Tabla.setNombre("Tabla Global")
            Arbol_Ast.setTablaGlobal(Nueva_Tabla)
            Arbol_Ast.agregarTabla(Nueva_Tabla)
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    i.id = i.id.toLocaleLowerCase()
                    Arbol_Ast.addFunciones(i)
                }
                if(i instanceof Declaracion){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof DeclaracionArreglo){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof DeclaracionMatriz){
                    i.interpretar(Arbol_Ast, Nueva_Tabla)
                }
                if (i instanceof Execute){
                    execute = i
                }
                if (i instanceof Errores){
                    Arbol_Ast.agregarError(i)
                }
            }
            if(execute != null){
                execute.interpretar(Arbol_Ast, Nueva_Tabla)
                if (execute instanceof Errores){
                    Arbol_Ast.agregarError(execute)
                }
            }
            Arbol_Ast.generarReporteErrores()
            res.sendFile(path.resolve('ReporteErrores.html'));
        } catch (err: any) {
            res.send({ "Error": "Error Al Generar Reporte." })
        }
    }
}

export const indexController = new Controller();
