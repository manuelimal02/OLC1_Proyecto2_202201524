import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from '../ArbolAst/Tipo'

export default class AsignacionMatriz extends Instruccion {
    private identificador: string
    private expresion: Instruccion
    private posicion_1: Instruccion

    constructor(identificador: string, posicion_1:Instruccion, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.identificador = identificador
        this.expresion = expresion
        this.posicion_1 = posicion_1
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let nuevo_valor = this.expresion.interpretar(arbol, tabla)
        if (nuevo_valor instanceof Errores) return nuevo_valor
        let valor = tabla.getArreglo(this.identificador.toLocaleLowerCase())
        if (valor == null){
            let error = new Errores("Semántico", "Variable No Existente.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Variable No Existente.\n")
            return error
        }
        if (this.expresion.tipo_dato.getTipo() != valor.getTipo().getTipo()){
            let error = new Errores("Semántico", "Asignación Incorrecta En Arreglo.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Asignación Incorrecta En Arreglo.\n")
            return error 
        }
        let posicion1 = this.posicion_1.interpretar(arbol, tabla)
        if (posicion1 instanceof Errores) return posicion1
        this.tipo_dato = valor.getTipo()
        valor.setValores(parseInt(posicion1), nuevo_valor)
    }
}