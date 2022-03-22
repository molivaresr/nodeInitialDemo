import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, {useRef, useState, useEffect} from 'react';

import Chat from '../containers/Chat';
import Rooms from '../containers/Rooms';
import Users from '../containers/Users';
import { useSockets } from '../context/socket.context';


export default function Home () {

  const { socket, userName, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleSetUsername() {
    const value = usernameRef?.current?.value;
    if (!value) {
      return;
    }
    setUsername(value);

    localStorage.setItem("username", value);
  }

  // useEffect(() => {
  //   if (usernameRef)
  //     usernameRef.current.value = localStorage.getItem("username") || "";
  // }, []);

  return (
    <div>
      {!userName && (
        <div >
          <div>
            <input placeholder="Username" ref={usernameRef} />
            <button className="cta" onClick={handleSetUsername}>
              START
            </button>
          </div>
        </div>
      )}
      {userName && (
        <div>
          <Rooms />
          <Chat />
          <Users />
        </div>
      )}
    </div>
  );
}