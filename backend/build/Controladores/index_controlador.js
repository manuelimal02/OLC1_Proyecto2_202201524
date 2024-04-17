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
const Arbol_1 = __importDefault(require("./Analizador/Simbolo/Arbol"));
const TablaSimbolo_1 = __importDefault(require("./Analizador/Simbolo/TablaSimbolo"));
const path = __importStar(require("path"));
class Controller {
    interpretar_entrada(req, res) {
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
            res.send({ "Respuesta": ArbolAst.getConsola() });
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "Error Al Interpretar." });
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
