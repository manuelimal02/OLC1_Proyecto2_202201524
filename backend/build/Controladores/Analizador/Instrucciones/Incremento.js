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
exports.Funcion = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
class IncrementoDeremento extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, op_izquierda) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.operando_unico = op_izquierda;
        this.operacion = operador;
    }
    interpretar(arbol, tabla) {
        let valor_unico = tabla.getVariable(this.operando_unico.toLocaleLowerCase());
        if (valor_unico == null) {
            return new Errores_1.default("Semántico", "La Variable No Existe.", this.fila, this.columna);
        }
        switch (this.operacion) {
            case Funcion.INC:
                return this.incremento(valor_unico);
            default:
                return new Errores_1.default("Semántico", "Función Inválida", this.fila, this.columna);
        }
    }
    incremento(op_izquierda) {
        let op_unico = op_izquierda.getTipo().getTipo();
        switch (op_unico) {
            case Tipo_1.tipo_dato.ENTERO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                op_izquierda.setValor(parseInt(op_izquierda) + 1);
            case Tipo_1.tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                return parseFloat(op_izquierda + 1);
            default:
                return new Errores_1.default("Semántico", "Función Incremento Inválida", this.fila, this.columna);
        }
    }
}
exports.default = IncrementoDeremento;
var Funcion;
(function (Funcion) {
    Funcion[Funcion["INC"] = 0] = "INC";
    Funcion[Funcion["DEC"] = 1] = "DEC";
})(Funcion || (exports.Funcion = Funcion = {}));
