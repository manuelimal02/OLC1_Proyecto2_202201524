import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class IncrementoVariable extends Instruccion {
    private Identificador: string

    constructor(Identificador: string, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.Identificador = Identificador
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable: Simbolo = <Simbolo> tabla.getVariable(this.Identificador)
        if (valor_variable == null) return new Errores("Semántico", "Variable No Existente", this.fila, this.columna)

        let valor_incrementado: number;
        switch (valor_variable.getTipo().getTipo()) {
            case tipo_dato.ENTERO:
                valor_incrementado = valor_variable.getValor() + 1
                valor_variable.setValor(valor_incrementado)
                this.tipo_dato = valor_variable.getTipo()
                return valor_incrementado
            case tipo_dato.DECIMAL:
                valor_incrementado = valor_variable.getValor() + 1
                valor_variable.setValor(valor_incrementado)
                this.tipo_dato = valor_variable.getTipo()
                return valor_incrementado
            default:
                return new Errores("Semántico", "Tipo de dato no soportado para incremento", this.fila, this.columna)
        }
    }
}

