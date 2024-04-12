export default class Errores {
    private tipo_error: string
    private descripcion: string
    private fila: number
    private columna: number

    constructor(tipo: string, descripcion: string, fila: number, columna: number) {
        this.tipo_error = tipo
        this.descripcion = descripcion
        this.fila = fila
        this.columna = columna
    }

    public getTipoError(): string {
        return this.tipo_error
    }

    public getDescripcion(): string {
        return this.descripcion
    }

    public getFila(): number {
        return this.fila
    }

    public getColumna(): number {
        return this.columna
    }
}
