import logo from "./logo.svg";
import "./App.css";
import { Login } from "./components/Login/Login";
import { useState } from "react";
import { Message } from "./components/Message/Message";
import spinner from './logincut.gif';

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className="headertop">
        <p style={{fontSize:26, color:"#e8e5f3"}}>Let'sMeet</p>
      </div>
      {!isLoggedIn && <div>
      <div className="headergif">
        <img src={spinner} alt="Spinner" />
      </div>
      <div className="title">
        <h1 align="center"><strong>Welcome to Let'sMeet</strong></h1>
        <p align="center" >With millions of users all over the world, Let'sMeet gives you the ability to connect with people no matter where you are.</p>
      </div>
      </div>}
  
      <div>
        {!isLoggedIn ? (
          <Login
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            setLoggedIn={setLoggedIn}
          />
        ) : (
          <Message room={room} username={username} />
        )}
      </div>
    </>
  );
}

export default App;
