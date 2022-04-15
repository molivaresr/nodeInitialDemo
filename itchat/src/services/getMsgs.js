import { chat } from "../config/default"
import getRooms from "./getRooms"

export default function getMsg (token) {
    getRooms(token)
    .then(response => {
        return response
    })
}