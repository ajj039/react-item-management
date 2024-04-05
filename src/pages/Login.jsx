import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const userExist = users?.find(
      (item) => item.email === emailRef.current.value
    );
    console.log("userexist", userExist, passwordRef.current.value);
    if (userExist === undefined) {
      toast.error("User does not exist");
      return;
    }
    if (userExist?.password !== passwordRef.current.value) {
      toast.error("invalid password");
      return;
    }
    navigate("/items");
    localStorage.setItem("currentuser", emailRef.current.value);
    localStorage.setItem("isloggedin", true);
  };
  return (
    <main
      className="login-container"
      style={{
        gap: "2rem",
      }}
    >
      <form onSubmit={onHandleSubmit}>
        <input placeholder="Enter email" ref={emailRef} required />
        <input
          placeholder="Enter password"
          type="password"
          ref={passwordRef}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have any account signup here?</Link>
    </main>
  );
};

export default Login;
