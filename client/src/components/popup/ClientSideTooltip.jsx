import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
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

const ClientSideTooltip = ({data}) => {
  return (
    <>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ margin: 1 }}>
            {data}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ClientSideTooltip;
