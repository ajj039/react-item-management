import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { users } from "../data";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userList, setUserList] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : users
  );

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUserList(JSON.parse(savedUsers));
    }
  }, []);

  // Update local storage when items change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userList));
  }, [userList]);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("users"));
    const userExist = user?.find(
      (item) => item.email === emailRef.current.value
    );
    if (userExist !== undefined) {
      toast.error("User already exists");
      return;
    }
    console.log("user", userExist);
    setUserList((prev) => {
      return [
        ...prev,
        {
          name: nameRef.current.value,
          surname: surnameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
        },
      ];
    });
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
        <input
          placeholder="Enter name"
          type="password"
          ref={nameRef}
          required
        />
        <input
          placeholder="Enter surname"
          type="password"
          ref={surnameRef}
          required
        />
        <button type="submit">create user</button>
      </form>
      <Link to="/">Already have account login here?</Link>
    </main>
  );
};

export default SignUp;
