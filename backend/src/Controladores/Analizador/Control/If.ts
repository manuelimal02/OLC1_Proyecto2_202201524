import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";


export default class Else extends Instruccion {
    private condicion: Instruccion
    private bloque_1: Instruccion[]
    private bloque_2: Instruccion[]


    constructor(condicion: Instruccion, bloque_if: Instruccion[], bloque_else:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.bloque_1 = bloque_if
        this.bloque_2 = bloque_else
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if (condicion instanceof Errores) return condicion

        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            let error = new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n")
            return error
        }

        let nueva_tabla = new tablaSimbolo(tabla)
        nueva_tabla.setNombre("IF")
        arbol.agregarTabla(nueva_tabla)

        if (condicion) {
            for (let ins of this.bloque_1) {
                if (ins instanceof Break) return ins;
                if(ins instanceof Continue) return ins;
                let resultado = ins.interpretar(arbol, nueva_tabla)
                if (resultado instanceof Break) return resultado;
                if (resultado instanceof Continue) return resultado;
            }
        }else{
            if(this.bloque_2){
                for (let ins of this.bloque_2) {
                    if (ins instanceof Break) return ins;
                    if(ins instanceof Continue) return ins;
                    let resultado = ins.interpretar(arbol, nueva_tabla)
                    if (resultado instanceof Break) return resultado;
                    if (resultado instanceof Continue) return resultado;
                }
            }
            
        }
    }
}