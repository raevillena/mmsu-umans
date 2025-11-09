import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionsApi from "../../api/sessionsApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting sessions (all sessions - for backward compatibility)
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

// Async action to handle getting paginated sessions (with caching)
export const getSessionsPaginated = createAsyncThunk("sessions/getSessionsPaginated", async (page, {dispatch, rejectWithValue }) => {
  try {
      const response = await sessionsApi.getSessionsPaginated(page);
      return { page, data: response.data }; // Expecting { sessions: [...], totalPages: number }
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
  sessions:  ['empty'], // For backward compatibility
  // Paginated cache
  paginatedPages: {}, // { 1: [...], 2: [...] }
  totalPages: 0,
  loadedPages: [], // Track which pages are cached [1, 2, 3, ...]
  loading: false,
  loadingRowId: null,
  error: null,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    clearPaginatedCache: (state) => {
      state.paginatedPages = {};
      state.loadedPages = [];
      state.totalPages = 0;
    },
  },
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
          .addCase(getSessionsPaginated.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getSessionsPaginated.fulfilled, (state, action) => {
            const { page, data } = action.payload;
            // Ensure page is a number for consistent key access
            const pageNum = Number(page);
            // Cache the page data
            state.paginatedPages[pageNum] = data.sessions || [];
            if (!state.loadedPages.includes(pageNum)) {
              state.loadedPages.push(pageNum);
            }
            state.totalPages = data.totalPages || 0;
            state.loading = false;
          })
          .addCase(getSessionsPaginated.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteSession.pending, (state, action) => {
            state.loadingRowId = action.meta.arg.id;
            state.error = null;
          })
          .addCase(deleteSession.fulfilled, (state, action) => {
            state.loadingRowId = null;
            // Update sessions array for reference data
            if (state.sessions[0] !== 'empty') {
              state.sessions = state.sessions.filter(session => session.id !== action.payload.id);
            }
            // Update paginated cache - remove from all cached pages
            Object.keys(state.paginatedPages).forEach(page => {
              state.paginatedPages[page] = state.paginatedPages[page].filter(
                session => session.id !== action.payload.id
              );
            });
          })
          .addCase(deleteSession.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export const { clearPaginatedCache } = sessionsSlice.actions;
export default sessionsSlice.reducer;