import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class FuncionesToLower extends Instruccion {
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
            case Funcion.TOLOWER:
                return this.tolower(valor_unico, arbol)
            default:
                let error = new Errores("Semántico", "Función ToLower Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función ToLower Inválida.\n")
                return error
        }
    }

    tolower(op_izquierda: any, arbol:Arbol) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return String(op_izquierda.toLowerCase())
            default:
                let error = new Errores("Semántico", "Función ToLower Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función ToLower Inválida.\n")
                return error
        }
    }
    obtener_ast(anterior: string): string {
        return ""
    }
}

export enum Funcion {
    TOLOWER
}