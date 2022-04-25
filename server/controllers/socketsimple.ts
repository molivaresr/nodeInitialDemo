import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import { resolveProjectReferencePath } from "typescript";
import EVENTS from '../config/events';
import {joinRoom, messagesUpd}from '../controllers/chat';
import {createRooms, readRooms} from '../controllers/rooms';


// const rooms : Array<{id: string, name: string}> = new Array();
let arr = new Array;
const uList = new Array;
const users : Array<{id: string, user:string}> = new Array();
const userList : Array<{roomId: string, users: Array<{id: string, user: string}>}> = new Array()

function socket ({io}:{io: Server}) {
    io.on(EVENTS.connection, (socket) => {
      socket.on(EVENTS.disconnection,() => {})
    })

    io.sockets.on(EVENTS.connection, (socket) => {

      //Usuarios se conectan a socket  
      socket.on(EVENTS.CLIENT.CONNECTED, (user:string) => {
        let newUser = {id: socket.id, user: user}
        let verify = users.find(e => e.user === user)
        // console.log(verify)

        if(!verify) {
          users.push(newUser)
          // return users
        }  
        else {
          for ( let i = 0; i < users.length; i ++) {
            if(users[i].user === user) {
              io.to(users[i].id).emit('disconnectOldUser');
              users.splice(i,1)
            }
          }
        }
      })
         
      //Usuario crea una sala
      socket.on(EVENTS.CLIENT.CREATE_ROOM, async (roomName:string) => {
        let rooms = await createRooms(roomName);
        socket.broadcast.emit(EVENTS.SERVER.CREATED_ROOM, rooms)
      });

      //Usuario se una a una sala
      socket.on(EVENTS.CLIENT.JOIN_ROOM, async (roomId:string, user:string)=>{
        socket.join(roomId) 
        let users = {
          id: socket.id,
          user: user,
        }   
        let message = {
          id: socket.id,
          user: user,
          message: 'Online'
        }

        io.to(roomId).emit("mensajes", message); // Avisa que usuario esta online
        io.to(roomId).emit('users', users)
        await joinRoom(roomId, user)
      });

      //Envío de mensajes
       
      socket.on("mensaje", async (roomId:string, nombre:string, mensaje:string) => { //Envia Mensaje a la sala
        let message = {
          user: nombre,
          message: mensaje
        }  
        io.to(roomId).emit("mensajes", message);
        let msgs = await messagesUpd(roomId, message);
        socket.emit(EVENTS.SERVER.ROOM_MSG, msgs)
      });
 
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
export default socket;