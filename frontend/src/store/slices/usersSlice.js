import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action


// Async action to handle getting users
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
  users:  ['empty'],
  admins: ['empty'],
  types: ['empty'],
  loading: false,
  loadingRowId: null,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
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
          .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
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
            state.users = state.users.map((user) =>
              user.id === action.payload.id ? action.payload : user
            );
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
export const { closeSnackbar } = usersSlice.actions;
export default usersSlice.reducer;