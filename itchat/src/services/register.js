
import { api } from "../config/default"

export default function register (nickname, email, password) {
    // console.log(nickname, email, password)
    const method = {
        method:'POST',
        mode:'cors',
        headers:{ 
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({nickname, email, password})
    }
    return fetch(`${api}/auth/register`, method)
    .then(response => response.json())
    .then(respuesta => {
        let registerData = {
        msg: respuesta.msg,
        nickname: respuesta.nickname
        }
        return registerData
    }).catch(err => console.log(err))
}