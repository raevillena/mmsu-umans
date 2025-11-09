import React, { useEffect, useState } from "react";
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverview,
  fetchUserGrowth,
  fetchAppUsage,
  fetchActivityStats,
  fetchRoleDistribution,
  fetchOfficeDistribution,
  fetchRecentActivity,
} from "../../store/slices/analyticsSlice";

// Registering Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    overview, 
    userGrowth, 
    appUsage, 
    activityStats, 
    roleDistribution,
    officeDistribution,
    recentActivity,
    loading 
  } = useSelector((state) => state.analytics);

  const [period, setPeriod] = useState("monthly");

  // Fetch analytics data on component mount
  useEffect(() => {
    dispatch(fetchOverview());
    dispatch(fetchUserGrowth({ period, limit: 12 }));
    dispatch(fetchAppUsage());
    dispatch(fetchActivityStats({ period, limit: 12 }));
    dispatch(fetchRoleDistribution());
    dispatch(fetchOfficeDistribution());
    dispatch(fetchRecentActivity(10));
  }, [dispatch, period]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", month: "short", day: "numeric" 
    });
  };

  // Format period label for charts
  const formatPeriodLabel = (periodStr) => {
    if (!periodStr) return "";
    if (period === "monthly") {
      const [year, month] = periodStr.split("-");
      const date = new Date(year, parseInt(month) - 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return periodStr;
  };

  // Chart data setup for User Growth
  const userGrowthData = userGrowth?.data ? {
    labels: userGrowth.data.map(item => formatPeriodLabel(item.period)),
    datasets: [
      {
        label: "New Users",
        data: userGrowth.data.map(item => item.newUsers),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.3,
      },
      {
        label: "Total Users",
        data: userGrowth.data.map(item => item.totalUsers),
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        tension: 0.3,
      },
    ],
  } : null;

  // Chart data setup for Activity Stats
  const activityData = activityStats?.data ? {
    labels: activityStats.data.map(item => formatPeriodLabel(item.period)),
    datasets: [
      {
        label: "Activities",
        data: activityStats.data.map(item => item.count),
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.1)",
        tension: 0.3,
      },
    ],
  } : null;

  // Chart data setup for App Usage (Bar Chart)
  const appUsageData = appUsage && appUsage.length > 0 ? {
    labels: appUsage.slice(0, 10).map(app => app.name),
    datasets: [
      {
        label: "Users per App",
        data: appUsage.slice(0, 10).map(app => app.userCount),
        backgroundColor: [
          "rgba(25, 118, 210, 0.8)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(255, 152, 0, 0.8)",
          "rgba(244, 67, 54, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(0, 188, 212, 0.8)",
          "rgba(255, 87, 34, 0.8)",
          "rgba(121, 85, 72, 0.8)",
          "rgba(96, 125, 139, 0.8)",
          "rgba(233, 30, 99, 0.8)",
        ],
        borderColor: [
          "#1976d2",
          "#4caf50",
          "#ff9800",
          "#f44336",
          "#9c27b0",
          "#00bcd4",
          "#ff5722",
          "#795548",
          "#607d8b",
          "#e91e63",
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  // Chart data setup for Role Distribution (Doughnut)
  const roleDistributionData = roleDistribution && roleDistribution.length > 0 ? {
    labels: roleDistribution.map(item => item.role.charAt(0).toUpperCase() + item.role.slice(1)),
    datasets: [
      {
        label: "Users",
        data: roleDistribution.map(item => item.count),
        backgroundColor: [
          "rgba(25, 118, 210, 0.8)",
          "rgba(76, 175, 80, 0.8)",
        ],
        borderColor: [
          "#1976d2",
          "#4caf50",
        ],
        borderWidth: 2,
      },
    ],
  } : null;

  const navigateToPage = (page) => {
    navigate(page);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (loading && !overview) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Dashboard Overview
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label="Monthly"
            onClick={() => setPeriod("monthly")}
            color={period === "monthly" ? "primary" : "default"}
            variant={period === "monthly" ? "filled" : "outlined"}
          />
          <Chip
            label="Weekly"
            onClick={() => setPeriod("weekly")}
            color={period === "weekly" ? "primary" : "default"}
            variant={period === "weekly" ? "filled" : "outlined"}
          />
          <Chip
            label="Daily"
            onClick={() => setPeriod("daily")}
            color={period === "daily" ? "primary" : "default"}
            variant={period === "daily" ? "filled" : "outlined"}
          />
        </Box>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                {overview?.totalUsers || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Active: {overview?.activeUsers || 0} | Inactive: {overview?.inactiveUsers || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Apps
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                {overview?.totalApps || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Active: {overview?.activeApps || 0} | Inactive: {overview?.inactiveApps || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Roles
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f44336" }}>
                {overview?.totalRoles || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Active Sessions: {overview?.activeSessions || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                User Types
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800" }}>
                {overview?.totalUserTypes || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Admins: {overview?.totalAdmins || 0} | Users: {overview?.regularUsers || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Stats Row */}
      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Google Users
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {overview?.totalGoogleUsers || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                MQTT Users
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {overview?.totalMqttUsers || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Active Sessions
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                {overview?.activeSessions || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Total Admins
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f44336" }}>
                {overview?.totalAdmins || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                User Growth Over Time
              </Typography>
              {userGrowthData ? (
                <Box sx={{ height: "300px", width: "100%" }}>
                  <Line data={userGrowthData} options={chartOptions} />
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Stats Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Activity Over Time
              </Typography>
              {activityData ? (
                <Box sx={{ height: "300px", width: "100%" }}>
                  <Line data={activityData} options={chartOptions} />
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* App Usage Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Top Apps by User Count
              </Typography>
              {appUsageData ? (
                <Box sx={{ height: "300px", width: "100%" }}>
                  <Bar data={appUsageData} options={chartOptions} />
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Role Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Role Distribution
              </Typography>
              {roleDistributionData ? (
                <Box sx={{ height: "300px", width: "100%", display: "flex", justifyContent: "center" }}>
                  <Doughnut data={roleDistributionData} options={chartOptions} />
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity Table */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Recent Activity
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Action</strong></TableCell>
                      <TableCell><strong>User</strong></TableCell>
                      <TableCell><strong>Target</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivity && recentActivity.length > 0 ? (
                      recentActivity.slice(0, 5).map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>
                            {activity.user ? activity.user.name : "System"}
                          </TableCell>
                          <TableCell>{activity.targetType || "N/A"}</TableCell>
                          <TableCell>{formatDate(activity.createdAt)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No recent activity
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  onClick={() => navigateToPage("/users")}
                  variant="contained"
                  fullWidth
                  sx={{ background: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
                >
                  Manage Users
                </Button>
                <Button
                  onClick={() => navigateToPage("/apps")}
                  variant="contained"
                  fullWidth
                  sx={{ background: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
                >
                  Manage Apps
                </Button>
                <Button
                  onClick={() => navigateToPage("/roles")}
                  variant="contained"
                  fullWidth
                  sx={{ background: "#f44336", "&:hover": { backgroundColor: "#e53935" } }}
                >
                  Manage Roles
                </Button>
                <Button
                  onClick={() => navigateToPage("/logs")}
                  variant="outlined"
                  fullWidth
                >
                  View All Logs
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
