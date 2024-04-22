import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Arbol from "../ArbolAst/Arbol";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Metodo from "./Metodo";
import Declaracion from "../Instrucciones/Declaracion";
import Singleton from "../ArbolAst/Singleton";

export default class Llamada extends Instruccion {

    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, parametros: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let busqueda_funcion = arbol.getFuncion(this.id);
        if (busqueda_funcion == null) {
            let error = new Errores("Semántico", "No Existe La Función: "+ this.id, this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: No Existe La Función: "+ this.id+".\n")
            return error 
        }
        this.tipo_dato.setTipo(busqueda_funcion.tipo.getTipo());
        if (busqueda_funcion instanceof Metodo) {
            if (busqueda_funcion.tipo.getTipo() == tipo_dato.VOID) {

                let nueva_tabla = new TablaSimbolo(tabla);
                nueva_tabla.setNombre(this.id)
                arbol.agregarTabla(nueva_tabla)
                
                if (busqueda_funcion.parametros.length != this.parametros.length) {
                    let error = new Errores("Semántico", "Cantidad De Parámetros Inválida: "+ this.id, this.fila, this.columna)
                    arbol.agregarError(error)
                    arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: "+ this.id+".\n")
                    return error 
                }
                for (let i = 0; i < busqueda_funcion.parametros.length; i++) {
                    let declaracion_parametro = new Declaracion(
                        busqueda_funcion.parametros[i].tipo, 
                        this.fila, 
                        this.columna, 
                        busqueda_funcion.parametros[i].id, 
                        this.parametros[i]
                    );
                    let resultado:any = declaracion_parametro.interpretar(arbol, nueva_tabla);
                    if (resultado instanceof Errores) return resultado;
                }
                let resultado_funcion: any = busqueda_funcion.interpretar(arbol, nueva_tabla);
                if (resultado_funcion instanceof Errores) return resultado_funcion;
            } else {

                let nueva_tabla = new TablaSimbolo(tabla);
                nueva_tabla.setNombre(this.id);
                arbol.agregarTabla(nueva_tabla)

                if (busqueda_funcion.parametros.length != this.parametros.length) {
                    let error = new Errores("Semántico", "Cantidad De Parámetros Inválida: "+ this.id, this.fila, this.columna)
                    arbol.agregarError(error)
                    arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: "+ this.id+".\n")
                    return error 
                }
                for (let i = 0; i < busqueda_funcion.parametros.length; i++) {
                    let nueva_variable = this.parametros[i].interpretar(arbol, nueva_tabla);
                    let declaracion_parametro = new Declaracion(
                        busqueda_funcion.parametros[i].tipo, 
                        this.fila, this.columna, 
                        busqueda_funcion.parametros[i].id, 
                        this.parametros[i]
                    );
                    let resultado:any = declaracion_parametro.interpretar(arbol, nueva_tabla);
                    if (resultado instanceof Errores) return resultado
                    let variable_interpretada = nueva_tabla.getVariable(busqueda_funcion.parametros[i].id[0])

                    if(variable_interpretada != null){
                        if(busqueda_funcion.parametros[i].tipo.getTipo() != variable_interpretada.getTipo().getTipo()){
                            let error = new Errores("Semántico", "Cantidad De Parámetros Inválida: "+ this.id, this.fila, this.columna)
                            arbol.agregarError(error)
                            arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: "+ this.id+".\n")
                            return error 
                        }else{
                            variable_interpretada.setValor(nueva_variable);  
                        }
                    }else{
                        let error = new Errores("Semántico", "Cantidad De Parámetros Inválida: "+ this.id, this.fila, this.columna)
                        arbol.agregarError(error)
                        arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: "+ this.id+".\n")
                        return error 
                    }
                }
                let resultado_funcion: any = busqueda_funcion.interpretar(arbol, nueva_tabla)
                if (resultado_funcion instanceof Errores) return resultado_funcion
                return busqueda_funcion.valor_retorno.interpretar(arbol, nueva_tabla)
            }
        }
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia()
        let dot = ""
        let llamada = `n${contador.getContador()}`
        let identificador = `n${contador.getContador()}`
        let parentesis_izquierdo = `n${contador.getContador()}`
        let puntocoma = `n${contador.getContador()}`
        let lista_parametros = [];
        for (let i = 0; i < this.parametros.length; i++) {
            lista_parametros.push(`n${contador.getContador()}`)
        }
        let parentesis_derecho = `n${contador.getContador()}`
        dot += `${llamada}[label="LLAMADA"];\n`
        dot += `${identificador}[label="${this.id}"];\n`
        dot += `${parentesis_izquierdo}[label="("];\n`
        for(let i = 0; i < this.parametros.length; i++){
            dot += `${lista_parametros[i]}[label="PARAMETRO"];\n`;
        }
        dot += `${parentesis_derecho}[label=")"];\n`
        dot += `${puntocoma}[label=";"];\n`
        dot += `${anterior} -> ${llamada};\n`
        dot += `${llamada} -> ${identificador};\n`
        dot += `${llamada} -> ${parentesis_izquierdo};\n`
        for(let i = 0; i < this.parametros.length; i++){
            dot += `${llamada} -> ${lista_parametros[i]};\n`
        }
        dot += `${llamada} -> ${parentesis_derecho};\n`
        dot += `${llamada} -> ${puntocoma};\n`
        for(let i = 0; i < this.parametros.length; i++){
            dot += this.parametros[i].obtener_ast(lista_parametros[i])
        }
        return dot
    }
}