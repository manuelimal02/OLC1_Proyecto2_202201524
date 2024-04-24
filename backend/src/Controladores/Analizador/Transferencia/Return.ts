import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Arbol from "../ArbolAst/Arbol";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Singleton from "../ArbolAst/Singleton";

export default class Return extends Instruccion{

    public expresion: Instruccion | undefined;

    constructor(linea:number, columna:number,expresion?: Instruccion){
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.expresion != undefined){
            let result = this.expresion.interpretar(arbol, tabla);
            if(result instanceof Errores) return result;
        }
        return this;
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia()
        let dot = ""
        let retorno = `n${contador.getContador()}`
        let expresion = `n${contador.getContador()}`
        let punto_coma = `n${contador.getContador()}`
        dot += `${retorno}[label="RETURN"];\n`
        if(this.expresion != undefined){
            dot += `${expresion}[label="EXPRESION"];\n`
        }
        dot += `${punto_coma}[label=";"];\n`
        dot += `${anterior} -> ${retorno};\n`
        if(this.expresion != undefined){
            dot += `${anterior} -> ${expresion};\n`
        }
        dot += `${anterior} -> ${punto_coma};\n`
        if(this.expresion != undefined){
            dot += this.expresion.obtener_ast(expresion)
        }
        return dot
    }
}