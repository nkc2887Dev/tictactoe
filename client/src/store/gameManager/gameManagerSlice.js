import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collectBootThunk, leaveTableThunk, matchMakeThunk, popupThunk, rejoinThunk, scoreboardThunk, selectDealerThunk, takeTurnThunk, turnThunk } from '../socket/socketConnectionState';

const gameManagerSlice = createSlice({
    name: "gameManager",
    initialState: {
        userId: null,
        gameBoard: ["", "", "", "", "", "", "", "", ""],
        tableState: null,
        isTurn: false,
        currentTurnIndex: null,
        currentTurnUserId: null,
        time: 0,
        isPopup: false,
        popupData: {},
        players: [],
        currentPlayer: {},
        isLoading: false,
        tableId: null,
        bootValue: null,
        winAmount: null,
        currentPlayerJoinId: null,
        isDisabledNavbar: false,
        isPlayBoardDisable: false,
        opponentData: {},
        isInfoPopup: false,
        message: "",
        symbol: "",
        isScoreboard: false,
        scoreboardData: null,
        isRejoin: false
    },
    reducers: {
        loadingStart(state, action) {
            state.isLoading = true
        },
        loadingStop(state, action) {
            state.isLoading = false
        },
        DisabledNavbar(state, action) {
            state.isDisabledNavbar = true
        },
        enableNavbar(state, action) {
            state.isDisabledNavbar = false
        },
        disablePopup(state, action) {
            state.isPopup = false
            state.popupData = {}
        },
        disableScoreboard(state, action) {
            state.isScoreboard = false
        },
        changeTableState(state, action) {
            state.tableState = action.payload
        },
        takeTurn(state, action) {
            let data = JSON.parse(action.payload)
            data = data.data

            state.gameBoard[Number(data.index)] = data.symbol
        },
        disableIsRejoin(state, action) {
            state.isRejoin = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(matchMakeThunk.fulfilled, (state, action) => {

                let data = JSON.parse(action.payload.data)
                data = data.data
                state.userId = action.payload.id
                state.tableId = data.tableId
                state.tableState = data.tableState
                state.bootValue = data.bootValue
                state.winAmount = data.winAmount
                state.players = data.players
                state.currentPlayerJoinId = data.currentPlayerId
                state.currentTurnIndex = null
                state.currentTurnUserId = null
                state.gameBoard = ["", "", "", "", "", "", "", "", ""]

                for (const player of data.players) {
                    if (state.userId === player.userId) {
                        state.currentPlayer = player
                    } else {
                        state.opponentData = player
                    }
                }
            })
            .addCase(popupThunk.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload)
                data = data.data

                if (
                    data.popupType === "TostPopUp" ||
                    data.popupType === "middleToastPopup"
                ) {
                    state.isPopup = true
                    state.popupData = data
                }


            })
            .addCase(selectDealerThunk.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload)
                data = data.data
                state.tableState = "SELECT_DEALER"
                for (const player of data.playerDetails) {
                    if (state.userId === player.userId) {
                        state.symbol = player.symbol
                        break;
                    }
                }

            })
            .addCase(turnThunk.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload)
                data = data.data

                state.time = data.turnTime
                state.currentTurnUserId = data.playerId

                if (state.tableState !== "PLAYING_START") {
                    state.tableState = "PLAYING_START"
                }
            })
            .addCase(scoreboardThunk.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload)
                data = data.data
                state.isScoreboard = true
                state.scoreboardData = data.playersDetails
            })
            .addCase(rejoinThunk.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload)
                data = data.data

                for (const player of data.players) {
                    if (player.userId === data.userId) {
                        state.symbol = player.symbol
                        state.currentPlayer = player
                    } else {
                        state.opponentData = player
                    }
                }

                state.userId = data.userId
                state.time = data.timer
                state.currentTurnIndex = data.currentPlayerId
                state.currentTurnUserId = data.currentPlayerId
                state.tableState = data.tableState
                state.players = data.players
                state.gameBoard = data.gameBoard

                if (data.tableState === "ROUND_TIMER_START") {
                    state.isPopup = true
                    state.popupData.popupType = "middleToastPopup"
                    state.popupData.time = data.timer
                }

                if (
                    data.tableState === "ROUND_TIMER_START" ||
                    data.tableState === "COLLECT_BOOT" ||
                    data.tableState === "SELECT_DEALER" ||
                    data.tableState === "PLAYING_START"
                ) {
                    state.isDisabledNavbar = true
                }

                state.isRejoin = true

            })
            .addCase(collectBootThunk.fulfilled, (state, action) => {
                state.tableState = "COLLECT_BOOT"
            })
            .addCase(leaveTableThunk.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload)
                data = data.data

                if (data.userId === state.userId) {
                    state.isRejoin = false

                }
            })
    }
})

export const { takeTurn, DisabledNavbar, enableNavbar, loadingStart, loadingStop, disablePopup, disableScoreboard, changeTableState, disableIsRejoin } = gameManagerSlice.actions

export default gameManagerSlice.reducer;