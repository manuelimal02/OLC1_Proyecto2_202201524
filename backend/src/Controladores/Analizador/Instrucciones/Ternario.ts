import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";


export default class Ternario extends Instruccion {
    private condicion: Instruccion
    private expresion1: Instruccion
    private expresion2: Instruccion


    constructor(condicion: Instruccion, expresion1: Instruccion , expresion2:Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.expresion1 = expresion1
        this.expresion2 = expresion2
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {

        let retorno = this.condicion.interpretar(arbol, tabla);
        if(retorno instanceof Errores) return retorno;

        let expresion_1 = this.expresion1.interpretar(arbol, tabla);
        if(expresion_1 instanceof Errores) return expresion_1;

        let expresion_2 = this.expresion2.interpretar(arbol, tabla);
        if(expresion_2 instanceof Errores) return expresion_2;

        if(this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO){
            let error = new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana.", this.fila, this.columna);
            arbol.agregarError(error)
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n")
            return error
        }

        if(retorno){
            this.tipo_dato = this.expresion1.tipo_dato;
            return expresion_1;
        }else{

            this.tipo_dato = this.expresion2.tipo_dato;
            return expresion_2;
        }
    }
}
