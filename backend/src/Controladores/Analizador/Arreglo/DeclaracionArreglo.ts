import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";    
import Tipo, { tipo_dato } from '../Simbolo/Tipo'
import Arreglo from '../Simbolo/SimboloA'

export default class DeclaracionArreglo extends Instruccion {
    private identificador: string
    private valor: Instruccion[]
    private tamano1: number | undefined

    constructor(tipo: Tipo, fila: number, columna: number, identificador: string , valor: Instruccion[], tamano1?: number) {
        super(tipo, fila, columna)
        this.identificador = identificador
        this.valor = valor
        this.tamano1=tamano1
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        if (this.valor == null && this.tamano1!= undefined) {
            switch (this.tipo_dato.getTipo()) {
                case tipo_dato.ENTERO:
                    let arreglo: number[] = new Array<number>(this.tamano1).fill(0)
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato,this.fila,this.columna,this.identificador, arreglo))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.DECIMAL:
                    let arreglo2: number[] = new Array<number>(this.tamano1).fill(0.0)
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo2))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.BOOLEANO:
                    let arreglo3: boolean[] = new Array<boolean>(this.tamano1).fill(true)
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo3))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.CADENA:
                    let arreglo4: string[] = new Array<string>(this.tamano1).fill("")
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo4))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.CARACTER:
                    let arreglo5: string[] = new Array<string>(this.tamano1).fill('')
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo5))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                default:
                    let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                    return error
            }  
        } else if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, this.valor))){
            let error = new Errores("Semántico", "Error Al Declarar Arreglo.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error Al Declarar Arreglo.\n")
            return error
        }
    }
}