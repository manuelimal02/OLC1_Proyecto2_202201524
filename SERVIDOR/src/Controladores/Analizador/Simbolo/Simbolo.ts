import Tipo from './Tipo';

export default class Errores {
    private nombre: string;
    private tipo: Tipo;
    private rol: string;
    private fila: number;
    private columna: number;
    private valor: any;

    constructor(nombre: string, tipo: Tipo, rol: string, fila: number, columna: number, valor?: any) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.rol = rol;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }

    // Getters
    public getNombre(): string {
        return this.nombre;
    }

    public getTipo(): Tipo {
        return this.tipo;
    }

    public getRol(): string {
        return this.rol;
    }

    public getFila(): number {
        return this.fila;
    }

    public getColumna(): number {
        return this.columna;
    }

    public getValor(): any {
        return this.valor;
    }

    // Setters
    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public setTipo(tipo: Tipo){
        this.tipo = tipo;
    }

    public setRol(rol: string){
        this.rol = rol;
    }

    public setFila(fila: number){
        this.fila = fila;
    }

    public setColumna(columna: number){
        this.columna = columna;
    }

    public setValor(valor: any){
        this.valor = valor;
    }
}
