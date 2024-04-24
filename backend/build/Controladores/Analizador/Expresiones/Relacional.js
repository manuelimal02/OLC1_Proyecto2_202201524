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
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class OperadorRelacional extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, valor_izquierda, valor_derecha) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO), fila, columna);
        this.operacion = operador;
        this.operando_izquierda = valor_izquierda;
        this.operando_derecha = valor_derecha;
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
            case Operador.IGUALIGUAL:
                return this.igual_igual(valor_izquierda, valor_derecha, arbol);
            case Operador.DISTINTO:
                return this.distinto(valor_izquierda, valor_derecha, arbol);
            case Operador.MENORQUE:
                return this.menor_que(valor_izquierda, valor_derecha, arbol);
            case Operador.MENORIGUAL:
                return this.menor_igual(valor_izquierda, valor_derecha, arbol);
            case Operador.MAYORQUE:
                return this.mayor_que(valor_izquierda, valor_derecha, arbol);
            case Operador.MAYORIGUAL:
                return this.mayor_igual(valor_izquierda, valor_derecha, arbol);
            default:
                let error = new Errores_1.default("Semántico", "Operador Relacional Inválido", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operador Relacional Inválido.\n");
                return error;
        }
    }
    igual_igual(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) === parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) === 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) === 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) === parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) === 1;
                        }
                        else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) === 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 === parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 === parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_izquierda === true) {
                            if (valor_derecha === true) {
                                return true;
                            }
                            if (valor_derecha === false) {
                                return false;
                            }
                        }
                        if (valor_izquierda === false) {
                            if (valor_derecha === true) {
                                return false;
                            }
                            if (valor_derecha === false) {
                                return true;
                            }
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 === parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) === parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda.charCodeAt(0)) === parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) === 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) === 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) === parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() === valor_derecha.toString();
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n");
                return error;
        }
    }
    distinto(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) != parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) != 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) != 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) != parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Distinto Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) != 1;
                        }
                        else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) != 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Distinto Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 != parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 != parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_izquierda === true) {
                            if (valor_derecha === true) {
                                return false;
                            }
                            if (valor_derecha === false) {
                                return true;
                            }
                        }
                        if (valor_izquierda === false) {
                            if (valor_derecha === true) {
                                return true;
                            }
                            if (valor_derecha === false) {
                                return false;
                            }
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 != parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Distinto Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) != parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda.charCodeAt(0)) != parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) != 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) != 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) != parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Distinto Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() != valor_derecha.toString();
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Distinto Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Distinto Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Distinto Inválida.\n");
                return error;
        }
    }
    menor_que(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) < parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) < 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) < 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) < parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) < 1;
                        }
                        else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) < 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 < parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 < parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 < 1;
                        }
                        else if (valor_derecha === false) {
                            return 0 < 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 < parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) < parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda.charCodeAt(0)) < parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) < 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) < 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) < parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return false;
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Menor Que Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Menor Que Inválida.\n");
                return error;
        }
    }
    menor_igual(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) <= parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) <= 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) <= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) <= parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) <= 1;
                        }
                        else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) <= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 <= parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 <= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 <= 1;
                        }
                        else if (valor_derecha === false) {
                            return 0 <= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 <= parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) <= parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda.charCodeAt(0)) <= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) <= 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) <= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) <= parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() === valor_derecha.toString();
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n");
                return error;
        }
    }
    mayor_que(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) > parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) > 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) > 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) > parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) > 1;
                        }
                        else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) > 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 > parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 > parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 > 1;
                        }
                        else if (valor_derecha === false) {
                            return 0 > 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 > parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) > parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda.charCodeAt(0)) > parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) > 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) > 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) > parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return false;
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n");
                return error;
        }
    }
    mayor_igual(valor_izquierda, valor_derecha, arbol) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) >= parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) >= 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) >= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda) >= parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) >= 1;
                        }
                        else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) >= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 >= parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 >= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 >= 1;
                        }
                        else if (valor_derecha === false) {
                            return 0 >= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return 1 >= parseFloat(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) >= parseInt(valor_derecha);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseFloat(valor_izquierda.charCodeAt(0)) >= parseFloat(valor_derecha);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) >= 1;
                        }
                        else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) >= 0;
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return parseInt(valor_izquierda.charCodeAt(0)) >= parseInt(valor_derecha.charCodeAt(0));
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n");
                        return error;
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() === valor_derecha.toString();
                    default:
                        let error = new Errores_1.default("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n");
                        return error;
                }
            default:
                let error = new Errores_1.default("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n");
                return error;
        }
    }
    obtener_ast(anterior) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let contador = Singleton_1.default.getInstancia();
        let dot = "";
        if (this.operacion == Operador.IGUALIGUAL) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`;
            dot += `${nodo_operacion}[label = "=="];\n`;
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.obtener_ast(nodo_expresion1);
            dot += (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operador.DISTINTO) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`;
            dot += `${nodo_operacion}[label = "!="];\n`;
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_c = this.operando_izquierda) === null || _c === void 0 ? void 0 : _c.obtener_ast(nodo_expresion1);
            dot += (_d = this.operando_derecha) === null || _d === void 0 ? void 0 : _d.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operador.MAYORQUE) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`;
            dot += `${nodo_operacion}[label = ">"];\n`;
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_e = this.operando_izquierda) === null || _e === void 0 ? void 0 : _e.obtener_ast(nodo_expresion1);
            dot += (_f = this.operando_derecha) === null || _f === void 0 ? void 0 : _f.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operador.MENORQUE) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`;
            dot += `${nodo_operacion}[label = "<"];\n`;
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_g = this.operando_izquierda) === null || _g === void 0 ? void 0 : _g.obtener_ast(nodo_expresion1);
            dot += (_h = this.operando_derecha) === null || _h === void 0 ? void 0 : _h.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operador.MAYORIGUAL) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`;
            dot += `${nodo_operacion}[label = ">="];\n`;
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_j = this.operando_izquierda) === null || _j === void 0 ? void 0 : _j.obtener_ast(nodo_expresion1);
            dot += (_k = this.operando_derecha) === null || _k === void 0 ? void 0 : _k.obtener_ast(nodo_expresion2);
        }
        else if (this.operacion == Operador.MENORIGUAL) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operacion = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`;
            dot += `${nodo_operacion}[label = "<="];\n`;
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operacion};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += (_l = this.operando_izquierda) === null || _l === void 0 ? void 0 : _l.obtener_ast(nodo_expresion1);
            dot += (_m = this.operando_derecha) === null || _m === void 0 ? void 0 : _m.obtener_ast(nodo_expresion2);
        }
        return dot;
    }
}
exports.default = OperadorRelacional;
var Operador;
(function (Operador) {
    Operador[Operador["IGUALIGUAL"] = 0] = "IGUALIGUAL";
    Operador[Operador["DISTINTO"] = 1] = "DISTINTO";
    Operador[Operador["MENORQUE"] = 2] = "MENORQUE";
    Operador[Operador["MENORIGUAL"] = 3] = "MENORIGUAL";
    Operador[Operador["MAYORQUE"] = 4] = "MAYORQUE";
    Operador[Operador["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(Operador || (exports.Operador = Operador = {}));
