import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Aritmeticas extends Instruccion {
    private operando_izquierda: Instruccion | undefined
    private operando_derecha: Instruccion | undefined
    private operando_unico: Instruccion | undefined
    private operacion: Operadores

    constructor(operador: Operadores, fila: number, columna: number, op_izquierda: Instruccion, op_derecha?: Instruccion) {
        super(new Tipo(tipo_dato.ENTERO), fila, columna)
        this.operacion = operador
        if (!op_derecha) this.operando_unico = op_izquierda
        else {
            this.operando_izquierda = op_izquierda
            this.operando_derecha = op_derecha
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor_izquierda, valor_derecha, valor_unico = null
        if (this.operando_unico != null) {
            valor_unico = this.operando_unico.interpretar(arbol, tabla)
            if (valor_unico instanceof Errores) return valor_unico
        } else {
            valor_izquierda = this.operando_izquierda?.interpretar(arbol, tabla)
            if (valor_izquierda instanceof Errores) return valor_izquierda
            valor_derecha = this.operando_derecha?.interpretar(arbol, tabla)
            if (valor_derecha instanceof Errores) return valor_derecha
        }

        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(valor_izquierda, valor_derecha)
            case Operadores.RESTA:
                return this.resta(valor_izquierda, valor_derecha)
            case Operadores.MULTICACION:
                return this.multiplicacion(valor_izquierda, valor_derecha)
            case Operadores.DIVISION:
                return this.division(valor_izquierda, valor_derecha)
            case Operadores.MODULO:
                return this.modulo(valor_izquierda, valor_derecha)
            case Operadores.POTENCIA:
                return this.potencia(valor_izquierda, valor_derecha)
            case Operadores.NEGACION:
                return this.negacion(valor_unico)
            default:
                return new Errores("Semantico", "Operador Aritmetico Invalido", this.fila, this.columna)
        }
    }

    suma(op_izquierda: any, op_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) 
                {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) + parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) + parseFloat(op_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_derecha.toLowerCase() === "true") {
                            return parseInt(op_izquierda) + 1;
                        } else if (op_derecha.toLowerCase() === "false") {
                            return parseInt(op_izquierda);
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) + op_derecha.charCodeAt(0)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.fila, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) 
                {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) + parseFloat(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) + parseFloat(op_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        if (op_derecha.toLowerCase() === "true") {
                            return parseFloat(op_izquierda) + 1;
                        } else if (op_derecha.toLowerCase() === "false") {
                            return parseFloat(op_izquierda);
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) + parseFloat(op_derecha.charCodeAt(0))
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.fila, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) 
                {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_izquierda.toLowerCase() === "true") {
                            return parseInt(op_derecha) + 1;
                        } else if (op_izquierda.toLowerCase() === "false") {
                            return parseInt(op_derecha);
                        }
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        if (op_izquierda.toLowerCase() === "true") {
                            return parseFloat(op_derecha) + 1;
                        } else if (op_izquierda.toLowerCase() === "false") {
                            return parseFloat(op_derecha);
                        }
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.fila, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (tipo2) 
                {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda.charCodeAt(0)) + parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda.charCodeAt(0)) + parseFloat(op_derecha)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.fila, this.columna)
                }
            case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        if (op_derecha.toLowerCase() === "true") {
                            return op_izquierda + "true";
                        } else if (op_derecha.toLowerCase() === "false") {
                            return op_izquierda + "false";
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return op_izquierda + op_derecha
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.fila, this.columna)
                }
            default:
                return new Errores("Semantico", "Suma Invalida", this.fila, this.columna)
        }
    }

    resta(op_izquierda: any, op_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) - parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) - parseFloat(op_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_derecha.toLowerCase() === "true") {
                            return parseInt(op_izquierda) - 1
                        }
                        else if (op_derecha.toLowerCase() === "false") {
                            return parseInt(op_izquierda) 
                        }   
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) - parseInt(op_derecha.charCodeAt(0))
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.fila, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) - parseFloat(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) - parseFloat(op_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        if (op_derecha.toLowerCase() === "true") {
                            return parseFloat(op_izquierda) - 1
                        }
                        else if (op_derecha.toLowerCase() === "false") {
                            return parseFloat(op_izquierda) 
                        }  
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) - parseFloat(op_derecha.charCodeAt(0))
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.fila, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_izquierda.toLowerCase() === "true") {
                            return 1 - parseInt(op_derecha)
                        }
                        else if (op_izquierda.toLowerCase() === "false") {
                            return 0 - parseInt(op_derecha)
                        }  
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        if (op_izquierda.toLowerCase() === "true") {
                            return 1 - parseFloat(op_derecha)
                        }
                        else if (op_izquierda.toLowerCase() === "false") {
                            return 0 - parseFloat(op_derecha)
                        }  
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.fila, this.columna)
                }
                case tipo_dato.CARACTER:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                            return parseInt(op_izquierda.charCodeAt(0)) - parseInt(op_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(op_izquierda.charCodeAt(0)) - parseFloat(op_derecha)
                        default:
                            return new Errores("Semantico", "Resta Invalida", this.fila, this.columna)
                }
            default:
                return new Errores("Semantico", "Resta Invalida", this.fila, this.columna)
        }
    }

    multiplicacion(op_izquierda: any, op_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            //MULTIPLICACION CON ENTERO
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) * parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) * parseFloat(op_derecha)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) * parseInt(op_derecha.charCodeAt(0))
                    default:
                        return new Errores("Semantico", "Multiplicación Invalida", this.fila, this.columna)
                }
            //MULTIPLICACION CON DECIMAL
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) * parseFloat(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) * parseFloat(op_derecha)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) * parseFloat(op_derecha.charCodeAt(0))
                    default:
                        return new Errores("Semantico", "Multiplicación Invalida", this.fila, this.columna)
                }
            //MULTIPLICACION CON CARACTER
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda.charCodeAt(0)) * parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda.charCodeAt(0)) * parseFloat(op_derecha)
                    default:
                        return new Errores("Semantico", "Multiplicación Invalida", this.fila, this.columna)
                }
            default:
                return new Errores("Semantico", "Resta Invalida", this.fila, this.columna)
        }
    }

    
    division(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        if (parseFloat(valor_derecha) === 0) {
            return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
        }
        else {
            switch (tipo1) {
                case tipo_dato.ENTERO:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha)
                        case tipo_dato.CARACTER:
                            this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha.charCodeAt(0))
                        default:
                            return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
                    }
                case tipo_dato.DECIMAL:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha)
                        case tipo_dato.CARACTER:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha.charCodeAt(0))
                        default:
                            return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
                    }
                case tipo_dato.CARACTER:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda.charCodeAt(0)) / parseFloat(valor_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda.charCodeAt(0)) / parseFloat(valor_derecha)
                        default:
                            return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
                    }
                default:
                    return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
            }
        }
    }

    modulo(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        if (parseFloat(valor_derecha) === 0) {
            return new Errores("Semantico", "Modulo Invalida", this.fila, this.columna)
        }
        else {
            switch (tipo1) {
                case tipo_dato.ENTERO:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha)
                        default:
                            return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
                    }
                case tipo_dato.DECIMAL:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) % parseFloat(valor_derecha)
                        default:
                            return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
                    }
                default:
                    return new Errores("Semantico", "Division Invalida", this.fila, this.columna)
            }
        }
    }

    potencia(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return Math.pow(parseInt(valor_izquierda), parseInt(valor_derecha))
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha))
                    default:
                        return new Errores("Semantico", "Potencia Invalida", this.fila, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha))
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha))
                    default:
                        return new Errores("Semantico", "Potencia Invalida", this.fila, this.columna)
                }
            default:
                return new Errores("Semantico", "Potencia Invalida", this.fila, this.columna)
        }
    }



    negacion(op_izquierda: any) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(op_izquierda) * -1
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                return parseFloat(op_izquierda) * -1
            default:
                return new Errores("Semantico", "Negacion Unaria invalida", this.fila, this.columna)
        }
    }

}

export enum Operadores {
    SUMA,
    RESTA,
    MULTICACION,
    DIVISION,
    MODULO,
    POTENCIA,
    NEGACION
}