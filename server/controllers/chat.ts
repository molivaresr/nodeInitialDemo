import { Request, Response} from "express";
import mongoose from "mongoose";
import config from 'config';
import UserModel from "../models/users";
import RoomModel from "../models/rooms";

const mongoURL = config.get<string>('mongodb');
const mongoOpt = config.get<object>('mongoOpt');

export const getUsers = async (req: Request, res: Response) => {
    // console.log('Get Users')
    try
    {   
        await mongoose.connect(mongoURL, mongoOpt);
        const users = await UserModel.find({}) 
        // mongoose.connection.close()
        res.json({
            msg:'Usuarios encontrados',
            users:users
        })
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Usuarios no encontrados'
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    try
    {  
        await mongoose.connect(mongoURL, mongoOpt);
        // Verificar email
        const user = await UserModel.find({}) 
        res.json({users:user})
        // mongoose.connection.close()
    }   catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Usuario no creado'
        })
    }
}

export const postRooms = async (req: Request, res: Response) => {
    const newRoom = req.body
    try 
    {    
        await mongoose.connect(mongoURL, mongoOpt);
        const rooms = await RoomModel.find({})
        let findRoom = await RoomModel.findOne({roomName: newRoom.room})
        
        if(!findRoom?.roomName) {
            const room = new RoomModel({
                roomName: newRoom.room,
                roomId: newRoom.id,
                messages: {},
            });
            await room.save();
            // // mongoose.connection.close()
            res.json({  
                msg:'Sala Creada',
                rooms: rooms
            });
        } else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            console.log(repeatedRoom)

            const room = new RoomModel({
                roomName: repeatedRoom, 
                roomId: newRoom.id,
                messages: {},
            });
            await room.save();
            // // mongoose.connection.close()
            res.json({  
                msg:'Sala Creada',
                rooms: rooms
            });
        }
    }   catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Salas no encontradas y/o no existen'
        })
    }
}

export const getRooms = async (req: Request, res: Response) => {
    // console.log('Get Rooms')
    try 
    {
        await mongoose.connect(mongoURL, mongoOpt);
        const rooms = await RoomModel.find({}) 
        // mongoose.connection.close()
        res.json({
            msg: 'Salas encontradas',
            rooms:rooms
        })

    }   catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Salas no encontradas'
        })
    }
}

export const joinRoom= async (roomId:string, user:string) => {
    console.log('Function JoinRoom', roomId, user)
    try {      
        await mongoose.connect(mongoURL, mongoOpt);
        let findUser = await RoomModel.findOne({users:{user}})
        if(findUser || !user) {
           return
        } else  { 
            await RoomModel.findOne({roomId:roomId}).updateOne({$push: {users: {user}}})
        }
        // // mongoose.connection.close(); 
    } 
    catch (error) {
        console.log(error)
    }
}

export const messagesUpd= async (roomId:string, message: object) => {
    try {      
        await mongoose.connect(mongoURL, mongoOpt);
        await RoomModel.findOne({_id: roomId }).updateOne({$push: {messages: message}}); 
        const msgs = await RoomModel.findById(roomId,'messages');
        // // mongoose.connection.close(); 
        return msgs
    }   
    catch (error) {
        console.log(error)
    }
}