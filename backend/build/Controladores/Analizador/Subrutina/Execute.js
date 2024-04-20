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
const TablaSimbolo_1 = __importDefault(require("../ArbolAst/TablaSimbolo"));
const Tipo_1 = __importStar(require("../ArbolAst/Tipo"));
const Declaracion_1 = __importDefault(require("../Instrucciones/Declaracion"));
const Metodo_1 = __importDefault(require("./Metodo"));
class Run extends Instruccion_1.Instruccion {
    constructor(identificador, fila, columna, parametro) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.identificador = identificador;
        this.parametro = parametro;
    }
    interpretar(arbol, tabla) {
        let busqueda_funcion = arbol.getFuncion(this.identificador);
        if (busqueda_funcion == null)
            return new Errores_1.default("SEMANTICO", "Funcion no existente", this.fila, this.columna);
        if (busqueda_funcion instanceof Metodo_1.default) {
            let nueva_tabla = new TablaSimbolo_1.default(arbol.getTablaGlobal());
            nueva_tabla.setNombre("RUN");
            console.log(busqueda_funcion.parametro, this.parametro);
            //para ver si busqueda_funcion.parametro tiene parametro
            if (busqueda_funcion.parametro.length != this.parametro.length) {
                return new Errores_1.default("SEMANTICO", "Parametros invalidos", this.fila, this.columna);
            }
            // declaramos los parametro
            for (let i = 0; i < busqueda_funcion.parametro.length; i++) {
                let declaracion_parametro = new Declaracion_1.default(busqueda_funcion.parametro[i].tipo, this.fila, this.columna, busqueda_funcion.parametro[i].identificador, this.parametro[i]);
                // declarando parametro de metodo
                let resultado = declaracion_parametro.interpretar(arbol, nueva_tabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
            }
            // una vez declarados los parametro, interpretamos la funcion
            let resultado_funcion = busqueda_funcion.interpretar(arbol, nueva_tabla);
            if (resultado_funcion instanceof Errores_1.default)
                return resultado_funcion;
        }
    }
}
exports.default = Run;
