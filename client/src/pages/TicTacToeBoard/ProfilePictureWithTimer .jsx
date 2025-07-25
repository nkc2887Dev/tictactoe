// ProfilePictureWithTimer.js
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";

const ProfilePictureWithTimer = () => {
  const currentTurnUserId = useSelector(
    (state) => state.gameManager.currentTurnUserId
  );

  const opponentData = useSelector((state) => state.gameManager.opponentData);
  const timer = useSelector((state) => state.gameManager.time);

  const [strokeWidth, setStrokeWidth] = useState(0);
  const [time, SetTime] = useState(0);
  const [isTurn, setIsTurn] = useState(true);

  useEffect(() => {
    if (currentTurnUserId && currentTurnUserId === opponentData?.userId) {
      setStrokeWidth(10);
      SetTime(timer);
      setIsTurn(true);
    } else {
      setStrokeWidth(0);
      SetTime(0);
      setIsTurn(false,timer);
    }
  }, [currentTurnUserId]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <CountdownCircleTimer
          isPlaying={isTurn}
          duration={time}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          size={130}
          strokeWidth={strokeWidth}
        >
          {({ remainingTime }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://picsum.photos/200/300"
                alt="Profile Pic"
                style={{
                  width: "115px",
                  height: "115px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              {/* {remainingTime} */}
            </div>
          )}
        </CountdownCircleTimer>
        <div style={{ fontSize: "1.4rem" }}>{opponentData?.userName}</div>
      </div>
    </>
  );
};

export default ProfilePictureWithTimer;
