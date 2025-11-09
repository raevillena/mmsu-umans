import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import googleApi from "../../api/googleApi";

export const callback = createAsyncThunk("auth/google/callback", async (code, { rejectWithValue }) => {
    try {
      const response = await googleApi.callback(code);
      return response.data; // Expected: { user, accessToken }
    } catch (error) {
      return rejectWithValue(error.response.data || "Google callback Failed");
    }
  }
);

export const googleLogin = createAsyncThunk("auth/google/regislog", async (userInfo, { rejectWithValue }) => {
    try {
      const response = await googleApi.loginGoogleUser(userInfo);
      return response.data; // Expected: { user, accessToken }
    } catch (error) {
      return rejectWithValue(error.response.data || "Google Login Failed");
    }
  }
);

const googleSlice = createSlice({
  name: "google",
  initialState: { userInfo: null, isAuthenticated: false },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.userInfo = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase(callback.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.isAuthenticated = true;
      })
      .addCase(callback.rejected, (state) => {
        state.userInfo = null;
      });
  },
});

export const { logout } = googleSlice.actions;
export default googleSlice.reducer;