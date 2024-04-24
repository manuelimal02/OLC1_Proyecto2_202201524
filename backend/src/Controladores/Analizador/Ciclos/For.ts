import { Instruccion } from "../Abstract/Instruccion";
import Errores from "../Errores/Errores";
import Arbol from "../ArbolAst/Arbol";
import Tipo, { tipo_dato } from "../ArbolAst/Tipo";
import TablaSimbolo from "../ArbolAst/TablaSimbolo";
import Break from "../Transferencia/Break";
import Continue from "../Transferencia/Continue";
import Return from "../Transferencia/Return";
import Singleton from "../ArbolAst/Singleton";

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
        arbol.agregarTabla(nueva_tabla1)

        const  resultado_inicializacion = this.declaracion.interpretar(arbol, nueva_tabla1)
        if (resultado_inicializacion instanceof Errores) return resultado_inicializacion

        let condicion = this.condicion.interpretar(arbol, nueva_tabla1)
        if (condicion instanceof Errores) return condicion

        if (this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) {
            let error = new Errores("Semántico", "Condición Debe Ser Del Tipo Booleana", this.fila, this.columna)
            arbol.agregarError(error);
            arbol.setConsola("Semántico: Condición Debe Ser Del Tipo Booleana.\n")
            return error
        }

        while (this.condicion.interpretar(arbol, nueva_tabla1)) {

            const nueva_tabla2 = new TablaSimbolo(nueva_tabla1)
            nueva_tabla2.setNombre("For")
            arbol.agregarTabla(nueva_tabla2)

            for (let ins of this.bloque) {
                if(ins instanceof Break) return ins
                if(ins instanceof Continue) return ins
                if(ins instanceof Return) return ins
                if(ins instanceof Errores) return ins
            
                let resultado = ins.interpretar(arbol, nueva_tabla2)
            
                if(resultado instanceof Break) return resultado
                if(resultado instanceof Continue) return resultado
                if(resultado instanceof Return) return resultado
                if(resultado instanceof Errores) return resultado
            }
            const  resultado_actualizacion = this.actualizacion.interpretar(arbol, nueva_tabla1)
            if (resultado_actualizacion instanceof Errores) return resultado_actualizacion
        }
        
    }
    obtener_ast(anterior: string): string {
        let contador = Singleton.getInstancia();
        let dot = "";
        let lista_instrucciones = [];
        let raiz = `n${contador.getContador()}`;
        let instruccion_for = `n${contador.getContador()}`;
        let parentesis_izquierdo = `n${contador.getContador()}`;
        let declaracion = `n${contador.getContador()}`;
        let condicion_for = `n${contador.getContador()}`;
        let actualizacion = `n${contador.getContador()}`;
        let parentesis_derecho = `n${contador.getContador()}`;
        let llave_izquierda = `n${contador.getContador()}`;
        let instrucciones_raiz = `n${contador.getContador()}`;
        for(let i = 0; i < this.bloque.length; i++){
            lista_instrucciones.push(`n${contador.getContador()}`);
        }
        let llave_derecha = `n${contador.getContador()}`;
        dot += `${raiz}[label="CICLO FOR"];\n`;
        dot += `${instruccion_for}[label="CICLO"];\n`;
        dot += `${parentesis_izquierdo}[label="("];\n`;
        dot += `${declaracion}[label="EXPRESION"];\n`;
        dot += `${condicion_for}[label="CONDICION"];\n`; 
        dot += `${actualizacion}[label="EXPRESION"];\n`;
        dot += `${parentesis_derecho}[label=")"];\n`;
        dot += `${llave_izquierda}[label="{"];\n`;
        dot += `${instrucciones_raiz}[label="INSTRUCCIONES"];\n`;
        for(let i = 0; i < lista_instrucciones.length; i++){
            dot += ` ${lista_instrucciones[i]}[label="INSTRUCCION"];\n`;
        }
        dot += `${llave_derecha}[label="}"];\n`;
        dot += `${anterior} -> ${raiz};\n`;
        dot += `${raiz} -> ${instruccion_for};\n`;
        dot += `${raiz} -> ${parentesis_izquierdo};\n`;
        dot += `${raiz} -> ${declaracion};\n`;
        dot += `${raiz} -> ${condicion_for};\n`;
        dot += `${raiz} -> ${actualizacion};\n`;
        dot += `${raiz} -> ${parentesis_derecho};\n`;
        dot += `${raiz} -> ${llave_izquierda};\n`;
        dot += `${raiz} -> ${instrucciones_raiz};\n`;
        for(let i = 0; i < lista_instrucciones.length; i++){
            dot += `${instrucciones_raiz} -> ${lista_instrucciones[i]};\n`;
        }
        dot += `${raiz} -> ${llave_derecha};\n`;
        dot += this.declaracion.obtener_ast(declaracion);
        dot += this.condicion.obtener_ast(condicion_for);
        dot += this.actualizacion.obtener_ast(actualizacion);
        for(let i = 0; i < lista_instrucciones.length; i++){
            dot += this.bloque[i].obtener_ast(lista_instrucciones[i]);
        }
        return dot;
    }
    
}