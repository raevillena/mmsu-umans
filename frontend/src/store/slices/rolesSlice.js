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
export const getRolesPaginated = createAsyncThunk("roles/getRolesPaginated", async ({ page, isActive = true }, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.getRolesPaginated(page, 10, isActive);
      return { page, isActive, data: response.data }; // Expecting { roles: [...], totalPages: number }
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
  paginatedPagesActive: {}, // { 1: [...], 2: [...] }
  paginatedPagesInactive: {}, // { 1: [...], 2: [...] }
  totalPagesActive: 0,
  totalPagesInactive: 0,
  loadedPagesActive: [], // Track which pages are cached [1, 2, 3, ...]
  loadedPagesInactive: [], // Track which pages are cached [1, 2, 3, ...]
  loading: false,
  loadingRowId: null,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
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
            const { page, isActive, data } = action.payload;
            // Ensure page is a number for consistent key access
            const pageNum = Number(page);
            // Cache the page data based on active status
            if (isActive) {
              state.paginatedPagesActive[pageNum] = data.roles || [];
              if (!state.loadedPagesActive.includes(pageNum)) {
                state.loadedPagesActive.push(pageNum);
              }
              state.totalPagesActive = data.totalPages || 0;
            } else {
              state.paginatedPagesInactive[pageNum] = data.roles || [];
              if (!state.loadedPagesInactive.includes(pageNum)) {
                state.loadedPagesInactive.push(pageNum);
              }
              state.totalPagesInactive = data.totalPages || 0;
            }
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
            state.paginatedPagesActive = {};
            state.loadedPagesActive = [];
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
            Object.keys(state.paginatedPagesActive).forEach(page => {
              const pageRoles = state.paginatedPagesActive[page];
              const roleIndex = pageRoles.findIndex(r => r.id === updatedRole.id);
              if (roleIndex !== -1) {
                wasInActive = true;
                // If new status is inactive, remove from active cache
                if (!newIsActive) {
                  state.paginatedPagesActive[page] = pageRoles.filter(r => r.id !== updatedRole.id);
                } else {
                  // If still active, update the record
                  state.paginatedPagesActive[page][roleIndex] = updatedRole;
                }
              }
            });
            
            // Check inactive cache
            Object.keys(state.paginatedPagesInactive).forEach(page => {
              const pageRoles = state.paginatedPagesInactive[page];
              const roleIndex = pageRoles.findIndex(r => r.id === updatedRole.id);
              if (roleIndex !== -1) {
                wasInInactive = true;
                // If new status is active, remove from inactive cache
                if (newIsActive) {
                  state.paginatedPagesInactive[page] = pageRoles.filter(r => r.id !== updatedRole.id);
                } else {
                  // If still inactive, update the record
                  state.paginatedPagesInactive[page][roleIndex] = updatedRole;
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
          .addCase(updateRole.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export const { clearPaginatedCache } = rolesSlice.actions;
export default rolesSlice.reducer;