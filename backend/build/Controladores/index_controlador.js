"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const Arbol_1 = __importDefault(require("./Analizador/ArbolAst/Arbol"));
const TablaSimbolo_1 = __importDefault(require("./Analizador/ArbolAst/TablaSimbolo"));
const Metodo_1 = __importDefault(require("./Analizador/Subrutina/Metodo"));
const Declaracion_1 = __importDefault(require("./Analizador/Instrucciones/Declaracion"));
const Execute_1 = __importDefault(require("./Analizador/Subrutina/Execute"));
const path = __importStar(require("path"));
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
    interpretar_entrada(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let ast = new Arbol_1.default(parser.parse(req.body.entrada));
            let tabla = new TablaSimbolo_1.default();
            tabla.setNombre("Ejemplo1");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            let execute = null;
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo_1.default) {
                    i.identificador = i.identificador.toLocaleLowerCase();
                    ast.addFunciones(i);
                }
                if (i instanceof Declaracion_1.default) {
                    i.interpretar(ast, tabla);
                }
                if (i instanceof Execute_1.default) {
                    execute = i;
                }
            }
            if (execute != null) {
                execute.interpretar(ast, tabla);
                //manejo de errores
            }
            console.log(tabla);
            res.send({ "Respuesta": ast.getConsola() });
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "REVISAR LA ENTRADA" });
        }
    }
    generar_reporte_errores(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let ArbolAst = new Arbol_1.default(parser.parse(req.body.entrada));
            let Tabla_Simbolos = new TablaSimbolo_1.default();
            Tabla_Simbolos.setNombre("Tabla Global");
            ArbolAst.setTablaGlobal(Tabla_Simbolos);
            ArbolAst.agregarTabla(Tabla_Simbolos);
            ArbolAst.setConsola("");
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos);
            }
            ArbolAst.generarReporteErrores();
            res.sendFile(path.resolve('ReporteErrores.html'));
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "Error Al Generar Reporte De Errores." });
        }
    }
    generar_reporte_tablas(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let ArbolAst = new Arbol_1.default(parser.parse(req.body.entrada));
            let Tabla_Simbolos = new TablaSimbolo_1.default();
            Tabla_Simbolos.setNombre("Tabla Global");
            ArbolAst.setTablaGlobal(Tabla_Simbolos);
            ArbolAst.agregarTabla(Tabla_Simbolos);
            ArbolAst.setConsola("");
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos);
            }
            ArbolAst.generarReporteTablas();
            res.sendFile(path.resolve('ReporteTablas.html'));
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "Error Al Generar Reporte De Tablas De Simbolos." });
        }
    }
}
exports.indexController = new Controller();
