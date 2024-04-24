import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from '../ArbolAst/Tipo'
import Singleton from "../ArbolAst/Singleton";

export default class Asignacion extends Instruccion {
    private Identificador: string
    private expresion: Instruccion

    constructor(Identificador: string, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.Identificador = Identificador
        this.expresion = expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let nuevo_valor = this.expresion.interpretar(arbol, tabla)
        if (nuevo_valor instanceof Errores) return nuevo_valor
        let valor = tabla.getVariable(this.Identificador.toLocaleLowerCase())
        if (valor == null){
            let error = new Errores("Semántico", "Variable No Existente", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Variable No Existente.\n")
            return error
        }
        if (this.expresion.tipo_dato.getTipo() != valor.getTipo().getTipo()){
            let error = new Errores("Semántico", "Asignación Incorrecta", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Asignación Incorrecta.\n")
            return error 
        }
        this.tipo_dato = valor.getTipo()
        valor.setValor(nuevo_valor)
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = "";
        let raiz = `n${contador.getContador()}`;
        let id = `n${contador.getContador()}`;
        let valor_id = `n${contador.getContador()}`;
        let igual = `n${contador.getContador()}`;
        let asignacion = `n${contador.getContador()}`;
        dot += ` ${raiz}[label="ASIGNACION"];\n`;
        dot += `${id}[label="ID"];\n`;
        dot += `${valor_id}[label="${this.Identificador}"];\n`;
        dot += `${igual}[label="="];\n`;
        dot += `${asignacion}[label="EXPRESION"];\n`;
        dot += ` ${anterior} -> ${raiz};\n`;
        dot += `${raiz} -> ${id};\n`;
        dot += `${id} -> ${valor_id};\n`;
        dot += `${raiz} -> ${igual};\n`;
        dot += `${raiz} -> ${asignacion};\n`;
        dot += this.expresion.obtener_ast(asignacion);
        return dot;
    }
}