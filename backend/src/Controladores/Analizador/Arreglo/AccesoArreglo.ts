import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import Arreglo from "../ArbolAst/SimboloA";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class AccesoMatriz extends Instruccion {
    private identificador: string
    private posicion_1: Instruccion

    constructor(identificador: string, fila: number, columna: number, posicion1:Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.identificador = identificador
        this.posicion_1 = posicion1
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor_variable: Arreglo = <Arreglo> tabla.getArreglo(this.identificador)
        if (valor_variable == null) {
            let error = new Errores("Semántico", "Acceso Arreglo Inválido.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Acceso Arreglo Inválido.\n")
            return error 
        }
        let posicion1 = parseInt(this.posicion_1.interpretar(arbol, tabla))
        this.tipo_dato = valor_variable.getTipo()
        return valor_variable.getValores(posicion1)
    }
}