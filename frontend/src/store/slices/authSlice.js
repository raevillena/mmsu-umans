import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action
import { updateAvatar } from "../actions/userShared";

// Async action to handle login
export const login = createAsyncThunk("auth/superLogin", async (credentials, {dispatch, rejectWithValue }) => {
    try {
        const response = await authApi.login(credentials);
        const {user, token} = response.data
        if (credentials.remember) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", token.accessToken)
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
          }
        return response.data; // Expecting { accessToken, user }
    } catch (error) {
        
        if(error.response.data.errors){
            const eachError = error.response.data.errors.map(err => err.msg)
            dispatch(showSnackbar({ message: eachError || "Login failed", severity: "error" }));
            return rejectWithValue(eachError || "Login failed");
        }
        dispatch(showSnackbar({ message: error.response?.data?.msg || "Login failed", severity: "error" }));
        return rejectWithValue(error.response?.data?.msg || "Login failed");
    }
});
  
// Async action to handle logout
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await authApi.logout();
        return null;
    } catch (error) {
        return rejectWithValue(error.response?.data?.msg || "Logout failed");
    }
});


// Async action to handle logout
export const validateTokens = createAsyncThunk("auth/isAuthenticated", async (_, { rejectWithValue }) => {
    try {
        const response = await authApi.isAuthenticated();
        return response.data;
    } catch (error) {
        if(error.response.data.errors){
            const eachError = error.response.data.errors.map(err => err.msg)
            return rejectWithValue(eachError || "Session Expired");
        }
        return rejectWithValue(error.response?.data?.msg || "No valid session!");
    }
});

// Async thunk for refreshing token
export const refreshAccessToken = createAsyncThunk("auth/refresh", async (user, { rejectWithValue }) => {
    try {
        const response = await authApi.refreshToken(user)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Token refresh failed");
    }
});




const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("accessToken")
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearTokens: (state, action) => {
            state.user = null;
            state.accessToken = null;
            state.loading = false
            state.error = action.payload;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.token.accessToken;
                state.isAuthenticated = true;

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshAccessToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                localStorage.setItem("accessToken", action.payload.accessToken)
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.accessToken = null;
                state.isAuthenticated = false;
            })
            .addCase(validateTokens.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateTokens.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
            .addCase(validateTokens.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.loading = false
                state.error = null;
                state.isAuthenticated = false;
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken")
            })
            .addCase(updateAvatar, (state, action) => {
                state.user.avatar = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user));
            })
    },
});
export const { clearTokens } = authSlice.actions;
export default authSlice.reducer;