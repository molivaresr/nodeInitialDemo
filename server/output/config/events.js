"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVENTS = {
    connection: "connection",
    disconnection: "disconnection",
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_ROOM_MSG: 'SEND_ROOM_MSG',
        JOIN_ROOM: 'JOIN_ROOM',
        LEFT_ROOM: 'LEFT_ROOM'
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOINED_ROOM',
        ROOM_MSG: 'ROOM_MSG',
        LEFT_ROOM: 'LEFT_ROOM'
    }
};
exports.default = EVENTS;
//# sourceMappingURL=events.js.map