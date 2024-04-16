import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";

export default class For extends Instruccion {
    private declaracion: Instruccion
    private condicion: Instruccion
    private actualizacion: Instruccion
    private bloque: Instruccion[]

    constructor(declaracion: Instruccion, condicion: Instruccion, actualizacion: Instruccion, bloque:Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.actualizacion = actualizacion
        this.bloque = bloque
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        const nueva_tabla1 = new TablaSimbolo(tabla)
        nueva_tabla1.setNombre("CondicionesFor")

        const  resultado_inicializacion = this.declaracion.interpretar(arbol, nueva_tabla1)
        if (resultado_inicializacion instanceof Errores) return resultado_inicializacion

        let condicion = this.condicion.interpretar(arbol, nueva_tabla1)
        if (condicion instanceof Errores) return condicion

        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            return new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
        }

        while (this.condicion.interpretar(arbol, nueva_tabla1)) {

            const nueva_tabla2 = new TablaSimbolo(nueva_tabla1)
            nueva_tabla2.setNombre("For")

            for (let ins of this.bloque) {
                if (ins instanceof Break) return;
                if (ins instanceof Continue) break;
            
                let resultado = ins.interpretar(arbol, nueva_tabla2)
            
                if (resultado instanceof Break) return;
                if (resultado instanceof Continue) break;
            }
            const  resultado_actualizacion = this.actualizacion.interpretar(arbol, nueva_tabla1)
            if (resultado_actualizacion instanceof Errores) return resultado_actualizacion
        }
        
    }
}