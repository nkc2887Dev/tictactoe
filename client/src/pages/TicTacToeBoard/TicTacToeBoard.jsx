import React, { useEffect, useState } from "react";
import "./TicTacToeBoard.css";
import ProfilePictureWithTimer from "./ProfilePictureWithTimer ";
import PlayerProfilePictureWithTimer from "./PlayerProfilePictureWithTimer";
import { useSelector, useDispatch } from "react-redux";
import { popup } from "../../components/popup/popup";
import MessagePopup from "../../components/popup/MessagePopup";
import { EVENTS } from "../../constants";
import { sendEvent } from "../../store/socket/socket";
import ScoreBoard from "./ScoreBoard";
import CollectBoot from "../../components/CollectBoot";
import ClientSideTooltip from "../../components/popup/ClientSideTooltip";
import Button from "@mui/material/Button";
const TicTacToeBoard = () => {
  // Initialize the board state with an array of 9 null values
  const dispatch = useDispatch();

  const board = useSelector((state) => state.gameManager.gameBoard);
  const isPopup = useSelector((state) => state.gameManager.isPopup);
  const isInfoPopup = useSelector((state) => state.gameManager.isInfoPopup);
  const isScoreboard = useSelector((state) => state.gameManager.isScoreboard);
  const popupData = useSelector((state) => state.gameManager.popupData);
  const symbol = useSelector((state) => state.gameManager.symbol);
  const tableState = useSelector((state) => state.gameManager.tableState);
  const currentTurnUserId = useSelector(
    (state) => state.gameManager.currentTurnUserId
  );
  const userData = useSelector((state) => state.gameManager.currentPlayer);
  const [isCollectBoot, SetIsCollectBoot] = useState(false);
  const [clientSidePopup, SetClientSidePopup] = useState(false);

  useEffect(() => {
    if (tableState === "COLLECT_BOOT") {
      SetIsCollectBoot(true);
    } else {
      SetIsCollectBoot(false);
    }
    if (tableState === "SELECT_DEALER") {
      SetClientSidePopup(true);
    } else {
      SetClientSidePopup(false);
    }
  }, [tableState]);

  // Function to handle cell click
  const handleCellClick = (index) => {
    if (currentTurnUserId && currentTurnUserId === userData?.userId) {
      dispatch(
        sendEvent({
          event: EVENTS.TAKE_TURN,
          data: {
            index: index,
          },
        })
      );
    } else {
      // tooltip
    }
  };

  const leaveButton = () => {
    dispatch(
      sendEvent({
        event: EVENTS.LEAVE_TABLE,
        data: {},
      })
    );
  };

  // Render the board with cells
  const renderCells = () => {
    return board.map((value, index) => (
      <>
        <div
          key={index}
          className="cell"
          dataset={{ index }}
          onClick={() => handleCellClick(index)}
        >
          {value}
        </div>
      </>
    ));
  };

  return (
    <>
      <div className="outlayer">
        <div className="board-container">
          {/** popup data */}
          {clientSidePopup && (
            <ClientSideTooltip data={`your symbol is ${symbol}.`} />
          )}
          {isCollectBoot && <CollectBoot />}
          {isScoreboard && <ScoreBoard />}
          {isPopup && popup(popupData.popupType)}
          {isInfoPopup && <MessagePopup data={{ timer: 3, msg: "" }} />}
          <ProfilePictureWithTimer />
          <div className="board">{renderCells()}</div>
          <PlayerProfilePictureWithTimer />
          {/* <Button
            variant="contained"
            style={{
              zIndex: 1400,
              position: "revert-layer",
              // top: "46%",
              left: "29%",
              backgroundColor: "red",
            }}
            onClick={leaveButton}
          >
            Leave
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default TicTacToeBoard;
