import Arbol from "../ArbolAst/Arbol";
import TablaSimbolos from "../ArbolAst/TablaSimbolo";
import Tipo from "../ArbolAst/Tipo";

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
    abstract obtener_ast(anterior: string): string
}