"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(nombre, tipo, rol, fila, columna, valor) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.rol = rol;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    // Getters
    getNombre() {
        return this.nombre;
    }
    getTipo() {
        return this.tipo;
    }
    getRol() {
        return this.rol;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
    getValor() {
        return this.valor;
    }
    // Setters
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    setRol(rol) {
        this.rol = rol;
    }
    setFila(fila) {
        this.fila = fila;
    }
    setColumna(columna) {
        this.columna = columna;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.default = Errores;
