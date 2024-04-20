import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Errores from "../Errores/Errores";

export default class Metodo extends Instruccion {
    public identificador: string
    public parametro: any[]
    public instrucciones: Instruccion[]
    
    constructor(identificador: string, tipo:Tipo, instrucciones: Instruccion[], fila: number, columna: number, parametro?: any[]) {
        super(tipo, fila, columna)
        this.identificador = identificador
        this.parametro = parametro ?? []
        this.instrucciones = instrucciones
    }
    
    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        for (let instruccion of this.instrucciones) {
            let val = instruccion.interpretar(arbol, tabla)
            if (val instanceof Errores) return val
        }
    }
}