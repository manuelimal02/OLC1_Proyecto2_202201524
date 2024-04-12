export default class Tipo {

    private tipo: tipo_dato

    constructor(tipo: tipo_dato) {
        this.tipo = tipo
    }

    public setTipo(tipo: tipo_dato) {
        this.tipo = tipo
    }

    public getTipo() {
        return this.tipo
    }

}

export enum tipo_dato {
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID
}