import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Matriz from "../Simbolo/SimboloM";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoMatriz extends Instruccion {
    private identificador: string
    private posicion_1: Instruccion
    private posicion_2: Instruccion

    constructor(identificador: string, fila: number, columna: number, posicion1:Instruccion, posicion2:Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.identificador = identificador
        this.posicion_1 = posicion1
        this.posicion_2 = posicion2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor_variable: Matriz = <Matriz> tabla.getMatriz(this.identificador)
        if (valor_variable == null) {
            let error = new Errores("Semántico", "Acceso Matriz Inválido.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Acceso Matriz Inválido.\n")
            return error 
        }
        let posicion1 = parseInt(this.posicion_1.interpretar(arbol, tabla))
        let posicion2 = parseInt(this.posicion_2.interpretar(arbol, tabla))
        this.tipo_dato = valor_variable.getTipo()
        return valor_variable.getValores(posicion1, posicion2)
    }
}