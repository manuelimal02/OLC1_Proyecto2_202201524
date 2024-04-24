import * as fs from 'fs';
import TablaSimbolo from "./TablaSimbolo";
import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Metodo from "../Subrutina/Metodo";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tabla_global: TablaSimbolo
    private errores: Array<Errores>
    private funciones : Array<Instruccion>
    private lista_tablas: Array<TablaSimbolo>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tabla_global = new TablaSimbolo()
        this.errores = new Array<Errores>
        this.funciones = new Array<Instruccion>
        this.lista_tablas = []
    }
    public imprimirErrores(): void {
        this.errores.forEach((error, index) => {
            console.log(`Error ${index + 1}:`);
            console.log(`Tipo de Error: ${error.getTipoError()}`);
            console.log(`Descripción: ${error.getDescripcion()}`);
            console.log(`Fila: ${error.getFila()}`);
            console.log(`Columna: ${error.getColumna()}`);
            console.log('-------------------------');
        });
    }
    

    public agregarTabla(tabla: TablaSimbolo) {
        this.lista_tablas.push(tabla)
    }

    public Cout(contenido: any) {
        this.consola = `${this.consola}${contenido}`;
    }

    public CoutEndl(contenido: any) {
        this.consola = `${this.consola}${contenido}\n`;
    }

    public getConsola(): string {
        return this.consola
    }

    public setConsola(console: string): void {
        this.consola = console
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): TablaSimbolo {
        return this.tabla_global
    }

    public setTablaGlobal(tabla: TablaSimbolo) {
        this.tabla_global = tabla
    }

    public getErrores(): any {
        return this.errores
    }

    public agregarError(error: Errores): void {
        this.errores.push(error);
    }

    public getFunciones(): any {
        return this.funciones;
    }

    public setFunciones(funciones: Array<Instruccion>) {
        this.funciones = funciones;
    }

    public addFunciones(funcion: Instruccion) {
        this.funciones.push(funcion);
    }

    public getFuncion(id: string) {
        for (let ins of this.getFunciones()) {
            if (ins instanceof Metodo) {
                if (ins.id.toLocaleLowerCase() == id.toLocaleLowerCase()) return ins
            }
        }
        return null
    }
    
    public generarReporteErrores(): void {
        let html = 
        `<html>
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
    
    public generarReporteTablas(): void {
        let html = 
        `<html>
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
                    <td>${valor.getColumna()+1}</td>
                </tr>`;
            });
            html += `</table>`;
        }
        html += `</body></html>`;
        fs.writeFileSync('ReporteTablas.html', html);
    }
    

}