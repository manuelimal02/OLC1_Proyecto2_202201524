"use strict";
/*import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";

export default class For extends Instruccion {
    private declaracion: Instruccion
    private condicion: Instruccion
    private actualizacion: Instruccion
    private bloque: Bloque

    constructor(declaracion: Instruccion, condicion: Instruccion, actualizacion: Instruccion, bloque:Bloque, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.actualizacion = actualizacion
        this.bloque = bloque
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        const  resultado_inicializacion = this.declaracion.interpretar(arbol, tabla)
        if (resultado_inicializacion instanceof Errores) return resultado_inicializacion
        let condicion = this.condicion.interpretar(arbol, tabla)
        if (condicion instanceof Errores) return condicion
        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            return new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
        }
        while (this.condicion.interpretar(arbol, tabla)) {
            const retorno =  this.bloque.interpretar(arbol,tabla)
            if (retorno) return retorno
            const  resultado_actualizacion = this.actualizacion.interpretar(arbol, tabla)
            if (resultado_actualizacion instanceof Errores) return resultado_actualizacion
        }
    }
}*/ 
