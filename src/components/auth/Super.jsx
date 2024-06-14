import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import httpAction from "../../store/httpaction";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { chatActions } from "../../store/chat-slice";

const Super = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.auth);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("acc_token");

  useEffect(() => {
    const getVerify = async () => {
      const data = {
        url: "http://localhost:4545/auth/verify",
        method: "POST",
        body: { token: token },
      };
      setLoading(true);
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        dispatch(chatActions.setSender(result?.user));
        dispatch(authActions.setAuth(true));
      }
      setLoading(false);
    };

    getVerify();
  }, []);

  if (loading) {
    return <div className="spinner" >Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default Super;
