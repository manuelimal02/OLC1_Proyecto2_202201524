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
class Casteo extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, valor) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.nuevo_tipo = operador;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        var _a;
        let expresion = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
        switch (this.nuevo_tipo.getTipo()) {
            case Tipo_1.tipo_dato.ENTERO:
                return this.casteo_entero(expresion, arbol);
            case Tipo_1.tipo_dato.DECIMAL:
                return this.casteo_decimal(expresion, arbol);
            case Tipo_1.tipo_dato.CARACTER:
                return this.casteo_caracter(expresion, arbol);
            case Tipo_1.tipo_dato.CADENA:
                return this.casteo_cadena(expresion, arbol);
            default:
                let error = new Errores_1.default("Semántico", "Tipo De Casteo Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Tipo De Casteo Inválido.\n");
                return error;
        }
    }
    casteo_entero(operando, arbol) {
        var _a;
        let tipo_actual = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (tipo_actual) {
            case Tipo_1.tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                return parseInt(operando);
            case Tipo_1.tipo_dato.CARACTER:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                return parseInt(operando.charCodeAt(0));
            default:
                let error = new Errores_1.default("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n");
                return error;
        }
    }
    casteo_decimal(operando, arbol) {
        var _a;
        let tipo_actual = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (tipo_actual) {
            case Tipo_1.tipo_dato.ENTERO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                return parseFloat(operando);
            case Tipo_1.tipo_dato.CARACTER:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                return parseFloat(operando.charCodeAt(0));
            default:
                let error = new Errores_1.default("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n");
                return error;
        }
    }
    casteo_caracter(operando, arbol) {
        var _a;
        let tipo_actual = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (tipo_actual) {
            case Tipo_1.tipo_dato.ENTERO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CARACTER);
                return String.fromCharCode(parseInt(operando));
            case Tipo_1.tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CARACTER);
                return String.fromCharCode(parseFloat(operando));
            default:
                let error = new Errores_1.default("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n");
                return error;
        }
    }
    casteo_cadena(operando, arbol) {
        var _a;
        let tipo_actual = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (tipo_actual) {
            case Tipo_1.tipo_dato.ENTERO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                return parseInt(operando).toString();
            case Tipo_1.tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                return parseFloat(operando).toString();
            default:
                let error = new Errores_1.default("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n");
                return error;
        }
    }
    obtener_ast(anterior) {
        return "";
    }
}
exports.default = Casteo;
