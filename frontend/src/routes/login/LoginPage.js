import React from "react";

const LoginPage = (props) => {
  return (
    <div className="login-div">
      <form>
        <label htmlFor="email" className="login-label mr-40">
          Email
        </label>
        <br />
        <input
          id="email"
          type="email"
          className="login-input"
          name="email"
          value={props.inputData.email}
          onChange={props.changeHandler}
        />
        <br />
        <label htmlFor="pass" className="login-label mr-28">
          Password
        </label>
        <br />

        <input
          id="pass"
          type="password"
          className="login-input"
          name="pass"
          value={props.inputData.pass}
          onChange={props.changeHandler}
        />

        <div className="text-center">
          <button
            disabled={props.blur}
            onClick={props.change ? props.signupHandler : props.loginHandler}
            className={`login-btn ${props.blur ? "opacity-25" : null}`}
          >
            {props.change ? "Sign Up" : "Login"}
          </button>
          <br />
          <button
            onClick={(event) => {
              event.preventDefault();
              props.setChange((pv) => !pv);
            }}
            className=" text-sm md:text-2xl mt-2 hover:scale-110 duration-300"
          >
            {props.change ? "Login with existing account" : "Create an account"}
          </button>
          {props.msg.show && <p className="text-xs">{props.msg.msg}</p>}
        </div>
      </form>
      <p className="text-[10px] mt-4">*dummy- test@email.com,12345678</p>
      <p className="text-[10px] mt-4">*login/sign up may get slow due to free hosting plan</p>
    </div>
  );
};

export default LoginPage;
