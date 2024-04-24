import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Singleton from "../ArbolAst/Singleton";

export default class Continue extends Instruccion {
    constructor(linea: number, col: number) {
        super(new Tipo(tipo_dato.VOID), linea, col)
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = ""
        let instruccion_continue = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`
        dot += `${instruccion_continue}[label="CONTINUE"];\n`
        dot += `${punto_coma}[label=";"];\n`
        dot += `${anterior} -> ${instruccion_continue};\n`
        dot += `${anterior} -> ${punto_coma};\n`
        return dot
    }
}
