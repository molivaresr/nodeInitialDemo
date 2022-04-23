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
const events_1 = __importDefault(require("../config/events"));
const chat_1 = require("../controllers/chat");
const rooms_1 = require("../controllers/rooms");
// const rooms : Array<{id: string, name: string}> = new Array();
const users = new Array();
const roomUsers = new Array();
function socket({ io }) {
    // io.on(EVENTS.connection, (socket) => {
    //   socket.on(EVENTS.disconnection,() => {})
    // })
    io.sockets.on(events_1.default.connection, (socket) => {
        //Usuarios se conectan a socket  
        socket.on(events_1.default.CLIENT.CONNECTED, (user) => {
            let newUser = { id: socket.id, user: user };
            let verify = users.find(e => e.user === user);
            // console.log(verify)
            if (!verify) {
                users.push(newUser);
                // return users
            }
            else {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].user === user) {
                        io.to(users[i].id).emit('disconnectOldUser');
                        users.splice(i, 1);
                    }
                }
            }
        });
        //Usuario crea una sala
        socket.on(events_1.default.CLIENT.CREATE_ROOM, (roomName) => __awaiter(this, void 0, void 0, function* () {
            let rooms = yield (0, rooms_1.createRooms)(roomName);
            socket.broadcast.emit(events_1.default.SERVER.CREATED_ROOM, rooms);
        }));
        //Usuario se una a una sala
        socket.on(events_1.default.CLIENT.JOIN_ROOM, (roomId, user) => __awaiter(this, void 0, void 0, function* () {
            let userToList = {
                id: socket.id,
                user: user
            };
            socket.join(roomId);
            let message = {
                user: user,
                message: 'Online'
            };
            io.to(roomId).emit("mensajes", message); // Avisa que usuario esta online
            io.to(roomId).emit('users', userToList);
            yield (0, chat_1.joinRoom)(roomId, user);
        }));
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
        // socket.on(EVENTS.CLIENT.LEFT_ROOM, (roomId: string, user:string) => { // Avisa que el usuario ha salido
        //   let message = {
        //     user: user,
        //     message: `${user} Offline`
        //   }
        //   console.log(`${user} ha salido`),
        //   //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
        //   socket.broadcast.emit("mensajes", message);
        //   });
    });
}
exports.default = socket;
//# sourceMappingURL=socketsimple.js.map