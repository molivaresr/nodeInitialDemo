import mongoose, {Schema, model, connect} from 'mongoose';

interface User {
    nickname: String;
    email: String;
}

const schema = new Schema<User>({
    nickname: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },    
});

const UserModel = model<User>('User', schema);
run().catch((err:string) => console.log(err));

async function run(): Promise<void> {
    await connect('mongodb://localhost:27017/itchat');

    const doc = new UserModel({
        nickname: 'Bill',
        email: 'bill@itacademy.cat'
    })

    await doc.save();

    console.log(doc.email);
    mongoose.connection.close()
}

export default UserModel;