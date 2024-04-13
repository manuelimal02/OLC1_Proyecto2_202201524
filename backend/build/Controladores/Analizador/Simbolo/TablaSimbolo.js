"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TablaSimbolo {
    constructor(anterior) {
        this.tabla_anterior = anterior;
        this.tablaActual = new Map();
        this.nombre = "";
    }
    getAnterior() {
        return this.tabla_anterior;
    }
    setAnterior(anterior) {
        this.tabla_anterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(tabla) {
        this.tablaActual = tabla;
    }
    getVariable(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let busqueda = i.getTabla().get(id.toLocaleLowerCase());
            if (busqueda != null)
                return busqueda;
        }
        return null;
    }
    setVariable(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getId().toLocaleLowerCase());
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLocaleLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.default = TablaSimbolo;
