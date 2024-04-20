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
