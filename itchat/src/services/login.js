import { api } from "../config/default"

export default function login (email, password) {
    // console.log(email, password)
    const method = {
        method:'POST',
        mode:'cors',
        headers:{ 
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({email, password})
    }
    return fetch(`${api}/auth/login`, method)
    .then(response => response.json())
    .then(respuesta => {
        let sessionData = {
            nickname : respuesta.user.nickname,
            token: respuesta.token
        }
        return sessionData
    }).catch(err => console.log(err))
}