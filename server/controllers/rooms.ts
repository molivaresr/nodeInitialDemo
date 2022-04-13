import mongoose from "mongoose";
import {Request, Response} from 'express';

import config from 'config';

import RoomModel from "../models/rooms";


const mongoURL = config.get<string>('mongodb'); 

export const getRooms = async () => {
    try {
        await mongoose.connect(mongoURL);
        let rooms = await RoomModel.find({});
        mongoose.connection.close();
        return rooms 
    }
    catch (error) {console.log(error)}
} 

export const createRooms = async (roomId: string, roomName: string) => {
    try { 
        await mongoose.connect(mongoURL);
        let newRoom = new RoomModel({
            roomName: roomName,
            roomId: roomId,
            messages:[]  
        })
        await newRoom.save();
        mongoose.connection.close(); 
        console.log(newRoom)
    } 
    catch (error) {console.log(error)}
}


export const messagesPut = async (req: Request, res: Response) => {
    const { roomId, message} = req.body;
    try {      
        await mongoose.connect(mongoURL);

        await RoomModel.findOne({roomId: roomId }).updateOne({$push: {messages: message}});
        
        mongoose.connection.close(); 
        res.json({msg:`Mensajes actualizados`})
    } 
    catch (error) {console.log(error)}
}

export const messagesUpd= async (roomId:string, message: object) => {
    try {      
        await mongoose.connect(mongoURL);
        await RoomModel.findOne({roomId: roomId }).updateOne({$push: {messages: message}}); 
        mongoose.connection.close(); 
    } 
    catch (error) {console.log(error)}
}

