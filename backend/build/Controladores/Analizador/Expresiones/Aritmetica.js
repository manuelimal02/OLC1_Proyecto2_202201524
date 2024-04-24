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
exports.Operadores = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Aritmeticas extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, op_izquierda, op_derecha) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.ENTERO), fila, columna);
        this.operacion = operador;
        if (!op_derecha)
            this.operando_unico = op_izquierda;
        else {
            this.operando_izquierda = op_izquierda;
            this.operando_derecha = op_derecha;
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
            case Operadores.SUMA:
                return this.suma(valor_izquierda, valor_derecha, arbol);
            case Operadores.RESTA:
                return this.resta(valor_izquierda, valor_derecha, arbol);
            case Operadores.MULTICACION:
                return this.multiplicacion(valor_izquierda, valor_derecha, arbol);
            case Operadores.DIVISION:
                return this.division(valor_izquierda, valor_derecha, arbol);
            case Operadores.MODULO:
                return this.modulo(valor_izquierda, valor_derecha, arbol);
            case Operadores.POTENCIA:
                return this.potencia(valor_izquierda, valor_derecha, arbol);
            case Operadores.NEGACION:
                return this.negacion(valor_unico, arbol);
            default:
                let error = new Errores_1.default("Semántico", "Operador Aritmético Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operador Aritmético Inválido.\n");
                return error;
        }
    }
    suma(op_izquierda, op_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda) + parseInt(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) + parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        if (op_derecha === true) {
                            return parseInt(op_izquierda) + 1;
                        }
                        else if (op_derecha === false) {
                            return parseInt(op_izquierda);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda) + op_derecha.charCodeAt(0);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Suma Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) + parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) + parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        if (op_derecha === true) {
                            return parseFloat(op_izquierda) + 1;
                        }
                        else if (op_derecha === false) {
                            return parseFloat(op_izquierda);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) + parseFloat(op_derecha.charCodeAt(0));
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Suma Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        if (op_izquierda === true) {
                            return parseInt(op_derecha) + 1;
                        }
                        else if (op_izquierda === false) {
                            return parseInt(op_derecha);
                        }
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        if (op_izquierda === true) {
                            return parseFloat(op_derecha) + 1;
                        }
                        else if (op_izquierda === false) {
                            return parseFloat(op_derecha);
                        }
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        if (op_izquierda === true) {
                            return String("true" + op_derecha);
                        }
                        else if (op_izquierda === false) {
                            return String("false" + op_derecha);
                        }
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Suma Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda.charCodeAt(0)) + parseInt(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda.charCodeAt(0)) + parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Suma Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        if (op_derecha === true) {
                            return String(op_izquierda + "true");
                        }
                        else if (op_derecha === false) {
                            return String(op_izquierda + "false");
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return String(op_izquierda + op_derecha);
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Suma Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Suma Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Suma Inválida.\n");
                return error;
        }
    }
    resta(op_izquierda, op_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda) - parseInt(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) - parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        if (op_derecha === true) {
                            return parseInt(op_izquierda) - 1;
                        }
                        else if (op_derecha === false) {
                            return parseInt(op_izquierda);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda) - parseInt(op_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Resta Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) - parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) - parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        if (op_derecha === true) {
                            return parseFloat(op_izquierda) - 1;
                        }
                        else if (op_derecha === false) {
                            return parseFloat(op_izquierda);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) - parseFloat(op_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Resta Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        if (op_izquierda === true) {
                            return 1 - parseInt(op_derecha);
                        }
                        else if (op_izquierda === false) {
                            return 0 - parseInt(op_derecha);
                        }
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        if (op_izquierda === true) {
                            return 1 - parseFloat(op_derecha);
                        }
                        else if (op_izquierda === false) {
                            return 0 - parseFloat(op_derecha);
                        }
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Resta Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda.charCodeAt(0)) - parseInt(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda.charCodeAt(0)) - parseFloat(op_derecha);
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Resta Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Resta Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Resta Inválida.\n");
                return error;
        }
    }
    multiplicacion(op_izquierda, op_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda) * parseInt(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) * parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda) * parseInt(op_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) * parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) * parseFloat(op_derecha);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda) * parseFloat(op_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(op_izquierda.charCodeAt(0)) * parseInt(op_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(op_izquierda.charCodeAt(0)) * parseFloat(op_derecha);
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n");
                return error;
        }
    }
    division(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        if (parseFloat(valor_derecha) === 0) {
            let error = new Errores_1.default("Semántico", "Operación División Invalida.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Operación División Invalida.\n");
            return error;
        }
        else {
            switch (tipo1) {
                case Tipo_1.tipo_dato.ENTERO:
                    switch (tipo2) {
                        case Tipo_1.tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.CARACTER:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha.charCodeAt(0));
                        default:
                            let error = new Errores_1.default("Semántico", "Operación División Invalida.", this.fila, this.columna);
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación División Invalida.\n");
                            return error;
                    }
                case Tipo_1.tipo_dato.DECIMAL:
                    switch (tipo2) {
                        case Tipo_1.tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.CARACTER:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha.charCodeAt(0));
                        default:
                            let error = new Errores_1.default("Semántico", "Operación División Invalida.", this.fila, this.columna);
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación División Invalida.\n");
                            return error;
                    }
                case Tipo_1.tipo_dato.CARACTER:
                    switch (tipo2) {
                        case Tipo_1.tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda.charCodeAt(0)) / parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda.charCodeAt(0)) / parseFloat(valor_derecha);
                        default:
                            let error = new Errores_1.default("Semántico", "Operación División Invalida.", this.fila, this.columna);
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación División Invalida.\n");
                            return error;
                    }
                default:
                    let error = new Errores_1.default("Semántico", "Operación División Invalida.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Operación División Invalida.\n");
                    return error;
            }
        }
    }
    modulo(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        if (parseFloat(valor_derecha) === 0) {
            let error = new Errores_1.default("Semántico", "Operación Modulo Inválida.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Operación Modulo Inválida.\n");
            return error;
        }
        else {
            switch (tipo1) {
                case Tipo_1.tipo_dato.ENTERO:
                    switch (tipo2) {
                        case Tipo_1.tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha);
                        default:
                            let error = new Errores_1.default("Semántico", "Operación Modulo Inválida.", this.fila, this.columna);
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación Modulo Inválida.\n");
                            return error;
                    }
                case Tipo_1.tipo_dato.DECIMAL:
                    switch (tipo2) {
                        case Tipo_1.tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha);
                        case Tipo_1.tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha);
                        default:
                            let error = new Errores_1.default("Semántico", "Operación Modulo Inválida.", this.fila, this.columna);
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación Modulo Inválida.\n");
                            return error;
                    }
                default:
                    let error = new Errores_1.default("Semántico", "Operación Modulo Inválida.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Operación Modulo Inválida.\n");
                    return error;
            }
        }
    }
    potencia(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return Math.pow(parseInt(valor_izquierda), parseInt(valor_derecha));
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Potencia Inválida.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Potencia Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha));
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Potencia Inválida.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Potencia Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Potencia Inválida.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Potencia Inválida.\n");
                return error;
        }
    }
    negacion(op_izquierda, arbol) {
        var _a;
        let op_unico = (_a = this.operando_unico) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (op_unico) {
            case Tipo_1.tipo_dato.ENTERO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                return parseInt(op_izquierda) * -1;
            case Tipo_1.tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                return parseFloat(op_izquierda) * -1;
            default:
                let error = new Errores_1.default("Semántico", "Operación Negación Unaria Inválida.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Negación Unaria Inválida.\n");
                return error;
        }
    }
    obtener_ast(anterior) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let contador = Singleton_1.default.getInstancia();
        let dot = "";
        if (this.operacion == Operadores.NEGACION) {
            let nodo_negacion = `n${contador.getContador()}`;
            let nodo_expresion = `n${contador.getContador()}`;
            dot += `${nodo_negacion}[label=\"NEGACION\"];\n`;
            dot += `${nodo_expresion}[label=\"EXPRESION\"];\n`;
            dot += `${anterior}->${nodo_negacion};\n`;
            dot += `${anterior}-> ${nodo_expresion};\n`;
            dot += (_a = this.operando_unico) === null || _a === void 0 ? void 0 : _a.obtener_ast(nodo_expresion);
        }
        else if (this.operacion == Operadores.SUMA) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`;
            dot += `${nodo_operacion}[label=\"+\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_b = this.operando_izquierda) === null || _b === void 0 ? void 0 : _b.obtener_ast(nodo_expresion1);
            dot += (_c = this.operando_derecha) === null || _c === void 0 ? void 0 : _c.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operadores.RESTA) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`;
            dot += `${nodo_operacion}[label=\"-\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_d = this.operando_izquierda) === null || _d === void 0 ? void 0 : _d.obtener_ast(nodo_expresion1);
            dot += (_e = this.operando_derecha) === null || _e === void 0 ? void 0 : _e.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operadores.MULTICACION) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`;
            dot += `${nodo_operacion}[label=\"*\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_f = this.operando_izquierda) === null || _f === void 0 ? void 0 : _f.obtener_ast(nodo_expresion1);
            dot += (_g = this.operando_derecha) === null || _g === void 0 ? void 0 : _g.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operadores.DIVISION) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`;
            dot += `${nodo_operacion}[label=\"/\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_h = this.operando_izquierda) === null || _h === void 0 ? void 0 : _h.obtener_ast(nodo_expresion1);
            dot += (_j = this.operando_derecha) === null || _j === void 0 ? void 0 : _j.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operadores.MODULO) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`;
            dot += `${nodo_operacion}[label=\"%\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_k = this.operando_izquierda) === null || _k === void 0 ? void 0 : _k.obtener_ast(nodo_expresion1);
            dot += (_l = this.operando_derecha) === null || _l === void 0 ? void 0 : _l.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operadores.POTENCIA) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let nodoPow = `n${contador.getContador()}`;
            let nodoComa = `n${contador.getContador()}`;
            dot += `${nodoPow}[label="POTENCIA"];\n`;
            dot += `${par1}[label="("];\n`;
            dot += `${nodo_expresion1}[label="EXPRESION"];\n`;
            dot += `${nodoComa}[label=","];\n`;
            dot += `${nodo_expresion2}[label="EXPRESION"];\n`;
            dot += `${par2}[label=")"];\n`;
            dot += `${anterior} -> ${nodoPow};\n`;
            dot += `${anterior} -> ${par1};\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodoComa};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += `${anterior} -> ${par2};\n`;
            dot += (_m = this.operando_izquierda) === null || _m === void 0 ? void 0 : _m.obtener_ast(nodo_expresion1);
            dot += (_o = this.operando_derecha) === null || _o === void 0 ? void 0 : _o.obtener_ast(nodo_expresion2);
        }
        return dot;
    }
}
exports.default = Aritmeticas;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["MULTICACION"] = 2] = "MULTICACION";
    Operadores[Operadores["DIVISION"] = 3] = "DIVISION";
    Operadores[Operadores["MODULO"] = 4] = "MODULO";
    Operadores[Operadores["POTENCIA"] = 5] = "POTENCIA";
    Operadores[Operadores["NEGACION"] = 6] = "NEGACION";
})(Operadores || (exports.Operadores = Operadores = {}));
