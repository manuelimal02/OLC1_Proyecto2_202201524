"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TablaSimbolo {
    constructor(anterior) {
        this.tabla_anterior = anterior;
        this.tabla_actual = new Map();
        this.nombre = "";
    }
    getAnterior() {
        return this.tabla_anterior;
    }
    setAnterior(anterior) {
        this.tabla_anterior = anterior;
    }
    getTabla() {
        return this.tabla_actual;
    }
    setTabla(tabla) {
        this.tabla_actual = tabla;
    }
    //--------------------------------------------------------------------------------------------------------------
    getMatriz(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let busqueda = i.getTabla().get(id.toLocaleLowerCase());
            if (busqueda != null)
                return busqueda;
        }
        return null;
    }
    setMatriz(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getIdentificador().toLocaleLowerCase());
        if (busqueda == null) {
            this.tabla_actual.set(simbolo.getIdentificador().toLocaleLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    //--------------------------------------------------------------------------------------------------------------
    getArreglo(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let busqueda = i.getTabla().get(id.toLocaleLowerCase());
            if (busqueda != null)
                return busqueda;
        }
        return null;
    }
    setArreglo(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getIdentificador().toLocaleLowerCase());
        if (busqueda == null) {
            this.tabla_actual.set(simbolo.getIdentificador().toLocaleLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    //--------------------------------------------------------------------------------------------------------------
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
            this.tabla_actual.set(simbolo.getId().toLocaleLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    //--------------------------------------------------------------------------------------------------------------
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.default = TablaSimbolo;