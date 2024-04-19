import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Casteo extends Instruccion {
    private valor: Instruccion | undefined
    private nuevo_tipo: Tipo

    constructor(operador: Tipo, fila: number, columna: number, valor: Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.nuevo_tipo = operador
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let expresion = this.valor?.interpretar(arbol, tabla)
        //falta comprobar error
        switch (this.nuevo_tipo.getTipo()) {
            case tipo_dato.ENTERO:
                return this.casteo_entero(expresion, arbol);
            case tipo_dato.DECIMAL:
                return this.casteo_decimal(expresion, arbol);
            case tipo_dato.CARACTER:
                return this.casteo_caracter(expresion, arbol);
            case tipo_dato.CADENA:
                return this.casteo_cadena(expresion, arbol);
            default:
                let error = new Errores("Semántico", "Tipo De Casteo Inválido", this.fila, this.columna);
                arbol.agregarError(error)
                arbol.setConsola("Semántico: Tipo De Casteo Inválido.\n")
                return error
        }       
        
    }

    casteo_entero(operando: any, arbol:Arbol) {
        let tipo_actual = this.valor?.tipo_dato.getTipo();
        switch (tipo_actual) {
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO);
                return parseInt(operando);
            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO);
                return parseInt(operando.charCodeAt(0));
            default:
                let error = new Errores("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna)
                arbol.agregarError(error)
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n")
                return error
        }
    }

    casteo_decimal(operando: any, arbol:Arbol) {
        let tipo_actual = this.valor?.tipo_dato.getTipo();
        switch (tipo_actual) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL);
                return parseFloat(operando);
            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL);
                return parseFloat(operando.charCodeAt(0));
            default:
                let error = new Errores("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna)
                arbol.agregarError(error)
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n")
                return error
        }
    }

    casteo_caracter(operando: any, arbol:Arbol) {
        let tipo_actual = this.valor?.tipo_dato.getTipo();
        switch (tipo_actual) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.CARACTER);
                return String.fromCharCode(parseInt(operando));
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.CARACTER);
                return String.fromCharCode(parseFloat(operando));
            default:
                let error = new Errores("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna)
                arbol.agregarError(error)
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n")
                return error
        }
    }

    casteo_cadena(operando: any, arbol:Arbol) {
        let tipo_actual = this.valor?.tipo_dato.getTipo();
        switch (tipo_actual) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.CADENA);
                return parseInt(operando).toString();
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.CADENA);
                return parseFloat(operando).toString();
            default:
                let error = new Errores("Semántico", "Valor Para Casterar Inválido", this.fila, this.columna)
                arbol.agregarError(error)
                arbol.setConsola("Semántico: Valor Para Casterar Inválido.\n")
                return error
        }
    }

}