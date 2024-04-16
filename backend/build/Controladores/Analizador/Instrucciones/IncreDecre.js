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
    constructor(operando, fila, columna, operando_unico) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.operando = operando;
        this.operando_unico = operando_unico;
    }
    interpretar(arbol, tabla) {
        let valor_variable = tabla.getVariable(this.operando_unico.toLocaleLowerCase());
        if (!valor_variable) {
            let error = new Errores_1.default("Semántico", "La Variable No Existe.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: La Variable No Existe.");
            return error;
        }
        let tipo = valor_variable.getTipo().getTipo();
        if (tipo != Tipo_1.tipo_dato.ENTERO && tipo != Tipo_1.tipo_dato.DECIMAL) {
            let error = new Errores_1.default("Semántico", "No Se Puede Aplicar El Incremeneto o Decremento.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: No Se Puede Aplicar El Incremeneto o Decremento.");
            return error;
        }
        let incremento = this.operando == "INC" ? 1 : this.operando == "DEC" ? -1 : null;
        if (incremento === null) {
            let error = new Errores_1.default("Semántico", "Error En Incremento o Decremento.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error En Incremento o Decremento.");
            return error;
        }
        let valor = tipo == Tipo_1.tipo_dato.ENTERO ? parseInt(valor_variable.getValor()) : parseFloat(valor_variable.getValor());
        valor_variable.setValor(valor + incremento);
    }
}
exports.default = IncrementoDeremento;
