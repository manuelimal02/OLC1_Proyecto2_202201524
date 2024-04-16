import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Continue extends Instruccion {
    private expresion: Instruccion
    constructor(expresion: Instruccion, linea: number, col: number) {
        super(new Tipo(tipo_dato.VOID), linea, col)
        this.expresion = expresion
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return;
    }
}