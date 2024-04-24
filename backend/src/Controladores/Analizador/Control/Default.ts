import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

export default class Default extends Instruccion {
    private instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        
        let nueva_tabla = new TablaSimbolo(tabla)
        nueva_tabla.setNombre("SentenciaDefault")
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

    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = "";
        let instruccion_default = `n${contador.getContador()}`;
        let dos_puntos = `n${contador.getContador()}`;
        let raiz_instrucciones = `n${contador.getContador()}`;
        let lista_instrucciones = [];
        for(let i = 0; i < this.instrucciones.length; i++){
            lista_instrucciones.push(`n${contador.getContador()}`);
        }
        dot += `${instruccion_default}[label="DEFAULT"];\n`;
        dot += `${dos_puntos}[label=":"];\n`;
        dot += `${raiz_instrucciones}[label="INSTRUCCIONES"];\n`;
        for(let i = 0; i < this.instrucciones.length; i++){
            dot += `${lista_instrucciones[i]}[label="INSTRUCCION"];\n`;
        }
        dot += `${anterior} -> ${instruccion_default};\n`;
        dot += `${anterior} -> ${dos_puntos};\n`;
        dot += `${anterior} -> ${raiz_instrucciones};\n`;
        for(let i = 0; i < this.instrucciones.length; i++){
            dot += `${raiz_instrucciones} -> ${lista_instrucciones[i]};\n`;
        }
        for(let i = 0; i < this.instrucciones.length; i++){
            dot += this.instrucciones[i].obtener_ast(lista_instrucciones[i]);
        }
        return dot;
    }
}