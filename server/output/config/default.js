"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    corsOrigin: "*",
    port: 4000,
    host: "localhost",
    mongodb: 'mongodb://localhost:27017/itchat',
    mongoOpt: {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4 // Use IPv4, skip trying IPv6'
    },
    password: '123456789',
    PRIVATEKEY: 'SECRETO',
};
//# sourceMappingURL=default.js.map