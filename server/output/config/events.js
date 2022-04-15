"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVENTS = {
    connection: "connection",
    disconnection: "disconnection",
    CLIENT: {
        CONNECTED: 'CONNECTED',
        USER: 'USER',
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_MSG: 'SEND_ROOM_MSG',
        JOIN_ROOM: 'JOIN_ROOM',
        LEFT_ROOM: 'LEFT_ROOM'
    },
    SERVER: {
        CONNECTED: 'CONNECTED',
        USER: 'USER',
        ROOMS: 'ROOMS',
        ROOM_MSG: 'ROOM_MSG',
        JOINED_ROOM: 'JOINED_ROOM',
        LEFT_ROOM: 'LEFT_ROOM'
    }
};
exports.default = EVENTS;
//# sourceMappingURL=events.js.map