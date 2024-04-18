import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from '../Simbolo/Tipo'

export default class AsignacionMatriz extends Instruccion {
    private identificador: string
    private expresion: Instruccion
    private posicion_1: number
    private posicion_2: number

    constructor(identificador: string, posicion_1:number, posicion_2:number, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.identificador = identificador
        this.expresion = expresion
        this.posicion_1 = posicion_1
        this.posicion_2 = posicion_2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let nuevo_valor = this.expresion.interpretar(arbol, tabla)
        if (nuevo_valor instanceof Errores) return nuevo_valor
        let valor = tabla.getMatriz(this.identificador.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.fila, this.columna)
        if (this.expresion.tipo_dato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.fila, this.columna)
        this.tipo_dato = valor.getTipo()
        valor.setValores(this.posicion_1, this.posicion_2, nuevo_valor)
    }
}