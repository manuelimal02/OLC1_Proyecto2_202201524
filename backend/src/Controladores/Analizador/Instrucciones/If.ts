import { Instruccion } from "../Abstract/Instruccion";
import Bloque from "../Instrucciones/Bloque";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Break from "./Break";

export default class If extends Instruccion {
    private condicion: Instruccion
    private bloque_if: Bloque
    private bloque_else: Bloque

    constructor(condicion: Instruccion, bloque_if:Bloque, bloque_else:Bloque, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.bloque_if = bloque_if
        this.bloque_else = bloque_else
    }

    public interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if (condicion instanceof Errores) return condicion
        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            return new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
        }
        if (condicion){
            const retorno =  this.bloque_if.interpretar(arbol,tabla)
            if (retorno) return retorno
        }
        else {
            const retorno = this.bloque_else?.interpretar(arbol,tabla)
            if (retorno) return retorno
        }
        return null
    }
}