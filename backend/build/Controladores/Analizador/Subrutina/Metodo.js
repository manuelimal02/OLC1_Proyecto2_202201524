"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = require("../ArbolAst/Tipo");
const Return_1 = __importDefault(require("../Transferencia/Return"));
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
}
exports.default = Metodo;
