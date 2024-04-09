class Arbol {
    private _etiqueta: string;
    private _valor: string;
    private _fila: number;
    private _columna: number;
    private _hijos: Arbol[];

    constructor(etiqueta: string, valor: string, fila: number, columna: number) {
        this._etiqueta = etiqueta;
        this._valor = valor;
        this._fila = fila;
        this._columna = columna;
        this._hijos = [];
    }

    public AgregarHijo(hijo: Arbol): void {
        this._hijos.push(hijo);
    }
    
    public get hijos(): Arbol[] {
        return this._hijos;
    }
    
    public set hijos(hijos: Arbol[]) {
        this._hijos = hijos;
    }

    public get etiqueta(): string {
        return this._etiqueta;
    }

    public get valor(): string {
        return this._valor;
    }

    public get fila(): number {
        return this._fila;
    }

    public get columna(): number {
        return this._columna;
    }

    // Setters
    public set etiqueta(etiqueta: string) {
        this._etiqueta = etiqueta;
    }

    public set valor(valor: string) {
        this._valor = valor;
    }

    public set fila(fila: number) {
        this._fila = fila;
    }

    public set columna(columna: number) {
        this._columna = columna;
    }

    public imprimirNodos(indentacion: string = ''): void {
        console.log(indentacion + this._etiqueta + ": " + this._valor);
        for (let hijo of this._hijos) {
            if (hijo instanceof Arbol) {
                hijo.imprimirNodos(indentacion + '  ');
            } 
        }
    }
}
module.exports = Arbol;