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
exports.Operador = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
class OperadorLogico extends Instruccion_1.Instruccion {
    constructor(operacion, fila, columna, operando_izquierda, operando_derecha) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO), fila, columna);
        this.operacion = operacion;
        if (!operando_derecha)
            this.operando_unico = operando_izquierda;
        else {
            this.operando_izquierda = operando_izquierda;
            this.operando_derecha = operando_derecha;
        }
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let valor_izquierda, valor_derecha, valor_unico = null;
        if (this.operando_unico != null) {
            valor_unico = this.operando_unico.interpretar(arbol, tabla);
            if (valor_unico instanceof Errores_1.default)
                return valor_unico;
        }
        else {
            valor_izquierda = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (valor_izquierda instanceof Errores_1.default)
                return valor_izquierda;
            valor_derecha = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (valor_derecha instanceof Errores_1.default)
                return valor_derecha;
        }
        switch (this.operacion) {
            case Operador.OR:
                return this.logico_or(valor_izquierda, valor_derecha, arbol);
            case Operador.AND:
                return this.logico_and(valor_izquierda, valor_derecha, arbol);
            case Operador.NOT:
                return this.logico_not(valor_unico, arbol);
            default:
                let error = new Errores_1.default("Semántico", "Operador Logico Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operador Logico Inválido.\n");
                return error;
        }
    }
    logico_or(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda || valor_derecha;
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Or Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Or Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Or Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Or Inválida.\n");
                return error;
        }
    }
    logico_and(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda && valor_derecha;
                    default:
                        let error = new Errores_1.default("Semántico", "Operación And Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación And Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación And Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación And Inválida.\n");
                return error;
        }
    }
    logico_not(valor_unico, arbol) {
        var _a;
        let op_unico = (_a = this.operando_unico) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (op_unico) {
            case Tipo_1.tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                return !valor_unico;
            default:
                let error = new Errores_1.default("Semántico", "Operación Not Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Not Inválida.\n");
                return error;
        }
    }
}
exports.default = OperadorLogico;
var Operador;
(function (Operador) {
    Operador[Operador["OR"] = 0] = "OR";
    Operador[Operador["AND"] = 1] = "AND";
    Operador[Operador["NOT"] = 2] = "NOT";
})(Operador || (exports.Operador = Operador = {}));
