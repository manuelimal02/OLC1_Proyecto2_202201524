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
const DeclaracionArreglo_1 = __importDefault(require("./Analizador/Arreglo/DeclaracionArreglo"));
const DeclaracionMatriz_1 = __importDefault(require("./Analizador/Matriz/DeclaracionMatriz"));
const Execute_1 = __importDefault(require("./Analizador/Subrutina/Execute"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const Errores_1 = __importDefault(require("./Analizador/Errores/Errores"));
const Singleton_1 = __importDefault(require("./Analizador/ArbolAst/Singleton"));
var ast_dot;
class Controller {
    interpretar_entrada(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let Arbol_Ast = new Arbol_1.default(parser.parse(req.body.entrada));
            let Nueva_Tabla = new TablaSimbolo_1.default();
            Nueva_Tabla.setNombre("Tabla Global");
            Arbol_Ast.setTablaGlobal(Nueva_Tabla);
            Arbol_Ast.setConsola("");
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo_1.default) {
                    i.id = i.id.toLocaleLowerCase();
                    Arbol_Ast.addFunciones(i);
                }
                if (i instanceof Declaracion_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionArreglo_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionMatriz_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof Execute_1.default) {
                    execute = i;
                }
                if (i instanceof Errores_1.default) {
                    Arbol_Ast.agregarError(i);
                }
            }
            if (execute != null) {
                execute.interpretar(Arbol_Ast, Nueva_Tabla);
            }
            res.send({ "Respuesta": Arbol_Ast.getConsola() });
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "Error En La Entrada." });
        }
    }
    generar_reporte_tablas(req, res) {
        try {
            ast_dot = "";
            let parser = require('./Analizador/LexicoSintactico');
            let Arbol_Ast = new Arbol_1.default(parser.parse(req.body.entrada));
            let Nueva_Tabla = new TablaSimbolo_1.default();
            Nueva_Tabla.setNombre("Tabla Global");
            Arbol_Ast.setTablaGlobal(Nueva_Tabla);
            Arbol_Ast.agregarTabla(Nueva_Tabla);
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo_1.default) {
                    i.id = i.id.toLocaleLowerCase();
                    Arbol_Ast.addFunciones(i);
                }
                if (i instanceof Declaracion_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionArreglo_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionMatriz_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof Execute_1.default) {
                    execute = i;
                }
                if (i instanceof Errores_1.default) {
                    Arbol_Ast.agregarError(i);
                }
            }
            if (execute != null) {
                execute.interpretar(Arbol_Ast, Nueva_Tabla);
                if (execute instanceof Errores_1.default) {
                    Arbol_Ast.agregarError(execute);
                }
            }
            Arbol_Ast.generarReporteTablas();
            res.sendFile(path.resolve('ReporteTablas.html'));
        }
        catch (err) {
            res.send({ "Error": "Error Al Generar Reporte." });
        }
    }
    generar_reporte_errores(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let Arbol_Ast = new Arbol_1.default(parser.parse(req.body.entrada));
            let Nueva_Tabla = new TablaSimbolo_1.default();
            Nueva_Tabla.setNombre("Tabla Global");
            Arbol_Ast.setTablaGlobal(Nueva_Tabla);
            Arbol_Ast.agregarTabla(Nueva_Tabla);
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo_1.default) {
                    i.id = i.id.toLocaleLowerCase();
                    Arbol_Ast.addFunciones(i);
                }
                if (i instanceof Declaracion_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionArreglo_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionMatriz_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof Execute_1.default) {
                    execute = i;
                }
                if (i instanceof Errores_1.default) {
                    Arbol_Ast.agregarError(i);
                }
            }
            if (execute != null) {
                execute.interpretar(Arbol_Ast, Nueva_Tabla);
                if (execute instanceof Errores_1.default) {
                    Arbol_Ast.agregarError(execute);
                }
            }
            Arbol_Ast.generarReporteErrores();
            res.sendFile(path.resolve('ReporteErrores.html'));
        }
        catch (err) {
            res.send({ "Error": "Error Al Generar Reporte." });
        }
    }
    generar_reporte_arbol(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let Arbol_Ast = new Arbol_1.default(parser.parse(req.body.entrada));
            let Nueva_Tabla = new TablaSimbolo_1.default();
            Nueva_Tabla.setNombre("Tabla Global");
            Arbol_Ast.setTablaGlobal(Nueva_Tabla);
            Arbol_Ast.agregarTabla(Nueva_Tabla);
            let execute = null;
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Metodo_1.default) {
                    i.id = i.id.toLocaleLowerCase();
                    Arbol_Ast.addFunciones(i);
                }
                if (i instanceof Declaracion_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionArreglo_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof DeclaracionMatriz_1.default) {
                    i.interpretar(Arbol_Ast, Nueva_Tabla);
                }
                if (i instanceof Execute_1.default) {
                    execute = i;
                }
                if (i instanceof Errores_1.default) {
                    Arbol_Ast.agregarError(i);
                }
            }
            let contador = Singleton_1.default.getInstancia();
            let cadena = "digraph ast{\n";
            cadena += "nINICIO[label=\"INICIO\"];\n";
            cadena += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n";
            cadena += "nINICIO->nINSTRUCCIONES;\n";
            for (let i of Arbol_Ast.getInstrucciones()) {
                if (i instanceof Errores_1.default)
                    continue;
                let nodo = `n${contador.get()}`;
                cadena += `${nodo}[label=\"INSTRUCCION\"];\n`;
                cadena += `nINSTRUCCIONES->${nodo};\n`;
                cadena += i.obtener_ast(nodo);
            }
            cadena += "\n}";
            ast_dot = cadena;
            fs.writeFileSync('ReporteArbol.dot', cadena);
            (0, child_process_1.exec)('dot -Tpdf ReporteArbol.dot -o ReporteArbol.pdf', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
            res.sendFile(path.resolve('ReporteArbol.pdf'));
        }
        catch (err) {
            res.send({ "Error": "Error Al Generar Reporte." });
        }
    }
}
exports.indexController = new Controller();
