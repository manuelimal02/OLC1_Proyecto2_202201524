"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, id, fila, columna, valor) {
        this.tipo = tipo;
        this.id = id.toLocaleLowerCase();
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
}
exports.default = Simbolo;
