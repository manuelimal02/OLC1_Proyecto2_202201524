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
const Break_1 = __importDefault(require("../Transferencia/Break"));
const Continue_1 = __importDefault(require("../Transferencia/Continue"));
const Return_1 = __importDefault(require("../Transferencia/Return"));
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class While extends Instruccion_1.Instruccion {
    constructor(condicion, bloque, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.condicion = condicion;
        this.bloque = bloque;
    }
    interpretar(arbol, tabla) {
        let condicion = this.condicion.interpretar(arbol, tabla);
        if (condicion instanceof Errores_1.default)
            return condicion;
        if (this.condicion.tipo_dato.getTipo() != Tipo_1.tipo_dato.BOOLEANO) {
            let error = new Errores_1.default("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna);
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n");
            return error;
        }
        let nueva_tabla = new TablaSimbolo_1.default(tabla);
        nueva_tabla.setNombre("While");
        arbol.agregarTabla(nueva_tabla);
        while (this.condicion.interpretar(arbol, tabla)) {
            for (let ins of this.bloque) {
                if (ins instanceof Break_1.default)
                    return ins;
                if (ins instanceof Continue_1.default)
                    return ins;
                if (ins instanceof Return_1.default)
                    return ins;
                if (ins instanceof Errores_1.default)
                    return ins;
                let resultado = ins.interpretar(arbol, nueva_tabla);
                if (resultado instanceof Break_1.default)
                    return resultado;
                if (resultado instanceof Continue_1.default)
                    return resultado;
                if (resultado instanceof Return_1.default)
                    return resultado;
                if (resultado instanceof Errores_1.default)
                    return resultado;
            }
        }
    }
    obtener_ast(anterior) {
        let dot = "";
        let contador = Singleton_1.default.getInstancia();
        let lista_instrucciones = [];
        let raiz = `n${contador.getContador()}`;
        let instruccion_while = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let condicion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_derecho = `n${contador.getContador()}`;
        let instrucciones_raiz = `n${contador.getContador()}`;
        for (let i = 0; i < this.bloque.length; i++) {
            lista_instrucciones.push(`n${contador.getContador()}`);
        }
        let llave_izquierda = `n${contador.getContador()}`;
        dot += ` ${raiz}[label="CICLO WHILE"];\n`;
        dot += ` ${instruccion_while}[label="WHILE"];\n`;
        dot += ` ${parentesis_izquierdo}[label="("];\n`;
        dot += ` ${condicion}[label="EXPRESION"];\n`;
        dot += ` ${parentesis_derecho}[label=")"];\n`;
        dot += ` ${llave_derecho}[label="{"];\n`;
        dot += ` ${instrucciones_raiz}[label="INSTRUCCIONES"];\n`;
        for (let i = 0; i < this.bloque.length; i++) {
            dot += ` ${lista_instrucciones[i]}[label="INSTRUCCION"];\n`;
        }
        dot += ` ${llave_izquierda}[label="}"];\n`;
        dot += ` ${anterior} -> ${raiz};\n`;
        dot += ` ${raiz} -> ${instruccion_while};\n`;
        dot += ` ${raiz} -> ${parentesis_izquierdo};\n`;
        dot += ` ${raiz} -> ${condicion};\n`;
        dot += ` ${raiz} -> ${parentesis_derecho};\n`;
        dot += ` ${raiz} -> ${llave_derecho};\n`;
        dot += ` ${raiz} -> ${instrucciones_raiz};\n`;
        for (let i = 0; i < this.bloque.length; i++) {
            dot += ` ${instrucciones_raiz} -> ${lista_instrucciones[i]};\n`;
        }
        dot += ` ${raiz} -> ${llave_izquierda};\n`;
        for (let i = 0; i < this.bloque.length; i++) {
            dot += this.bloque[i].obtener_ast(lista_instrucciones[i]);
        }
        dot += this.condicion.obtener_ast(condicion);
        return dot;
    }
}
exports.default = While;
