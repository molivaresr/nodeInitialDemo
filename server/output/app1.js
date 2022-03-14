"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server1_1 = __importDefault(require("./models/server1"));
//Configuración DotEnv
dotenv_1.default.config();
//Iniciando server
const server = new server1_1.default();
server.listen();
//# sourceMappingURL=app1.js.map