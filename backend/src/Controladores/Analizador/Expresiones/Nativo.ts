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
        let nativo_node = `n${contador.getContador()}`
        let valor_node = `n${contador.getContador()}`
        let dot = `${nativo_node}[label=\"NATIVO\"];\n`
        dot += `${valor_node}[label=\"${this.valor}\"];\n`
        dot += `${nativo_node}->${valor_node};\n`
        dot += `${anterior}->${nativo_node};\n`
        return dot
    }
}