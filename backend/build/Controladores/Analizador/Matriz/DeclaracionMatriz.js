"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = require("../Simbolo/Tipo");
const SimboloM_1 = __importDefault(require("../Simbolo/SimboloM"));
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
            switch (this.tipo_dato.getTipo()) {
                case Tipo_1.tipo_dato.ENTERO:
                    let matriz = new Array(this.tamano1);
                    for (let i = 0; i < matriz.length; i++) {
                        matriz[i] = new Array(this.tamano2).fill(0);
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.identificador, matriz))) {
                        arbol.setConsola("Error Al Declarar Matriz Entera.");
                        return new Errores_1.default("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna);
                    }
                    break;
                case Tipo_1.tipo_dato.DECIMAL:
                    let matriz1 = new Array(this.tamano1);
                    for (let i = 0; i < matriz1.length; i++) {
                        matriz1[i] = new Array(this.tamano2).fill(0.0);
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.identificador, matriz1))) {
                        arbol.setConsola("Error Al Declarar Matriz Decimal.");
                        return new Errores_1.default("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna);
                    }
                    break;
                case Tipo_1.tipo_dato.BOOLEANO:
                    let matriz3 = new Array(this.tamano1);
                    for (let i = 0; i < matriz3.length; i++) {
                        matriz3[i] = new Array(this.tamano2).fill(true);
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.identificador, matriz3))) {
                        arbol.setConsola("Error Al Declarar Matriz Booleana.");
                        return new Errores_1.default("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna);
                    }
                    break;
                case Tipo_1.tipo_dato.CADENA:
                    let matriz4 = new Array(this.tamano1);
                    for (let i = 0; i < matriz4.length; i++) {
                        matriz4[i] = new Array(this.tamano2).fill("");
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.identificador, matriz4))) {
                        arbol.setConsola("Error Al Declarar Matriz Cadena.");
                        return new Errores_1.default("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna);
                    }
                    break;
                case Tipo_1.tipo_dato.CARACTER:
                    let matriz5 = new Array(this.tamano1);
                    for (let i = 0; i < matriz5.length; i++) {
                        matriz5[i] = new Array(this.tamano2).fill('');
                    }
                    if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.identificador, matriz5))) {
                        arbol.setConsola("Error Al Declarar Matriz Caracter.");
                        return new Errores_1.default("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna);
                    }
                    break;
                default:
                    arbol.setConsola("Error");
                    return new Errores_1.default("SEMANTICO", "Error", this.fila, this.columna);
            }
        }
        else if (!tabla.setMatriz(new SimboloM_1.default(this.tipo_dato, this.identificador, this.valor))) {
            return new Errores_1.default("SEMANTICO", "Error Al Declarar Arreglo", this.fila, this.columna);
        }
    }
}
exports.default = DeclaracionMatriz;
