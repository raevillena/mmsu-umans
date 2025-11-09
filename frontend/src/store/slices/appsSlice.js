import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appsApi from "../../api/appsApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting apps
export const getApps = createAsyncThunk("apps/getApps", async (_, {dispatch, rejectWithValue }) => {
  try {
      const response = await appsApi.getApps();
      dispatch(showSnackbar({ message: "Apps loaded successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting apps failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Getting apps failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting apps
export const createApp = createAsyncThunk("auth/addApp", async (newApp, {dispatch, rejectWithValue }) => {
  try {
      const response = await appsApi.createApp(newApp);
      dispatch(showSnackbar({ message: `${response.data.name} was added successfully`, severity: "success" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Signup failed"
        dispatch(showSnackbar({ message: eachError, severity: "error" }));
        return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting apps
export const updateApp = createAsyncThunk("apps/updateApp", async ({id, data}, {dispatch, rejectWithValue }) => {
  try {
      const response = await appsApi.updateApp(id, data);
      dispatch(showSnackbar({ message: "App was updated successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ")|| "Signup failed"
        dispatch(showSnackbar({ message: eachError, severity: "error" }));
        return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

const initialState = {
  apps:  ['empty'],
  loading: false,
  loadingRowId: null,
  error: null,
  message: null,
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getApps.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(getApps.fulfilled, (state, action) => {
            state.apps = action.payload;
            state.loading = false;

          })
          .addCase(getApps.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(createApp.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(createApp.fulfilled, (state, action) => {
            state.loading = false;
            state.apps.push(action.payload);
          })
          .addCase(createApp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateApp.pending, (state, action) => {
            state.loadingRowId = action.meta.arg.id;
            state.error = null;
          })
          .addCase(updateApp.fulfilled, (state, action) => {
            state.loadingRowId = null;
            state.apps = state.apps.map((app) =>
              app.id === action.payload.id ? action.payload : app
            );
          })
          .addCase(updateApp.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export default appsSlice.reducer;