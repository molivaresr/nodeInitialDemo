"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const events_1 = __importDefault(require("../config/events"));
const chat_1 = require("../controllers/chat");
const rooms_1 = require("../controllers/rooms");
const mongoURL = config_1.default.get('mongodb');
const mongoOpt = config_1.default.get('mongoOpt');
let list = new Array();
const users = new Array();
function socket({ io }) {
    io.on(events_1.default.connection, (socket) => {
        socket.on(events_1.default.disconnection, () => { });
    });
    io.sockets.on(events_1.default.connection, (socket) => {
        //Usuarios se conectan a socket  
        socket.on(events_1.default.CLIENT.CONNECTED, (user) => {
            try {
                let newUser = {
                    id: socket.id,
                    user: user
                };
                for (let i = 0; i < users.length; i++) {
                    if (users[i].user === user) {
                        io.to(users[i].id).emit('disconnectOldUser');
                        users.splice(i, 1);
                    }
                }
                users.push(newUser);
            }
            catch (error) {
                console.log(error);
            }
        });
        //Usuario crea una sala
        socket.on(events_1.default.CLIENT.CREATE_ROOM, (roomName) => __awaiter(this, void 0, void 0, function* () {
            let rooms = yield (0, rooms_1.createRooms)(roomName);
            io.emit(events_1.default.SERVER.CREATED_ROOM, rooms);
        }));
        //Usuario se una a una sala
        socket.on(events_1.default.CLIENT.JOIN_ROOM, (roomId, user) => __awaiter(this, void 0, void 0, function* () {
            yield (0, rooms_1.joinRoom)(roomId, user);
            socket.join(roomId);
            !list.find(e => (e.roomId === roomId) && (e.user === user)) ? list.push({ roomId: roomId, id: socket.id, user: user }) : list;
            // list.push({roomId: roomId, id: socket.id, user:user})
            // console.log(list)
            let message = {
                id: socket.id,
                user: user,
                message: 'Ha entrado'
            };
            let users = yield (0, rooms_1.readRooms)(roomId);
            io.to(roomId).emit("mensajes", message, users); // Avisa que usuario esta online
            io.to(roomId).emit('users', users);
        }));
        // Usuario sale de sala
        socket.on(events_1.default.CLIENT.LEFT_ROOM, (roomId, user) => {
            let message = {
                id: socket.id,
                user: user,
                message: `Se ha ido`
            };
            io.to(roomId).emit("mensajes", message);
            socket.leave(roomId);
        });
        //Envío de mensajes
        socket.on("mensaje", (roomId, nombre, mensaje) => __awaiter(this, void 0, void 0, function* () {
            let message = {
                user: nombre,
                message: mensaje
            };
            io.to(roomId).emit("mensajes", message);
            let msgs = yield (0, chat_1.messagesUpd)(roomId, message);
            socket.emit(events_1.default.SERVER.ROOM_MSG, msgs);
        }));
    });
}
exports.default = socket;
//# sourceMappingURL=socketsimple.js.map