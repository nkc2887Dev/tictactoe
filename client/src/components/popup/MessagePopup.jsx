import React, { useState, useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import "./popup.css";
import { useSelector } from "react-redux";

const MessagePopup = ({ data }) => {
  const isInfoPopup = useSelector((state) => state.gameManager.isInfoPopup);
  const [message, setMessage] = useState("tool tips......."); // State for tooltip message
  const [showTooltip, setShowTooltip] = useState(true); // State for tooltip visibility

  useEffect(() => {
    let setTimeOut;
    if (isInfoPopup) {
      clearTimeout(setTimeOut);
      setTimeOut = setTimeout(() => {
        setShowTooltip(false);
      }, 3 * 1000);
    } else {
      clearTimeout(setTimeOut);
    }
  }, [isInfoPopup]);

  return (
    <>
      <div>
        {showTooltip && (
          <div id="tooltip" role="tooltip" className="tooltip">
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default MessagePopup;
