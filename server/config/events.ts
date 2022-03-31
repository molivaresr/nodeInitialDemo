const EVENTS = {
    connection: "connection",
    disconnection: "disconnection",
    CLIENT:{
        CONNECTED: 'CONNECTED',
        USER:'USER',
        CREATE_ROOM:'CREATE_ROOM',
        SEND_ROOM_MSG:'SEND_ROOM_MSG',
        JOIN_ROOM:'JOIN_ROOM',
        LEFT_ROOM:'LEFT_ROOM'
    },
    SERVER:{
        USER:'USER',
        ROOMS:'ROOMS',
        JOINED_ROOM:'JOINED_ROOM',
        ROOM_MSG: 'ROOM_MSG',
        LEFT_ROOM:'LEFT_ROOM'
    }

};

export default EVENTS