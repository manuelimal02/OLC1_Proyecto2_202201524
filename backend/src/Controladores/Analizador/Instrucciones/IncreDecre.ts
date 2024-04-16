import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class IncrementoDeremento extends Instruccion {
    private operando_unico: string
    private operando: string

    constructor(operando: string, fila: number, columna: number, op_unico: string) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.operando_unico = op_unico
        this.operando = operando
        
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable = tabla.getVariable(this.operando_unico.toLocaleLowerCase());
        if (valor_variable == null) {
            return new Errores("Semántico", "La Variable No Existe.", this.fila, this.columna)
        }

        if (valor_variable.getTipo().getTipo()!= tipo_dato.ENTERO && valor_variable.getTipo().getTipo()!= tipo_dato.DECIMAL){
            return new Errores("Semántico", "No Se Puede Aplicar El Incremeneto y Decremento.", this.fila, this.columna)
        }

        if (this.operando=="INC"){
            if(valor_variable.getTipo().getTipo()==tipo_dato.ENTERO){
                valor_variable.setValor(parseInt(valor_variable.getValor())+1)
            }
            else if(valor_variable.getTipo().getTipo()==tipo_dato.DECIMAL){
                valor_variable.setValor(parseFloat(valor_variable.getValor())+1)
            }
        }else if(this.operando=="DEC"){
            if(valor_variable.getTipo().getTipo()==tipo_dato.ENTERO){
                valor_variable.setValor(parseInt(valor_variable.getValor())-1)
            }
            else if(valor_variable.getTipo().getTipo()==tipo_dato.DECIMAL){
                valor_variable.setValor(parseFloat(valor_variable.getValor())-1)
            }
        }else{
            return new Errores("Semántico", "No Se Puede Aplicar El Incremeneto y Decremento.", this.fila, this.columna)
        }
        
    }
}