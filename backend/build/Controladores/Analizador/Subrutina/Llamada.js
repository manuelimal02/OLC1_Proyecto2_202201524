"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const TablaSimbolo_1 = __importDefault(require("../ArbolAst/TablaSimbolo"));
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Metodo_1 = __importDefault(require("./Metodo"));
const Declaracion_1 = __importDefault(require("../Instrucciones/Declaracion"));
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, parametros, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(arbol, tabla) {
        let busqueda_funcion = arbol.getFuncion(this.id);
        if (busqueda_funcion == null) {
            let error = new Errores_1.default("Semántico", "No Existe La Función: " + this.id, this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: No Existe La Función: " + this.id + ".\n");
            return error;
        }
        this.tipo_dato.setTipo(busqueda_funcion.tipo.getTipo());
        if (busqueda_funcion instanceof Metodo_1.default) {
            if (busqueda_funcion.tipo.getTipo() == Tipo_1.tipo_dato.VOID) {
                let nueva_tabla = new TablaSimbolo_1.default(tabla);
                nueva_tabla.setNombre(this.id);
                arbol.agregarTabla(nueva_tabla);
                if (busqueda_funcion.parametros.length != this.parametros.length) {
                    let error = new Errores_1.default("Semántico", "Cantidad De Parámetros Inválida: " + this.id, this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: " + this.id + ".\n");
                    return error;
                }
                for (let i = 0; i < busqueda_funcion.parametros.length; i++) {
                    let declaracion_parametro = new Declaracion_1.default(busqueda_funcion.parametros[i].tipo, this.fila, this.columna, busqueda_funcion.parametros[i].id, this.parametros[i]);
                    let resultado = declaracion_parametro.interpretar(arbol, nueva_tabla);
                    if (resultado instanceof Errores_1.default)
                        return resultado;
                }
                let resultado_funcion = busqueda_funcion.interpretar(arbol, nueva_tabla);
                if (resultado_funcion instanceof Errores_1.default)
                    return resultado_funcion;
            }
            else {
                let nueva_tabla = new TablaSimbolo_1.default(tabla);
                nueva_tabla.setNombre(this.id);
                arbol.agregarTabla(nueva_tabla);
                if (busqueda_funcion.parametros.length != this.parametros.length) {
                    let error = new Errores_1.default("Semántico", "Cantidad De Parámetros Inválida: " + this.id, this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: " + this.id + ".\n");
                    return error;
                }
                for (let i = 0; i < busqueda_funcion.parametros.length; i++) {
                    let nueva_variable = this.parametros[i].interpretar(arbol, nueva_tabla);
                    let declaracion_parametro = new Declaracion_1.default(busqueda_funcion.parametros[i].tipo, this.fila, this.columna, busqueda_funcion.parametros[i].id, this.parametros[i]);
                    let resultado = declaracion_parametro.interpretar(arbol, nueva_tabla);
                    if (resultado instanceof Errores_1.default)
                        return resultado;
                    let variable_interpretada = nueva_tabla.getVariable(busqueda_funcion.parametros[i].id[0]);
                    if (variable_interpretada != null) {
                        if (busqueda_funcion.parametros[i].tipo.getTipo() != variable_interpretada.getTipo().getTipo()) {
                            let error = new Errores_1.default("Semántico", "Cantidad De Parámetros Inválida: " + this.id, this.fila, this.columna);
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: " + this.id + ".\n");
                            return error;
                        }
                        else {
                            variable_interpretada.setValor(nueva_variable);
                        }
                    }
                    else {
                        let error = new Errores_1.default("Semántico", "Cantidad De Parámetros Inválida: " + this.id, this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: " + this.id + ".\n");
                        return error;
                    }
                }
                let resultado_funcion = busqueda_funcion.interpretar(arbol, nueva_tabla);
                if (resultado_funcion instanceof Errores_1.default)
                    return resultado_funcion;
                return busqueda_funcion.valor_retorno.interpretar(arbol, nueva_tabla);
            }
        }
    }
    obtener_ast(anterior) {
        return "";
    }
}
exports.default = Llamada;
