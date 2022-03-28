"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("config"));
const socket_1 = __importDefault(require("./controllers/socket"));
const logger_1 = __importDefault(require("./utils/logger"));
const package_json_1 = require("./package.json");
const port = config_1.default.get('port');
const host = config_1.default.get('host');
const corsOrigin = config_1.default.get('corsOrigin');
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    },
});
app.get('/', (req, res) => {
    res.send(`Server is up and running version 2`);
});
httpServer.listen(port, host, () => {
    logger_1.default.info(`🚀 Chat Server version: ${package_json_1.version} is listening 🚀 `);
    logger_1.default.info(`http://${host}:${port}`);
    (0, socket_1.default)({ io });
});
//# sourceMappingURL=app.js.map