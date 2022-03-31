import React from "react";

const SendMsg = ({user}) => {
    console.log(user)
    return (
    <form className='chat__textBox'>
            <input type={"text"} placeholder={`Hola a todos soy ${user}`}></input>
            <button>Enviar</button>
    </form>
    )
}

export default SendMsg;