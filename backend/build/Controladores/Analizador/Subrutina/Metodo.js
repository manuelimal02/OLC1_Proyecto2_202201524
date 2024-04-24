"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = require("../ArbolAst/Tipo");
const Return_1 = __importDefault(require("../Transferencia/Return"));
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Metodo extends Instruccion_1.Instruccion {
    constructor(id, tipo, parametros, instrucciones, fila, columna) {
        super(tipo, fila, columna);
        this.parametros = [];
        this.valor_retorno = Instruccion_1.Instruccion;
        this.id = id;
        this.parametros = parametros;
        this.tipo = tipo;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        if (this.tipo.getTipo() == Tipo_1.tipo_dato.VOID) {
            for (let i of this.instrucciones) {
                let resultado_interpretacion = i.interpretar(arbol, tabla);
                if (resultado_interpretacion instanceof Errores_1.default)
                    return resultado_interpretacion;
                if (resultado_interpretacion instanceof Return_1.default) {
                    if (resultado_interpretacion.expresion != undefined)
                        return resultado_interpretacion;
                    return;
                }
            }
        }
        else {
            let retorno_existente = false;
            for (let i of this.instrucciones) {
                if (i instanceof Return_1.default) {
                    retorno_existente = true;
                    if (i.expresion != undefined) {
                        this.valor_retorno = i.expresion;
                        return i.expresion;
                    }
                    else {
                        let error = new Errores_1.default("Semántico", "Se Debe El Return Debe Retornar Un Valor", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Se Debe El Return Debe Retornar Un Valor.\n");
                        return error;
                    }
                }
                let resultado_interpretacion = i.interpretar(arbol, tabla);
                if (resultado_interpretacion instanceof Errores_1.default) {
                    return resultado_interpretacion;
                }
                if (resultado_interpretacion instanceof Return_1.default) {
                    if (resultado_interpretacion.expresion != undefined) {
                        retorno_existente = true;
                        this.valor_retorno = resultado_interpretacion.expresion;
                        return resultado_interpretacion.expresion;
                    }
                    else {
                        let error = new Errores_1.default("Semántico", "Se Debe El Return Debe Retornar Un Valor", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Se Debe El Return Debe Retornar Un Valor.\n");
                        return error;
                    }
                }
            }
            if (retorno_existente == false) {
                let error = new Errores_1.default("Semántico", "No Existe Un Retorno En La Función", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: No Existe Un Retorno En La Función.\n");
                return error;
            }
        }
    }
    obtener_ast(anterior) {
        let dot = "";
        let contador = Singleton_1.default.getInstancia();
        let lista_tipo_parametro = [];
        let lista_parametros = [];
        let lista_instrucciones = [];
        let raiz = `n${contador.getContador()}`;
        let tipo_funcion = `n${contador.getContador()}`;
        let raiz_identificador = `n${contador.getContador()}`;
        let identificador = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let parametros = `n${contador.getContador()}`;
        for (let i = 0; i < this.parametros.length; i++) {
            lista_tipo_parametro.push(`n${contador.getContador()}`);
            lista_parametros.push(`n${contador.getContador()}`);
        }
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz_instrucciones = `n${contador.getContador()}`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            lista_instrucciones.push(`n${contador.getContador()}`);
        }
        let llave_derecha = `n${contador.getContador()}`;
        dot += `${raiz}[label="METODOS" color = \"#9ac1bc\" \n];\n`;
        if (this.tipo.getTipo() == Tipo_1.tipo_dato.VOID) {
            dot += `${tipo_funcion}[label="VOID" color = \"#9ac1bc\"];\n`;
        }
        else if (this.tipo.getTipo() == Tipo_1.tipo_dato.ENTERO) {
            dot += `${tipo_funcion}[label="INT" color = \"#9ac1bc\"];\n`;
        }
        else if (this.tipo.getTipo() == Tipo_1.tipo_dato.DECIMAL) {
            dot += `${tipo_funcion}[label="DOUBLE" color = \"#9ac1bc\"];\n`;
        }
        else if (this.tipo.getTipo() == Tipo_1.tipo_dato.CADENA) {
            dot += `${tipo_funcion}[label="STRING" color = \"#9ac1bc\"];\n`;
        }
        else if (this.tipo.getTipo() == Tipo_1.tipo_dato.BOOLEANO) {
            dot += `${tipo_funcion}[label="BOOLE" color = \"#9ac1bc\"];\n`;
        }
        dot += `${raiz_identificador}[label="ID" color = \"#9ac1bc\"];\n`;
        dot += `${identificador}[label="${this.id}"];\n`;
        dot += `${parentesis_izquierdo}[label="(" color = \"#9ac1bc\"];\n`;
        dot += `${parametros}[label="PARAMETROS" color = \"#9ac1bc\"];\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            if (this.parametros[i].tipo.getTipo() == Tipo_1.tipo_dato.ENTERO) {
                dot += `${lista_tipo_parametro[i]}[label="INT" color = \"#9ac1bc\"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == Tipo_1.tipo_dato.DECIMAL) {
                dot += `${lista_tipo_parametro[i]}[label="DOUBLE" color = \"#9ac1bc\"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == Tipo_1.tipo_dato.CADENA) {
                dot += `${lista_tipo_parametro[i]}[label="STRING" color = \"#9ac1bc\"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == Tipo_1.tipo_dato.BOOLEANO) {
                dot += `${lista_tipo_parametro[i]}[label="BOOLE" color = \"#9ac1bc\"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == Tipo_1.tipo_dato.VOID) {
                dot += `${lista_tipo_parametro[i]}[label="VOID" color = \"#9ac1bc\"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == Tipo_1.tipo_dato.CARACTER) {
                dot += `${lista_tipo_parametro[i]}[label="CHAR" color = \"#9ac1bc\"];\n`;
            }
            dot += `${lista_parametros[i]}[label="${this.parametros[i].id}" color = \"#9ac1bc\"];\n`;
        }
        dot += `${parentesis_derecho}[label=")" color = \"#9ac1bc\"];\n`;
        dot += `${llave_izquierda}[label="{" color = \"#9ac1bc\"];\n`;
        dot += `${raiz_instrucciones}[label="INSTRUCCIONES" color = \"#9ac1bc\"];\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            dot += `${lista_instrucciones[i]}[label="INSTRUCCION" color = \"#9ac1bc\"];\n`;
        }
        dot += `${llave_derecha}[label="}" color = \"#9ac1bc\"];\n`;
        dot += `${raiz} -> ${tipo_funcion};\n`;
        dot += `${raiz} -> ${raiz_identificador};\n`;
        dot += `${raiz_identificador} -> ${identificador};\n`;
        dot += `${raiz} -> ${parentesis_izquierdo};\n`;
        dot += `${raiz} -> ${parametros};\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            dot += `${parametros} -> ${lista_tipo_parametro[i]};\n`;
            dot += `${parametros} -> ${lista_parametros[i]};\n`;
        }
        dot += `${raiz} -> ${parentesis_derecho};\n`;
        dot += `${raiz} -> ${llave_izquierda};\n`;
        dot += `${raiz} -> ${raiz_instrucciones};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            dot += `${raiz_instrucciones} -> ${lista_instrucciones[i]};\n`;
        }
        dot += `${raiz} -> ${llave_derecha};\n`;
        dot += `${anterior} -> ${raiz};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            dot += this.instrucciones[i].obtener_ast(lista_instrucciones[i]);
        }
        return dot;
    }
}
exports.default = Metodo;
