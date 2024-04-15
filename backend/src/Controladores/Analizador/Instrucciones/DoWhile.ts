import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Bloque from "./Bloque";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class DoWhile extends Instruccion {
    private condicion: Instruccion
    private bloque: Bloque

    constructor(condicion: Instruccion, bloque:Bloque, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.bloque = bloque
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if (condicion instanceof Errores) return condicion
        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            return new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
        }
        do {
            const retorno =  this.bloque.interpretar(arbol,tabla);
            if (retorno) return retorno;
        } while (this.condicion.interpretar(arbol, tabla));
    }
}