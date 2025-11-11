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
export const getUsersPaginated = createAsyncThunk("users/getUsersPaginated", async ({ page, isActive = true, searchTerm = "" }, {dispatch, rejectWithValue }) => {
  try {
      const response = await usersApi.getUsersPaginated(page, 10, isActive, searchTerm);
      // Show success message only on first page load to avoid notification spam
      if (page === 1) {
        const searchMsg = searchTerm ? ` with search "${searchTerm}"` : '';
        dispatch(showSnackbar({ message: `Users loaded successfully${searchMsg}!`, severity: "info" }));
      }
      return { page, isActive, searchTerm, data: response.data }; // Expecting { users: [...], totalPages: number }
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
  paginatedActive: {}, // { searchKey: { pages: { 1: [...] }, loadedPages: [], totalPages: number } }
  paginatedInactive: {},
  loading: false,
  loadingRowId: null,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearPaginatedCache: (state) => {
      state.paginatedActive = {};
      state.paginatedInactive = {};
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
            bucket.pages[pageNum] = data.users || [];
            if (!bucket.loadedPages.includes(pageNum)) {
              bucket.loadedPages.push(pageNum);
            }
            bucket.totalPages = data.totalPages || 0;
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
            state.paginatedActive = {};
            state.paginatedInactive = {};
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
            const updatedUser = action.payload;
            const newIsActive = updatedUser.isActive;
            
            // Update users array for reference data (dropdowns, etc.)
            if (state.users[0] !== 'empty') {
              state.users = state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              );
            }
            
            // Check if isActive status changed by looking at both caches
            let wasInActive = false;
            let wasInInactive = false;
            
            const iterateCache = (cacheMap, cb) => {
              Object.values(cacheMap).forEach(bucket => {
                Object.entries(bucket.pages).forEach(([pageKey, pageUsers]) => {
                  const index = pageUsers.findIndex(u => u.id === updatedUser.id);
                  if (index !== -1) {
                    cb(bucket, pageKey, pageUsers, index);
                  }
                });
              });
            };
            
            iterateCache(state.paginatedActive, (bucket, pageKey, pageUsers, index) => {
              wasInActive = true;
              if (!newIsActive) {
                bucket.pages[pageKey] = pageUsers.filter(u => u.id !== updatedUser.id);
              } else {
                bucket.pages[pageKey][index] = updatedUser;
              }
            });
            
            iterateCache(state.paginatedInactive, (bucket, pageKey, pageUsers, index) => {
              wasInInactive = true;
              if (newIsActive) {
                bucket.pages[pageKey] = pageUsers.filter(u => u.id !== updatedUser.id);
              } else {
                bucket.pages[pageKey][index] = updatedUser;
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