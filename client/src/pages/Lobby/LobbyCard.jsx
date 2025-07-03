import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import gameImage from "../../assets/images/game.jpg";
import { sendEvent } from "../../store/socket/socket";
import { useSelector, useDispatch } from "react-redux";
import { EVENTS } from "../../constants";
import { loadingStart } from "../../store/gameManager/gameManagerSlice";

function LobbyCard({ data }) {
  const { amount, gameType, mode, commission, _id } = data;
  const dispatch = useDispatch();

  const clickOnLobby = (id) => {
    dispatch(loadingStart());
    dispatch(sendEvent({ event: EVENTS.MATCH_MAKE, data: { lobbyId: id } }));
  };

  return (
    <div onClick={() => clickOnLobby(_id)}>
      <Card sx={{ maxWidth: 345, maxHeight: 275, margin: 2 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={gameImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Game Mode {mode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Game type is {gameType} and game commission is {commission}- Amount
            : {amount}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default LobbyCard;
