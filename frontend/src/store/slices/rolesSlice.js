import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rolesApi from "../../api/rolesApi";
import { showSnackbar } from "./snackbarSlice"; // Import the snackbar action

// Async action to handle getting roles
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

// Async action to handle getting Roles
export const addRole = createAsyncThunk("roles/addApp", async (newApp, {dispatch, rejectWithValue }) => {
  try {
      const response = await rolesApi.addRole(newApp);
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
  roles:  ['empty'],
  loading: false,
  loadingRowId: null,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
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
          .addCase(addRole.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addRole.fulfilled, (state, action) => {
            state.loading = false;
            state.roles.push(action.payload);
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
            state.roles = state.roles.map((role) =>
              role.id === action.payload.id ? action.payload : role
            );
          })
          .addCase(updateRole.rejected, (state, action) => {
            state.loadingRowId = null;
            state.error = action.payload;

          })
  },
});

export default rolesSlice.reducer;