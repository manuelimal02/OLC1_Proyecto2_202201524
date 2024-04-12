import Arbol from "../Simbolo/Arbol";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo from "../Simbolo/Tipo";

export abstract class Instruccion {
    public tipo_dato: Tipo
    public fila: number
    public columna: number

    constructor(tipo: Tipo, fila: number, columna: number) {
        this.tipo_dato = tipo
        this.fila = fila
        this.columna = columna
    }

    abstract interpretar(arbol: Arbol, tabla: TablaSimbolos): any

}