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
class Asignacion extends Instruccion_1.Instruccion {
    constructor(Identificador, expresion, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.Identificador = Identificador;
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let nuevo_valor = this.expresion.interpretar(arbol, tabla);
        if (nuevo_valor instanceof Errores_1.default)
            return nuevo_valor;
        let valor = tabla.getVariable(this.Identificador.toLocaleLowerCase());
        if (valor == null) {
            let error = new Errores_1.default("Semántico", "Variable No Existente", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Variable No Existente.");
            return error;
        }
        if (this.expresion.tipo_dato.getTipo() != valor.getTipo().getTipo()) {
            let error = new Errores_1.default("Semántico", "Asignación Incorrecta", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Asignación Incorrecta.");
            return error;
        }
        this.tipo_dato = valor.getTipo();
        valor.setValor(nuevo_valor);
    }
}
exports.default = Asignacion;
