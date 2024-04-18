import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";    
import Tipo, { tipo_dato } from '../Simbolo/Tipo'
import Matriz from '../Simbolo/SimboloM'

export default class DeclaracionMatriz extends Instruccion {
    private identificador: string
    private valor: Instruccion[][]
    private tamano1: number | undefined
    private tamano2: number | undefined

    constructor(tipo: Tipo, fila: number, columna: number, identificador: string , valor: Instruccion[][], tamano1?: number, tamano2?: number) {
        super(tipo, fila, columna)
        this.identificador = identificador
        this.valor = valor
        this.tamano1=tamano1
        this.tamano2=tamano2
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null && this.tamano1!= undefined && this.tamano2!=undefined) {
            switch (this.tipo_dato.getTipo()) {
                case tipo_dato.ENTERO:
                    let matriz: number[][] = new Array<Array<number>>(this.tamano1);
                    for (let i = 0; i < matriz.length; i++) {
                        matriz[i] = new Array<number>(this.tamano2).fill(0);
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.identificador, matriz))){
                        arbol.setConsola("Error Al Declarar Matriz Entera.")
                        return new Errores("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna)
                    }
                    break
                case tipo_dato.DECIMAL:
                    let matriz1: number[][] = new Array<Array<number>>(this.tamano1);
                    for (let i = 0; i < matriz1.length; i++) {
                        matriz1[i] = new Array<number>(this.tamano2).fill(0.0);
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.identificador, matriz1))){
                        arbol.setConsola("Error Al Declarar Matriz Decimal.")
                        return new Errores("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna)
                    }
                    break
                case tipo_dato.BOOLEANO:
                    let matriz3: boolean[][] = new Array<Array<boolean>>(this.tamano1);
                    for (let i = 0; i < matriz3.length; i++) {
                        matriz3[i] = new Array<boolean>(this.tamano2).fill(true);
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.identificador, matriz3))){
                        arbol.setConsola("Error Al Declarar Matriz Booleana.")
                        return new Errores("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna)
                    }
                    break
                case tipo_dato.CADENA:
                    let matriz4: string[][] = new Array<Array<string>>(this.tamano1);
                    for (let i = 0; i < matriz4.length; i++) {
                        matriz4[i] = new Array<string>(this.tamano2).fill("");
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.identificador, matriz4))){
                        arbol.setConsola("Error Al Declarar Matriz Cadena.")
                        return new Errores("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna)
                    }
                    break
                case tipo_dato.CARACTER:
                    let matriz5: string[][] = new Array<Array<string>>(this.tamano1);
                    for (let i = 0; i < matriz5.length; i++) {
                        matriz5[i] = new Array<string>(this.tamano2).fill('');
                    }
                    if (!tabla.setMatriz(new Matriz(this.tipo_dato,this.identificador, matriz5))){
                        arbol.setConsola("Error Al Declarar Matriz Caracter.")
                        return new Errores("SEMANTICO", "Error Al Declarar Arreglo.", this.fila, this.columna)
                    }
                    break
                default:
                    arbol.setConsola("Error")
                    return new Errores("SEMANTICO", "Error", this.fila, this.columna)
            }  
        } else if (!tabla.setMatriz(new Matriz(this.tipo_dato, this.identificador,this.valor))){
            return new Errores("SEMANTICO", "Error Al Declarar Arreglo", this.fila, this.columna)
        }
    }
}