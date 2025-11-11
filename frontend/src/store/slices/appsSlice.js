import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appsApi from "../../api/appsApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting apps (all apps - for backward compatibility)
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

// Async action to handle getting paginated apps (with caching)
// Accepts { page, isActive } as argument
export const getAppsPaginated = createAsyncThunk("apps/getAppsPaginated", async ({ page, isActive = true }, {dispatch, rejectWithValue }) => {
  try {
      const response = await appsApi.getAppsPaginated(page, 10, isActive);
      return { page, isActive, data: response.data }; // Expecting { apps: [...], totalPages: number }
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
  apps:  ['empty'], // For backward compatibility
  // Paginated cache - separate for active and inactive
  paginatedPagesActive: {}, // { 1: [...], 2: [...] }
  paginatedPagesInactive: {}, // { 1: [...], 2: [...] }
  totalPagesActive: 0,
  totalPagesInactive: 0,
  loadedPagesActive: [], // Track which pages are cached [1, 2, 3, ...]
  loadedPagesInactive: [], // Track which pages are cached [1, 2, 3, ...]
  loading: false,
  loadingRowId: null,
  error: null,
  message: null,
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    clearPaginatedCache: (state) => {
      state.paginatedPagesActive = {};
      state.paginatedPagesInactive = {};
      state.loadedPagesActive = [];
      state.loadedPagesInactive = [];
      state.totalPagesActive = 0;
      state.totalPagesInactive = 0;
    },
  },
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
          .addCase(getAppsPaginated.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAppsPaginated.fulfilled, (state, action) => {
            const { page, isActive, data } = action.payload;
            // Ensure page is a number for consistent key access
            const pageNum = Number(page);
            // Cache the page data based on active status
            if (isActive) {
              state.paginatedPagesActive[pageNum] = data.apps || [];
              if (!state.loadedPagesActive.includes(pageNum)) {
                state.loadedPagesActive.push(pageNum);
              }
              state.totalPagesActive = data.totalPages || 0;
            } else {
              state.paginatedPagesInactive[pageNum] = data.apps || [];
              if (!state.loadedPagesInactive.includes(pageNum)) {
                state.loadedPagesInactive.push(pageNum);
              }
              state.totalPagesInactive = data.totalPages || 0;
            }
            state.loading = false;
          })
          .addCase(getAppsPaginated.rejected, (state, action) => {
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
            // Update apps array for reference data
            if (state.apps[0] !== 'empty') {
              state.apps.push(action.payload);
            }
            // Invalidate active paginated cache - will refetch on next view
            state.paginatedPagesActive = {};
            state.loadedPagesActive = [];
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
            const updatedApp = action.payload;
            const newIsActive = updatedApp.isActive;
            
            // Update apps array for reference data
            if (state.apps[0] !== 'empty') {
              state.apps = state.apps.map((app) =>
                app.id === updatedApp.id ? updatedApp : app
              );
            }
            
            // Check if isActive status changed by looking at both caches
            let wasInActive = false;
            let wasInInactive = false;
            
            // Check active cache
            Object.keys(state.paginatedPagesActive).forEach(page => {
              const pageApps = state.paginatedPagesActive[page];
              const appIndex = pageApps.findIndex(a => a.id === updatedApp.id);
              if (appIndex !== -1) {
                wasInActive = true;
                // If new status is inactive, remove from active cache
                if (!newIsActive) {
                  state.paginatedPagesActive[page] = pageApps.filter(a => a.id !== updatedApp.id);
                } else {
                  // If still active, update the record
                  state.paginatedPagesActive[page][appIndex] = updatedApp;
                }
              }
            });
            
            // Check inactive cache
            Object.keys(state.paginatedPagesInactive).forEach(page => {
              const pageApps = state.paginatedPagesInactive[page];
              const appIndex = pageApps.findIndex(a => a.id === updatedApp.id);
              if (appIndex !== -1) {
                wasInInactive = true;
                // If new status is active, remove from inactive cache
                if (newIsActive) {
                  state.paginatedPagesInactive[page] = pageApps.filter(a => a.id !== updatedApp.id);
                } else {
                  // If still inactive, update the record
                  state.paginatedPagesInactive[page][appIndex] = updatedApp;
                }
              }
            });
            
            // If status changed, invalidate the target cache to trigger refetch
            if (wasInActive && !newIsActive) {
              // Moved from active to inactive - invalidate active cache
              state.paginatedPagesActive = {};
              state.loadedPagesActive = [];
            } else if (wasInInactive && newIsActive) {
              // Moved from inactive to active - invalidate inactive cache
              state.paginatedPagesInactive = {};
              state.loadedPagesInactive = [];
            }
          })
          .addCase(updateApp.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export const { clearPaginatedCache } = appsSlice.actions;
export default appsSlice.reducer;