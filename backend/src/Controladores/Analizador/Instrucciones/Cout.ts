import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Errores from "../Errores/Errores";

export default class Cout extends Instruccion {
    private expresion: Instruccion

    constructor(exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipo_dato.VOID), linea, col)
        this.expresion = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla)
        if (valor instanceof Errores) return valor
        arbol.Cout(valor)
    }
}