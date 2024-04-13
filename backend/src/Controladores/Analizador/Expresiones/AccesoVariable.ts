import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoVariable extends Instruccion {
    private Identificador: string

    constructor(Identificador: string, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.Identificador = Identificador
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable: Simbolo = <Simbolo> tabla.getVariable(this.Identificador)
        if (valor_variable == null) return new Errores("Semántico", "Acceso Inválido", this.fila, this.columna)
        this.tipo_dato = valor_variable.getTipo()
        return valor_variable.getValor()
    }
}