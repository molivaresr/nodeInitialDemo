import React from "react";
import { useEffect } from "react";
import { socket } from "../context/SocketContext";
import EVENTS from "../config/events";

import SplitPane from "./Split";
import Feed from "./Feed";
import Room from "./Rooms";
import Users from "./Users";

const Chat = () => {
    const userdata = {
        nickname:window.localStorage.getItem('nickname'),
        token: window.localStorage.getItem('jwt'),
        roomNow: window.localStorage.getItem('RoomNow')
    }

    useEffect(() => { 
        socket.emit(EVENTS.CLIENT.CONNECTED, userdata.nickname);
    },[userdata.nickname])
    
    return (
        <>
 
        <SplitPane 
            left={<Room jwt={userdata.token}/>}
            middle={<Feed user={userdata.nickname} roomId={userdata.roomNow} jwt={userdata.token}  />}
            right={<Users user={userdata.nickname} roomId={userdata.roomNow}/>} 
        />

        </>
    )
}

export default Chat;