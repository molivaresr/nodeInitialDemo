import { chat } from "../config/default"
import getRooms from "./getRooms"

const getMsgs = (token, roomId) => {
    console.log('Getting Msgs')
      getRooms(token)
      .then(response => {
        let rooms = response.rooms
        let roomNow = rooms.find(m => m._id === roomId)
        let msg = roomNow.messages
        let name = roomNow.roomName
        let respuesta = {title: name, msgs: msg}
        return respuesta
      })
      .catch(error => console.log(error))
}

export default getMsgs