import Tipo from './Tipo'

export default class Matriz {
    private tipo_matriz: Tipo
    private identificador: string
    private valores: any[][]

    constructor(tipo_matriz: Tipo, identificador: string, valores: any[][]) {
        this.tipo_matriz = tipo_matriz
        this.identificador = identificador.toLocaleLowerCase()
        this.valores = valores
    }
    public getTipo(): Tipo {
        return this.tipo_matriz
    }

    public setTipo(tipo_matriz: Tipo) {
        this.tipo_matriz = tipo_matriz
    }

    public getIdentificador() {
        return this.identificador
    }

    public setIdentificador(identificador: string) {
        this.identificador = identificador
    }

    public getValores(posicion_1: number,posicion_2:number) {
        return this.valores[posicion_1][posicion_2].valor
    }
    
    public setValores(posicion_1:number,posicion_2:number,valores:any) {
        this.valores[posicion_1][posicion_2].valor = valores
    }
    

    public getSize() {
        return this.valores.length
    }
}