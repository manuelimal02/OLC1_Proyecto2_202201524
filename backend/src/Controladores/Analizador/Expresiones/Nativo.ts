import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../ArbolAst/Arbol";
import Singleton from "../ArbolAst/Singleton";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";

export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
        super(tipo, fila, columna)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        return this.valor
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia()
        let nodoNativo = `n${contador.get()}`
        let nodoValor = `n${contador.get()}`
        let resultado = `${nodoNativo}[label=\"NATIVO\"];\n`
        resultado += `${nodoValor}[label=\"${this.valor}\"];\n`
        resultado += `${nodoNativo}->${nodoValor};\n`
        resultado += `${anterior}->${nodoNativo};\n`
        return resultado
    }
}