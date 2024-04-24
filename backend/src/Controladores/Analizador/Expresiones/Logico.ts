import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Singleton from "../ArbolAst/Singleton";

export default class OperadorLogico extends Instruccion {
    private operando_izquierda: Instruccion | undefined
    private operando_derecha: Instruccion | undefined
    private operando_unico: Instruccion | undefined
    private operacion: Operador

    constructor(operacion: Operador, fila: number, columna: number, operando_izquierda: Instruccion, operando_derecha: Instruccion) {
        super(new Tipo(tipo_dato.BOOLEANO), fila, columna);
        this.operacion = operacion;
        if (!operando_derecha) this.operando_unico = operando_izquierda
        else {
            this.operando_izquierda = operando_izquierda
            this.operando_derecha = operando_derecha
        }
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_izquierda, valor_derecha, valor_unico  = null;
        if (this.operando_unico != null) {
            valor_unico = this.operando_unico.interpretar(arbol, tabla);
            if (valor_unico instanceof Errores) return valor_unico
        }else {
            valor_izquierda = this.operando_izquierda?.interpretar(arbol, tabla)
            if (valor_izquierda instanceof Errores) return valor_izquierda
            valor_derecha = this.operando_derecha?.interpretar(arbol, tabla)
            if (valor_derecha instanceof Errores) return valor_derecha
        }

        switch (this.operacion) {
            case Operador.OR:
                return this.logico_or(valor_izquierda, valor_derecha, arbol);
            case Operador.AND:
                return this.logico_and(valor_izquierda, valor_derecha, arbol);
            case Operador.NOT:
                return this.logico_not(valor_unico, arbol);
            default:
                let error = new Errores("Semántico", "Operador Logico Inválido", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operador Logico Inválido.\n")
                return error
        }
    }

    logico_or(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda || valor_derecha
                    default:
                        let error = new Errores("Semántico", "Operación Or Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Or Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Or Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Or Inválida.\n")
                return error
        }
    }

    logico_and(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda && valor_derecha
                    default:
                        let error = new Errores("Semántico", "Operación And Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación And Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación And Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación And Inválida.\n")
                return error
        }
    }

    logico_not(valor_unico: any, arbol:Arbol) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                return !valor_unico
            default:
                let error = new Errores("Semántico", "Operación Not Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Not Inválida.\n")
                return error
        }
    }
    obtener_ast(anterior: string): string {
        let dot = "";
        let contador = Singleton.getInstancia();
        if (this.operacion == Operador.AND) {
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operador = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label=\"EXPRESION\"];\n`;
            dot += `${nodo_operador}[label=\"&&\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operador};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1);
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2);
        }else if(this.operacion == Operador.OR){
            let nodo_expresion1 = `n${contador.getContador()}`;
            let nodo_expresion2 = `n${contador.getContador()}`;
            let nodo_operador = `n${contador.getContador()}`;
            dot += `${nodo_expresion1}[label=\"EXPRESION\"];\n`;
            dot += `${nodo_operador}[label=\"||\"];\n`;
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`;
            dot += `${anterior} -> ${nodo_expresion1};\n`;
            dot += `${anterior} -> ${nodo_operador};\n`;
            dot += `${anterior} -> ${nodo_expresion2};\n`;
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1);
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2);
        }else if(this.operacion == Operador.NOT){
            let nodo_unico = `n${contador.getContador()}`;
            let nodo_expresion3 = `n${contador.getContador()}`;
            dot += `${nodo_unico}[label="!"];\n`;
            dot += `${nodo_expresion3}[label="EXPRESION"];\n`;
            dot += `${anterior} -> ${nodo_unico};\n`;
            dot += `${anterior} -> ${nodo_expresion3};\n`;
            dot += this.operando_unico?.obtener_ast(nodo_expresion3);
        }
        return dot;
    }
}

export enum Operador {
    OR,
    AND,
    NOT
}