import {Schema, Types, model, Model} from "mongoose";

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

export default RoomModel;