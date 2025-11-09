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
export const getRolesPaginated = createAsyncThunk("roles/getRolesPaginated", async (page, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.getRolesPaginated(page);
      return { page, data: response.data }; // Expecting { roles: [...], totalPages: number }
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
  // Paginated cache
  paginatedPages: {}, // { 1: [...], 2: [...] }
  totalPages: 0,
  loadedPages: [], // Track which pages are cached [1, 2, 3, ...]
  loading: false,
  loadingRowId: null,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
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
            const { page, data } = action.payload;
            // Ensure page is a number for consistent key access
            const pageNum = Number(page);
            // Cache the page data
            state.paginatedPages[pageNum] = data.roles || [];
            if (!state.loadedPages.includes(pageNum)) {
              state.loadedPages.push(pageNum);
            }
            state.totalPages = data.totalPages || 0;
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
            // Invalidate paginated cache - will refetch on next view
            state.paginatedPages = {};
            state.loadedPages = [];
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
            // Update roles array for reference data
            if (state.roles[0] !== 'empty') {
              state.roles = state.roles.map((role) =>
                role.id === action.payload.id ? action.payload : role
              );
            }
            // Update paginated cache if role exists in any cached page
            Object.keys(state.paginatedPages).forEach(page => {
              const pageRoles = state.paginatedPages[page];
              const roleIndex = pageRoles.findIndex(r => r.id === action.payload.id);
              if (roleIndex !== -1) {
                state.paginatedPages[page][roleIndex] = action.payload;
              }
            });
          })
          .addCase(updateRole.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export const { clearPaginatedCache } = rolesSlice.actions;
export default rolesSlice.reducer;