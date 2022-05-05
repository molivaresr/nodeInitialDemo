import mongoose from "mongoose";

import config from 'config';

import RoomModel from "../models/rooms";

const mongoURL = config.get<string>('mongodb'); 
const mongoOpt = config.get<object>('mongoOpt');

export const readRooms = async () => {
    try {
        await mongoose.connect(mongoURL, mongoOpt);
        let rooms = await RoomModel.find({});
        return rooms
    }
    catch (error) {
        console.log(error)
    }
} 

export const createRooms = async (roomName: string) => {
    try 
    {    
        await mongoose.connect(mongoURL, mongoOpt);
        const rooms = await RoomModel.find({})
        const findRoom = await RoomModel.findOne({roomName: roomName})
        
        if(!findRoom?.roomName) {
            const room = new RoomModel({
                roomName: roomName,
                messages: {},
            });
            await room.save();
            let newRooms = await RoomModel.find({})
            return newRooms

        } else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            const room = new RoomModel({
                roomName: repeatedRoom, 
                messages: {},
            });
            await room.save();
            
            let newRooms = await RoomModel.find({})
            return newRooms
        }
    }
    catch (error) {console.log(error)}
}

export const joinRoom= async (roomId:string, user:string) => {
    try {      
        await mongoose.connect(mongoURL, mongoOpt);
        let findRoom = await RoomModel.findOne({_id: roomId})
        let findUser = findRoom?.users.find(e => e.user === user)
        
        if(!findUser) {
            await RoomModel.findOne({_id: roomId}).updateOne({$push: {users: {user: user, state:true}}})
        }
        else  { 
            return 
        }
      } 
    catch (error) {
        console.log(error)
    }
}

export const leaveRoom = async (roomId:string, user:string) => {
    try {      
        await mongoose.connect(mongoURL, mongoOpt);
        let findRoom = await RoomModel.findOne({_id: roomId})
        let findUser = findRoom?.users.filter(e => e.user !== user)
        
        if(findUser) {
            console.log(findUser)
        }
        else  { 
           return
        }
      } 
    catch (error) {
        console.log(error)
    }
}

export const getUsers = async (roomId: string) => {
    await mongoose.connect(mongoURL, mongoOpt);
        let findRoom = await RoomModel.findOne({_id: roomId})
        let users = findRoom?.users
        return users
}