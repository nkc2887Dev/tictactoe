import {
    collectBootThunk,
    leaveTableThunk,
    matchMakeThunk,
    popupThunk,
    rejoinThunk,
    scoreboardThunk,
    selectDealerThunk,
    signupThunk,
    turnThunk,
} from "./socketConnectionState";
import { EVENTS } from "../../constants";
import { lobbyThunk } from "../Lobby/lobbySlice";
import { disablePopup, loadingStop, takeTurn } from "../gameManager/gameManagerSlice";

const SocketEventManage = (dispatch, event, data) => {
    switch (event) {
        case EVENTS.SIGN_UP:
            dispatch(signupThunk(data[0]));
            break;
        case EVENTS.LOBBY:
            dispatch(loadingStop());
            dispatch(lobbyThunk(data[0]));
            break;
        case EVENTS.MATCH_MAKE:
            dispatch(loadingStop());
            dispatch(disablePopup());
            dispatch(matchMakeThunk(data[0]));
            break;
        case EVENTS.COLLECT_BOOT:
            dispatch(collectBootThunk(data[0]));
            break;
        case EVENTS.SELECT_DEALER:
            dispatch(selectDealerThunk(data[0]));
            break;
        case EVENTS.TURN:
            dispatch(turnThunk(data[0]));
            break;
        case EVENTS.TAKE_TURN:
            dispatch(takeTurn(data[0]));
            break;
        case EVENTS.SCORE_BOARD:
            dispatch(scoreboardThunk(data[0]));
            break;
        case EVENTS.REJOIN:
            dispatch(rejoinThunk(data[0]));
            break;
        case EVENTS.LEAVE_TABLE:
            dispatch(leaveTableThunk(data[0]));
            break;
        case EVENTS.POPUP:
            dispatch(popupThunk(data[0]));
            break;
        default:
            console.log("====== call default :: SocketEventManage :: ");
    }
    //   }, [event, data, dispatch]); // Dependency array

    return null; // No JSX needed
};

export default SocketEventManage;
