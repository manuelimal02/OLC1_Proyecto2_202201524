import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";    
import Tipo, { tipo_dato } from '../Simbolo/Tipo'
import Arreglo from '../Simbolo/SimboloA';
import Nativo from "../Expresiones/Nativo";

export default class DeclaracionArreglo extends Instruccion {
    private identificador: string
    private valor: Instruccion[]
    private tamano: Instruccion | undefined

    constructor(tipo: Tipo, fila: number, columna: number, identificador: string , valor: Instruccion[], tamano?: Instruccion) {
        super(tipo, fila, columna)
        this.identificador = identificador
        this.valor = valor
        this.tamano=tamano
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null && this.tamano!= undefined) {
            let tamano1Num = parseInt(this.tamano.interpretar(arbol, tabla))
            switch (this.tipo_dato.getTipo()) {
                case tipo_dato.ENTERO:
                    let arreglo: Nativo[] = new Array<Nativo>(tamano1Num);
                    for (let i = 0; i < arreglo.length; i++) {
                        arreglo[i] = new Nativo(this.tipo_dato, "0", 0, 0);
                    }
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato,this.fila,this.columna,this.identificador, arreglo))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.DECIMAL:
                    let arreglo2: Nativo[] = new Array<Nativo>(tamano1Num);
                    for (let i = 0; i < arreglo2.length; i++) {
                        arreglo2[i] = new Nativo(this.tipo_dato, "0.0", 0, 0);
                    }
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo2))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.BOOLEANO:
                    let arreglo3: Nativo[] = new Array<Nativo>(tamano1Num);
                    for (let i = 0; i < arreglo3.length; i++) {
                        arreglo3[i] = new Nativo(this.tipo_dato, true, 0, 0);
                    }
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo3))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.CADENA:
                    let arreglo4: Nativo[] = new Array<Nativo>(tamano1Num);
                    for (let i = 0; i < arreglo4.length; i++) {
                        arreglo4[i] = new Nativo(this.tipo_dato, "", 0, 0);
                    }
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato, this.fila, this.columna, this.identificador, arreglo4))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                case tipo_dato.CARACTER:
                    let arreglo5: Nativo[] = new Array<Nativo>(tamano1Num);
                    for (let i = 0; i < arreglo5.length; i++) {
                        arreglo5[i] = new Nativo(this.tipo_dato, '', 0, 0);
                    }
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