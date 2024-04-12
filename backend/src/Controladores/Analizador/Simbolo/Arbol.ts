import tablaSimbolo from "../Simbolo/TablaSimbolo";
import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tabla_global: tablaSimbolo
    private errores: Array<Errores>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tabla_global = new tablaSimbolo()
        this.errores = new Array<Errores>
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

    public getTablaGlobal(): tablaSimbolo {
        return this.tabla_global
    }

    public setTablaGlobal(tabla: tablaSimbolo) {
        this.tabla_global = tabla
    }

    public getErrores(): any {
        return this.errores
    }
}