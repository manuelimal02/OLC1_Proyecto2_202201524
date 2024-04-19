import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Arreglo from "../Simbolo/SimboloA";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoMatriz extends Instruccion {
    private identificador: string
    private posicion_1: number

    constructor(identificador: string, fila: number, columna: number, posicion1:number) {
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
        this.tipo_dato = valor_variable.getTipo()
        return valor_variable.getValores(this.posicion_1)
    }
}