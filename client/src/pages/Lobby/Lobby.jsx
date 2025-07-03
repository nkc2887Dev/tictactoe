import React, { useEffect } from "react";
import "./LobbyCard.css";
import { useSelector, useDispatch } from "react-redux";
import socket, { sendEvent } from "../../store/socket/socket";
import { EVENTS } from "../../constants";
import LobbyCard from "./LobbyCard";
import { lobbyData } from "../../store/Lobby/lobbySlice";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { loadingStart } from "../../store/gameManager/gameManagerSlice";

function Lobby() {
  const dispatch = useDispatch();
  const lobby = useSelector(lobbyData);
  const socketIo = useSelector((state) => state.socket.socket);
  const isLoading = useSelector((state) => state.gameManager.isLoading);
  const tableState = useSelector((state) => state.gameManager.tableState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadingStart());
    dispatch(sendEvent({ event: EVENTS.LOBBY, data: {} }));
  }, [socketIo]);

  useEffect(()=>{
    if(tableState && tableState === "WATING_PLAYER"){
      navigate("/gameplay");
    }
  },[tableState])

  return (
    <>
      <div className="outlayer">
        <div className="board-container">
          {!lobby || isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            lobby?.map((info) => {
              return <LobbyCard data={info} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Lobby;
