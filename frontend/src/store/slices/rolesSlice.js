import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rolesApi from "../../api/rolesApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting roles (all roles - for backward compatibility)
export const getRoles = createAsyncThunk("roles/getRoles", async (_, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.getRoles();
      dispatch(showSnackbar({ message: "Roles loaded successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting Roles failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Getting Roles failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting paginated roles (with caching)
export const getRolesPaginated = createAsyncThunk("roles/getRolesPaginated", async ({ page, isActive = true, searchTerm = "" }, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.getRolesPaginated(page, 10, isActive, searchTerm);
      return { page, isActive, searchTerm, data: response.data }; // Expecting { roles: [...], totalPages: number }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting Roles failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Getting Roles failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting Roles
export const addRole = createAsyncThunk("roles/addRole", async (newRole, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.addRole(newRole);
      dispatch(showSnackbar({ message: `${response.data.name} was added successfully`, severity: "success" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Adding failed"
        dispatch(showSnackbar({ message: eachError, severity: "error" }));
        return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting Roles
export const updateRole = createAsyncThunk("roles/updateRole", async ({id, data}, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.updateRole(id, data);
      dispatch(showSnackbar({ message: "Role was updated successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ")|| "Updating failed"
        dispatch(showSnackbar({ message: eachError, severity: "error" }));
        return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

const initialState = {
  roles:  ['empty'], // For backward compatibility
  // Paginated cache - separate for active and inactive
  paginatedActive: {}, // { searchKey: { pages: {}, loadedPages: [], totalPages: number } }
  paginatedInactive: {},
  loading: false,
  loadingRowId: null,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearPaginatedCache: (state) => {
      state.paginatedActive = {};
      state.paginatedInactive = {};
    },
  },
  extraReducers: (builder) => {
      builder
          .addCase(getRoles.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getRoles.fulfilled, (state, action) => {
            state.roles = action.payload;
            state.loading = false;

          })
          .addCase(getRoles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getRolesPaginated.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getRolesPaginated.fulfilled, (state, action) => {
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
            bucket.pages[pageNum] = data.roles || [];
            if (!bucket.loadedPages.includes(pageNum)) {
              bucket.loadedPages.push(pageNum);
            }
            bucket.totalPages = data.totalPages || 0;
            state.loading = false;
          })
          .addCase(getRolesPaginated.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(addRole.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addRole.fulfilled, (state, action) => {
            state.loading = false;
            // Update roles array for reference data
            if (state.roles[0] !== 'empty') {
              state.roles.push(action.payload);
            }
            // Invalidate active paginated cache - will refetch on next view
            state.paginatedActive = {};
            state.paginatedInactive = {};
          })
          .addCase(addRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateRole.pending, (state, action) => {
            state.loadingRowId = action.meta.arg.id;
            state.error = null;
          })
          .addCase(updateRole.fulfilled, (state, action) => {
            state.loadingRowId = null;
            const updatedRole = action.payload;
            const newIsActive = updatedRole.isActive;
            
            // Update roles array for reference data
            if (state.roles[0] !== 'empty') {
              state.roles = state.roles.map((role) =>
                role.id === updatedRole.id ? updatedRole : role
              );
            }
            
            // Check if isActive status changed by looking at both caches
            let wasInActive = false;
            let wasInInactive = false;
            
            // Check active cache
            const iterateCache = (cacheMap, callback) => {
              Object.values(cacheMap).forEach(bucket => {
                Object.entries(bucket.pages).forEach(([pageKey, pageRoles]) => {
                  const index = pageRoles.findIndex(r => r.id === updatedRole.id);
                  if (index !== -1) {
                    callback(bucket, pageKey, pageRoles, index);
                  }
                });
              });
            };
            
            iterateCache(state.paginatedActive, (bucket, pageKey, pageRoles, index) => {
              wasInActive = true;
              if (!newIsActive) {
                bucket.pages[pageKey] = pageRoles.filter(r => r.id !== updatedRole.id);
              } else {
                bucket.pages[pageKey][index] = updatedRole;
              }
            });
            
            iterateCache(state.paginatedInactive, (bucket, pageKey, pageRoles, index) => {
              wasInInactive = true;
              if (newIsActive) {
                bucket.pages[pageKey] = pageRoles.filter(r => r.id !== updatedRole.id);
              } else {
                bucket.pages[pageKey][index] = updatedRole;
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
          .addCase(updateRole.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export const { clearPaginatedCache } = rolesSlice.actions;
export default rolesSlice.reducer;