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
                return this.igual_igual(valor_izquierda, valor_derecha);
            case Operador.DISTINTO:
                return this.distinto(valor_izquierda, valor_derecha);
            case Operador.MENORQUE:
                return this.menor_que(valor_izquierda, valor_derecha);
            case Operador.MENORIGUAL:
                return this.menor_igual(valor_izquierda, valor_derecha);
            case Operador.MAYORQUE:
                return this.mayor_que(valor_izquierda, valor_derecha);
            case Operador.MAYORIGUAL:
                return this.mayor_igual(valor_izquierda, valor_derecha);
            default:
                return new Errores_1.default("Semántico", "Operador Relacional Inválido", this.fila, this.columna);
        }
    }
    igual_igual(valor_izquierda, valor_derecha) {
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                        }
                        else if (valor_derecha === false) {
                            return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() === valor_derecha.toString();
                    default:
                        return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
                }
            default:
                return new Errores_1.default("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna);
        }
    }
    distinto(valor_izquierda, valor_derecha) {
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        //console.log("entro antes del if")
                        if (valor_derecha === true) {
                            return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                        }
                        else if (valor_derecha === false) {
                            return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() != valor_derecha.toString();
                    default:
                        return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
                }
            default:
                return new Errores_1.default("Semántico", "Comparación Distinto Inválida", this.fila, this.columna);
        }
    }
    menor_que(valor_izquierda, valor_derecha) {
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                        }
                        else if (valor_derecha === false) {
                            return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return false;
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor Que Inválidaa", this.fila, this.columna);
                }
            default:
                return new Errores_1.default("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna);
        }
    }
    menor_igual(valor_izquierda, valor_derecha) {
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "CComparación Menor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                        }
                        else if (valor_derecha === false) {
                            return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() === valor_derecha.toString();
                    default:
                        return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
                }
            default:
                return new Errores_1.default("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna);
        }
    }
    mayor_que(valor_izquierda, valor_derecha) {
        var _a, _b;
        let tipo1 = (_a = this.operando_izquierda) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.operando_derecha) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            //enteros
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                        }
                        else if (valor_derecha === false) {
                            return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return false;
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
                }
            default:
                return new Errores_1.default("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna);
        }
    }
    mayor_igual(valor_izquierda, valor_derecha) {
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        console.log("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
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
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                        }
                        else if (valor_derecha === false) {
                            return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                        }
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.BOOLEANO);
                        return valor_izquierda.toString() === valor_derecha.toString();
                    default:
                        return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
                }
            default:
                return new Errores_1.default("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna);
        }
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
