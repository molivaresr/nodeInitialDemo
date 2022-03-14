"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//import cors from 'cors';
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.paths = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        //Definición de rutas 
        this.routes();
    }
    //Implementación Middlewares
    middlewares() {
        //this.app.use(cors());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use(this.paths.users, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port} port :D`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server1.js.map