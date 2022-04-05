"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomModel = (0, mongoose_1.model)('Room', new mongoose_1.Schema({
    roomName: String,
    roomId: String,
    messages: [new mongoose_1.Schema({
            user: String,
            message: String,
            // date: new Date()
        })]
}));
const doc = new RoomModel({});
//Test BD
// run().catch(err => console.log(err));
// async function run():Promise<void> {
//     await connect('mongodb://localhost:27017/itchat');
//     const doc = new RoomModel({
//             roomName: 'NodeJs',
//             roomId: '9asdasd09',
//             messages: [{
//                 user: 'Bill',
//                 message: 'Hola a todos!',
//             }]
//     });
//     await doc.save();
//     console.log(doc);
//     mongoose.connection.close()
// }
//# sourceMappingURL=rooms.js.map