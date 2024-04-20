import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";

export default class Default extends Instruccion {
    private instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        
        let nueva_tabla = new TablaSimbolo(tabla)
        nueva_tabla.setNombre("SentenciaDefault")
        arbol.agregarTabla(nueva_tabla)
        for(let ins of this.instrucciones) {
            if(ins instanceof Break) return ins 
            if(ins instanceof Continue) return ins 

            let resultado = ins.interpretar(arbol, nueva_tabla)
            if( resultado instanceof Errores) return resultado

            if(resultado instanceof Break) return resultado
            if(resultado instanceof Continue) return resultado
        }
    }
}