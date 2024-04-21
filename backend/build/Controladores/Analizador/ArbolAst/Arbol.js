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
const fs = __importStar(require("fs"));
const TablaSimbolo_1 = __importDefault(require("./TablaSimbolo"));
const Metodo_1 = __importDefault(require("../Subrutina/Metodo"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tabla_global = new TablaSimbolo_1.default();
        this.errores = new Array;
        this.funciones = new Array;
        this.lista_tablas = [];
    }
    agregarTabla(tabla) {
        this.lista_tablas.push(tabla);
    }
    Cout(contenido) {
        this.consola = `${this.consola}${contenido}`;
    }
    CoutEndl(contenido) {
        this.consola = `${this.consola}${contenido}\n`;
    }
    getConsola() {
        return this.consola;
    }
    setConsola(console) {
        this.consola = console;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tabla_global;
    }
    setTablaGlobal(tabla) {
        this.tabla_global = tabla;
    }
    getErrores() {
        return this.errores;
    }
    agregarError(error) {
        this.errores.push(error);
    }
    getFunciones() {
        return this.funciones;
    }
    setFunciones(funciones) {
        this.funciones = funciones;
    }
    addFunciones(funcion) {
        this.funciones.push(funcion);
    }
    getFuncion(id) {
        for (let ins of this.getFunciones()) {
            if (ins instanceof Metodo_1.default) {
                if (ins.id.toLocaleLowerCase() == id.toLocaleLowerCase())
                    return ins;
            }
        }
        return null;
    }
    generarReporteErrores() {
        let html = `<html>
        <head>
            <title>Reporte de Errores</title>
            <style>
                body {
                    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    background-color: #f0f0f0;
                    text-align: center;
                }
                table {
                    margin: 0 auto;
                    border: 1px solid black;
                    border-collapse: collapse;
                    width: 80%;
                    background-color: white;
                }
                th, td {
                    border: 1px solid black;
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <h1>Reporte de Errores</h1>
            <table>
                <tr>
                    <th>Tipo de Error</th>
                    <th>Descripción</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>`;
        for (let error of this.errores) {
            html += `
                    <tr>
                        <td>${error.getTipoError()}</td>
                        <td>${error.getDescripcion()}</td>
                        <td>${error.getFila()}</td>
                        <td>${error.getColumna()}</td>
                    </tr>`;
        }
        html += `
            </table>
        </body>
        </html>`;
        fs.writeFileSync('ReporteErrores.html', html);
    }
    generarReporteTablas() {
        let html = `<html>
        <head>
            <title>Reporte de Tablas de Símbolos</title>
            <style>
                body {
                    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    background-color: #f0f0f0;
                    text-align: center;
                }
                table {
                    margin: 0 auto;
                    border: 1px solid black;
                    border-collapse: collapse;
                    width: 80%;
                    background-color: white;
                }
                th, td {
                    border: 1px solid black;
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <h1>Reporte de Tablas de Símbolos</h1>`;
        for (let ins of this.lista_tablas) {
            html += `<h2>Tabla: ${ins.getNombre()}</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>`;
            ins.getTabla().forEach((valor, clave) => {
                html += `
                <tr>
                    <td>${clave}</td>
                    <td>${valor.getTipo().getNombreTipo()}</td>
                    <td>${valor.getValor()}</td>
                    <td>${valor.getFila()}</td>
                    <td>${valor.getColumna() + 1}</td>
                </tr>`;
            });
            html += `</table>`;
        }
        html += `</body></html>`;
        fs.writeFileSync('ReporteTablas.html', html);
    }
}
exports.default = Arbol;
