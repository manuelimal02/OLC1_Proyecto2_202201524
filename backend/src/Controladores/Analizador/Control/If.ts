import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

export default class If extends Instruccion {
    private condicion: Instruccion
    private bloque_1: Instruccion[]
    private bloque_2: Instruccion[]
    constructor(condicion: Instruccion, bloque_if: Instruccion[], bloque_else:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.bloque_1 = bloque_if
        this.bloque_2 = bloque_else
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
        nueva_tabla.setNombre("IF")
        arbol.agregarTabla(nueva_tabla)
        if (condicion) {
            for (let i of this.bloque_1) {
                if(i instanceof Break) return i
                if(i instanceof Continue) return i
                if(i instanceof Return) return i
                if(i instanceof Errores) return i

                let resultado = i.interpretar(arbol, nueva_tabla)

                if(resultado instanceof Break) return resultado
                if(resultado instanceof Continue) return resultado
                if(resultado instanceof Return) return resultado
                if(resultado instanceof Errores) return resultado
            }
        }else{
            if(this.bloque_2){
                for (let i of this.bloque_2) {
                    if(i instanceof Break) return i
                    if(i instanceof Continue) return i
                    if(i instanceof Return) return i
                    if(i instanceof Errores) return i

                    let resultado = i.interpretar(arbol, nueva_tabla)

                    if(resultado instanceof Break) return resultado
                    if(resultado instanceof Continue) return resultado
                    if(resultado instanceof Return) return resultado
                    if(resultado instanceof Errores) return resultado
                }
            }
            
        }
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = "";
        let lista_instruccion1 = [];
        let lista_instruccion2 = [];
        let control_if = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let condicion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz_if = `n${contador.getContador()}`;
        for(let i = 0; i < this.bloque_1.length; i++){
            lista_instruccion1.push(`n${contador.getContador()}`);
        }
        let llave_derecha = `n${contador.getContador()}`;
        if(this.bloque_2 != undefined){
            let control_else = `n${contador.getContador()}`;
            let llave_izquierda1 = `n${contador.getContador()}`;
            let raiz_else = `n${contador.getContador()}`;
            for(let i = 0; i < this.bloque_2.length; i++){
                lista_instruccion2.push(`n${contador.getContador()}`);
            }
            let llave_derecha1 = `n${contador.getContador()}`;
            dot += `${control_else}[label="ELSE IF/ELSE"];\n`;
            dot += `${llave_izquierda1}[label="{"];\n`;
            dot += `${raiz_else}[label="INSTRUCCIONES"];\n`;
            for(let i = 0; i < lista_instruccion2.length; i++){
                dot += `${lista_instruccion2[i]}[label="INSTRUCCION"];\n`;
            }
            dot += `${llave_derecha1}[label="}"];\n`;
            dot += `${anterior} -> ${control_else};\n`;
            dot += `${anterior} -> ${llave_izquierda1};\n`;
            dot += `${anterior} -> ${raiz_else};\n`;
            for(let i = 0; i < lista_instruccion2.length; i++){
                dot += `${raiz_else} -> ${lista_instruccion2[i]};\n`;
            }
            dot += `${anterior} -> ${llave_derecha1};\n`;
        }
        dot += `${control_if}[label="IF"];\n`;
        dot += `${parentesis_izquierdo}[label="("];\n`;
        dot += `${condicion}[label="EXPRESION"];\n`;
        dot += `${parentesis_derecho}[label=")"];\n`;
        dot += `${llave_izquierda}[label="{"];\n`;
        dot += `${raiz_if}[label="INSTRUCCIONES"];\n`;
        for(let i = 0; i < lista_instruccion1.length; i++){
            dot += `${lista_instruccion1[i]}[label="INSTRUCCION"];\n`;
        }
        dot += `${llave_derecha}[label="}"];\n`;
        dot += `${anterior} -> ${control_if};\n`;
        dot += `${anterior} -> ${parentesis_izquierdo};\n`;
        dot += `${anterior} -> ${condicion};\n`;
        dot += `${anterior} -> ${parentesis_derecho};\n`;
        dot += `${anterior} -> ${llave_izquierda};\n`;
        dot += `${anterior} -> ${raiz_if};\n`;
        for(let i = 0; i < lista_instruccion1.length; i++){
            dot += `${raiz_if} -> ${lista_instruccion1[i]};\n`;
        }
        dot += `${anterior} -> ${llave_derecha};\n`;
        dot += this.condicion.obtener_ast(condicion);
        for(let i = 0; i < this.bloque_1.length; i++){
            dot += this.bloque_1[i].obtener_ast(lista_instruccion1[i]);
        }
        if(this.bloque_2 != undefined){
            for(let i = 0; i < this.bloque_2.length; i++){
                dot += this.bloque_2[i].obtener_ast(lista_instruccion2[i]);
            }
        }
        return dot;
    }
    
}