import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import EVENTS from '../config/events';
import {joinRoom, messagesUpd}from '../controllers/chat';
import {createRooms, readRooms} from '../controllers/rooms';


// const rooms : Array<{id: string, name: string}> = new Array();
const users : Array<{id: string, user:string}> = new Array();

function socket ({io}:{io: Server}) {
    io.on(EVENTS.connection, (socket) => {
      socket.on(EVENTS.disconnection,() => {})
    })

    io.sockets.on(EVENTS.connection, (socket) => {
      let nombre: string;
      //Usuarios se conectan a socket  
      socket.on(EVENTS.CLIENT.CONNECTED, (nick:string) => {
        try {
          let loadUser = {
            id: socket.id,
            user: nick
          }
          users.push(loadUser)
          console.log(`User:${loadUser.user} - Id: ${loadUser.id}`)
          console.log(users)
          }
          catch(error) {
            console.log(error)
          } 
          // console.log(users)
         })
         
      //Usuario crea una sala
      socket.on(EVENTS.CLIENT.CREATE_ROOM, (roomName:string) => {
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, roomName)
        const roomId = nanoid();  // Crear Id de la sala
        createRooms(roomId, roomName)
      });

      //Usuario se una a una sala
      socket.on(EVENTS.CLIENT.JOIN_ROOM,  (roomId:string, user:string)=>{ 
        socket.join(roomId)
        console.log(`User ${user} conectado a la sala ${roomId}`)
        console.log(socket.rooms)     
        joinRoom(roomId, user)
        io.to(roomId).emit(user)
      });

      //Envío de mensajes
      socket.on(EVENTS.CLIENT.CONNECTED, (roomId: string, nick:string) => {
        nombre = nick;
        let message = {
          user: nombre,
          message: ` ${nombre} ha entrado`
        }
        // console.log(`${nombre} ha entrado`),
        //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
        io.to(roomId).emit("mensajes", message);
        });
      
      socket.on("mensaje", (roomId:string, nombre:string, mensaje:string) => {
        let message = {
          user: nombre,
          message: mensaje
        }
        //io.emit manda el mensaje a todos los clientes conectados al chat
        console.log(`${roomId}: ${nombre} -> ${mensaje}`)
        io.to(roomId).emit("mensajes", message);
        messagesUpd(roomId, message)

      });
      
      socket.on("disconnect", (roomId: string, nick:string) => {
        nombre = nick;
        let message = {
          user: nombre,
          message: ` ${nombre} ha salido`
        }
        console.log(`${nombre} ha salido`),
        //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
        io.to(roomId).emit("mensajes", message);
        });
    });
}
export default socket;