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
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
class Return extends Instruccion_1.Instruccion {
    constructor(linea, columna, expresion) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.ENTERO), linea, columna);
        this.retorno = null;
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        if (this.expresion) {
            this.retorno = this.expresion.interpretar(arbol, tabla);
            this.tipo_dato = this.expresion.tipo_dato;
        }
        return this;
    }
}
exports.default = Return;
