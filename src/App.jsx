import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Chat from "./components/chat/Chat";
import Super from "./components/auth/Super";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "./store/socket-slice";

const App = () => {
  const userId = useSelector((state) => state.chat.sender);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("https://chat-server-psi-lovat.vercel.app", {
      query: {
        userId,
      },
    });

    if (socket) {
      dispatch(socketActions.setConnection(socket));
    }
  },[]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Super />}>
        <Route path="/" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default App;
