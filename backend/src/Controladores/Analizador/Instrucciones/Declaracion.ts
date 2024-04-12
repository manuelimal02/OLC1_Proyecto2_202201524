import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from '../Simbolo/Tipo'

export default class Declaracion extends Instruccion {
    private id: string[]
    private valor: Instruccion

    constructor(tipo: Tipo, fila: number, columna: number, id: string[], valor: Instruccion) {
        super(tipo, fila, columna)
        this.id = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable;
        this.id.forEach((elemento) => {
            if(this.valor === null){
                valor_variable= this.valor_defecto(this.tipo_dato)
            }else{
                valor_variable = this.valor.interpretar(arbol, tabla)
                if (valor_variable instanceof Errores) return valor_variable
                if ((valor_variable  == "true" || valor_variable  == "false") && this.tipo_dato.getTipo() == tipo_dato.ENTERO) {
                    valor_variable = valor_variable.toLowerCase() == "true" ? 1 : 0;
                }else if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                    return new Errores("SEMANTICO", "Error Al Declarar Variable.", this.fila, this.columna)
                }
            }
            if (this.tipo_dato.getTipo() == tipo_dato.ENTERO) {
                if (parseInt(valor_variable) < -2147483648 || parseInt(valor_variable) > 2147483647) {
                    return new Errores("SEMANTICO", "Variable Fuera De Rango.", this.fila, this.columna);
                }
            }
            if (!tabla.setVariable(new Simbolo(this.tipo_dato, elemento, valor_variable))){
                return new Errores("SEMANTICO", "La Variable Ya Existe.", this.fila, this.columna)
            }
        });
    }

    private valor_defecto(tipo: Tipo): any {
        switch (tipo.getTipo()) {
            case tipo_dato.ENTERO:
                return "0"
            case tipo_dato.DECIMAL:
                return "0.0"
            case tipo_dato.BOOLEANO:
                return 'true'
            case tipo_dato.CARACTER:
                return ''
            case tipo_dato.CADENA:
                return ""
            default:
                return null
        }
    }

}