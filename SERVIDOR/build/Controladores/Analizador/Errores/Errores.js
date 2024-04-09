"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipo_error, descripcion, fila, columna) {
        this.tipo_error = tipo_error;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    // Getters
    getTipoError() {
        return this.tipo_error;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
    // Setters
    setTipoError(tipo_error) {
        this.tipo_error = tipo_error;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    setFila(fila) {
        this.fila = fila;
    }
    setColumna(columna) {
        this.columna = columna;
    }
}
exports.default = Errores;
