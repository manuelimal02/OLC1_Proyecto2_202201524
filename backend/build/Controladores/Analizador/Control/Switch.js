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
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
const Break_1 = __importDefault(require("../Transferencia/Break"));
const Continue_1 = __importDefault(require("../Transferencia/Continue"));
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
}
exports.default = Switch;
