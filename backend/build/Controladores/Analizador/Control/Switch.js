"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Errores_1 = __importDefault(require("../Errores/Errores"));
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Break_1 = __importDefault(require("../Transferencia/Break"));
const Continue_1 = __importDefault(require("../Transferencia/Continue"));
const Return_1 = __importDefault(require("../Transferencia/Return"));
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Switch extends Instruccion_1.Instruccion {
    constructor(condicion_switch, fila, columna, opcion_case, opcion_default) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.condicion_switch = condicion_switch;
        this.opcion_case = opcion_case;
        this.opcion_default = opcion_default;
    }
    interpretar(arbol, tabla) {
        let condicion = this.condicion_switch.interpretar(arbol, tabla);
        if (condicion instanceof Errores_1.default)
            return condicion;
        if (this.opcion_case != undefined) {
            for (let caso of this.opcion_case) {
                caso.condicional_case = this.condicion_switch;
                let resultado = caso.interpretar(arbol, tabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
                if (resultado instanceof Break_1.default)
                    return;
                if (resultado instanceof Return_1.default)
                    return resultado;
                if (resultado instanceof Continue_1.default) {
                    let error = new Errores_1.default("Semántico", "La función continue no es parte del switch.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: La función continue no es parte del switch.\n");
                    return error;
                }
            }
        }
        if (this.opcion_default != undefined) {
            let condicion_default = this.opcion_default.interpretar(arbol, tabla);
            if (condicion_default instanceof Break_1.default)
                return;
            if (condicion_default instanceof Return_1.default)
                return condicion_default;
            if (condicion_default instanceof Continue_1.default) {
                let error = new Errores_1.default("Semántico", "La función continue no es parte del switch.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: La función continue no es parte del switch.\n");
                return error;
            }
            if (condicion_default instanceof Errores_1.default)
                return condicion_default;
        }
    }
    obtener_ast(anterior) {
        let dot = "";
        let contador = Singleton_1.default.getInstancia();
        let instruccion_default = undefined;
        let instruccion_case = [];
        let instruccion_switch = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let expresion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let raiz = `n${contador.getContador()}`;
        let llave_derecha = `n${contador.getContador()}`;
        if (this.opcion_case != undefined) {
            for (let i = 0; i < this.opcion_case.length; i++) {
                instruccion_case.push(`n${contador.getContador()}`);
            }
        }
        if (this.opcion_default != undefined) {
            instruccion_default = `n${contador.getContador()}`;
        }
        dot += `${instruccion_switch}[label="SWITCH"];\n`;
        dot += `${parentesis_izquierdo}[label="("];\n`;
        dot += `${expresion}[label="EXPRESION"];\n`;
        dot += `${parentesis_derecho}[label=")"];\n`;
        dot += `${llave_izquierda}[label="{"];\n`;
        dot += `${raiz}[label="CASE/DEFAULT"];\n`;
        dot += `${llave_derecha}[label="}"];\n`;
        if (this.opcion_case != undefined) {
            for (let i = 0; i < this.opcion_case.length; i++) {
                dot += `${instruccion_case[i]}[label="CASE"];\n`;
            }
        }
        if (this.opcion_default != undefined) {
            dot += `${instruccion_default}[label="DEFAULT"];\n`;
        }
        dot += `${anterior} -> ${instruccion_switch};\n`;
        dot += `${anterior} -> ${parentesis_izquierdo};\n`;
        dot += `${anterior} -> ${expresion};\n`;
        dot += `${anterior} -> ${parentesis_derecho};\n`;
        dot += `${anterior} -> ${llave_izquierda};\n`;
        dot += `${anterior} -> ${raiz};\n`;
        dot += `${anterior} -> ${llave_derecha};\n`;
        if (this.opcion_case != undefined) {
            for (let i = 0; i < this.opcion_case.length; i++) {
                dot += `${raiz} -> ${instruccion_case[i]};\n`;
            }
        }
        if (this.opcion_default != undefined) {
            dot += `${raiz} -> ${instruccion_default};\n`;
        }
        dot += this.condicion_switch.obtener_ast(expresion);
        if (this.opcion_case != undefined) {
            for (let i = 0; i < this.opcion_case.length; i++) {
                dot += this.opcion_case[i].obtener_ast(instruccion_case[i]);
            }
        }
        if (this.opcion_default != undefined) {
            dot += this.opcion_default.obtener_ast(instruccion_default);
        }
        return dot;
    }
}
exports.default = Switch;
