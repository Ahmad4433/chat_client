import React, { useState } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import httpAction from "../../store/httpaction";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.loading);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const nameChange = (event) => {
    setName(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      url: "https://chat-server-psi-lovat.vercel.app/user/register",
      body: { name, email, password },
      method: "POST",
    };
    const result = await dispatch(httpAction(data));
    if (result?.status) {
      navigate("/login");
    }
  };

  return (
    <div className="login_main">
      <form onSubmit={submitHandler}>
        <div className="form_container">
          <input
            type="text"
            placeholder="name"
            required
            onChange={nameChange}
            value={name}
            y
          />
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
          <button type="submit">Register</button>
        </div>

        <div className="h_bar"></div>
        <Link to="/login" className="signup_link">
          Already Have An Account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
