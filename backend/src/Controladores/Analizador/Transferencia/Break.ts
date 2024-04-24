import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Singleton from "../ArbolAst/Singleton";

export default class Break extends Instruccion {
    constructor(linea: number, col: number) {
        super(new Tipo(tipo_dato.VOID), linea, col)
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia()
        let dot = ""
        let instruccion_break = `n${contador.getContador()}`
        let punto_coma = `n${contador.getContador()}`
        dot += `${instruccion_break}[label="BREAK"];\n`
        dot += `${punto_coma}[label=";"];\n`
        dot += `${anterior} -> ${instruccion_break};\n`
        dot += `${anterior} -> ${punto_coma};\n`
        return dot
    }
}