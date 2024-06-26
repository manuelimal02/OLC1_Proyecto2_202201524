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
class AccesoVariable extends Instruccion_1.Instruccion {
    constructor(Identificador, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.Identificador = Identificador;
    }
    interpretar(arbol, tabla) {
        let valor_variable = tabla.getVariable(this.Identificador);
        if (valor_variable == null) {
            let error = new Errores_1.default("Semántico", "Acceso Inválido.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Acceso Inválido.\n");
            return error;
        }
        this.tipo_dato = valor_variable.getTipo();
        return valor_variable.getValor();
    }
    obtener_ast(anterior) {
        return "";
    }
}
exports.default = AccesoVariable;
