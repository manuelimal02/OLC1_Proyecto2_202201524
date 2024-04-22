"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Simbolo_1 = __importDefault(require("../ArbolAst/Simbolo"));
const Tipo_1 = require("../ArbolAst/Tipo");
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, fila, columna, id, valor) {
        super(tipo, fila, columna);
        this.identificador = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valor_variable;
        this.identificador.forEach((elemento) => {
            if (this.valor === null) {
                valor_variable = this.valor_defecto(this.tipo_dato);
            }
            else {
                valor_variable = this.valor.interpretar(arbol, tabla);
                if (valor_variable instanceof Errores_1.default)
                    return valor_variable;
                if ((valor_variable == true || valor_variable == false) && this.tipo_dato.getTipo() == Tipo_1.tipo_dato.ENTERO) {
                    valor_variable = valor_variable == true ? 1 : 0;
                }
                else if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                    let error = new Errores_1.default("Semántico", "Error Al Declarar Variable.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Error Al Declarar Variable Los Tipos no coinciden.\n");
                    return error;
                }
            }
            if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.ENTERO) {
                if (parseInt(valor_variable) < -2147483648 || parseInt(valor_variable) > 2147483647) {
                    let error = new Errores_1.default("Semántico", "Variable Int Fuera De Rango.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Variable Int Fuera De Rango.\n");
                    return error;
                }
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, elemento, this.fila, this.columna, valor_variable))) {
                let error = new Errores_1.default("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: La Variable Ya Existe.\n");
                return error;
            }
        });
    }
    valor_defecto(tipo) {
        switch (tipo.getTipo()) {
            case Tipo_1.tipo_dato.ENTERO:
                return 0;
            case Tipo_1.tipo_dato.DECIMAL:
                return 0;
            case Tipo_1.tipo_dato.BOOLEANO:
                return true;
            case Tipo_1.tipo_dato.CARACTER:
                return '';
            case Tipo_1.tipo_dato.CADENA:
                return "";
            default:
                return null;
        }
    }
    obtener_ast(anterior) {
        let result = "";
        let contador = Singleton_1.default.getInstancia();
        let declar = `n${contador}`;
        let tipoD = `n${contador.getContador()}`;
        let ids = `n${contador.getContador()}`;
        let conjuntoID = [];
        for (let i = 0; i < this.identificador.length; i++) {
            conjuntoID.push(`n${contador.getContador()}`);
        }
        let igual = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;
        result += `${declar}[label="Declaracion"];\n`;
        if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.ENTERO) {
            result += `${tipoD}[label="int"];\n`;
        }
        else if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.DECIMAL) {
            result += `${tipoD}[label="double"];\n`;
        }
        else if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.BOOLEANO) {
            result += `${tipoD}[label="bool"];\n`;
        }
        else if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.CADENA) {
            result += `${tipoD}[label="std::string"];\n`;
        }
        else if (this.tipo_dato.getTipo() == Tipo_1.tipo_dato.CARACTER) {
            result += `${tipoD}[label="char"];\n`;
        }
        result += `${ids}[label="IDS"];\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            result += `${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`;
        }
        result += `${igual}[label="="];\n`;
        result += `${valor}[label="Expresion"];\n`;
        result += `${puntocoma}[label=";"];\n`;
        result += `${anterior} -> ${declar};\n`;
        result += `${declar} -> ${ids};\n`;
        result += `${declar} -> ${tipoD};\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            result += `${ids} -> ${conjuntoID[i]};\n`;
        }
        result += `${declar} -> ${igual};\n`;
        result += `${declar} -> ${valor};\n`;
        result += `${declar} -> ${puntocoma};\n`;
        this.valor.obtener_ast(valor);
        return result;
    }
}
exports.default = Declaracion;
