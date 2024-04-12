"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Simbolo_1 = __importDefault(require("../Simbolo/Simbolo"));
const Tipo_1 = require("../Simbolo/Tipo");
class ToLowerCase extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, id, valor) {
        super(tipo, fila, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valor_variable;
        valor_variable = this.valor.interpretar(arbol, tabla);
        if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.CARACTER) {
            return valor_variable.toLowerCase();
        }
        if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, this.id, valor_variable))) {
            return new Errores_1.default("SEMANTICO", "La Variable Ya Existe.", this.fila, this.columna);
        }
    }
    ;
}
exports.default = ToLowerCase;
