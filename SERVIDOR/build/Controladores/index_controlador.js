"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class controller {
    prueba(req, res) {
        res.json({ message: 'Hola mundo prueba' });
    }
}
exports.indexController = new controller();
