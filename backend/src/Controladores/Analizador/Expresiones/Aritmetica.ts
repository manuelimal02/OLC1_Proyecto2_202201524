import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
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

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
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
                return new Errores("Semántico", "Operador Aritmético Inválido", this.fila, this.columna)
        }
    }

    suma(op_izquierda: any, op_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            //ENTERO CON TODOS LOS DEMÁS
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
                        if (op_derecha === true) {
                            return parseInt(op_izquierda) + 1;
                        } else if (op_derecha === false) {
                            return parseInt(op_izquierda);
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) + op_derecha.charCodeAt(0)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    default:
                        return new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                }
            //DECIMAL CON TODOS LOS DEMÁS
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
                        if (op_derecha === true) {
                            return parseFloat(op_izquierda) + 1;
                        } else if (op_derecha === false) {
                            return parseFloat(op_izquierda);
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) + parseFloat(op_derecha.charCodeAt(0))
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    default:
                        return new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                }
            //BOOLEANO CON TODOS LOS DEMÁS
            case tipo_dato.BOOLEANO:
                switch (tipo2) 
                {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_izquierda === true) {
                            return parseInt(op_derecha) + 1;
                        } else if (op_izquierda === false) {
                            return parseInt(op_derecha);
                        }
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        if (op_izquierda === true) {
                            return parseFloat(op_derecha) + 1;
                        } else if (op_izquierda=== false) {
                            return parseFloat(op_derecha);
                        }
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        if (op_izquierda === true) {
                            return String("true" + op_derecha)
                        } else if (op_izquierda=== false) {
                            return String("false" + op_derecha)
                        }
                    default:
                        return new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                }
            //CARACTER CON TODOS LOS DEMÁS
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
                        return String(op_izquierda + op_derecha)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    default:
                        return new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                }
            //CARACTER CON TODOS LOS DEMÁS
            case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        if (op_derecha === true) {
                            return String(op_izquierda + "true")
                        } else if (op_derecha === false) {
                            return String(op_izquierda + "false")
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    default:
                        return new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
        }
    }

    resta(op_izquierda: any, op_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                //ENTERO CON TODOS LOS DEMÁS
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) - parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) - parseFloat(op_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_derecha === true) {
                            return parseInt(op_izquierda) - 1
                        }
                        else if (op_derecha === false) {
                            return parseInt(op_izquierda) 
                        }   
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda) - parseInt(op_derecha.charCodeAt(0))
                    default:
                        return new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                }
            //DECIMAL CON TODOS LOS DEMÁS
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
                        if (op_derecha === true) {
                            return parseFloat(op_izquierda) - 1
                        }
                        else if (op_derecha === false) {
                            return parseFloat(op_izquierda) 
                        }  
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda) - parseFloat(op_derecha.charCodeAt(0))
                    default:
                        return new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                }
            //BOOLEANO CON TODOS LOS DEMÁS
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        if (op_izquierda === true) {
                            return 1 - parseInt(op_derecha)
                        }
                        else if (op_izquierda === false) {
                            return 0 - parseInt(op_derecha)
                        }  
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        if (op_izquierda === true) {
                            return 1 - parseFloat(op_derecha)
                        }
                        else if (op_izquierda === false) {
                            return 0 - parseFloat(op_derecha)
                        }  
                    default:
                        return new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                }
                //CARACTER CON TODOS LOS DEMÁS
                case tipo_dato.CARACTER:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                            return parseInt(op_izquierda.charCodeAt(0)) - parseInt(op_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(op_izquierda.charCodeAt(0)) - parseFloat(op_derecha)
                        default:
                            return new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
        }
    }

    multiplicacion(op_izquierda: any, op_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            //ENTERO CON TODOS LOS DEMÁS
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
                        return new Errores("Semántico", "Operación Multiplicación Inválida", this.fila, this.columna)
                }
            //DECIMAL CON TODOS LOS DEMÁS
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
                        return new Errores("Semántico", "Operación Multiplicación Inválida", this.fila, this.columna)
                }
            //DECIMAL CON TODOS LOS DEMÁS
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda.charCodeAt(0)) * parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda.charCodeAt(0)) * parseFloat(op_derecha)
                    default:
                        return new Errores("Semántico", "Operación Multiplicación Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Operación Multiplicación Inválida", this.fila, this.columna)
        }
    }
    
    division(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        if (parseFloat(valor_derecha) === 0) {
            return new Errores("Semántico", "Operación División Invalida", this.fila, this.columna)
        }
        else {
            switch (tipo1) {
                //ENTERO CON TODOS LOS DEMÁS
                case tipo_dato.ENTERO:
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
                            return new Errores("Semántico", "Operación División Invalida", this.fila, this.columna)
                    }
                //DECIMAL CON TODOS LOS DEMÁS
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
                            return new Errores("Semántico", "Operación División Invalida", this.fila, this.columna)
                    }
                //CARACTER CON TODOS LOS DEMÁS
                case tipo_dato.CARACTER:
                    switch (tipo2) {
                        case tipo_dato.ENTERO:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda.charCodeAt(0)) / parseFloat(valor_derecha)
                        case tipo_dato.DECIMAL:
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda.charCodeAt(0)) / parseFloat(valor_derecha)
                        default:
                            return new Errores("Semántico", "Operación División Invalida", this.fila, this.columna)
                    }
                default:
                    return new Errores("Semántico", "Operación División Invalida", this.fila, this.columna)
            }
        }
    }

    modulo(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        if (parseFloat(valor_derecha) === 0) {
            return new Errores("Semántico", "Operación Modulo Inválida", this.fila, this.columna)
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
                            return new Errores("Semántico", "Operación Modulo Inválida", this.fila, this.columna)
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
                            return new Errores("Semántico", "Operación Modulo Inválida", this.fila, this.columna)
                    }
                default:
                    return new Errores("Semántico", "Operación Modulo Inválida", this.fila, this.columna)
            }
        }
    }

    potencia(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            //ENTERO CON TODOS LOS DEMÁS
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return Math.pow(parseInt(valor_izquierda), parseInt(valor_derecha))
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha))
                    default:
                        return new Errores("Semántico", "Operación Potencia Inválida", this.fila, this.columna)
                }
            //DECIMAL CON TODOS LOS DEMÁS
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha))
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor_izquierda), parseFloat(valor_derecha))
                    default:
                        return new Errores("Semántico", "Operación Potencia Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Operación Potencia Inválida", this.fila, this.columna)
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
                return new Errores("Semántico", "Operación Negación Unaria Inválida", this.fila, this.columna)
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