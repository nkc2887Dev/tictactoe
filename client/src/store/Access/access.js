import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { END_POINT } from '../../constants/endPoints';
import Cookies from 'js-cookie'
import showToast from '../../components/Toaster';
import { signupThunk } from '../socket/socketConnectionState';

export const loginApi = createAsyncThunk(
    'loginApi',
    async (data, { getState, extra: api }) => {
        try {
            const userData = await api.post(END_POINT.LOGIN, data);
            return userData.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
);
export const registerApi = createAsyncThunk(
    'registerApi',
    async (data, { getState, extra: api }) => {
        try {
            const apiData = await api.post(END_POINT.SIGN_UP, data);
            return apiData.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
);

const accessSlice = createSlice({
    name: 'access',
    initialState: {
        userData: {},
        error: null,
        loading: null,
        isDisabledNavbar: false
    },
    reducers: {
        updateUserData(state, action) {
            state.userData = {
                ...state.userData,
                ...action.payload
            }
        },
        disableUserIsRejoin(state, action) {
            state.isRejoin = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginApi.fulfilled, (state, action) => {
                Cookies.set(`token`, action.payload?.data.accessToken, { path: "/", expires: 1 / 2 })
                state.userData = action.payload?.data?.userInfo
                showToast('Login Success', 'success', "response.message");
            })
            .addCase(loginApi.pending, (state) => {
            })
            .addCase(loginApi.rejected, (state, action) => {
                showToast('Login Success', 'error', "somthing want wrong !");
            });

        builder
            .addCase(registerApi.fulfilled, (state, action) => {
                if (action.payload.status === true) {
                    showToast('register', 'success', action.payload.message);
                } else {
                    showToast('register', 'info', action.payload.message);
                }
            })
            .addCase(registerApi.pending, (state) => {
            })
            .addCase(registerApi.rejected, (state, action) => {
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                // const data = JSON.parse(action.payload)
                state.userData = {
                    ...state.userData,
                    ...action.payload
                }
            })
    },

});

export const { updateUserData, disableUserIsRejoin } = accessSlice.actions;

export const userData = (state) => state.access.userData;

export default accessSlice.reducer;
