import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Nativo from "../Expresiones/Nativo";

export default class FuncionesSTR extends Instruccion {
    private valor_cadena: Instruccion | undefined
    private operacion: Funcion

    constructor(operador: Funcion, fila: number, columna: number, valor_cadena: Instruccion) {
        super(new Tipo(tipo_dato.CADENA), fila, columna)
        this.valor_cadena = valor_cadena
        this.operacion = operador
        
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_unico = null
        if (this.valor_cadena != null) {
            valor_unico = this.valor_cadena.interpretar(arbol, tabla)
            if (valor_unico instanceof Errores) return valor_unico
        } 
        switch (this.operacion) {
            case Funcion.C_STR:
                return this.c_str(valor_unico, arbol)
            default:
                let error = new Errores("Semántico", "Función ToLower Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función ToLower Inválida.\n")
                return error
        }
    }

    c_str(valor_cadena: any, arbol:Arbol) {
        let op_unico = this.valor_cadena?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.CARACTER)
                let caracteres = valor_cadena.split("");
                let arreglo: Nativo[] = new Array<Nativo>(caracteres.length);
                for (let i = 0; i < caracteres.length; i++) {
                    arreglo[i] = new Nativo(this.tipo_dato, caracteres[i], 0, 0);
                }
                return arreglo
            default:
                let error = new Errores("Semántico", "Función ToLower Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Función ToLower Inválida.\n")
                return error
        }
    }
    obtener_ast(anterior: string): string {
        return ""
    }
}

export enum Funcion {
    C_STR
}
