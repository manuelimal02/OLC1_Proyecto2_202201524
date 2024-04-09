"use strict";
class Arbol {
    constructor(etiqueta, valor, fila, columna) {
        this._etiqueta = etiqueta;
        this._valor = valor;
        this._fila = fila;
        this._columna = columna;
        this._hijos = [];
    }
    AgregarHijo(hijo) {
        this._hijos.push(hijo);
    }
    get hijos() {
        return this._hijos;
    }
    set hijos(hijos) {
        this._hijos = hijos;
    }
    get etiqueta() {
        return this._etiqueta;
    }
    get valor() {
        return this._valor;
    }
    get fila() {
        return this._fila;
    }
    get columna() {
        return this._columna;
    }
    // Setters
    set etiqueta(etiqueta) {
        this._etiqueta = etiqueta;
    }
    set valor(valor) {
        this._valor = valor;
    }
    set fila(fila) {
        this._fila = fila;
    }
    set columna(columna) {
        this._columna = columna;
    }
    imprimirNodos(indentacion = '') {
        console.log(indentacion + this._etiqueta + ": " + this._valor);
        for (let hijo of this._hijos) {
            if (hijo instanceof Arbol) {
                hijo.imprimirNodos(indentacion + '  ');
            }
        }
    }
}
module.exports = Arbol;
