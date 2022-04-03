import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import EVENTS from '../config/events';

let nombre: string;
const rooms : Array<{id: string, name: string}> = new Array();


function socket ({io}:{io: Server}) {
    
    io.on("connection", (socket) => {
        console.log(`Usuario conectado ${socket.id}`)
        // nombre;

        //Crear salas
        socket.emit(EVENTS.SERVER.ROOMS, rooms);      
        //Usuario crea una sala
        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({room}) => {
            console.log({room})
            
            const roomId = nanoid();  // Crear Id de la sala
            
            // rooms[roomId] = {name: room};
            rooms.push({id:roomId, name:room})
            
            socket.join(roomId);
            
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            console.log(rooms) // Avisar a todos que hay una nueva sala
            socket.emit(EVENTS.SERVER.ROOMS, rooms); // Notifica al creador de la sala, todas las salas 
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId); // Avisa al creador de la sala que se a unido a la sala
        });

      
        //Envío de mensajes
        socket.on(EVENTS.connection, (nomb) => {
          nombre = nomb;
          //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
          socket.broadcast.emit("mensajes", {
            nombre: nombre,
            mensaje: ` ${nombre} ha entrado en la sala del chat`,
            log: console.log(`${nombre} ha entrado`),
          });
        });
      
        socket.on("mensaje", (nombre, mensaje) => {
          //io.emit manda el mensaje a todos los clientes conectados al chat
          console.log(`${nombre}-> ${mensaje}`)
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
export default socket;