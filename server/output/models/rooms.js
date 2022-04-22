"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomModel = (0, mongoose_1.model)('Room', new mongoose_1.Schema({
    roomName: String,
    messages: [new mongoose_1.Schema({
            user: String,
            message: String,
        })],
    users: [new mongoose_1.Schema({
            user: String
        })]
}));
exports.default = RoomModel;
//# sourceMappingURL=rooms.js.map