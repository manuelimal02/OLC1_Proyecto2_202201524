"use strict";
//import { Instruccion } from "../abstracto/instruccion";
//import Errores from "../errores/errores";
//import Arbol from "../simbolo/arbol";
//import Simbolo from "../simbolo/simbolo";
//import TablaSimbolos from "../simbolo/tabla.simbolos";
//import Tipo, { tipoD } from "../simbolo/tipo";
//
//export default class Metodo extends Instruccion {
//    public id: string
//    public parametros: any[]
//    public instrucciones: Instruccion[]
//
//    constructor(id:string, tipo: Tipo, instrucciones: Instruccion[], linea:number, columna: number, parametros: any[]) {
//        super(tipo, linea, columna)
//        this.id = id
//        this.parametros = parametros
//        this.instrucciones = instrucciones
//    }
//
//    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
//        if(this.tipoD.getTipo() != tipoD.VOID) 
//            return new Errores("Semantico", "El metodo debe de ser de tipo void", this.linea, this.columna)
//            for(let i of this.instrucciones) {
//                if( i instanceof Errores) return i
//                let resultado = i.interpretar(arbol, tabla)
//                if( resultado instanceof Errores) return resultado
//                
//            }
//        }
//}
