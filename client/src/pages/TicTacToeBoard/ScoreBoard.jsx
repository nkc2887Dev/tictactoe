import React, { useState } from "react";
import Table from "@mui/joy/Table";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTableState,
  disableScoreboard,
  enableNavbar,
} from "../../store/gameManager/gameManagerSlice";

const ScoreBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scoreboardData = useSelector(
    (state) => state.gameManager.scoreboardData
  );

  const gotoLobby = () => {
    dispatch(disableScoreboard());
    dispatch(changeTableState(null));
    dispatch(enableNavbar());
    return navigate("/lobby");
  };

  const Rows = ({ data }) => {
    return (
      <>
        <tr>
          <td>{data.userName}</td>
          <td>{data.playerState}</td>
          <td>{data.symbol}</td>
        </tr>
      </>
    );
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={true}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={2}
          >
            SCOREBOARD
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <Table aria-label="basic table">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>UserName</th>
                  <th>Status</th>
                  <th>Symbol</th>
                </tr>
              </thead>
              <tbody>
                {scoreboardData?.map((info) => {
                  return <Rows data={info} />;
                })}
              </tbody>
            </Table>
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button variant="solid" color="primary"
            onClick={gotoLobby}
            >
              Lobby
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
};

export default ScoreBoard;
