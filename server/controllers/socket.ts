    
import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";

import EVENTS from '../config/events';
import logger from "../utils/logger";

const rooms : Array<{id: string, name: string}> = new Array();
// const rooms : Record< string, {name: string}> = {};

function socket({io}:{io: Server}) {
    logger.info(`Sockets Habilitados`);

    io.on(EVENTS.connection, (socket: Socket) =>{
        let usuario :string;
        logger.info(`Usuario Conectado ${socket.id}`);
        
        socket.on(EVENTS.connection, (name : string) => {
            usuario = name;
            socket.broadcast.emit ('mensajes', {
                nombre: usuario,
                mensaje: `${usuario} ha entrado a la sala de chat`
            });
        });

        
        socket.emit(EVENTS.SERVER.ROOMS);      

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
            EVENTS.CLIENT.SEND_ROOM_MSG,
            ({roomId, message, userName}) => { 
                const date = new Date();

                socket.to(roomId).emit(EVENTS.SERVER.ROOM_MSG),
                    {
                        message, 
                        userName, 
                        time: `${date.getHours}:${date.getMinutes}`}
        });

        //Cuando un usuario se une
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
            socket.join(roomId);

            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        }); 

        //Usuario se desconecta
        socket.on(EVENTS.disconnection, () => { 
            logger.info(`User disconnected ${socket.id}`)
            socket.emit(EVENTS.SERVER.LEFT_ROOM);
        })

    });
}

export default socket;
