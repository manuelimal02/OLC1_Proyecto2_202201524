import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";    
import Tipo, { tipo_dato } from '../Simbolo/Tipo'
import Matriz from '../Simbolo/SimboloM'
import Nativo from "../Expresiones/Nativo";

export default class DeclaracionMatriz extends Instruccion {
    private identificador: string
    private valor: Instruccion[][]
    private tamano1: Instruccion | undefined
    private tamano2: Instruccion | undefined

    constructor(tipo: Tipo, fila: number, columna: number, identificador: string , valor: Instruccion[][], tamano1?: Instruccion , tamano2?: Instruccion) {
        super(tipo, fila, columna)
        this.identificador = identificador
        this.valor = valor
        this.tamano1=tamano1
        this.tamano2=tamano2
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        if (this.valor == null && this.tamano1!= undefined && this.tamano2!=undefined) {
            let tamano1Num = parseInt(this.tamano1.interpretar(arbol, tabla))
            let tamano2Num = parseInt(this.tamano2.interpretar(arbol, tabla))
            switch (this.tipo_dato.getTipo()) {
                case tipo_dato.ENTERO:
                    let matriz: Nativo[][] = new Array<Array<Nativo>>(tamano1Num);
                    for (let i = 0; i < matriz.length; i++) {
                        matriz[i] = new Array<Nativo>(tamano2Num);
                        for (let j = 0; j < matriz[i].length; j++) {
                            matriz[i][j] = new Nativo(this.tipo_dato, "0", 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.fila,this.columna,this.identificador, matriz))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.DECIMAL:
                    let matriz1: Nativo[][] = new Array<Array<Nativo>>(tamano1Num);
                    for (let i = 0; i < matriz1.length; i++) {
                        matriz1[i] = new Array<Nativo>(tamano2Num);
                        for (let j = 0; j < matriz1[i].length; j++) {
                            matriz1[i][j] = new Nativo(this.tipo_dato, "0.0", 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.fila,this.columna,this.identificador, matriz1))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.BOOLEANO:
                    let matriz3: Nativo[][] = new Array<Array<Nativo>>(tamano1Num);
                    for (let i = 0; i < matriz3.length; i++) {
                        matriz3[i] = new Array<Nativo>(tamano2Num);
                        for (let j = 0; j < matriz3[i].length; j++) {
                            matriz3[i][j] = new Nativo(this.tipo_dato, true, 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.fila,this.columna,this.identificador, matriz3))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.CADENA:
                    let matriz4: Nativo[][] = new Array<Array<Nativo>>(tamano1Num);
                    for (let i = 0; i < matriz4.length; i++) {
                        matriz4[i] = new Array<Nativo>(tamano2Num);
                        for (let j = 0; j < matriz4[i].length; j++) {
                            matriz4[i][j] = new Nativo(this.tipo_dato, "", 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.fila,this.columna,this.identificador, matriz4))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.CARACTER:
                    let matriz5: Nativo[][] = new Array<Array<Nativo>>(tamano1Num);
                    for (let i = 0; i < matriz5.length; i++) {
                        matriz5[i] = new Array<Nativo>(tamano2Num);
                        for (let j = 0; j < matriz5[i].length; j++) {
                            matriz5[i][j] = new Nativo(this.tipo_dato, '', 0, 0);
                        }
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.fila,this.columna,this.identificador, matriz5))){
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
        } else if (!tabla.setMatriz(new Matriz(this.tipo_dato, this.fila,this.columna,this.identificador,this.valor))){
            let error = new Errores("Semántico", "Error Al Declarar Matriz.", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Error Al Declarar Matriz.\n")
            return error
        }
    }
}