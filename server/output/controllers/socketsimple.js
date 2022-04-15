"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const events_1 = __importDefault(require("../config/events"));
const chat_1 = require("../controllers/chat");
const rooms_1 = require("../controllers/rooms");
// const rooms : Array<{id: string, name: string}> = new Array();
const users = new Array();
function socket({ io }) {
    io.on(events_1.default.connection, (socket) => {
        socket.on(events_1.default.disconnection, () => { });
    });
    io.sockets.on(events_1.default.connection, (socket) => {
        let nombre;
        //Usuarios se conectan a socket  
        socket.on(events_1.default.CLIENT.CONNECTED, (nick) => {
            try {
                let loadUser = {
                    id: socket.id,
                    user: nick
                };
                users.push(loadUser);
                console.log(`User conectado ${nick} - ${socket.id}`);
            }
            catch (error) {
                console.log(error);
            }
            // console.log(users)
        });
        //Usuario crea una sala
        socket.on(events_1.default.CLIENT.CREATE_ROOM, (roomName) => {
            const roomId = (0, nanoid_1.nanoid)(); // Crear Id de la sala
            (0, rooms_1.createRooms)(roomId, roomName);
        });
        //Usuario se una a una sala
        socket.on(events_1.default.CLIENT.JOIN_ROOM, (roomId, user) => {
            //   let rooms 
            //   readRooms().then(response => {
            //     rooms = response?.map((e) => e.roomId);
            //     console.log(rooms)
            //     return rooms
            // }).catch(error => console.log(error));
            socket.join(roomId);
            console.log(`User ${user} conectado a la sala ${roomId}`);
            console.log(socket.rooms);
            io.to(roomId).emit(`User ${user} conectado a la sala`);
        });
        //Envío de mensajes
        socket.on(events_1.default.CLIENT.CONNECTED, (roomId, nick) => {
            nombre = nick;
            let message = {
                user: nombre,
                message: ` ${nombre} ha entrado`
            };
            console.log(`${nombre} ha entrado`),
                //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
                io.to(roomId).emit("mensajes", message);
        });
        socket.on("mensaje", (roomId, nombre, mensaje) => {
            let message = {
                user: nombre,
                message: mensaje
            };
            //io.emit manda el mensaje a todos los clientes conectados al chat
            console.log(`${roomId}: ${nombre} -> ${mensaje}`);
            io.to(roomId).emit("mensajes", message);
            (0, chat_1.messagesUpd)(roomId, message);
        });
        socket.on("disconnect", (roomId, nick) => {
            nombre = nick;
            let message = {
                user: nombre,
                message: ` ${nombre} ha salido`
            };
            console.log(`${nombre} ha salido`),
                //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
                io.to(roomId).emit("mensajes", message);
        });
    });
}
exports.default = socket;
//# sourceMappingURL=socketsimple.js.map