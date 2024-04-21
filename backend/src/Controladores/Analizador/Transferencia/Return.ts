import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Arbol from "../ArbolAst/Arbol";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class Return extends Instruccion{

    public expresion: Instruccion | undefined;

    constructor(linea:number, columna:number,expresion?: Instruccion){
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.expresion != undefined){
            let result = this.expresion.interpretar(arbol, tabla);
            if(result instanceof Errores) return result;
        }
        return this;
    }
}