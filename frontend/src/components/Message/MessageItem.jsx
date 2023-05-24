import React, { useState } from "react";
import { timeStampConverter } from "../../util/timeUtils";
import "./Message.css";
import { playfairDecrypt } from "../../util/encryptUtil";

export const MessageItem = ({ message, username }) => {
  const type = message.messageType.toLowerCase();
  const self = message.username == username ? "_self" : "";
  const time = timeStampConverter(message.createdDateTime);

  return (
    <div className={"message_item_" + type + self}>
      {type != "server" && self == "" && (
        <span className="message_item_username">{message.username}</span>
      )}
      <div className={"message_content_" + type + self}>
        <span className="message_content_value"
        style={{fontSize:18}}>{playfairDecrypt(message.content)}</span>
        <span style={{fontSize:14}}>{time}</span>
      </div>
    </div>
  );
};