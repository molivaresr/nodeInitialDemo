

import config from 'config';

import { Server, Socket } from "socket.io";

import EVENTS from '../config/events';
import { messagesUpd}from '../controllers/chat';
import {createRooms} from '../controllers/rooms';


const mongoURL = config.get<string>('mongodb');
const mongoOpt = config.get<object>('mongoOpt');

// const rooms : Array<{id: string, name: string}> = new Array();

let list = new Array()
const users : Array<{id: string, user:string}> = new Array();
// const userList : Array<{roomId: string, users: Array<{id: string, user: string}>}> = new Array()

function socket ({io}:{io: Server}) {
    io.on(EVENTS.connection, (socket) => {
      socket.on(EVENTS.disconnection,() => {})
    })

    io.sockets.on(EVENTS.connection, (socket) => {

      //Usuarios se conectan a socket  
      socket.on(EVENTS.CLIENT.CONNECTED, (user:string) => {
        try {
              let newUser = {
                  id: socket.id,
                  user: user
              }
          
              for (let i = 0; i < users.length; i++) {
                  if (users[i].user === user) {
                      io.to(users[i].id).emit('disconnectOldUser');
                      users.splice(i, 1)
                  }
              }
              users.push(newUser) 
              // console.log(users)
      } catch (error) { console.log(error); }
    })
    
               
      //Usuario crea una sala
      socket.on(EVENTS.CLIENT.CREATE_ROOM, async (roomName:string) => {
        let rooms = await createRooms(roomName);
        console.log(rooms)
        io.emit(EVENTS.SERVER.CREATED_ROOM, rooms)
      });

      //Usuario se una a una sala
      socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId:string, user:string)=>{
   
        socket.join(roomId)
 
        !list.find(e => (e.roomId === roomId) && (e.user === user))? list.push({roomId: roomId, id: socket.id, user:user}) : list;
        // list.push({roomId: roomId, id: socket.id, user:user})
        console.log(list)

        let message = {
          id: socket.id,
          user: user,
          message: 'Ha entrado'
        }

        io.to(roomId).emit("mensajes", message); // Avisa que usuario esta online
        io.to(roomId).emit('users', list)
        
      });
      // Usuario sale de sala
      socket.on(EVENTS.CLIENT.LEFT_ROOM, (roomId: string, user:string) => { // Avisa que el usuario ha salido
        let message = {
          id: socket.id,
          user: user,
          message: `Se ha ido`
        }
        io.to(roomId).emit("mensajes", message);
        // const filtered = list.filter(e => (e.roomId !== roomId && e.user !== user))
        // io.to(roomId).emit('users', filtered)
        socket.leave(roomId)
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
 
      
    });
}
export default socket;