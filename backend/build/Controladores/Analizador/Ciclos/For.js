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
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const TablaSimbolo_1 = __importDefault(require("../ArbolAst/TablaSimbolo"));
const Break_1 = __importDefault(require("../Transferencia/Break"));
const Continue_1 = __importDefault(require("../Transferencia/Continue"));
const Return_1 = __importDefault(require("../Transferencia/Return"));
class For extends Instruccion_1.Instruccion {
    constructor(declaracion, condicion, actualizacion, bloque, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.bloque = bloque;
    }
    interpretar(arbol, tabla) {
        const nueva_tabla1 = new TablaSimbolo_1.default(tabla);
        nueva_tabla1.setNombre("CondicionesFor");
        arbol.agregarTabla(nueva_tabla1);
        const resultado_inicializacion = this.declaracion.interpretar(arbol, nueva_tabla1);
        if (resultado_inicializacion instanceof Errores_1.default)
            return resultado_inicializacion;
        let condicion = this.condicion.interpretar(arbol, nueva_tabla1);
        if (condicion instanceof Errores_1.default)
            return condicion;
        if (this.condicion.tipo_dato.getTipo() != Tipo_1.tipo_dato.BOOLEANO) {
            let error = new Errores_1.default("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n");
            return error;
        }
        while (this.condicion.interpretar(arbol, nueva_tabla1)) {
            const nueva_tabla2 = new TablaSimbolo_1.default(nueva_tabla1);
            nueva_tabla2.setNombre("For");
            arbol.agregarTabla(nueva_tabla2);
            for (let ins of this.bloque) {
                if (ins instanceof Break_1.default)
                    return ins;
                if (ins instanceof Continue_1.default)
                    return ins;
                if (ins instanceof Return_1.default)
                    return ins;
                if (ins instanceof Errores_1.default)
                    return ins;
                let resultado = ins.interpretar(arbol, nueva_tabla2);
                if (resultado instanceof Break_1.default)
                    return resultado;
                if (resultado instanceof Continue_1.default)
                    return resultado;
                if (resultado instanceof Return_1.default)
                    return resultado;
                if (resultado instanceof Errores_1.default)
                    return resultado;
            }
            const resultado_actualizacion = this.actualizacion.interpretar(arbol, nueva_tabla1);
            if (resultado_actualizacion instanceof Errores_1.default)
                return resultado_actualizacion;
        }
    }
    obtener_ast(anterior) {
        return "";
    }
}
exports.default = For;
