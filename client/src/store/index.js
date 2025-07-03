import { configureStore } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
import access from "./Access/access";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import socket from "./socket/socket";
import lobbySlice from "./Lobby/lobbySlice";
import gameManagerSlice from "./gameManager/gameManagerSlice";

// Configuration for redux-persist
const persistConfig = {
    key: "root", // key is required
    storage, // storage is required
    // You can also add other options like blacklist or whitelist here
};

const persistedReducer = persistReducer(persistConfig, access);

export const store = configureStore({
    reducer: {
        access: persistedReducer,
        socket : socket,
        lobby : lobbySlice,
        gameManager : gameManagerSlice

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: axiosClient,
        },
    })
});


export const persistor = persistStore(store);