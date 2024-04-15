import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

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
                return this.igual_igual(valor_izquierda, valor_derecha)
            case Operador.DISTINTO:
                return this.distinto(valor_izquierda, valor_derecha)
            case Operador.MENORQUE:
                return this.menor_que(valor_izquierda, valor_derecha)
            case Operador.MENORIGUAL:
                return this.menor_igual(valor_izquierda, valor_derecha)
            case Operador.MAYORQUE:
                return this.mayor_que(valor_izquierda, valor_derecha)
            case Operador.MAYORIGUAL:
                return this.mayor_igual(valor_izquierda, valor_derecha)
            default:
                return new Errores("Semántico", "Operador Relacional Inválido", this.fila, this.columna)
        }
    }

    igual_igual(valor_izquierda: any, valor_derecha: any) {
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                        } else if (valor_derecha === false) {
                            return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() === valor_derecha.toString()
                    default:
                        return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Comparación Igual-Igual Inválida", this.fila, this.columna)
        }
    }

    distinto(valor_izquierda: any, valor_derecha: any) {
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        //console.log("entro antes del if")
                        if (valor_derecha === true) {
                            return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                        } else if (valor_derecha === false) {
                            return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() != valor_derecha.toString()
                    default:
                        return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Comparación Distinto Inválida", this.fila, this.columna)
        }
    }

    menor_que(valor_izquierda: any, valor_derecha: any) {
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                        } else if (valor_derecha === false) {
                            return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return false
                    default:
                        return new Errores("Semántico", "Comparación Menor Que Inválidaa", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Comparación Menor Que Inválida", this.fila, this.columna)
        }
    }

    menor_igual(valor_izquierda: any, valor_derecha: any) {
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "CComparación Menor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                        } else if (valor_derecha === false) {
                            return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() === valor_derecha.toString()
                    default:
                        return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Comparación Menor-Igual Inválida", this.fila, this.columna)
        }
    }

    mayor_que(valor_izquierda: any, valor_derecha: any) {
        let tipo1 = this.operando_izquierda?.tipo_dato.getTipo()
        let tipo2 = this.operando_derecha?.tipo_dato.getTipo()
        switch (tipo1) {
            //enteros
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                        } else if (valor_derecha === false) {
                            
                            return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return false
                    default:
                        return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Comparación Mayor Que Inválida", this.fila, this.columna)
        }
    }

    mayor_igual(valor_izquierda: any, valor_derecha: any) {
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        console.log("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
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
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    default:
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                }
                case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO);
                        if (valor_derecha === true) {
                            return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                        } else if (valor_derecha === false) {
                            return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                        }
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return valor_izquierda.toString() === valor_derecha.toString()
                    default:
                        return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
                }
            default:
                return new Errores("Semántico", "Comparación Mayor-Igual Inválida", this.fila, this.columna)
        }
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