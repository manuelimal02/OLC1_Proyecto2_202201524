export let lista_errores: Array<Errores>
import { Request, Response } from 'express';
import Arbol from './Analizador/ArbolAst/Arbol';
import TablaSimbolo from './Analizador/ArbolAst/TablaSimbolo';
import Metodo from './Analizador/Subrutina/Metodo';
import Declaracion from './Analizador/Instrucciones/Declaracion';
import DeclaracionArreglo from './Analizador/Arreglo/DeclaracionArreglo';
import DeclaracionMatriz from './Analizador/Matriz/DeclaracionMatriz';
import Execute from './Analizador/Subrutina/Execute';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import Errores from './Analizador/Errores/Errores';
import Singleton from './Analizador/ArbolAst/Singleton';

var ast_dot: string

class Controller {

    public interpretar_entrada(req: Request, res: Response) {
        try {
            lista_errores = new Array<Errores>
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
                for (let i of lista_errores){
                    Arbol_Ast.setConsola(i.getTipoError()+": "+ i.getDescripcion()+ "\n")
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
            lista_errores = new Array<Errores>
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
                for (let i of lista_errores){
                    let error = new Errores(i.getTipoError().toString(),  i.getDescripcion().toString(), i.getFila(), i.getColumna())
                    Arbol_Ast.agregarError(error);
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

    public generar_reporte_arbol(req: Request, res: Response) {
        try {
            ast_dot=""
            let parser = require('./Analizador/LexicoSintactico')
            let Arbol_Ast = new Arbol(parser.parse(req.body.entrada))
            let Nueva_Tabla = new TablaSimbolo()
            Nueva_Tabla.setNombre("Tabla Global")
            Arbol_Ast.setTablaGlobal(Nueva_Tabla)
            Arbol_Ast.agregarTabla(Nueva_Tabla)
            
            let contador = Singleton.getInstancia()
            let dot = "digraph ast{\n"
            dot += "label=\"Carlos Manuel Lima Y Lima\""
            dot += "fontname=\"Courier New\""
            dot += "node [\n"
            dot += "shape = doublecircle\n"
            dot += "style = filled\n"
            dot += "width = 1.0\n"
            dot += "color = \"#ed695a\"\n"
            dot += "]\n"
            dot += "nINICIO[label=\"INICIO\"];\n"
            dot += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n"
            dot += "nINICIO->nINSTRUCCIONES;\n"
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Errores) continue
                let nodo = `n${contador.getContador()}`
                dot += `${nodo}[label=\"INSTRUCCION\"];\n`
                dot += `nINSTRUCCIONES->${nodo};\n`
                dot += i.obtener_ast(nodo)
            }
            dot += "\n}"
        ast_dot = dot
        fs.writeFileSync('ReporteArbol.dot', dot);
        exec('dot -Tpdf ReporteArbol.dot -o ReporteArbol.pdf', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            res.sendFile(path.resolve('ReporteArbol.pdf'));
        });
        } catch (err: any) {
            res.send({ "Error": "Error Al Generar Reporte." })
        }
    }
}

export const indexController = new Controller();
