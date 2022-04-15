    
import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import EVENTS from '../config/events';
import logger from "../utils/logger";

const rooms : Array<{id: string, name: string}> = new Array();
const users : Array<{id: string, user:string, date:Date}> = new Array();

function socket({io}:{io: Server}) {
    logger.info(`Sockets Habilitados`);
    
    io.on(EVENTS.connection, (socket: Socket) =>{
        
        logger.info(`Usuario Conectado ${socket.id}`);

        // socket.on(EVENTS.CLIENT.USER, ({user}) => {
        //     console.log(users)
        //     const userId = nanoid();
        //     users.push({id:userId, user: user, date: new Date()})
        //     socket.broadcast.emit(EVENTS.SERVER.USER, user)
        // })
        
        socket.emit(EVENTS.SERVER.ROOMS, rooms);      
        //Usuario crea una sala
        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) => {
            console.log({roomName})
            
            const roomId = nanoid();  // Crear Id de la sala
            
            // rooms[roomId] = {name: roomName};
            rooms.push({id:roomId, name:roomName})
            
            socket.join(roomId);
            
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            console.log(rooms) // Avisar a todos que hay una nueva sala
            socket.emit(EVENTS.SERVER.ROOMS, rooms); // Notifica al creador de la sala, todas las salas 
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId); // Avisa al creador de la sala que se a unido a la sala
        });

        //Enviar un mensaje

        socket.on(
            EVENTS.CLIENT.SEND_MSG,
            ({/* roomId, */ message, userName}) => { 
                const date = new Date();

            socket.emit(EVENTS.SERVER.ROOM_MSG,{
                    message, 
                    userName, 
                    time: `${date.getHours}:${date.getMinutes}`, 
                });
                console.log('Mensaje Recibido')
            }
        );

        //Cuando un usuario se une
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
            socket.join(roomId);
            console.log(`Usuario conectado a sala ${roomId}`)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        }); 

   
    });
}

export default socket;
