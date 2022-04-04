import mongoose from "mongoose";
import {Schema, Types, model, Model, connect} from "mongoose";

interface Messages {
    _id: Types.ObjectId;
    user: string;
    message: string;
}

interface Rooms {
    _id: Types.ObjectId;
    roomName: String;
    roomId: String;
    messages: Messages[]
}

type RoomDocumentProps = { 
    messages: Types.DocumentArray<Messages>
}

type RoomModelType = Model<Rooms, {}, RoomDocumentProps>;

const RoomModel = model<Rooms, RoomModelType>('Room', new Schema<Rooms, RoomModelType>({
    roomName: String, 
    roomId: String,
    messages: [new Schema<Messages>({
        user: String,
        message: String,
        // date: new Date()
    })]
}))

const doc = new RoomModel({});

run().catch(err => console.log(err));

async function run():Promise<void> {
    await connect('mongodb://localhost:27017/itchat');

    const doc = new RoomModel({
            roomName: 'NodeJs',
            roomId: '9asdasd09',
            messages: [{
                user: 'Bill',
                message: 'Hola a todos!',
            }]
    });
    await doc.save();

    console.log(doc);
    mongoose.connection.close()
}