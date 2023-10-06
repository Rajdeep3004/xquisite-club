import React, { useState, Suspense } from "react";
import Fallback from "../components/Resuable/Fallback";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
const LoginPage = React.lazy(() => import("./login/LoginPage"));

const Login = () => {
  const url = process.env.REACT_APP_BACK_CONNECT || "http://localhost:5000";
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({ email: "", pass: "" });
  const [msg, setMsg] = useState({ msg: "", show: false });

  const navigate = useNavigate();
  const [blur, setBlur] = useState(false);
  const [change, setChange] = useState(false);

  const changeHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    setBlur(true);
    setMsg({ ...msg, msg: "", show: false });

    axios
      .post(
        `${url}/api/user/login`,
        { email: inputData.email, pass: inputData.pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (
          res.data.message !== "Invalid password!" &&
          res.data.message !== "User not found!"
        ) {
          localStorage.setItem("isLoggedIn", "1");
          localStorage.setItem("uid", res.data._id);
          localStorage.setItem("email", res.data.email);
          dispatch(authActions.login());
          navigate("home", { replace: true });
        } else if (res.data.message === "Invalid password!") {
          setMsg({ ...msg, msg: res.data.message, show: true });
          setBlur(false);
        } else if (res.data.message === "User not found!") {
          setMsg({ ...msg, msg: res.data.message, show: true });
          setBlur(false);
        }
      })
      .catch((error) => {
        setMsg({ ...msg, msg: error, show: true });
        setBlur(false);
      });
  };

  const signupHandler = (event) => {
    event.preventDefault();
    setBlur(true);
    setMsg({ ...msg, msg: "", show: false });
    axios
      .post(
        `${url}/api/user/signUp`,
        { email: inputData.email, pass: inputData.pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data._id) {
          localStorage.setItem("isLoggedIn", "1");
          localStorage.setItem("uid", res.data._id);
          localStorage.setItem("email", res.data.email);
          dispatch(authActions.login());
          navigate("home", { replace: true });
        } else {
          setMsg({ ...msg, msg: res.data.message, show: true });
          setBlur(false);
        }
      })
      .catch((error) => {
        setMsg({ ...msg, msg: error, show: true });
        setBlur(false);
      });
  };

  return (
    <Suspense fallback={<Fallback />}>
      <LoginPage
        inputData={inputData}
        blur={blur}
        change={change}
        setChange={setChange}
        changeHandler={changeHandler}
        loginHandler={loginHandler}
        signupHandler={signupHandler}
        msg={msg}
      />
    </Suspense>
  );
};

export default Login;
