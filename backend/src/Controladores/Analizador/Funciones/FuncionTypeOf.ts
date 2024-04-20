import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class FuncionesToString extends Instruccion {
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
            case Funcion.TYPEOF:
                return this.typeof(arbol)
            default:
                let error = new Errores("Semántico", "Función TypeOf Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función TypeOf Inválida.\n")
                return error
        }
    }

    typeof(arbol:Arbol) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.ENTERO:
                return 'ENTERO'
            case tipo_dato.DECIMAL:
                return 'DECIMLA'
            case tipo_dato.BOOLEANO:
                return 'BOOLENAO'
            case tipo_dato.CARACTER:
                return 'CARACTER'
            case tipo_dato.CADENA:
                return 'CADENA'
            default:
                let error = new Errores("Semántico", "Función TypeOf Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función TypeOf Inválida.\n")
                return error
        }
    }
}

export enum Funcion {
    TYPEOF
}