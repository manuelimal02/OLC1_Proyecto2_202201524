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
class FuncionesToLower extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, op_izquierda) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.CADENA), fila, columna);
        this.operando_unico = op_izquierda;
        this.operacion = operador;
    }
    interpretar(arbol, tabla) {
        let valor_unico = null;
        if (this.operando_unico != null) {
            valor_unico = this.operando_unico.interpretar(arbol, tabla);
            if (valor_unico instanceof Errores_1.default)
                return valor_unico;
        }
        switch (this.operacion) {
            case Funcion.TOLOWER:
                return this.tolower(valor_unico);
            default:
                return new Errores_1.default("Semantico", "Funcion Invalido", this.fila, this.columna);
        }
    }
    tolower(op_izquierda) {
        var _a;
        let op_unico = (_a = this.operando_unico) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (op_unico) {
            case Tipo_1.tipo_dato.CADENA:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                return String(op_izquierda.toLowerCase());
            default:
                return new Errores_1.default("Semantico", "ToLower Invalido", this.fila, this.columna);
        }
    }
}
exports.default = FuncionesToLower;
var Funcion;
(function (Funcion) {
    Funcion[Funcion["TOLOWER"] = 0] = "TOLOWER";
})(Funcion || (exports.Funcion = Funcion = {}));
