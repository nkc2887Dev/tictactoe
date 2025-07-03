import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie";
import collectBoot from "../assets/Animation/collectAmount.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Backdrop } from "@mui/material";

const animationStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  // position : "relative",
  // left : "8%"
};

const CollectBoot = () => {
  const lottieRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: collectBoot,
  };

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // style={{
      //   // left:"8%",
      //   // width : "100%"
      //   // background: "inherit"
      // }}
      sx={{
        left: "16%",
        // left: "276px",
        // width: "100%",
      }}

    >
      <Box sx={animationStyle}>
        <Lottie
          ref={lottieRef}
          height="400"
          width="400"
          duration={2}
          options={defaultOptions}

        />
      </Box>
    </Modal>
  );
};

export default CollectBoot;
