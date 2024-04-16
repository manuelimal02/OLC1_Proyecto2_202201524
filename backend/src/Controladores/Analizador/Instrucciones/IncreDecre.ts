import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class IncrementoDeremento extends Instruccion {
    constructor(private operando: string, fila: number, columna: number, private operando_unico: string) {
        super(new Tipo(tipo_dato.VOID), fila, columna);
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable = tabla.getVariable(this.operando_unico.toLocaleLowerCase());
        if (!valor_variable) {
            return new Errores("Semántico", "La Variable No Existe.", this.fila, this.columna);
        }

        let tipo = valor_variable.getTipo().getTipo();
        if (tipo != tipo_dato.ENTERO && tipo != tipo_dato.DECIMAL) {
            return new Errores("Semántico", "No Se Puede Aplicar El Incremeneto y Decremento.", this.fila, this.columna);
        }

        let incremento = this.operando == "INC" ? 1 : this.operando == "DEC" ? -1 : null;
        if (incremento === null) {
            return new Errores("Semántico", "No Se Puede Aplicar El Incremeneto y Decremento.", this.fila, this.columna);
        }

        let valor = tipo == tipo_dato.ENTERO ? parseInt(valor_variable.getValor()) : parseFloat(valor_variable.getValor());
        valor_variable.setValor(valor + incremento);
    }
}
