import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import Simbolo from "../ArbolAst/Simbolo";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from '../ArbolAst/Tipo'
import Singleton from "../ArbolAst/Singleton";

export default class Declaracion extends Instruccion {
    private identificador: string[]
    private valor: Instruccion

    constructor(tipo: Tipo, fila: number, columna: number, id: string[], valor: Instruccion) {
        super(tipo, fila, columna)
        this.identificador = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor_variable;
        this.identificador.forEach((elemento) => {
            if(this.valor === null){
                valor_variable = this.valor_defecto(this.tipo_dato)
            }else{
                valor_variable = this.valor.interpretar(arbol, tabla)
                if (valor_variable instanceof Errores) return valor_variable
                if ((valor_variable  == true || valor_variable  == false) && this.tipo_dato.getTipo() == tipo_dato.ENTERO) {
                    valor_variable = valor_variable == true ? 1 : 0;
                }else if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                    let error = new Errores("Semántico", "Error Al Declarar Variable.", this.fila, this.columna)
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Error Al Declarar Variable Los Tipos no coinciden.\n")
                    return error
                }
            }
            if (this.tipo_dato.getTipo() == tipo_dato.ENTERO) {
                if (parseInt(valor_variable) < -2147483648 || parseInt(valor_variable) > 2147483647) {
                    let error = new Errores("Semántico", "Variable Int Fuera De Rango.", this.fila, this.columna);
                    arbol.agregarError(error);
                    arbol.setConsola("Semántico: Variable Int Fuera De Rango.\n")
                    return error
                }
            }
            if (!tabla.setVariable(new Simbolo(this.tipo_dato, elemento, this.fila, this.columna, valor_variable))){
                let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                arbol.agregarError(error);
                arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                return error
            }
        });
    }

    private valor_defecto(tipo: Tipo): any {
        switch (tipo.getTipo()) {
            case tipo_dato.ENTERO:
                return 0
            case tipo_dato.DECIMAL:
                return 0
            case tipo_dato.BOOLEANO:
                return true
            case tipo_dato.CARACTER:
                return ''
            case tipo_dato.CADENA:
                return ""
            default:
                return null
        }
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = "";
        let declaracion = `n${contador.getContador()}`;
        let tipo_id = `n${contador.getContador()}`;
        let id = `n${contador.getContador()}`;
        let lista_id = [];
        for(let i= 0; i < this.identificador.length; i++){
            lista_id.push(`n${contador.getContador()}`);
        }
        let igual = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let punto_coma = `n${contador.getContador()}`;
    
        dot += `${declaracion}[label="DECLARACION" color = \"#00cb95\"];\n`
        if(this.tipo_dato.getTipo() == tipo_dato.ENTERO){
            dot += `${tipo_id}[label="ENTERO" color = \"#00cb95\"];\n`
        }else if(this.tipo_dato.getTipo() == tipo_dato.DECIMAL){
            dot += `${tipo_id}[label="DOBLE" color = \"#00cb95\"];\n`
        }else if(this.tipo_dato.getTipo() == tipo_dato.BOOLEANO){
            dot += `${tipo_id}[label="BOOLEANO" color = \"#00cb95\"];\n`
        }else if(this.tipo_dato.getTipo() == tipo_dato.CADENA){
            dot += `${tipo_id}[label="CADENA" color = \"#00cb95\"];\n`
        }else if(this.tipo_dato.getTipo() == tipo_dato.CARACTER){
            dot += `${tipo_id}[label="CARACTER" color = \"#00cb95\"];\n`
        }
        dot += `${id}[label="ID" color = \"#00cb95\"];\n`
        for(let i= 0; i < this.identificador.length; i++){
            dot += `${lista_id[i]} [label = "${this.identificador[i]}" color = \"#00cb95\"];\n`
        }
        dot += `${anterior} -> ${declaracion};\n`
        dot += `${declaracion} -> ${id};\n`
        dot += `${declaracion} -> ${tipo_id};\n`
        for(let i= 0; i < this.identificador.length; i++){
            dot += `${id} -> ${lista_id[i]};\n`
        }
        if (this.valor != null) {
            dot += `${igual}[label="=" color = \"#00cb95\"];\n`
            dot += `${valor}[label="EXPRESION" color = \"#00cb95\"];\n`
            dot += `${declaracion} -> ${igual};\n`
            dot += `${declaracion} -> ${valor};\n`
            dot += this.valor.obtener_ast(valor);
        }
        dot += `${punto_coma}[label=";" color = \"#00cb95\"];\n`
        dot += `${declaracion} -> ${punto_coma};\n`
        return dot;
    }
    
}