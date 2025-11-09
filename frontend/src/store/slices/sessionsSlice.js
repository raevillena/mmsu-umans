import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionsApi from "../../api/sessionsApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting apps
export const getSessions = createAsyncThunk("sessions/getSessions", async (_, {dispatch, rejectWithValue }) => {
  try {
      const response = await sessionsApi.getSessions();
      dispatch(showSnackbar({ message: "Sessions loaded successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting sessions failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Getting sessions failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});



// Async action to handle getting sessions
export const deleteSession = createAsyncThunk("sessions/deleteSession", async ({id, data}, {dispatch, rejectWithValue }) => {
  try {
      const response = await sessionsApi.deleteSession(id);
      if(response.data?.msg==="session deleted permanently"){
        dispatch(showSnackbar({ message: "Session ended successfully!", severity: "warning" }));
        return {id}; // Expecting { accessToken, user }
      }
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
  sessions:  ['empty'],
  loading: null,
  loadingRowId: null,
  error: null,

};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getSessions.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getSessions.fulfilled, (state, action) => {
            state.sessions = action.payload;
            state.loading = false;

          })
          .addCase(getSessions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteSession.pending, (state, action) => {
            state.loadingRowId = action.meta.arg.id;
            state.error = null;
          })
          .addCase(deleteSession.fulfilled, (state, action) => {
            state.loadingRowId = null;
            state.sessions = state.sessions.filter(session => session.id !== action.payload.id);
          })
          .addCase(deleteSession.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export default sessionsSlice.reducer;