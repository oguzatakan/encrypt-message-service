
import "./App.css";
import { Login } from "./components/Login/Login";
import { useState } from "react";
import { Message } from "./components/Message/Message";
import spinner from './logincut.gif';
import logo1 from './log2.png';

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className="headertop">
        <img src={logo1} className="logo1" style={{width:70, justifyContent: 'center'}}/>
      </div>
      {!isLoggedIn && <div>
      <div className="headergif">
        <img src={spinner} alt="Spinner" />
      </div>
      <div className="title">
        <h1 align="center" style={{marginBottom:14}}><strong>Welcome to Let'sMeet</strong></h1>
        <p align="center" style={{marginBottom:14}}>With millions of users all over the world, Let'sMeet gives you the ability to connect with people no matter where you are.</p>
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
