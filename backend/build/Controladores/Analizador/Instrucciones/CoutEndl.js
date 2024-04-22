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
const Singleton_1 = __importDefault(require("../ArbolAst/Singleton"));
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Errores_1 = __importDefault(require("../Errores/Errores"));
class CoutEndl extends Instruccion_1.Instruccion {
    constructor(expresion, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        arbol.CoutEndl(valor);
    }
    obtener_ast(anterior) {
        let dot = "";
        let contador = Singleton_1.default.getInstancia();
        let cout = `n${contador.getContador()}`;
        let menor_menor1 = `n${contador.getContador()}`;
        let expresion_node = `n${contador.getContador()}`;
        let menor_menor2 = `n${contador.getContador()}`;
        let endl = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`;
        dot += `${cout}[label="cout"];\n`;
        dot += `${menor_menor1}[label="<<"];\n`;
        dot += `${expresion_node}[label="EXPRESION"];\n`;
        dot += `${menor_menor2}[label="<<"];\n`;
        dot += `${endl}[label="endl"];\n`;
        dot += `${punto_coma}[label=";"];\n`;
        dot += `${anterior} -> ${cout};\n`;
        dot += `${anterior} -> ${menor_menor1};\n`;
        dot += `${anterior} -> ${expresion_node};\n`;
        dot += `${anterior} -> ${menor_menor2};\n`;
        dot += `${anterior} -> ${endl};\n`;
        dot += `${anterior} -> ${punto_coma};\n`;
        dot += this.expresion.obtener_ast(expresion_node);
        return dot;
    }
}
exports.default = CoutEndl;
