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
class If extends Instruccion_1.Instruccion {
    constructor(condicion, bloque_if, bloque_else, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.condicion = condicion;
        this.bloque_1 = bloque_if;
        this.bloque_2 = bloque_else;
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
        nueva_tabla.setNombre("IF");
        arbol.agregarTabla(nueva_tabla);
        if (condicion) {
            for (let i of this.bloque_1) {
                if (i instanceof Break_1.default)
                    return i;
                if (i instanceof Continue_1.default)
                    return i;
                if (i instanceof Return_1.default)
                    return i;
                if (i instanceof Errores_1.default)
                    return i;
                let resultado = i.interpretar(arbol, nueva_tabla);
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
        else {
            if (this.bloque_2) {
                for (let i of this.bloque_2) {
                    if (i instanceof Break_1.default)
                        return i;
                    if (i instanceof Continue_1.default)
                        return i;
                    if (i instanceof Return_1.default)
                        return i;
                    if (i instanceof Errores_1.default)
                        return i;
                    let resultado = i.interpretar(arbol, nueva_tabla);
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
    }
    obtener_ast(anterior) {
        let contador = Singleton_1.default.getInstancia();
        let dot = "";
        let lista_instruccion1 = [];
        let lista_instruccion2 = [];
        let control_if = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let condicion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz_if = `n${contador.getContador()}`;
        for (let i = 0; i < this.bloque_1.length; i++) {
            lista_instruccion1.push(`n${contador.getContador()}`);
        }
        let llave_derecha = `n${contador.getContador()}`;
        if (this.bloque_2 != undefined) {
            let control_else = `n${contador.getContador()}`;
            let llave_izquierda1 = `n${contador.getContador()}`;
            let raiz_else = `n${contador.getContador()}`;
            for (let i = 0; i < this.bloque_2.length; i++) {
                lista_instruccion2.push(`n${contador.getContador()}`);
            }
            let llave_derecha1 = `n${contador.getContador()}`;
            dot += `${control_else}[label="ELSE IF/ELSE"];\n`;
            dot += `${llave_izquierda1}[label="{"];\n`;
            dot += `${raiz_else}[label="INSTRUCCIONES"];\n`;
            for (let i = 0; i < lista_instruccion2.length; i++) {
                dot += `${lista_instruccion2[i]}[label="INSTRUCCION"];\n`;
            }
            dot += `${llave_derecha1}[label="}"];\n`;
            dot += `${anterior} -> ${control_else};\n`;
            dot += `${anterior} -> ${llave_izquierda1};\n`;
            dot += `${anterior} -> ${raiz_else};\n`;
            for (let i = 0; i < lista_instruccion2.length; i++) {
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
        for (let i = 0; i < lista_instruccion1.length; i++) {
            dot += `${lista_instruccion1[i]}[label="INSTRUCCION"];\n`;
        }
        dot += `${llave_derecha}[label="}"];\n`;
        dot += `${anterior} -> ${control_if};\n`;
        dot += `${anterior} -> ${parentesis_izquierdo};\n`;
        dot += `${anterior} -> ${condicion};\n`;
        dot += `${anterior} -> ${parentesis_derecho};\n`;
        dot += `${anterior} -> ${llave_izquierda};\n`;
        dot += `${anterior} -> ${raiz_if};\n`;
        for (let i = 0; i < lista_instruccion1.length; i++) {
            dot += `${raiz_if} -> ${lista_instruccion1[i]};\n`;
        }
        dot += `${anterior} -> ${llave_derecha};\n`;
        dot += this.condicion.obtener_ast(condicion);
        for (let i = 0; i < this.bloque_1.length; i++) {
            dot += this.bloque_1[i].obtener_ast(lista_instruccion1[i]);
        }
        if (this.bloque_2 != undefined) {
            for (let i = 0; i < this.bloque_2.length; i++) {
                dot += this.bloque_2[i].obtener_ast(lista_instruccion2[i]);
            }
        }
        return dot;
    }
}
exports.default = If;
