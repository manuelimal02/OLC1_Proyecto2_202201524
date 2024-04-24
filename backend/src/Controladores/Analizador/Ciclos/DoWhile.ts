import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

export default class DoWhile extends Instruccion {
    private condicion: Instruccion
    private bloque: Instruccion[]

    constructor(condicion: Instruccion, bloque:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.bloque = bloque
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if (condicion instanceof Errores) return condicion

        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            let error = new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n")
            return error
        }

        let nueva_tabla = new tablaSimbolo(tabla)
        nueva_tabla.setNombre("DoWhile")
        arbol.agregarTabla(nueva_tabla)

        do {
            for (let ins of this.bloque) {
                if(ins instanceof Break) return ins
                if(ins instanceof Continue) return ins
                if(ins instanceof Return) return ins
                if(ins instanceof Errores) return ins
            
                let resultado = ins.interpretar(arbol, nueva_tabla)
            
                if(resultado instanceof Break) return resultado
                if(resultado instanceof Continue) return resultado
                if(resultado instanceof Return) return resultado
                if(resultado instanceof Errores) return resultado
            }
        } while (this.condicion.interpretar(arbol, tabla));
    }
    obtener_ast(anterior: string): string {
        let dot = "";
        let contador = Singleton.getInstancia();
        let lista_instruccion = [];
        let raiz = `n${contador.getContador()}`;
        let instruccion_do = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz_instrucciones = `n${contador.getContador()}`;
        for(let i= 0; i < this.bloque.length; i++){
            lista_instruccion.push(`n${contador.getContador()}`);
        }
        let llave_derecha = `n${contador.getContador()}`;
        let instruccion_while = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let condicion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`;
        dot += ` ${raiz}[label="CICLO DO WHILE"];\n`;
        dot += ` ${instruccion_do}[label="DO"];\n`;
        dot += ` ${llave_izquierda}[label="{"];\n`;
        dot += ` ${raiz_instrucciones}[label="INSTRUCCIONES"];\n`;
        for(let i= 0; i < this.bloque.length; i++){
            dot += ` ${lista_instruccion[i]}[label="INSTRUCCION"];\n`;
        }
        dot += ` ${llave_derecha}[label="}"];\n`;
        dot += ` ${instruccion_while}[label="WHILE"];\n`;
        dot += ` ${parentesis_izquierdo}[label="("];\n`;
        dot += ` ${condicion}[label="EXPRESION"];\n`;
        dot += ` ${parentesis_derecho}[label=")"];\n`;
        dot += ` ${punto_coma}[label=";"];\n`;
        dot += ` ${anterior} -> ${raiz};\n`;
        dot += ` ${raiz} -> ${instruccion_do};\n`;
        dot += ` ${raiz} -> ${llave_izquierda};\n`;
        dot += ` ${raiz} -> ${raiz_instrucciones};\n`;
        for(let i= 0; i < this.bloque.length; i++){
            dot += ` ${raiz_instrucciones} -> ${lista_instruccion[i]};\n`;
        }
        dot += ` ${raiz} -> ${llave_derecha};\n`;
        dot += ` ${raiz} -> ${instruccion_while};\n`;
        dot += ` ${raiz} -> ${parentesis_izquierdo};\n`;
        dot += ` ${raiz} -> ${condicion};\n`;
        dot += ` ${raiz} -> ${parentesis_derecho};\n`;
        dot += ` ${raiz} -> ${punto_coma};\n`;
        for(let i= 0; i < this.bloque.length; i++){
            dot += this.bloque[i].obtener_ast(lista_instruccion[i]);
        }
        dot += this.condicion.obtener_ast(condicion);
        return dot;
    }
}