import React, { useEffect, useState } from "react";
import { useSocket } from "../../customHooks/useSocket";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import "./Message.css";
import { MessageList } from "./MessageList";
import { useFetch } from "../../customHooks/useFetch";
import { playfairDecrypt, playfairEncrypt } from "../../util/encryptUtil";
import {ImLock, ImUnlocked} from "react-icons/im";

export const Message = ({ room, username }) => {
  const { isConnected, socketResponse, sendData } = useSocket(room, username);
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { responseData, error, loading } = useFetch("/message/" + room);

  const addMessageToList = (val) => {
    if (val.room == "") return;
    setMessageList([...messageList, val]);
  };

  useEffect(() => {
    if (responseData != undefined) {
      setMessageList([...responseData, ...messageList]);
    }
  }, [responseData]);

  useEffect(() => {
    console.log("Socket Response: ", socketResponse);
    addMessageToList(socketResponse);
  }, [socketResponse]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput !== "") {

      sendData({
        content: messageInput,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addMessageToList({
        content: playfairEncrypt(messageInput),
        username: username,
        createdDateTime: new Date(),
        messageType: "CLIENT",
      });
      setMessageInput("");
    }
  };

  /* Set the width of the sidebar to 250px (show it) */
  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  return (
    <div className="message_root_div">
      <div className="roomuser" style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{padding:8}}>
          <span className="room_name" 
                style={{paddingRight:30 , paddingLeft:14, paddingTop:4, paddingBottom:4, borderRadius:20, borderColor:"white", fontSize:12, marginRight:12, marginLeft:8}}>
                <span style={{fontWeight:"bold"}}> Room : </span>
                <span style={{color:"#efa985"}}>{room}</span>
          </span>
          
          <span className="user_name" 
                style={{paddingLeft:14, paddingRight:14, paddingTop:4, paddingBottom:4, borderRadius:20, fontSize:12}}> 
                <span style={{fontWeight:"bold"}}> Welcome : </span>
                <span style={{color:"#efa985"}}>{username}</span>
          </span>
        </div>
        <div className="playfairandslide">
          <button class="playfairBtn" onclick="playfairBtn()" startIcon={<ImLock/>}
            style={{margin:6, padding:9, borderRadius:20, borderColor:"#3cc6b7" ,background:"#3cc6b7",color:"white"}}><ImLock/><ImUnlocked></ImUnlocked>&#0000;</button>
          <div id="mySidepanel" class="sidepanel">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="#">SETTINGS</a>
            <a href="#">LOG OUT</a>
          </div>
        <button class="openbtn" onclick="openNav()">&#9776;</button> 
        </div>
      </div>
      
      
      <div className="message_component">
        <MessageList username={username} messageList={messageList} />
        <div className="message_input_comp">
          <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit">
              {messageInput == "" ? (
                <RiSendPlaneLine color="white" size={25} />
              ) : (
                <RiSendPlaneFill color="white" size={25} />
              )}
            </button>
          </form>
        </div>
      </div>
      
      <div className="garbage">
        <p style={{color:"#5c4f82", opacity:0, fontSize:20}}>g</p>

      </div>
    </div>
  );
};
