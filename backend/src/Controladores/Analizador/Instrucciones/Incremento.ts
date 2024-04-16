import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Incremento extends Instruccion {
    private operando_unico: Instruccion | undefined
    private operacion: Funcion

    constructor(operador: Funcion, fila: number, columna: number, op_izquierda: Instruccion) {
        super(new Tipo(tipo_dato.DECIMAL), fila, columna)
        this.operando_unico = op_izquierda
        this.operacion = operador
        
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_unico = null
        if (this.operando_unico != null) {
            valor_unico = this.operando_unico.interpretar(arbol, tabla)
            if (valor_unico instanceof Errores) return valor_unico
        } 
        switch (this.operacion) {
            case Funcion.INC:
                return this.incremento(valor_unico)
            case Funcion.DEC:
                return this.decremento(valor_unico)
            default:
                return new Errores("Semántico", "Función Inválida", this.fila, this.columna)
        }
    }

    incremento(op_izquierda: any) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                op_izquierda.setValor(parseInt(op_izquierda)+1)
            case tipo_dato.DECIMAL:
                    this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                    return parseInt(op_izquierda+1)
            default:
                return new Errores("Semántico", "Función Incremento Inválida", this.fila, this.columna)
        }
    }

    decremento(op_izquierda: any) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(op_izquierda) - 1
            case tipo_dato.DECIMAL:
                    this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                    return parseInt(op_izquierda) - 1
            default:
                return new Errores("Semántico", "Función Decremento Inválida", this.fila, this.columna)
        }
    }
}

export enum Funcion {
    INC,
    DEC
}
