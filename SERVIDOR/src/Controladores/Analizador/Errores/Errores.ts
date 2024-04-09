export default class Errores {
    private tipo_error: string;
    private descripcion: string;
    private fila: number;
    private columna: number;

    constructor(tipo_error: string, descripcion: string, fila: number, columna: number) {
        this.tipo_error = tipo_error;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    // Getters
    public getTipoError(): string {
        return this.tipo_error;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getFila(): number {
        return this.fila;
    }

    public getColumna(): number {
        return this.columna;
    }

    // Setters
    public setTipoError(tipo_error: string): void {
        this.tipo_error = tipo_error;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setFila(fila: number): void {
        this.fila = fila;
    }

    public setColumna(columna: number): void {
        this.columna = columna;
    }
}
