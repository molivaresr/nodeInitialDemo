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
exports.getRooms = exports.postRooms = exports.getUSers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const users_1 = __importDefault(require("../models/users"));
const rooms_1 = __importDefault(require("../models/rooms"));
const mongoURL = config_1.default.get('mongodb');
const getUSers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(mongoURL);
    // Verificar email
    const users = yield users_1.default.find({});
    res.json({ users: users });
    mongoose_1.default.connection.close();
});
exports.getUSers = getUSers;
const postRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoom = req.body;
    yield mongoose_1.default.connect(mongoURL);
    const rooms = yield rooms_1.default.find({});
    let findRoom = yield rooms_1.default.findOne({ roomName: newRoom.room });
    if (!(findRoom === null || findRoom === void 0 ? void 0 : findRoom.roomName)) {
        const room = new rooms_1.default({
            roomName: newRoom.room,
            roomId: newRoom.id,
            messages: [],
        });
        yield room.save();
        mongoose_1.default.connection.close();
        res.json({ msg: 'Sala Creada' });
    }
    else {
        let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
        console.log(repeatedRoom);
        const room = new rooms_1.default({
            roomName: repeatedRoom,
            roomId: newRoom.id,
            messages: [],
        });
        yield room.save();
        mongoose_1.default.connection.close();
        res.json({ msg: 'Sala Creada' });
    }
});
exports.postRooms = postRooms;
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(mongoURL);
    // Verificar email
    const rooms = yield rooms_1.default.find({});
    res.json({ rooms: rooms });
    mongoose_1.default.connection.close();
});
exports.getRooms = getRooms;
//# sourceMappingURL=chat.js.map