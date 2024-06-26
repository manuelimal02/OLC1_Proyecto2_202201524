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
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
class Return extends Instruccion_1.Instruccion {
    constructor(linea, columna, expresion) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), linea, columna);
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        if (this.expresion != undefined) {
            let result = this.expresion.interpretar(arbol, tabla);
            if (result instanceof Errores_1.default)
                return result;
        }
        return this;
    }
    obtener_ast(anterior) {
        let contador = Singleton_1.default.getInstancia();
        let dot = "";
        let retorno = `n${contador.getContador()}`;
        let expresion = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`;
        dot += `${retorno}[label="RETURN"];\n`;
        if (this.expresion != undefined) {
            dot += `${expresion}[label="EXPRESION"];\n`;
        }
        dot += `${punto_coma}[label=";"];\n`;
        dot += `${anterior} -> ${retorno};\n`;
        if (this.expresion != undefined) {
            dot += `${anterior} -> ${expresion};\n`;
        }
        dot += `${anterior} -> ${punto_coma};\n`;
        if (this.expresion != undefined) {
            dot += this.expresion.obtener_ast(expresion);
        }
        return dot;
    }
}
exports.default = Return;
