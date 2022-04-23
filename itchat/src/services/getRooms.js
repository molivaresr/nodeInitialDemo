import { chat } from "../config/default"

export default function getRooms (token) {
    const method = {
        method:'GET',
        mode:'cors',
        headers:{ 
        'Content-Type': 'application/json;charset=utf-8',
        'auth-token':token,
        }
    }
    return fetch(`${chat}/rooms`, method)
        .then(response => response.json())
        .then(respuesta => {
            return respuesta
        }).catch(err => console.log(err))
}