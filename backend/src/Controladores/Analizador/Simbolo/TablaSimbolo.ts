import Simbolo from "./Simbolo";

export default class TablaSimbolo {
    private tablaAnterior: TablaSimbolo | any
    private tablaActual: Map<string, Simbolo>
    private nombre: string

    constructor(anterior?: TablaSimbolo) {
        this.tablaAnterior = anterior
        this.tablaActual = new Map<string, Simbolo>()
        this.nombre = ""
    }

    public getAnterior(): TablaSimbolo {
        return this.tablaAnterior
    }

    public setAnterior(anterior: TablaSimbolo): void {
        this.tablaAnterior = anterior
    }

    public getTabla(): Map<String, Simbolo> {
        return this.tablaActual;
    }

    public setTabla(tabla: Map<string, Simbolo>) {
        this.tablaActual = tabla
    }

    public getVariable(id: string) {
        return <Simbolo> this.getTabla().get(id.toLocaleLowerCase())
    }

    public setVariable(simbolo: Simbolo) {
        let busqueda: Simbolo = <Simbolo>this.getTabla().get(simbolo.getId().toLocaleLowerCase())
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLocaleLowerCase(), simbolo)
            return true
        }
        return false
    }

    public getNombre(): string {
        return this.nombre
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre
    }
}