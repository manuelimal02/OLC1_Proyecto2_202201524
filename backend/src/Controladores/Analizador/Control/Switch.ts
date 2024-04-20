import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolos from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Case from "./Case";

export default class Switch extends Instruccion {
    private condicion_switch: Instruccion
    private opcion_case: Case[] | undefined
    private opcion_default: Instruccion | undefined

    constructor(condicion_switch: Instruccion, fila: number, columna: number, opcion_case: Case[], opcion_default: Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion_switch = condicion_switch
        this.opcion_case = opcion_case
        this.opcion_default = opcion_default
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condicion = this.condicion_switch.interpretar(arbol, tabla)
        if(condicion instanceof Errores) return condicion
        if(this.opcion_case != undefined) {
            for(let caso of this.opcion_case) {
                caso.condicional_case = this.condicion_switch
                let resultado = caso.interpretar(arbol, tabla)
                    if( resultado instanceof Errores) return resultado
                    if(resultado instanceof Break) return
                    if(resultado instanceof Continue){
                        let error = new Errores("Semántico", "La función continue no es parte del switch.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La función continue no es parte del switch.\n")
                        return error
                    }
            }
        }
        if(this.opcion_default != undefined) {
            let condicion_default = this.opcion_default.interpretar(arbol, tabla)
            if(condicion_default instanceof Break) return
            if(condicion_default instanceof Continue){
                let error = new Errores("Semántico", "La función continue no es parte del switch.", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: La función continue no es parte del switch.\n")
                return error
            }
            if( condicion_default instanceof Errores) return condicion_default
        }
    }
}