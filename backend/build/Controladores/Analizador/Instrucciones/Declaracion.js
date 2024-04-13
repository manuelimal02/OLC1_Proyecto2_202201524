"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Simbolo_1 = __importDefault(require("../Simbolo/Simbolo"));
const Tipo_1 = require("../Simbolo/Tipo");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, id, valor) {
        super(tipo, fila, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valor_variable;
        this.id.forEach((elemento) => {
            if (this.valor === null) {
                valor_variable = this.valor_defecto(this.tipo_dato);
            }
            else {
                valor_variable = this.valor.interpretar(arbol, tabla);
                if (valor_variable instanceof Errores_1.default)
                    return valor_variable;
                if ((valor_variable == true || valor_variable == false) && this.tipo_dato.getTipo() == Tipo_1.tipo_dato.ENTERO) {
                    valor_variable = valor_variable == true ? 1 : 0;
                }
                else if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                    return new Errores_1.default("SEMANTICO", "Error Al Declarar Variable.", this.fila, this.columna);
                }
            }
            if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.ENTERO) {
                if (parseInt(valor_variable) < -2147483648 || parseInt(valor_variable) > 2147483647) {
                    return new Errores_1.default("SEMANTICO", "Variable Fuera De Rango.", this.fila, this.columna);
                }
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, elemento, valor_variable))) {
                return new Errores_1.default("SEMANTICO", "La Variable Ya Existe.", this.fila, this.columna);
            }
        });
    }
    valor_defecto(tipo) {
        switch (tipo.getTipo()) {
            case Tipo_1.tipo_dato.ENTERO:
                return 0;
            case Tipo_1.tipo_dato.DECIMAL:
                return 0;
            case Tipo_1.tipo_dato.BOOLEANO:
                return true;
            case Tipo_1.tipo_dato.CARACTER:
                return '';
            case Tipo_1.tipo_dato.CADENA:
                return "";
            default:
                return null;
        }
    }
}
exports.default = Declaracion;
