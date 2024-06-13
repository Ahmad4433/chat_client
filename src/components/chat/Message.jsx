import React, { useEffect, useState } from "react";
import "./message.css";
import { IoMdSend } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { chatActions } from "../../store/chat-slice";
import { messageActions } from "../../store/message-slice";
const Message = () => {
  const [online, setOnline] = useState(null);
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.chat.selectedUser);
  const sender = useSelector((state) => state.chat.sender);
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);
  const dispatch = useDispatch();
  const removeUserHandler = () => {
    dispatch(chatActions.setSelected(null));
    dispatch(messageActions.setConversion([]));
  };

  const messageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendHandler = () => {
    if (socket) {
      socket.emit("message", {
        senderId: sender,
        receiverId: user?._id,
        message: message,
      });
    }
    setChat((pevChat) => [...pevChat, message]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("online", (status) => {
      setOnline(status);
    });

    socket.on("live", (live) => {
      setChat((prevChate) => [...prevChate, live]);
    });
    socket.on("confirm", (msg) => {
      setChat((prevChate) => [...prevChate, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on("conversion", (chat) => {
      if (chat) {
        setChat(chat[0]?.message);
      }
    });
  }, [user]);

  return (
    <div className="message_main">
      <div className="user_chat_selected">
        <IoArrowBack onClick={removeUserHandler} className="chat_back_icon" />
        <div className="user_status_bar">
          <span className="user_status_name">{user?.name}</span>
          <span className="user_status">{online ? "Online" : "Offline"}</span>
        </div>
      </div>
      <div className="messages">
        <div className="messages_container">
          {chat?.length > 0 ? (
            chat.map((item, index) => {
              return (
                <span
                  className={item?.senderId === sender ? "sender" : "receiver"}
                  key={index}
                >
                  {item?.message}
                </span>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="message_controll">
        <input
          onChange={messageChange}
          className="message_input"
          type="text"
          value={message}
          placeholder="type here..."
        />
        <IoMdSend onClick={sendHandler} className="message_send_icon" />
      </div>
    </div>
  );
};

export default Message;
