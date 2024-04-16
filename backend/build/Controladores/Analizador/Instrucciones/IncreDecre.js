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
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
class IncrementoDeremento extends Instruccion_1.Instruccion {
    constructor(operando, fila, columna, op_unico) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.operando_unico = op_unico;
        this.operando = operando;
    }
    interpretar(arbol, tabla) {
        let valor_variable = tabla.getVariable(this.operando_unico.toLocaleLowerCase());
        if (valor_variable == null) {
            return new Errores_1.default("Semántico", "La Variable No Existe.", this.fila, this.columna);
        }
        if (valor_variable.getTipo().getTipo() != Tipo_1.tipo_dato.ENTERO && valor_variable.getTipo().getTipo() != Tipo_1.tipo_dato.DECIMAL) {
            return new Errores_1.default("Semántico", "No Se Puede Aplicar El Incremeneto y Decremento.", this.fila, this.columna);
        }
        if (this.operando == "INC") {
            if (valor_variable.getTipo().getTipo() == Tipo_1.tipo_dato.ENTERO) {
                valor_variable.setValor(parseInt(valor_variable.getValor()) + 1);
            }
            else if (valor_variable.getTipo().getTipo() == Tipo_1.tipo_dato.DECIMAL) {
                valor_variable.setValor(parseFloat(valor_variable.getValor()) + 1);
            }
        }
        else if (this.operando == "DEC") {
            if (valor_variable.getTipo().getTipo() == Tipo_1.tipo_dato.ENTERO) {
                valor_variable.setValor(parseInt(valor_variable.getValor()) - 1);
            }
            else if (valor_variable.getTipo().getTipo() == Tipo_1.tipo_dato.DECIMAL) {
                valor_variable.setValor(parseFloat(valor_variable.getValor()) - 1);
            }
        }
        else {
            return new Errores_1.default("Semántico", "No Se Puede Aplicar El Incremeneto y Decremento.", this.fila, this.columna);
        }
    }
}
exports.default = IncrementoDeremento;
