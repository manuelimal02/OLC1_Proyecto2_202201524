"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const Arbol_1 = __importDefault(require("./Analizador/Simbolo/Arbol"));
const TablaSimbolo_1 = __importDefault(require("./Analizador/Simbolo/TablaSimbolo"));
class Controller {
    prueba(req, res) {
        res.json({ "funciona": "la api" });
    }
    interpretar(req, res) {
        try {
            let parser = require('./Analizador/LexicoSintactico');
            let ArbolAst = new Arbol_1.default(parser.parse(req.body.entrada));
            let Tabla_Simbolos = new TablaSimbolo_1.default();
            Tabla_Simbolos.setNombre("Ejemplo1");
            ArbolAst.setTablaGlobal(Tabla_Simbolos);
            ArbolAst.setConsola("");
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos);
            }
            console.log(Tabla_Simbolos);
            //console.log("-----------------")
            //console.log(ArbolAst)
            res.send({ "Respuesta": ArbolAst.getConsola() });
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "Ya no sale compi1" });
        }
    }
}
exports.indexController = new Controller();
