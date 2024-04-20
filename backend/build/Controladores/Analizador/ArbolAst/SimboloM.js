"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matriz {
    constructor(tipo_matriz, fila, columna, identificador, valores) {
        this.tipo_matriz = tipo_matriz;
        this.identificador = identificador.toLocaleLowerCase();
        this.valores = valores;
        this.fila = fila;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo_matriz;
    }
    setTipo(tipo_matriz) {
        this.tipo_matriz = tipo_matriz;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(identificador) {
        this.identificador = identificador;
    }
    getValores(posicion_1, posicion_2) {
        return this.valores[posicion_1][posicion_2].valor;
    }
    getValor() {
        return this.valores.map(fila => fila.map(nativo => nativo.valor));
    }
    setValores(posicion_1, posicion_2, valores) {
        this.valores[posicion_1][posicion_2].valor = valores;
    }
    getSize() {
        return this.valores.length;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
}
exports.default = Matriz;
