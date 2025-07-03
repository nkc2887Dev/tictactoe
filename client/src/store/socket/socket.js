import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import SocketEventManage from './socketEventManage';
import { matchMakeThunk, updateMessage } from './socketConnectionState';
import { EVENTS } from '../../constants';
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";


export const disconnectSocket = createAsyncThunk(
    'socket/disconnect',
    (_, { getState }) => {
        const { socket } = getState().socket;
        if (socket) {
            // socket.off('connect');
            // socket.off('disconnect');
            // socket.offAny(); // assuming you have a 'any' event
            // // Add more events as needed

            // socket.disconnect();
        }
    }
);

// Modify your connectSocket thunk to check if the socket is already connected
export const connectSocket = createAsyncThunk(
    'socket/connect',
    async (_, { getState, dispatch }) => {
        const { socket } = getState().socket;

        const newSocket = io("http://localhost:9000/", {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            randomizationFactor: 0.5,
            transports: ['websocket', "polling"]
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
            const getAccessToken = Cookies.get("token");
            dispatch(sendEvent({ event: EVENTS.SIGN_UP, data: { token: getAccessToken } }))
        });

        newSocket.on("reconnect", (attempt) => {
            console.log("======== attempt :: ", attempt)
        })

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
            dispatch(disconnectSocket())
        });

        newSocket.onAny((eventName, ...args) => {
            SocketEventManage(dispatch, eventName, args)
        });

        return newSocket;
    }
);


const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        isConnected: false,
        message: ''
    },
    reducers: {
        // send event
        sendEvent(state, action) {
            if (state.socket) {
                const requestData = {
                    "en": action.payload.event,
                    data: action.payload.data
                }
                state.socket.emit(action.payload.event, requestData);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectSocket.pending, (state) => {
                state.isConnected = false;
            })
            .addCase(connectSocket.fulfilled, (state, action) => {
                state.socket = action.payload;
                state.isConnected = true;
            })
            .addCase(connectSocket.rejected, (state) => {
                state.isConnected = false;
            })
            .addCase(updateMessage.fulfilled, (state, action) => {
                state.message = action.payload;
            })
    },
});
export const { sendEvent } = socketSlice.actions;
export const selectMessage = (state) => state.socket.message;
export default socketSlice.reducer;
