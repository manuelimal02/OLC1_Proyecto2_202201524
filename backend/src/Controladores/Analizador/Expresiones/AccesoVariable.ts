import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import Simbolo from "../ArbolAst/Simbolo";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class AccesoVariable extends Instruccion {
    private Identificador: string

    constructor(Identificador: string, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.Identificador = Identificador
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable: Simbolo = <Simbolo> tabla.getVariable(this.Identificador)
        if (valor_variable == null){
            let error = new Errores("Semántico", "Acceso Inválido.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Acceso Inválido.\n")
            return error 
        }
        this.tipo_dato = valor_variable.getTipo()
        return valor_variable.getValor()
    }
    obtener_ast(anterior: string): string {
        return ""
    }
}