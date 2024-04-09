"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class Controller {
    prueba(req, res) {
        res.json({ "funciona": "la api" });
    }
    interpretar(req, res) {
        try {
            const parser = require('./Analizador/LexicoSintactico');
            const arbol = parser.parse(req.body.entrada);
            console.log("-------------------");
            arbol.imprimirNodos();
            console.log("-------------------");
            res.send({ "Respuesta": "Interpretado" });
        }
        catch (err) {
            console.log(err);
            res.send({ "Error": "Error al interpretar" });
        }
    }
}
exports.indexController = new Controller();
