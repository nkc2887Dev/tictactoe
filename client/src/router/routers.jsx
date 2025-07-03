import Home from "../pages/Home/Home";
import Lobby from "../pages/Lobby/Lobby";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import TicTacToeBoard from "../pages/TicTacToeBoard/TicTacToeBoard";

export const PublicroutesArray = [
    { path: "/login", component: Login, title: "login" },
    { path: "/register", component: Register, title: "register" },
]

export const PrivateroutesArray = [
  { path: "/", component: Home, title: "Home" },
  { path: "/lobby", component: Lobby, title: "Lobby" },
  { path: "/gameplay", component: TicTacToeBoard, title: "TicTacToeBoard" }
];

