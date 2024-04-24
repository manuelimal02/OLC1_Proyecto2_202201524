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
const Declaracion_1 = __importDefault(require("../Instrucciones/Declaracion"));
const Metodo_1 = __importDefault(require("./Metodo"));
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Execute extends Instruccion_1.Instruccion {
    constructor(id, parametros, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(arbol, tabla) {
        let busqueda_variable = arbol.getFuncion(this.id);
        if (busqueda_variable == null) {
            let error = new Errores_1.default("Semántico", "No Existe La Función: " + this.id, this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: No Existe La Función: " + this.id + ".\n");
            return error;
        }
        if (busqueda_variable instanceof Metodo_1.default) {
            let nueva_tabla = new TablaSimbolo_1.default(arbol.getTablaGlobal());
            nueva_tabla.setNombre("Execute");
            arbol.agregarTabla(nueva_tabla);
            if (busqueda_variable.parametros.length != this.parametros.length) {
                let error = new Errores_1.default("Semántico", "Cantidad De Parámetros Inválida: " + this.id, this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Cantidad De Parámetros Inválida: " + this.id + ".\n");
                return error;
            }
            for (let i = 0; i < busqueda_variable.parametros.length; i++) {
                let declaracion_parametros = new Declaracion_1.default(busqueda_variable.parametros[i].tipo, this.fila, this.columna, busqueda_variable.parametros[i].id, this.parametros[i]);
                let resultado = declaracion_parametros.interpretar(arbol, nueva_tabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
            }
            let resultado_funcion = busqueda_variable.interpretar(arbol, nueva_tabla);
            if (resultado_funcion instanceof Errores_1.default)
                return resultado_funcion;
        }
    }
    obtener_ast(anterior) {
        let contador = Singleton_1.default.getInstancia();
        let dot = "";
        let execute = `n${contador.getContador()}`;
        let identificador = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let lista_parametros = `n${contador.getContador()}`;
        let contador_parametros = [];
        for (let i = 0; i < this.parametros.length; i++) {
            contador_parametros.push(`n${contador.getContador()}`);
        }
        let parentesis_derecho = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`;
        dot += `${execute}[label="EXECUTE" color = \"#37c9c6\"];\n`;
        dot += `${identificador}[label="${this.id}" color = \"#37c9c6\"];\n`;
        dot += `${parentesis_izquierdo}[label="(" color = \"#37c9c6\"];\n`;
        dot += `${lista_parametros}[label="PARAMETROS" color = \"#37c9c6\"];\n`;
        dot += `${parentesis_derecho}[label=")" color = \"#37c9c6\"];\n`;
        dot += `${punto_coma}[label=";" color = \"#37c9c6\"];\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            dot += `${contador_parametros[i]}[label="EXPRESION" color = \"#37c9c6\"];\n`;
        }
        dot += `${anterior} -> ${execute};\n`;
        dot += `${anterior} -> ${identificador};\n`;
        dot += `${anterior} -> ${parentesis_izquierdo};\n`;
        dot += `${anterior} -> ${lista_parametros};\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            dot += `${lista_parametros} -> ${contador_parametros[i]};\n`;
        }
        dot += `${anterior} -> ${parentesis_derecho};\n`;
        dot += `${anterior} -> ${punto_coma};\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            dot += this.parametros[i].obtener_ast(contador_parametros[i]);
        }
        return dot;
    }
}
exports.default = Execute;
