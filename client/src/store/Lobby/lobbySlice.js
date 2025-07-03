import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const lobbyThunk = createAsyncThunk(
    'socket/lobby',
    (data) => data
);


const lobbySlice = createSlice({
    name : "lobby",
    initialState :{
        lobbyData : null,
        isLoading : false
    },
    reducers: {},
    extraReducers : (builder)=>{
        builder
        .addCase(lobbyThunk.fulfilled, (state, action) => {
            const data = JSON.parse(action.payload)
            state.lobbyData = data.data
        })
    }
})

export const lobbyData = (state) => state.lobby.lobbyData

export default lobbySlice.reducer;