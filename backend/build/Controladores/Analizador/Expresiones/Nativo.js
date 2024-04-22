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
        let nativo_node = `n${contador.getContador()}`;
        let valor_node = `n${contador.getContador()}`;
        let dot = `${nativo_node}[label=\"NATIVO\"];\n`;
        dot += `${valor_node}[label=\"${this.valor}\"];\n`;
        dot += `${nativo_node}->${valor_node};\n`;
        dot += `${anterior}->${nativo_node};\n`;
        return dot;
    }
}
exports.default = Nativo;
