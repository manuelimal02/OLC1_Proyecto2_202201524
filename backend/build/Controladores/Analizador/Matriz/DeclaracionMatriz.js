"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = require("../ArbolAst/Tipo");
const SimboloM_1 = __importDefault(require("../ArbolAst/SimboloM"));
const Nativo_1 = __importDefault(require("../Expresiones/Nativo"));
class DeclaracionMatriz extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, identificador, valor, tamano1, tamano2) {
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
        this.tamano1 = tamano1;
        this.tamano2 = tamano2;
    }
    interpretar(arbol, tabla) {
        if (this.valor == null && this.tamano1 != undefined && this.tamano2 != undefined) {
            let tamano1Num = parseInt(this.tamano1.interpretar(arbol, tabla));
            let tamano2Num = parseInt(this.tamano2.interpretar(arbol, tabla));
            switch (this.tipo_dato.getTipo()) {
                case Tipo_1.tipo_dato.ENTERO:
                    let matriz = new Array(tamano1Num);
                    for (let i = 0; i < matriz.length; i++) {
                        matriz[i] = new Array(tamano2Num);
                        for (let j = 0; j < matriz[i].length; j++) {
                            matriz[i][j] = new Nativo_1.default(this.tipo_dato, "0", 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, matriz))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.DECIMAL:
                    let matriz1 = new Array(tamano1Num);
                    for (let i = 0; i < matriz1.length; i++) {
                        matriz1[i] = new Array(tamano2Num);
                        for (let j = 0; j < matriz1[i].length; j++) {
                            matriz1[i][j] = new Nativo_1.default(this.tipo_dato, "0.0", 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, matriz1))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.BOOLEANO:
                    let matriz3 = new Array(tamano1Num);
                    for (let i = 0; i < matriz3.length; i++) {
                        matriz3[i] = new Array(tamano2Num);
                        for (let j = 0; j < matriz3[i].length; j++) {
                            matriz3[i][j] = new Nativo_1.default(this.tipo_dato, true, 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, matriz3))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.CADENA:
                    let matriz4 = new Array(tamano1Num);
                    for (let i = 0; i < matriz4.length; i++) {
                        matriz4[i] = new Array(tamano2Num);
                        for (let j = 0; j < matriz4[i].length; j++) {
                            matriz4[i][j] = new Nativo_1.default(this.tipo_dato, "", 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, matriz4))) {
                        let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                        return error;
                    }
                    break;
                case Tipo_1.tipo_dato.CARACTER:
                    let matriz5 = new Array(tamano1Num);
                    for (let i = 0; i < matriz5.length; i++) {
                        matriz5[i] = new Array(tamano2Num);
                        for (let j = 0; j < matriz5[i].length; j++) {
                            matriz5[i][j] = new Nativo_1.default(this.tipo_dato, '', 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, matriz5))) {
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
        else if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.fila, this.columna, this.identificador, this.valor))) {
            let error = new Errores_1.default("Semántico", "Error Al Declarar Matriz.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error Al Declarar Matriz.\n");
            return error;
        }
    }
    obtener_ast(anterior) {
        return "";
    }
}
exports.default = DeclaracionMatriz;
