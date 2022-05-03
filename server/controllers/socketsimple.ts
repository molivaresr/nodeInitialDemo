

import config from 'config';

import { Server, Socket } from "socket.io";

import EVENTS from '../config/events';
import { messagesUpd}from '../controllers/chat';
import {createRooms, joinRoom, readRooms, getUsers, leaveRoom} from '../controllers/rooms';


const mongoURL = config.get<string>('mongodb');
const mongoOpt = config.get<object>('mongoOpt');

let list = new Array()
const users : Array<{id: string, user:string}> = new Array();

function socket ({io}:{io: Server}) {
    io.on(EVENTS.connection, (socket) => {
      socket.on(EVENTS.disconnection,() => {})
    })

    io.sockets.on(EVENTS.connection, (socket) => {

      //Usuarios se conectan a socket  
      socket.on(EVENTS.CLIENT.CONNECTED, async (user:string) => {
        let rooms = await readRooms();
        io.emit(EVENTS.SERVER.JOINED_ROOM, rooms)
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
    
          } catch (error) { console.log(error); }
      })
    
               
      //Usuario crea una sala
      socket.on(EVENTS.CLIENT.CREATE_ROOM, async (roomName:string) => {
  
        let rooms = await createRooms(roomName);
      
        io.emit(EVENTS.SERVER.CREATED_ROOM, rooms) 
      });

      //Usuario se una a una sala
      socket.on(EVENTS.CLIENT.JOIN_ROOM, async (roomId:string, user:string)=>{
        console.log('entra', roomId, user)
        await joinRoom(roomId, user)
        socket.join(roomId)
        
        !list.find(e => (e.roomId === roomId) && (e.user === user))? list.push({roomId: roomId, id: socket.id, user:user}) : list;
        
        let message = {
          id: socket.id,
          user: user,
          message: 'Ha entrado'
        }
        let usuarios = await getUsers(roomId)
        console.log(usuarios)
        io.to(roomId).emit("mensajes", message); // Avisa que usuario esta online
 
        
      });
      // Usuario sale de sala
      socket.on(EVENTS.CLIENT.LEFT_ROOM, async (roomId: string, user:string) => { // Avisa que el usuario ha salido
        await leaveRoom(roomId, user)
        console.log('Sale',user, roomId)
        let message = {
          id: socket.id,
          user: user,
          message: `Se ha ido`
        }
        io.to(roomId).emit("mensajes", message);

        socket.leave(roomId)
      });
      //Envío de mensajes
      socket.on("mensaje", async (roomId:string, nombre:string, mensaje:string) => { //Envia Mensaje a la sala
        let message = {
          user: nombre,
          message: mensaje
        }  
        await messagesUpd(roomId, message);

        console.log(message, roomId)
     
        io.to(roomId).emit("mensajes", message);
      });
 
      
    });
}
export default socket;