import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector,useDispatch } from "react-redux";
import { disablePopup } from "../../store/gameManager/gameManagerSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "58%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px",
  marginBottom: "16px",
  backgroundColor: "#000000ab",
  color: "#fffffe",
  borderRadius: "22px",
};

const GameStartTimer = () => {
  const isPopup = useSelector((state) => state.gameManager.isPopup);
  const popupData = useSelector((state) => state.gameManager.popupData);
  const dispatch = useDispatch();
  const [secondsRemaining, setSecondsRemaining] = useState(popupData?.time);
  const [message, setMessage] = useState(popupData?.message);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (popupData.popupType === "middleToastPopup") {
      setMessage(null)
      const timerId = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else {
          clearInterval(timerId);
          handleClose();
          dispatch(disablePopup());
        }
      }, 1000);

      return () => clearInterval(timerId);
    } else if (popupData.popupType === "TostPopUp") {
      if (!isPopup) {
        handleClose();
        setMessage(null);
      }
    }
  }, [secondsRemaining, isPopup]);

  return (
    <>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ margin: 1 }}>
            {!message ? `Game starts in ${secondsRemaining} seconds!` : message}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default GameStartTimer;
