import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Break from "./Break";

export default class Bloque extends Instruccion {
    private instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.instrucciones = instrucciones
    }

    public interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let nueva_tabla = new TablaSimbolo(tabla)
        nueva_tabla.setNombre("Tabla_Nueva")
        for (let i of this.instrucciones) {
            if (i instanceof Break) return i;
            let resultado = i.interpretar(arbol, nueva_tabla)
        }
        return null
    }
}