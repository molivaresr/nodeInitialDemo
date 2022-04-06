"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const events_1 = __importDefault(require("../config/events"));
let nombre;
const rooms = new Array();
const users = new Array();
function socket({ io }) {
    io.on("connection", (socket) => {
        console.log(`Usuario conectado ${socket.id}`);
        // nombre;
        //Crear salas REVISAR!
        socket.emit(events_1.default.SERVER.ROOMS, rooms);
        //Usuario crea una sala
        socket.on(events_1.default.CLIENT.CREATE_ROOM, ({ room }) => {
            console.log({ room });
            const roomId = (0, nanoid_1.nanoid)(); // Crear Id de la sala
            rooms.push({ id: roomId, name: room });
            socket.join(roomId);
            socket.broadcast.emit(events_1.default.SERVER.ROOMS, rooms);
            console.log(rooms); // Avisar a todos que hay una nueva sala
            socket.emit(events_1.default.SERVER.ROOMS, rooms); // Notifica al creador de la sala, todas las salas 
            socket.emit(events_1.default.SERVER.JOINED_ROOM, roomId); // Avisa al creador de la sala que se a unido a la sala
        });
        //Envío de mensajes
        socket.on(events_1.default.connection, (nomb) => {
            nombre = nomb;
            const userId = (0, nanoid_1.nanoid)();
            // users.push({id:userId, user: nombre, date: new Date()})
            //Reestructurar para la creación de salas
            // run().catch((err:string) => console.log(err));
            // async function run(): Promise<void> {
            //   await mongoose.connect('mongodb://localhost:27017/itchat',{
            //   });
            //   const doc = new UserModel({
            //       nickname: nombre,
            //       email: 'bill@itacademy.cat',
            //   })
            //   await doc.save();
            //   console.log(doc);
            //   mongoose.connection.close()
            // }
            console.log(users);
            //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
            socket.broadcast.emit("mensajes", {
                nombre: nombre,
                mensaje: ` ${nombre} ha entrado en la sala del chat`,
                log: console.log(`${nombre} ha entrado`),
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
                log: console.log(`${nombre} ha abandonado`),
            });
        });
    });
}
exports.default = socket;
//# sourceMappingURL=socketsimple.js.map