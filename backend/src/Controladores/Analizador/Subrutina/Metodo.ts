import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Return from "../Transferencia/Return";

export default class Metodo extends Instruccion {

    public id: string;
    public parametros: any = [];
    public instrucciones: Instruccion[];
    public tipo: Tipo;
    public valor_retorno: any = Instruccion;

    constructor(id: string, tipo: Tipo, parametros: any[], instrucciones: Instruccion[], fila: number, columna: number) {
        super(tipo, fila, columna)
        this.id = id
        this.parametros = parametros
        this.tipo = tipo
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (this.tipo.getTipo() == tipo_dato.VOID) {
            for (let i of this.instrucciones) {
                let resultado_interpretacion = i.interpretar(arbol, tabla)
                if (resultado_interpretacion instanceof Errores) return resultado_interpretacion
                if (resultado_interpretacion instanceof Return) {
                    if (resultado_interpretacion.expresion != undefined) return resultado_interpretacion
                    return
                }
            }
        }else{
            let retorno_existente = false;
            for(let i of this.instrucciones){
                if(i instanceof Return){
                    retorno_existente = true
                    if(i.expresion != undefined){
                        this.valor_retorno = i.expresion
                        return i.expresion
                    }else{
                        let error = new Errores("Semántico", "Se Debe El Return Debe Retornar Un Valor", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Se Debe El Return Debe Retornar Un Valor.\n")
                        return error 
                    }
                }
                let resultado_interpretacion = i.interpretar(arbol, tabla);
                if(resultado_interpretacion instanceof Errores){
                    return resultado_interpretacion;
                }
                if(resultado_interpretacion instanceof Return){
                    if(resultado_interpretacion.expresion != undefined){
                        retorno_existente = true
                        this.valor_retorno = resultado_interpretacion.expresion
                        return resultado_interpretacion.expresion
                    }else{
                        let error = new Errores("Semántico", "Se Debe El Return Debe Retornar Un Valor", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Se Debe El Return Debe Retornar Un Valor.\n")
                        return error 
                    }
                }
            }
            if(retorno_existente == false){
                let error = new Errores("Semántico", "No Existe Un Retorno En La Función", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: No Existe Un Retorno En La Función.\n")
                return error
            }
        }
    }
}