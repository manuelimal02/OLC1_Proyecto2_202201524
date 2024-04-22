import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

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
    obtener_ast(anterior: string): string {
        let dot = "";
        let contador = Singleton.getInstancia();
        let lista_tipo_parametro = [];
        let lista_parametros = [];
        let lista_instrucciones = [];
        let raiz = `n${contador.getContador()}`;
        let tipo_funcion = `n${contador.getContador()}`;
        let raiz_identificador = `n${contador.getContador()}`;
        let identificador = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let parametros = `n${contador.getContador()}`;
        for(let i = 0; i < this.parametros.length; i++){
            lista_tipo_parametro.push(`n${contador.getContador()}`);
            lista_parametros.push(`n${contador.getContador()}`);
        }
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz_instrucciones = `n${contador.getContador()}`;
        for(let i= 0; i< this.instrucciones.length; i++){
            lista_instrucciones.push(`n${contador.getContador()}`);
        }
        let llave_derecha = `n${contador.getContador()}`;
        dot += `${raiz}[label="METODOS"];\n`
        if(this.tipo.getTipo() == tipo_dato.VOID){
            dot += `${tipo_funcion}[label="VOID"];\n`
        }else if(this.tipo.getTipo() == tipo_dato.ENTERO){
            dot += `${tipo_funcion}[label="INT"];\n`
        }else if(this.tipo.getTipo() == tipo_dato.DECIMAL){
            dot += `${tipo_funcion}[label="DOUBLE"];\n`
        }else if(this.tipo.getTipo() == tipo_dato.CADENA){
            dot += `${tipo_funcion}[label="STRING"];\n`
        }else if(this.tipo.getTipo() == tipo_dato.BOOLEANO){
            dot += `${tipo_funcion}[label="BOOLE"];\n`
        }
        dot += `${raiz_identificador}[label="ID"];\n`
        dot += `${identificador}[label="${this.id}"];\n`
        dot += `${parentesis_izquierdo}[label="("];\n`
        dot += `${parametros}[label="PARAMETROS"];\n`
        for(let i = 0; i < this.parametros.length; i++){
            if(this.parametros[i].tipo.getTipo() == tipo_dato.ENTERO){
                dot += `${lista_tipo_parametro[i]}[label="INT"];\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.DECIMAL){
                dot += `${lista_tipo_parametro[i]}[label="DOUBLE"];\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.CADENA){
                dot += `${lista_tipo_parametro[i]}[label="STRING"];\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.BOOLEANO){
                dot += `${lista_tipo_parametro[i]}[label="BOOLE"];\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.VOID){
                dot += `${lista_tipo_parametro[i]}[label="VOID"];\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.CARACTER){
                dot += `${lista_tipo_parametro[i]}[label="CHAR"];\n`
            }
            
            dot += `${lista_parametros[i]}[label="${this.parametros[i].id}"];\n`
        }
        dot += `${parentesis_derecho}[label=")"];\n`
        dot += `${llave_izquierda}[label="{"];\n`
        dot += `${raiz_instrucciones}[label="INSTRUCCIONES"];\n`
        for(let i = 0; i < this.instrucciones.length; i++){
            dot += `${lista_instrucciones[i]}[label="INSTRUCCION"];\n`
        }
        dot += `${llave_derecha}[label="}"];\n`
        dot += `${raiz} -> ${tipo_funcion};\n`
        dot += `${raiz} -> ${raiz_identificador};\n`
        dot += `${raiz_identificador} -> ${identificador};\n`
        dot += `${raiz} -> ${parentesis_izquierdo};\n`
        dot += `${raiz} -> ${parametros};\n`
        for(let i = 0; i < this.parametros.length; i++){
            dot += `${parametros} -> ${lista_tipo_parametro[i]};\n`
            dot += `${parametros} -> ${lista_parametros[i]};\n`
        }
        dot += `${raiz} -> ${parentesis_derecho};\n`
        dot += `${raiz} -> ${llave_izquierda};\n`
        dot += `${raiz} -> ${raiz_instrucciones};\n`
        for(let i = 0; i < this.instrucciones.length; i++){
            dot += `${raiz_instrucciones} -> ${lista_instrucciones[i]};\n`
        }
        dot += `${raiz} -> ${llave_derecha};\n`
        dot += `${anterior} -> ${raiz};\n`
        for(let i = 0; i < this.instrucciones.length; i++){
            dot += this.instrucciones[i].obtener_ast(lista_instrucciones[i])
        }
        return dot
    }
}