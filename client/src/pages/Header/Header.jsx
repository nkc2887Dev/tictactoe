import React, { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { disableUserIsRejoin, userData } from "../../store/Access/access";
import { sendEvent, connectSocket } from "../../store/socket/socket";
import { disableIsRejoin } from "../../store/gameManager/gameManagerSlice";
import Cookies from "js-cookie";

function Header() {
  const dispatch = useDispatch();
  const userinfo = useSelector(userData);
  const isRejoin = useSelector((state) => state.gameManager.isRejoin);

  const isDisabledNavbar = useSelector(
    (state) => state.gameManager.isDisabledNavbar
  );
  const tableState = useSelector((state) => state.gameManager.tableState);

  const navigate = useNavigate();

  const effectHasRun = useRef(false);

  let divStyle = {
    opacity: isDisabledNavbar ? 0.5 : 1,
    pointerEvents: isDisabledNavbar ? "none" : "auto",
  };

  useEffect(() => {
    if (!effectHasRun.current) {
      (async () => {
        dispatch(connectSocket());
        effectHasRun.current = true;
      })();
    }
  }, []);

  useEffect(() => {
    if (isRejoin) {
      dispatch(disableIsRejoin());
      dispatch(disableUserIsRejoin());
      if (tableState && tableState != "SCORE_BOARD") {
        navigate("/gameplay");
      } else {
        navigate("/lobby");
      }
    } else if (!tableState && !userinfo?.isRejoin) {
      navigate("/lobby");
    }
  }, [isRejoin, userinfo]);

  const click = () => {
    navigate("/lobby");
  };

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    navigate('/login');
  }

  return (
    <>
      <div className="navbar" style={divStyle}>
        <div className="upsidenavbar">
          <div className="profile">
            <div className="profile-pic"></div>
            <div className="profile-pic-name">{userinfo.fullName}</div>
            {/* <div className="profile-edit">
            <div className="profile-edit-btn">Edit Profile</div>
          </div> */}
          </div>
          <div className="user-game-details">balance : {userinfo.amount}</div>
          <div className="user-game-details-win">WIN : {userinfo.win}</div>
          <div className="user-game-details-loss">LOSS : {userinfo.loss}</div>
          <div className="user-game-details-tie">TIE : {userinfo.tie}</div>
          <div className="lobby" onClick={() => click()}>
            <Link
              to="/lobby"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-dark" : ""
              }
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "white" }}> Enter Lobby</span>
            </Link>
          </div>
        </div>
        <div className="downsidenavbar">
          <div className="logout">
            <button className="logout-btn" onClick={handleLogout} >Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
