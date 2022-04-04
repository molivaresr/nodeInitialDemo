"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const RoomModel = (0, mongoose_2.model)('Room', new mongoose_2.Schema({
    roomName: String,
    roomId: String,
    messages: [new mongoose_2.Schema({
            user: String,
            message: String,
            // date: new Date()
        })]
}));
const doc = new RoomModel({});
run().catch(err => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_2.connect)('mongodb://localhost:27017/itchat');
        const doc = new RoomModel({
            roomName: 'NodeJs',
            roomId: '9asdasd09',
            messages: [{
                    user: 'Bill',
                    message: 'Hola a todos!',
                }]
        });
        yield doc.save();
        console.log(doc);
        mongoose_1.default.connection.close();
    });
}
//# sourceMappingURL=rooms.js.map