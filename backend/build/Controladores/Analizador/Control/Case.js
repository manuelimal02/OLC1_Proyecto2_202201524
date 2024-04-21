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
const TablaSimbolo_1 = __importDefault(require("../ArbolAst/TablaSimbolo"));
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Break_1 = __importDefault(require("../Transferencia/Break"));
const Continue_1 = __importDefault(require("../Transferencia/Continue"));
const Return_1 = __importDefault(require("../Transferencia/Return"));
class Case extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let condicional = this.condicion.interpretar(arbol, tabla);
        if (condicional instanceof Errores_1.default)
            return condicional;
        let condicional_case = (_a = this.condicional_case) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
        if (condicional_case instanceof Errores_1.default)
            return condicional_case;
        if (this.condicion.tipo_dato.getTipo() != ((_b = this.condicional_case) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo())) {
            let error = new Errores_1.default("Semántico", "La condición no es del mismo tipo.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: La condición no es del mismo tipo.\n");
            return error;
        }
        if (condicional == condicional_case) {
            let nueva_tabla = new TablaSimbolo_1.default(tabla);
            nueva_tabla.setNombre("SentenciaCase");
            arbol.agregarTabla(nueva_tabla);
            for (let ins of this.instrucciones) {
                if (ins instanceof Break_1.default)
                    return ins;
                if (ins instanceof Continue_1.default)
                    return ins;
                if (ins instanceof Return_1.default)
                    return ins;
                if (ins instanceof Errores_1.default)
                    return ins;
                let resultado = ins.interpretar(arbol, nueva_tabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
                if (resultado instanceof Break_1.default)
                    return resultado;
                if (resultado instanceof Continue_1.default)
                    return resultado;
                if (resultado instanceof Return_1.default)
                    return resultado;
                if (resultado instanceof Errores_1.default)
                    return resultado;
            }
        }
    }
    getCondicion() {
        if (this.condicion instanceof Errores_1.default)
            return this.condicion;
        return this.condicion;
    }
}
exports.default = Case;
