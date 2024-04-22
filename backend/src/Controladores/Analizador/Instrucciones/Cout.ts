import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../ArbolAst/Arbol";
import Singleton from "../ArbolAst/Singleton";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Errores from "../Errores/Errores";

export default class Cout extends Instruccion {
    private expresion: Instruccion

    constructor(expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.expresion = expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla)
        if (valor instanceof Errores) return valor
        arbol.Cout(valor)
    }
    obtener_ast(anterior: string): string {
        let dot = "";
        let contador = Singleton.getInstancia();
        let cout = `n${contador.getContador()}`;
        let menor_menor = `n${contador.getContador()}`;
        let expresion_node = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`;
        dot += `${cout}[label="cout"];\n`;
        dot += `${menor_menor}[label="<<"];\n`;
        dot += `${expresion_node}[label="EXPRESION"];\n`;
        dot += `${punto_coma}[label=";"];\n`;
        dot += `${anterior} -> ${cout};\n`;
        dot += `${anterior} -> ${menor_menor};\n`;
        dot += `${anterior} -> ${expresion_node};\n`;
        dot += `${anterior} -> ${punto_coma};\n`;
        dot += this.expresion.obtener_ast(expresion_node);
        return dot;
    }
}