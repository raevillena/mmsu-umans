import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import analyticsApi from "../../api/analyticsApi";
import { showSnackbar } from "./snackbarSlice";

// Async thunks for fetching analytics data
export const fetchOverview = createAsyncThunk(
  "analytics/fetchOverview",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getOverview();
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch overview statistics";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchUserGrowth = createAsyncThunk(
  "analytics/fetchUserGrowth",
  async ({ period = "monthly", limit = 12 }, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getUserGrowth(period, limit);
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch user growth data";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchAppUsage = createAsyncThunk(
  "analytics/fetchAppUsage",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getAppUsage();
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch app usage data";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchActivityStats = createAsyncThunk(
  "analytics/fetchActivityStats",
  async ({ period = "monthly", limit = 12 }, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getActivityStats(period, limit);
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch activity statistics";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchRoleDistribution = createAsyncThunk(
  "analytics/fetchRoleDistribution",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getRoleDistribution();
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch role distribution";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchOfficeDistribution = createAsyncThunk(
  "analytics/fetchOfficeDistribution",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getOfficeDistribution();
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch office distribution";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  "analytics/fetchRecentActivity",
  async (limit = 10, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getRecentActivity(limit);
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch recent activity";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchTopActions = createAsyncThunk(
  "analytics/fetchTopActions",
  async (limit = 10, { dispatch, rejectWithValue }) => {
    try {
      const response = await analyticsApi.getTopActions(limit);
      const { data, msg } = response.data;
      if (msg) {
        dispatch(showSnackbar({ message: msg, severity: "success" }));
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch top actions";
      dispatch(showSnackbar({ message, severity: "error" }));
      return rejectWithValue(message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    overview: null,
    userGrowth: null,
    appUsage: [],
    activityStats: null,
    roleDistribution: [],
    officeDistribution: [],
    recentActivity: [],
    topActions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalytics: (state) => {
      state.overview = null;
      state.userGrowth = null;
      state.appUsage = [];
      state.activityStats = null;
      state.roleDistribution = [];
      state.officeDistribution = [];
      state.recentActivity = [];
      state.topActions = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Overview
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // User Growth
      .addCase(fetchUserGrowth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserGrowth.fulfilled, (state, action) => {
        state.loading = false;
        state.userGrowth = action.payload;
      })
      .addCase(fetchUserGrowth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // App Usage
      .addCase(fetchAppUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.appUsage = action.payload;
      })
      .addCase(fetchAppUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Activity Stats
      .addCase(fetchActivityStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityStats.fulfilled, (state, action) => {
        state.loading = false;
        state.activityStats = action.payload;
      })
      .addCase(fetchActivityStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Role Distribution
      .addCase(fetchRoleDistribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.roleDistribution = action.payload;
      })
      .addCase(fetchRoleDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Office Distribution
      .addCase(fetchOfficeDistribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfficeDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.officeDistribution = action.payload;
      })
      .addCase(fetchOfficeDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Recent Activity
      .addCase(fetchRecentActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Top Actions
      .addCase(fetchTopActions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopActions.fulfilled, (state, action) => {
        state.loading = false;
        state.topActions = action.payload;
      })
      .addCase(fetchTopActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;

