import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";    
import Tipo, { tipo_dato } from '../ArbolAst/Tipo'
import Arreglo from '../ArbolAst/SimboloA';

export default class DeclaracionArreglo extends Instruccion {
    private identificador: string
    private valor: Instruccion

    constructor(tipo: Tipo, fila: number, columna: number, identificador: string , valor: Instruccion) {
        super(tipo, fila, columna)
        this.identificador = identificador
        this.valor = valor
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let arreglo = this.valor.interpretar(arbol, tabla)
        if (arreglo instanceof Errores) return arreglo
        if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo))){
            let error = new Errores("Semántico", "Error Al Declarar Arreglo.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error Al Declarar Arreglo.\n")
            return error
        }
    }
    obtener_ast(anterior: string): string {
        return ""
    }
}