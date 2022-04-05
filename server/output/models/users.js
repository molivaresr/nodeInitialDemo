"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});
const UserModel = (0, mongoose_1.model)('User', schema);
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
exports.default = UserModel;
//# sourceMappingURL=users.js.map