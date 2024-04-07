"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controlador_1 = require("../Controladores/index_controlador");
class router {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', index_controlador_1.indexController.prueba);
        /*
        this.router.post('/post', indexController.metodoPost);
        this.router.post('/analizar', indexController.Analizar);
        */
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
