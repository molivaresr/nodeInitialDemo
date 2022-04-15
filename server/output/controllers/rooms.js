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
exports.messagesUpd = exports.putMessages = exports.createRooms = exports.readRooms = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const rooms_1 = __importDefault(require("../models/rooms"));
const mongoURL = config_1.default.get('mongodb');
const mongoOpt = config_1.default.get('mongoOpt');
const readRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURL, mongoOpt);
        let rooms = yield rooms_1.default.find({});
        // mongoose.connect(mongoURL, mongoOpt);;
        return rooms;
    }
    catch (error) {
        console.log(error);
    }
});
exports.readRooms = readRooms;
const createRooms = (roomId, roomName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURL, mongoOpt);
        const rooms = yield rooms_1.default.find({});
        const findRoom = yield rooms_1.default.findOne({ roomName: roomName });
        if (!(findRoom === null || findRoom === void 0 ? void 0 : findRoom.roomName)) {
            const room = new rooms_1.default({
                roomName: roomName,
                roomId: roomId,
                messages: {},
            });
            yield room.save();
            // mongoose.connect(mongoURL, mongoOpt);
        }
        else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            const room = new rooms_1.default({
                roomName: repeatedRoom,
                roomId: roomId,
                messages: {},
            });
            yield room.save();
            // mongoose.connect(mongoURL, mongoOpt);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRooms = createRooms;
const putMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, message } = req.body;
    try {
        yield mongoose_1.default.connect(mongoURL, mongoOpt);
        yield rooms_1.default.findOne({ roomId: roomId }).updateOne({ $push: { messages: message } });
        let updatedMsgs = yield rooms_1.default.findOne({ roomId: roomId });
        // mongoose.connect(mongoURL, mongoOpt);; 
        res.json({
            msg: `Mensajes actualizados`,
            room: updatedMsgs
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Petición erronéa',
            type: 'No se pudo guardar los mensajes'
        });
    }
});
exports.putMessages = putMessages;
const messagesUpd = (roomId, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURL, mongoOpt);
        yield rooms_1.default.findOne({ roomId: roomId }).updateOne({ $push: { messages: message } });
        // mongoose.connect(mongoURL, mongoOpt);; 
    }
    catch (error) {
        console.log(error);
    }
});
exports.messagesUpd = messagesUpd;
//# sourceMappingURL=rooms.js.map