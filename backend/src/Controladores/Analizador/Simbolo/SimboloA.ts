import Tipo from './Tipo'

export default class Arreglo {
    private tipo_arreglo: Tipo
    private identificador: string
    private valores: any[]
    private size: number

    constructor(tipo_arreglo: Tipo, identificador: string, valores: any[], size: number) {
        this.tipo_arreglo = tipo_arreglo
        this.identificador = identificador.toLocaleLowerCase()
        this.valores = valores
        this.size = size
    }
    public getTipo(): Tipo {
        return this.tipo_arreglo
    }

    public setTipo(tipo_arreglo: Tipo) {
        this.tipo_arreglo = tipo_arreglo
    }

    public getIdentificador() {
        return this.identificador
    }

    public setIdentificador(identificador: string) {
        this.identificador = identificador
    }

    public getValores(posicion: number) {
        return this.valores[posicion].valor
    }

    public setValores(posicion:number, valores:any) {
        this.valores[posicion].valor = valores
    }

    public getSize() {
        return this.valores.length
    }
}