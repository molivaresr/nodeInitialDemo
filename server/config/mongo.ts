import mongoose, {Schema, Types, model, Model, connect} from "mongoose";

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

interface User {
    nickname: string,
    email: string,
    rooms: Rooms[]
}

type UserDocumentProps = {
    rooms: Types.DocumentArray<Rooms>
}

type RoomDocumentProps = { 
    messages: Types.DocumentArray<Messages>
}

type UserModelType = Model<User,{}, UserDocumentProps, RoomDocumentProps>;

const UserModel = model<User, UserModelType>('User', new Schema<User, UserModelType>({
    nickname: String,
    email: String,
    rooms: [new Schema<Rooms>({
        roomName: String, 
        roomId: String,
        messages: [new Schema<Messages>({
            user: String,
            message: String,
            // date: new Date()
        })]
    })]
}))


const doc = new UserModel({});

run().catch(err => console.log(err));

async function run():Promise<void> {
    await connect('mongodb://localhost:27017/itchat');

    const doc = new UserModel({
        nickname: 'Bill',
        email: 'bill@itacademy.com',
        rooms: [{
            roomName: 'NodeJs',
            roomId: '9asdasd09',
            messages: [{
                user: 'Bill',
                message: 'Hola a todos! prueba 10',
                // date: new Date()
            }]
        
        }]

    });
    await doc.save();
    console.log(doc)
    console.log(doc.rooms[0])
    console.log(doc.email);
    mongoose.connection.close()
}