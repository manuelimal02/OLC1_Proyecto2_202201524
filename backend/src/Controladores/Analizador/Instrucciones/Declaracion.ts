import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from '../Simbolo/Tipo'

export default class Declaracion extends Instruccion {
    private Identificador: string[]
    private valor: Instruccion

    constructor(tipo: Tipo, fila: number, columna: number, Identificador: string[], valor: Instruccion) {
        super(tipo, fila, columna)
        this.Identificador = Identificador
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable;
        this.Identificador.forEach((elemento) => {
            if(this.valor === null){
                valor_variable= this.valor_defecto(this.tipo_dato)
            }else{
                valor_variable = this.valor.interpretar(arbol, tabla)
                if (valor_variable instanceof Errores) return valor_variable
                if ((valor_variable  == true || valor_variable  == false) && this.tipo_dato.getTipo() == tipo_dato.ENTERO) {
                    valor_variable = valor_variable == true ? 1 : 0;
                }else if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                    let error = new Errores("Semántico", "Error Al Declarar Variable.", this.fila, this.columna)
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Error Al Declarar Variable.\n")
                    return error
                }
            }
            if (this.tipo_dato.getTipo() == tipo_dato.ENTERO) {
                if (parseInt(valor_variable) < -2147483648 || parseInt(valor_variable) > 2147483647) {
                    let error = new Errores("Semántico", "Variable Int Fuera De Rango.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Variable Int Fuera De Rango.\n")
                    return error
                }
            }
            if (!tabla.setVariable(new Simbolo(this.tipo_dato, elemento, this.fila, this.columna, valor_variable))){
                let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                return error
            }
        });
    }

    private valor_defecto(tipo: Tipo): any {
        switch (tipo.getTipo()) {
            case tipo_dato.ENTERO:
                return 0
            case tipo_dato.DECIMAL:
                return 0
            case tipo_dato.BOOLEANO:
                return true
            case tipo_dato.CARACTER:
                return ''
            case tipo_dato.CADENA:
                return ""
            default:
                return null
        }
    }

}