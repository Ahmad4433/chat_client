import React, { useEffect } from "react";
import "./chat.css";
import httpAction from "../../store/httpaction";
import { useDispatch, useSelector } from "react-redux";
import SearchUser from "./SearchUser";
import Users from "./Users";
import { chatActions } from "../../store/chat-slice";
import Message from "./Message";

const Chat = () => {
  const token = localStorage.getItem("acc_token");
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const sender = useSelector((state) => state.chat.sender);
  const dispatch = useDispatch();
  const getUsers = async () => {
    const data = {
      url: "http://localhost:4545/chat/user/list",
      method: "GET",
      token: token,
    };

    const result = await dispatch(httpAction(data));
    if (result?.status) {
      dispatch(chatActions.setUsers(result?.list));
      dispatch(chatActions.setFilteredUsers(result?.list));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="chat_main">
      <div className="chat_container">
        <div className="user_list">
          <SearchUser />
          <Users />
        </div>
        <div className={selectedUser ? "chat_message_show" : "chat_message"}>
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Chat;
