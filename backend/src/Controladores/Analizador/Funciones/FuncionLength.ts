import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class FuncionesLenght extends Instruccion {
    private valor: Instruccion
    private operacion: Funcion

    constructor(operador: Funcion, fila: number, columna: number, valor: Instruccion) {
        super(new Tipo(tipo_dato.CADENA), fila, columna)
        this.valor = valor
        this.operacion = operador
        
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_unico = null
        if (this.valor != null) {
            valor_unico = this.valor.interpretar(arbol, tabla)
            if (valor_unico instanceof Errores) return valor_unico
        } 
        switch (this.operacion) {
            case Funcion.LENGTH:
                return this.length(valor_unico, arbol)
            default:
                let error = new Errores("Semántico", "Función Length Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función Length Inválida ACA.\n")
                return error
        }
    }

    length(valor: any, arbol:Arbol) {
        let op_unico = this.valor?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(valor.length)
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(valor.length)
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(valor.length)
            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(valor.length)
            case tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(valor.length)
            default:
                let error = new Errores("Semántico", "Función Length Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función Length Inválida PROANDO.\n")
                return error
        }
    }
}

export enum Funcion {
    LENGTH
}