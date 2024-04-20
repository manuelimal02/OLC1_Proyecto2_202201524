import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class Return extends Instruccion {
    private expresion?: Instruccion
    public retorno = null

    constructor(linea: number, columna: number, expresion?: Instruccion) {
        super(new Tipo(tipo_dato.ENTERO), linea, columna)
        this.expresion = expresion
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.expresion){
        this.retorno = this.expresion.interpretar(arbol, tabla)
        this.tipo_dato = this.expresion.tipo_dato
    }
    return this
}
}