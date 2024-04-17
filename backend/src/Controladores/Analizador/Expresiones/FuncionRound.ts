import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class FuncionesRound extends Instruccion {
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
            case Funcion.ROUND:
                return this.round(valor_unico, arbol)
            default:
                let error = new Errores("Semántico", "Función Round Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función Round Inválida.\n")
                return error
        }
    }

    round(op_izquierda: any, arbol: Arbol) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                let numero = parseFloat(op_izquierda)
                return Math.round(numero)
            default:
                let error = new Errores("Semántico", "Función Round Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función Round Inválida.\n")
                return error
        }
    }
}

export enum Funcion {
    ROUND
}