const { nanoid } = require( "nanoid");
const { Server, Socket } = require( "socket.io");
const EVENTS = require( '../config/events');

function socket({io}) {
    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if(!username) {
            return next (new Error('invalid username'));
        }
        socket.username = username;
        next();
    })
}