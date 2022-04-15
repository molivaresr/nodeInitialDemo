import mongoose from "mongoose";
import {Request, Response} from 'express';

import config from 'config';

import RoomModel from "../models/rooms";

const mongoURL = config.get<string>('mongodb'); 
const mongoOpt = config.get<object>('mongoOpt');

export const readRooms = async () => {

    try {
        await mongoose.connect(mongoURL, mongoOpt);
        let rooms = await RoomModel.find({});
        // mongoose.connect(mongoURL, mongoOpt);;
       return rooms
    }
    catch (error) {
        console.log(error)
    }
} 

export const createRooms = async (roomId: string, roomName: string) => {
    try 
    {    
        await mongoose.connect(mongoURL, mongoOpt);
        const rooms = await RoomModel.find({})
        const findRoom = await RoomModel.findOne({roomName: roomName})
        
        if(!findRoom?.roomName) {
            const room = new RoomModel({
                roomName: roomName,
                roomId: roomId,
                messages: {},
            });
            await room.save();
            // mongoose.connect(mongoURL, mongoOpt);

        } else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            const room = new RoomModel({
                roomName: repeatedRoom, 
                roomId: roomId,
                messages: {},
            });
            await room.save();
            // mongoose.connect(mongoURL, mongoOpt);

        }
    }
    catch (error) {console.log(error)}
}

export const putMessages = async (req: Request, res: Response) => {
    const { roomId, message} = req.body;
    try {      
        await mongoose.connect(mongoURL, mongoOpt);
        await RoomModel.findOne({roomId: roomId }).updateOne({$push: {messages: message}});
        let updatedMsgs = await RoomModel.findOne({roomId: roomId })
        // mongoose.connect(mongoURL, mongoOpt);; 
        res.json({
            msg:`Mensajes actualizados`,
            room: updatedMsgs
        })
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'No se pudo guardar los mensajes'
        })
    }
}

export const messagesUpd= async (roomId:string, message: object) => {
    try {      
        await mongoose.connect(mongoURL, mongoOpt);
        await RoomModel.findOne({roomId: roomId }).updateOne({$push: {messages: message}}); 
        // mongoose.connect(mongoURL, mongoOpt);; 
    } 
    catch (error) {console.log(error)}
}

