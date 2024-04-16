import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Continue extends Instruccion {
    constructor(linea: number, col: number) {
        super(new Tipo(tipo_dato.VOID), linea, col)
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return
    }
}
