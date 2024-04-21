"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = require("../ArbolAst/Tipo");
const SimboloA_1 = __importDefault(require("../ArbolAst/SimboloA"));
const Nativo_1 = __importDefault(require("../Expresiones/Nativo"));
class DeclaracionArreglo extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, identificador, valor, tamano) {
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
        this.tamano = tamano;
    }
    interpretar(arbol, tabla) {
        if (this.valor == null && this.tamano != undefined) {
            let tamano1Num = this.tamano.interpretar(arbol, tabla);
            if (tamano1Num instanceof Errores_1.default)
                return tamano1Num;
            switch (this.tipo_dato.getTipo()) {
                case Tipo_1.tipo_dato.ENTERO:
                    let arreglo = new Array(parseInt(tamano1Num));
                    for (let i = 0; i < arreglo.length; i++) {
                        arreglo[i] = new Nativo_1.default(this.tipo_dato, "0", 0, 0);
                    }
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.DECIMAL:
                    let arreglo2 = new Array(parseInt(tamano1Num));
                    for (let i = 0; i < arreglo2.length; i++) {
                        arreglo2[i] = new Nativo_1.default(this.tipo_dato, "0.0", 0, 0);
                    }
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo2))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.BOOLEANO:
                    let arreglo3 = new Array(parseInt(tamano1Num));
                    for (let i = 0; i < arreglo3.length; i++) {
                        arreglo3[i] = new Nativo_1.default(this.tipo_dato, true, 0, 0);
                    }
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo3))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.CADENA:
                    let arreglo4 = new Array(parseInt(tamano1Num));
                    for (let i = 0; i < arreglo4.length; i++) {
                        arreglo4[i] = new Nativo_1.default(this.tipo_dato, "", 0, 0);
                    }
                    if (!tabla.setArreglo(new SimboloA_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo4))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.CARACTER:
                    let arreglo5 = new Array(parseInt(tamano1Num));
                    for (let i = 0; i < arreglo5.length; i++) {
                        arreglo5[i] = new Nativo_1.default(this.tipo_dato, '', 0, 0);
                    }
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
