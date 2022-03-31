import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
// import EVENTS from '../config/events';

let nombre: string;

// function socket({io}:{io: Server}) {
//     io.on("connection", (socket: Socket) => {
//         console.log(`Usuario conectado ${socket.id}`)
//         nombre;

//         socket.on("conectado", (nomb) => {
//         nombre = nomb;
//         //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
//         socket.broadcast.emit("mensajes", {
//             nombre: nombre,
//             mensaje: `${nombre} ha entrado en la sala del chat`,
//             });
//         });

//         socket.on("mensaje", (nombre, mensaje) => {
//         //io.emit manda el mensaje a todos los clientes conectados al chat
//         io.emit("mensajes", { nombre, mensaje });
//         });

//         socket.on("disconnect", () => {
//         io.emit("mensajes", {
//             servidor: "Servidor",
//             mensaje: `${nombre} ha abandonado la sala`,
//             });
//         });
//     });
// }

function socket ({io}:{io: Server}) {
    
    io.on("connection", (socket) => {
        console.log(`Usuario conectado ${socket.id}`)
        nombre;
      
        // socket.on("conectado", (nomb) => {
        //   nombre = nomb;
        //   //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
        //   socket.broadcast.emit("mensajes", {
        //     nombre: nombre,
        //     mensaje: ` ha entrado en la sala del chat`,
        //   });
        // });
      
        socket.on("mensaje", (nombre, mensaje) => {
          //io.emit manda el mensaje a todos los clientes conectados al chat
          io.emit("mensajes", { nombre, mensaje });
        });
      
        socket.on("disconnect", () => {
            console.log(socket.id)
          io.emit("mensajes", {
            servidor: "Servidor",
            mensaje: ` ha abandonado la sala`,
          });
        });
      });
}
export default socket;