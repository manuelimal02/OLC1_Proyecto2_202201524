import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Break extends Instruccion {
    constructor(fila: number, col: number) {
        super(new Tipo(tipo_dato.VOID), fila, col)
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        return;
    }
}