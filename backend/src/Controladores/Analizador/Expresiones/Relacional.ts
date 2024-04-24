import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Singleton from "../ArbolAst/Singleton";

export default class OperadorRelacional extends Instruccion {
    private operando_izquierda: Instruccion | undefined
    private operando_derecha: Instruccion | undefined
    private operando_unico: Instruccion | undefined
    private operacion: Operador

    constructor(operador: Operador, fila: number, columna: number, valor_izquierda: Instruccion, valor_derecha?: Instruccion) {
        super(new Tipo(tipo_dato.BOOLEANO), fila, columna)
        this.operacion = operador
        this.operando_izquierda = valor_izquierda
        this.operando_derecha = valor_derecha
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
            case Operador.IGUALIGUAL:
                return this.igual_igual(valor_izquierda, valor_derecha, arbol)
            case Operador.DISTINTO:
                return this.distinto(valor_izquierda, valor_derecha, arbol)
            case Operador.MENORQUE:
                return this.menor_que(valor_izquierda, valor_derecha, arbol)
            case Operador.MENORIGUAL:
                return this.menor_igual(valor_izquierda, valor_derecha, arbol)
            case Operador.MAYORQUE:
                return this.mayor_que(valor_izquierda, valor_derecha, arbol)
            case Operador.MAYORIGUAL:
                return this.mayor_igual(valor_izquierda, valor_derecha, arbol)
            default:
                let error = new Errores("Semántico", "Operador Relacional Inválido", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operador Relacional Inválido.\n")
                return error
        }
    }

    igual_igual(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) === parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) === 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) === 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) === parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n")
                        return error
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) === 1;
                        } else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) === 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) === parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n")
                        return error
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 === parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 === parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_izquierda === true) {
                            if (valor_derecha === true) {
                                return true
                            }
                            if (valor_derecha === false) {
                                return false
                            }
                        }
                        if (valor_izquierda === false) {
                            if (valor_derecha === true) {
                                return false
                            }
                            if (valor_derecha === false) {
                                return true
                            }
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 === parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n")
                        return error
                }
                case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) === parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda.charCodeAt(0)) === parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) === 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) === 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) === parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n")
                        return error
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() === valor_derecha.toString()
                    default:
                        let error = new Errores("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Igual-Igual Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Igual-Igual Inválida.\n")
                return error
        }
    }

    distinto(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) != parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) != 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) != 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) != parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Distinto Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n")
                        return error
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) != 1;
                        } else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) != 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) != parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Distinto Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n")
                        return error
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 != parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 != parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_izquierda === true) {
                            if (valor_derecha === true) {
                                return false
                            }
                            if (valor_derecha === false) {
                                return true
                            }
                        }
                        if (valor_izquierda === false) {
                            if (valor_derecha === true) {
                                return true
                            }
                            if (valor_derecha === false) {
                                return false
                            }
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 != parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Distinto Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n")
                        return error
                }
                case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) != parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda.charCodeAt(0)) != parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) != 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) != 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) != parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Distinto Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n")
                        return error
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() != valor_derecha.toString()
                    default:
                        let error = new Errores("Semántico", "Operación Distinto Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Distinto Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Distinto Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Distinto Inválida.\n")
                return error
        }
    }

    menor_que(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) < parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) < 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) < 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) < parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n")
                        return error
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) < 1;
                        } else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) < 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) < parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n")
                        return error
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 < parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 < parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 < 1;
                        } else if (valor_derecha === false) {
                            return 0 < 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 < parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n")
                        return error
                }
                case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) < parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda.charCodeAt(0)) < parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) < 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) < 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) < parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n")
                        return error
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return false
                    default:
                        let error = new Errores("Semántico", "Operación Menor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor Que Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Menor Que Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Menor Que Inválida.\n")
                return error
        }
    }

    menor_igual(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) <= parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) <= 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) <= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) <= parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n")
                        return error
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) <= 1;
                        } else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) <= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) <= parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n")
                        return error
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 <= parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 <= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 <= 1;
                        } else if (valor_derecha === false) {
                            return 0 <= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 <= parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n")
                        return error
                }
                case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) <= parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda.charCodeAt(0)) <= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) <= 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) <= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) <= parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n")
                        return error
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() === valor_derecha.toString()
                    default:
                        let error = new Errores("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Menor-Igual Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Menor-Igual Inválida.\n")
                return error
        }
    }

    mayor_que(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) > parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) > 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) > 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) > parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n")
                        return error
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) > 1;
                        } else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) > 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) > parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n")
                        return error
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 > parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 > parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 > 1;
                        } else if (valor_derecha === false) {
                            return 0 > 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 > parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n")
                        return error
                }
                case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) > parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda.charCodeAt(0)) > parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) > 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) > 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) > parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n")
                        return error
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return false
                    default:
                        let error = new Errores("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Mayor Que Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Mayor Que Inválida.\n")
                return error
        }
    }

    mayor_igual(valor_izquierda: any, valor_derecha: any, arbol:Arbol) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) >= parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda) >= 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda) >= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda) >= parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n")
                        return error
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        if (valor_derecha === true) {
                            return parseFloat(valor_izquierda) >= 1;
                        } else if (valor_derecha === false) {
                            return parseFloat(valor_izquierda) >= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda) >= parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n")
                        return error
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 >= parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 >= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return 1 >= 1;
                        } else if (valor_derecha === false) {
                            return 0 >= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return 1 >= parseFloat(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n")
                        return error
                }
                case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) >= parseInt(valor_derecha)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(valor_izquierda.charCodeAt(0)) >= parseFloat(valor_derecha)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return parseInt(valor_izquierda.charCodeAt(0)) >= 1;
                        } else if (valor_derecha === false) {
                            return parseInt(valor_izquierda.charCodeAt(0)) >= 0;
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(valor_izquierda.charCodeAt(0)) >= parseInt(valor_derecha.charCodeAt(0))
                    default:
                        let error = new Errores("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n")
                        return error
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() === valor_derecha.toString()
                    default:
                        let error = new Errores("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna)
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n")
                        return error
                }
            default:
                let error = new Errores("Semántico", "Operación Mayor-Igual Inválida", this.fila, this.columna)
                arbol.agregarError(error);
                arbol.setConsola("Semántico: Operación Mayor-Igual Inválida.\n")
                return error
        }
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot =""
        if(this.operacion == Operador.IGUALIGUAL){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`
            dot += `${nodo_operacion}[label = "=="];\n`
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operador.DISTINTO){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`
            dot += `${nodo_operacion}[label = "!="];\n`
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operador.MAYORQUE){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`
            dot += `${nodo_operacion}[label = ">"];\n`
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operador.MENORQUE){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`
            dot += `${nodo_operacion}[label = "<"];\n`
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operador.MAYORIGUAL){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`
            dot += `${nodo_operacion}[label = ">="];\n`
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }else if(this.operacion == Operador.MENORIGUAL){
            let nodo_expresion1 = `n${contador.getContador()}`
            let nodo_expresion2 = `n${contador.getContador()}`
            let nodo_operacion = `n${contador.getContador()}`
            dot += `${nodo_expresion1}[label = "EXPRESION"];\n`
            dot += `${nodo_operacion}[label = "<="];\n`
            dot += `${nodo_expresion2}[label = "EXPRESION"];\n`
            dot += `${anterior} -> ${nodo_expresion1};\n`
            dot += `${anterior} -> ${nodo_operacion};\n`
            dot += `${anterior} -> ${nodo_expresion2};\n`
            dot += this.operando_izquierda?.obtener_ast(nodo_expresion1)
            dot += this.operando_derecha?.obtener_ast(nodo_expresion2)
        }
        return dot;
    }
}

export enum Operador {
    IGUALIGUAL,
    DISTINTO,
    MENORQUE,
    MENORIGUAL,
    MAYORQUE,
    MAYORIGUAL
}