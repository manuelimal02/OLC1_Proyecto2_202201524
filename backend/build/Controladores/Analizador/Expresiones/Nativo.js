"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return this.valor;
    }
}
exports.default = Nativo;
