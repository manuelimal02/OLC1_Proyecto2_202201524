import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Declaracion from "../Instrucciones/Declaracion";
import Metodo from "./Metodo";

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
        return ""
    }
}