import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userTypesApi from "../../api/userTypesApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting userTypes
export const getUserTypes = createAsyncThunk("userTypes/getUserTypes", async (_, {dispatch, rejectWithValue }) => {
  try {
      const response = await userTypesApi.getUserTypes();
      dispatch(showSnackbar({ message: "User Types loaded successfully!", severity: "info" }));
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ") || "Getting userTypes failed"
          dispatch(showSnackbar({ message: eachError, severity: "error" }));
          return rejectWithValue(eachError );
      }
      const message = error.response?.data?.msg || "Getting userTypes failed"
      dispatch(showSnackbar({ message: message, severity: "error" }));
      return rejectWithValue(message);
  }
});

// Async action to handle getting userTypes
export const addUserType = createAsyncThunk("auth/addUserTypes", async (newApp, {dispatch, rejectWithValue }) => {
  try {
      const response = await userTypesApi.addUserType(newApp);
      dispatch(showSnackbar({ message: `${response.data.userType} was added successfully`, severity: "success" }));
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

// Async action to handle getting userTypes
export const updateUserType = createAsyncThunk("userTypes/updateUserType", async ({id, data}, {dispatch, rejectWithValue }) => {
  try {
      const response = await userTypesApi.updateType(id, data);
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
  userTypes:  ['empty'],
  loading: false,
  loadingRowId: null,
  error: null,
};

const userTypesSlice = createSlice({
  name: "userTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getUserTypes.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(getUserTypes.fulfilled, (state, action) => {
            state.userTypes = action.payload;
            state.loading = false;

          })
          .addCase(getUserTypes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(addUserType.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(addUserType.fulfilled, (state, action) => {
            state.loading = false;
            state.userTypes.push(action.payload);
          })
          .addCase(addUserType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateUserType.pending, (state, action) => {
            state.loadingRowId = action.meta.arg.id;
            state.error = null;
          })
          .addCase(updateUserType.fulfilled, (state, action) => {
            state.loadingRowId = null;
            state.userTypes = state.userTypes.map((app) =>
              app.id === action.payload.id ? action.payload : app
            );
          })
          .addCase(updateUserType.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export default userTypesSlice.reducer;