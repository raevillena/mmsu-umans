import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action


// Async action to handle getting users (all users - for backward compatibility)
export const getUsers = createAsyncThunk("users/getUsers", async (_, {dispatch, rejectWithValue }) => {
  try {
      const response = await usersApi.getUsers();
      dispatch(showSnackbar({ message: "Users loaded successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting users failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError);
      }
      const message = error.response?.data?.msg || "Getting users failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting paginated users (with caching)
// Accepts { page, isActive } as argument
export const getUsersPaginated = createAsyncThunk("users/getUsersPaginated", async ({ page, isActive = true }, {dispatch, rejectWithValue }) => {
  try {
      const response = await usersApi.getUsersPaginated(page, 10, isActive);
      return { page, isActive, data: response.data }; // Expecting { users: [...], totalPages: number }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting users failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError);
      }
      const message = error.response?.data?.msg || "Getting users failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting users
export const createUser = createAsyncThunk("auth/createUser", async (newUser, {dispatch, rejectWithValue }) => {
  try {
      const response = await usersApi.createUser(newUser);
      dispatch(showSnackbar({ message: `${response.data.email} was added successfully`, severity: "success" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ")
        return rejectWithValue(eachError || "Signup failed");
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(error.response?.data?.msg || "Something went wrong");
  }
});

// Async action to handle getting users
export const updateUser = createAsyncThunk("users/updateUser", async ({id, data}, {dispatch, rejectWithValue }) => {
  try {
      const response = await usersApi.updateUser(id, data);
      dispatch(showSnackbar({ message: "User was updated successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Updating user failed"
        dispatch(showSnackbar({ message: eachError, severity: "error" }));
        return rejectWithValue(eachError);
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting users
export const changePassword = createAsyncThunk("users/changePassword", async ({id, data}, {dispatch, rejectWithValue }) => {
  try {
      const response = await usersApi.changePassword(id, data);
      dispatch(showSnackbar({ message: "Password was changed successfully!", severity: "success" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Change password failed"
        dispatch(showSnackbar({ message: eachError, severity: "error" }));
        return rejectWithValue(eachError);
      }
      const message = error.response?.data?.msg || "Something went wrong"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

const initialState = {
  users:  ['empty'], // For backward compatibility
  admins: ['empty'],
  types: ['empty'],
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

const usersSlice = createSlice({
  name: "users",
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
          .addCase(getUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.message = "Users loaded successfully";
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getUsersPaginated.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUsersPaginated.fulfilled, (state, action) => {
            const { page, isActive, data } = action.payload;
            // Ensure page is a number for consistent key access
            const pageNum = Number(page);
            // Cache the page data based on active status
            if (isActive) {
              state.paginatedPagesActive[pageNum] = data.users || [];
              if (!state.loadedPagesActive.includes(pageNum)) {
                state.loadedPagesActive.push(pageNum);
              }
              state.totalPagesActive = data.totalPages || 0;
            } else {
              state.paginatedPagesInactive[pageNum] = data.users || [];
              if (!state.loadedPagesInactive.includes(pageNum)) {
                state.loadedPagesInactive.push(pageNum);
              }
              state.totalPagesInactive = data.totalPages || 0;
            }
            state.loading = false;
          })
          .addCase(getUsersPaginated.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            // Update users array for reference data (dropdowns, etc.)
            if (state.users[0] !== 'empty') {
              state.users.push(action.payload);
            }
            // Invalidate active paginated cache - will refetch on next view
            state.paginatedPagesActive = {};
            state.loadedPagesActive = [];
          })
          .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateUser.pending, (state, action) => {
            state.loadingRowId = action.meta.arg.id;
            state.error = null;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.loadingRowId = null;
            // Update users array for reference data (dropdowns, etc.)
            if (state.users[0] !== 'empty') {
              state.users = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
              );
            }
            // Update active paginated cache if user exists in any cached page
            Object.keys(state.paginatedPagesActive).forEach(page => {
              const pageUsers = state.paginatedPagesActive[page];
              const userIndex = pageUsers.findIndex(u => u.id === action.payload.id);
              if (userIndex !== -1) {
                state.paginatedPagesActive[page][userIndex] = action.payload;
              }
            });
            // Update inactive paginated cache if user exists in any cached page
            Object.keys(state.paginatedPagesInactive).forEach(page => {
              const pageUsers = state.paginatedPagesInactive[page];
              const userIndex = pageUsers.findIndex(u => u.id === action.payload.id);
              if (userIndex !== -1) {
                state.paginatedPagesInactive[page][userIndex] = action.payload;
              }
            });
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;
          })
          .addCase(changePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;

          })
          .addCase(changePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
  },
});
export const { closeSnackbar, clearPaginatedCache } = usersSlice.actions;
export default usersSlice.reducer;