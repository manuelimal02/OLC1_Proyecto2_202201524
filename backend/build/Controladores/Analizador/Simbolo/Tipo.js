"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo_dato = void 0;
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
}
exports.default = Tipo;
var tipo_dato;
(function (tipo_dato) {
    tipo_dato[tipo_dato["ENTERO"] = 0] = "ENTERO";
    tipo_dato[tipo_dato["DECIMAL"] = 1] = "DECIMAL";
    tipo_dato[tipo_dato["BOOLEANO"] = 2] = "BOOLEANO";
    tipo_dato[tipo_dato["CARACTER"] = 3] = "CARACTER";
    tipo_dato[tipo_dato["CADENA"] = 4] = "CADENA";
    tipo_dato[tipo_dato["VOID"] = 5] = "VOID";
})(tipo_dato || (exports.tipo_dato = tipo_dato = {}));
