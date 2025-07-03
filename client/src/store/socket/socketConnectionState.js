import { createAsyncThunk } from '@reduxjs/toolkit';
import { DisabledNavbar } from '../gameManager/gameManagerSlice';
import { sendEvent } from './socket';
import { EVENTS } from '../../constants';

export const updateMessage = createAsyncThunk(
    'socket/updateMessage',
    (data) => data
);

export const signupThunk = createAsyncThunk(
    'socket/signup',
    (data, { dispatch }) => {
        const info = JSON.parse(data)
        if (info?.data?.isRejoin) {
            dispatch(sendEvent({
                event: EVENTS.REJOIN,
                data: {}
            }))
        }

        return info.data
    }
);
export const matchMakeThunk = createAsyncThunk(
    'socket/matchMake',
    (data, { getState, dispatch }) => {
        const userinfo = getState().access.userData;
        dispatch(DisabledNavbar())
        return { data, id: userinfo._id }
    }
);

export const popupThunk = createAsyncThunk(
    'socket/popupThunk',
    (data) => data
);

export const selectDealerThunk = createAsyncThunk(
    'socket/selectDealer',
    (data) => data
);

export const turnThunk = createAsyncThunk(
    'socket/turn',
    (data) => data
);

export const scoreboardThunk = createAsyncThunk(
    'socket/scoreboard',
    (data) => data
);

export const rejoinThunk =  createAsyncThunk(
    'socket/rejoin',
    (data) => data
);

export const collectBootThunk =  createAsyncThunk(
    'socket/collectBoot',
    (data) => data
);
export const leaveTableThunk =  createAsyncThunk(
    'socket/leaveTable',
    (data) => data
);
