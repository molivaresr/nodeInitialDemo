"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserModel = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    nickname: String,
    email: String,
    rooms: [new mongoose_1.Schema({
            roomName: String,
            roomId: String,
            messages: [new mongoose_1.Schema({
                    user: String,
                    message: String,
                    // date: new Date()
                })]
        })]
}));
const doc = new UserModel({});
run().catch(err => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)('mongodb://localhost:27017/itchat');
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
        yield doc.save();
        console.log(doc);
        console.log(doc.rooms[0]);
        console.log(doc.email);
        mongoose_1.default.connection.close();
    });
}
//# sourceMappingURL=mongo6.js.map