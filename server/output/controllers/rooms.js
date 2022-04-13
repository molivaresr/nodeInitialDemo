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
exports.messagesUpd = exports.messagesPut = exports.createRooms = exports.getRooms = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const rooms_1 = __importDefault(require("../models/rooms"));
const mongoURL = config_1.default.get('mongodb');
const getRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURL);
        let rooms = yield rooms_1.default.find({});
        mongoose_1.default.connection.close();
        return rooms;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRooms = getRooms;
const createRooms = (roomId, roomName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURL);
        let newRoom = new rooms_1.default({
            roomName: roomName,
            roomId: roomId,
            messages: []
        });
        yield newRoom.save();
        mongoose_1.default.connection.close();
        console.log(newRoom);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRooms = createRooms;
const messagesPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, message } = req.body;
    try {
        yield mongoose_1.default.connect(mongoURL);
        yield rooms_1.default.findOne({ roomId: roomId }).updateOne({ $push: { messages: message } });
        mongoose_1.default.connection.close();
        res.json({ msg: `Mensajes actualizados` });
    }
    catch (error) {
        console.log(error);
    }
});
exports.messagesPut = messagesPut;
const messagesUpd = (roomId, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURL);
        yield rooms_1.default.findOne({ roomId: roomId }).updateOne({ $push: { messages: message } });
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.log(error);
    }
});
exports.messagesUpd = messagesUpd;
//# sourceMappingURL=rooms.js.map