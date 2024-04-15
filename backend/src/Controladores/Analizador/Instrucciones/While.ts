import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Break from "./Break";

export default class While extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]

    constructor(condicion: Instruccion, instrucciones: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if (condicion instanceof Errores) return condicion
        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            return new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
        }
        while (this.condicion.interpretar(arbol, tabla)) {
            let nueva_tabla = new tablaSimbolo(tabla)
            nueva_tabla.setNombre("Sentencia_While")
            for (let i of this.instrucciones) {
                if (i instanceof Break) return;
                let resultado = i.interpretar(arbol, nueva_tabla)
                if (resultado instanceof Break) return;
            }
        }
    }
}