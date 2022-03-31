"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const events_1 = __importDefault(require("../config/events"));
const logger_1 = __importDefault(require("../utils/logger"));
const rooms = new Array();
const users = new Array();
function socket({ io }) {
    logger_1.default.info(`Sockets Habilitados`);
    io.on(events_1.default.connection, (socket) => {
        logger_1.default.info(`Usuario Conectado ${socket.id}`);
        // socket.on(EVENTS.CLIENT.USER, ({user}) => {
        //     console.log(users)
        //     const userId = nanoid();
        //     users.push({id:userId, user: user, date: new Date()})
        //     socket.broadcast.emit(EVENTS.SERVER.USER, user)
        // })
        socket.emit(events_1.default.SERVER.ROOMS, rooms);
        //Usuario crea una sala
        socket.on(events_1.default.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log({ roomName });
            const roomId = (0, nanoid_1.nanoid)(); // Crear Id de la sala
            // rooms[roomId] = {name: roomName};
            rooms.push({ id: roomId, name: roomName });
            socket.join(roomId);
            socket.broadcast.emit(events_1.default.SERVER.ROOMS, rooms);
            console.log(rooms); // Avisar a todos que hay una nueva sala
            socket.emit(events_1.default.SERVER.ROOMS, rooms); // Notifica al creador de la sala, todas las salas 
            socket.emit(events_1.default.SERVER.JOINED_ROOM, roomId); // Avisa al creador de la sala que se a unido a la sala
        });
        //Enviar un mensaje
        socket.on(events_1.default.CLIENT.SEND_ROOM_MSG, ({ /* roomId, */ message, userName }) => {
            const date = new Date();
            socket.emit(events_1.default.SERVER.ROOM_MSG, {
                message,
                userName,
                time: `${date.getHours}:${date.getMinutes}`,
            });
            console.log('Mensaje Recibido');
        });
        //Cuando un usuario se une
        socket.on(events_1.default.CLIENT.JOIN_ROOM, (roomId) => {
            socket.join(roomId);
            console.log(`Usuario conectado a sala ${roomId}`);
            socket.emit(events_1.default.SERVER.JOINED_ROOM, roomId);
        });
    });
}
exports.default = socket;
//# sourceMappingURL=socket.js.map