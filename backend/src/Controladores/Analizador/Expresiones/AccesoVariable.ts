import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoVariable extends Instruccion {
    private id: string

    constructor(id: string, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valorVariable: Simbolo = tabla.getVariable(this.id)
        if (valorVariable == null) return new Errores("SEMANTICO", "Acceso Inválido", this.fila, this.columna)
        this.tipo_dato = valorVariable.getTipo()
        return valorVariable.getValor()
    }
}