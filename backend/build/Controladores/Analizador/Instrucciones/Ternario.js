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
class OperadorTernario extends Instruccion_1.Instruccion {
    constructor(condicion, expresion1, expresion2, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.condicion = condicion;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
    }
    interpretar(arbol, tabla) {
        let retorno = this.condicion.interpretar(arbol, tabla);
        if (retorno instanceof Errores_1.default)
            return retorno;
        let expresion_1 = this.expresion1.interpretar(arbol, tabla);
        if (expresion_1 instanceof Errores_1.default)
            return expresion_1;
        let expresion_2 = this.expresion2.interpretar(arbol, tabla);
        if (expresion_2 instanceof Errores_1.default)
            return expresion_2;
        if (this.condicion.tipo_dato.getTipo() != Tipo_1.tipo_dato.BOOLEANO) {
            let error = new Errores_1.default("Semántico", "Condición Debe Ser Del Tipo Booleana.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n");
            return error;
        }
        if (retorno) {
            this.tipo_dato = this.expresion1.tipo_dato;
            return expresion_1;
        }
        else {
            this.tipo_dato = this.expresion2.tipo_dato;
            return expresion_2;
        }
    }
}
exports.default = OperadorTernario;
