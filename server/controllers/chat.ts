import { Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';
import UserModel from "../models/users";
import RoomModel from "../models/rooms";

const mongoURL = config.get<string>('mongodb');
export const getUSers = async (req: Request, res: Response) => {
    await mongoose.connect(mongoURL);
    // Verificar email
    const users = await UserModel.find({}) 
    res.json({users:users})
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
            messages: [],
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
            messages: [],
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

