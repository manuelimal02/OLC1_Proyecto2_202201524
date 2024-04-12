"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TablaSimbolo_1 = __importDefault(require("../Simbolo/TablaSimbolo"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tabla_global = new TablaSimbolo_1.default();
        this.errores = new Array;
    }
    Cout(contenido) {
        this.consola = `${this.consola}${contenido}`;
    }
    CoutEndl(contenido) {
        this.consola = `${this.consola}${contenido}\n`;
    }
    getConsola() {
        return this.consola;
    }
    setConsola(console) {
        this.consola = console;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tabla_global;
    }
    setTablaGlobal(tabla) {
        this.tabla_global = tabla;
    }
    getErrores() {
        return this.errores;
    }
}
exports.default = Arbol;
