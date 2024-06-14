import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import httpAction from "../../store/httpaction";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.ui.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      url: "https://chat-server-psi-lovat.vercel.app/user/login",
      method: "POST",
      body: { email: email, password: password },
    };
    const result = await dispatch(httpAction(data));
    if (result?.status) {
      dispatch(authActions.setAuth(true));
      localStorage.setItem("acc_token", result?.access_token);
      navigate("/");
    }
  };

  return (
    <div className="login_main">
      <form onSubmit={submitHandler}>
        <div className="form_container">
          <input
            onChange={emailChange}
            value={email}
            type="text"
            placeholder="email"
            required
          />
          <input
            onChange={passwordChange}
            value={password}
            type="password"
            placeholder="pasword"
            required
          />
          <button disabled={isLoading} type="submit">
            Login
          </button>
        </div>

        <div className="h_bar"></div>
        <Link to="/register" className="signup_link">
          Don't Have An Account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
