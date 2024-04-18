import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Matriz from "../Simbolo/SimboloM";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoMatriz extends Instruccion {
    private identificador: string
    private posicion_1: number
    private posicion_2: number

    constructor(identificador: string, fila: number, columna: number, posicion1:number, posicion2:number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.identificador = identificador
        this.posicion_1 = posicion1
        this.posicion_2 = posicion2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor_variable: Matriz = <Matriz> tabla.getMatriz(this.identificador)
        if (valor_variable == null) return new Errores("SEMANTICO", "Acceso invalido", this.fila, this.columna)
        this.tipo_dato = valor_variable.getTipo()
        return valor_variable.getValores(this.posicion_1, this.posicion_2)
    }
}