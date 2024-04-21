"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return this.valor;
    }
    obtener_ast(anterior) {
        let contador = Singleton_1.default.getInstancia();
        let nodoNativo = `n${contador.get()}`;
        let nodoValor = `n${contador.get()}`;
        let resultado = `${nodoNativo}[label=\"NATIVO\"];\n`;
        resultado += `${nodoValor}[label=\"${this.valor}\"];\n`;
        resultado += `${nodoNativo}->${nodoValor};\n`;
        resultado += `${anterior}->${nodoNativo};\n`;
        return resultado;
    }
}
exports.default = Nativo;
