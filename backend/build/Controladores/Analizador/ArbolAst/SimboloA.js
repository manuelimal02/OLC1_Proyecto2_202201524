"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arreglo {
    constructor(tipo_arreglo, fila, columna, identificador, valores) {
        this.tipo_arreglo = tipo_arreglo;
        this.identificador = identificador.toLocaleLowerCase();
        this.valores = valores;
        this.fila = fila;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo_arreglo;
    }
    setTipo(tipo_arreglo) {
        this.tipo_arreglo = tipo_arreglo;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(identificador) {
        this.identificador = identificador;
    }
    getValores(posicion_1) {
        return this.valores[posicion_1].valor;
    }
    getValor() {
        return this.valores.map(nativo => nativo.valor);
    }
    setValores(posicion_1, valores) {
        this.valores[posicion_1].valor = valores;
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
exports.default = Arreglo;
