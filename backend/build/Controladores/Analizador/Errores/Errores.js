"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo_error = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
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
}
exports.default = Errores;
