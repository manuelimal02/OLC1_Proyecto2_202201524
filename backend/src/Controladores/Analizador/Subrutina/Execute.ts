import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Declaracion from "../Instrucciones/Declaracion";
import Metodo from "./Metodo";
import Singleton from "../ArbolAst/Singleton";

export default class Execute extends Instruccion {

    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, parametros: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.id = id
        this.parametros = parametros
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let busqueda_variable = arbol.getFuncion(this.id);
        if (busqueda_variable == null) {
            let error = new Errores("Semántico", "No Existe La Función: "+ this.id, this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: No Existe La Función: "+ this.id+".\n")
            return error 
        }
        if (busqueda_variable instanceof Metodo) {
            let nueva_tabla = new TablaSimbolo(arbol.getTablaGlobal());
            nueva_tabla.setNombre("Execute");
            arbol.agregarTabla(nueva_tabla)

            if (busqueda_variable.parametros.length != this.parametros.length) {
                let error = new Errores("Semántico", "Cantidad De Parámetros Inválida: "+ this.id, this.fila, this.columna)
                arbol.agregarError(error)
                arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: "+ this.id+".\n")
                return error 
            }
            for (let i = 0; i < busqueda_variable.parametros.length; i++) {
                let declaracion_parametros = new Declaracion(
                    busqueda_variable.parametros[i].tipo, 
                    this.fila, 
                    this.columna, 
                    busqueda_variable.parametros[i].id, 
                    this.parametros[i]
                );
                let resultado:any = declaracion_parametros.interpretar(arbol, nueva_tabla);
                if (resultado instanceof Errores)  return resultado
            }
            let resultado_funcion: any = busqueda_variable.interpretar(arbol, nueva_tabla);
            if (resultado_funcion instanceof Errores) return resultado_funcion
        }
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia()
        let dot = ""
        let execute = `n${contador.getContador()}`
        let identificador = `n${contador.getContador()}`
        let parentesis_izquierdo = `n${contador.getContador()}`
        let lista_parametros = `n${contador.getContador()}`
        let contador_parametros = []
        for (let i = 0; i < this.parametros.length; i++) {
            contador_parametros.push(`n${contador.getContador()}`)
        }
        let parentesis_derecho = `n${contador.getContador()}`
        let punto_coma = `n${contador.getContador()}`
        dot += `${execute}[label="EXECUTE"];\n`
        dot += `${identificador}[label="${this.id}"];\n`
        dot += `${parentesis_izquierdo}[label="("];\n`
        dot += `${lista_parametros}[label="PARAMETROS"];\n`
        dot += `${parentesis_derecho}[label=")"];\n`
        dot += `${punto_coma}[label=";"];\n`
        for(let i = 0; i < this.parametros.length; i++){
            dot += `${contador_parametros[i]}[label="EXPRESION"];\n`
        }
        dot += `${anterior} -> ${execute};\n`
        dot += `${anterior} -> ${identificador};\n`;
        dot += `${anterior} -> ${parentesis_izquierdo};\n`
        dot += `${anterior} -> ${lista_parametros};\n`
        for(let i = 0; i < this.parametros.length; i++){
            dot += `${lista_parametros} -> ${contador_parametros[i]};\n`
        }
        dot += `${anterior} -> ${parentesis_derecho};\n`
        dot += `${anterior} -> ${punto_coma};\n`
        for (let i = 0; i < this.parametros.length; i++) {
            dot += this.parametros[i].obtener_ast(contador_parametros[i])
        }
        return dot
    }
}