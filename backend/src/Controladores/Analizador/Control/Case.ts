import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

export default class Case extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]
    public condicional_case?: Instruccion

    constructor(condicion: Instruccion, instrucciones: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let condicional = this.condicion.interpretar(arbol, tabla)
        if( condicional instanceof Errores) return condicional
        let condicional_case = this.condicional_case?.interpretar(arbol, tabla)
        if( condicional_case instanceof Errores) return condicional_case

        if(this.condicion.tipo_dato.getTipo() != this.condicional_case?.tipo_dato.getTipo()){
            let error = new Errores("Semántico", "La condición no es del mismo tipo.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: La condición no es del mismo tipo.\n")
            return error
        }

        if(condicional == condicional_case) {
            let nueva_tabla = new TablaSimbolo(tabla)
            nueva_tabla.setNombre("SentenciaCase")
            arbol.agregarTabla(nueva_tabla)
            
            for(let ins of this.instrucciones) {
                if(ins instanceof Break) return ins
                if(ins instanceof Continue) return ins
                if(ins instanceof Return) return ins
                if(ins instanceof Errores) return ins

                let resultado = ins.interpretar(arbol, nueva_tabla)
                if( resultado instanceof Errores) return resultado

                if(resultado instanceof Break) return resultado
                if(resultado instanceof Continue) return resultado
                if(resultado instanceof Return) return resultado
                if(resultado instanceof Errores) return resultado
            }
        }
    }

    public getCondicion() {
        if( this.condicion instanceof Errores) return this.condicion
        return this.condicion
    }

    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = "";
        let instruccion_case = `n${contador.getContador()}`;
        let expresion = `n${contador.getContador()}`;
        let dos_puntos = `n${contador.getContador()}`;
        let raiz = `n${contador.getContador()}`;
        let lista_instrucciones = [];
        for (let i = 0; i < this.instrucciones.length; i++) {
            lista_instrucciones.push(`n${contador.getContador()}`);
        }
        dot += `${instruccion_case}[label="CASE"];\n`;
        dot += `${expresion}[label="EXPRESION"];\n`;
        dot += `${dos_puntos}[label=":"];\n`;
        dot += `${raiz}[label="INSTRUCCIONES"];\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            dot += `${lista_instrucciones[i]}[label="INSTRUCCION"];\n`;
        }
        dot += `${anterior} -> ${instruccion_case};\n`;
        dot += `${anterior} -> ${expresion};\n`;
        dot += `${anterior} -> ${dos_puntos};\n`;
        dot += `${anterior} -> ${raiz};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            dot += `${raiz} -> ${lista_instrucciones[i]};\n`;
        }
        dot += this.condicion.obtener_ast(expresion);
        for (let i = 0; i < this.instrucciones.length; i++) {
            dot += this.instrucciones[i].obtener_ast(lista_instrucciones[i]);
        }
        return dot;
    }
}