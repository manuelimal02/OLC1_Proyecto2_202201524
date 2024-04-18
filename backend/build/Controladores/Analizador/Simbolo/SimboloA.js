"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arreglo {
    constructor(tipo_arreglo, identificador, valores, size) {
        this.tipo_arreglo = tipo_arreglo;
        this.identificador = identificador.toLocaleLowerCase();
        this.valores = valores;
        this.size = size;
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
    getValores(posicion) {
        return this.valores[posicion].valor;
    }
    setValores(posicion, valores) {
        this.valores[posicion].valor = valores;
    }
    getSize() {
        return this.valores.length;
    }
}
exports.default = Arreglo;
