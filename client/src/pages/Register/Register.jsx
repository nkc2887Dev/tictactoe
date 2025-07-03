import React, { useState } from "react";
import "./register.css";
import image from "../../assets/images/game1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { registerApi } from "../../store/Access/access";
import { NavLink, Route, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerApi({
      "fullName": fullname,
      "userName": username,
      "email": email,
      "password": password,
      "confPassword": confirmpassword
    }))
    return navigate("/lobby");
    
  };
  return (
    <>
      <div className="page-content">
        <div className="form-v2-content">
          <div className="form-left">
            <img src={image} alt="form" />
            <div className="text-1">
              <p>
                Tic-Tac-Toe<span>Game</span>
              </p>
            </div>
            <div className="text-2">
              <p>
                <span>Play</span>
              </p>
            </div>
          </div>
          <form className="form-detail" action="#" method="post" id="myform">
            <h2>Registration Form</h2>
            <div className="form-row">
              <label htmlFor="full-name">Full Name:</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                className="input-text"
                placeholder="ex: Lindsey Wilson"
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="full-name">username:</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                className="input-text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="your_email">Your Email:</label>
              <input
                type="text"
                name="your_email"
                id="your_email"
                className="input-text"
                required
                pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-text"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="comfirm-password">Confirm Password:</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="input-text"
                required
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
            {/* <div className="form-checkbox">
              <label className="container">
                <p>
                  By signing up, you agree to the{" "}
                  <a href="#" className="text">
                    Play Term of Service
                  </a>
                </p>
                <input type="checkbox" name="agree" id="agree" />
                <span className="checkmark"></span>
              </label>
            </div> */}
            <div className="form-row-last">
              <input
                type="submit"
                name="register"
                className="register"
                value="Register"
                onClick={(e) => registerFormSubmit(e)}
              />
            </div>

            
          <div className="register-page-link">
            <p>
              If have acccount{" "}
              <span>
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </NavLink>
              </span>
              {` here...`}
            </p>
          </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
