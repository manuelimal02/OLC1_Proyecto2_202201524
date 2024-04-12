"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_ruta_1 = __importDefault(require("./Rutas/index_ruta"));
class servidor {
    constructor() {
        this.aplicacion = (0, express_1.default)();
        this.configuracion();
        this.rutas();
    }
    configuracion() {
        this.aplicacion.set('port', process.env.PORT || 4000);
        this.aplicacion.use((0, morgan_1.default)('dev'));
        this.aplicacion.use(express_1.default.urlencoded({ extended: false }));
        this.aplicacion.use(express_1.default.json());
        this.aplicacion.use(express_1.default.json({ limit: '50mb' }));
        this.aplicacion.use(express_1.default.urlencoded({ limit: '50mb' }));
        this.aplicacion.use((0, cors_1.default)());
        this.aplicacion.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    rutas() {
        this.aplicacion.use('/', index_ruta_1.default);
    }
    start() {
        this.aplicacion.listen(this.aplicacion.get('port'), () => {
            console.log('Server on port:', this.aplicacion.get('port'));
        });
    }
}
exports.server = new servidor();
exports.server.start();
