"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//import cors from 'cors';
const route_1 = __importDefault(require("../routes/route"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.http = require('http').Server(this.app);
        this.io = require("socket.io")(this.http);
        //Definición de rutas 
        this.routes();
    }
    //Implementación Middlewares
    middlewares() {
        //this.app.use(cors());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    sockets() {
        this.io.on("connection", function (socket) {
            console.log("A user connected");
        });
    }
    routes() {
        this.app.use(this.apiPaths.users, route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port} port :D`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map