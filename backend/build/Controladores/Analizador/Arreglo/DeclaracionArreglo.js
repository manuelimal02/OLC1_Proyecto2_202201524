"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = require("../Simbolo/Tipo");
const SimboloA_1 = __importDefault(require("../Simbolo/SimboloA"));
class DeclaracionArreglo extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, identificador, valor, tamano1) {
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
        this.tamano1 = tamano1;
    }
    interpretar(arbol, tabla) {
        if (this.valor == null && this.tamano1 != undefined) {
            switch (this.tipo_dato.getTipo()) {
                case Tipo_1.tipo_dato.ENTERO:
                    let arreglo = new Array(this.tamano1).fill(0);
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.DECIMAL:
                    let arreglo2 = new Array(this.tamano1).fill(0.0);
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo2))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.BOOLEANO:
                    let arreglo3 = new Array(this.tamano1).fill(true);
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo3))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.CADENA:
                    let arreglo4 = new Array(this.tamano1).fill("");
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo4))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.CARACTER:
                    let arreglo5 = new Array(this.tamano1).fill('');
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo5))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                default:
                    let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                    return error;
            }
        }
        else if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, this.valor))) {
            let error = new Errores_1.default("Semántico", "Error Al Declarar Arreglo.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error Al Declarar Arreglo.\n");
            return error;
        }
    }
}
exports.default = DeclaracionArreglo;
