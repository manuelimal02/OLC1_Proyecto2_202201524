import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from '../Simbolo/Tipo'

export default class Asignacion extends Instruccion {
    private id: string
    private exp: Instruccion

    constructor(id: string, exp: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.id = id
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        if (NewValor instanceof Errores) return NewValor
        let valor = tabla.getVariable(this.id.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable No Existente", this.fila, this.columna)
        if (this.exp.tipo_dato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion Incorrecta", this.fila, this.columna)
        this.tipo_dato = valor.getTipo()
        valor.setValor(NewValor)
    }
}