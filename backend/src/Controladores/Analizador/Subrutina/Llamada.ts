import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Declaracion from "../Instrucciones/Declaracion";
import Metodo from "./Metodo";

export default class Llamada extends Instruccion {

    private identificador: string
    private parametro: Instruccion[]

    constructor(identificador: string, fila: number, columna: number, parametro: Instruccion[]) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.identificador = identificador
        this.parametro = parametro
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let busqueda_funcion = arbol.getFuncion(this.identificador)
        if (busqueda_funcion == null) {
            return new Errores("SEMANTICO", "Funcion no existente", this.fila, this.columna)
        }

        if (busqueda_funcion instanceof Metodo) {
            let nueva_tabla = new TablaSimbolo(arbol.getTablaGlobal())
            nueva_tabla.setNombre("LLAMADA METODO " + this.identificador)

            
            if (busqueda_funcion.parametro.length != this.parametro.length) {
                return new Errores("SEMANTICO", "Parametros invalidos", this.fila, this.columna)
            }

            
            for (let i = 0; i < busqueda_funcion.parametro.length; i++) {
                let declaracion_parametro = new Declaracion(
                    busqueda_funcion.parametro[i].tipo, this.fila, this.columna,
                    busqueda_funcion.parametro[i].identificador, this.parametro[i]
                )

                let resultado:any = declaracion_parametro.interpretar(arbol, nueva_tabla)
                if (resultado instanceof Errores) return resultado
            }
            
            let resultado_funcion: any = busqueda_funcion.interpretar(arbol, nueva_tabla)
            if (resultado_funcion instanceof Errores) return resultado_funcion

        }
    }
}