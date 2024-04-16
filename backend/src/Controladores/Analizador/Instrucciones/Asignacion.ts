import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from '../Simbolo/Tipo'

export default class Asignacion extends Instruccion {
    private Identificador: string
    private expresion: Instruccion

    constructor(Identificador: string, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.Identificador = Identificador
        this.expresion = expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let nuevo_valor = this.expresion.interpretar(arbol, tabla)
        if (nuevo_valor instanceof Errores) return nuevo_valor
        let valor = tabla.getVariable(this.Identificador.toLocaleLowerCase())
        if (valor == null){
            let error = new Errores("Semántico", "Variable No Existente", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Variable No Existente.")
            return error
        }
        if (this.expresion.tipo_dato.getTipo() != valor.getTipo().getTipo()){
            let error = new Errores("Semántico", "Asignación Incorrecta", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Asignación Incorrecta.")
            return error 
        }
        this.tipo_dato = valor.getTipo()
        valor.setValor(nuevo_valor)
    }
}