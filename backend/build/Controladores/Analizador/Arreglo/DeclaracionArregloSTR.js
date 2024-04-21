"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const SimboloA_1 = __importDefault(require("../ArbolAst/SimboloA"));
class DeclaracionArreglo extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, identificador, valor) {
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let arreglo = this.valor.interpretar(arbol, tabla);
        if (arreglo instanceof Errores_1.default)
            return arreglo;
        if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo))) {
            let error = new Errores_1.default("Semántico", "Error Al Declarar Arreglo.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error Al Declarar Arreglo.\n");
            return error;
        }
    }
    obtener_ast(anterior) {
        return "";
    }
}
exports.default = DeclaracionArreglo;
