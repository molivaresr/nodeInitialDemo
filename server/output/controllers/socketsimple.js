"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import EVENTS from '../config/events';
let nombre;
function socket({ io }) {
    io.on("connection", (socket) => {
        console.log(`Usuario conectado ${socket.id}`);
        nombre;
        socket.on("conectado", (nomb) => {
            nombre = nomb;
            //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
            socket.broadcast.emit("mensajes", {
                nombre: nombre,
                mensaje: ` ${nombre} ha entrado en la sala del chat`,
            });
        });
        socket.on("mensaje", (nombre, mensaje) => {
            //io.emit manda el mensaje a todos los clientes conectados al chat
            console.log(`${nombre}-> ${mensaje}`);
            io.emit("mensajes", { nombre, mensaje });
        });
        socket.on("disconnect", () => {
            // console.log(socket.id)
            io.emit("mensajes", {
                servidor: "Servidor",
                mensaje: `${nombre} ha abandonado la sala`,
            });
        });
    });
}
exports.default = socket;
//# sourceMappingURL=socketsimple.js.map