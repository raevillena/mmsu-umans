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
export const getAppsPaginated = createAsyncThunk("apps/getAppsPaginated", async ({ page, isActive = true, searchTerm = "" }, {dispatch, rejectWithValue }) => {
  try {
      const response = await appsApi.getAppsPaginated(page, 10, isActive, searchTerm);
      // Show success message only on first page load to avoid notification spam
      if (page === 1) {
        const searchMsg = searchTerm ? ` with search "${searchTerm}"` : '';
        dispatch(showSnackbar({ message: `Apps loaded successfully${searchMsg}!`, severity: "info" }));
      }
      return { page, isActive, searchTerm, data: response.data }; // Expecting { apps: [...], totalPages: number }
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
  // Paginated cache keyed by search term for active/inactive
  paginatedActive: {}, // { searchKey: { pages: {}, loadedPages: [], totalPages: number } }
  paginatedInactive: {},
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
      state.paginatedActive = {};
      state.paginatedInactive = {};
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
            const { page, isActive, searchTerm = "", data } = action.payload;
            const pageNum = Number(page);
            const searchKey = searchTerm.trim().toLowerCase();
            const targetCache = isActive ? state.paginatedActive : state.paginatedInactive;

            if (!targetCache[searchKey]) {
              targetCache[searchKey] = {
                pages: {},
                loadedPages: [],
                totalPages: 0,
              };
            }

            const bucket = targetCache[searchKey];
            bucket.pages[pageNum] = data.apps || [];
            if (!bucket.loadedPages.includes(pageNum)) {
              bucket.loadedPages.push(pageNum);
            }
            bucket.totalPages = data.totalPages || 0;
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
            // Invalidate caches - will refetch on next view
            state.paginatedActive = {};
            state.paginatedInactive = {};
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
            
            const iterateCache = (cacheMap, callback) => {
              Object.values(cacheMap).forEach(bucket => {
                Object.entries(bucket.pages).forEach(([pageKey, pageApps]) => {
                  const index = pageApps.findIndex(a => a.id === updatedApp.id);
                  if (index !== -1) {
                    callback(bucket, pageKey, pageApps, index);
                  }
                });
              });
            };
            
            iterateCache(state.paginatedActive, (bucket, pageKey, pageApps, index) => {
              wasInActive = true;
              if (!newIsActive) {
                bucket.pages[pageKey] = pageApps.filter(a => a.id !== updatedApp.id);
              } else {
                bucket.pages[pageKey][index] = updatedApp;
              }
            });
            
            iterateCache(state.paginatedInactive, (bucket, pageKey, pageApps, index) => {
              wasInInactive = true;
              if (newIsActive) {
                bucket.pages[pageKey] = pageApps.filter(a => a.id !== updatedApp.id);
              } else {
                bucket.pages[pageKey][index] = updatedApp;
              }
            });
            
            // If status changed, invalidate the target cache to trigger refetch
            if (wasInActive && !newIsActive) {
              // Moved from active to inactive - invalidate active cache
              state.paginatedActive = {};
            } else if (wasInInactive && newIsActive) {
              // Moved from inactive to active - invalidate inactive cache
              state.paginatedInactive = {};
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