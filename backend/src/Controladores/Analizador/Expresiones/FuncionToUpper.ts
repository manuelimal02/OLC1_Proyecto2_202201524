import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class FuncionesToUpper extends Instruccion {
    private operando_unico: Instruccion | undefined
    private operacion: Funcion

    constructor(operador: Funcion, fila: number, columna: number, op_izquierda: Instruccion) {
        super(new Tipo(tipo_dato.CADENA), fila, columna)
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
            case Funcion.TOUPPER:
                return this.toupper(valor_unico)
            default:
                return new Errores("Semantico", "Funcion Invalido", this.fila, this.columna)
        }
    }

    toupper(op_izquierda: any) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return op_izquierda.toUpperCase()
            default:
                return new Errores("Semantico", "ToUpper Invalido", this.fila, this.columna)
        }
    }
}

export enum Funcion {
    TOUPPER
}