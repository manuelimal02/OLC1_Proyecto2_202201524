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
const TablaSimbolo_1 = __importDefault(require("../Simbolo/TablaSimbolo"));
class DoWhile extends Instruccion_1.Instruccion {
    constructor(declaracion, condicion, actualizacion, bloque, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.bloque = bloque;
    }
    interpretar(arbol, tabla) {
        const nueva_tabla = new TablaSimbolo_1.default(tabla);
        nueva_tabla.setNombre("Inicializacion For");
        const resultado_inicializacion = this.declaracion.interpretar(arbol, nueva_tabla);
        if (resultado_inicializacion instanceof Errores_1.default)
            return resultado_inicializacion;
        let condicion = this.condicion.interpretar(arbol, tabla);
        if (condicion instanceof Errores_1.default)
            return condicion;
        if (this.condicion.tipo_dato.getTipo() != Tipo_1.tipo_dato.BOOLEANO) {
            return new Errores_1.default("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna);
        }
        while (this.condicion.interpretar(arbol, tabla)) {
            const retorno = this.bloque.interpretar(arbol, tabla);
            if (retorno)
                return retorno;
            const resultado_actualizacion = this.actualizacion.interpretar(arbol, nueva_tabla);
            if (resultado_actualizacion instanceof Errores_1.default)
                return resultado_actualizacion;
        }
    }
}
exports.default = DoWhile;
