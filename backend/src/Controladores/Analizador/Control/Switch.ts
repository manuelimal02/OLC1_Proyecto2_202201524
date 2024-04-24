import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolos from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Case from "./Case";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

export default class Switch extends Instruccion {
    private condicion_switch: Instruccion
    private opcion_case: Case[] | undefined
    private opcion_default: Instruccion | undefined

    constructor(condicion_switch: Instruccion, fila: number, columna: number, opcion_case: Case[], opcion_default: Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion_switch = condicion_switch
        this.opcion_case = opcion_case
        this.opcion_default = opcion_default
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condicion = this.condicion_switch.interpretar(arbol, tabla)
        if(condicion instanceof Errores) return condicion
        if(this.opcion_case != undefined) {
            for(let caso of this.opcion_case) {
                caso.condicional_case = this.condicion_switch
                let resultado = caso.interpretar(arbol, tabla)
                    if( resultado instanceof Errores) return resultado
                    if(resultado instanceof Break) return
                    if(resultado instanceof Return) return resultado
                    if(resultado instanceof Continue){
                        let error = new Errores("Semántico", "La función continue no es parte del switch.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La función continue no es parte del switch.\n")
                        return error
                    }
            }
        }
        if(this.opcion_default != undefined) {
            let condicion_default = this.opcion_default.interpretar(arbol, tabla)
            if(condicion_default instanceof Break) return
            if(condicion_default instanceof Return) return condicion_default
            if(condicion_default instanceof Continue){
                let error = new Errores("Semántico", "La función continue no es parte del switch.", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: La función continue no es parte del switch.\n")
                return error
            }
            if( condicion_default instanceof Errores) return condicion_default
        }
    }
    obtener_ast(anterior: string): string {
        let dot = "";
        let contador = Singleton.getInstancia();
        let instruccion_default: any = undefined;
        let instruccion_case = [];
        let instruccion_switch = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let expresion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz = `n${contador.getContador()}`;
        let llave_derecha = `n${contador.getContador()}`;
        if (this.opcion_case != undefined) {
            for (let i = 0; i < this.opcion_case.length; i++) {
                instruccion_case.push(`n${contador.getContador()}`);
            }
        }
        if (this.opcion_default != undefined) {
            instruccion_default = `n${contador.getContador()}`;
        }
        dot += `${instruccion_switch}[label="SWITCH"];\n`;
        dot += `${parentesis_izquierdo}[label="("];\n`;
        dot += `${expresion}[label="EXPRESION"];\n`;
        dot += `${parentesis_derecho}[label=")"];\n`;
        dot += `${llave_izquierda}[label="{"];\n`;
        dot += `${raiz}[label="CASE/DEFAULT"];\n`;
        dot += `${llave_derecha}[label="}"];\n`;
        if (this.opcion_case != undefined) {
            for (let i = 0; i < this.opcion_case.length; i++) {
                dot += `${instruccion_case[i]}[label="CASE"];\n`;
            }
        }
        if (this.opcion_default != undefined) {
            dot += `${instruccion_default}[label="DEFAULT"];\n`;
        }
        dot += `${anterior} -> ${instruccion_switch};\n`;
        dot += `${anterior} -> ${parentesis_izquierdo};\n`;
        dot += `${anterior} -> ${expresion};\n`;
        dot += `${anterior} -> ${parentesis_derecho};\n`;
        dot += `${anterior} -> ${llave_izquierda};\n`;
        dot += `${anterior} -> ${raiz};\n`;
        dot += `${anterior} -> ${llave_derecha};\n`;
        if(this.opcion_case != undefined){
            for (let i = 0; i < this.opcion_case.length; i++) {
                dot += `${raiz} -> ${instruccion_case[i]};\n`;
            }
        }
        if (this.opcion_default != undefined) {
            dot += `${raiz} -> ${instruccion_default};\n`;
        }
        dot += this.condicion_switch.obtener_ast(expresion);
        if(this.opcion_case != undefined){
            for (let i = 0; i < this.opcion_case.length; i++) {
                dot += this.opcion_case[i].obtener_ast(instruccion_case[i]);
            }
        }
        if(this.opcion_default != undefined){
            dot += this.opcion_default.obtener_ast(instruccion_default);
        }
        return dot;
    }
}