"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
class Metodo extends Instruccion_1.Instruccion {
    constructor(identificador, tipo, instrucciones, fila, columna, parametro) {
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.parametro = parametro !== null && parametro !== void 0 ? parametro : [];
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        for (let instruccion of this.instrucciones) {
            let val = instruccion.interpretar(arbol, tabla);
            if (val instanceof Errores_1.default)
                return val;
        }
    }
}
exports.default = Metodo;
