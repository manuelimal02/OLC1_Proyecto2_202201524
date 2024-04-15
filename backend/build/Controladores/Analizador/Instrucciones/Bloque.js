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
const TablaSimbolo_1 = __importDefault(require("../Simbolo/TablaSimbolo"));
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
const Break_1 = __importDefault(require("./Break"));
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones, fila, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        let nueva_tabla = new TablaSimbolo_1.default(tabla);
        nueva_tabla.setNombre("Tabla_Nueva");
        for (let i of this.instrucciones) {
            if (i instanceof Break_1.default)
                return i;
            let resultado = i.interpretar(arbol, nueva_tabla);
        }
        return null;
    }
}
exports.default = Bloque;
