import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import appsReducer from './slices/appsSlice';
import snackbarReducer from './slices/snackbarSlice';
import userTypesReducer from './slices/userTypesSlice';
import rolesReducer from './slices/rolesSlice';
import sessionsReducer from './slices/sessionsSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    apps: appsReducer,
    snackbar: snackbarReducer,
    userTypes: userTypesReducer,
    roles: rolesReducer,
    sessions: sessionsReducer,
    analytics: analyticsReducer,
  },
});

export default store;