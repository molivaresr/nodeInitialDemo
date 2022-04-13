import { Request, Response} from "express";
import mongoose from "mongoose";
import config from 'config';
import UserModel from "../models/users";
import RoomModel from "../models/rooms";

const mongoURL = config.get<string>('mongodb');

export const getUsers = async (req: Request, res: Response) => {
    await mongoose.connect(mongoURL);
  
    const users = await UserModel.find({}) 
    res.json({users:users})
    mongoose.connection.close()
}

export const getUser = async (req: Request, res: Response) => {

    await mongoose.connect(mongoURL);
    // Verificar email
    const user = await UserModel.find({}) 
    res.json({users:user})
    mongoose.connection.close()
}

export const postRooms = async (req: Request, res: Response) => {

    const newRoom = req.body
    await mongoose.connect(mongoURL);
    const rooms = await RoomModel.find({})
    let findRoom = await RoomModel.findOne({roomName: newRoom.room})
    
    if(!findRoom?.roomName) {
        const room = new RoomModel({
            roomName: newRoom.room,
            roomId: newRoom.id,
            messages: {},
        });
        await room.save();
        mongoose.connection.close()
        res.json({msg:'Sala Creada'});
    } else {
        let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
        console.log(repeatedRoom)

        const room = new RoomModel({
            roomName: repeatedRoom, 
            roomId: newRoom.id,
            messages: {},
        });
        await room.save();
        mongoose.connection.close()
        res.json({msg:'Sala Creada'});
    }
}

export const getRooms = async (req: Request, res: Response) => {
    await mongoose.connect(mongoURL);
    // Verificar email
    const rooms = await RoomModel.find({}) 
    res.json({rooms:rooms})
    mongoose.connection.close()
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