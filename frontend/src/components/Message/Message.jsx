import React, { useEffect, useState } from "react";
import { useSocket } from "../../customHooks/useSocket";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import "./Message.css";
import { MessageList } from "./MessageList";
import { timeStampConverter } from "../../util/timeUtils";
import { useFetch } from "../../customHooks/useFetch";

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
    if (messageInput != "") {
      sendData({
        content: messageInput,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addMessageToList({
        content: messageInput,
        username: username,
        createdDateTime: new Date(),
        messageType: "CLIENT",
      });
      setMessageInput("");
    }
  };

  return (
    <div className="message_root_div">
      <div className="roomuser">
        <span className="room_name" 
              style={{paddingRight:30 , paddingLeft:14, paddingTop:4, paddingBottom:4, margin:12, borderRadius:20, borderColor:"white", fontSize:18}}>
              <span style={{fontWeight:"bold"}}> Room : </span>
              <span style={{color:"#efa985"}}>{room}</span>
        </span>
        
        <span className="user_name" 
              style={{paddingRight:30 , paddingLeft:14, paddingRight:14, paddingTop:4, paddingBottom:4, margin:12, borderRadius:20, fontSize:18}}> 
              <span style={{fontWeight:"bold"}}> Welcome : </span>
              <span style={{color:"#efa985"}}>{username}</span>
        </span>
      </div>
      
      <div className="message_component">
        <MessageList username={username} messageList={messageList} />
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
  );
};