import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import tablaSimbolo from "../ArbolAst/TablaSimbolo";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";

export default class DoWhile extends Instruccion {
    private condicion: Instruccion
    private bloque: Instruccion[]

    constructor(condicion: Instruccion, bloque:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.condicion = condicion
        this.bloque = bloque
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
        nueva_tabla.setNombre("DoWhile")
        arbol.agregarTabla(nueva_tabla)

        do {
            for (let ins of this.bloque) {
                if (ins instanceof Break) return;
                if (ins instanceof Continue) break;
            
                let resultado = ins.interpretar(arbol, nueva_tabla)
            
                if (resultado instanceof Break) return;
                if (resultado instanceof Continue) break;
            }
        } while (this.condicion.interpretar(arbol, tabla));
    }
}