import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Singleton from "../ArbolAst/Singleton";

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
                return this.suma(valor_izquierda, valor_derecha, arbol)
            case Operadores.RESTA:
                return this.resta(valor_izquierda, valor_derecha, arbol)
            case Operadores.MULTICACION:
                return this.multiplicacion(valor_izquierda, valor_derecha, arbol)
            case Operadores.DIVISION:
                return this.division(valor_izquierda, valor_derecha, arbol)
            case Operadores.MODULO:
                return this.modulo(valor_izquierda, valor_derecha, arbol)
            case Operadores.POTENCIA:
                return this.potencia(valor_izquierda, valor_derecha, arbol)
            case Operadores.NEGACION:
                return this.negacion(valor_unico, arbol)
            default:
                let error = new Errores("Semántico", "Operador Aritmético Inválido", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operador Aritmético Inválido.\n")
                return error 
        }
    }

    suma(op_izquierda: any, op_derecha: any, arbol: Arbol) {
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
                        let error = new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n")
                        return error 
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
                        let error = new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n")
                        return error 
                }
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
                        let error = new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n")
                        return error 
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
                        return String(op_izquierda + op_derecha)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return String(op_izquierda + op_derecha)
                    default:
                        let error = new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n")
                        return error
                }
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
                        let error = new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Suma Inválida.\n")
                        return error 
                }
            default:
                let error = new Errores("Semántico", "Operación Suma Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Suma Inválida.\n")
                return error 
        }
    }

    resta(op_izquierda: any, op_derecha: any, arbol: Arbol) {
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
                        let error = new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n")
                        return error
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
                        let error = new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n")
                        return error
                }
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
                        let error = new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Resta Inválida.\n")
                        return error
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
                            let error = new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación Resta Inválida.\n")
                            return error
                }
            default:
                let error = new Errores("Semántico", "Operación Resta Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Resta Inválida.\n")
                return error
        }
    }

    multiplicacion(op_izquierda: any, op_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
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
                        let error = new Errores("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n")
                        return error
                }
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
                        let error = new Errores("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n")
                        return error
                }
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(op_izquierda.charCodeAt(0)) * parseInt(op_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(op_izquierda.charCodeAt(0)) * parseFloat(op_derecha)
                    default:
                        let error = new Errores("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Multiplicación Inválida.", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Multiplicación Inválida.\n")
                return error
        }
    }
    
    division(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        if (parseFloat(valor_derecha) === 0) {
            let error = new Errores("Semántico", "Operación División Invalida.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Operación División Invalida.\n")
            return error
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
                            this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                            return parseFloat(valor_izquierda) / parseFloat(valor_derecha.charCodeAt(0))
                        default:
                            let error = new Errores("Semántico", "Operación División Invalida.", this.fila, this.columna)
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación División Invalida.\n")
                            return error
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
                            let error = new Errores("Semántico", "Operación División Invalida.", this.fila, this.columna)
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación División Invalida.\n")
                            return error
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
                            let error = new Errores("Semántico", "Operación División Invalida.", this.fila, this.columna)
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación División Invalida.\n")
                            return error
                    }
                default:
                    let error = new Errores("Semántico", "Operación División Invalida.", this.fila, this.columna)
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Operación División Invalida.\n")
                    return error
            }
        }
    }

    modulo(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        if (parseFloat(valor_derecha) === 0) {
            let error = new Errores("Semántico", "Operación Modulo Inválida.", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Operación Modulo Inválida.\n")
            return error
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
                            let error = new Errores("Semántico", "Operación Modulo Inválida.", this.fila, this.columna)
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación Modulo Inválida.\n")
                            return error
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
                            let error = new Errores("Semántico", "Operación Modulo Inválida.", this.fila, this.columna)
                            arbol.agregarError(error);
                            arbol.setConsola("Semántico: Operación Modulo Inválida.\n")
                            return error
                    }
                default:
                    let error = new Errores("Semántico", "Operación Modulo Inválida.", this.fila, this.columna)
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Operación Modulo Inválida.\n")
                    return error
            }
        }
    }

    potencia(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
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
                        let error = new Errores("Semántico", "Operación Potencia Inválida.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Potencia Inválida.\n")
                        return error
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
                        let error = new Errores("Semántico", "Operación Potencia Inválida.", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Potencia Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Potencia Inválida.", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Potencia Inválida.\n")
                return error
        }
    }
    
    negacion(op_izquierda: any, arbol:Arbol) {
        let op_unico = this.operando_unico?.tipo_dato.getTipo()
        switch (op_unico) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(op_izquierda) * -1
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                return parseFloat(op_izquierda) * -1
            default:
                let error = new Errores("Semántico", "Operación Negación Unaria Inválida.", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Negación Unaria Inválida.\n")
                return error
        }
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = ""
        if (this.operacion == Operadores.NEGACION) {
            let nodo_negacion = `n${contador.getContador()}`
            let nodo_expresion = `n${contador.getContador()}`
            dot += `${nodo_negacion}[label=\"NEGACION\"];\n`
            dot += `${nodo_expresion}[label=\"EXPRESION\"];\n`
            dot += `${anterior}->${nodo_negacion};\n`
            dot += `${anterior}-> ${nodo_expresion};\n`
            dot += this.operando_unico?.obtener_ast(nodo_expresion)
        } else if (this.operacion == Operadores.SUMA) {
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`
            dot += `${nodo_operacion}[label=\"+\"];\n`
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operadores.RESTA){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`
            dot += `${nodo_operacion}[label=\"-\"];\n`
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operadores.MULTICACION){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`
            dot += `${nodo_operacion}[label=\"*\"];\n`
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operadores.DIVISION){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`
            dot += `${nodo_operacion}[label=\"/\"];\n`
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operadores.MODULO){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label= \"EXPRESION\"];\n`
            dot += `${nodo_operacion}[label=\"%\"];\n`
            dot += `${nodo_expresion2}[label=\"EXPRESION\"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operadores.POTENCIA){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let par1 = `n${contador.getContador()}`
            let par2 = `n${contador.getContador()}`
            let nodoPow = `n${contador.getContador()}`
            let nodoComa = `n${contador.getContador()}`
            dot += `${nodoPow}[label="POTENCIA"];\n`
            dot += `${par1}[label="("];\n`
            dot += `${nodo_expresion1}[label="EXPRESION"];\n`
            dot += `${nodoComa}[label=","];\n`
            dot += `${nodo_expresion2}[label="EXPRESION"];\n`
            dot += `${par2}[label=")"];\n`
            dot += `${anterior} -> ${nodoPow};\n`
            dot += `${anterior} -> ${par1};\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodoComa};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += `${anterior} -> ${par2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }
        return dot;
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