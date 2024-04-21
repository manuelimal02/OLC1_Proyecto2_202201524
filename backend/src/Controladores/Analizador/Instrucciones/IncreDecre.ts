import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class IncrementoDeremento extends Instruccion {
    constructor(private operando: string, fila: number, columna: number, private operando_unico: string) {
        super(new Tipo(tipo_dato.VOID), fila, columna);
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable = tabla.getVariable(this.operando_unico.toLocaleLowerCase());
        if (!valor_variable) {
            let error = new Errores("Semántico", "La Variable No Existe.", this.fila, this.columna)
            arbol.agregarError(error)
            arbol.setConsola("Semántico: La Variable No Existe.\n")
            return error
        }

        let tipo = valor_variable.getTipo().getTipo();
        if (tipo != tipo_dato.ENTERO && tipo != tipo_dato.DECIMAL) {
            let error = new Errores("Semántico", "No Se Puede Aplicar El Incremeneto o Decremento.", this.fila, this.columna);
            arbol.agregarError(error)
            arbol.setConsola("Semántico: No Se Puede Aplicar El Incremeneto o Decremento.\n")
            return error
        }

        let incremento = this.operando == "INC" ? 1 : this.operando == "DEC" ? -1 : null;
        if (incremento === null) {
            let error = new Errores("Semántico", "Error En Incremento o Decremento.", this.fila, this.columna);
            arbol.agregarError(error)
            arbol.setConsola("Semántico: Error En Incremento o Decremento.\n")
            return error
        }

        let valor = tipo == tipo_dato.ENTERO ? parseInt(valor_variable.getValor()) : parseFloat(valor_variable.getValor());
        valor_variable.setValor(valor + incremento);
    }
    obtener_ast(anterior: string): string {
        return ""
    }
}
