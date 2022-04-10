import {Schema, model} from 'mongoose';

interface User {
    nickname: string;
    email: string;
    password: string,
    passport: string,
    token: string,
    state: boolean;
    google: boolean;
}

const schema = new Schema<User>({
    nickname: {
        type: String,
        required: true
    },
    email :{
        type: String,
        unique: true,
        required: true
    },    
    password :{
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    state:{
        type: Boolean,
        default: true
    },
    google :{
        type: Boolean,
        default: false
    },
});

const UserModel = model<User>('User', schema);

//Test BD
// run().catch((err:string) => console.log(err));

// async function run(): Promise<void> {
//     await connect('mongodb://localhost:27017/itchat');

//     const doc = new UserModel({
//         nickname: 'Bill',
//         email: 'bill@itacademy.cat'
//     })

//     await doc.save();

//     console.log(doc.email);
//     mongoose.connection.close()
// }

export default UserModel;